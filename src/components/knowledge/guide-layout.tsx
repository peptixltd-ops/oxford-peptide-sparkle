import type { ReactNode } from "react";
import { ResearchSidebar } from "./research-sidebar";
import type { ResearchCategoryId } from "@/lib/taxonomy";

/**
 * Structural template for a single research GUIDE page.
 *
 * Every section is a slot. Nothing here contains dummy prose — a slot that
 * isn't passed is not rendered. Release 2 populates guides by rendering
 * this layout with real props.
 */
export interface GuideLayoutProps {
  categoryId?: ResearchCategoryId;
  /** Full-bleed hero: title, eyebrow, breadcrumb, cover image. */
  hero?: ReactNode;
  /** One-paragraph "quick answer" for readers who want the TL;DR. */
  quickAnswer?: ReactNode;
  /** 120–180 word expanded answer, for generative-search extraction. */
  extendedAnswer?: ReactNode;
  /** Fact block: identity, class, targets, key numbers. */
  keyFacts?: ReactNode;
  /** Table of contents (auto or manual). */
  tableOfContents?: ReactNode;
  /** Main article body. */
  mainContent?: ReactNode;
  /** Figures / diagrams / tables. */
  figures?: ReactNode;
  /** Evidence summary: strength of evidence, study count, quality. */
  evidenceSummary?: ReactNode;
  /** Research limitations, caveats and unresolved questions. */
  researchLimitations?: ReactNode;
  /** Reference list. */
  references?: ReactNode;
  /** Inline glossary panel of terms used in this guide. */
  glossaryTerms?: ReactNode;
  /** Related guides card. */
  relatedGuides?: ReactNode;
  /** Related compounds card. */
  relatedCompounds?: ReactNode;
  /** Author byline / bio. */
  author?: ReactNode;
  /** Scientific reviewer credit. */
  scientificReviewer?: ReactNode;
  /** ISO date first published. */
  publicationDate?: string;
  /** ISO date last updated. */
  lastUpdated?: string;
  /** Editorial notice: research-only use, no medical claims, etc. */
  editorialNotice?: ReactNode;
  /** Version history log. */
  versionHistory?: ReactNode;
  /** Sidebar override. Defaults to ResearchSidebar for the guide category. */
  sidebar?: ReactNode;
}

export function GuideLayout(props: GuideLayoutProps) {
  const {
    categoryId,
    hero,
    quickAnswer,
    extendedAnswer,
    keyFacts,
    tableOfContents,
    mainContent,
    figures,
    evidenceSummary,
    researchLimitations,
    references,
    glossaryTerms,
    relatedGuides,
    relatedCompounds,
    author,
    scientificReviewer,
    publicationDate,
    lastUpdated,
    editorialNotice,
    versionHistory,
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
        <article className="min-w-0 space-y-8">
          {quickAnswer && <Slot title="Quick answer">{quickAnswer}</Slot>}
          {extendedAnswer && <Slot title="Extended answer">{extendedAnswer}</Slot>}
          {keyFacts && <Slot title="Key facts">{keyFacts}</Slot>}
          {tableOfContents && <Slot title="Contents">{tableOfContents}</Slot>}
          {mainContent && <Slot>{mainContent}</Slot>}
          {figures && <Slot title="Figures">{figures}</Slot>}
          {evidenceSummary && <Slot title="Evidence summary">{evidenceSummary}</Slot>}
          {researchLimitations && <Slot title="Research limitations">{researchLimitations}</Slot>}
          {references && <Slot title="References">{references}</Slot>}
          {glossaryTerms && <Slot title="Glossary terms">{glossaryTerms}</Slot>}

          {(relatedGuides || relatedCompounds) && (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedGuides}
              {relatedCompounds}
            </div>
          )}

          {editorialNotice && <Slot title="Editorial notice">{editorialNotice}</Slot>}
          {versionHistory && <Slot title="Version history">{versionHistory}</Slot>}

          {(author || scientificReviewer || publicationDate || lastUpdated) && (
            <footer className="border-t border-navy-deep/10 pt-6 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
              {author && <span><strong className="text-navy-deep">Author:</strong> {author}</span>}
              {scientificReviewer && (
                <span><strong className="text-navy-deep">Scientific reviewer:</strong> {scientificReviewer}</span>
              )}
              {publicationDate && (
                <span><strong className="text-navy-deep">Published:</strong> {publicationDate}</span>
              )}
              {lastUpdated && (
                <span><strong className="text-navy-deep">Updated:</strong> {lastUpdated}</span>
              )}
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
