import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { useCart } from "@/lib/cart";
import { getProduct, getVariant } from "@/lib/products";
import {
  closeCheckoutTab,
  createCheckout,
  creditForSubtotal,
  getVariantGid,
  openCheckoutTab,
  sendToCheckout,
} from "@/lib/shopify";
import { Trash2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { seo } from "@/lib/seo";
import { trackViewCart, trackBeginCheckout } from "@/lib/tracking";

export const Route = createFileRoute("/cart")({
  head: () =>
    seo({
      path: "/cart",
      title: "Your Cart — Oxford Research Peptides",
      description: "Review the items in your Oxford Research Peptides cart before checkout.",
      noindex: true,
    }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const lines = items
    .map(i => {
      const product = getProduct(i.slug);
      if (!product) return null;
      const variant = getVariant(product, i.variantId);
      return { item: i, product, variant };
    })
    .filter((l): l is NonNullable<typeof l> => !!l);

  const subtotal = lines.reduce((s, l) => s + l.variant.price * l.item.qty, 0);
  const FREE_SHIPPING_THRESHOLD = 20;
  const SHIPPING_RATE = 3.99;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATE;
  const toFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const credit = creditForSubtotal(subtotal);
  const total = Math.max(0, subtotal - (credit?.amount ?? 0)) + shipping;
  const nextTier = !credit ? 30 : credit.threshold === 30 ? 80 : null;
  const fmt = (n: number) => `£${n.toFixed(2)}`;

  useEffect(() => {
    if (lines.length > 0) {
      trackViewCart(lines.map(l => ({ product: l.product, variant: l.variant, quantity: l.item.qty })));
    }
    // Fire once on mount for the current cart snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <main id="main-content">
      <section className="py-12">
        <div className="container-x">
          <h1 className="font-display text-4xl font-medium mb-8">Your Cart</h1>

          {lines.length === 0 ? (
            <div className="bg-white border border-border p-12 text-center">
              <p className="text-muted-foreground mb-6">Your cart is empty.</p>
              <Link to="/shop" className="inline-block px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
                BROWSE PEPTIDES
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_360px] gap-8">
              <div className="bg-white border border-border">
                {lines.map(({ item, product, variant }) => (
                  <div key={`${item.slug}::${item.variantId}`} className="grid grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:grid-cols-[5rem_minmax(0,1fr)_auto_auto_auto] items-center gap-x-3 gap-y-3 p-4 sm:p-5 border-b border-border last:border-b-0">
                    <Link to="/products/$slug" params={{ slug: product.slug }} className="w-[4.5rem] h-[4.5rem] sm:w-20 sm:h-20 bg-muted/40 flex items-center justify-center shrink-0 row-span-2 sm:row-span-1">
                      <img src={product.img} alt={product.name} className="max-h-full object-contain" />
                    </Link>
                    <div className="min-w-0 col-span-2 sm:col-span-1">
                      <Link to="/products/$slug" params={{ slug: product.slug }} className="block font-display text-base sm:text-lg font-semibold hover:text-gold transition-colors truncate">
                        {product.name}
                      </Link>
                      <div className="text-xs text-muted-foreground leading-snug">{variant.label} · {product.purity}</div>
                    </div>
                    <div className="flex items-center border border-border w-fit">
                      <button aria-label="Decrease quantity" onClick={() => setQty(item.slug, item.variantId, item.qty - 1)} className="w-9 h-9 hover:bg-muted">−</button>
                      <span className="w-9 text-center text-sm">{item.qty}</span>
                      <button aria-label="Increase quantity" onClick={() => setQty(item.slug, item.variantId, item.qty + 1)} className="w-9 h-9 hover:bg-muted">+</button>
                    </div>
                    <div className="text-right font-semibold whitespace-nowrap">{fmt(variant.price * item.qty)}</div>
                    <button onClick={() => remove(item.slug, item.variantId)} aria-label="Remove" className="text-muted-foreground hover:text-destructive w-9 h-9 inline-flex items-center justify-center">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <div className="p-4 flex justify-end">
                  <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
                </div>
              </div>

              <aside className="bg-white border border-border p-6 h-fit">
                <h2 className="text-xs font-bold tracking-[0.25em] mb-5">ORDER SUMMARY</h2>
                <div className="space-y-3 text-sm border-b border-border pb-4 mb-4">
                  <div className="flex justify-between"><span>Subtotal</span><span>{fmt(subtotal)}</span></div>
                  <div className="flex justify-between"><span>Shipping</span><span className="font-semibold">{shipping === 0 ? "Free" : fmt(shipping)}</span></div>
                  {toFreeShipping > 0 && (
                    <p className="text-[11px] text-muted-foreground">Spend {fmt(toFreeShipping)} more for free UK shipping.</p>
                  )}
                  {credit && (
                    <div className="flex justify-between text-gold"><span>Store credit ({credit.code})</span><span className="font-semibold">-{fmt(credit.amount)}</span></div>
                  )}
                  {nextTier && (
                    <p className="text-[11px] text-muted-foreground">Spend {fmt(nextTier - subtotal)} more to unlock £{nextTier === 30 ? 5 : 10} off.</p>
                  )}
                </div>
                <div className="flex justify-between font-display text-xl font-medium mb-6">
                  <span>Total</span><span>{fmt(total)}</span>
                </div>
                <button
                  onClick={async () => {
                    trackBeginCheckout(lines.map(l => ({ product: l.product, variant: l.variant, quantity: l.item.qty })));
                    const tab = openCheckoutTab();
                    setLoading(true);
                    try {
                      const shopLines = lines
                        .map(l => {
                          const gid = getVariantGid(l.product.slug, l.variant.id);
                          return gid ? { merchandiseId: gid, quantity: l.item.qty } : null;
                        })
                        .filter((x): x is { merchandiseId: string; quantity: number } => !!x);
                      if (shopLines.length === 0) {
                        closeCheckoutTab(tab);
                        toast.error("No items available for checkout");
                        return;
                      }
                      const url = await createCheckout(shopLines, subtotal);
                      sendToCheckout(tab, url);
                    } catch (e) {
                      closeCheckoutTab(tab);
                      toast.error(e instanceof Error ? e.message : "Checkout failed");
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={loading || lines.length === 0}
                  className="w-full px-7 py-4 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "CHECKOUT"}
                </button>
                <Link to="/shop" className="block text-center mt-3 text-xs text-muted-foreground hover:text-gold">Continue shopping</Link>
              </aside>
            </div>
          )}
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
