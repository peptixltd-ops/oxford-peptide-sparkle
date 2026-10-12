// Browser helper: starts a NiftiPay card checkout for the given Shopify lines.
import { closeCheckoutTab, openCheckoutTab, sendToCheckout, type CheckoutLine } from "./shopify";

export async function startNiftiPayCheckout(lines: CheckoutLine[], discountCodes: string[]) {
  const tab = openCheckoutTab();
  try {
    if (lines.length === 0) throw new Error("No items available for checkout");
    const res = await fetch("/api/public/niftipay-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines, discountCodes }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.payUrl) throw new Error(data.error ?? "Card payment failed to start");
    sendToCheckout(tab, data.payUrl);
  } catch (e) {
    closeCheckoutTab(tab);
    throw e;
  }
}
