// Shopify Storefront API client — handles cart creation and checkout redirect.
// Only Oxford Research Peptides (ORP-) variants are mapped here.

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
  "semaglutide::15mg": "gid://shopify/ProductVariant/54181697421653",
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
      cart { id checkoutUrl }
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
    return u.toString();
  } catch {
    return url;
  }
}

export type CheckoutLine = { merchandiseId: string; quantity: number };

/**
 * Automatic basket credit tiers. Shopify codes can only hold one fixed amount,
 * so the best qualifying code is resolved here and applied to the cart for the
 * customer (they never have to type anything).
 */
export const CREDIT_TIERS = [
  { threshold: 80, amount: 10, code: "SAVE10" },
  { threshold: 30, amount: 5, code: "SAVE5" },
] as const;

export function creditForSubtotal(subtotal: number) {
  return CREDIT_TIERS.find((t) => subtotal >= t.threshold) ?? null;
}

export async function createCheckout(lines: CheckoutLine[], subtotal?: number): Promise<string> {
  if (lines.length === 0) throw new Error("Cart is empty");
  const credit = typeof subtotal === "number" ? creditForSubtotal(subtotal) : null;
  const data = await storefront(CART_CREATE, {
    input: { lines, ...(credit ? { discountCodes: [credit.code] } : {}) },
  });
  const errs = data?.cartCreate?.userErrors ?? [];
  if (errs.length) throw new Error(errs.map((e: { message: string }) => e.message).join(", "));
  const url = data?.cartCreate?.cart?.checkoutUrl;
  if (!url) throw new Error("No checkout URL returned");
  return formatCheckoutUrl(url);
}

/**
 * Popup blockers (Safari/Firefox by default) suppress `window.open` calls made
 * after an await, because the user-activation window has expired. So open the
 * tab synchronously inside the click handler, then point it at the checkout URL
 * once we have it. If the browser blocked it anyway, fall back to same-tab
 * navigation so the shopper always reaches checkout.
 */
export function openCheckoutTab(): Window | null {
  if (typeof window === "undefined") return null;
  try {
    return window.open("about:blank", "_blank");
  } catch {
    return null;
  }
}

export function sendToCheckout(tab: Window | null, url: string) {
  if (tab && !tab.closed) {
    tab.location.href = url;
    return;
  }
  window.location.assign(url);
}

export function closeCheckoutTab(tab: Window | null) {
  if (tab && !tab.closed) tab.close();
}
