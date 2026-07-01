import type { ReactNode } from "react";
import { ResearchSidebar } from "./research-sidebar";

/**
 * Structural template for a single COMPOUND monograph.
 *
 * Every section is a slot; nothing renders dummy scientific content.
 */
export interface CompoundLayoutProps {
  name: string;
  identity?: ReactNode;
  aliases?: ReactNode;
  mechanism?: ReactNode;
  receptorTargets?: ReactNode;
  researchAreas?: ReactNode;
  laboratoryNotes?: ReactNode;
  references?: ReactNode;
  relatedGuides?: ReactNode;
  relatedProducts?: ReactNode;
  evidenceSummary?: ReactNode;
  chemicalMetadata?: ReactNode;
  sidebar?: ReactNode;
  lastUpdated?: string;
}

export function CompoundLayout(props: CompoundLayoutProps) {
  const {
    name,
    identity,
    aliases,
    mechanism,
    receptorTargets,
    researchAreas,
    laboratoryNotes,
    references,
    relatedGuides,
    relatedProducts,
    evidenceSummary,
    chemicalMetadata,
    sidebar,
    lastUpdated,
  } = props;

  return (
    <div className="bg-bone">
      <section aria-label="Compound hero" className="bg-navy-deep text-bone py-12 md:py-16">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">COMPOUND REFERENCE</div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">{name}</h1>
          {aliases && (
            <div className="mt-3 text-sm text-bone/70">
              <span className="text-[10px] font-bold tracking-widest text-gold/80 mr-2">ALIASES</span>
              {aliases}
            </div>
          )}
        </div>
      </section>

      <div className="container-x py-10 md:py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <article className="min-w-0 space-y-8">
          {identity && <Slot title="Identity">{identity}</Slot>}
          {chemicalMetadata && <Slot title="Chemical metadata">{chemicalMetadata}</Slot>}
          {mechanism && <Slot title="Mechanism">{mechanism}</Slot>}
          {receptorTargets && <Slot title="Receptor targets">{receptorTargets}</Slot>}
          {researchAreas && <Slot title="Research areas">{researchAreas}</Slot>}
          {laboratoryNotes && <Slot title="Laboratory notes">{laboratoryNotes}</Slot>}
          {evidenceSummary && <Slot title="Evidence summary">{evidenceSummary}</Slot>}
          {references && <Slot title="References">{references}</Slot>}
          {(relatedGuides || relatedProducts) && (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedGuides}
              {relatedProducts}
            </div>
          )}
          {lastUpdated && (
            <footer className="border-t border-navy-deep/10 pt-6 text-xs text-muted-foreground">
              <strong className="text-navy-deep">Updated:</strong> {lastUpdated}
            </footer>
          )}
        </article>

        <div className="lg:pl-4">
          {sidebar ?? (
            <ResearchSidebar
              activeCategoryId="compounds"
              scopeCategoryId="compounds"
              blocks={["category-tree", "related-guides", "glossary", "methodology"]}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Slot({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {title.toUpperCase()}
      </div>
      {children}
    </section>
  );
}

export function CompoundSlotPlaceholder({ label }: { label: string }) {
  return (
    <div className="text-sm text-muted-foreground italic">
      {label} — populated in a future release.
    </div>
  );
}
