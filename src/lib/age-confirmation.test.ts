import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { isAgeConfirmed } from "./age-confirmation";

describe("18-plus entry confirmation", () => {
  test("requires an explicitly checked checkbox", () => {
    assert.equal(isAgeConfirmed(true), true);
    for (const value of [false, "indeterminate", "true", 18, undefined, null]) {
      assert.equal(isAgeConfirmed(value), false);
    }
  });
});