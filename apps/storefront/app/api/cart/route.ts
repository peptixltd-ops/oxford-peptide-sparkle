import { NextRequest, NextResponse } from "next/server";
import { getRegionId, medusa } from "@/lib/medusa";
import { normaliseDiscountCode } from "@orp/config/discounts";

async function applySavedCode(cartId: string, code: unknown) {
  const normalised = normaliseDiscountCode(code);
  if (!normalised) return;
  await medusa(`/store/carts/${cartId}/promotions`, { method: "POST", body: { promo_codes: [normalised] } }).catch(() => undefined);
}

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ cart: null });
  try {
    const data = await medusa<{ cart: unknown }>(`/store/carts/${id}?fields=*items,*promotions`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Cart unavailable" }, { status: 404 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    let cartId = body.cart_id as string | undefined;
    if (!cartId) {
      const created = await medusa<{ cart: { id: string } }>("/store/carts", { method: "POST", body: { region_id: getRegionId() } });
      cartId = created.cart.id;
    }
    if (body.action === "add") {
      const updated = await medusa(`/store/carts/${cartId}/line-items`, {
        method: "POST",
        body: { variant_id: body.variant_id, quantity: body.quantity || 1 },
      });
      if (body.promotion) await applySavedCode(cartId, body.promotion);
      return NextResponse.json(updated);
    }
    if (body.action === "promotion") {
      await applySavedCode(cartId, body.code);
      const cart = await medusa(`/store/carts/${cartId}?fields=*items,*promotions`);
      return NextResponse.json(cart);
    }
    const cart = await medusa(`/store/carts/${cartId}?fields=*items,*promotions`);
    return NextResponse.json(cart);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Cart update failed" }, { status: 400 });
  }
}
