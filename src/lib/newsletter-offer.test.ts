import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("newsletter codes and fallback use the Welcome 10% discount", () => {
  const source = readFileSync(new URL("../routes/api/public/newsletter-subscribe.ts", import.meta.url), "utf8");
  assert.match(source, /const PARENT_PRICE_RULE_ID = "1847011410261"/);
  assert.match(source, /const FALLBACK_DISCOUNT_CODE = "OXFORDWELCOME10"/);
  assert.match(source, /let code = `WELCOME10-\$\{alphanumSuffix\(6\)\}`/);
});