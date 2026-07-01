/**
 * Release 2.1 — structured scaffold data for a handful of educational pages.
 *
 * Scaffolds are STRUCTURED (typed) placeholder data that route components use
 * to populate the reusable GuideLayout and CompoundLayout slots via the
 * Scientific Publishing component library. They contain short neutral labels
 * only — not educational content. Every scaffolded page is emitted with
 * `noindex` until a future release replaces the scaffold with real prose.
 *
 * Adding a new scaffold means adding a data entry here — never editing a
 * layout or a route component.
 */
import type { ReactNode } from "react";
import {
  QuickAnswer,
  KeyFacts,
  EvidenceSummary,
  KeyFindings,
  ResearchLimitations,
  ReferenceList,
  ReferenceProvider,
  AuthorCard,
  ScientificReviewerCard,
  EditorialStandardsNotice,
  RevisionHistory,
  RelatedDefinitions,
  ContinueReading,
  ScientificDisclaimer,
  ComparisonTable,
  LaboratoryProcedure,
  DataPanel,
  DefinitionBox,
} from "@/components/publishing";
import type {
  Author,
  Reference,
  RevisionEntry,
  EvidenceLevel,
  ResearchConfidence,
} from "@/components/publishing/types";
import type { GuideLayoutProps } from "@/components/knowledge/guide-layout";
import type { CompoundLayoutProps } from "@/components/knowledge/compound-layout";
import type { RelatedDefinitionItem } from "@/components/publishing/article";
import type { ContinueReadingItem } from "@/components/publishing/article";

// ---------------------------------------------------------------------------
// Shared editorial scaffolding (neutral, non-content).
// ---------------------------------------------------------------------------

const scaffoldAuthor: Author = {
  name: "Editorial Team",
  role: "Written by",
  affiliation: "Oxford Research Peptides",
};

const scaffoldReviewer: Author = {
  name: "Scientific Review Panel",
  role: "Scientifically reviewed by",
  affiliation: "Oxford Research Peptides",
};

const scaffoldRevisions: RevisionEntry[] = [
  { version: "0.1", date: "2026-07-01", summary: "Scaffold created.", author: "Editorial Team" },
];

// No real citations — reference system is wired but empty until Release 2.2+.
const scaffoldReferences: Reference[] = [];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ScaffoldKind = "compound" | "methodology" | "mechanism";

interface BaseScaffold {
  slug: string;
  title: string;
  eyebrow: string;
  quickAnswer: string;
  keyFacts: Array<{ label: string; value: string }>;
  evidence: { level: EvidenceLevel; confidence?: ResearchConfidence; summary: string };
  keyFindings: string[];
  limitations: string[];
  definitions: RelatedDefinitionItem[];
  continueReading: ContinueReadingItem[];
}

export interface GuideScaffold extends BaseScaffold {
  kind: "methodology" | "mechanism";
  categoryPath: string;
  categoryLabel: string;
  procedureSteps?: string[];
  comparisonRows?: Array<{ label: string; a: string; b: string }>;
}

export interface CompoundScaffold extends BaseScaffold {
  kind: "compound";
  identity: string;
  aliases: string[];
  chemistry: Array<{ label: string; value: string }>;
  mechanismSummary: string;
  receptorTargets: Array<{ target: string; role: string }>;
  laboratoryNotes: string[];
  relatedGuideSlugs: string[];
  relatedProductLabels: string[];
  relatedComparisonLabels: string[];
}

// ---------------------------------------------------------------------------
// Scaffold dataset (short neutral labels only)
// ---------------------------------------------------------------------------

