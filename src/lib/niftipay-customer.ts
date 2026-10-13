// Shared (browser + server) customer-details rules for NiftiPay card checkout.
import { z } from "zod";

export const COUNTRIES = [
  ["GB", "United Kingdom"], ["IE", "Ireland"], ["FR", "France"], ["DE", "Germany"], ["ES", "Spain"],
  ["IT", "Italy"], ["NL", "Netherlands"], ["BE", "Belgium"], ["PT", "Portugal"], ["SE", "Sweden"],
  ["DK", "Denmark"], ["NO", "Norway"], ["CH", "Switzerland"], ["AT", "Austria"], ["PL", "Poland"],
  ["US", "United States"], ["CA", "Canada"], ["AU", "Australia"],
] as const;

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  address1: z.string().trim().min(3, "Enter your address").max(200),
  address2: z.string().trim().max(200).optional().default(""),
  city: z.string().trim().min(2, "Enter your town or city").max(100),
  postcode: z.string().trim().min(2, "Enter your postcode").max(20),
  country: z.enum(COUNTRIES.map((c) => c[0]) as [string, ...string[]]),
});
export type CustomerDetails = z.infer<typeof customerSchema>;

