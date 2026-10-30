import { useEffect, useState } from "react";

export const CART_PROMOTION = {
  code: "HALLOWEEN15",
  percent: 15,
  endsAt: "2026-11-03T00:00:00Z",
} as const;

export function cartPromotionActive(now = Date.now()): boolean {
  return now < Date.parse(CART_PROMOTION.endsAt);
}

export function cartPromotionDiscount(subtotal: number, now = Date.now()): number {
  return cartPromotionActive(now) ? Math.round(subtotal * CART_PROMOTION.percent) / 100 : 0;
}

/** Automatic, non-combining Shopify promotions take precedence without erasing saved codes. */
export function bankCheckoutDiscountCodes(saved: string | null, extras: string[], now = Date.now()): string[] {
  if (cartPromotionActive(now)) return [];
  return [...new Set([...(saved ? [saved] : []), ...extras])];
}

export function useCartPromotion(): boolean {
  const [active, setActive] = useState(() => cartPromotionActive());
  useEffect(() => {
    const update = () => setActive(cartPromotionActive());
    update();
    // Poll as well as schedule expiry: handles suspended tabs and long replacement promotions.
    const interval = window.setInterval(update, 60_000);
    const remaining = Date.parse(CART_PROMOTION.endsAt) - Date.now();
    const timeout = remaining > 0 ? window.setTimeout(update, Math.min(remaining, 2_147_483_647)) : undefined;
    window.addEventListener("focus", update);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.removeEventListener("focus", update);
    };
  }, []);
  return active;
}