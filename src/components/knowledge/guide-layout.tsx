import type { ReactNode } from "react";
import { ResearchSidebar } from "./research-sidebar";
import type { ResearchCategoryId } from "@/lib/taxonomy";

/**
 * Structural template for a single research GUIDE page.
 *
 * All content is passed in via slots. Nothing here contains dummy prose.
 * Release 2 populates guides by rendering this layout with real props.
 */
export interface GuideLayoutProps {
  categoryId?: ResearchCategoryId;
  hero?: ReactNode;
  quickSummary?: ReactNode;
  tableOfContents?: ReactNode;
  mainContent?: ReactNode;
  figures?: ReactNode;
  evidenceSummary?: ReactNode;
  references?: ReactNode;
  relatedGuides?: ReactNode;
  relatedCompounds?: ReactNode;
  author?: ReactNode;
  reviewer?: ReactNode;
  lastUpdated?: string;
  sidebar?: ReactNode;
}

export function GuideLayout(props: GuideLayoutProps) {
  const {
    categoryId,
    hero,
    quickSummary,
    tableOfContents,
    mainContent,
    figures,
    evidenceSummary,
    references,
    relatedGuides,
    relatedCompounds,
    author,
    reviewer,
    lastUpdated,
    sidebar,
  } = props;

  return (
    <div className="bg-bone">
      {hero && (
        <section aria-label="Guide hero" className="bg-navy-deep text-bone py-12 md:py-16">
          <div className="container-x">{hero}</div>
        </section>
      )}

      <div className="container-x py-10 md:py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <article className="min-w-0 space-y-10">
          {quickSummary && <Slot title="Quick summary">{quickSummary}</Slot>}
          {tableOfContents && <Slot title="Contents">{tableOfContents}</Slot>}
          {mainContent && <Slot>{mainContent}</Slot>}
          {figures && <Slot title="Figures">{figures}</Slot>}
          {evidenceSummary && <Slot title="Evidence summary">{evidenceSummary}</Slot>}
          {references && <Slot title="References">{references}</Slot>}

          {(relatedGuides || relatedCompounds) && (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedGuides}
              {relatedCompounds}
            </div>
          )}

          {(author || reviewer || lastUpdated) && (
            <footer className="border-t border-navy-deep/10 pt-6 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
              {author && <span><strong className="text-navy-deep">Author:</strong> {author}</span>}
              {reviewer && <span><strong className="text-navy-deep">Reviewer:</strong> {reviewer}</span>}
              {lastUpdated && <span><strong className="text-navy-deep">Updated:</strong> {lastUpdated}</span>}
            </footer>
          )}
        </article>

        <div className="lg:pl-4">
          {sidebar ?? (
            <ResearchSidebar
              activeCategoryId={categoryId ?? "guides"}
              scopeCategoryId={categoryId}
              blocks={["category-tree", "related-guides", "glossary", "methodology"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Slot({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
      {title && (
        <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
          {title.toUpperCase()}
        </div>
      )}
      {children}
    </section>
  );
}

/**
 * Convenience placeholder used until a slot has real content. Renders a
 * short "not yet populated" note rather than dummy paragraphs.
 */
export function GuideSlotPlaceholder({ label }: { label: string }) {
  return (
    <div className="text-sm text-muted-foreground italic">
      {label} — populated in a future release.
    </div>
  );
}
