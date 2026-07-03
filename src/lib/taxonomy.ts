/**
 * Educational taxonomy — the single source of truth for every knowledge surface
 * on the site (Research Hub categories, guide types, compound families,
 * mechanism groups, research areas, glossary terms).
 *
 * Every component and route in Release 1.2 consumes this file rather than
 * hardcoding categories. Future releases add STRUCTURED DATA here — they do
 * not modify layouts.
 *
 * Intentionally free of long-form content. Descriptions are one line each.
 */
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  FlaskConical,
  Microscope,
  ClipboardList,
  Library,
  GitCompare,
  HelpCircle,
  BookMarked,
  Atom,
  Dna,
  Beaker,
  TestTube,
  Thermometer,
  MoreHorizontal,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Research categories — top-level information architecture for the Hub.
// ---------------------------------------------------------------------------

export type ResearchCategoryId =
  | "guides"
  | "compounds"
  | "mechanisms"
  | "methodology"
  | "literature"
  | "comparisons"
  | "faqs"
  | "glossary";

export interface ResearchCategory {
  id: ResearchCategoryId;
  /** Absolute URL for the category landing page. */
  path: string;
  label: string;
  /** Short label used in chips/breadcrumbs. */
  short: string;
  eyebrow: string;
  /** One-line intro. Kept short by design. */
  description: string;
  /** One-line statement of what this category exists to do. */
  purpose: string;
  icon: LucideIcon;
  related: ResearchCategoryId[];
  /**
   * `false` means the category is a scaffolded placeholder with no populated
   * entries yet. Landing pages emit `noindex` when `populated` is `false`.
   */
  populated: boolean;
}

export const researchCategories: readonly ResearchCategory[] = [
  {
    id: "guides",
    path: "/research-hub/guides",
    label: "Research Guides",
    short: "Guides",
    eyebrow: "RESEARCH GUIDES",
    description:
      "Structured, evidence-based guides for researchers working with peptide reference standards in vitro.",
    purpose:
      "Serve as the primary long-form reference material on the site — one guide, one topic, one clear reading pathway.",
    icon: BookOpen,
    related: ["compounds", "mechanisms", "methodology"],
    populated: true,
  },
  {
    id: "compounds",
    path: "/compounds",
    label: "Compound Reference",
    short: "Compounds",
    eyebrow: "COMPOUND REFERENCE",
    description:
      "Structured monographs covering identity, receptor targets, mechanisms and laboratory notes for each research peptide.",
    purpose:
      "Provide a canonical scientific reference page per compound that guides, methodology articles and comparisons can link into.",
    icon: FlaskConical,
    related: ["mechanisms", "guides", "comparisons"],
    populated: true,
  },
  {
    id: "mechanisms",
    path: "/research-hub/mechanisms",
    label: "Mechanisms of Action",
    short: "Mechanisms",
    eyebrow: "MECHANISMS OF ACTION",
    description:
      "Receptor-level and signalling-level explanations of how classes of research peptides act in vitro.",
    purpose:
      "Group compounds by shared mechanism so researchers can move from a receptor pathway to the relevant compounds and guides.",
    icon: Atom,
    related: ["compounds", "guides", "literature"],
    populated: false,
  },
  {
    id: "methodology",
    path: "/research-hub/methodology",
    label: "Laboratory Methodology",
    short: "Methodology",
    eyebrow: "LABORATORY METHODOLOGY",
    description:
      "Handling, reconstitution, storage, HPLC purity and mass spectrometry procedures for peptide reference material.",
    purpose:
      "Document laboratory procedures once, then link them from every compound and guide that depends on them.",
    icon: Microscope,
    related: ["guides", "compounds", "literature"],
    populated: false,
  },
  {
    id: "literature",
    path: "/research-hub/literature",
    label: "Scientific Literature",
    short: "Literature",
    eyebrow: "SCIENTIFIC LITERATURE",
    description:
      "Curated references, citations and third-party publications underlying our guides and compound monographs.",
    purpose:
      "Give every scientific claim on the site a traceable citation and give researchers a single reading list per topic.",
    icon: Library,
    related: ["mechanisms", "compounds", "guides"],
    populated: false,
  },
  {
    id: "comparisons",
    path: "/research-hub/comparisons",
    label: "Comparisons",
    short: "Comparisons",
    eyebrow: "COMPARISONS",
    description:
      "Side-by-side comparisons of compounds, receptor selectivity profiles and handling considerations.",
    purpose:
      "Answer the questions researchers most often ask — \"which peptide differs from which\" — with structured, cite-able tables.",
    icon: GitCompare,
    related: ["compounds", "mechanisms", "guides"],
    populated: false,
  },
  {
    id: "faqs",
    path: "/research-hub/faqs",

    label: "FAQs",
    short: "FAQs",
    eyebrow: "FAQS",
    description:
      "Answers to common operational, quality and compliance questions about our reference material.",
    purpose:
      "Consolidate the questions we already answer over email into one indexable, structured resource.",
    icon: HelpCircle,
    related: ["methodology", "compounds"],
    populated: true,
  },
  {
    id: "glossary",
    path: "/research-hub/glossary",
    label: "Glossary",
    short: "Glossary",
    eyebrow: "GLOSSARY",
    description:
      "Definitions of the scientific terminology used across the Research Hub and compound monographs.",
    purpose:
      "Give every piece of jargon on the site a single canonical definition that guides can hyperlink to.",
    icon: BookMarked,
    related: ["compounds", "mechanisms", "methodology"],
    populated: true,
  },
];

