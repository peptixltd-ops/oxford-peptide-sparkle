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

/** Mirrors the storefront cart: free UK shipping from a £20 subtotal (before discounts), else £3.99. */
export const FREE_SHIPPING_THRESHOLD = 20;
export const SHIPPING_RATE = 3.99;
export function shippingForSubtotal(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
}

/** NiftiPay fiat statuses/events that mean the customer has paid. */
export const PAID_STATES = new Set(["paid", "completed", "order.paid", "order.completed"]);

const DRAFT_STATUS = `query($id: ID!) { draftOrder(id: $id) { status order { id } } }`;
const COMPLETE = `mutation($id: ID!) { draftOrderComplete(id: $id, paymentPending: false) {
  draftOrder { status order { id } } userErrors { field message } } }`;

/**
 * Completes the Shopify draft for a paid NiftiPay order exactly once.
 * A conditional status update claims the row, so the webhook and the
 * success-page fallback can never both complete it; an already-completed
 * draft (e.g. finished manually) is recorded without completing again.
 */
export async function completePaidNiftiPayOrder(reference: string, source: string) {
  const db = await getAdminDb();
  const { data: claimed, error } = await db
    .from("niftipay_orders")
    .update({ status: "completing", updated_at: new Date().toISOString() })
    .eq("reference", reference)
    .in("status", ["pending", "cancelled"])
    .select("id, draft_order_id")
    .maybeSingle();
  if (error) throw new Error(`niftipay claim failed: ${error.message}`);
  if (!claimed) {
    console.log(`[niftipay] ${source}: ${reference} already completed/in progress, skipping`);
    return { completed: false, reason: "already-handled" };
  }
  try {
    if (!claimed.draft_order_id) throw new Error("row has no draft_order_id");
    const s = await shopifyAdmin(DRAFT_STATUS, { id: claimed.draft_order_id });
    let orderId: string | null = s?.draftOrder?.order?.id ?? null;
    if (s?.draftOrder?.status === "COMPLETED") {
      console.log(`[niftipay] ${source}: draft for ${reference} was already completed in Shopify`, orderId);
    } else {
      const d = await shopifyAdmin(COMPLETE, { id: claimed.draft_order_id });
      const errs = d?.draftOrderComplete?.userErrors ?? [];
      if (errs.length) throw new Error(`draftOrderComplete: ${JSON.stringify(errs)}`);
      orderId = d?.draftOrderComplete?.draftOrder?.order?.id ?? null;
      console.log(`[niftipay] ${source}: completed draft for ${reference} → ${orderId}`);
    }
    await db
      .from("niftipay_orders")
      .update({ status: "completed", shopify_order_id: orderId, updated_at: new Date().toISOString() })
      .eq("id", claimed.id);
    return { completed: true, orderId };
  } catch (e) {
    // Release the claim so a retry can finish it.
    await db.from("niftipay_orders").update({ status: "pending" }).eq("id", claimed.id);
    throw e;
  }
}

/** Fetches a NiftiPay fiat order's status by our reference (server-side, API key never leaves the server). */
export async function fetchNiftiPayStatus(reference: string, orderKey: string | null): Promise<string | null> {
  const apiKey = process.env["NIFTIPAY_API_KEY"];
  if (!apiKey) throw new Error("NIFTIPAY_API_KEY missing");
  const headers = { "x-api-key": apiKey, Accept: "application/json" };
  if (orderKey) {
    const r = await fetch(`https://www.niftipay.com/api/fiat/orders/${encodeURIComponent(orderKey)}`, { headers });
    if (r.ok) {
      const j: any = await r.json();
      const o = j.order ?? j;
      if (!o?.merchantReference || o.merchantReference === reference) return String(o?.status ?? "") || null;
    }
  }
  // Fallback: scan the newest orders for our reference.
  const r = await fetch("https://www.niftipay.com/api/fiat/orders?limit=100", { headers });
  if (!r.ok) throw new Error(`NiftiPay list ${r.status}: ${await r.text()}`);
  const j: any = await r.json();
  const list: any[] = j.orders ?? j.data ?? j.items ?? [];
  const hit = list.find((o) => o?.merchantReference === reference || o?.reference === reference);
  return hit ? String(hit.status ?? "") : null;
}
