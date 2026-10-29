"use client";
import { createFileRoute } from "@/shims/router";
import { useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/search")({
  head: () =>
    seo({
      path: "/search",
      title: "Search — Oxford Research Peptides",
      description: "Search the Oxford Research Peptides catalogue for reference-grade research peptides.",
      noindex: true,
    }),
  component: SearchPage,
});

function SearchPage() {
  const q = useSearchParams().get("q") ?? "";
  const query = q.trim().toLowerCase();
  const results = query
    ? products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.slug.includes(query) ||
        p.description.toLowerCase().includes(query)
      )
    : [];

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Search" }]} />
      <main id="main-content">
        <section className="py-12">
          <div className="container-x">
            <h1 className="font-display text-4xl font-medium mb-2">Search</h1>
            {query
              ? <p className="text-muted-foreground mb-8">{results.length} result{results.length === 1 ? "" : "s"} for "<span className="text-navy-deep font-semibold">{q}</span>"</p>
              : <p className="text-muted-foreground mb-8">Use the search bar above to find peptides.</p>}

            {results.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {results.map(p => <ProductCard key={p.slug} p={p} />)}
              </div>
            )}
            {query && results.length === 0 && (
              <div className="bg-white border border-border p-12 text-center text-muted-foreground">
                No matching products. Try a different keyword.
              </div>
            )}
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
