import { NextRequest, NextResponse } from "next/server";
import { getRegionId, listProducts, medusa, type StoreProduct } from "@/lib/medusa";
import { normaliseDiscountCode } from "@orp/config/discounts";

function matchVariant(product: StoreProduct, variantId: string) {
  const wanted = variantId.replace(/-blend$/i, " blend").toLowerCase();
  return (product.variants || []).find((variant) => variant.title.toLowerCase() === wanted || variant.title.toLowerCase() === variantId.toLowerCase());
}

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
    if (body.action === "from-local") {
      const created = await medusa<{ cart: { id: string } }>("/store/carts", { method: "POST", body: { region_id: getRegionId() } });
      cartId = created.cart.id;
      const products = await listProducts();
      let updated: unknown = { cart: created.cart };
      for (const item of body.items || []) {
        const product = products.find((entry) => entry.handle === item.slug);
        const variant = product ? matchVariant(product, String(item.variantId)) : undefined;
        if (!variant) continue;
        updated = await medusa(`/store/carts/${cartId}/line-items`, {
          method: "POST",
          body: { variant_id: variant.id, quantity: item.qty || 1 },
        });
      }
      if (body.promotion) await applySavedCode(cartId, body.promotion);
      return NextResponse.json(updated);
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
