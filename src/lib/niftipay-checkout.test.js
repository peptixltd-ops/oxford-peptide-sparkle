import { test, mock } from "bun:test";
import assert from "node:assert/strict";
import { getVariantGid } from "./shopify";

let draftInput;
let paymentInput;
let savedOrder;
mock.module("./niftipay.server", () => ({
  shopifyAdmin: async (query, variables) => {
    if (query.includes("customers(first")) return { customers: { nodes: [{ id: "gid://shopify/Customer/1" }] } };
    draftInput = variables.input;
    const shipping = Number(draftInput.shippingLine.priceWithCurrency.amount);
    return { draftOrderCreate: { userErrors: [], draftOrder: {
      id: "gid://shopify/DraftOrder/1", legacyResourceId: "1",
      shippingLine: { originalPriceSet: { shopMoney: { amount: String(shipping) } } },
      totalPriceSet: { shopMoney: { amount: String(4 + shipping), currencyCode: "GBP" } },
    } } };
  },
  getAdminDb: async () => ({ from: () => ({ insert: async (row) => { savedOrder = row; return { error: null }; } }) }),
}));

const { Route } = await import("../routes/api/public/niftipay-checkout");
const handler = (Route.options).server.handlers.POST;
const merchandiseId = getVariantGid("bacteriostatic-water", "3mL");
const customer = { name: "Test Researcher", email: "researcher@example.com", phone: "+12025550123", address1: "123 Test Street", city: "Test City", postcode: "90001", country: "GB" };

test("checkout server ignores forged shipping, charges GBP and passes validated region to both order addresses", async () => {
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
    for (const [country, method, expectedShipping, expectedTotal] of [["GB", "express", 3.99, 7.99], ["GB", "standard", 5.99, 9.99], ["US", "express", 15, 19], ["CA", "standard", 15, 19], ["AU", "express", 15, 19]]) {
      const response = await handler({ request: new Request("http://localhost/api/public/niftipay-checkout", { method: "POST", body: JSON.stringify({ lines: [{ merchandiseId, quantity: 1 }], customer: { ...customer, country, region: "Test Region" }, shippingMethod: method, shipping: 0, amount: 0 }) }) });
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
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.NIFTIPAY_API_KEY; else process.env.NIFTIPAY_API_KEY = originalKey;
    if (originalId === undefined) delete process.env.NIFTIPAY_INTEGRATION_ID; else process.env.NIFTIPAY_INTEGRATION_ID = originalId;
  }
});