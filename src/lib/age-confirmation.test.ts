import { describe, expect, test } from "bun:test";
import { isAgeConfirmed } from "./age-confirmation";

describe("18-plus entry confirmation", () => {
  test("requires an explicitly checked checkbox", () => {
    expect(isAgeConfirmed(true)).toBe(true);
    for (const value of [false, "indeterminate", "true", 18, undefined, null]) {
      expect(isAgeConfirmed(value)).toBe(false);
    }
  });
});