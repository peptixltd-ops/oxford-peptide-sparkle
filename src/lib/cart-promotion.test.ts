import { test } from "node:test";
import assert from "node:assert/strict";
import { CART_PROMOTION, cartPromotionActive, cartPromotionDiscount, bankCheckoutDiscountCodes } from "./cart-promotion";

const during = Date.parse("2026-10-30T17:50:00Z");
const end = Date.parse("2026-11-03T00:00:00Z");

test("Halloween promotion is active until but not at the London expiry", () => {
  assert.equal(CART_PROMOTION.code, "HALLOWEEN15");
  assert.equal(CART_PROMOTION.endsAt, "2026-11-03T00:00:00Z");
  assert.equal(cartPromotionActive(end - 1), true);
  assert.equal(cartPromotionActive(end), false);
});

test("15 percent is rounded to pence and stops after expiry", () => {
  assert.equal(cartPromotionDiscount(19.99, during), 3);
  assert.equal(cartPromotionDiscount(12, during), 1.8);
  assert.equal(cartPromotionDiscount(0, during), 0);
  assert.equal(cartPromotionDiscount(19.99, end), 0);
});

test("non-combining automatic promotion suppresses welcome and water codes", () => {
  assert.deepEqual(bankCheckoutDiscountCodes("OXFORDWELCOME10", ["BACWATER2OFF"], during), []);
});

test("original saved welcome and water codes resume at expiry", () => {
  assert.deepEqual(bankCheckoutDiscountCodes("OXFORDWELCOME10", ["BACWATER2OFF"], end), ["OXFORDWELCOME10", "BACWATER2OFF"]);
});