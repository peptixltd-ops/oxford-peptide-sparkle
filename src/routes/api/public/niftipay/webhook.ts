import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { getAdminDb, shopifyAdmin } from "@/lib/niftipay.server";
import type { Database } from "@/integrations/supabase/types";

const MAX_AGE_SECONDS = 5 * 60;

function verify(raw: string, ts: string | null, sig: string | null, secret: string): boolean {
  if (!ts || !sig) return false;
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return false;
  // Accept seconds or milliseconds.
  const tsSec = tsNum > 1e12 ? tsNum / 1000 : tsNum;
  if (Math.abs(Date.now() / 1000 - tsSec) > MAX_AGE_SECONDS) return false;
  const expected = "v1=" + createHmac("sha256", secret).update(`${ts}.${raw}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b);
}

const COMPLETE = `mutation($id: ID!) { draftOrderComplete(id: $id, paymentPending: false) {
  draftOrder { order { id } } userErrors { field message } } }`;
const DELETE = `mutation($id: ID!) { draftOrderDelete(input: { id: $id }) { deletedId userErrors { field message } } }`;

export const Route = createFileRoute("/api/public/niftipay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["NIFTIPAY_WEBHOOK_SECRET"];
        if (!secret) {
          console.error("NIFTIPAY_WEBHOOK_SECRET missing");
          return new Response("not configured", { status: 500 });
        }
        const raw = await request.text();
        if (!verify(raw, request.headers.get("x-timestamp"), request.headers.get("x-signature"), secret)) {
          return new Response("Invalid signature", { status: 401 });
        }

        let body: any;
        try {
          body = JSON.parse(raw);
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }
        const event: string = String(body.event ?? body.type ?? "");
        if (event === "test") return new Response("ok", { status: 200 });

        const order = body.order ?? body.data ?? body;
        const reference: string | undefined = order?.reference ?? body.reference;
        const orderKey = String(order?.id ?? order?.orderKey ?? reference ?? "");
        if (!reference) return new Response("ignored", { status: 200 });

        const db = await getAdminDb();
        const { data: row, error } = await db
          .from("niftipay_orders")
          .select("*")
          .eq("reference", reference)
          .maybeSingle();
        if (error) {
          console.error("niftipay lookup failed", error);
          return new Response("db error", { status: 500 }); // NiftiPay retries
        }
        if (!row) {
          console.warn("NiftiPay webhook for unknown reference", reference);
          return new Response("unknown", { status: 200 });
        }

        const dedupKey = `${event}:${orderKey}`;
        if ((row.processed_events ?? []).includes(dedupKey)) return new Response("duplicate", { status: 200 });

        const patch: Database["public"]["Tables"]["niftipay_orders"]["Update"] = {
          last_event: event,
          updated_at: new Date().toISOString(),
          processed_events: [...(row.processed_events ?? []), dedupKey],
        };

        try {
          if (event === "paid" && row.status !== "completed" && row.draft_order_id) {
            const d = await shopifyAdmin(COMPLETE, { id: row.draft_order_id });
            const errs = d?.draftOrderComplete?.userErrors ?? [];
            if (errs.length) throw new Error(`draftOrderComplete: ${JSON.stringify(errs)}`);
            patch.status = "completed";
            patch.shopify_order_id = d?.draftOrderComplete?.draftOrder?.order?.id ?? null;
          } else if ((event === "cancelled" || event === "failed") && row.status !== "completed") {
            patch.status = "cancelled";
            if (row.draft_order_id) {
              const d = await shopifyAdmin(DELETE, { id: row.draft_order_id });
              const errs = d?.draftOrderDelete?.userErrors ?? [];
              if (errs.length) console.error("draftOrderDelete", errs);
            }
          }
          // refunded / underpaid / chargeback: recorded via last_event only.
        } catch (e) {
          console.error("NiftiPay webhook processing failed", e);
          return new Response("processing error", { status: 500 }); // let NiftiPay retry
        }

        const { error: upErr } = await db.from("niftipay_orders").update(patch).eq("id", row.id);
        if (upErr) console.error("niftipay update failed", upErr);
        return new Response("ok", { status: 200 });
      },
    },
  },
});
