"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, ReactNode, useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { formatGbp, ResearchUseNotice } from "@orp/ui";
import { track } from "@/lib/analytics";

type CartItem = { id: string; title: string; quantity: number; unit_price: number; variant_id: string; thumbnail?: string };
type Cart = { id: string; items?: CartItem[]; total?: number; item_subtotal?: number; discount_total?: number; shipping_total?: number; promotions?: Array<{ code?: string }> };

const NAV = [
  { href: "/about", label: "ABOUT" },
  { href: "/shop", label: "SHOP" },
  { href: "/coas", label: "COAS" },
  { href: "/contact", label: "CONTACT" },
  { href: "/faqs", label: "FAQS" },
];

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [open, setOpen] = useState(false);
  async function refresh(id?: string) {
    const cartId = id || localStorage.getItem("orp_cart_id");
    if (!cartId) return null;
    const response = await fetch(`/api/cart?id=${cartId}`);
    if (!response.ok) return null;
    const data = await response.json();
    setCart(data.cart);
    return data.cart as Cart;
  }
  async function add(variantId: string, quantity = 1) {
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "add", cart_id: localStorage.getItem("orp_cart_id"), variant_id: variantId, quantity }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not add to cart");
    localStorage.setItem("orp_cart_id", data.cart.id);
    setCart(data.cart);
    setOpen(true);
    track("add_to_cart", { currency: "GBP", value: data.cart.item_subtotal, items: [{ item_id: variantId, quantity }] });
  }
  return { cart, open, setOpen, refresh, add, setCart };
}

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const search = useSearchParams();
  const router = useRouter();
  const cartState = useCart();
  const [age, setAge] = useState<boolean | null>(null);
  const [checked, setChecked] = useState(false);
  const [cookie, setCookie] = useState<string | null>(null);
  const [newsletter, setNewsletter] = useState(false);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    setAge(sessionStorage.getItem("orp_age_confirmed") === "true");
    setCookie(localStorage.getItem("orp_cookie_consent_v1"));
    cartState.refresh();
    const code = search.get("discount") || search.get("discount_code");
    if (code && /^[A-Z0-9_-]{1,40}$/i.test(code)) {
      localStorage.setItem("orp_discount", JSON.stringify({ code: code.toUpperCase(), expires: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
    }
  }, [pathname, search]);

  useEffect(() => {
    if (age !== true || cookie === null || cartState.cart?.items?.length) return;
    if (pathname !== "/" && pathname !== "/shop") return;
    if (localStorage.getItem("orp_newsletter_prompt") === "subscribed") return;
    const timer = setTimeout(() => setNewsletter(true), 30000);
    return () => clearTimeout(timer);
  }, [age, cookie, pathname, cartState.cart?.items?.length]);

  const count = cartState.cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <a href="#main-content" className="sr-only">Skip to content</a>
      <div className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)", fontSize: 12, textAlign: "center", padding: "0.45rem 1rem" }}>
        UK delivery free from £12 · Orders before 2pm UK are dispatched the same working day · Research use only
      </div>
      <header style={{ background: "white", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, zIndex: 20 }}>
        <div className="container-x" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 80, gap: 16 }}>
          <Link href="/" aria-label="Oxford Research Peptides — Home">
            <img src="/brand/oxford-logo.webp" alt="Oxford Research Peptides" width={160} height={58} style={{ height: 48, width: "auto" }} />
          </Link>
          <nav aria-label="Primary" style={{ display: "flex", gap: 28, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em" }} className="desktop-nav">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} style={{ color: pathname === item.href ? "var(--gold-readable)" : "inherit" }}>{item.label}</Link>
            ))}
          </nav>
          <div style={{ display: "flex", gap: 8 }}>
            <button aria-label="Search" className="icon-btn" onClick={() => setSearchOpen((value) => !value)}><Search size={20} /></button>
            <Link href="/account" aria-label="Account" className="icon-btn"><User size={20} /></Link>
            <button aria-label={`Cart, ${count} items`} className="icon-btn" onClick={() => { cartState.setOpen(true); track("view_cart", { currency: "GBP", value: cartState.cart?.item_subtotal || 0 }); }}>
              <ShoppingBag size={20} />
              <span style={{ position: "absolute", top: 2, right: 2, background: "var(--gold)", color: "var(--navy-deep)", borderRadius: 99, width: 16, height: 16, fontSize: 10, fontWeight: 700 }}>{count}</span>
            </button>
            <button aria-label="Open menu" className="icon-btn mobile-only" onClick={() => setMenu(true)}><Menu size={22} /></button>
          </div>
        </div>
        {searchOpen && (
          <form className="container-x" style={{ display: "flex", gap: 8, paddingBottom: 16 }} onSubmit={(event) => { event.preventDefault(); setSearchOpen(false); router.push(`/search?q=${encodeURIComponent(q)}`); }}>
            <label className="sr-only" htmlFor="site-search">Search</label>
            <input id="site-search" value={q} onChange={(event) => setQ(event.target.value)} placeholder="Search peptides, articles, COAs..." style={{ flex: 1, border: "1px solid var(--border)", padding: "0.75rem 1rem" }} />
            <button className="btn" type="submit">SEARCH</button>
          </form>
        )}
      </header>
      <div className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)" }}>
        <div className="container-x" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, padding: "0.9rem 0", fontSize: 12 }}>
          {["UK Manufactured", "Third-Party Tested", "Batch Verified", "Royal Mail Tracked 24"].map((label) => (
            <div key={label}><strong className="gold-text" style={{ letterSpacing: "0.08em" }}>{label.toUpperCase()}</strong></div>
          ))}
        </div>
      </div>
      <div style={{ minHeight: "50vh" }}>{children}</div>
      <ResearchUseNotice />
      <footer className="on-navy" style={{ background: "var(--navy-deep)", color: "var(--bone)", padding: "3rem 0 1rem" }}>
        <div className="container-x footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr repeat(4, 1fr)", gap: 24 }}>
          <div>
            <img src="/brand/oxford-research-syndicate.webp" alt="Oxford Research Syndicate Ltd" style={{ background: "white", padding: 8, height: 56, width: "auto" }} />
            <p style={{ color: "rgba(247,244,238,.7)", fontSize: 12, maxWidth: 280 }}>
              This brand is owned and operated by Oxford Research Syndicate Ltd, a company registered in England & Wales. Company Reg. No. 17207898. 131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom.
            </p>
            <a href="mailto:info@oxfordresearchpeptides.com">info@oxfordresearchpeptides.com</a>
          </div>
          <FooterCol title="SHOP" links={[["/shop", "All Peptides"], ["/coas", "Certificates"]]} />
          <FooterCol title="COMPANY" links={[["/about", "About Us"], ["/contact", "Contact Us"], ["/faqs", "FAQs"], ["/sitemap", "Sitemap"]]} />
          <FooterCol title="LEGAL" links={[["/privacy-policy", "Privacy Policy"], ["/terms", "Terms & Conditions"], ["/cookie-policy", "Cookie Policy"], ["/disclaimer", "Disclaimer"]]} />
          <FooterCol title="POLICIES" links={[["/shipping-policy", "Shipping Policy"], ["/refund-policy", "Refund Policy"], ["/cancellation-policy", "Cancellation Policy"], ["/research-use-only", "Research Use Only"]]} />
        </div>
        <NewsletterForm onDone={() => setNewsletter(false)} />
        <div className="container-x" style={{ borderTop: "1px solid rgba(255,255,255,.12)", marginTop: 24, padding: "1rem 0", display: "flex", justifyContent: "space-between", gap: 12, fontSize: 11, color: "rgba(247,244,238,.6)" }}>
          <span>© 2026 Oxford Research Syndicate Ltd. All Rights Reserved.</span>
          <span>Research Use Only. Not for Human or Animal Consumption.</span>
        </div>
      </footer>
      {menu && (
        <div className="overlay" onClick={() => setMenu(false)}>
          <nav className="dialog" onClick={(event) => event.stopPropagation()} aria-label="Mobile">
            <button aria-label="Close menu" onClick={() => setMenu(false)} style={{ float: "right" }}><X /></button>
            {NAV.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenu(false)} style={{ display: "block", padding: "0.8rem 0", letterSpacing: "0.14em", fontWeight: 700 }}>{item.label}</Link>)}
            <Link href="/research-hub" onClick={() => setMenu(false)} style={{ display: "block", padding: "0.8rem 0" }}>Research hub</Link>
          </nav>
        </div>
      )}
      {cartState.open && <CartDrawer cart={cartState.cart} onClose={() => cartState.setOpen(false)} />}
      {age === false && (
        <div className="overlay" role="presentation">
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="age-title">
            <img src="/brand/oxford-logo.webp" alt="" width={140} height={50} />
            <h2 id="age-title" style={{ fontSize: 36, margin: "0.4rem 0" }}>Confirm you are 18 or over</h2>
            <p>Oxford Research Peptides supplies material for in-vitro laboratory research only. You must be 18 or over to enter.</p>
            <label style={{ display: "flex", gap: 8, alignItems: "flex-start", margin: "1rem 0" }}>
              <input type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} />
              <span>I confirm I am 18 or over and I am accessing this site for laboratory research.</span>
            </label>
            <button className="btn" disabled={!checked} onClick={() => { sessionStorage.setItem("orp_age_confirmed", "true"); setAge(true); }}>ENTER</button>
          </div>
        </div>
      )}
      {age === true && cookie === null && (
        <div role="dialog" aria-label="Cookies" style={{ position: "fixed", left: 16, right: 16, bottom: 16, zIndex: 30, background: "white", border: "1px solid var(--border)", padding: 16, display: "flex", gap: 12, justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: 14 }}>We use essential cookies to run the shop. Analytics cookies load only if you accept. <Link href="/cookie-policy" style={{ textDecoration: "underline" }}>Cookie policy</Link></p>
          <span style={{ display: "flex", gap: 8 }}>
            <button className="btn secondary" onClick={() => { localStorage.setItem("orp_cookie_consent_v1", "rejected"); setCookie("rejected"); }}>REJECT</button>
            <button className="btn" onClick={() => { localStorage.setItem("orp_cookie_consent_v1", "accepted"); setCookie("accepted"); }}>ACCEPT</button>
          </span>
        </div>
      )}
      {newsletter && age === true && cookie !== null && (
        <div className="overlay">
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="news-title">
            <h2 id="news-title" style={{ fontSize: 36, marginTop: 0 }}>10% off your first order</h2>
            <p>Join the research list. Your welcome code is applied for you — you do not need to type it.</p>
            <NewsletterForm compact onDone={(code) => { if (code) localStorage.setItem("orp_discount", JSON.stringify({ code, expires: Date.now() + 30 * 24 * 60 * 60 * 1000 })); localStorage.setItem("orp_newsletter_prompt", "subscribed"); setNewsletter(false); }} />
            <button className="btn secondary" style={{ marginTop: 8 }} onClick={() => { localStorage.setItem("orp_newsletter_prompt", String(Date.now())); setNewsletter(false); }}>Not now</button>
          </div>
        </div>
      )}
      <style>{`
        .icon-btn { position: relative; width: 44px; height: 44px; border: 0; background: transparent; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .mobile-only { display: none; }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: inline-flex; }
          header + .on-navy .container-x { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<[string, string]> }) {
  return (
    <div>
      <h3 className="gold-text" style={{ fontFamily: "Inter, sans-serif", fontSize: 11, letterSpacing: "0.18em" }}>{title}</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: 13, display: "grid", gap: 8 }}>
        {links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}
      </ul>
    </div>
  );
}

function NewsletterForm({ onDone, compact = false }: { onDone?: (code?: string) => void; compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setMessage("");
    const response = await fetch("/api/newsletter", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email, source: compact ? "popup" : "footer", website: "" }) });
    const data = await response.json();
    setPending(false);
    if (!response.ok) { setMessage(data.error || "Please try again."); return; }
    localStorage.setItem("orp_discount", JSON.stringify({ code: data.code, expires: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
    localStorage.setItem("orp_newsletter_prompt", "subscribed");
    setMessage(`You're subscribed. Code ${data.code} is saved to your basket.`);
    onDone?.(data.code);
  }
  return (
    <form onSubmit={submit} className={compact ? "" : "container-x"} style={{ display: "flex", gap: 8, marginTop: compact ? 0 : 24, flexWrap: "wrap" }}>
      <input aria-label="Email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" style={{ flex: 1, minWidth: 180, padding: "0.7rem 0.8rem", border: "1px solid rgba(255,255,255,.3)", background: compact ? "white" : "rgba(255,255,255,.06)", color: compact ? "var(--navy-deep)" : "white" }} />
      <button className="btn" disabled={pending} type="submit">{pending ? "..." : "SUBSCRIBE"}</button>
      {message && <p style={{ width: "100%", fontSize: 13 }}>{message}</p>}
    </form>
  );
}

