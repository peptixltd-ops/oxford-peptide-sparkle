/**
 * UK/GBP shipping rules shared by the storefront and the Medusa fulfillment provider.
 * Amounts are major GBP units. Norway is excluded. Russia and Belarus stay blocked,
 * matching the live site. VAT is intentionally not calculated here.
 */

export const SHIPPING_RULES = {
  currency: "gbp",
  freeFromGbp: 12,
  uk: {
    express: { amount: 3.99, label: "UK Express", days: "1–2 days" },
    standard: { amount: 5.99, label: "UK Standard", days: "3–5 days" },
  },
  international: { amount: 15, label: "International Shipping", days: "Varies by destination" },
  excluded: ["NO", "RU", "BY"],
  dispatchCutoff: "14:00",
  dispatchTimezone: "Europe/London",
};

const EXCLUDED_REASONS = {
  NO: "Shipping to Norway is not available.",
  RU: "Shipping to Russia and Belarus is not available.",
  BY: "Shipping to Russia and Belarus is not available.",
};

export function normaliseCountry(country) {
  return String(country || "").trim().toUpperCase();
}

export function quoteShipping(subtotal, country, method = "express") {
  const code = normaliseCountry(country);
  const goods = Number(subtotal);
  if (!Number.isFinite(goods) || goods < 0) {
    throw new Error("A valid goods subtotal is required to quote shipping.");
  }
  if (!code) throw new Error("A destination country is required.");
  if (EXCLUDED_REASONS[code]) throw new Error(EXCLUDED_REASONS[code]);
  if (code !== "GB") {
    return {
      country: code,
      method: "international",
      amount: SHIPPING_RULES.international.amount,
      label: SHIPPING_RULES.international.label,
      currency: "gbp",
    };
  }
  const selected = method === "standard" ? "standard" : "express";
  const tier = SHIPPING_RULES.uk[selected];
  const amount = goods >= SHIPPING_RULES.freeFromGbp ? 0 : tier.amount;
  return {
    country: code,
    method: selected,
    amount,
    label: amount === 0 ? `${tier.label} (free over £12)` : tier.label,
    currency: "gbp",
  };
}

export function shippingMethodsFor(country) {
  const code = normaliseCountry(country);
  if (EXCLUDED_REASONS[code]) return [];
  if (code !== "GB") return ["international"];
  return ["express", "standard"];
}
