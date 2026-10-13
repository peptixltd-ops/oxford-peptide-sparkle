// Browser helper: starts a NiftiPay card checkout for the given Shopify lines.
import { closeCheckoutTab, openCheckoutTab, sendToCheckout, type CheckoutLine } from "./shopify";

export const NIFTIPAY_REVIEW_KEY = "orp_niftipay_review";

export async function startNiftiPayCheckout(lines: CheckoutLine[], discountCodes: string[]) {
  if (lines.length === 0) throw new Error("No items available for checkout");
  const tab = openCheckoutTab();
  try {
    const storage = tab?.sessionStorage ?? window.sessionStorage;
    storage.setItem(NIFTIPAY_REVIEW_KEY, JSON.stringify({ lines, discountCodes,
      backPath: window.location.pathname, openedInTab: Boolean(tab), createdAt: Date.now() }));
    sendToCheckout(tab, "/checkout/card-summary");
  } catch (e) {
    closeCheckoutTab(tab);
    throw e;
  }
}
