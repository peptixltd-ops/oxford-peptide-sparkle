import { test } from "node:test";
import assert from "node:assert/strict";
import {
  MAX_SEARCH_SUGGESTIONS,
  normalizeProductTerm,
  searchProductSuggestions,
  suggestionPriceLabel,
} from "./product-search.ts";

const slugsFor = (query: string) => searchProductSuggestions(query).map((p) => p.slug);

test("normalising drops case, hyphens and spaces", () => {
  assert.equal(normalizeProductTerm("BPC-157"), "bpc157");
  assert.equal(normalizeProductTerm("tb 500"), "tb500");
});

test("'bpc' finds BPC-157 and 'bpc 157' finds it too", () => {
  assert.ok(slugsFor("bpc").includes("bpc-157"));
  assert.equal(searchProductSuggestions("bpc 157")[0]?.slug, "bpc-157");
});

test("'tb500' with no hyphen finds TB-500", () => {
  assert.ok(slugsFor("tb500").includes("tb-500"));
});

test("'reta' finds Retatrutide", () => {
  assert.equal(searchProductSuggestions("reta")[0]?.slug, "retatrutide");
});

test("matching is case-insensitive", () => {
  assert.deepEqual(slugsFor("SELANK"), slugsFor("selank"));
});

test("suggestions are capped at eight", () => {
  assert.equal(MAX_SEARCH_SUGGESTIONS, 8);
  assert.equal(searchProductSuggestions("e").length, 8);
});

test("an empty query suggests nothing", () => {
  assert.deepEqual(searchProductSuggestions("   "), []);
});

test("a nonsense query suggests nothing", () => {
  assert.deepEqual(searchProductSuggestions("zzqqxx"), []);
});

test("price label shows a single price, or 'from' when there are sizes", () => {
  assert.equal(suggestionPriceLabel(searchProductSuggestions("selank")[0]!), "£22");
  assert.match(suggestionPriceLabel(searchProductSuggestions("tirzepatide")[0]!), /^from £\d+$/);
});
