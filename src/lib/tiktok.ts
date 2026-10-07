// TikTok Pixel event layer.
// The base snippet in src/routes/__root.tsx loads pixel DB1V0D3C77UA626EFU30.
// All funnel events are sent through the named instance so they cannot land on
// another pixel if a second one is ever added.
//
// Every event carries a unique event_id which is the SAME id pushed to the
// dataLayer for the matching GA4/Meta event, so a server-side twin (Events API)
// can dedupe against the browser event.

export const TIKTOK_PIXEL_ID = "DB1V0D3C77UA626EFU30";

type TtqInstance = {
  track: (event: string, params?: Record<string, unknown>, opts?: { event_id?: string }) => void;
  page: (params?: Record<string, unknown>) => void;
};

declare global {
  interface Window {
    ttq?: { instance?: (id: string) => TtqInstance } & Partial<TtqInstance>;
  }
}

/** Only the production storefront reports to the live pixel (no preview traffic). */
export function tiktokEnabled(): boolean {
  if (typeof window === "undefined") return false;
  return /(^|\.)oxfordresearchpeptides\.com$/.test(window.location.hostname);
}

function instance(): TtqInstance | null {
  if (!tiktokEnabled()) return null;
  const ttq = window.ttq;
  if (!ttq) return null;
  if (typeof ttq.instance === "function") return ttq.instance(TIKTOK_PIXEL_ID);
  return typeof ttq.track === "function" ? (ttq as TtqInstance) : null;
}

export type TikTokContent = {
  content_id: string;
  content_type: "product";
  content_name: string;
  content_category?: string;
  brand?: string;
  quantity: number;
  price: number;
};

export function tiktokTrack(
  event: "ViewContent" | "AddToCart" | "InitiateCheckout",
  args: { contents: TikTokContent[]; value: number; currency: string; eventId: string },
) {
  const ttq = instance();
  if (!ttq) return;
  const first = args.contents[0];
  try {
    ttq.track(
      event,
      {
        contents: args.contents,
        // Flat fields kept alongside `contents` for single-item events —
        // TikTok Diagnostics reads either shape.
        ...(args.contents.length === 1 && first
          ? {
              content_id: first.content_id,
              content_type: first.content_type,
              content_name: first.content_name,
              quantity: first.quantity,
              price: first.price,
            }
          : { content_type: "product" }),
        value: Number(args.value.toFixed(2)),
        currency: args.currency,
      },
      { event_id: args.eventId },
    );
  } catch {
    // Never let a tracking failure break the shopping flow.
  }
  // Server-side twin with the same event_id so TikTok dedupes the pair.
  const attr = tiktokAttribution();
  void import("./tiktok-capi.functions")
    .then(({ sendTikTokServerEvent }) =>
      sendTikTokServerEvent({
        data: {
          event,
          eventId: args.eventId,
          url: window.location.href,
          value: Number(args.value.toFixed(2)),
          currency: args.currency,
          contents: args.contents.map((c) => ({
            content_id: c.content_id,
            content_type: c.content_type,
            content_name: c.content_name,
            quantity: c.quantity,
            price: c.price,
          })),
          ...attr,
        },
      }),
    )
    .catch(() => {});
}

/** TikTok click id + first-party cookie, needed to keep attribution across the
 *  hop to the Shopify checkout domain. */
export function tiktokAttribution(): { ttclid?: string; ttp?: string } {
  if (typeof window === "undefined") return {};
  const out: { ttclid?: string; ttp?: string } = {};
  const url = new URLSearchParams(window.location.search);
  const fromUrl = url.get("ttclid");
  const stored = (() => {
    try {
      return window.localStorage.getItem("orp_ttclid") ?? undefined;
    } catch {
      return undefined;
    }
  })();
  if (fromUrl) {
    try {
      window.localStorage.setItem("orp_ttclid", fromUrl);
    } catch {
      /* storage blocked */
    }
  }
  const ttclid = fromUrl ?? stored;
  if (ttclid) out.ttclid = ttclid;
  const ttp = document.cookie.match(/(?:^|;\s*)_ttp=([^;]+)/)?.[1];
  if (ttp) out.ttp = decodeURIComponent(ttp);
  return out;
}
