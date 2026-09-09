import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ReadingPathway } from "@/components/knowledge/reading-pathway";
import { ResearchSidebar } from "@/components/knowledge/research-sidebar";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import {
  compoundFamilies,
  getCategory,
} from "@/lib/taxonomy";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/compounds/")({
  head: () => {
    const category = getCategory("compounds")!;
    return seo({
      path: category.path,
      title: `${category.label} — Oxford Research Peptides`,
      description: category.description,
      noindex: !category.populated,
    });
  },
  component: CompoundsIndex,
});


function CompoundsIndex() {
  const category = getCategory("compounds")!;
  return (

    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Compound Reference" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">{category.eyebrow}</div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">{category.label}</h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">{category.description}</p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-x">
            <KnowledgeNav currentCategoryId="compounds" />
          </div>
        </section>

        <section className="pb-10">
          <div className="container-x grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="min-w-0 space-y-8">
              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">PURPOSE</div>
                <p className="text-navy-deep/85 leading-relaxed">{category.purpose}</p>
              </div>

              {/* Families */}
              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
                  COMPOUND FAMILIES
                </div>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {compoundFamilies.map((f) => (
                    <li
                      key={f.id}
                      className="p-4 border border-navy-deep/10 bg-bone/40"
                    >
                      <div className="font-display text-sm font-semibold text-navy-deep">
                        {f.label}
                      </div>
                      <p className="text-xs text-muted-foreground leading-snug mt-1">
                        {f.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Template preview link */}
              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
                  MONOGRAPH TEMPLATE
                </div>
                <p className="text-sm text-navy-deep/80 mb-4 leading-relaxed">
                  A reusable template is in place for every future compound monograph. Preview
                  the empty structural template below to see what each populated page will look
                  like.
                </p>
                <Link
                  to="/compounds/$slug"
                  params={{ slug: "template" }}
                  className="inline-block px-5 py-3 bg-navy-deep text-bone text-[11px] font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  VIEW MONOGRAPH TEMPLATE
                </Link>
              </div>

              <RelatedCompounds
                heading="All compounds"
                emptyLabel="Compound monographs are populated in Release 2."
              />

              <ReadingPathway activeKind="compound" />
            </div>

            <div className="lg:pl-4">
              <ResearchSidebar activeCategoryId="compounds" scopeCategoryId="compounds" />
            </div>
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
