import { test } from "node:test";
import assert from "node:assert/strict";
import { syncNewsletterCustomer, syncNewsletterCustomerSafely } from "./newsletter-shopify.server";

const subscriber = { email: "newsletter@example.test", source: "footer", code: "WELCOME10-ABC123", smsConsent: false };
function mockShopify(existing = false, scopes = ["write_customers"]) {
  const calls: Array<{ query: string; variables: Record<string, any> }> = [];
  const request: typeof fetch = async (url, init) => {
    if (String(url).includes("access_scopes")) return Response.json({ access_scopes: scopes.map(handle => ({ handle })) });
    const call = JSON.parse(String(init?.body));
    calls.push(call);
    if (call.query.startsWith("query")) return Response.json({ data: { customers: { nodes: existing ? [{ id: "gid://shopify/Customer/1", email: subscriber.email }] : [] } } });
    const name = call.query.match(/\{ (\w+)\(/)?.[1];
    return Response.json({ data: { [name]: { customer: { id: "gid://shopify/Customer/1" }, userErrors: [] } } });
  };
  return { request, calls };
}

test("creates new subscribers and explicitly subscribes single opt-in email consent", async () => {
  const { request, calls } = mockShopify();
  await syncNewsletterCustomer(subscriber, ["test-token"], "test.myshopify.com", "2025-07", request);
  assert.ok(calls.some(call => call.query.includes("customerCreate(")));
  assert.deepEqual(calls.find(call => call.query.includes("customerEmailMarketingConsentUpdate("))?.variables.input.emailMarketingConsent,
    { marketingState: "SUBSCRIBED", marketingOptInLevel: "SINGLE_OPT_IN" });
});
test("updates existing subscribers without replacing their existing tags", async () => {
  const { request, calls } = mockShopify(true);
  await syncNewsletterCustomer(subscriber, ["test-token"], "test.myshopify.com", "2025-07", request);
  assert.equal(calls.find(call => call.query.includes("customerUpdate("))?.variables.input.id, "gid://shopify/Customer/1");
  assert.deepEqual(calls.find(call => call.query.includes("tagsAdd("))?.variables.tags, ["newsletter", "footer"]);
});
test("stores the exact welcome code before enabling email automation", async () => {
  const { request, calls } = mockShopify();
  await syncNewsletterCustomer(subscriber, ["test-token"], "test.myshopify.com", "2025-07", request);
  const index = calls.findIndex(call => call.query.includes("metafieldsSet("));
  assert.deepEqual(calls[index].variables.metafields, [{ ownerId: "gid://shopify/Customer/1", namespace: "custom", key: "welcome_code", type: "single_line_text_field", value: "WELCOME10-ABC123" }]);
  assert.ok(index < calls.findIndex(call => call.query.includes("customerEmailMarketingConsentUpdate(")));
});
test("phone and SMS consent are sent only with explicit SMS consent", async () => {
  for (const smsConsent of [true, false]) {
    const { request, calls } = mockShopify();
    await syncNewsletterCustomer({ ...subscriber, phone: "+447700900123", smsConsent }, ["test-token"], "test.myshopify.com", "2025-07", request);
    assert.equal(calls.find(call => call.query.includes("customerCreate("))?.variables.input.phone, smsConsent ? "+447700900123" : undefined);
    assert.equal(calls.some(call => call.query.includes("customerSmsMarketingConsentUpdate(")), smsConsent);
  }
});
test("missing write_customers cannot block saved-code delivery", async () => {
  const { request, calls } = mockShopify(false, ["write_discounts"]);
  await assert.rejects(syncNewsletterCustomer(subscriber, ["test-token"], "test.myshopify.com", "2025-07", request), /write_customers/);
  await assert.doesNotReject(syncNewsletterCustomerSafely(subscriber, ["test-token"], "test.myshopify.com", "2025-07", request));
  assert.equal(calls.length, 0);
});
test("Shopify mutation errors cannot block saved-code delivery", async () => {
  const { request } = mockShopify();
  const failing: typeof fetch = async (url, init) => {
    if (String(init?.body).includes("customerCreate(")) return Response.json({ data: { customerCreate: { customer: null, userErrors: [{ message: "Customer write denied" }] } } });
    return request(url, init);
  };
  await assert.rejects(syncNewsletterCustomer(subscriber, ["test-token"], "test.myshopify.com", "2025-07", failing), /Customer write denied/);
  await assert.doesNotReject(syncNewsletterCustomerSafely(subscriber, ["test-token"], "test.myshopify.com", "2025-07", failing));
});