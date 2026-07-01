import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import { Microscope } from "lucide-react";

export const Route = createFileRoute("/methodology")({
  head: () =>
    seo({
      path: "/methodology",
      title: "Laboratory Methodology — Oxford Research Peptides",
      description:
        "Laboratory methodology guides — reconstitution, storage, HPLC purity, mass spectrometry and handling of research peptides. Coming soon.",
      noindex: true,
    }),
  component: ComingSoon,
});

function ComingSoon() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep flex flex-col">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Methodology" }]} />
      <main id="main-content" className="flex-1">
        <section className="py-20">
          <div className="container-x max-w-2xl text-center">
            <Microscope className="w-14 h-14 text-gold mx-auto mb-6" strokeWidth={1.2} aria-hidden="true" />
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">COMING SOON</div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">Laboratory Methodology</h1>
            <p className="text-navy-deep/70 leading-relaxed mb-8">
              A dedicated hub for laboratory methodology — reconstitution, storage, HPLC purity, mass spectrometry,
              and handling procedures. This section is part of our roadmap to become the UK's most trusted
              educational resource for peptide research.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/research-hub"
                className="px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors"
              >
                VISIT RESEARCH HUB
              </Link>
              <Link
                to="/lab-testing"
                className="px-6 py-3 border border-navy-deep text-navy-deep text-xs font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors"
              >
                LAB TESTING
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