const compoundScaffolds: readonly CompoundScaffold[] = [
  {
    kind: "compound",
    slug: "retatrutide",
    title: "Retatrutide",
    eyebrow: "COMPOUND REFERENCE",
    identity:
      "Investigational triple-agonist peptide referenced in incretin pharmacology research literature.",
    aliases: ["LY3437943"],
    chemistry: [
      { label: "Molecular formula", value: "Scaffold — pending curation" },
      { label: "Molecular weight", value: "Scaffold — pending curation" },
      { label: "CAS", value: "Scaffold — pending curation" },
      { label: "Sequence", value: "Scaffold — pending curation" },
    ],
    mechanismSummary:
      "Referenced as an agonist at three incretin-family receptors in preclinical literature.",
    receptorTargets: [
      { target: "GLP-1R", role: "Agonist (referenced)" },
      { target: "GIPR", role: "Agonist (referenced)" },
      { target: "GCGR", role: "Agonist (referenced)" },
    ],
    quickAnswer:
      "Retatrutide is a reference peptide entry. Full monograph is scheduled for a subsequent release.",
    keyFacts: [
      { label: "Class", value: "Incretin mimetic" },
      { label: "Format", value: "Lyophilised powder" },
      { label: "Purity target", value: "≥ 99% (HPLC)" },
      { label: "Storage", value: "−20 °C, desiccated" },
    ],
    evidence: {
      level: "preliminary",
      confidence: "low",
      summary:
        "Evidence base is being curated. This scaffold demonstrates the evidence slot only.",
    },
    keyFindings: [
      "Scaffold entry — findings pending editorial review.",
      "Structural slots for evidence, references and figures are wired.",
    ],
    limitations: [
      "No citations populated yet.",
      "Sequence and physicochemical data pending curation.",
    ],
    laboratoryNotes: [
      "Reconstitute with bacteriostatic or sterile water per lab SOP.",
      "Aliquot to minimise freeze-thaw cycles.",
      "Store lyophilised powder at −20 °C, protected from light.",
    ],
    relatedGuideSlugs: ["reconstitution", "hplc-purity"],
    relatedProductLabels: ["Retatrutide reference standard"],
    relatedComparisonLabels: ["Retatrutide vs Tirzepatide"],
    definitions: [
      { term: "Incretin", short: "Gut-derived peptide that potentiates insulin secretion." },
      { term: "Triple agonist", short: "Ligand activating three receptor targets." },
    ],
    continueReading: [
      {
        title: "Reconstitution methodology",
        href: "/research-hub/methodology/reconstitution",
        eyebrow: "METHODOLOGY",
      },
      {
        title: "GLP-1 receptor mechanism",
        href: "/research-hub/mechanisms/glp-1",
        eyebrow: "MECHANISM",
      },
    ],
  },
  {
    kind: "compound",
    slug: "bpc-157",
    title: "BPC-157",
    eyebrow: "COMPOUND REFERENCE",
    identity:
      "Pentadecapeptide fragment referenced in in-vitro tissue and matrix-repair research models.",
    aliases: ["Body Protection Compound 157", "PL-14736"],
    chemistry: [
      { label: "Molecular formula", value: "Scaffold — pending curation" },
      { label: "Molecular weight", value: "Scaffold — pending curation" },
      { label: "Sequence", value: "Scaffold — pending curation" },
    ],
    mechanismSummary:
      "Referenced in growth-factor and matrix-signalling research; mechanism narrative pending.",
    receptorTargets: [
      { target: "Growth-factor pathways", role: "Referenced signalling" },
    ],
    quickAnswer:
      "BPC-157 is a reference peptide entry. Full monograph is scheduled for a subsequent release.",
    keyFacts: [
      { label: "Class", value: "Tissue-repair peptide" },
      { label: "Format", value: "Lyophilised powder" },
      { label: "Purity target", value: "≥ 99% (HPLC)" },
      { label: "Storage", value: "−20 °C, desiccated" },
    ],
    evidence: {
      level: "preliminary",
      confidence: "low",
      summary: "Evidence base pending curation. Scaffold demonstrates the layout only.",
    },
    keyFindings: ["Scaffold entry — findings pending editorial review."],
    limitations: [
      "No citations populated yet.",
      "Sequence and physicochemical data pending curation.",
    ],
    laboratoryNotes: [
      "Reconstitute per laboratory SOP.",
      "Store lyophilised material at −20 °C.",
      "Minimise freeze-thaw cycles.",
    ],
    relatedGuideSlugs: ["reconstitution", "hplc-purity"],
    relatedProductLabels: ["BPC-157 reference standard"],
    relatedComparisonLabels: [],
    definitions: [
      { term: "Pentadecapeptide", short: "Peptide comprising fifteen amino-acid residues." },
    ],
    continueReading: [
      {
        title: "Reconstitution methodology",
        href: "/research-hub/methodology/reconstitution",
        eyebrow: "METHODOLOGY",
      },
    ],
  },
];

