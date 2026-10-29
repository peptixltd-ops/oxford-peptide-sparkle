"use client";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { BAC_WATER_UPSELL } from "@/lib/shopify";

export function BacWaterUpsell({ compact = false }: { compact?: boolean }) {
  const { items, add } = useCart();
  const product = getProduct(BAC_WATER_UPSELL.slug);

  const alreadyInCart = items.some(i => i.slug === BAC_WATER_UPSELL.slug);
  if (!product || alreadyInCart || items.length === 0) return null;

  const fmt = (n: number) => `£${n.toFixed(2)}`;
  const discounted = (n: number) => Math.max(0, n - BAC_WATER_UPSELL.amountOff);

  return (
    <div className="bg-white border border-gold/50">
      <div className="flex items-center justify-between gap-3 bg-navy-deep text-bone px-4 py-2">
        <span className="text-[10px] font-bold tracking-[0.2em]">
          ADD BACTERIOSTATIC WATER — £{BAC_WATER_UPSELL.amountOff} OFF
        </span>
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-muted/40 flex items-center justify-center shrink-0">
            <img src={product.img} width={666} height={999} decoding="async" loading="lazy" alt={product.name} className="max-h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-tight">Reconstitution diluent</p>
            <p className="text-xs text-muted-foreground leading-snug">
              Sterile bacteriostatic water (0.9% benzyl alcohol) — required to reconstitute lyophilised
              peptides. Add bacteriostatic water for £{BAC_WATER_UPSELL.amountOff} less when bought with your order, applied automatically at checkout.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {product.variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => {
                add(product.slug, variant.id, 1);
                toast.success(`${variant.label} bacteriostatic water added — £${BAC_WATER_UPSELL.amountOff} off applied`);
              }}
              className="flex items-center justify-between gap-3 border border-border px-3 py-2.5 hover:border-gold hover:bg-muted/40 transition-colors text-left"
            >
              <span className="text-sm font-semibold">{variant.label}</span>
              <span className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground line-through">{fmt(variant.price)}</span>
                <span className="text-sm font-bold text-gold">{fmt(discounted(variant.price))}</span>
                <Plus className="w-3.5 h-3.5" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
