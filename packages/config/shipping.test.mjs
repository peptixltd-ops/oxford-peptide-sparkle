import test from "node:test";
import assert from "node:assert/strict";
import { quoteShipping } from "./shipping.mjs";

test("UK express is £3.99 under £12 and free from £12", () => {
  assert.equal(quoteShipping(11.99, "GB", "express").amount, 3.99);
  assert.equal(quoteShipping(12, "gb", "express").amount, 0);
  assert.equal(quoteShipping(5, "GB", "standard").amount, 5.99);
  assert.equal(quoteShipping(40, "GB", "standard").amount, 0);
});

test("international is a flat £15 and Norway, Russia and Belarus are refused", () => {
  assert.equal(quoteShipping(100, "US", "express").amount, 15);
  assert.equal(quoteShipping(100, "FR").method, "international");
  assert.throws(() => quoteShipping(20, "NO"), /Norway/);
  assert.throws(() => quoteShipping(20, "RU"), /Russia/);
  assert.throws(() => quoteShipping(20, "BY"), /Belarus/);
});
