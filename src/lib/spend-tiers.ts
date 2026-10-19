import { CREDIT_TIERS } from "./shopify";

/** Tiers in ascending order, taken from the same list checkout applies. */
export const SPEND_TIERS = [...CREDIT_TIERS].sort((a, b) => a.threshold - b.threshold);

/** Product-page summary, e.g. "Spend £30, save £5 · Spend £80, save £10". */
export function spendTiersLine(): string {
  return SPEND_TIERS.map((t) => `Spend £${t.threshold}, save £${t.amount}`).join(" · ");
}

/** Next tier the basket has not reached yet, with the amount still needed. */
export function nextSpendTier(subtotal: number) {
  const tier = SPEND_TIERS.find((t) => subtotal < t.threshold);
  if (!tier) return null;
  const needed = Math.round((tier.threshold - subtotal) * 100) / 100;
  return { threshold: tier.threshold, amount: tier.amount, needed, progress: Math.max(0, Math.min(1, subtotal / tier.threshold)) };
}