function CartDrawer({ cart, onClose }: { cart: Cart | null; onClose: () => void }) {
  const items = cart?.items || [];
  const subtotal = cart?.item_subtotal ?? items.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
  return (
    <div className="overlay" onClick={onClose}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()} aria-label="Cart">
        <header style={{ display: "flex", justifyContent: "space-between", padding: 16, borderBottom: "1px solid var(--border)" }}>
          <strong>Your basket</strong>
          <button aria-label="Close cart" onClick={onClose}><X /></button>
        </header>
        <div style={{ padding: 16, overflow: "auto", flex: 1 }}>
          {!items.length && <p>Your basket is empty.</p>}
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
              <div>
                <div>{item.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>Qty {item.quantity}</div>
              </div>
              <div>{formatGbp(item.unit_price * item.quantity)}</div>
            </div>
          ))}
        </div>
        <footer style={{ padding: 16, borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><span>Subtotal</span><strong>{formatGbp(subtotal)}</strong></div>
          <Link className="btn" href="/cart" onClick={onClose} style={{ width: "100%" }}>VIEW CART</Link>
          <Link className="btn secondary" href="/checkout" onClick={onClose} style={{ width: "100%", marginTop: 8 }}>CHECKOUT</Link>
        </footer>
      </aside>
    </div>
  );
}

export function AddButton({ variantId, label = "ADD TO BASKET" }: { variantId: string; label?: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState<Cart | null>(null);
  return (
    <>
      <button className="btn" disabled={pending} onClick={async () => {
        setPending(true); setError("");
        const response = await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "add", cart_id: localStorage.getItem("orp_cart_id"), variant_id: variantId, quantity: 1 }) });
        const data = await response.json();
        setPending(false);
        if (!response.ok) { setError(data.error || "Could not add"); return; }
        localStorage.setItem("orp_cart_id", data.cart.id);
        setCart(data.cart);
        setOpen(true);
        track("add_to_cart", { currency: "GBP", items: [{ item_id: variantId, quantity: 1 }] });
      }}>{pending ? "ADDING..." : label}</button>
      {error && <p role="alert">{error}</p>}
      {open && <CartDrawer cart={cart} onClose={() => setOpen(false)} />}
    </>
  );
}
