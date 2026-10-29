import { writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { selectOrpProducts } from "./filter.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const endpoint = process.env.SHOPIFY_PRODUCTS_URL || "https://checkout.oxfordresearchpeptides.com/products.json?limit=250";

const response = await fetch(endpoint);
if (!response.ok) throw new Error(`Catalogue HTTP ${response.status}`);
const body = await response.json();
const { accepted, rejected } = selectOrpProducts(body.products || []);
mkdirSync(resolve(here, "logs"), { recursive: true });
writeFileSync(resolve(here, "fixtures/products.public.json"), JSON.stringify(accepted.map((product) => ({
  id: product.shopify_product_id,
  title: product.shopify_title,
  handle: product.shopify_handle,
  vendor: product.vendor,
  variants: product.variants.map((variant) => ({
    id: variant.shopify_variant_id,
    title: variant.title,
    option1: variant.option_value,
    sku: variant.sku,
    price: variant.price.toFixed(2),
    available: variant.shopify_available,
  })),
})), null, 2));
console.log(JSON.stringify({ accepted: accepted.length, rejected: rejected.length, endpoint }));
