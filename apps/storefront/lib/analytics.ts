export const ANALYTICS_EVENTS = [
  "view_item",
  "view_item_list",
  "add_to_cart",
  "view_cart",
  "begin_checkout",
  "purchase",
] as const;

export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  let consent = "unset";
  try { consent = window.localStorage.getItem("orp_cookie_consent_v1") || "unset"; } catch { /* ignore */ }
  if (consent !== "accepted") return;
  const payload = { event, ...params };
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
  w.gtag?.("event", event, params);
}
