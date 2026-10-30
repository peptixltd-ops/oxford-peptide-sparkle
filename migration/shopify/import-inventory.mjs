import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));

export function planInventory(levels) {
  return (levels || []).map((level) => {
    const sku = level.sku || "";
    if (!sku.startsWith("ORP-")) return { sku, action: "skip", reason: "not-orp-sku" };
    return { sku, action: "set", available: Number(level.available), location: level.location || "Barking UK" };
  });
}

async function main() {
  if (!usesFixture()) {
    if (!assertAdminToken()) return;
    throw new Error("Live inventory import requires SHOPIFY_ADMIN_TOKEN. Public products.json does not include on-hand quantities.");
  }
  const levels = JSON.parse(readFileSync(resolve(here, "fixtures/inventory.json"), "utf8"));
  const plan = planInventory(levels);
  const outDir = resolve(here, "logs");
  mkdirSync(outDir, { recursive: true });
  const file = resolve(outDir, "inventory-plan.json");
  writeFileSync(file, JSON.stringify({ at: new Date().toISOString(), plan }, null, 2));
  console.log(JSON.stringify({ wrote: file, set: plan.filter((p) => p.action === "set").length, skipped: plan.filter((p) => p.action === "skip").length }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