// ---------------------------------------------------------------------------
// Guide types — the sub-classification of an individual /guides/$slug page.
// ---------------------------------------------------------------------------

export type GuideTypeId =
  | "primer"
  | "handling"
  | "mechanism-note"
  | "structural-note"
  | "comparison"
  | "methodology";

export interface GuideType {
  id: GuideTypeId;
  label: string;
  description: string;
}

export const guideTypes: readonly GuideType[] = [
  { id: "primer", label: "Primer", description: "Introductory reference to a topic or compound class." },
  { id: "handling", label: "Handling Guide", description: "Laboratory handling, storage and reconstitution." },
  { id: "mechanism-note", label: "Mechanism Note", description: "Receptor-level explanation of a compound or family." },
  { id: "structural-note", label: "Structural Note", description: "Sequence, modifications and physicochemical properties." },
  { id: "comparison", label: "Comparison", description: "Side-by-side analysis of two or more compounds." },
  { id: "methodology", label: "Methodology", description: "Analytical or preparative laboratory procedure." },
];

// ---------------------------------------------------------------------------
// Compound families — top-level grouping for the Compound Reference.
// ---------------------------------------------------------------------------

export type CompoundFamilyId =
  | "incretin-mimetics"
  | "growth-hormone-secretagogues"
  | "melanocortin-ligands"
  | "tissue-repair"
  | "copper-peptides"
  | "cyclic-peptides"
  | "reference-standards";

export interface CompoundFamily {
  id: CompoundFamilyId;
  label: string;
  description: string;
  mechanismIds: MechanismGroupId[];
}

export const compoundFamilies: readonly CompoundFamily[] = [
  { id: "incretin-mimetics", label: "Incretin Mimetics", description: "GLP-1, GIP and dual/triple receptor agonists.", mechanismIds: ["glp1r", "gipr", "gcgr"] },
  { id: "growth-hormone-secretagogues", label: "Growth Hormone Secretagogues", description: "GHSR ligands and related secretagogues.", mechanismIds: ["ghsr"] },
  { id: "melanocortin-ligands", label: "Melanocortin Ligands", description: "Ligands acting at MC receptors.", mechanismIds: ["mcr"] },
  { id: "tissue-repair", label: "Tissue Repair Peptides", description: "Peptides studied in in-vitro tissue and matrix models.", mechanismIds: ["growth-factors"] },
  { id: "copper-peptides", label: "Copper Peptides", description: "Copper-binding peptides such as GHK-Cu.", mechanismIds: ["copper-binding"] },
  { id: "cyclic-peptides", label: "Cyclic Peptides", description: "Cyclised sequences with constrained conformation.", mechanismIds: [] },
  { id: "reference-standards", label: "Reference Standards", description: "Peptides synthesised for analytical reference use.", mechanismIds: [] },
];

// ---------------------------------------------------------------------------
// Mechanism groups — receptor / pathway classification.
// ---------------------------------------------------------------------------

export type MechanismGroupId =
  | "glp1r"
  | "gipr"
  | "gcgr"
  | "ghsr"
  | "mcr"
  | "growth-factors"
  | "copper-binding";

export interface MechanismGroup {
  id: MechanismGroupId;
  label: string;
  description: string;
}

