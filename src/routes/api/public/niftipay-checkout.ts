import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BAC_WATER_UPSELL, VARIANT_GID, creditForSubtotal } from "@/lib/shopify";
import { getProduct, getVariant } from "@/lib/products";
import { getAdminDb, shopifyAdmin } from "@/lib/niftipay.server";
import { customerSchema } from "@/lib/niftipay-customer";
import { niftiPayShipping, niftiPayShippingTitle, shippingMethodSchema } from "@/lib/niftipay-shipping";
import { buildNiftiPaySummary, verifyNiftiPayTotal } from "@/lib/niftipay-summary";

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
  customer: customerSchema,
  shippingMethod: shippingMethodSchema,
});

const DRAFT_CREATE = `
mutation draftOrderCreate($input: DraftOrderInput!) {
  draftOrderCreate(input: $input) {
    draftOrder { id legacyResourceId shippingLine { title originalPriceSet { shopMoney { amount } } } totalPriceSet { shopMoney { amount currencyCode } } }
    userErrors { field message }
  }
}`;

const FIND_CUSTOMER = `query($q: String!) { customers(first: 1, query: $q) { nodes { id } } }`;
const CREATE_CUSTOMER = `mutation($input: CustomerInput!) { customerCreate(input: $input) { customer { id } userErrors { field message } } }`;

async function findOrCreateCustomer(c: { email: string; firstName: string; lastName: string; address: Record<string, string> }) {
  try {
    const f = await shopifyAdmin(FIND_CUSTOMER, { q: `email:"${c.email.replace(/"/g, "")}"` });
    const existing = f?.customers?.nodes?.[0]?.id;
    if (existing) return existing as string;
    const r = await shopifyAdmin(CREATE_CUSTOMER, {
      input: { email: c.email, firstName: c.firstName, lastName: c.lastName, addresses: [c.address] },
    });
    const errs = r?.customerCreate?.userErrors ?? [];
    if (errs.length) console.warn("[niftipay-checkout] customerCreate", errs);
    return (r?.customerCreate?.customer?.id as string | undefined) ?? null;
  } catch (e) {
    console.warn("[niftipay-checkout] customer lookup failed, continuing without customer", e);
    return null;
  }
}

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
        if (!parsed.success) return json({ error: parsed.error.issues[0]?.message ?? "Invalid cart", details: parsed.error.flatten() }, 400);
        const { lines, customer, shippingMethod } = parsed.data;
        const email = customer.email;
        const name = customer.name;
        const [firstName, ...rest] = customer.name.split(/\s+/);
        const lastName = rest.join(" ") || firstName;
        const address = {
          firstName, lastName, address1: customer.address1, ...(customer.address2 ? { address2: customer.address2 } : {}),
          city: customer.city, zip: customer.postcode, countryCode: customer.country, phone: customer.phone,
          ...(customer.region ? { province: customer.region } : {}),
        };

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
          const key = GID_TO_KEY.get(l.merchandiseId);
          if (!key) return json({ error: "Unknown product" }, 400);
          const [slug, variantId] = key.split("::");
          const product = getProduct(slug);
          if (!product) continue;
          subtotal += getVariant(product, variantId).price * l.quantity;
          if (slug === BAC_WATER_UPSELL.slug) hasBac = true;
        }
        const credit = creditForSubtotal(subtotal);
        // Never accept a client shipping amount; country and method are validated above.
        const shipping = niftiPayShipping(subtotal, customer.country, shippingMethod);
        const discountCodes = [...(credit ? [credit.code] : []), ...(hasBac ? [BAC_WATER_UPSELL.code] : [])];

        try {
          const customerId = await findOrCreateCustomer({ email, firstName, lastName, address: { ...address } });
          const data = await shopifyAdmin(DRAFT_CREATE, {
            input: {
              lineItems: lines.map((l) => ({ variantId: l.merchandiseId, quantity: l.quantity })),
              ...(discountCodes.length ? { discountCodes } : {}),
              tags: ["niftipay"],
              shippingLine: {
                title: niftiPayShippingTitle(customer.country, shippingMethod),
                priceWithCurrency: { amount: shipping.toFixed(2), currencyCode: "GBP" },
              },
              presentmentCurrencyCode: "GBP",
              email,
              shippingAddress: address,
              billingAddress: address,
              ...(customerId ? { purchasingEntity: { customerId } } : {}),
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
          const summary = buildNiftiPaySummary(lines, shippingApplied);
          verifyNiftiPayTotal(summary, amount);
          const reference = `ORP-${draft.legacyResourceId}`;

          const res = await fetch("https://www.niftipay.com/api/fiat/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json", "x-api-key": apiKey, "Idempotency-Key": draft.id },
            body: JSON.stringify({ integrationId, amount, currency: "GBP", reference, email, name,
              description: summary.items.map(item => `${item.quantity}x ${item.name} ${item.variant}`).join(", ").slice(0, 500),
              // Customer total must remain the verified Shopify total, not total + PSP fees.
              serviceFeePayer: "merchant",
            }),
          });
          const text = await res.text();
          if (!res.ok) throw new Error(`NiftiPay ${res.status}: ${text}`);
          const np = JSON.parse(text);
          const chargedCents = np.pricing?.totalCents ?? np.order?.pricing?.totalCents ?? np.order?.amountCents;
          if (chargedCents !== undefined) verifyNiftiPayTotal(summary, Number(chargedCents) / 100);
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
            customer_name: name,
            customer_email: email,
            customer_phone: customer.phone,
            shipping_address: address,
            shopify_customer_id: customerId,
          });
          if (error) console.error("niftipay_orders insert failed", error);

          return json({ payUrl, summary, shippingApplied, amount, version: "v2-shipping" });
        } catch (e) {
          console.error("NiftiPay checkout failed", e);
          return json({ error: "Could not start card payment. Please try again or use standard checkout." }, 502);
        }
      },
    },
  },
});
