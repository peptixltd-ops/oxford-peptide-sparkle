import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

// Server-side twin of browser pixel events (TikTok Events API).
// The access token is read only inside the handler — never shipped to the browser.
const PIXEL_ID = "DB1V0D3C77UA626EFU30";

const schema = z.object({
  event: z.enum(["ViewContent", "AddToCart", "InitiateCheckout"]),
  eventId: z.string().min(1).max(120),
  url: z.string().url().max(2000),
  value: z.number().min(0).max(100000),
  currency: z.string().length(3),
  contents: z
    .array(
      z.object({
        content_id: z.string().max(200),
        content_type: z.literal("product"),
        content_name: z.string().max(300),
        quantity: z.number().int().min(1).max(1000),
        price: z.number().min(0).max(100000),
      }),
    )
    .max(50),
  ttclid: z.string().max(500).optional(),
  ttp: z.string().max(500).optional(),
});

export const sendTikTokServerEvent = createServerFn({ method: "POST" })
  .inputValidator((d) => schema.parse(d))
  .handler(async ({ data }) => {
    const token = process.env["TIKTOK_EVENTS_API_TOKEN"];
    if (!token) return { ok: false };
    const host = (() => {
      try {
        return new URL(data.url).hostname;
      } catch {
        return "";
      }
    })();
    // Production storefront only — preview traffic never reaches the pixel.
    if (!/(^|\.)oxfordresearchpeptides\.com$/.test(host)) return { ok: false };

    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0];
    const ua = getRequestHeader("user-agent");
    try {
      const res = await fetch("https://business-api.tiktok.com/open_api/v1.3/event/track/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Access-Token": token },
        body: JSON.stringify({
          event_source: "web",
          event_source_id: PIXEL_ID,
          data: [
            {
              event: data.event,
              event_id: data.eventId,
              event_time: Math.floor(Date.now() / 1000),
              user: {
                ...(ip ? { ip: ip.trim() } : {}),
                ...(ua ? { user_agent: ua } : {}),
                ...(data.ttclid ? { ttclid: data.ttclid } : {}),
                ...(data.ttp ? { ttp: data.ttp } : {}),
              },
              page: { url: data.url },
              properties: { contents: data.contents, value: data.value, currency: data.currency, content_type: "product" },
            },
          ],
        }),
      });
      if (!res.ok) console.error("TikTok CAPI", res.status, await res.text());
      return { ok: res.ok };
    } catch (e) {
      console.error("TikTok CAPI failed", e);
      return { ok: false };
    }
  });
