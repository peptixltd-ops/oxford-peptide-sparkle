import type { Metadata } from "next";
import Link from "next/link";
import { listProducts, medusa } from "@/lib/medusa";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Certificates of analysis", description: "Batch certificates for Oxford Research Peptides material currently documented for UK stock.", alternates: { canonical: "/coas" } };

export default async function CoasPage() {
  const products = await listProducts();
  const groups = await Promise.all(products.map(async (product) => {
    const data = await medusa<{ batches: Array<{ batch_number: string; tests?: Array<{ purity: string; lab: string; test_date: string; document_url: string }> }> }>(`/store/coa?handle=${product.handle}`).catch(() => ({ batches: [] }));
    return { product, batches: data.batches || [] };
  }));
  return (
    <main id="main-content" className="container-x" style={{ padding: "2.5rem 0 4rem" }}>
      <h1 style={{ fontSize: 52 }}>Certificates of analysis</h1>
      <p>Each record is a product, then a batch, then the analytical test. Documents are hosted with the storefront or linked to the issuing laboratory verification page.</p>
      {groups.filter((group) => group.batches.length).map((group) => (
        <section key={group.product.id}>
          <h2><Link href={`/products/${group.product.handle}`}>{group.product.title}</Link></h2>
          <ul>
            {group.batches.map((batch) => (
              <li key={batch.batch_number}>
                {batch.batch_number}
                {(batch.tests || []).map((test) => <div key={test.document_url}>{test.purity} · {test.lab} · {test.test_date} · <a href={test.document_url}>Document</a></div>)}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
