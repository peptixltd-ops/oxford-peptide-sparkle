"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatGbp } from "@orp/ui";
import { quoteShipping } from "@orp/config/shipping";
import { track } from "@/lib/analytics";

export default function CartPage() {
  const [cart, setCart] = useState<{ id: string; items?: Array<{ id: string; title: string; quantity: number; unit_price: number }>; item_subtotal?: number; discount_total?: number } | null>(null);
  const [code, setCode] = useState("");
  useEffect(() => {
    const id = localStorage.getItem("orp_cart_id");
    const saved = localStorage.getItem("orp_discount");
    if (saved) {
      try { setCode(JSON.parse(saved).code || ""); } catch { /* ignore */ }
    }
    if (!id) return;
    fetch(`/api/cart?id=${id}`).then((response) => response.json()).then((data) => {
      setCart(data.cart);
      track("view_cart", { currency: "GBP", value: data.cart?.item_subtotal || 0 });
    });
  }, []);
  const subtotal = cart?.item_subtotal ?? (cart?.items || []).reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  const shipping = quoteShipping(subtotal || 0, "GB", "express");
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem", maxWidth: 800 }}>
      <h1 style={{ fontSize: 52 }}>Basket</h1>
      {!cart?.items?.length && <p>Your basket is empty. <Link href="/shop">Continue to the shop</Link>.</p>}
      {(cart?.items || []).map((item) => (
        <div key={item.id} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border)", padding: "0.8rem 0" }}>
          <span>{item.title} × {item.quantity}</span>
          <span>{formatGbp(item.unit_price * item.quantity)}</span>
        </div>
      ))}
      <p>Goods {formatGbp(subtotal)} · UK Express {shipping.amount === 0 ? "free" : formatGbp(shipping.amount)} · {code ? `Saved code ${code}` : "No code saved"}</p>
      {code && <p style={{ fontSize: 14 }}>Codes from email links are applied at checkout. You do not need to type them.</p>}
      <Link className="btn" href="/checkout">CHECKOUT</Link>
    </main>
  );
}
