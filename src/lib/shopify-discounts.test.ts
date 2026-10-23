import { test } from "node:test";
import assert from "node:assert/strict";
import { BAC_WATER_UPSELL, createCheckout, getVariantGid } from "./shopify";
import { DISCOUNT_KEY } from "./discount-code";

test("bank checkout sends no automatic spend codes at £30 or £80", async () => {
  const originalFetch = globalThis.fetch;
  const merchandiseId = getVariantGid("retatrutide", "10mg");
  if (!merchandiseId) throw new Error("Missing product");
  const inputs: { discountCodes?: string[] }[] = [];
  globalThis.fetch = async (_url, options) => {
    const body = JSON.parse(String(options?.body));
    inputs.push(body.variables.input);
    return Response.json({ data: { cartCreate: { cart: { checkoutUrl: "https://example.com/checkout" }, userErrors: [] } } });
  };
  try {
    for (const subtotal of [30, 80, 90]) await createCheckout([{ merchandiseId, quantity: 1 }], subtotal);
    assert.deepEqual(inputs.map(input => input.discountCodes), [undefined, undefined, undefined]);
  } finally { globalThis.fetch = originalFetch; }
});

test("bank checkout preserves saved email code and water offer at £80+", async () => {
  const originalFetch = globalThis.fetch;
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  const merchandiseId = getVariantGid("retatrutide", "10mg");
  if (!merchandiseId) throw new Error("Missing product");
  Object.defineProperty(globalThis, "window", { configurable: true, value: { localStorage: { getItem: (key: string) =>
    key === DISCOUNT_KEY ? JSON.stringify({ code: "WELCOME10-TEST", expires: Date.now() + 100000 }) : null,
  } } });
  let codes: string[] = [];
  globalThis.fetch = async (_url, options) => {
    codes = JSON.parse(String(options?.body)).variables.input.discountCodes;
    return Response.json({ data: { cartCreate: { cart: { checkoutUrl: "https://example.com/checkout" }, userErrors: [] } } });
  };
  try {
    await createCheckout([{ merchandiseId, quantity: 2 }], 90, [BAC_WATER_UPSELL.code]);
    assert.deepEqual(codes, ["WELCOME10-TEST", "BACWATER2OFF"]);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});