const guideScaffolds: readonly GuideScaffold[] = [
  {
    kind: "methodology",
    slug: "reconstitution",
    title: "Reconstitution — Methodology Scaffold",
    eyebrow: "LABORATORY METHODOLOGY",
    categoryPath: "/research-hub/methodology",
    categoryLabel: "Methodology",
    quickAnswer:
      "Structured scaffold for peptide reconstitution SOPs. Full procedure copy pending editorial release.",
    keyFacts: [
      { label: "Diluent", value: "Bacteriostatic / sterile water" },
      { label: "Concentration units", value: "mg / mL" },
      { label: "Storage post-reconstitution", value: "2–8 °C" },
      { label: "Handling", value: "Aseptic technique" },
    ],
    evidence: {
      level: "moderate",
      confidence: "moderate",
      summary: "Standard laboratory methodology. Scaffold only.",
    },
    keyFindings: [
      "Diluent choice affects post-reconstitution stability.",
      "Aliquoting reduces freeze-thaw stress on peptides.",
    ],
    limitations: [
      "Compound-specific optima are not covered in this scaffold.",
      "Long-term reconstituted stability studies are pending.",
    ],
    procedureSteps: [
      "Equilibrate vial to room temperature.",
      "Introduce diluent slowly against the vial wall.",
      "Swirl gently — do not vortex.",
      "Allow full dissolution before aliquoting.",
      "Label aliquots with date, concentration and analyst.",
    ],
    definitions: [
      { term: "Bacteriostatic water", short: "Water containing 0.9% benzyl alcohol as preservative." },
      { term: "Aliquot", short: "Sub-portion of a stock solution stored separately." },
    ],
    continueReading: [
      { title: "HPLC purity methodology", href: "/research-hub/methodology/hplc-purity", eyebrow: "METHODOLOGY" },
      { title: "Compound reference", href: "/compounds", eyebrow: "COMPOUNDS" },
    ],
  },
  {
    kind: "methodology",
    slug: "hplc-purity",
    title: "HPLC Purity — Methodology Scaffold",
    eyebrow: "LABORATORY METHODOLOGY",
    categoryPath: "/research-hub/methodology",
    categoryLabel: "Methodology",
    quickAnswer:
      "Structured scaffold for reversed-phase HPLC purity assessment. Analytical detail pending editorial release.",
    keyFacts: [
      { label: "Mode", value: "Reversed-phase" },
      { label: "Detection", value: "UV 214 nm" },
      { label: "Purity target", value: "≥ 99% area" },
      { label: "System suitability", value: "Per SOP" },
    ],
    evidence: {
      level: "strong",
      confidence: "high",
      summary: "Reversed-phase HPLC is an established peptide purity technique. Scaffold only.",
    },
    keyFindings: [
      "Peak-area purity is reported at 214 nm by convention.",
      "System suitability must precede sample analysis.",
    ],
    limitations: [
      "Method transfer between columns is out of scope for this scaffold.",
      "Orthogonal MS confirmation is documented separately.",
    ],
    comparisonRows: [
      { label: "Detection wavelength", a: "214 nm", b: "280 nm" },
      { label: "Selectivity for peptide bond", a: "High", b: "Requires aromatic residues" },
      { label: "Typical use", a: "Purity reporting", b: "Complementary detection" },
    ],
    definitions: [
      { term: "Peak-area purity", short: "Purity expressed as area percentage of the main peak." },
      { term: "System suitability", short: "Pre-analysis check confirming instrument readiness." },
    ],
    continueReading: [
      { title: "Reconstitution methodology", href: "/research-hub/methodology/reconstitution", eyebrow: "METHODOLOGY" },
    ],
  },
  {
    kind: "mechanism",
    slug: "glp-1",
    title: "GLP-1 Receptor — Mechanism Scaffold",
    eyebrow: "MECHANISM OF ACTION",
    categoryPath: "/research-hub/mechanisms",
    categoryLabel: "Mechanisms",
    quickAnswer:
      "Structured scaffold for the GLP-1 receptor pathway. Full mechanism narrative pending editorial release.",
    keyFacts: [
      { label: "Receptor class", value: "Class B GPCR" },
      { label: "Endogenous ligand", value: "GLP-1 (7-36)" },
      { label: "Primary tissue", value: "Pancreatic β-cells (referenced)" },
      { label: "Signalling", value: "Gαs / cAMP (referenced)" },
    ],
    evidence: {
      level: "strong",
      confidence: "high",
      summary: "Well-characterised receptor system. Scaffold only.",
    },
    keyFindings: [
      "GLP-1R is a Class B G-protein-coupled receptor.",
      "Multiple approved and investigational ligands target this pathway.",
    ],
    limitations: [
      "Compound-specific selectivity data pending curation.",
      "Downstream signalling narrative pending editorial pass.",
    ],
    definitions: [
      { term: "GPCR", short: "G-protein-coupled receptor — seven-transmembrane signalling receptor." },
      { term: "Incretin effect", short: "Enhanced insulin response to oral versus IV glucose." },
    ],
    continueReading: [
      { title: "Retatrutide", href: "/compounds/retatrutide", eyebrow: "COMPOUND" },
      { title: "Reconstitution methodology", href: "/research-hub/methodology/reconstitution", eyebrow: "METHODOLOGY" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getCompoundScaffold(slug: string): CompoundScaffold | undefined {
  return compoundScaffolds.find((s) => s.slug === slug);
}

export function getGuideScaffold(
  kind: "methodology" | "mechanism",
  slug: string,
): GuideScaffold | undefined {
  return guideScaffolds.find((s) => s.kind === kind && s.slug === slug);
}

// ---------------------------------------------------------------------------
// Slot renderers — compose Release 2.0 publishing components into the
// GuideLayout / CompoundLayout slot API. Route components stay content-free.
// ---------------------------------------------------------------------------

function commonSlots(base: BaseScaffold) {
  return {
    quickAnswer: <QuickAnswer>{base.quickAnswer}</QuickAnswer>,
    keyFacts: <KeyFacts items={base.keyFacts} />,
    evidenceSummary: (
      <EvidenceSummary
        level={base.evidence.level}
        confidence={base.evidence.confidence}
        summary={base.evidence.summary}
      />
    ),
    keyFindings: <KeyFindings>{
      <ul className="list-disc space-y-1 pl-5">
        {base.keyFindings.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
    }</KeyFindings>,
    limitations: <ResearchLimitations items={base.limitations} />,
    definitions: <RelatedDefinitions items={base.definitions} />,
    continueReading: <ContinueReading items={base.continueReading} />,
    disclaimer: <ScientificDisclaimer />,
    editorial: (
      <div className="space-y-3">
        <AuthorCard author={scaffoldAuthor} role="Written by" />
        <ScientificReviewerCard author={scaffoldReviewer} />
        <EditorialStandardsNotice href="/about" />
        <RevisionHistory entries={scaffoldRevisions} />
      </div>
    ),
    references: (
      <ReferenceProvider references={scaffoldReferences}>
        <ReferenceList references={scaffoldReferences} />
        {scaffoldReferences.length === 0 ? (
          <p className="text-xs italic text-muted-foreground">
            References will be populated in a subsequent release.
          </p>
        ) : null}
      </ReferenceProvider>
    ),
  };
}

/** Build the slot props for GuideLayout from a scaffold. */
export function buildGuideLayoutProps(scaffold: GuideScaffold): GuideLayoutProps {
  const s = commonSlots(scaffold);

  const mainContent: ReactNode = (
    <div className="space-y-6">
      {s.keyFindings}
      {scaffold.procedureSteps ? (
        <LaboratoryProcedure
          title="Procedure outline"
          steps={scaffold.procedureSteps.map((step) => ({ title: step }))}
        />
      ) : null}
      {scaffold.comparisonRows ? (
        <ComparisonTable
          columns={[
            { key: "a", label: "Option A" },
            { key: "b", label: "Option B" },
          ]}
          rows={scaffold.comparisonRows.map((r) => ({
            label: r.label,
            values: { a: r.a, b: r.b },
          }))}
        />
      ) : null}
      <DataPanel title="Scaffold status">
        <DefinitionBox term="Scaffold page">
          Layout, taxonomy and cross-links are stable. Article body will be written in
          a subsequent release. This page is not indexed.
        </DefinitionBox>
      </DataPanel>
    </div>
  );

  return {
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
          {scaffold.eyebrow}
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">{scaffold.title}</h1>
      </>
    ),
    quickAnswer: s.quickAnswer,
    keyFacts: s.keyFacts,
    mainContent,
    evidenceSummary: s.evidenceSummary,
    researchLimitations: s.limitations,
    references: s.references,
    glossaryTerms: s.definitions,
    relatedGuides: s.continueReading,
    editorialNotice: s.disclaimer,
    versionHistory: s.editorial,
    publicationDate: "2026-07-01",
    lastUpdated: "2026-07-01",
    categoryId: scaffold.kind === "methodology" ? "methodology" : "mechanisms",
  };
}

/** Build the slot props for CompoundLayout from a scaffold. */
export function buildCompoundLayoutProps(scaffold: CompoundScaffold): CompoundLayoutProps {
  const s = commonSlots(scaffold);

  const chemFacts = scaffold.chemistry;
  const identityBlock = (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed">{scaffold.identity}</p>
      {s.quickAnswer}
      {s.keyFacts}
    </div>
  );

  const chemistryBlock = (
    <KeyFacts title="Chemical metadata" items={chemFacts} />
  );

  const mechanismBlock = (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed">{scaffold.mechanismSummary}</p>
      {s.keyFindings}
    </div>
  );

  const receptorBlock = (
    <ComparisonTable
      rowHeaderLabel="Target"
      columns={[{ key: "role", label: "Referenced role" }]}
      rows={scaffold.receptorTargets.map((t) => ({
        label: t.target,
        values: { role: t.role },
      }))}
    />
  );

  const labNotesBlock = (
    <ul className="list-disc space-y-1 pl-5 text-sm">
      {scaffold.laboratoryNotes.map((n, i) => <li key={i}>{n}</li>)}
    </ul>
  );

  const evidenceBlock = (
    <div className="space-y-4">
      {s.evidenceSummary}
      {s.limitations}
    </div>
  );

  const relatedProducts = scaffold.relatedProductLabels.length ? (
    <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">RELATED PRODUCTS</div>
      <ul className="list-disc pl-5 text-sm">
        {scaffold.relatedProductLabels.map((l) => <li key={l}>{l}</li>)}
      </ul>
    </section>
  ) : undefined;

  const relatedComparisons = scaffold.relatedComparisonLabels.length ? (
    <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">RELATED COMPARISONS</div>
      <ul className="list-disc pl-5 text-sm">
        {scaffold.relatedComparisonLabels.map((l) => <li key={l}>{l}</li>)}
      </ul>
    </section>
  ) : undefined;

  return {
    name: scaffold.title,
    aliases: scaffold.aliases.join(", "),
    identity: identityBlock,
    chemicalMetadata: chemistryBlock,
    mechanism: mechanismBlock,
    receptorTargets: receptorBlock,
    laboratoryNotes: labNotesBlock,
    evidenceSummary: evidenceBlock,
    references: (
      <div className="space-y-4">
        {s.references}
        {s.editorial}
        {s.disclaimer}
      </div>
    ),
    relatedProducts,
    relatedComparisons,
    lastUpdated: "2026-07-01",
  };
}
