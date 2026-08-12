import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { products, getVariant } from "@/lib/products";
import { coaEntries } from "@/lib/coa";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/coas")({
  head: () =>
    seo({
      path: "/coas",
      title: "Certificates of Analysis (COAs) — Oxford Research Peptides",
      description:
        "Independent third-party analysis reports for every research peptide and strength we supply. Verify purity and identity directly with Janoshik Analytical.",
    }),
  component: CoaPage,
});

function CoaPage() {
  const rows = products
    .map(p => ({
      product: p,
      entries: coaEntries.filter(c => c.slug === p.slug),
    }))
    .filter(r => r.entries.length > 0);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "COAs" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">THIRD-PARTY TESTED</div>
            <h1 className="font-display text-5xl font-medium">Certificates of Analysis</h1>
            <p className="text-bone/70 mt-3 max-w-2xl">
              Independent analysis reports issued by Janoshik Analytical, listed by compound and
              strength as supplied. Each link opens the verifiable report hosted by the laboratory.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x space-y-8">
            {rows.map(({ product, entries }) => (
              <div key={product.slug} className="border border-navy-deep/15 bg-white">
                <div className="flex items-center justify-between gap-4 border-b border-navy-deep/10 px-5 py-4">
                  <h2 className="font-display text-2xl">{product.name}</h2>
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="text-[11px] font-bold tracking-[0.2em] text-navy-deep/70 hover:text-gold"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
                <ul className="divide-y divide-navy-deep/10">
                  {entries.map(c => (
                    <li key={c.batch} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                      <div>
                        <div className="font-medium">
                          {getVariant(product, c.variantId)?.label ?? c.variantId}
                          <span className="ml-2 text-xs font-semibold text-gold">{c.purity}</span>
                        </div>
                        <div className="text-xs text-navy-deep/60">
                          {c.lab} · {c.testType} · Batch {c.batch} · {c.date}
                        </div>
                      </div>
                      <a
                        href={c.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-navy-deep px-4 py-2 text-[11px] font-bold tracking-[0.2em] text-bone hover:bg-gold hover:text-navy-deep transition-colors"
                      >
                        VIEW COA
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="pb-16">
          <div className="container-x text-sm text-navy-deep/70 max-w-3xl">
            Reports are batch-specific. If you need the report matching the batch number printed on
            your vial label, email{" "}
            <a className="text-gold" href="mailto:info@oxfordresearchpeptides.com?subject=COA%20request">
              info@oxfordresearchpeptides.com
            </a>{" "}
            with your order and batch number. See our{" "}
            <Link to="/certificate-of-analysis" className="text-gold">COA policy</Link> and{" "}
            <Link to="/research-use-only" className="text-gold">Research Use Only</Link> notice.
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
