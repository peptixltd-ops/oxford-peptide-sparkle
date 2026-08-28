import { useEffect, useState } from "react";
import { Plus, Clock } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { getProduct } from "@/lib/products";
import { BAC_WATER_UPSELL } from "@/lib/shopify";

const KEY = "orp_bacwater_offer_start";

/** Shared countdown so the offer window is consistent across cart + drawer. */
function useOfferCountdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    let start = Number(window.localStorage.getItem(KEY));
    if (!start || Number.isNaN(start)) {
      start = Date.now();
      window.localStorage.setItem(KEY, String(start));
    }
    const end = start + BAC_WATER_UPSELL.minutes * 60_000;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return left;
}

const fmtTime = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

export function BacWaterUpsell({ compact = false }: { compact?: boolean }) {
  const { items, add } = useCart();
  const left = useOfferCountdown();
  const product = getProduct(BAC_WATER_UPSELL.slug);

  const alreadyInCart = items.some(i => i.slug === BAC_WATER_UPSELL.slug);
  if (!product || alreadyInCart || items.length === 0) return null;
  if (left !== null && left <= 0) return null;

  const fmt = (n: number) => `£${n.toFixed(2)}`;
  const discounted = (n: number) => n * (1 - BAC_WATER_UPSELL.percent / 100);

  return (
    <div className="bg-white border border-gold/50">
      <div className="flex items-center justify-between gap-3 bg-navy-deep text-bone px-4 py-2">
        <span className="text-[10px] font-bold tracking-[0.2em]">
          ADD BACTERIOSTATIC WATER — {BAC_WATER_UPSELL.percent}% OFF
        </span>
        {left !== null && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gold tabular-nums">
            <Clock className="w-3 h-3" /> {fmtTime(left)}
          </span>
        )}
      </div>

      <div className={compact ? "p-4" : "p-5"}>
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-muted/40 flex items-center justify-center shrink-0">
            <img src={product.img} alt={product.name} className="max-h-full object-contain" />
          </div>
          <div className="min-w-0">
            <p className="font-display text-base font-semibold leading-tight">Reconstitution diluent</p>
            <p className="text-xs text-muted-foreground leading-snug">
              Sterile bacteriostatic water (0.9% benzyl alcohol) — required to reconstitute lyophilised
              peptides. Limited-time {BAC_WATER_UPSELL.percent}% off, applied automatically at checkout.
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {product.variants.map(variant => (
            <button
              key={variant.id}
              onClick={() => {
                add(product.slug, variant.id, 1);
                toast.success(`${variant.label} bacteriostatic water added — ${BAC_WATER_UPSELL.percent}% off applied`);
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
