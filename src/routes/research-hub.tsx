import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleCard } from "@/components/article-card";
import { seo } from "@/lib/seo";
import artMolecule from "@/assets/article-molecule.jpg";
import artReconstitute from "@/assets/article-reconstitute.jpg";
import artVials from "@/assets/article-vials.jpg";
import artBook from "@/assets/article-book.jpg";
import artNetwork from "@/assets/article-network.jpg";

const articles = [
  { img: artMolecule, date: "May 1, 2024", title: "Structural Notes on Retatrutide: A Triple Agonist Peptide", excerpt: "An overview of the structural features that distinguish retatrutide from related GLP-1/GIP/glucagon ligands." },
  { img: artReconstitute, date: "April 28, 2024", title: "Reconstituting Lyophilised Peptides: A Laboratory Guide", excerpt: "Best-practice handling notes for reconstituting lyophilised peptide reference standards." },
  { img: artNetwork, date: "May 1, 2024", title: "Comparative Sequence Analysis: Retatrutide vs Tirzepatide", excerpt: "A side-by-side sequence and modification comparison for two widely studied multi-agonists." },
  { img: artVials, date: "April 25, 2024", title: "Bacteriostatic Water: Composition and Laboratory Use", excerpt: "What's in bacteriostatic water and how it differs from sterile water for in-vitro applications." },
  { img: artBook, date: "April 20, 2024", title: "A Researcher's Primer to Peptide Handling and Storage", excerpt: "Storage temperatures, light exposure, freeze-thaw cycles, and other handling considerations." },
];

export const Route = createFileRoute("/research-hub")({
  head: () =>
    seo({
      path: "/research-hub",
      title: "Research Hub — Oxford Research Peptides",
      description:
        "Laboratory guides, peptide chemistry notes and reference articles from Oxford Research Peptides. Written for researchers working with peptide standards in vitro.",
    }),
  component: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Research Hub" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH HUB</div>
            <h1 className="font-display text-5xl font-medium">Research Articles &amp; Guides</h1>
            <p className="text-bone/70 mt-3 max-w-2xl">Reference material, lab handling guides and structural notes — written for researchers working with peptide standards in vitro.</p>
          </div>
        </section>
        <section className="py-14">
          <div className="container-x grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(a => (
              <ArticleCard key={a.title} article={a} variant="full" />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  ),
});
