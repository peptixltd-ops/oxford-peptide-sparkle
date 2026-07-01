import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, type Crumb } from "@/components/breadcrumbs";
import { KnowledgeNav } from "@/components/knowledge/knowledge-nav";
import { ContinueReading } from "@/components/knowledge/continue-reading";
import type { ResearchCategoryId } from "@/lib/taxonomy";
import { getCategory } from "@/lib/taxonomy";

/**
 * Generic scaffold page rendered when a category leaf slug is visited before
 * the taxonomy has populated content for it. Uses the same header, breadcrumbs
 * and knowledge navigation as populated pages so the URL structure is stable.
 */
export function PlaceholderKnowledgePage({
  categoryId,
  slug,
  extraCrumbs = [],
  children,
}: {
  categoryId: ResearchCategoryId;
  slug: string;
  extraCrumbs?: Crumb[];
  children?: ReactNode;
}) {
  const category = getCategory(categoryId);
  const label = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          ...(category ? [{ label: category.short, to: category.path }] : []),
          ...extraCrumbs,
          { label },
        ]}
      />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-3xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              {category?.eyebrow ?? "RESEARCH HUB"}
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">{label}</h1>
            <p className="text-bone/70 mt-4 max-w-2xl">
              This entry is scaffolded and awaiting scientific content. The URL, layout, breadcrumbs
              and cross-links are stable — Release 2 will populate the article body.
            </p>
          </div>
        </section>

        {category && (
          <section className="py-10">
            <div className="container-x">
              <KnowledgeNav currentCategoryId={category.id} />
            </div>
          </section>
        )}

        <section className="pb-10">
          <div className="container-x max-w-3xl space-y-6">
            <div className="bg-white border border-navy-deep/10 p-6 md:p-8">
              <div className="text-[10px] font-bold tracking-widest text-gold mb-3">STATUS</div>
              <p className="text-sm text-navy-deep/80">
                Placeholder page. Not indexed by search engines until populated.
              </p>
            </div>
            {children}
            {category && (
              <div className="flex flex-wrap gap-3">
                <Link
                  to={category.path}
                  className="px-5 py-3 bg-navy-deep text-bone text-[11px] font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  ← BACK TO {category.short.toUpperCase()}
                </Link>
                <Link
                  to="/research-hub"
                  className="px-5 py-3 border border-navy-deep text-navy-deep text-[11px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  RESEARCH HUB
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="pb-16">
          <div className="container-x">
            <ContinueReading categoryId={categoryId} />
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
