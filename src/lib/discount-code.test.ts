import { test } from "node:test";
import assert from "node:assert/strict";
import { discountFromSearch, normalizeDiscountCode, DISCOUNT_TTL_MS } from "./discount-code";

test("codes from links are uppercased", () => {
  assert.equal(discountFromSearch("?discount=welcome10"), "WELCOME10");
  assert.equal(discountFromSearch("?discount_code=spring"), "SPRING");
  assert.equal(discountFromSearch("?x=1"), null);
  assert.equal(normalizeDiscountCode("bad code!"), null);
});
test("saved code lasts 30 days", () => {
  assert.equal(DISCOUNT_TTL_MS, 30 * 24 * 60 * 60 * 1000);
});
