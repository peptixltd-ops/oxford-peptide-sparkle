import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { selectOrpProducts } from "./filter.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const fixture = JSON.parse(readFileSync(new URL("./fixtures/products.public.json", import.meta.url), "utf8"));
const { accepted, rejected } = selectOrpProducts(fixture);
const order = [
  "retatrutide", "tirzepatide", "ghk-cu", "mots-c", "bacteriostatic-water", "nad", "bpc-tb500",
  "ipamorelin", "selank", "tesamorelin", "klow", "tb-500", "igf-lr3", "cagrilintide", "ss-31",
  "pt-141", "semax", "bpc-157",
];
accepted.sort((a, b) => order.indexOf(a.handle) - order.indexOf(b.handle));
const catalogue = { generated_from: "public-products-json", vendor: "Oxford Research Peptides", products: accepted, rejected };
for (const relative of ["packages/config/catalogue.json", "apps/backend/apps/backend/data/catalogue.json"]) {
  const path = resolve(root, relative);
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, JSON.stringify(catalogue, null, 2));
}
console.log(JSON.stringify({ products: accepted.length, rejected: rejected.length, handles: accepted.map((p) => p.handle) }, null, 2));
