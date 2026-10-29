import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { planDiscounts } from "./filter.mjs";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

async function main() {
  if (!usesFixture()) {
    if (!assertAdminToken()) return;
    throw new Error("Live discount import requires SHOPIFY_ADMIN_TOKEN so percentage values are not guessed from code names.");
  }
  const records = JSON.parse(readFileSync(resolve(here, "fixtures/discounts.json"), "utf8"));
  const plan = planDiscounts(records);
  const outDir = resolve(here, "logs");
  mkdirSync(outDir, { recursive: true });
  const file = resolve(outDir, "discounts-plan.json");
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, upsert: plan.filter((p) => p.action === "upsert").map((p) => p.code) }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
