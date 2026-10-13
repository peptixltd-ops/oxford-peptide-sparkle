import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { getProduct } from "@/lib/products";
import { BAC_WATER_UPSELL } from "@/lib/shopify";

/**
 * Shown when a shopper uses BUY NOW (which bypasses the cart, and therefore the
 * cart's bacteriostatic water upsell). Offers both vial sizes at the fixed
 * discount before handing off to Shopify checkout.
 */
export function BacWaterBuyNowDialog({
  open,
  onOpenChange,
  onContinue,
  loading = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** variantId of the chosen bac water vial, or null to skip. */
  onContinue: (bacVariantId: string | null) => void;
  loading?: boolean;
}) {
  const product = getProduct(BAC_WATER_UPSELL.slug);
  if (!product) return null;

  const fmt = (n: number) => `£${n.toFixed(2)}`;
  const discounted = (n: number) => Math.max(0, n - BAC_WATER_UPSELL.amountOff);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 gap-0 overflow-hidden border-gold/60">
        <div className="bg-navy-deep text-bone px-5 py-2.5">
          <span className="text-[10px] font-bold tracking-[0.2em]">
            ADD BACTERIOSTATIC WATER — £{BAC_WATER_UPSELL.amountOff} OFF
          </span>
        </div>

        <div className="p-5">
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="font-display text-xl font-semibold leading-tight">
              Do you need reconstitution diluent?
            </DialogTitle>
            <DialogDescription className="text-xs leading-snug">
              Sterile bacteriostatic water (0.9% benzyl alcohol) is required to reconstitute lyophilised
              peptides. Add a vial now for £{BAC_WATER_UPSELL.amountOff} off — the discount is applied
              automatically at checkout.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-5 grid gap-2">
            {product.variants.map(variant => (
              <div key={variant.id} className="flex items-stretch gap-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => onContinue(variant.id)}
                  className="flex-1 flex items-center justify-between gap-3 border border-border px-3 py-3 hover:border-gold hover:bg-muted/40 transition-colors text-left disabled:opacity-60"
                >
                  <span className="text-sm font-semibold">{variant.label} bacteriostatic water</span>
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground line-through">{fmt(variant.price)}</span>
                    <span className="text-sm font-bold text-gold">{fmt(discounted(variant.price))}</span>
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled={loading}
            onClick={() => onContinue(null)}
            className="mt-4 w-full bg-navy-deep text-bone py-3.5 text-xs font-bold tracking-widest hover:bg-navy-deep/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : "NO THANKS — CONTINUE TO CHECKOUT"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
