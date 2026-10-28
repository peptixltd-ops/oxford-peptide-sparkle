// Shopify Storefront API client — handles cart creation and checkout redirect.
// Only Oxford Research Peptides (ORP-) variants are mapped here.

import { tiktokAttribution } from "./tiktok";
import { getSavedDiscount } from "./discount-code";

const SHOPIFY_DOMAIN = "cqdyni-4v.myshopify.com";
const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_TOKEN = "437af38197c46209f82f5524370330c5";
const SHOPIFY_URL = `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

// Map of local `${slug}::${variantId}` -> Shopify ProductVariant GID
// Source: ORP-prefixed SKUs, vendor "Oxford Research Peptides"
export const VARIANT_GID: Record<string, string> = {
  "retatrutide::10mg": "gid://shopify/ProductVariant/54181660361045",
  "retatrutide::20mg": "gid://shopify/ProductVariant/54181660393813",
  "retatrutide::30mg": "gid://shopify/ProductVariant/54181660426581",
  "retatrutide::40mg": "gid://shopify/ProductVariant/54181660459349",
  "retatrutide::50mg": "gid://shopify/ProductVariant/54613700018517",
  "retatrutide::60mg": "gid://shopify/ProductVariant/54613700313429",
  "tirzepatide::10mg": "gid://shopify/ProductVariant/54181694964053",
  "tirzepatide::15mg": "gid://shopify/ProductVariant/54613700346197",
  "tirzepatide::20mg": "gid://shopify/ProductVariant/54181694996821",
  "tirzepatide::30mg": "gid://shopify/ProductVariant/54613700378965",
  "tirzepatide::40mg": "gid://shopify/ProductVariant/54181695029589",
  "tirzepatide::50mg": "gid://shopify/ProductVariant/54613700411733",
  "tirzepatide::60mg": "gid://shopify/ProductVariant/54613700706645",
  "cagrilintide::5mg": "gid://shopify/ProductVariant/54613700739413",
  "cagrilintide::10mg": "gid://shopify/ProductVariant/54181699191125",
  "ghk-cu::50mg": "gid://shopify/ProductVariant/54181707317589",
  "bpc-tb500::20mg-blend": "gid://shopify/ProductVariant/54181708235093",
  "selank::10mg": "gid://shopify/ProductVariant/54181713150293",
  "igf-lr3::1mg": "gid://shopify/ProductVariant/54181716492629",
  "ipamorelin::10mg": "gid://shopify/ProductVariant/54181721178453",
  "klow::80mg-blend": "gid://shopify/ProductVariant/54181729730901",
  "mots-c::10mg": "gid://shopify/ProductVariant/54613700837717",
  "mots-c::40mg": "gid://shopify/ProductVariant/54181730746709",
  "nad::500mg": "gid://shopify/ProductVariant/54181732843861",
  "pt-141::10mg": "gid://shopify/ProductVariant/54181734875477",
  "semax::10mg": "gid://shopify/ProductVariant/54613701132629",
  "semax::30mg": "gid://shopify/ProductVariant/54181737431381",
  "ss-31::10mg": "gid://shopify/ProductVariant/54366174937429",
  "ss-31::50mg": "gid://shopify/ProductVariant/54181738316117",
  "tb-500::10mg": "gid://shopify/ProductVariant/54181739987285",
  "tesamorelin::10mg": "gid://shopify/ProductVariant/54181746573653",
  "bacteriostatic-water::3mL": "gid://shopify/ProductVariant/54181746704725",
  "bacteriostatic-water::10mL": "gid://shopify/ProductVariant/54613701230933",
  "bpc-157::5mg": "gid://shopify/ProductVariant/54613701296469",
  "bpc-157::10mg": "gid://shopify/ProductVariant/54181748375893",
};

export const getVariantGid = (slug: string, variantId: string): string | undefined =>
  VARIANT_GID[`${slug}::${variantId}`];

const CART_CREATE = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart { id checkoutUrl discountCodes { code applicable } }
      userErrors { field message }
    }
  }`;

async function storefront(query: string, variables: unknown) {
  const res = await fetch(SHOPIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) throw new Error(`Shopify HTTP ${res.status}`);
  const json = await res.json();
  if (json.errors) throw new Error(json.errors.map((e: { message: string }) => e.message).join(", "));
  return json.data;
}

function formatCheckoutUrl(url: string): string {
  try {
    const u = new URL(url);
    u.searchParams.set("channel", "online_store");
    // Carry TikTok attribution across the hop to the Shopify checkout domain,
    // otherwise the checkout/purchase events cannot be attributed.
    const { ttclid, ttp } = tiktokAttribution();
    if (ttclid) u.searchParams.set("ttclid", ttclid);
    if (ttp) u.searchParams.set("ttp", ttp);
    return u.toString();
  } catch {
    return url;
  }
}

function trackingConsent(): string {
  try {
    return window.localStorage.getItem("orp_cookie_consent_v1") ?? "unset";
  } catch {
    return "unset";
  }
}

export type CheckoutLine = { merchandiseId: string; quantity: number };

/**
 * Bacteriostatic water cart upsell: a Shopify price rule discounts the bac
 * water line by a fixed £ amount per vial when this code is on the cart.
 * Applied automatically.
 */
export const BAC_WATER_UPSELL = {
  slug: "bacteriostatic-water",
  code: "BACWATER2OFF",
  /** Fixed discount per bacteriostatic water vial, in GBP. */
  amountOff: 2,
} as const;


export async function createCheckout(
  lines: CheckoutLine[],
  _subtotal?: number,
  extraDiscountCodes: string[] = [],
): Promise<string> {
  if (lines.length === 0) throw new Error("Cart is empty");
  const saved = getSavedDiscount();
  const extras = extraDiscountCodes.filter((c) => c !== saved);
  const create = async (codes: string[]) => {
    const data = await storefront(CART_CREATE, {
      input: {
        lines,
        ...(codes.length ? { discountCodes: codes } : {}),
        // Cookie choice travels with the order so the purchase webhook can honour it.
        attributes: [{ key: "_tracking_consent", value: trackingConsent() }],
      },
    });
    const errs = data?.cartCreate?.userErrors ?? [];
    if (errs.length) throw new Error(errs.map((e: { message: string }) => e.message).join(", "));
    return data?.cartCreate?.cart as
      | { checkoutUrl?: string; discountCodes?: { code: string; applicable: boolean }[] }
      | undefined;
  };
  const cart = await create([...(saved ? [saved] : []), ...extras]);
  const url = cart?.checkoutUrl;
  if (!url) throw new Error("No checkout URL returned");
  return formatCheckoutUrl(url);
}


/**
 * Checkout opens in the same browser tab: no popup tab is created, so popup
 * blockers can never interfere. The `tab` arguments are kept on the helper
 * signatures so existing callers compile unchanged; they are always null.
 */
export function openCheckoutTab(): Window | null {
  return null;
}

export function sendToCheckout(tab: Window | null, url: string) {
  window.location.assign(url);
}

export function closeCheckoutTab(tab: Window | null) {
  if (tab && !tab.closed) tab.close();
}