export const mechanismGroups: readonly MechanismGroup[] = [
  { id: "glp1r", label: "GLP-1 Receptor", description: "Glucagon-like peptide-1 receptor ligands." },
  { id: "gipr", label: "GIP Receptor", description: "Glucose-dependent insulinotropic polypeptide receptor ligands." },
  { id: "gcgr", label: "Glucagon Receptor", description: "Glucagon receptor ligands." },
  { id: "ghsr", label: "GHS Receptor", description: "Growth hormone secretagogue receptor ligands." },
  { id: "mcr", label: "Melanocortin Receptors", description: "MC1R–MC5R ligands." },
  { id: "growth-factors", label: "Growth Factor Pathways", description: "Peptides studied in growth-factor and tissue-repair signalling." },
  { id: "copper-binding", label: "Copper-Binding Peptides", description: "Peptides forming coordination complexes with Cu²⁺." },
];

// ---------------------------------------------------------------------------
// Research areas — the horizontal, cross-family classification used on
// homepage tiles and future guide filtering.
// ---------------------------------------------------------------------------

export type ResearchAreaId =
  | "peptide-chemistry"
  | "receptor-studies"
  | "assay-development"
  | "stability-research"
  | "specialty-compounds";

export interface ResearchArea {
  id: ResearchAreaId;
  label: string;
  description: string;
  icon: LucideIcon;
  examples: readonly string[];
}

export const researchAreas: readonly ResearchArea[] = [
  { id: "peptide-chemistry", label: "Peptide Chemistry", description: "Synthesis, modification and reference standards.", icon: Dna, examples: ["Synthetic peptides", "Modified analogues", "Reference standards"] },
  { id: "receptor-studies", label: "Receptor Studies", description: "Ligand-receptor pharmacology in vitro.", icon: Beaker, examples: ["GLP-1 ligands", "GHSR ligands", "Melanocortin ligands"] },
  { id: "assay-development", label: "Assay Development", description: "Analytical reference material for method development.", icon: TestTube, examples: ["HPLC standards", "MS reference", "Calibration peptides"] },
  { id: "stability-research", label: "Stability Research", description: "Lyophilised, reconstituted and long-term storage studies.", icon: Thermometer, examples: ["Lyophilised powders", "Reconstitution studies", "Long-term storage"] },
  { id: "specialty-compounds", label: "Specialty Compounds", description: "Cyclic, copper-binding and custom syntheses.", icon: MoreHorizontal, examples: ["Copper peptides", "Cyclic peptides", "Custom syntheses"] },
];

// ---------------------------------------------------------------------------
// Guide + Compound entry SHAPES.
//
// Future releases populate these arrays. Release 1.2 ships empty datasets so
// every listing surface reads "Coming soon" from the same source of truth.
// ---------------------------------------------------------------------------

export interface Guide {
  slug: string;
  title: string;
  categoryId: ResearchCategoryId;
  typeId?: GuideTypeId;
  compoundSlugs?: readonly string[];
  mechanismIds?: readonly MechanismGroupId[];
  methodologySlugs?: readonly string[];
  areaIds?: readonly ResearchAreaId[];
  summary?: string;
  readingMinutes?: number;
  updated?: string;
  author?: string;
  reviewer?: string;
  populated: boolean;
}

