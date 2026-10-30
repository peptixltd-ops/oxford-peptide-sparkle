"use client";

/** Same checkout entry points as the live site. Payment is completed on the Medusa sandbox checkout. */
export const BAC_WATER_UPSELL = {
  slug: "bacteriostatic-water",
  code: "BACWATER2OFF",
  amountOff: 2,
} as const;

export function getVariantGid(slug: string, variantId: string) {
  return `${slug}::${variantId}`;
}

export function openCheckoutTab() {
  return null;
}

export function closeCheckoutTab(_tab?: unknown) {}

export function sendToCheckout(_tab: unknown, _url?: string) {
  window.location.assign("/checkout");
}

export async function createCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>,
  _subtotal?: number,
  extraDiscountCodes: string[] = [],
) {
  try {
    const raw = localStorage.getItem("orp_cart_v2");
    const items = raw ? JSON.parse(raw) : [];
    const extra = lines
      .map((line) => {
        const [slug, variantId] = line.merchandiseId.split("::");
        return slug && variantId ? { slug, variantId, qty: line.quantity } : null;
      })
      .filter(Boolean);
    const merged = Array.isArray(items) ? [...items] : [];
    for (const line of extra) {
      if (!line) continue;
      const existing = merged.find((item) => item.slug === line.slug && item.variantId === line.variantId);
      if (existing) existing.qty += line.qty;
      else merged.push(line);
    }
    localStorage.setItem("orp_cart_v2", JSON.stringify(merged));
    if (extraDiscountCodes[0]) {
      localStorage.setItem("orp_discount", JSON.stringify({ code: extraDiscountCodes[0], expires: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
    }
  } catch {
    /* storage unavailable */
  }
  return "/checkout";
}
