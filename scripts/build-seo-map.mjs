import { writeFileSync } from "node:fs";
import catalogue from "../packages/config/catalogue.json" with { type: "json" };
import research from "../packages/config/research-index.json" with { type: "json" };

const rows = [["old_url", "new_url", "page_type", "indexable", "redirect", "canonical", "status"]];
const add = (path, type, indexable, redirect, status) => {
  rows.push([`https://oxfordresearchpeptides.com${path}`, `https://oxfordresearchpeptides.com${path}`, type, indexable, redirect, `https://oxfordresearchpeptides.com${path}`, status]);
};

for (const path of ["/", "/shop", "/about", "/contact", "/faqs", "/coas", "/privacy-policy", "/terms", "/cookie-policy", "/disclaimer", "/shipping-policy", "/refund-policy", "/cancellation-policy", "/research-use-only", "/testing-and-quality-control", "/certificate-of-analysis", "/account", "/cart", "/checkout", "/search"]) {
  const indexable = ["/account", "/cart", "/checkout", "/search"].includes(path) ? "no" : "yes";
  const status = indexable === "yes" ? "ready" : "noindex";
  add(path === "/" ? "/" : path, path === "/" ? "home" : path.slice(1), indexable, "no", status);
}
for (const product of catalogue.products) add(`/products/${product.handle}`, "product", "yes", "no", "ready");
rows.push(["https://oxfordresearchpeptides.com/products/semaglutide", "https://oxfordresearchpeptides.com/shop", "retired-product", "no", "301", "https://oxfordresearchpeptides.com/shop", "ready"]);
rows.push(["https://oxfordresearchpeptides.com/products/retatrutide-2", "https://oxfordresearchpeptides.com/products/retatrutide", "legacy-shopify-handle", "no", "301", "https://oxfordresearchpeptides.com/products/retatrutide", "ready"]);
for (const entry of research) {
  rows.push([
    `https://oxfordresearchpeptides.com${entry.path}`,
    `https://oxfordresearchpeptides.com${entry.path}`,
    entry.page_type,
    "hold",
    "no",
    `https://oxfordresearchpeptides.com${entry.path}`,
    "hold-legacy-content",
  ]);
}

const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
writeFileSync(new URL("../SEO_MIGRATION_MAP.csv", import.meta.url), `${csv}\n`);
console.log(`rows ${rows.length - 1}`);
