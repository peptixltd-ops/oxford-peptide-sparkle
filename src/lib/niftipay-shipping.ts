import { z } from "zod";

export const shippingMethodSchema = z.enum(["express", "standard"]).default("express");
export type NiftiPayShippingMethod = z.infer<typeof shippingMethodSchema>;

/** Pre-discount subtotal; shared preview rules, independently applied by the server. */
export function niftiPayShipping(subtotal: number, country: string, method: NiftiPayShippingMethod = "express") {
  if (country === "RU" || country === "BY") throw new Error("Shipping to Russia and Belarus is not available.");
  if (country !== "GB") return 15;
  return method === "standard" ? (subtotal >= 30 ? 0 : 5.99) : (subtotal >= 20 ? 0 : 3.99);
}

export function niftiPayShippingTitle(country: string, method: NiftiPayShippingMethod) {
  return country !== "GB" ? "International Shipping" : method === "standard" ? "Standard Shipping" : "Express Shipping";
}