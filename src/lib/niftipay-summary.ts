import { getProduct, getVariant } from "./products";
import { BAC_WATER_UPSELL, VARIANT_GID, type CheckoutLine } from "./shopify";
import { CART_PROMOTION, cartPromotionActive, cartPromotionDiscount } from "./cart-promotion";

export type NiftiPaySummary = {
  items: { name: string; variant: string; quantity: number; unitPrice: number; price: number; image: string }[];
  subtotal: number;
  discounts: { label: string; amount: number }[];
  shipping: number;
  total: number;
};

const pennies = (value: number) => Math.round(value * 100);

export function buildNiftiPaySummary(lines: CheckoutLine[], shipping: number, now = Date.now()): NiftiPaySummary {
  const keys = new Map(Object.entries(VARIANT_GID).map(([key, gid]) => [gid, key]));
  let bacDiscount = 0;
  const items = lines.map(line => {
    const key = keys.get(line.merchandiseId);
    if (!key) throw new Error("Unknown product");
    const [slug, variantId] = key.split("::");
    const product = getProduct(slug);
    if (!product) throw new Error("Unknown product");
    const variant = getVariant(product, variantId);
    if (slug === BAC_WATER_UPSELL.slug) {
      bacDiscount += pennies(Math.min(variant.price, BAC_WATER_UPSELL.amountOff)) * line.quantity;
    }
    return { name: product.name, variant: variant.label, quantity: line.quantity, unitPrice: variant.price,
      price: pennies(variant.price) * line.quantity / 100, image: product.img };
  });
  const subtotal = items.reduce((sum, item) => sum + pennies(item.price), 0) / 100;
  const discounts = cartPromotionActive(now) ? [
    { label: `${CART_PROMOTION.code} – ${CART_PROMOTION.percent}% off applied`, amount: cartPromotionDiscount(subtotal, now) },
  ] : [
    ...(bacDiscount ? [{ label: "Bac water offer", amount: bacDiscount / 100 }] : []),
  ];
  const discount = discounts.reduce((sum, item) => sum + pennies(item.amount), 0);
  const total = (Math.max(0, pennies(subtotal) - discount) + pennies(shipping)) / 100;
  return { items, subtotal, discounts, shipping, total };
}

export function verifyNiftiPayTotal(summary: NiftiPaySummary, draftTotal: number) {
  if (!Number.isFinite(draftTotal) || pennies(summary.total) !== pennies(draftTotal)) {
    throw new Error(`Card checkout total mismatch: summary ${summary.total}, Shopify draft ${draftTotal}`);
  }
}