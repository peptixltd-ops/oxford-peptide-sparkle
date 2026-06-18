import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProduct } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ClipboardCheck, FlaskConical, Truck, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} ${loaderData.product.dose} — Oxford Research Peptides` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.name} — Oxford Research Peptides` },
          { property: "og:description", content: loaderData.product.description },
          { property: "og:image", content: loaderData.product.img },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-bone">
      <SiteHeader />
      <div className="container-x py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Product not found</h1>
        <Link to="/shop" className="text-gold underline">Back to shop</Link>
      </div>
      <SiteFooter />
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <section className="py-12">
        <div className="container-x">
          <nav className="text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-gold">Home</Link> /{" "}
            <Link to="/shop" className="hover:text-gold">Shop</Link> /{" "}
            <span className="text-navy-deep">{product.name}</span>
          </nav>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-white border border-border aspect-square flex items-center justify-center p-10">
              <img src={product.img} alt={product.name} className="max-h-full w-auto object-contain" />
            </div>
            <div>
              <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PEPTIDE</div>
              <h1 className="font-display text-5xl font-medium mb-4">{product.name}</h1>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-gold/20 text-navy-deep text-xs font-bold px-3 py-1.5">{product.dose}</span>
                <span className="text-sm text-muted-foreground">{product.purity}</span>
              </div>
              <div className="text-4xl font-display font-medium mb-6">£{product.price}.00</div>
              <p className="text-base text-navy-deep/75 leading-relaxed mb-8">{product.description}</p>

              <div className="flex items-center gap-4 mb-6">
                <label className="text-[11px] font-bold tracking-widest">QTY</label>
                <div className="flex items-center border border-border">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted">−</button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-muted">+</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  onClick={() => add(product.slug, qty)}
                  className="border border-navy-deep text-navy-deep py-4 text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => { add(product.slug, qty); navigate({ to: "/cart" }); }}
                  className="bg-gold text-navy-deep py-4 text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors"
                >
                  BUY NOW
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-border">
                {[
                  { icon: FlaskConical, l: "Third-Party Tested" },
                  { icon: ClipboardCheck, l: "COA Included" },
                  { icon: Truck, l: "Same-Day UK Dispatch" },
                  { icon: ShieldCheck, l: "Research Use Only" },
                ].map(f => (
                  <div key={f.l} className="flex items-center gap-2 text-xs">
                    <f.icon className="w-4 h-4 text-gold" />{f.l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
