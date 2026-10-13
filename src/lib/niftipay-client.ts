// Browser helper: starts a NiftiPay card checkout for the given Shopify lines.
import { closeCheckoutTab, openCheckoutTab, sendToCheckout, type CheckoutLine } from "./shopify";

export async function startNiftiPayCheckout(lines: CheckoutLine[], discountCodes: string[]) {
  if (lines.length === 0) throw new Error("No items available for checkout");
  const tab = openCheckoutTab();
  try {
    const response = await fetch("/api/public/niftipay-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines, discountCodes }),
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
