import { createFileRoute } from "@tanstack/react-router";
import { createHmac, createHash, timingSafeEqual } from "crypto";

/**
 * Shopify "orders/paid" webhook -> TikTok Events API Purchase.
 *
 * Browser pixels can't track the purchase because checkout happens on
 * Shopify's domain. This webhook closes the loop server-side, sending a
 * Purchase event to pixel DB1V0D3C77UA626EFU30 with the real order value.
 *
 * Setup (one-off, in Shopify admin):
 *   Settings -> Notifications -> Webhooks -> Create webhook
 *   Event: Order payment
 *   URL:   https://www.oxfordresearchpeptides.com/api/public/shopify-order-paid
 *   Format: JSON
 * Then save the webhook signing secret as SHOPIFY_WEBHOOK_SECRET.
 */

const TIKTOK_PIXEL_ID = "DB1V0D3C77UA626EFU30";
const TIKTOK_EVENTS_URL = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

const sha256 = (v: string) => createHash("sha256").update(v.trim().toLowerCase()).digest("hex");

function verifyShopifyHmac(rawBody: string, header: string | null, secret: string): boolean {
  if (!header) return false;
  const digest = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  const a = Buffer.from(digest);
  const b = Buffer.from(header);
  return a.length === b.length && timingSafeEqual(a, b);
}

type ShopifyLineItem = {
  sku?: string;
  title?: string;
  quantity?: number;
  price?: string;
};

type ShopifyOrder = {
  id?: number;
  name?: string; // e.g. "#1042" — stable, dedup-safe order identifier
  email?: string;
  phone?: string;
  currency?: string;
  total_price?: string;
  customer_locale?: string;
  landing_site?: string;
  referring_site?: string;
  client_details?: { user_agent?: string; browser_ip?: string };
  line_items?: ShopifyLineItem[];
};

export const Route = createFileRoute("/api/public/shopify-order-paid")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env["SHOPIFY_WEBHOOK_SECRET"];
        const tiktokToken = process.env["TIKTOK_EVENTS_API_TOKEN"];
        if (!webhookSecret || !tiktokToken) {
          console.error("Missing SHOPIFY_WEBHOOK_SECRET or TIKTOK_EVENTS_API_TOKEN");
          return new Response("not configured", { status: 500 });
        }

        const rawBody = await request.text();
        const hmac = request.headers.get("x-shopify-hmac-sha256");
        if (!verifyShopifyHmac(rawBody, hmac, webhookSecret)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let order: ShopifyOrder;
        try {
          order = JSON.parse(rawBody);
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }

        const value = Number(order.total_price ?? 0);
        if (!order.id || !(value > 0)) {
          // Still 200 — Shopify retries non-2xx, and there's nothing to fix on a retry.
          return new Response("ignored", { status: 200 });
        }

        // ttclid travels on the checkout URL (set in formatCheckoutUrl) and
        // Shopify echoes it back in landing_site.
        const landing = order.landing_site ?? "";
        const ttclid = landing.match(/[?&]ttclid=([^&]+)/)?.[1];

        const contents = (order.line_items ?? []).map((li) => ({
          content_id: li.sku || li.title || "unknown",
          content_type: "product",
          content_name: li.title ?? "unknown",
          quantity: li.quantity ?? 1,
          price: Number(li.price ?? 0),
        }));

        const event: Record<string, unknown> = {
          event: "Purchase",
          // Stable per-order event id: retries of the same webhook delivery
          // dedupe to one Purchase in Events Manager.
          event_id: `purchase_${order.id}`,
          event_time: Math.floor(Date.now() / 1000),
          user: {
            ...(order.email ? { email: sha256(order.email) } : {}),
            ...(order.phone ? { phone: sha256(order.phone) } : {}),
            ...(order.client_details?.browser_ip ? { ip: order.client_details.browser_ip } : {}),
            ...(order.client_details?.user_agent ? { user_agent: order.client_details.user_agent } : {}),
            ...(ttclid ? { ttclid: decodeURIComponent(ttclid) } : {}),
          },
          properties: {
            contents,
            value,
            currency: order.currency ?? "GBP",
          },
        };

        const res = await fetch(TIKTOK_EVENTS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Token": tiktokToken,
          },
          body: JSON.stringify({
            pixel_code: TIKTOK_PIXEL_ID,
            event_source: "web",
            batch: [event],
          }),
        });

        const body = await res.text();
        if (!res.ok) {
          console.error(`TikTok Events API ${res.status}: ${body}`);
          return new Response(`tiktok error ${res.status}`, { status: 502 });
        }
        // TikTok returns 200 with { code: 0 } on success.
        try {
          const parsed = JSON.parse(body);
          if (parsed.code !== 0) {
            console.error(`TikTok Events API rejected event: ${body}`);
          }
        } catch {
          /* non-JSON 200 — treat as accepted */
        }
        return new Response("ok", { status: 200 });
      },
    },
  },
});
