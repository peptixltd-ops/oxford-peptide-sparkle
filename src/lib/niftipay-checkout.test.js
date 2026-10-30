import { test, mock } from "bun:test";
import assert from "node:assert/strict";
import { getVariantGid } from "./shopify";

let draftInput;
let paymentInput;
let savedOrder;
let forcedDraftTotal;
let codeLookups = 0;
mock.module("./niftipay.server", () => ({
  shopifyAdmin: async (query, variables) => {
    if (query.includes("customers(first")) return { customers: { nodes: [{ id: "gid://shopify/Customer/1" }] } };
    if (query.includes("codeDiscountNodeByCode")) { codeLookups++; return { codeDiscountNodeByCode: { codeDiscount: {
      status: variables.code === "WELCOME10-TEST" ? "ACTIVE" : "EXPIRED",
      combinesWith: { productDiscounts: true, orderDiscounts: true },
    } } }; }
    draftInput = variables.input;
    const shipping = Number(draftInput.shippingLine.priceWithCurrency.amount);
    const total = draftInput.lineItems.reduce((sum, line) => sum +
      (line.variantId === getVariantGid("bacteriostatic-water", "3mL")
        ? (draftInput.discountCodes?.includes("BACWATER2OFF") ? 4 : 6)
        : line.variantId === getVariantGid("ghk-cu", "50mg") ? 16 : 45) * line.quantity, 0)
      - (draftInput.discountCodes?.includes("WELCOME10-TEST") ? 10 : 0)
      - (draftInput.appliedDiscount?.value ?? 0);
    return { draftOrderCreate: { userErrors: [], draftOrder: {
      id: "gid://shopify/DraftOrder/1", legacyResourceId: "1",
      shippingLine: { originalPriceSet: { shopMoney: { amount: String(shipping) } } },
      totalPriceSet: { shopMoney: { amount: String(forcedDraftTotal ?? total + shipping), currencyCode: "GBP" } },
    } } };
  },
  getAdminDb: async () => ({ from: () => ({ insert: async (row) => { savedOrder = row; return { error: null }; } }) }),
}));

const { Route } = await import("../routes/api/public/niftipay-checkout");
const handler = (Route.options).server.handlers.POST;
const merchandiseId = getVariantGid("bacteriostatic-water", "3mL");
const customer = { name: "Test Researcher", email: "researcher@example.com", phone: "+12025550123", address1: "123 Test Street", city: "Test City", postcode: "90001", country: "GB" };

test("checkout server ignores forged shipping, charges GBP and passes validated region to both order addresses", async () => {
  const originalNow = Date.now;
  Date.now = () => Date.parse("2026-11-03T00:00:00Z");
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.NIFTIPAY_API_KEY;
  const originalId = process.env.NIFTIPAY_INTEGRATION_ID;
  process.env.NIFTIPAY_API_KEY = "test-only";
  process.env.NIFTIPAY_INTEGRATION_ID = "test-only";
  globalThis.fetch = (async (_url, options) => {
    paymentInput = JSON.parse(options.body);
    return Response.json({ payUrl: "https://www.niftipay.com/test-only", id: "test-only", pricing: { totalCents: Math.round(paymentInput.amount * 100) } });
  });
  try {
    for (const [country, method, quantity, expectedShipping, expectedTotal] of [["GB", "express", 1, 3.99, 7.99], ["GB", "standard", 1, 5.99, 9.99], ["GB", "express", 2, 0, 8], ["GB", "standard", 2, 0, 8], ["US", "express", 1, 15, 19], ["US", "express", 2, 15, 23], ["CA", "standard", 1, 15, 19], ["AU", "express", 1, 15, 19]]) {
      const response = await handler({ request: new Request("http://localhost/api/public/niftipay-checkout", { method: "POST", body: JSON.stringify({ lines: [{ merchandiseId, quantity }], customer: { ...customer, country, region: "Test Region" }, shippingMethod: method, shipping: 99, amount: 0 }) }) });
      assert.equal(response.status, 200);
      const result = await response.json();
      assert.equal(result.shippingApplied, expectedShipping);
      assert.equal(result.amount, expectedTotal);
      assert.equal(paymentInput.amount, expectedTotal);
      assert.equal(paymentInput.currency, "GBP");
      assert.equal(draftInput.shippingAddress.province, "Test Region");
      assert.equal(draftInput.billingAddress.province, "Test Region");
      assert.equal(savedOrder.shipping_address.province, "Test Region");
    }
    for (const quantity of [1, 2]) {
      const response = await handler({ request: new Request("http://localhost/api/public/niftipay-checkout", {
        method: "POST", body: JSON.stringify({ lines: [{ merchandiseId: getVariantGid("retatrutide", "10mg"), quantity }],
          customer, shippingMethod: "express", discountCodes: ["SAVE5", "SAVE10"] }),
      }) });
      assert.equal(response.status, 200);
      assert.equal((await response.json()).amount, 45 * quantity);
      assert.equal(draftInput.discountCodes, undefined);
    }
    const response = await handler({ request: new Request("http://localhost/api/public/niftipay-checkout", {
      method: "POST", body: JSON.stringify({ lines: [
        { merchandiseId: getVariantGid("retatrutide", "10mg"), quantity: 2 }, { merchandiseId, quantity: 1 },
      ], customer, shippingMethod: "express", discountCode: "welcome10-test" }),
    }) });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).amount, 84);
    assert.deepEqual(draftInput.discountCodes, ["WELCOME10-TEST", "BACWATER2OFF"]);
  } finally {
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.NIFTIPAY_API_KEY; else process.env.NIFTIPAY_API_KEY = originalKey;
    if (originalId === undefined) delete process.env.NIFTIPAY_INTEGRATION_ID; else process.env.NIFTIPAY_INTEGRATION_ID = originalId;
  }
});

