import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { getProduct, getVariant } from "@/lib/products";
import { createCheckout, getVariantGid } from "@/lib/shopify";
import { Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Oxford Research Peptides" }] }),
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
  const shipping = subtotal > 0 ? 8 : 0;
  const total = subtotal + shipping;
  const fmt = (n: number) => `£${n.toFixed(2)}`;

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
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
                  <div key={`${item.slug}::${item.variantId}`} className="flex items-center gap-4 p-5 border-b border-border last:border-b-0">
                    <Link to="/products/$slug" params={{ slug: product.slug }} className="w-20 h-20 bg-muted/40 flex items-center justify-center shrink-0">
                      <img src={product.img} alt={product.name} className="max-h-full object-contain" />
                    </Link>
                    <div className="flex-1">
                      <Link to="/products/$slug" params={{ slug: product.slug }} className="font-display text-lg font-semibold hover:text-gold transition-colors">
                        {product.name}
                      </Link>
                      <div className="text-xs text-muted-foreground">{variant.label} · {product.purity}</div>
                    </div>
                    <div className="flex items-center border border-border">
                      <button onClick={() => setQty(item.slug, item.variantId, item.qty - 1)} className="px-2.5 py-1.5 hover:bg-muted">−</button>
                      <span className="px-3 py-1.5 min-w-[2.5rem] text-center text-sm">{item.qty}</span>
                      <button onClick={() => setQty(item.slug, item.variantId, item.qty + 1)} className="px-2.5 py-1.5 hover:bg-muted">+</button>
                    </div>
                    <div className="w-24 text-right font-semibold">{fmt(variant.price * item.qty)}</div>
                    <button onClick={() => remove(item.slug, item.variantId)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
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
                  <div className="flex justify-between"><span>Shipping</span><span>{fmt(shipping)}</span></div>
                </div>
                <div className="flex justify-between font-display text-xl font-medium mb-6">
                  <span>Total</span><span>{fmt(total)}</span>
                </div>
                <button
                  onClick={async () => {
                    setLoading(true);
                    try {
                      const shopLines = lines
                        .map(l => {
                          const gid = getVariantGid(l.product.slug, l.variant.id);
                          return gid ? { merchandiseId: gid, quantity: l.item.qty } : null;
                        })
                        .filter((x): x is { merchandiseId: string; quantity: number } => !!x);
                      if (shopLines.length === 0) {
                        toast.error("No items available for checkout");
                        return;
                      }
                      const url = await createCheckout(shopLines);
                      window.open(url, "_blank");
                    } catch (e) {
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
      <SiteFooter />
    </div>
  );
}
