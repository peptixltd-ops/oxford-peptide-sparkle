// Server-only helpers for the NiftiPay card checkout (Shopify Admin + NiftiPay).
export const SHOPIFY_ADMIN_URL = "https://cqdyni-4v.myshopify.com/admin/api/2025-07/graphql.json";

export async function shopifyAdmin<T = any>(query: string, variables: unknown): Promise<T> {
  const token = process.env["SHOPIFY_ADMIN_API_TOKEN"];
  if (!token) throw new Error("SHOPIFY_ADMIN_API_TOKEN is not configured");
  const res = await fetch(SHOPIFY_ADMIN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Shopify-Access-Token": token },
    body: JSON.stringify({ query, variables }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Shopify Admin ${res.status}: ${text}`);
  const json = JSON.parse(text);
  if (json.errors) throw new Error(`Shopify Admin: ${JSON.stringify(json.errors)}`);
  return json.data as T;
}

export async function getAdminDb() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}
