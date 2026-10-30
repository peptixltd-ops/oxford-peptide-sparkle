import { NextRequest, NextResponse } from "next/server";
import { normaliseDiscountCode } from "@orp/config/discounts";

export async function GET(request: NextRequest, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  const normalised = normaliseDiscountCode(code);
  const url = new URL("/shop", request.url);
  if (normalised) url.searchParams.set("discount", normalised);
  return NextResponse.redirect(url, 302);
}
