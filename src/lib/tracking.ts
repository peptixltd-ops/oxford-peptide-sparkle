// GTM / Stape server-side dataLayer helpers.
// All ecommerce events append the `_stape` suffix as required by the
// server container triggers configured in bhs.oxfordresearchpeptides.com.
// Each push includes a unique `event_id` for Meta browser/server dedup.

import type { Product, Variant } from "./products";
import { tiktokTrack, type TikTokContent } from "./tiktok";

type Item = {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_brand?: string;
  item_category?: string;
  item_variant?: string;
};

const CURRENCY = "GBP";
const BRAND = "Oxford Research Peptides";
const CATEGORY = "Research Peptide";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

function eventId(name: string) {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${name}_${Date.now()}_${rand}`;
}

function push(payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // GA4 recommends clearing ecommerce object before pushing a new one
  window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(payload);
}

function toItem(product: Product, variant: Variant, quantity = 1): Item {
  return {
    item_id: `${product.slug}-${variant.id}`,
    item_name: product.name,
    price: variant.price,
    quantity,
    item_brand: BRAND,
    item_category: CATEGORY,
    item_variant: variant.label,
  };
}

function toTikTokContent(product: Product, variant: Variant, quantity: number): TikTokContent {
  return {
    content_id: `${product.slug}-${variant.id}`,
    content_type: "product",
    content_name: product.name,
    content_category: CATEGORY,
    brand: BRAND,
    quantity,
    price: variant.price,
  };
}

export function trackViewItem(product: Product, variant: Variant) {
  const id = eventId("view_item");
  tiktokTrack("ViewContent", {
    contents: [toTikTokContent(product, variant, 1)],
    value: variant.price,
    currency: CURRENCY,
    eventId: id,
  });
  push({
    event: "view_item_stape",
    event_id: id,
    ecommerce: {
      currency: CURRENCY,
      value: variant.price,
      items: [toItem(product, variant, 1)],
    },
  });
}

export function trackAddToCart(product: Product, variant: Variant, quantity: number) {
  const id = eventId("add_to_cart");
  tiktokTrack("AddToCart", {
    contents: [toTikTokContent(product, variant, quantity)],
    value: variant.price * quantity,
    currency: CURRENCY,
    eventId: id,
  });
  push({
    event: "add_to_cart_stape",
    event_id: id,
    ecommerce: {
      currency: CURRENCY,
      value: variant.price * quantity,
      items: [toItem(product, variant, quantity)],
    },
  });
}

export function trackRemoveFromCart(product: Product, variant: Variant, quantity: number) {
  push({
    event: "remove_from_cart_stape",
    event_id: eventId("remove_from_cart"),
    ecommerce: {
      currency: CURRENCY,
      value: variant.price * quantity,
      items: [toItem(product, variant, quantity)],
    },
  });
}

type CartLine = { product: Product; variant: Variant; quantity: number };

function linesToItems(lines: CartLine[]): Item[] {
  return lines.map(l => toItem(l.product, l.variant, l.quantity));
}
function linesValue(lines: CartLine[]) {
  return lines.reduce((s, l) => s + l.variant.price * l.quantity, 0);
}

export function trackViewCart(lines: CartLine[]) {
  push({
    event: "view_cart_stape",
    event_id: eventId("view_cart"),
    ecommerce: {
      currency: CURRENCY,
      value: linesValue(lines),
      items: linesToItems(lines),
    },
  });
}

export function trackBeginCheckout(lines: CartLine[]) {
  const id = eventId("begin_checkout");
  tiktokTrack("InitiateCheckout", {
    contents: lines.map(l => toTikTokContent(l.product, l.variant, l.quantity)),
    value: linesValue(lines),
    currency: CURRENCY,
    eventId: id,
  });
  push({
    event: "begin_checkout_stape",
    event_id: id,
    ecommerce: {
      currency: CURRENCY,
      value: linesValue(lines),
      items: linesToItems(lines),
    },
  });
}
