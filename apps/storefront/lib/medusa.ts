import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { quoteShipping } from "@orp/config/shipping";

type MedusaInit = { method?: string; body?: unknown; token?: string; cache?: RequestCache };

function runtimeConfig() {
  const backend = process.env.MEDUSA_BACKEND_URL || "http://127.0.0.1:9000";
  let publishable = process.env.MEDUSA_PUBLISHABLE_KEY || "";
  let regionId = process.env.MEDUSA_REGION_ID || "";
  if (!publishable) {
    try {
      const file = JSON.parse(readFileSync(resolve(process.cwd(), "../backend/apps/backend/data/publishable-key.json"), "utf8"));
      publishable = file.publishable_key;
      regionId = regionId || file.region_id;
    } catch {
      /* key file is written by the Medusa seed */
    }
  }
  return { backend, publishable, regionId };
}

export function getRegionId() {
  return runtimeConfig().regionId;
}

export function getPublishableKey() {
  return runtimeConfig().publishable;
}

export async function medusa<T = Record<string, unknown>>(path: string, init: MedusaInit = {}): Promise<T> {
  const { backend, publishable } = runtimeConfig();
  const headers: Record<string, string> = {
    "content-type": "application/json",
    "x-publishable-api-key": publishable,
  };
  if (init.token) headers.authorization = `Bearer ${init.token}`;
  const response = await fetch(`${backend}${path}`, {
    method: init.method || "GET",
    headers,
    body: init.body ? JSON.stringify(init.body) : undefined,
    cache: init.cache || "no-store",
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = json?.message || json?.error || response.statusText;
    throw new Error(typeof message === "string" ? message : `Medusa ${response.status}`);
  }
  return json as T;
}

export type StoreProduct = {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  metadata?: Record<string, unknown> | null;
  variants?: Array<{
    id: string;
    title: string;
    sku?: string | null;
    calculated_price?: { calculated_amount?: number; original_amount?: number };
    prices?: Array<{ amount: number; currency_code: string }>;
  }>;
};

export function variantAmount(variant: NonNullable<StoreProduct["variants"]>[number]) {
  const calculated = variant.calculated_price?.calculated_amount;
  if (typeof calculated === "number") return calculated;
  return variant.prices?.find((price) => price.currency_code === "gbp")?.amount ?? variant.prices?.[0]?.amount ?? 0;
}

export async function listProducts() {
  const regionId = getRegionId();
  const query = new URLSearchParams({
    limit: "50",
    fields: "id,title,handle,description,thumbnail,metadata,*variants,*variants.prices,*variants.calculated_price",
  });
  if (regionId) query.set("region_id", regionId);
  const data = await medusa<{ products: StoreProduct[] }>(`/store/products?${query}`);
  return data.products || [];
}

export async function getProduct(handle: string) {
  const products = await listProducts();
  return products.find((product) => product.handle === handle) || null;
}

export { quoteShipping };