export const guides: readonly Guide[] = [
  {
    slug: "what-is-retatrutide",
    title: "What is Retatrutide?",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    areaIds: ["receptor-studies"],
    summary:
      "Introductory reference on Retatrutide (LY3437943) — a triple-agonist investigational peptide referenced in incretin pharmacology literature.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "retatrutide-mechanism-of-action",
    title: "Retatrutide Mechanism of Action",
    categoryId: "guides",
    typeId: "mechanism-note",
    compoundSlugs: ["retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    summary:
      "Receptor-level explanation of Retatrutide's activity at GLP-1R, GIPR and GCGR as reported in the published preclinical and clinical literature.",
    readingMinutes: 8,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "glp-1-receptor-explained",
    title: "GLP-1 Receptor Explained",
    categoryId: "guides",
    typeId: "mechanism-note",
    mechanismIds: ["glp1r"],
    compoundSlugs: ["retatrutide"],
    summary:
      "Overview of the GLP-1 receptor: a Class B G-protein-coupled receptor central to incretin pharmacology and to a growing family of research peptides.",
    readingMinutes: 7,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "gip-receptor-explained",
    title: "GIP Receptor Explained",
    categoryId: "guides",
    typeId: "mechanism-note",
    mechanismIds: ["gipr"],
    compoundSlugs: ["retatrutide"],
    summary:
      "Overview of the GIP receptor: a class B G-protein-coupled receptor engaged by dual and triple incretin-agonist research peptides.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "glucagon-receptor-explained",
    title: "Glucagon Receptor Explained",
    categoryId: "guides",
    typeId: "mechanism-note",
    mechanismIds: ["gcgr"],
    compoundSlugs: ["retatrutide"],
    summary:
      "Overview of the glucagon receptor (GCGR): classification, hepatic signalling and its role as the third receptor in triple-agonist research peptides.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "triple-agonists-explained",
    title: "Triple Agonists Explained",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    summary:
      "Educational overview of triple GLP-1 / GIP / glucagon receptor agonists — pharmacological rationale, structural strategy and comparison to single- and dual-agonist analogues.",
    readingMinutes: 7,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "laboratory-reconstitution-guide",
    title: "Laboratory Reconstitution Guide",
    categoryId: "guides",
    typeId: "handling",
    methodologySlugs: ["reconstitution"],
    summary:
      "Practical, aseptic procedure for reconstituting lyophilised peptide reference material — diluent selection, concentration calculation and post-reconstitution storage.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "laboratory-storage-guide",
    title: "Laboratory Storage Guide",
    categoryId: "guides",
    typeId: "handling",
    methodologySlugs: ["storage"],
    summary:
      "General laboratory storage procedure for lyophilised and reconstituted peptide reference standards — temperature, humidity, light, container and freeze-thaw management.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "retatrutide-research-applications",
    title: "Retatrutide Research Applications",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    areaIds: ["receptor-studies", "peptide-chemistry"],
    summary:
      "Educational review of in-vitro and translational research applications for Retatrutide (LY3437943) as a reference standard.",
    readingMinutes: 7,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "retatrutide-faq",
    title: "Retatrutide FAQ",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    summary:
      "Comprehensive frequently asked questions about Retatrutide (LY3437943): identity, pharmacology, storage, applications and regulatory status.",
    readingMinutes: 6,
    updated: "2026-07-15",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "bpc-157-mechanism-of-action",
    title: "BPC-157 Mechanism of Action",
    categoryId: "guides",
    typeId: "mechanism-note",
    compoundSlugs: ["bpc-157"],
    mechanismIds: ["growth-factors"],
    areaIds: ["peptide-chemistry"],
    summary:
      "Scientifically honest overview of BPC-157's reported mechanistic activity — nitric-oxide modulation, VEGFR2 up-regulation, FAK-paxillin signalling and the cytoprotection framework — with explicit note of what remains unresolved.",
    readingMinutes: 7,
    updated: "2026-08-05",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "bpc-157-faq",
    title: "BPC-157 FAQ",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["bpc-157"],
    mechanismIds: ["growth-factors"],
    summary:
      "Comprehensive research-focused FAQ on BPC-157 — identity, mechanism, laboratory handling, stability, evidence base, regulatory status and common misconceptions.",
    readingMinutes: 6,
    updated: "2026-08-05",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
];

export interface CompoundEntry {
  slug: string;
  name: string;
  aliases?: readonly string[];
  familyId?: CompoundFamilyId;
  mechanismIds?: readonly MechanismGroupId[];
  areaIds?: readonly ResearchAreaId[];
  guideSlugs?: readonly string[];
  productSlug?: string;
  populated: boolean;
}

export const compoundEntries: readonly CompoundEntry[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    aliases: ["LY3437943"],
    familyId: "incretin-mimetics",
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    areaIds: ["receptor-studies", "peptide-chemistry"],
    populated: true,
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    aliases: ["Body Protection Compound 157", "PL 14736", "Pentadecapeptide BPC 157"],
    familyId: "tissue-repair",
    mechanismIds: ["growth-factors"],
    areaIds: ["peptide-chemistry", "stability-research"],
    guideSlugs: ["bpc-157-mechanism-of-action", "bpc-157-faq"],
    productSlug: "bpc-157",
    populated: true,
  },
];

export interface GlossaryTerm {
  slug: string;
  term: string;
  short: string;
  relatedCompoundSlugs?: readonly string[];
  relatedMechanismIds?: readonly MechanismGroupId[];
  populated: boolean;
}

export const glossaryTerms: readonly GlossaryTerm[] = [
  {
    slug: "angiogenesis",
    term: "Angiogenesis",
    short:
      "Formation of new blood vessels from pre-existing vasculature, driven by endothelial proliferation and migration.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "vegfr2",
    term: "VEGFR2",
    short:
      "Vascular endothelial growth factor receptor 2 — the principal endothelial receptor tyrosine kinase driving angiogenic signalling.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "nitric-oxide",
    term: "Nitric Oxide",
    short:
      "Small gaseous signalling molecule (NO) produced by nitric-oxide synthases with vasodilatory, cytoprotective and cell-signalling roles.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "cytoprotection",
    term: "Cytoprotection",
    short:
      "Research framework describing molecules that protect cells and tissues from injury independently of any specific receptor pathway.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "pentadecapeptide",
    term: "Pentadecapeptide",
    short: "A peptide composed of fifteen amino-acid residues.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "fibroblast",
    term: "Fibroblast",
    short:
      "Connective-tissue cell that synthesises extracellular matrix and collagen and coordinates directed migration during tissue repair.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
  {
    slug: "fak-paxillin",
    term: "FAK-Paxillin",
    short:
      "Focal-adhesion signalling axis coupling integrin engagement to directed cell migration and tissue-repair phenotypes.",
    relatedCompoundSlugs: ["bpc-157"],
    populated: true,
  },
];

// ---------------------------------------------------------------------------
// Reading pathways — component-driven, content-free.
// ---------------------------------------------------------------------------

export type PathwayStepKind =
  | "start"
  | "mechanism"
  | "compound"
  | "method"
  | "comparison"
  | "reading";

export interface PathwayStep {
  kind: PathwayStepKind;
  label: string;
  hint?: string;
  to?: string;
}

/** The default "how to read this hub" pathway. Consumed by ReadingPathway. */
export const defaultReadingPathway: readonly PathwayStep[] = [
  { kind: "start", label: "Start Here", hint: "Orient yourself in the Research Hub", to: "/research-hub" },
  { kind: "mechanism", label: "Mechanism", hint: "Understand the receptor pathway", to: "/research-hub/mechanisms" },
  { kind: "compound", label: "Compound", hint: "Read the compound monograph", to: "/compounds" },
  { kind: "method", label: "Laboratory Method", hint: "Confirm handling and analytical procedure", to: "/research-hub/methodology" },
  { kind: "comparison", label: "Comparison", hint: "Contrast with related compounds", to: "/research-hub/comparisons" },
  { kind: "reading", label: "Related Reading", hint: "Continue with linked guides and literature", to: "/research-hub/literature" },
];

// ---------------------------------------------------------------------------
// Helpers — keep call sites terse and typed.
// ---------------------------------------------------------------------------

export function getCategory(id: ResearchCategoryId): ResearchCategory | undefined {
  return researchCategories.find((c) => c.id === id);
}

export function getRelatedCategories(id: ResearchCategoryId): ResearchCategory[] {
  const cat = getCategory(id);
  if (!cat) return [];
  return cat.related
    .map((rid) => getCategory(rid))
    .filter((c): c is ResearchCategory => !!c);
}

export function guidesInCategory(id: ResearchCategoryId): Guide[] {
  return guides.filter((g) => g.categoryId === id);
}

export function compoundsInFamily(familyId: CompoundFamilyId): CompoundEntry[] {
  return compoundEntries.filter((c) => c.familyId === familyId);
}

export function compoundsByMechanism(mechanismId: MechanismGroupId): CompoundEntry[] {
  return compoundEntries.filter((c) => c.mechanismIds?.includes(mechanismId));
}

export function guidesByCompound(compoundSlug: string): Guide[] {
  return guides.filter((g) => g.compoundSlugs?.includes(compoundSlug));
}

export function guidesByMechanism(mechanismId: MechanismGroupId): Guide[] {
  return guides.filter((g) => g.mechanismIds?.includes(mechanismId));
}

export function guidesByArea(areaId: ResearchAreaId): Guide[] {
  return guides.filter((g) => g.areaIds?.includes(areaId));
}

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getCompoundEntry(slug: string): CompoundEntry | undefined {
  return compoundEntries.find((c) => c.slug === slug);
}

export function getGlossaryTerm(slug: string): GlossaryTerm | undefined {
  return glossaryTerms.find((t) => t.slug === slug);
}
