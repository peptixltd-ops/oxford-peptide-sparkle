"use client";

import { createCheckout } from "./shopify";

export async function startNiftiPayCheckout(
  lines: Array<{ merchandiseId: string; quantity: number }>,
  codes: string[] = [],
) {
  await createCheckout(lines, undefined, codes);
  window.location.assign("/checkout");
}
