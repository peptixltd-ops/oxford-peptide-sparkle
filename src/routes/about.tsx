import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Oxford Research Peptides" },
      { name: "description", content: "Oxford Research Peptides is a UK manufacturer of reference-grade research peptides for in-vitro laboratory research." },
    ],
  }),
  component: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
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
          <h2 className="font-display text-3xl font-medium pt-6">Contact</h2>
          <p>Email: <a href="mailto:oxfordresearchpeptides@gmail.com" className="text-gold underline">oxfordresearchpeptides@gmail.com</a></p>
        </div>
      </section>
      <SiteFooter />
    </div>
  ),
});
