import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { KnowledgeNav } from "./knowledge-nav";
import { ReadingPathway } from "./reading-pathway";
import { ResearchSidebar } from "./research-sidebar";
import { RelatedGuides } from "./related-guides";
import { getCategory, type ResearchCategoryId } from "@/lib/taxonomy";

/**
 * Reusable landing template for every Research Hub category.
 *
 * Consumes the central taxonomy — the ONLY per-category prop is `categoryId`.
 * Optional extra content (e.g. custom listings) can be slotted via `children`.
 */
export function CategoryLanding({
  categoryId,
  extraCrumbs = [],
  children,
}: {
  categoryId: ResearchCategoryId;
  /** Additional crumbs BETWEEN the Research Hub root and this category. */
  extraCrumbs?: Crumb[];
  children?: ReactNode;
}) {
  const category = getCategory(categoryId);
  if (!category) {
    return (
      <div className="min-h-screen bg-bone text-navy-deep">
        <SiteHeader />
        <main id="main-content" className="container-x py-24 text-center">
          <h1 className="font-display text-4xl mb-4">Category not found</h1>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          ...extraCrumbs,
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

        <section className="py-10">
          <div className="container-x grid lg:grid-cols-[1fr_320px] gap-10">
            <div className="min-w-0 space-y-8">
              <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">PURPOSE</div>
                <p className="text-navy-deep/85 leading-relaxed">{category.purpose}</p>
              </div>

              <RelatedGuides
                categoryId={category.id}
                heading={`${category.short} — articles`}
                emptyLabel={`Articles in ${category.label} are populated in Release 2.`}
              />

              {children}

              <ReadingPathway activeKind={pathwayKindFor(category.id)} />
            </div>

            <div className="lg:pl-4">
              <ResearchSidebar
                activeCategoryId={category.id}
                scopeCategoryId={category.id}
              />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function pathwayKindFor(id: ResearchCategoryId) {
  switch (id) {
    case "mechanisms":
      return "mechanism" as const;
    case "compounds":
      return "compound" as const;
    case "methodology":
      return "method" as const;
    case "comparisons":
      return "comparison" as const;
    case "literature":
    case "glossary":
    case "faqs":
      return "reading" as const;
    default:
      return "start" as const;
  }
}
