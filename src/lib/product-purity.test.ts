import { test } from "node:test";
import assert from "node:assert/strict";
import { getProduct } from "./products";
import { coaFor } from "./coa";

test("GHK-Cu 50mg purity matches its recorded Janoshik certificate", () => {
  const report = coaFor("ghk-cu", "50mg")[0];
  assert.ok(report);
  assert.equal(report.purity, "99.93%");
  assert.equal(report.batch, "WWB-EGB0625GKU-50");
  assert.equal(getProduct("ghk-cu")?.purity, `${report.purity} Purity`);
});