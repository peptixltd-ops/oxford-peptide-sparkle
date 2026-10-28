import { test } from "node:test";
import assert from "node:assert/strict";
import { isRetiredProductSlug, withoutRetiredProducts } from "./retired-products";
import { products, getProduct } from "./products";
import { getVariantGid } from "./shopify";
import { buildNiftiPaySummary } from "./niftipay-summary";

test("Semaglutide is absent from the sale catalogue", () => {
  assert.equal(getProduct("semaglutide"), undefined);
  assert.equal(products.some(p => /semaglutide/i.test(p.name)), false);
});
test("Semaglutide has no checkout variant and its former card line is rejected", () => {
  assert.equal(getVariantGid("semaglutide", "15mg"), undefined);
  assert.throws(() => buildNiftiPaySummary([{ merchandiseId: "gid://shopify/ProductVariant/54181697421653", quantity: 1 }], 0), /Unknown product/);
});
test("legacy Semaglutide product slugs redirect without retiring other products", () => {
  for (const slug of ["semaglutide", "semaglutide-15mg", "Semaglutide", "orp-semaglutide-15mg", "semaglutide_15mg"]) {
    assert.equal(isRetiredProductSlug(slug), true);
  }
  for (const slug of ["tirzepatide", "retatrutide", "cagrilintide", "semax"]) {
    assert.equal(isRetiredProductSlug(slug), false);
  }
});
test("saved baskets drop only retired Semaglutide lines", () => {
  const retained = { slug: "tirzepatide", variantId: "15mg", qty: 2 };
  assert.deepEqual(withoutRetiredProducts([{ slug: "semaglutide", variantId: "15mg", qty: 1 }, retained]), [retained]);
});