import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, medusa, variantAmount } from "@/lib/medusa";
import { formatGbp } from "@orp/ui";
import { AddButton } from "@/components/site-chrome";
import { ProductTracker } from "./tracker";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product" };
  return {
    title: product.title,
    description: product.description || undefined,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: { images: [product.thumbnail || "/og-image.jpg"], type: "website" },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();
  const batches = await medusa<{ batches: Array<{ batch_number: string; status: string; tests?: Array<{ purity: string; lab: string; test_date: string; document_url: string }> }> }>(`/store/coa?handle=${product.handle}`).catch(() => ({ batches: [] }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    sku: product.variants?.[0]?.sku,
    brand: { "@type": "Brand", name: "Oxford Research Peptides" },
    image: product.thumbnail,
    offers: (product.variants || []).map((variant) => ({
      "@type": "Offer",
      sku: variant.sku,
      priceCurrency: "GBP",
      price: variantAmount(variant),
      availability: "https://schema.org/InStock",
    })),
  };
  return (
    <main id="main-content" className="container-x" style={{ padding: "2rem 0 4rem" }}>
      <ProductTracker handle={product.handle} title={product.title} price={product.variants?.[0] ? variantAmount(product.variants[0]) : 0} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <img src={product.thumbnail || `/products/${product.handle}.webp`} alt={`${product.title} research vial`} width={640} height={800} style={{ background: "#f7f4ee", width: "100%" }} />
        <div>
          <div className="gold-text" style={{ letterSpacing: "0.18em", fontSize: 12, fontWeight: 700 }}>{String(product.metadata?.purity || "")}</div>
          <h1 style={{ fontSize: 56, margin: "0.2rem 0" }}>{product.title}</h1>
          <p>{product.description}</p>
          <p style={{ fontSize: 14 }}>Orders placed before 2pm (UK time) on a working day are dispatched the same day. UK Express £3.99 or Standard £5.99, free from £12. International £15. Norway is excluded.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {(product.variants || []).map((variant) => (
              <div key={variant.id} className="card" style={{ padding: 12, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <strong>{variant.title}</strong>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{variant.sku}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <strong>{formatGbp(variantAmount(variant))}</strong>
                  <AddButton variantId={variant.id} />
                </div>
              </div>
            ))}
          </div>
          <h2>Certificates of analysis</h2>
          {!batches.batches?.length && <p>Batch certificates for this compound are published as they are released.</p>}
          <ul>
            {(batches.batches || []).map((batch) => (
              <li key={batch.batch_number}>
                <strong>{batch.batch_number}</strong> · {batch.status}
                {(batch.tests || []).map((test) => (
                  <div key={test.document_url}>{test.purity} · {test.lab} · {test.test_date} · <a href={test.document_url}>View document</a></div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
