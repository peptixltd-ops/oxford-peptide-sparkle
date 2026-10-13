import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BAC_WATER_UPSELL, VARIANT_GID, creditForSubtotal } from "@/lib/shopify";
import { getProduct, getVariant } from "@/lib/products";
import { getAdminDb, shippingForSubtotal, shopifyAdmin } from "@/lib/niftipay.server";

const GID_TO_KEY = new Map(Object.entries(VARIANT_GID).map(([k, gid]) => [gid, k]));

const schema = z.object({
  lines: z
    .array(
      z.object({
        merchandiseId: z
          .string()
          .regex(/^gid:\/\/shopify\/ProductVariant\/\d+$/)
          .refine((g) => GID_TO_KEY.has(g), "Unknown product"),
        quantity: z.number().int().min(1).max(1000),
      }),
    )
    .min(1)
    .max(50),
  discountCodes: z.array(z.string().max(50)).max(10).default([]),
  email: z.string().email().max(255).optional(),
  name: z.string().trim().max(200).optional(),
});

const DRAFT_CREATE = `
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder { id legacyResourceId shippingLine { title originalPriceSet { shopMoney { amount } } } totalPriceSet { shopMoney { amount currencyCode } } }
    userErrors { field message }
  }
}`;

const json = (body: unknown, status = 200) => Response.json(body, { status });

export const Route = createFileRoute("/api/public/niftipay-checkout")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ error: "Invalid JSON body" }, 400);
        }
        const parsed = schema.safeParse(raw);
        if (!parsed.success) return json({ error: "Invalid cart", details: parsed.error.flatten() }, 400);
        const { lines, email, name } = parsed.data;

        const apiKey = process.env["NIFTIPAY_API_KEY"];
        const integrationId = process.env["NIFTIPAY_INTEGRATION_ID"];
        if (!apiKey || !integrationId) {
          console.error("NiftiPay secrets missing");
          return json({ error: "Card payments are not configured yet" }, 500);
        }

        // Re-derive the discounts server-side, exactly as the Shopify flow does —
        // client-sent codes are never trusted.
        let subtotal = 0;
        let hasBac = false;
        for (const l of lines) {
          const [slug, variantId] = GID_TO_KEY.get(l.merchandiseId)!.split("::");
          const product = getProduct(slug);
          if (!product) continue;
          subtotal += getVariant(product, variantId).price * l.quantity;
          if (slug === BAC_WATER_UPSELL.slug) hasBac = true;
        }
        const credit = creditForSubtotal(subtotal);
        const shipping = shippingForSubtotal(subtotal);
        const discountCodes = [...(credit ? [credit.code] : []), ...(hasBac ? [BAC_WATER_UPSELL.code] : [])];

        try {
          const data = await shopifyAdmin(DRAFT_CREATE, {
            input: {
              lineItems: lines.map((l) => ({ variantId: l.merchandiseId, quantity: l.quantity })),
              ...(discountCodes.length ? { discountCodes } : {}),
              tags: ["niftipay"],
              shippingLine: {
                title: "Standard Shipping",
                priceWithCurrency: { amount: shipping.toFixed(2), currencyCode: "GBP" },
              },
              presentmentCurrencyCode: "GBP",
              ...(email ? { email } : {}),
            },
          });
          const errs = data?.draftOrderCreate?.userErrors ?? [];
          if (errs.length) throw new Error(`draftOrderCreate: ${JSON.stringify(errs)}`);
          const draft = data.draftOrderCreate.draftOrder;
          const shippingApplied = Number(draft.shippingLine?.originalPriceSet?.shopMoney?.amount ?? 0);
          if (shipping > 0 && shippingApplied !== shipping) {
            throw new Error(`Shipping line dropped by Shopify: expected ${shipping}, got ${JSON.stringify(draft.shippingLine)}`);
          }
          // Authoritative amount = draft total returned by Shopify (lines − discounts + shipping).
          const amount = Number(draft.totalPriceSet.shopMoney.amount);
          console.log("[niftipay-checkout v2-shipping]", { subtotal, shipping, shippingApplied, draftTotal: amount, draftId: draft.id });
          if (!(amount > 0)) throw new Error(`Draft total invalid: ${amount}`);
          const reference = `ORP-${draft.legacyResourceId}`;

          const res = await fetch("https://www.niftipay.com/api/fiat/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": apiKey, "Idempotency-Key": draft.id },
            body: JSON.stringify({ integrationId, amount, currency: "GBP", reference, email, name }),
          });
          const text = await res.text();
          if (!res.ok) throw new Error(`NiftiPay ${res.status}: ${text}`);
          const np = JSON.parse(text);
          const payUrl: string | undefined =
            np.payUrl ?? np.pay_url ?? np.url ?? np.checkoutUrl ?? np.order?.payUrl ?? np.data?.payUrl;
          if (!payUrl) throw new Error(`NiftiPay response missing payUrl: ${text}`);
          const orderKey = np.id ?? np.orderKey ?? np.key ?? np.order?.id ?? np.data?.id ?? null;

          const db = await getAdminDb();
          const { error } = await db.from("niftipay_orders").insert({
            reference,
            draft_order_id: draft.id,
            niftipay_order_key: orderKey ? String(orderKey) : null,
            amount,
            currency: "GBP",
            status: "pending",
          });
          if (error) console.error("niftipay_orders insert failed", error);

          return json({ payUrl, shippingApplied, amount, version: "v2-shipping" });
        } catch (e) {
          console.error("NiftiPay checkout failed", e);
          return json({ error: "Could not start card payment. Please try again or use standard checkout." }, 502);
        }
      },
    },
  },
});
