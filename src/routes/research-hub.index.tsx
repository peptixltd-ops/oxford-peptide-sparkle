import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ReadingPathway } from "@/components/knowledge/reading-pathway";
import { ResearchSidebar } from "@/components/knowledge/research-sidebar";
import { KnowledgeSearch } from "@/components/knowledge/knowledge-search";
import { ContinueReading } from "@/components/knowledge/continue-reading";
import { researchCategories } from "@/lib/taxonomy";
import { seo } from "@/lib/seo";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/research-hub/")({
  head: () =>
    seo({
      path: "/research-hub",
      title: "Research Hub — Oxford Research Peptides",
      description:
        "The Oxford Research Peptides educational hub — research guides, compound reference, mechanisms, laboratory methodology, literature, comparisons, glossary and FAQs.",
    }),
  component: ResearchHubIndex,
});

function ResearchHubIndex() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Research Hub" }]} />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH HUB</div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
              A Structured Knowledge Platform for Peptide Research
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">
              Categorised guides, compound monographs, mechanism references and laboratory
              methodology — built as scaffolding that Release 2 will populate with peer-reviewed
              scientific content.
            </p>
          </div>
        </section>

        {/* Search */}
        <section className="py-10 bg-bone">
          <div className="container-x max-w-3xl">
            <KnowledgeSearch />
          </div>
        </section>

        {/* Category grid + sidebar */}
        <section className="pb-10">
          <div className="container-x grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="min-w-0">
              <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">
                EXPLORE THE HUB
              </div>
              <h2 className="font-display text-3xl font-medium mb-8">Categories</h2>

              <ul className="grid sm:grid-cols-2 gap-4">
                {researchCategories.map((c) => (
                  <li key={c.id}>
                    <Link
                      to={c.path}
                      className="block h-full p-5 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold group"
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <c.icon className="w-6 h-6 text-gold" strokeWidth={1.4} aria-hidden="true" />
                          <div className="font-display text-lg font-semibold group-hover:text-gold transition-colors">
                            {c.label}
                          </div>
                        </div>
                        {!c.populated && (
                          <span className="text-[9px] font-bold tracking-widest text-muted-foreground border border-navy-deep/15 px-1.5 py-0.5">
                            SOON
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-navy-deep/70 leading-snug mb-4">
                        {c.description}
                      </p>
                      <div className="text-[10px] font-bold tracking-widest text-navy-deep inline-flex items-center gap-1 group-hover:text-gold transition-colors">
                        OPEN <ArrowRight className="w-3 h-3" aria-hidden="true" />
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-4">
              <ResearchSidebar activeCategoryId={undefined} />
            </div>
          </div>
        </section>

        {/* Reading pathway */}
        <section className="pb-10">
          <div className="container-x">
            <ReadingPathway />
          </div>
        </section>

        {/* Continue reading */}
        <section className="pb-16">
          <div className="container-x">
            <ContinueReading />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
