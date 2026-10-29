import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyOrder } from "./filter.mjs";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

export function planOrders(orders) {
  return orders.map((order) => {
    const decision = classifyOrder(order);
    return {
      shopify_order_id: order.id,
      email_present: Boolean(order.email),
      action: decision.action,
      reason: decision.reason,
      orp_skus: decision.orp.map((line) => line.sku),
      other_vendors: [...new Set(decision.other.map((line) => line.vendor).filter(Boolean))],
    };
  });
}

async function main() {
  if (!usesFixture()) {
    if (!assertAdminToken()) return;
    throw new Error("Live order import requires SHOPIFY_ADMIN_TOKEN. Mixed-brand orders are flagged and not imported as clean ORP orders.");
  }
  const orders = JSON.parse(readFileSync(resolve(here, "fixtures/orders.json"), "utf8"));
  const plan = planOrders(orders);
  const outDir = resolve(here, "logs");
  mkdirSync(outDir, { recursive: true });
  const file = resolve(outDir, "orders-plan.json");
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, import: plan.filter((p) => p.action === "import").length, ambiguous: plan.filter((p) => p.action === "flag-ambiguous").length, skipped: plan.filter((p) => p.action === "skip").length }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
