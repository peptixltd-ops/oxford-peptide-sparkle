import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { buildNiftiPaySummary, verifyNiftiPayTotal } from "./niftipay-summary";
import { getVariantGid } from "./shopify";

const line = (slug: string, variant: string, quantity = 1) => {
  const merchandiseId = getVariantGid(slug, variant);
  if (!merchandiseId) throw new Error("Missing test product");
  return { merchandiseId, quantity };
};

describe("NiftiPay verified order summary", () => {
  const afterPromo = Date.parse("2026-11-03T00:00:00Z");
  test("£6 water minus £2 offer plus £3.99 shipping equals £7.99", () => {
    const summary = buildNiftiPaySummary([line("bacteriostatic-water", "3mL")], 3.99, afterPromo);
    assert.equal(summary.items[0].variant, "3mL");
    assert.equal(summary.items[0].quantity, 1);
    assert.equal(summary.items[0].unitPrice, 6);
    assert.equal(summary.items[0].price, 6);
    assert.deepEqual(summary.discounts, [{ label: "Bac water offer", amount: 2 }]);
    assert.equal(summary.total, 7.99);
  });
  test("£30+ orders receive no automatic £5 spend credit", () => {
    const summary = buildNiftiPaySummary([line("retatrutide", "10mg")], 0, afterPromo);
    assert.equal(summary.items[0].quantity, 1);
    assert.equal(summary.subtotal, 45);
    assert.deepEqual(summary.discounts, []);
    assert.equal(summary.total, 45);
  });
  test("£90 basket receives no automatic spend-tier discount", () => {
    const summary = buildNiftiPaySummary([line("retatrutide", "10mg", 2)], 0, afterPromo);
    assert.equal(summary.subtotal, 90);
    assert.deepEqual(summary.discounts, []);
    assert.equal(summary.total, 90);
  });
  test("never permits payment when the authoritative draft amount differs", () => {
    const summary = buildNiftiPaySummary([line("bacteriostatic-water", "3mL")], 3.99, afterPromo);
    assert.throws(() => verifyNiftiPayTotal(summary, 4), /total mismatch/);
    assert.doesNotThrow(() => verifyNiftiPayTotal(summary, 7.99));
  });
  test("active Halloween turns £16 into £13.60 and excludes water discount", () => {
    const now = Date.parse("2026-10-30T18:01:00Z");
    const summary = buildNiftiPaySummary([line("ghk-cu", "50mg")], 0, now);
    assert.equal(summary.subtotal, 16);
    assert.equal(summary.total, 13.6);
    assert.deepEqual(summary.discounts, [{ label: "HALLOWEEN15 – 15% off applied", amount: 2.4 }]);
    const withWater = buildNiftiPaySummary([line("ghk-cu", "50mg"), line("bacteriostatic-water", "3mL")], 15, now);
    assert.equal(withWater.total, 33.7);
    assert.equal(withWater.discounts.length, 1);
    assert.equal(withWater.discounts[0].amount, 3.3);
  });
});