import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { assertAdminToken, usesFixture } from "./admin-client.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const stateFile = resolve(here, "state/cursor.json");

/**
 * Idempotent delta sync. Without an admin token this records the blocker and
 * exits 2. With a token, callers re-run the catalogue, customer, order,
 * discount and inventory importers using the stored updated_at cursor.
 * State holds timestamps only — never customer payloads.
 */
export function nextCursor(previous, now = new Date()) {
  return { products_updated_at: previous?.products_updated_at || null, advanced_to: now.toISOString() };
}

async function main() {
  mkdirSync(resolve(here, "state"), { recursive: true });
  mkdirSync(resolve(here, "logs"), { recursive: true });
  const previous = existsSync(stateFile) ? JSON.parse(readFileSync(stateFile, "utf8")) : {};
  if (!usesFixture() && !assertAdminToken()) return;
  const cursor = nextCursor(previous);
  if (usesFixture()) {
    writeFileSync(stateFile, JSON.stringify({ ...cursor, mode: "fixture", note: "fixture run does not advance a live cursor" }, null, 2));
    console.log(JSON.stringify({ ok: true, mode: "fixture", cursor }));
    return;
  }
  writeFileSync(stateFile, JSON.stringify({ ...cursor, mode: "live" }, null, 2));
  console.log(JSON.stringify({ ok: true, mode: "live", cursor, next: "re-run import-products, import-customers, import-orders, import-discounts, import-inventory" }));
}

import { pathToFileURL } from "node:url";
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
