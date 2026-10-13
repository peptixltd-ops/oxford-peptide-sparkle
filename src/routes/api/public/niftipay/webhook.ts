import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";
import { PAID_STATES, completePaidNiftiPayOrder, getAdminDb, shopifyAdmin } from "@/lib/niftipay.server";
import type { Database } from "@/integrations/supabase/types";

const MAX_AGE_SECONDS = 5 * 60;

function verify(raw: string, ts: string | null, sig: string | null, secret: string): string | null {
  if (!ts || !sig) return "missing x-timestamp/x-signature";
  const tsNum = Number(ts);
  if (!Number.isFinite(tsNum)) return "bad timestamp";
  const tsSec = tsNum > 1e12 ? tsNum / 1000 : tsNum;
  if (Math.abs(Date.now() / 1000 - tsSec) > MAX_AGE_SECONDS) return "timestamp too old";
  const expected = "v1=" + createHmac("sha256", secret).update(`${ts}.${raw}`).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(sig);
  return a.length === b.length && timingSafeEqual(a, b) ? null : "signature mismatch";
}

const DELETE = `mutation($id: ID!) { draftOrderDelete(input: { id: $id }) { deletedId userErrors { field message } } }`;

export const Route = createFileRoute("/api/public/niftipay/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["NIFTIPAY_WEBHOOK_SECRET"];
        if (!secret) {
          console.error("[niftipay-webhook] NIFTIPAY_WEBHOOK_SECRET missing");
          return new Response("not configured", { status: 500 });
        }
        const raw = await request.text();
        const bad = verify(raw, request.headers.get("x-timestamp"), request.headers.get("x-signature"), secret);
        if (bad) {
          console.warn("[niftipay-webhook] rejected:", bad);
          return new Response("Invalid signature", { status: 401 });
        }

        let body: any;
        try {
          body = JSON.parse(raw);
        } catch {
          return new Response("Bad JSON", { status: 400 });
        }
        const event = String(body.event ?? body.type ?? "").toLowerCase();
        const order = body.order ?? body.data?.order ?? body.data ?? body;
        // Fiat payloads carry our id as merchantReference; crypto uses reference.
        const reference: string | undefined =
          order?.merchantReference ?? order?.reference ?? body.merchantReference ?? body.reference;
        const orderStatus = String(order?.status ?? "").toLowerCase();
        const orderKey = String(order?.id ?? order?.orderKey ?? reference ?? "");
        console.log("[niftipay-webhook] received", { event, reference, orderStatus, orderKey });

        if (event === "test") return new Response("ok", { status: 200 });
        if (!reference) {
          console.warn("[niftipay-webhook] no reference in payload, keys:", Object.keys(order ?? {}));
          return new Response("ignored", { status: 200 });
        }

        const db = await getAdminDb();
        const { data: row, error } = await db
          .from("niftipay_orders")
          .select("*")
          .eq("reference", reference)
          .maybeSingle();
        if (error) {
          console.error("[niftipay-webhook] lookup failed", error);
          return new Response("db error", { status: 500 });
        }
        if (!row) {
          console.warn("[niftipay-webhook] unknown reference", reference);
          return new Response("unknown", { status: 200 });
        }

        const dedupKey = `${event}:${orderKey}`;
        const isPaid = PAID_STATES.has(event) || PAID_STATES.has(orderStatus);
        if ((row.processed_events ?? []).includes(dedupKey) && !(isPaid && row.status !== "completed")) {
          console.log("[niftipay-webhook] duplicate", dedupKey);
          return new Response("duplicate", { status: 200 });
        }

        try {
          if (isPaid) {
            await completePaidNiftiPayOrder(reference, "webhook");
          } else if ((event === "cancelled" || event === "failed" || event === "expired") && row.status === "pending") {
            await db.from("niftipay_orders").update({ status: "cancelled" }).eq("id", row.id);
            if (row.draft_order_id) {
              const d = await shopifyAdmin(DELETE, { id: row.draft_order_id });
              const errs = d?.draftOrderDelete?.userErrors ?? [];
              if (errs.length) console.error("[niftipay-webhook] draftOrderDelete", errs);
            }
          }
          // pending / refunded / underpaid / chargeback: recorded via last_event only.
        } catch (e) {
          console.error("[niftipay-webhook] processing failed", reference, e);
          return new Response("processing error", { status: 500 }); // NiftiPay retries
        }

        const patch: Database["public"]["Tables"]["niftipay_orders"]["Update"] = {
          last_event: event,
          updated_at: new Date().toISOString(),
          processed_events: [...(row.processed_events ?? []), dedupKey],
        };
        const { error: upErr } = await db.from("niftipay_orders").update(patch).eq("id", row.id);
        if (upErr) console.error("[niftipay-webhook] update failed", upErr);
        return new Response("ok", { status: 200 });
      },
    },
  },
});
