import { Link } from "@tanstack/react-router";
import type { Product, Variant } from "@/lib/products";
import { fromPrice, getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import {
  BAC_WATER_UPSELL,
  closeCheckoutTab,
  createCheckout,
  getVariantGid,
  openCheckoutTab,
  sendToCheckout,
} from "@/lib/shopify";
import { BacWaterBuyNowDialog } from "@/components/bac-water-buy-now-dialog";
import { startNiftiPayCheckout } from "@/lib/niftipay-client";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function ProductCard({ p }: { p: Product }) {
  const { add, items } = useCart();
  const [loading, setLoading] = useState(false);
  const [cardLoading, setCardLoading] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const defaultVariant = p.variants[0];
  const min = fromPrice(p);
  const hasMultiple = p.variants.length > 1;

  const bacInCart = items.some(i => i.slug === BAC_WATER_UPSELL.slug);
  const showBacOffer = p.slug !== BAC_WATER_UPSELL.slug && !bacInCart;

  const buyNow = () => {
    if (showBacOffer) { setOfferOpen(true); return; }
    void goToCheckout(null);
  };

  const goToCheckout = async (bacVariantId: string | null) => {
    const gid = getVariantGid(p.slug, defaultVariant.id);
    if (!gid) { toast.error("Unavailable for checkout"); return; }
    const tab = openCheckoutTab();
    setLoading(true);
    try {
      const lines = [{ merchandiseId: gid, quantity: 1 }];
      let subtotal = defaultVariant.price;
      const codes: string[] = [];
      if (bacVariantId) {
        const bacGid = getVariantGid(BAC_WATER_UPSELL.slug, bacVariantId);
        const bacVariant = getProduct(BAC_WATER_UPSELL.slug)?.variants.find((v: Variant) => v.id === bacVariantId);
        if (bacGid && bacVariant) {
          lines.push({ merchandiseId: bacGid, quantity: 1 });
          subtotal += bacVariant.price;
          codes.push(BAC_WATER_UPSELL.code);
        }
      }
      const url = await createCheckout(lines, subtotal, codes);
      setOfferOpen(false);
      sendToCheckout(tab, url);
    } catch (e) {
      closeCheckoutTab(tab);
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  const payByCard = async () => {
    const gid = getVariantGid(p.slug, defaultVariant.id);
    if (!gid) { toast.error("Unavailable for checkout"); return; }
    setCardLoading(true);
    try {
      await startNiftiPayCheckout([{ merchandiseId: gid, quantity: 1 }], []);
      setOfferOpen(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Card payment failed to start");
    } finally {
      setCardLoading(false);
    }
  };

  return (
    <div className="bg-white border border-border p-5 flex flex-col group hover:border-gold transition-colors">
      <Link
        to="/products/$slug"
        params={{ slug: p.slug }}
        className="aspect-square flex items-center justify-center mb-4 relative bg-white overflow-hidden"
      >
        <img src={p.img} alt={`${p.name} research peptide vial`} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 brightness-110" loading="lazy" />
      </Link>
      <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-gold transition-colors">
        <h3 className="font-display text-base font-semibold mb-2 leading-tight">{p.name}</h3>
      </Link>
      <div className="flex items-center gap-2 mb-1 flex-wrap">
        <span className="inline-block bg-gold/20 text-navy-deep text-[10px] font-bold px-2 py-1 w-fit">
          {hasMultiple ? `${p.variants.length} sizes` : defaultVariant.label}
        </span>
        <span className="text-sm font-bold text-navy-deep">
          {hasMultiple ? <><span className="text-[10px] font-normal text-muted-foreground mr-1">from</span>£{min}</> : <>£{defaultVariant.price}</>}
        </span>
      </div>
      <div className="text-xs text-muted-foreground mb-4">{p.purity}</div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          onClick={() => add(p.slug, defaultVariant.id)}
          className="border border-navy-deep text-navy-deep py-2.5 text-[10px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors"
        >
          ADD TO CART
        </button>
        <button
          onClick={buyNow}
          disabled={loading}
          className="bg-gold text-navy-deep py-2.5 text-[10px] font-bold tracking-widest hover:bg-gold-soft transition-colors disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "BUY NOW"}
        </button>
      </div>
      <BacWaterBuyNowDialog
        open={offerOpen}
        onOpenChange={setOfferOpen}
        onContinue={(bacVariantId) => void goToCheckout(bacVariantId)}
        onPayByCard={() => void payByCard()}
        loading={loading}
        cardLoading={cardLoading}
      />
    </div>
  );
}
