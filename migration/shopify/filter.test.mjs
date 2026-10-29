import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { selectOrpProducts, classifyOrder, classifyCustomer, planDiscounts, isRetiredProductSlug } from "./filter.mjs";
import { planCustomers } from "./import-customers.mjs";
import { planOrders } from "./import-orders.mjs";
import { planInventory } from "./import-inventory.mjs";

const products = JSON.parse(readFileSync(new URL("./fixtures/products.public.json", import.meta.url), "utf8"));
const customers = JSON.parse(readFileSync(new URL("./fixtures/customers.json", import.meta.url), "utf8"));
const orders = JSON.parse(readFileSync(new URL("./fixtures/orders.json", import.meta.url), "utf8"));

test("public catalogue keeps only ORP handles and drops semaglutide", () => {
  const { accepted, rejected } = selectOrpProducts([
    ...products,
    { id: 1, title: "Semaglutide", handle: "semaglutide", vendor: "Oxford Research Peptides", variants: [{ id: 2, sku: "ORP-SEMA-5MG", price: "10.00", option1: "5mg" }] },
    { id: 3, title: "Other", handle: "other", vendor: "BuyRetaUK", variants: [{ id: 4, sku: "BR-1", price: "10.00" }] },
  ]);
  assert.equal(accepted.length, 18);
  assert.ok(accepted.every((product) => product.variants.every((variant) => variant.sku.startsWith("ORP-"))));
  assert.equal(accepted.find((product) => product.shopify_handle === "retatrutide-2").title, "RT GLP");
  assert.equal(accepted.find((product) => product.shopify_handle === "retatrutide-2").handle, "retatrutide");
  assert.ok(rejected.some((row) => row.reason === "retired-semaglutide"));
  assert.ok(rejected.some((row) => row.reason.startsWith("vendor:")));
  assert.equal(isRetiredProductSlug("semaglutide"), true);
});

test("orders and customers attribute only clean ORP records", () => {
  const orderPlan = planOrders(orders);
  assert.deepEqual(orderPlan.map((row) => row.action), ["import", "flag-ambiguous", "skip"]);
  const customerPlan = planCustomers(customers, orders);
  assert.deepEqual(customerPlan.map((row) => row.action), ["import", "flag-ambiguous", "skip"]);
  assert.equal(classifyOrder(orders[1]).reason, "mixed-brand-order");
  assert.equal(classifyCustomer(customers[2], orders).action, "skip");
});

test("discount and inventory plans skip unusable rows", () => {
  const discounts = planDiscounts(JSON.parse(readFileSync(new URL("./fixtures/discounts.json", import.meta.url), "utf8")));
  assert.deepEqual(discounts.map((row) => row.action), ["upsert", "upsert", "skip"]);
  const inventory = planInventory(JSON.parse(readFileSync(new URL("./fixtures/inventory.json", import.meta.url), "utf8")));
  assert.deepEqual(inventory.map((row) => row.action), ["set", "skip"]);
});
