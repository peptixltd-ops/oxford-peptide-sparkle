import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import { FlaskConical } from "lucide-react";

export const Route = createFileRoute("/compounds")({
  head: () =>
    seo({
      path: "/compounds",
      title: "Compound Library — Oxford Research Peptides",
      description:
        "Structured scientific monographs for research peptides — identity, structure, mechanisms and references. Launching soon as part of the Oxford Research Peptides educational programme.",
      noindex: true,
    }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep flex flex-col">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Compound Library" }]} />
      <main id="main-content" className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-2xl text-center">
            <FlaskConical className="w-14 h-14 text-gold mx-auto mb-6" strokeWidth={1.2} aria-hidden="true" />
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">COMING SOON</div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Compound Library</h1>
            <p className="text-navy-deep/70 leading-relaxed mb-8">
              We're building a structured scientific reference for every peptide we handle — molecular identity,
              mechanisms of action, receptor pathways and literature. This section will launch in a future release
              as part of the Oxford Research Peptides educational programme.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/research-hub"
                className="px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors"
              >
                VISIT RESEARCH HUB
              </Link>
              <Link
                to="/shop"
                className="px-6 py-3 border border-navy-deep text-navy-deep text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors"
              >
                BROWSE SHOP
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
