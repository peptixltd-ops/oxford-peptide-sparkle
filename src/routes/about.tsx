import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      path: "/about",
      title: "About Oxford Research Peptides — UK Reference-Grade Research Peptide Supplier",
      description:
        "Oxford Research Peptides is a UK manufacturer of reference-grade research peptides for in-vitro laboratory research. Owned and operated by Oxford Research Syndicate Ltd.",
    }),
  component: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "About" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">ABOUT US</div>
            <h1 className="font-display text-5xl font-medium">A UK Manufacturer Built for Research</h1>
          </div>
        </section>
        <section className="py-14">
          <div className="container-x max-w-3xl space-y-6 text-base leading-relaxed text-navy-deep/80">
            <p>Oxford Research Peptides supplies reference-grade lyophilised peptides to laboratories, universities and research institutions across the UK and internationally. All material is intended strictly for in-vitro laboratory research.</p>
            <p>We combine modern solid-phase peptide synthesis with independent third-party testing to produce material researchers can document and trust. Every batch ships with a certificate of analysis showing HPLC purity and identity confirmation.</p>
            <p>This brand is owned and operated by <strong>Oxford Research Syndicate Ltd</strong>, a company registered in England &amp; Wales (Company Registration Number 17207898).</p>
            <h2 className="font-display text-3xl font-medium pt-6">Contact</h2>
            <p>Email: <a href="mailto:oxfordresearchpeptides@gmail.com" className="text-gold underline">oxfordresearchpeptides@gmail.com</a></p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  ),
});
