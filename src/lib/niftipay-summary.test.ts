import { describe, expect, test } from "bun:test";
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
    expect(summary.items[0]).toMatchObject({ variant: "3mL", quantity: 1, unitPrice: 6, price: 6 });
    expect(summary.discounts).toEqual([{ label: "Bac water offer", amount: 2 }]);
    expect(summary.total).toBe(7.99);
  });
  test("default product uses quantity one and the existing store credit", () => {
    const summary = buildNiftiPaySummary([line("retatrutide", "10mg")], 0);
    expect(summary.items[0].quantity).toBe(1);
    expect(summary.total).toBe(40);
  });
  test("never permits payment when the authoritative draft amount differs", () => {
    const summary = buildNiftiPaySummary([line("bacteriostatic-water", "3mL")], 3.99);
    expect(() => verifyNiftiPayTotal(summary, 4)).toThrow("total mismatch");
    expect(() => verifyNiftiPayTotal(summary, 7.99)).not.toThrow();
  });
});