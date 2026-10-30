import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { classifyCustomer } from "./filter.mjs";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

function loadFixture(name) {
  return JSON.parse(readFileSync(resolve(here, "fixtures", name), "utf8"));
}

export function planCustomers(customers, orders) {
  return customers.map((customer) => {
    const decision = classifyCustomer(customer, orders);
    return {
      shopify_customer_id: customer.id,
      email: customer.email,
      action: decision.action,
      reason: decision.reason,
      metadata: {
        shopify_customer_id: customer.id,
        migration_status: decision.action === "import" ? "needs_activation" : decision.action,
      },
    };
  });
}

async function main() {
  let customers;
  let orders;
  if (usesFixture()) {
    customers = loadFixture("customers.json");
    orders = loadFixture("orders.json");
  } else {
    if (!assertAdminToken()) return;
    throw new Error("Live customer import is blocked until SHOPIFY_ADMIN_TOKEN is present. Re-run with the token; this script is idempotent and resumable.");
  }
  const plan = planCustomers(customers, orders);
  const outDir = resolve(here, "logs");
  mkdirSync(outDir, { recursive: true });
  const file = resolve(outDir, "customers-plan.json");
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, import: plan.filter((p) => p.action === "import").length, ambiguous: plan.filter((p) => p.action === "flag-ambiguous").length, skipped: plan.filter((p) => p.action === "skip").length }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
