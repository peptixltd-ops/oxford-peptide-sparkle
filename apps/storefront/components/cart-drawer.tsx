"use client";
import { Link } from "@/shims/router";
import { X, Check, Loader2, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { getProduct, getVariant } from "@/lib/products";
import {
  BAC_WATER_UPSELL,
  closeCheckoutTab,
  createCheckout,
  getVariantGid,
  openCheckoutTab,
  sendToCheckout,
} from "@/lib/shopify";
import { startNiftiPayCheckout } from "@/lib/niftipay-client";
import { DiscountCodeBox } from "@/components/discount-code-box";
import { niftiPayShipping } from "@/lib/niftipay-shipping";
import { COUNTRIES } from "@/lib/niftipay-customer";
import { Button } from "@/components/ui/button";
import { BacWaterUpsell } from "@/components/bac-water-upsell";
import { toast } from "sonner";
import { createPortal } from "react-dom";


/**
 * Slide-in cart drawer. Opens automatically whenever an item is added to the
 * cart so the customer gets immediate confirmation of what they added.
 */
export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, lastAdded, setQty, remove } = useCart();
  const [loading, setLoading] = useState(false);
  const [outsideUK, setOutsideUK] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("orp_niftipay_customer_v1") ?? "null");
      setOutsideUK(typeof saved?.country === "string" && saved.country !== "GB" && COUNTRIES.some(([code]) => code === saved.country));
    } catch {
      setOutsideUK(false);
    }
  }, [drawerOpen]);

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


  const lines = items
    .map((i) => {
      const product = getProduct(i.slug);
      if (!product) return null;
      return { item: i, product, variant: getVariant(product, i.variantId) };
    })
    .filter((l): l is NonNullable<typeof l> => !!l);

  const subtotal = lines.reduce((s, l) => s + l.variant.price * l.item.qty, 0);
  const shipping = niftiPayShipping(subtotal, "GB");

  const fmt = (n: number) => `£${n.toFixed(2)}`;
  const bacLines = lines.filter((l) => l.product.slug === BAC_WATER_UPSELL.slug);
  const bacDiscount = Math.min(
    bacLines.reduce((s, l) => s + l.variant.price * l.item.qty, 0),
    bacLines.reduce((s, l) => s + BAC_WATER_UPSELL.amountOff * l.item.qty, 0),
  );

  const total = Math.max(0, subtotal - bacDiscount) + shipping;

  const added = lastAdded ? getProduct(lastAdded.slug) : null;
  const addedVariant = added && lastAdded ? getVariant(added, lastAdded.variantId) : null;

  const [cardLoading, setCardLoading] = useState(false);
  const payByCard = async () => {
    setCardLoading(true);
    try {
      const shopLines = lines
        .map((l) => {
          const gid = getVariantGid(l.product.slug, l.variant.id);
          return gid ? { merchandiseId: gid, quantity: l.item.qty } : null;
        })
        .filter((x): x is { merchandiseId: string; quantity: number } => !!x);
      const codes = bacLines.length ? [BAC_WATER_UPSELL.code] : [];
      await startNiftiPayCheckout(shopLines, codes);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Card payment failed");
    } finally {
      setCardLoading(false);
    }
  };

  const checkout = async () => {
    const tab = openCheckoutTab();
    setLoading(true);
    try {
      const shopLines = lines
        .map((l) => {
          const gid = getVariantGid(l.product.slug, l.variant.id);
          return gid ? { merchandiseId: gid, quantity: l.item.qty } : null;
        })
        .filter((x): x is { merchandiseId: string; quantity: number } => !!x);
      if (shopLines.length === 0) {
        closeCheckoutTab(tab);
        toast.error("No items available for checkout");
        return;
      }
      const url = await createCheckout(
        shopLines,
        subtotal,
        bacLines.length ? [BAC_WATER_UPSELL.code] : [],
      );
      sendToCheckout(tab, url);

    } catch (e) {
      closeCheckoutTab(tab);
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  if (!drawerOpen) return null;

  const drawer = (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Shopping cart">
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
                <img src={product.img} width={666} height={999} decoding="async" loading="lazy" alt={product.name} className="w-14 h-14 object-contain shrink-0" />
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
          <div className="px-5 pb-4">
            <BacWaterUpsell compact />
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-border bg-white p-5 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">{fmt(subtotal)}</span>
            </div>
            {bacDiscount > 0 && (
              <div className="flex justify-between text-sm text-gold">
                <span>Bac water offer (£{BAC_WATER_UPSELL.amountOff} off)</span>
                <span className="font-semibold">-{fmt(bacDiscount)}</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : fmt(shipping)}</span>
            </div>
            <p className="flex items-center gap-2 border-l-2 border-gold bg-bone px-3 py-2 text-xs font-semibold text-navy-deep">
              <Truck className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span>Free UK delivery when you spend £12 or more</span>
            </p>
            <div className="flex justify-between pt-3 border-t border-border font-display text-lg font-medium">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>

            <div className="mb-4"><DiscountCodeBox /></div>
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">Choose how you'd like to pay</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <Button
                    onClick={payByCard}
                    disabled={cardLoading || loading}
                    aria-label="Pay by card / Apple Pay / Google Pay"
                    className="w-full h-14 rounded-none px-2 py-3 bg-gold text-navy-deep text-xs font-bold whitespace-normal shadow-none hover:bg-gold-soft disabled:opacity-60"
                  >
                    {cardLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay by card / Apple Pay / Google Pay"}
                  </Button>
                </div>
                <div className="min-w-0">
                  <Button
                    onClick={checkout}
                    disabled={loading || cardLoading}
                    aria-label="Pay by bank"
                    className="w-full h-14 rounded-none px-2 py-3 bg-gold text-navy-deep text-xs font-bold whitespace-normal shadow-none hover:bg-gold-soft disabled:opacity-60"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Pay by bank"}
                  </Button>
                  <p className="mt-1.5 text-center text-[10px] text-muted-foreground">UK bank accounts only</p>
                </div>
              </div>
              {outsideUK && <p className="text-[11px] text-muted-foreground">Paying from outside the UK? Card is quickest.</p>}
            </div>
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

  // The header is a `relative z-20` stacking context, which trapped the drawer
  // below page content (hero text bled over it on mobile). Portal to <body>.
  if (typeof document === "undefined") return drawer;
  return createPortal(drawer, document.body);
}
