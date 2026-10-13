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
  test("£6 water minus £2 offer plus £3.99 shipping equals £7.99", () => {
    const summary = buildNiftiPaySummary([line("bacteriostatic-water", "3mL")], 3.99);
    assert.equal(summary.items[0].variant, "3mL");
    assert.equal(summary.items[0].quantity, 1);
    assert.equal(summary.items[0].unitPrice, 6);
    assert.equal(summary.items[0].price, 6);
    assert.deepEqual(summary.discounts, [{ label: "Bac water offer", amount: 2 }]);
    assert.equal(summary.total, 7.99);
  });
  test("default product uses quantity one and the existing store credit", () => {
    const summary = buildNiftiPaySummary([line("retatrutide", "10mg")], 0);
    assert.equal(summary.items[0].quantity, 1);
    assert.equal(summary.total, 40);
  });
  test("never permits payment when the authoritative draft amount differs", () => {
    const summary = buildNiftiPaySummary([line("bacteriostatic-water", "3mL")], 3.99);
    assert.throws(() => verifyNiftiPayTotal(summary, 4), /total mismatch/);
    assert.doesNotThrow(() => verifyNiftiPayTotal(summary, 7.99));
  });
});