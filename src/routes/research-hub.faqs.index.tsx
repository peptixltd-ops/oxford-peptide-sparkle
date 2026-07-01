import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ResearchSidebar } from "@/components/knowledge/research-sidebar";
import { seo } from "@/lib/seo";
import { getCategory } from "@/lib/taxonomy";

const category = getCategory("faqs")!;

/**
 * /research-hub/faqs — canonical URL for the FAQ category inside the hub.
 * The long-form FAQ content lives at /faqs and is linked from here so the
 * hub URL structure stays complete without duplicating content.
 */
export const Route = createFileRoute("/research-hub/faqs/")({
  head: () =>
    seo({
      path: category.path,
      title: `${category.label} — Oxford Research Peptides`,
      description: category.description,
    }),
  component: FaqsCategory,
});

function FaqsCategory() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          { label: category.short },
        ]}
      />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              {category.eyebrow}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
              {category.label}
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">{category.description}</p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-x">
            <KnowledgeNav currentCategoryId={category.id} />
          </div>
        </section>

        <section className="pb-14">
          <div className="container-x grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="min-w-0 space-y-8">
              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">PURPOSE</div>
                <p className="text-navy-deep/85 leading-relaxed">{category.purpose}</p>
              </div>

              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
                  FULL FAQ INDEX
                </div>
                <p className="text-sm text-navy-deep/80 mb-4">
                  Structured operational, quality and compliance questions with FAQPage schema.
                </p>
                <Link
                  to="/faqs"
                  className="inline-block px-5 py-3 bg-navy-deep text-bone text-[11px] font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  OPEN FAQS
                </Link>
              </div>
            </div>

            <div className="lg:pl-4">
              <ResearchSidebar activeCategoryId="faqs" scopeCategoryId="faqs" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
