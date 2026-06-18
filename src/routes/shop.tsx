import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop Research Peptides — Oxford Research Peptides" },
      { name: "description", content: "Browse our full catalogue of UK manufactured research peptides. >99% purity, third-party tested." },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <section className="bg-navy-deep text-bone py-14">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">SHOP PEPTIDES</div>
          <h1 className="font-display text-5xl font-medium">All Research Peptides</h1>
          <p className="text-bone/70 mt-3 max-w-xl">Reference-grade lyophilised peptides for in-vitro laboratory research. Every batch independently verified.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-x grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map(p => <ProductCard key={p.slug} p={p} />)}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
