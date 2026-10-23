// Browser helper: collects delivery details, then starts a NiftiPay card checkout.
import { getSavedDiscount } from "./discount-code";
import { closeCheckoutTab, openCheckoutTab, sendToCheckout, type CheckoutLine } from "./shopify";

export async function startNiftiPayCheckout(lines: CheckoutLine[], discountCodes: string[]) {
  if (lines.length === 0) throw new Error("No items available for checkout");
  const { collectCustomerDetails } = await import("@/components/niftipay-details-form");
  let tab: Window | null = null;
  const result = await collectCustomerDetails(() => {
    tab = openCheckoutTab();
  }, lines);
  if (!result) return; // shopper closed the form
  const { details: customer, shippingMethod } = result;
  try {
    const response = await fetch("/api/public/niftipay-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines, discountCodes, discountCode: getSavedDiscount() ?? undefined, customer, shippingMethod, email: customer.email, name: customer.name }),
    });
    const data = await response.json();
    if (!response.ok || !data.payUrl) {
      throw new Error(data.error ?? "Could not start card payment. Please try again.");
    }
    sendToCheckout(tab, data.payUrl);
  } catch (e) {
    closeCheckoutTab(tab);
    throw e;
  }
}
