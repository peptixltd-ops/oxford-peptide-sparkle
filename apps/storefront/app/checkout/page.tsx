"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatGbp } from "@orp/ui";
import { quoteShipping, shippingMethodsFor } from "@orp/config/shipping";
import { track } from "@/lib/analytics";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProduct, getVariant } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const [subtotal, setSubtotal] = useState(0);
  const [cartId, setCartId] = useState("");
  const [country, setCountry] = useState("GB");
  const [method, setMethod] = useState("express");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("orp_discount");
    if (saved) {
      try { setCode(JSON.parse(saved).code || ""); } catch { /* ignore */ }
    }
    let items: Array<{ slug: string; variantId: string; qty: number }> = [];
    try { items = JSON.parse(localStorage.getItem("orp_cart_v2") || "[]"); } catch { /* ignore */ }
    const goods = items.reduce((sum, item) => {
      const product = getProduct(item.slug);
      if (!product) return sum;
      return sum + getVariant(product, item.variantId).price * item.qty;
    }, 0);
    setSubtotal(goods);
    track("begin_checkout", { currency: "GBP", value: goods });
    if (!items.length) return;
    fetch("/api/cart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "from-local", items, promotion: saved ? JSON.parse(saved).code : undefined }),
    }).then((response) => response.json()).then((data) => {
      const id = data.cart?.id;
      if (id) {
        localStorage.setItem("orp_cart_id", id);
        setCartId(id);
      }
    }).catch(() => undefined);
  }, []);

  let quote: { amount: number; label: string } | null = null;
  let quoteError = "";
  try { quote = quoteShipping(subtotal, country, method); } catch (reason) { quoteError = reason instanceof Error ? reason.message : "Shipping unavailable"; }
  const methods = shippingMethodsFor(country);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const number = String(form.get("card") || "").replace(/\s/g, "");
    const approved = number === "4242424242424242";
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        cart_id: cartId,
        email: form.get("email"),
        first_name: form.get("first_name"),
        last_name: form.get("last_name"),
        address_1: form.get("address_1"),
        city: form.get("city"),
        postal_code: form.get("postal_code"),
        country,
        method: quote?.label.includes("International") ? "international" : method,
        promotion: code,
        approved,
        last4: number.slice(-4),
      }),
    });
    const data = await response.json();
    setPending(false);
    if (!response.ok) {
      if (response.status === 402) router.push("/checkout/failed");
      setError(data.error || "Checkout failed");
      return;
    }
    localStorage.removeItem("orp_cart_id");
    track("purchase", { currency: "GBP", transaction_id: data.order_id, value: subtotal + (quote?.amount || 0) });
    router.push(`/checkout/success?order=${data.display_id || data.order_id}`);
  }

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
    <SiteHeader />
    <main id="main-content" className="container-x max-w-3xl py-12">
      <h1 className="font-display text-5xl font-medium mb-4">Checkout</h1>
      <p>Sandbox payments only. The test card is 4242 4242 4242 4242. Nothing is charged. A declined card is 4000 0000 0000 0002.</p>
      <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
        <label className="field">Email<input name="email" type="email" required autoComplete="email" /></label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <label className="field">First name<input name="first_name" required /></label>
          <label className="field">Last name<input name="last_name" required /></label>
        </div>
        <label className="field">Address<input name="address_1" required /></label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          <label className="field">City<input name="city" required /></label>
          <label className="field">Postcode<input name="postal_code" required /></label>
          <label className="field">Country
            <select value={country} onChange={(event) => setCountry(event.target.value)}>
              {["GB", "IE", "FR", "DE", "US", "AU", "NO", "RU"].map((code) => <option key={code}>{code}</option>)}
            </select>
          </label>
        </div>
        {methods.includes("express") && (
          <fieldset>
            <legend>UK delivery</legend>
            <label><input type="radio" name="method" checked={method === "express"} onChange={() => setMethod("express")} /> Express, 1–2 days</label>
            <label style={{ marginLeft: 12 }}><input type="radio" name="method" checked={method === "standard"} onChange={() => setMethod("standard")} /> Standard, 3–5 days</label>
          </fieldset>
        )}
        <p>{quoteError || (quote ? `${quote.label}: ${quote.amount === 0 ? "Free" : formatGbp(quote.amount)}` : null)} · Goods {formatGbp(subtotal)}{code ? ` · Code ${code} will be applied` : ""}</p>
        <label className="field">Sandbox card number<input name="card" inputMode="numeric" autoComplete="off" placeholder="4242 4242 4242 4242" required /></label>
        <label className="field">Expiry<input name="expiry" placeholder="12/30" required /></label>
        <label className="field">CVC<input name="cvc" placeholder="123" required /></label>
        {error && <p role="alert">{error}</p>}
        <button className="w-full bg-gold text-navy-deep py-4 text-xs font-bold tracking-widest disabled:opacity-60" disabled={pending || !cartId || Boolean(quoteError)} type="submit">{pending ? "PLACING ORDER..." : "PLACE SANDBOX ORDER"}</button>
      </form>
      <p className="text-xs text-muted-foreground mt-4">VAT is not added. It has not been configured and must be confirmed before any live cutover.</p>
    </main>
    <SiteFooter />
    </div>
  );
}
