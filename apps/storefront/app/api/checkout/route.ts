import { NextRequest, NextResponse } from "next/server";
import { medusa, quoteShipping } from "@/lib/medusa";

/**
 * Completes a cart only after the server recomputes shipping from the shared
 * rules and the sandbox provider authorises the session. The success page
 * never marks an order paid.
 */
export async function POST(request: NextRequest) {
  const body = await request.json();
  const cartId = String(body.cart_id || "");
  const country = String(body.country || "").toUpperCase();
  const method = body.method === "standard" ? "standard" : body.method === "international" ? "international" : "express";
  if (!cartId) return NextResponse.json({ error: "Missing basket." }, { status: 400 });
  if (body.approved !== true || body.last4 !== "4242") {
    return NextResponse.json({ error: "Sandbox payment was declined. Use the test card ending 4242." }, { status: 402 });
  }
  try {
    const current = await medusa<{ cart: { item_subtotal?: number; items?: Array<{ unit_price: number; quantity: number }> } }>(`/store/carts/${cartId}?fields=*items`);
    const subtotal = current.cart.item_subtotal ?? (current.cart.items || []).reduce((sum, item) => sum + Number(item.unit_price) * Number(item.quantity), 0);
    const quote = quoteShipping(subtotal, country, method);
    const address = {
      first_name: body.first_name,
      last_name: body.last_name,
      address_1: body.address_1,
      city: body.city,
      postal_code: body.postal_code,
      country_code: country.toLowerCase(),
      phone: body.phone || undefined,
    };
    await medusa(`/store/carts/${cartId}`, {
      method: "POST",
      body: { email: body.email, shipping_address: address, billing_address: address },
    });
    if (body.promotion) {
      await medusa(`/store/carts/${cartId}/promotions`, { method: "POST", body: { promo_codes: [String(body.promotion).toUpperCase()] } }).catch(() => undefined);
    }
    const options = await medusa<{ shipping_options: Array<{ id: string; name: string }> }>(`/store/shipping-options?cart_id=${cartId}`);
    const priced = await Promise.all((options.shipping_options || []).map(async (option) => {
      const calculated = await medusa<{ shipping_option: { amount: number; name: string } }>(`/store/shipping-options/${option.id}/calculate`, {
        method: "POST",
        body: { cart_id: cartId },
      });
      return { id: option.id, name: calculated.shipping_option.name, amount: Number(calculated.shipping_option.amount) };
    }));
    const match = priced.find((option) => {
      const name = option.name.toLowerCase();
      const methodMatches = quote.method === "international" ? name.includes("international") : name.includes(quote.method === "standard" ? "standard" : "express");
      return methodMatches && Math.abs(option.amount - quote.amount) < 0.001;
    });
    if (!match) {
      return NextResponse.json({ error: `No shipping option matched ${quote.label} at £${quote.amount.toFixed(2)}.` }, { status: 409 });
    }
    await medusa(`/store/carts/${cartId}/shipping-methods`, { method: "POST", body: { option_id: match.id } });
    const collection = await medusa<{ payment_collection: { id: string } }>("/store/payment-collections", { method: "POST", body: { cart_id: cartId } });
    await medusa(`/store/payment-collections/${collection.payment_collection.id}/payment-sessions`, {
      method: "POST",
      body: { provider_id: "pp_sandbox_sandbox", data: { approved: true, last4: "4242" } },
    });
    const completed = await medusa<{ type: string; order?: { id: string; display_id?: number; email?: string }; error?: string }>(`/store/carts/${cartId}/complete`, { method: "POST", body: {} });
    if (completed.type !== "order" || !completed.order) {
      return NextResponse.json({ error: completed.error || "Payment was not completed." }, { status: 402 });
    }
    return NextResponse.json({ order_id: completed.order.id, display_id: completed.order.display_id, email: completed.order.email });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
