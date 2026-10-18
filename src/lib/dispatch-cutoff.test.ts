import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { compute } from "../components/dispatch-countdown";

describe("2pm UK dispatch cut-off", () => {
  test("closes at 2pm London time in summer and winter", () => {
    assert.equal(compute(new Date("2026-10-19T12:59:59Z")).open, true);
    assert.equal(compute(new Date("2026-10-19T13:00:00Z")).open, false);
    assert.equal(compute(new Date("2026-10-26T13:59:59Z")).open, true);
    assert.equal(compute(new Date("2026-10-26T14:00:00Z")).open, false);
  });
  test("does not offer a countdown on weekends", () => {
    assert.equal(compute(new Date("2026-10-18T10:00:00Z")).open, false);
  });
});