// Success-page fallback: asks NiftiPay (server-side) whether the order is paid
// and completes the Shopify draft if the webhook hasn't already.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const confirmNiftiPayOrder = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ reference: z.string().regex(/^ORP-\d{1,20}$/) }).parse(d))
  .handler(async ({ data }) => {
    const { getAdminDb, fetchNiftiPayStatus, completePaidNiftiPayOrder, PAID_STATES } = await import("./niftipay.server");
    try {
      const db = await getAdminDb();
      const { data: row } = await db
        .from("niftipay_orders")
        .select("status, niftipay_order_key")
        .eq("reference", data.reference)
        .maybeSingle();
      if (!row) return { ok: false };
      if (row.status === "completed") return { ok: true };
      // Never trust the redirect's ?status= — ask NiftiPay directly.
      const status = (await fetchNiftiPayStatus(data.reference, row.niftipay_order_key))?.toLowerCase() ?? null;
      console.log("[niftipay-success-fallback]", data.reference, "NiftiPay status:", status);
      if (status && PAID_STATES.has(status)) {
        await completePaidNiftiPayOrder(data.reference, "success-fallback");
        return { ok: true };
      }
      return { ok: false };
    } catch (e) {
      console.error("[niftipay-success-fallback] failed", data.reference, e);
      return { ok: false };
    }
  });
