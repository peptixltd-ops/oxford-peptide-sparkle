/**
 * Discount codes customers receive by link. They are never typed at checkout.
 * Only OXFORDWELCOME10 (10%, once per customer) and BACWATER2OFF (£2 off
 * bacteriostatic water) are confirmed. Other percentages are inferred from the
 * code name and must be confirmed in Shopify Admin before cutover.
 */

export const DISCOUNTS = [
  {
    code: "OXFORDWELCOME10",
    type: "percentage",
    value: 10,
    oncePerCustomer: true,
    confirmed: true,
    source: "business-fact",
    note: "Welcome popup and newsletter. 10% off, once per customer.",
  },
  {
    code: "OXFORD15",
    type: "percentage",
    value: 15,
    oncePerCustomer: false,
    confirmed: false,
    source: "code-name",
    note: "Percentage inferred from the code name. Confirm in Shopify before cutover.",
  },
  {
    code: "WELCOMEBACK10",
    type: "percentage",
    value: 10,
    oncePerCustomer: false,
    confirmed: false,
    source: "code-name",
    note: "Percentage inferred from the code name. Confirm in Shopify before cutover.",
  },
  {
    code: "COMEBACK20",
    type: "percentage",
    value: 20,
    oncePerCustomer: false,
    confirmed: false,
    source: "code-name",
    note: "Percentage inferred from the code name. Confirm in Shopify before cutover.",
  },
  {
    code: "BACWATER2OFF",
    type: "fixed",
    value: 2,
    currency: "gbp",
    targetHandle: "bacteriostatic-water",
    oncePerCustomer: false,
    confirmed: true,
    source: "live-storefront",
    note: "£2 off bacteriostatic water when that line is in the basket. Applied automatically with the water offer.",
  },
];

const CODE_RE = /^[A-Z0-9_-]{1,40}$/;

export function normaliseDiscountCode(raw) {
  if (typeof raw !== "string") return null;
  const code = raw.trim().toUpperCase();
  return CODE_RE.test(code) ? code : null;
}

export function getDiscount(code) {
  const normalised = normaliseDiscountCode(code);
  return DISCOUNTS.find((entry) => entry.code === normalised) || null;
}
