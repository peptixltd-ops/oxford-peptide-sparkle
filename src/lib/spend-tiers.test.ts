import { test } from "node:test";
import assert from "node:assert/strict";
import { nextSpendTier, spendTiersLine } from "./spend-tiers";

test("product line lists only the existing tiers", () => {
  assert.equal(spendTiersLine(), "Spend £30, save £5 · Spend £80, save £10");
});
test("under £30 points at £5 off", () => {
  const t = nextSpendTier(18);
  assert.equal(t?.amount, 5); assert.equal(t?.needed, 12);
});
test("between £30 and £80 points at £10 off", () => {
  const t = nextSpendTier(68);
  assert.equal(t?.amount, 10); assert.equal(t?.needed, 12);
});
test("£80 or more has no next tier", () => assert.equal(nextSpendTier(80), null));
