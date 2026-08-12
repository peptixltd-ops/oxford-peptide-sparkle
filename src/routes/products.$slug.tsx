import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getProduct, type Variant } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { createCheckout, getVariantGid } from "@/lib/shopify";
import { seo, SITE_URL } from "@/lib/seo";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ClipboardCheck, FlaskConical, Truck, ShieldCheck, Loader2 } from "lucide-react";
import { trackViewItem, trackBeginCheckout } from "@/lib/tracking";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [] };
    const { product } = loaderData;
    const base = seo({
      path: `/products/${params.slug}`,
      title: `${product.name} — Oxford Research Peptides`,
      description: product.description,
      ogType: "product",
    });
    const productJsonLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.name,
      description: product.description,
      sku: product.slug,
      brand: { "@type": "Brand", name: "Oxford Research Peptides" },
      manufacturer: { "@id": `${SITE_URL}#organization` },
      category: "Research Peptide (In-Vitro Laboratory Use Only)",
      offers: product.variants.map((v: Variant) => ({
        "@type": "Offer",
        url: `${SITE_URL}/products/${product.slug}`,
        priceCurrency: "GBP",
        price: v.price.toFixed(2),
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
        name: v.label,
        sku: `${product.slug}-${v.id}`,
      })),
    };
    return {
      ...base,
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(productJsonLd) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-bone">
      <SiteHeader />
      <main id="main-content" className="container-x py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Product not found</h1>
        <Link to="/shop" className="text-gold underline">Back to shop</Link>
      </main>
      <SiteFooter />
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [loading, setLoading] = useState(false);
  const variant = product.variants.find((v: Variant) => v.id === variantId) ?? product.variants[0];
  const fmt = (n: number) => `£${n.toFixed(2)}`;

  useEffect(() => {
    trackViewItem(product, variant);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product.slug, variant.id]);

  const buyNow = async () => {
    trackBeginCheckout([{ product, variant, quantity: qty }]);
    const gid = getVariantGid(product.slug, variant.id);
    if (!gid) { toast.error("Unavailable for checkout"); return; }
    setLoading(true);
    try {
      const url = await createCheckout([{ merchandiseId: gid, quantity: qty }]);
      window.open(url, "_blank");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Shop", to: "/shop" }, { label: product.name }]} />
      <main id="main-content">
        <section className="w-full py-6 sm:py-8">
          <div className="container-x min-w-0">
            <div className="grid min-w-0 grid-cols-1 gap-7 lg:grid-cols-2 lg:gap-12">
              <div className="flex aspect-square w-full min-w-0 items-center justify-center overflow-hidden border border-border bg-white p-4 sm:p-10">
                <img src={product.img} alt={`${product.name} research peptide vial`} className="max-h-full max-w-full w-auto object-contain" />
              </div>
              <div className="w-full min-w-0 overflow-hidden">
                <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PEPTIDE</div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium mb-4 break-words">{product.name}</h1>
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="bg-gold/20 text-navy-deep text-xs font-bold px-3 py-1.5">{variant.label}</span>
                  <span className="text-sm text-muted-foreground">{product.purity}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-display font-medium mb-6">{fmt(variant.price)}</div>
                <p className="text-base text-navy-deep/75 leading-relaxed mb-8">{product.description}</p>

                <div className="mb-6">
                  <label className="block text-[11px] font-bold tracking-widest mb-3">SIZE / VARIANT</label>
                  <div className="grid min-w-0 grid-cols-2 gap-2 sm:flex sm:flex-wrap">
                    {product.variants.map((v: Variant) => {
                      const active = v.id === variantId;
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setVariantId(v.id)}
                          className={`min-w-0 px-2 py-2.5 text-sm font-semibold border transition-colors sm:px-4 focus-visible:outline-2 focus-visible:outline-gold ${
                            active
                              ? "border-navy-deep bg-navy-deep text-bone"
                              : "border-border bg-white text-navy-deep hover:border-navy-deep"
                          }`}
                        >
                          {v.label}
                          <span className={`ml-2 text-xs font-normal ${active ? "text-bone/70" : "text-muted-foreground"}`}>
                            {fmt(v.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-[auto_auto] items-center justify-start gap-x-3 gap-y-2 mb-6 sm:flex sm:gap-4">
                  <label className="text-[11px] font-bold tracking-widest" htmlFor="qty">QTY</label>
                  <div className="flex items-center border border-border">
                    <button type="button" aria-label="Decrease quantity" onClick={() => setQty(q => Math.max(1, q - 1))} className="px-3 py-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-gold">−</button>
                    <span id="qty" className="px-4 py-2 min-w-[3rem] text-center" aria-live="polite">{qty}</span>
                    <button type="button" aria-label="Increase quantity" onClick={() => setQty(q => q + 1)} className="px-3 py-2 hover:bg-muted focus-visible:outline-2 focus-visible:outline-gold">+</button>
                  </div>
                  <span className="col-span-2 text-sm text-muted-foreground sm:col-span-1">Total: <span className="font-semibold text-navy-deep">{fmt(variant.price * qty)}</span></span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-8">
                  <button
                    type="button"
                    onClick={() => add(product.slug, variant.id, qty)}
                    className="border border-navy-deep text-navy-deep py-4 text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    ADD TO CART
                  </button>
                  <button
                    type="button"
                    onClick={buyNow}
                    disabled={loading}
                    className="bg-gold text-navy-deep py-4 text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors disabled:opacity-60 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-navy-deep"
                  >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" /> : "BUY NOW"}
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
                      <f.icon className="w-4 h-4 text-gold" aria-hidden="true" />{f.l}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <ProductTechnicalData p={product} variant={variant} />
      </main>

      <SiteFooter />
    </div>
  );
}
