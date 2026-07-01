import type { ReactNode } from "react";
import { ResearchSidebar } from "./research-sidebar";

/**
 * Structural template for a single COMPOUND monograph.
 *
 * Every section is a slot. Nothing renders dummy scientific content.
 */
export interface CompoundLayoutProps {
  name: string;
  /** Identity summary paragraph. */
  identity?: ReactNode;
  /** Comma-separated aliases / trade names / research codes. */
  aliases?: ReactNode;
  /** Research classification — family, class, mechanism group tags. */
  researchClassification?: ReactNode;
  /** IUPAC systematic name. */
  iupacName?: ReactNode;
  /** Molecular formula. */
  molecularFormula?: ReactNode;
  /** Molecular weight (Da / g·mol⁻¹). */
  molecularWeight?: ReactNode;
  /** Sequence + additional chemical metadata (CAS, InChI, SMILES). */
  chemicalMetadata?: ReactNode;
  /** Mechanism narrative. */
  mechanism?: ReactNode;
  /** Receptor targets card. */
  receptorTargets?: ReactNode;
  /** Applicable research areas. */
  researchAreas?: ReactNode;
  /** Laboratory handling notes: reconstitution, storage, purity. */
  laboratoryNotes?: ReactNode;
  /** Evidence summary. */
  evidenceSummary?: ReactNode;
  /** Reference list. */
  references?: ReactNode;
  /** Related guides card. */
  relatedGuides?: ReactNode;
  /** Related products card. */
  relatedProducts?: ReactNode;
  /** Related comparisons card. */
  relatedComparisons?: ReactNode;
  /** Sidebar override. */
  sidebar?: ReactNode;
  /** ISO date last updated. */
  lastUpdated?: string;
}

export function CompoundLayout(props: CompoundLayoutProps) {
  const {
    name,
    identity,
    aliases,
    researchClassification,
    iupacName,
    molecularFormula,
    molecularWeight,
    chemicalMetadata,
    mechanism,
    receptorTargets,
    researchAreas,
    laboratoryNotes,
    evidenceSummary,
    references,
    relatedGuides,
    relatedProducts,
    relatedComparisons,
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
          {researchClassification && (
            <Slot title="Research classification">{researchClassification}</Slot>
          )}

          {(iupacName || molecularFormula || molecularWeight || chemicalMetadata) && (
            <Slot title="Chemical metadata">
              <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {iupacName && (
                  <div>
                    <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">IUPAC NAME</dt>
                    <dd className="text-navy-deep mt-1 break-words">{iupacName}</dd>
                  </div>
                )}
                {molecularFormula && (
                  <div>
                    <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MOLECULAR FORMULA</dt>
                    <dd className="text-navy-deep mt-1 font-mono">{molecularFormula}</dd>
                  </div>
                )}
                {molecularWeight && (
                  <div>
                    <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MOLECULAR WEIGHT</dt>
                    <dd className="text-navy-deep mt-1">{molecularWeight}</dd>
                  </div>
                )}
              </dl>
              {chemicalMetadata && <div className="mt-4">{chemicalMetadata}</div>}
            </Slot>
          )}

          {mechanism && <Slot title="Mechanism">{mechanism}</Slot>}
          {receptorTargets && <Slot title="Receptor targets">{receptorTargets}</Slot>}
          {researchAreas && <Slot title="Research areas">{researchAreas}</Slot>}
          {laboratoryNotes && <Slot title="Laboratory notes">{laboratoryNotes}</Slot>}
          {evidenceSummary && <Slot title="Evidence summary">{evidenceSummary}</Slot>}
          {references && <Slot title="References">{references}</Slot>}

          {(relatedGuides || relatedProducts || relatedComparisons) && (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedGuides}
              {relatedCompounds(relatedProducts)}
              {relatedComparisons}
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

function relatedCompounds(node: ReactNode): ReactNode {
  // trivial passthrough — keeps grid ordering explicit in JSX above.
  return node;
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
