import type { Metadata } from "next";
import { listProducts } from "@/lib/medusa";
import { ProductTile } from "@/components/product-tile";
import { ShopTracker } from "./tracker";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Shop research peptides", description: "UK research peptides with batch-traceable certificates of analysis. For in-vitro laboratory research only.", alternates: { canonical: "/shop" } };

export default async function ShopPage() {
  const products = await listProducts();
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem" }}>
      <ShopTracker ids={products.map((product) => product.handle)} />
      <p className="gold-text" style={{ letterSpacing: "0.22em", fontSize: 12, fontWeight: 700 }}>THE CATALOGUE</p>
      <h1 style={{ fontSize: 56, marginTop: 0 }}>Shop</h1>
      <p style={{ color: "var(--muted)", maxWidth: 640 }}>Oxford Research Peptides only. Strengths are variants of a single compound. Research use only — not for human or animal consumption.</p>
      <div className="shop-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {products.map((product) => <ProductTile key={product.id} product={product} />)}
      </div>
    </main>
  );
}
