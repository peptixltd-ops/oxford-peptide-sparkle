declare module "@orp/config/discounts" {
  export function normaliseDiscountCode(raw: unknown): string | null;
  export const DISCOUNTS: Array<{ code: string; type: string; value: number; confirmed: boolean }>;
}

declare module "@orp/config/shipping" {
  export function quoteShipping(subtotal: number, country: string, method?: string): {
    country: string;
    method: string;
    amount: number;
    label: string;
    currency: string;
  };
  export function shippingMethodsFor(country: string): string[];
}

declare module "@orp/config/catalogue.json" {
  const catalogue: { products: Array<{ handle: string; title: string }> };
  export default catalogue;
}

declare module "@orp/config/research-index.json" {
  const research: Array<{ path: string; title: string; summary: string; page_type: string; populated: boolean }>;
  export default research;
}
