import Link from "next/link";
import { formatGbp } from "@orp/ui";
import { AddButton } from "@/components/site-chrome";
import type { StoreProduct } from "@/lib/medusa";

export function ProductTile({ product }: { product: StoreProduct }) {
  const variant = product.variants?.[0];
  const amount = variant?.prices?.find((price) => price.currency_code === "gbp")?.amount ?? variant?.calculated_price?.calculated_amount ?? 0;
  const prices = (product.variants || []).map((item) => item.prices?.find((price) => price.currency_code === "gbp")?.amount ?? item.calculated_price?.calculated_amount ?? amount);
  const from = prices.length ? Math.min(...prices) : 0;
  return (
    <article className="card" style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 16, padding: 16 }}>
      <Link href={`/products/${product.handle}`}><img src={product.thumbnail || `/products/${product.handle}.webp`} alt="" width={140} height={180} style={{ objectFit: "contain", background: "#f7f4ee", width: "100%", height: 180 }} /></Link>
      <div>
        <div className="gold-text" style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 700 }}>{String(product.metadata?.purity || ">99% PURITY").toUpperCase()}</div>
        <h3 style={{ fontSize: 32, margin: "0.2rem 0" }}><Link href={`/products/${product.handle}`}>{product.title}</Link></h3>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>{product.description}</p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
          <strong>From {formatGbp(Number.isFinite(from) ? from : 0)}</strong>
          {variant && <AddButton variantId={variant.id} />}
        </div>
      </div>
    </article>
  );
}
