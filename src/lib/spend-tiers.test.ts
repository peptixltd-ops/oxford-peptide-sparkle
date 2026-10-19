import { describe, expect, test } from "bun:test";
import { nextSpendTier, spendTiersLine } from "./spend-tiers";

describe("spend tiers", () => {
  test("product line lists only the existing tiers", () => {
    expect(spendTiersLine()).toBe("Spend £30, save £5 · Spend £80, save £10");
  });
  test("under £30 points at £5 off", () => {
    expect(nextSpendTier(18)).toMatchObject({ amount: 5, needed: 12 });
  });
  test("between £30 and £80 points at £10 off", () => {
    expect(nextSpendTier(68)).toMatchObject({ amount: 10, needed: 12 });
  });
  test("£80 or more has no next tier", () => {
    expect(nextSpendTier(80)).toBeNull();
  });
});