test("active card promotion records HALLOWEEN15, ignores other codes and charges exactly £13.60", async () => {
  const originalFetch = globalThis.fetch;
  const originalNow = Date.now;
  const originalKey = process.env.NIFTIPAY_API_KEY;
  const originalId = process.env.NIFTIPAY_INTEGRATION_ID;
  Date.now = () => Date.parse("2026-11-03T00:00:00Z") - 1;
  process.env.NIFTIPAY_API_KEY = "test-only";
  process.env.NIFTIPAY_INTEGRATION_ID = "test-only";
  let paymentCalls = 0;
  globalThis.fetch = async (_url, options) => {
    paymentCalls++;
    paymentInput = JSON.parse(options.body);
    return Response.json({ payUrl: "https://www.niftipay.com/test-only", pricing: { totalCents: Math.round(paymentInput.amount * 100) } });
  };
  const request = () => new Request("http://localhost/api/public/niftipay-checkout", { method: "POST", body: JSON.stringify({
    lines: [{ merchandiseId: getVariantGid("ghk-cu", "50mg"), quantity: 1 }], customer, shippingMethod: "express",
    discountCode: "OXFORDWELCOME10", discountCodes: ["BACWATER2OFF", "WELCOME10-TEST"], amount: 0,
  }) });
  try {
    const lookupsBefore = codeLookups;
    const response = await handler({ request: request() });
    assert.equal(response.status, 200);
    const result = await response.json();
    assert.equal(result.summary.total, 13.6);
    assert.equal(result.amount, 13.6);
    assert.equal(paymentInput.amount, 13.6);
    assert.equal(savedOrder.amount, 13.6);
    assert.equal(codeLookups, lookupsBefore);
    assert.equal(draftInput.discountCodes, undefined);
    assert.equal(draftInput.acceptAutomaticDiscounts, false);
    assert.deepEqual(draftInput.appliedDiscount, { title: "HALLOWEEN15", description: "15% off", valueType: "FIXED_AMOUNT", value: 2.4 });
    assert.deepEqual(draftInput.customAttributes, [{ key: "discount_code", value: "HALLOWEEN15" }]);
    forcedDraftTotal = 16;
    assert.equal((await handler({ request: request() })).status, 502);
    assert.equal(paymentCalls, 1);
  } finally {
    forcedDraftTotal = undefined;
    Date.now = originalNow;
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.NIFTIPAY_API_KEY; else process.env.NIFTIPAY_API_KEY = originalKey;
    if (originalId === undefined) delete process.env.NIFTIPAY_INTEGRATION_ID; else process.env.NIFTIPAY_INTEGRATION_ID = originalId;
  }
});