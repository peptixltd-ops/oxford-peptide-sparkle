import { Link } from "@tanstack/react-router";
import { X, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, getVariant } from "@/lib/products";
import { createCheckout, getVariantGid } from "@/lib/shopify";
import { toast } from "sonner";

/**
 * Slide-in cart drawer. Opens automatically whenever an item is added to the
 * cart so the customer gets immediate confirmation of what they added.
 */
export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, lastAdded, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen, closeDrawer]);

  if (!drawerOpen) return null;

  const lines = items
    .map((i) => {
      const product = getProduct(i.slug);
      if (!product) return null;
      return { item: i, product, variant: getVariant(product, i.variantId) };
    })
    .filter((l): l is NonNullable<typeof l> => !!l);

  const subtotal = lines.reduce((s, l) => s + l.variant.price * l.item.qty, 0);
  const fmt = (n: number) => `£${n.toFixed(2)}`;

  const added = lastAdded ? getProduct(lastAdded.slug) : null;
  const addedVariant = added && lastAdded ? getVariant(added, lastAdded.variantId) : null;

  const checkout = async () => {
    setLoading(true);
    try {
      const shopLines = lines
        .map((l) => {
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
  };

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button
        type="button"
        aria-label="Close cart"
        onClick={closeDrawer}
        className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm animate-fade-in"
      />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-bone text-navy-deep shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 h-20 border-b border-border bg-white">
          <span className="text-[11px] font-bold tracking-[0.3em]">YOUR CART</span>
          <button
            type="button"
            aria-label="Close cart"
            onClick={closeDrawer}
            className="min-h-11 min-w-11 inline-flex items-center justify-center hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {added && addedVariant && (
          <div className="mx-4 mt-4 flex items-center gap-3 bg-white border border-gold p-3 animate-scale-in">
            <span className="w-7 h-7 rounded-full bg-gold text-navy-deep flex items-center justify-center shrink-0">
              <Check className="w-4 h-4" aria-hidden="true" />
            </span>
            <div className="text-xs">
              <div className="font-bold tracking-widest text-[10px] text-gold-soft">ADDED TO CART</div>
              <div className="font-semibold">
                {added.name} · {addedVariant.label}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {lines.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-12">Your cart is empty.</p>
          ) : (
            lines.map(({ item, product, variant }) => (
              <div
                key={`${item.slug}::${item.variantId}`}
                className="flex gap-3 bg-white border border-border p-3 items-center"
              >
                <img src={product.img} alt={product.name} className="w-14 h-14 object-contain shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-sm font-semibold truncate">{product.name}</div>
                  <div className="text-[11px] text-muted-foreground">{variant.label}</div>
                  <div className="flex items-center border border-border w-fit mt-1">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty(item.slug, item.variantId, item.qty - 1)}
                      className="px-2 py-0.5 hover:bg-muted/40"
                    >
                      −
                    </button>
                    <span className="px-2.5 text-xs">{item.qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty(item.slug, item.variantId, item.qty + 1)}
                      className="px-2 py-0.5 hover:bg-muted/40"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{fmt(variant.price * item.qty)}</div>
                  <button
                    onClick={() => remove(item.slug, item.variantId)}
                    className="text-[10px] text-muted-foreground hover:text-destructive"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-border bg-white p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{fmt(subtotal)}</span>
            </div>
            <button
              onClick={checkout}
              disabled={loading}
              className="w-full py-4 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors disabled:opacity-60 flex items-center justify-center"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "CHECKOUT"}
            </button>
            <Link
              to="/cart"
              onClick={closeDrawer}
              className="block text-center text-xs text-muted-foreground hover:text-gold"
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
