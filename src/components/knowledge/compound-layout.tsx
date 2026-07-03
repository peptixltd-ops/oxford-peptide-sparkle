import type { ReactNode } from "react";
import { ResearchSidebar } from "./research-sidebar";

/**
 * Structural template for a single COMPOUND monograph — Release 4.0
 * Compound Authority Framework.
 *
 * Every section is a slot. Nothing renders dummy scientific content.
 * A slot that isn't passed is not rendered — so the same layout serves
 * both minimal reference stubs and fully populated authority monographs.
 */
export interface CompoundLayoutProps {
  name: string;
  /** Short hero-line under the title. */
  eyebrow?: string;
  /** One-line quick definition rendered inside the hero. */
  quickDefinition?: ReactNode;
  /** Identity summary paragraph. */
  identity?: ReactNode;
  /** Overview / editorial abstract. */
  overview?: ReactNode;
  /** Comma-separated aliases / trade names / research codes. */
  aliases?: ReactNode;
  /** Structured synonyms card. */
  synonyms?: ReactNode;
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
  /** Related mechanisms card (Knowledge Graph). */
  relatedMechanisms?: ReactNode;
  /** Pharmacology (PK/PD, receptor selectivity). */
  pharmacology?: ReactNode;
  /** Applicable research areas / research applications. */
  researchAreas?: ReactNode;
  /** Research applications (in-vitro / model systems). */
  researchApplications?: ReactNode;
  /** Laboratory methodology overview. */
  laboratoryMethodology?: ReactNode;
  /** Laboratory handling notes: reconstitution, storage, purity. */
  laboratoryNotes?: ReactNode;
  /** Storage & handling specifics. */
  storage?: ReactNode;
  /** Reconstitution procedure summary. */
  reconstitution?: ReactNode;
  /** Evidence summary. */
  evidenceSummary?: ReactNode;
  /** Frequently asked questions. */
  faqs?: ReactNode;
  /** Reference list. */
  references?: ReactNode;
  /** Related guides card. */
  relatedGuides?: ReactNode;
  /** Related products card. */
  relatedProducts?: ReactNode;
  /** Related comparisons card. */
  relatedComparisons?: ReactNode;
  /** Editorial metadata block (authors, reviewers, revisions). */
  editorial?: ReactNode;
  /** Sidebar override. */
  sidebar?: ReactNode;
  /** ISO date last updated. */
  lastUpdated?: string;
}

export function CompoundLayout(props: CompoundLayoutProps) {
  const {
    name,
    eyebrow = "COMPOUND REFERENCE",
    quickDefinition,
    identity,
    overview,
    aliases,
    synonyms,
    researchClassification,
    iupacName,
    molecularFormula,
    molecularWeight,
    chemicalMetadata,
    mechanism,
    receptorTargets,
    relatedMechanisms,
    pharmacology,
    researchAreas,
    researchApplications,
    laboratoryMethodology,
    laboratoryNotes,
    storage,
    reconstitution,
    evidenceSummary,
    faqs,
    references,
    relatedGuides,
    relatedProducts,
    relatedComparisons,
    editorial,
    sidebar,
    lastUpdated,
  } = props;

  return (
    <div className="bg-bone">
      <section aria-label="Compound hero" className="bg-navy-deep text-bone py-12 md:py-16">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">{eyebrow}</div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">{name}</h1>
          {aliases && (
            <div className="mt-3 text-sm text-bone/70">
              <span className="text-[10px] font-bold tracking-widest text-gold/80 mr-2">ALIASES</span>
              {aliases}
            </div>
          )}
          {quickDefinition && (
            <div className="mt-6 max-w-3xl text-bone/85 leading-relaxed">{quickDefinition}</div>
          )}
        </div>
      </section>

      <div className="container-x py-10 md:py-14 grid lg:grid-cols-[1fr_320px] gap-10">
        <article className="min-w-0 space-y-8">
          {overview && <Slot title="Overview">{overview}</Slot>}
          {identity && <Slot title="Identity">{identity}</Slot>}
          {synonyms && <Slot title="Synonyms">{synonyms}</Slot>}
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

          {mechanism && <Slot title="Mechanism of action">{mechanism}</Slot>}
          {receptorTargets && <Slot title="Receptor targets">{receptorTargets}</Slot>}
          {pharmacology && <Slot title="Pharmacology">{pharmacology}</Slot>}
          {researchApplications && <Slot title="Research applications">{researchApplications}</Slot>}
          {researchAreas && <Slot title="Research areas">{researchAreas}</Slot>}
          {laboratoryMethodology && <Slot title="Laboratory methodology">{laboratoryMethodology}</Slot>}
          {storage && <Slot title="Storage">{storage}</Slot>}
          {reconstitution && <Slot title="Reconstitution">{reconstitution}</Slot>}
          {laboratoryNotes && <Slot title="Laboratory notes">{laboratoryNotes}</Slot>}
          {evidenceSummary && <Slot title="Evidence summary">{evidenceSummary}</Slot>}
          {faqs && <Slot title="Frequently asked questions">{faqs}</Slot>}
          {references && <Slot title="References">{references}</Slot>}

          {(relatedGuides || relatedMechanisms || relatedProducts || relatedComparisons) && (
            <div className="grid md:grid-cols-2 gap-6">
              {relatedMechanisms}
              {relatedGuides}
              {relatedProducts}
              {relatedComparisons}
            </div>
          )}

          {editorial && <Slot title="Editorial">{editorial}</Slot>}

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
