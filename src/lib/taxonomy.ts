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
    populated: true,
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

  // ---- Authority Sprint 2B — Semaglutide cluster (Wave 1) ----
  {
    slug: "what-is-semaglutide",
    title: "What is Semaglutide?",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    areaIds: ["receptor-studies"],
    summary:
      "Beginner-friendly research-focused introduction to Semaglutide — a long-acting GLP-1 receptor agonist derived from native GLP-1(7-37).",
    readingMinutes: 6,
    updated: "2026-09-02",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "semaglutide-mechanism-of-action",
    title: "Semaglutide Mechanism of Action",
    categoryId: "guides",
    typeId: "mechanism-note",
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    summary:
      "Receptor-level explanation of Semaglutide's activity at GLP-1R — Gαs / cAMP / PKA / EPAC2 signalling, β-arrestin recruitment, insulinotropic and glucagonostatic effects, gastric emptying and central appetite modulation.",
    readingMinutes: 8,
    updated: "2026-09-02",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "semaglutide-faq",
    title: "Semaglutide FAQ",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    summary:
      "Comprehensive research-focused FAQ on Semaglutide — identity, receptor pharmacology, structural modifications, pharmacokinetics, laboratory handling, evidence base and regulatory status.",
    readingMinutes: 7,
    updated: "2026-09-02",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },

  // ---- Authority Sprint 2C — Semaglutide depth guides ----
  {
    slug: "semaglutide-pharmacokinetics",
    title: "Semaglutide Pharmacokinetics",
    categoryId: "guides",
    typeId: "mechanism-note",
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    areaIds: ["peptide-chemistry"],
    summary:
      "Reported pharmacokinetics of Semaglutide — half-life, albumin binding, C18 di-acid acylation, absorption for subcutaneous vs oral formulations, distribution, steady state and research limitations.",
    readingMinutes: 8,
    updated: "2026-10-01",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "semaglutide-research-applications",
    title: "Semaglutide Research Applications",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    areaIds: ["receptor-studies"],
    summary:
      "Overview of published Semaglutide research contexts — metabolic, cardiovascular, renal, neuroinflammation/CNS and NAFLD/MASH — with a clear preclinical vs human evidence split.",
    readingMinutes: 9,
    updated: "2026-10-01",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "albumin-binding-half-life-extension",
    title: "Albumin Binding and Half-Life Extension",
    categoryId: "guides",
    typeId: "mechanism-note",
    compoundSlugs: ["semaglutide", "retatrutide"],
    mechanismIds: ["glp1r"],
    summary:
      "Reusable mechanism guide explaining how fatty-acid acylation supports reversible non-covalent binding to serum albumin, and how that extends the plasma half-life of GLP-1 peptides.",
    readingMinutes: 7,
    updated: "2026-10-01",
    author: "orp-editorial-team",
    reviewer: "scientific-review-panel",
    populated: true,
  },
  {
    slug: "incretin-effect-explained",
    title: "Incretin Effect Explained",
    categoryId: "guides",
    typeId: "primer",
    compoundSlugs: ["semaglutide", "retatrutide"],
    mechanismIds: ["glp1r", "gipr"],
    summary:
      "Foundation guide to the incretin effect — how GLP-1 and GIP amplify glucose-dependent insulin secretion, the physiology of gut L- and K-cells, and how incretin biology underpins GLP-1 receptor agonist research.",
    readingMinutes: 7,
    updated: "2026-10-01",
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
  {
    slug: "semaglutide",
    name: "Semaglutide",
    aliases: ["NN9535", "Ozempic (brand)", "Wegovy (brand)", "Rybelsus (brand — oral)"],
    familyId: "incretin-mimetics",
    mechanismIds: ["glp1r"],
    areaIds: ["receptor-studies", "peptide-chemistry"],
    guideSlugs: [
      "what-is-semaglutide",
      "semaglutide-mechanism-of-action",
      "semaglutide-faq",
      "semaglutide-pharmacokinetics",
      "semaglutide-research-applications",
      "albumin-binding-half-life-extension",
      "incretin-effect-explained",
      "glp-1-receptor-explained",
      "triple-agonists-explained",
    ],
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

  // ---- Glossary Foundation Sprint — Batch 1 (30 entries) ----

  // General peptide science
  { slug: "peptide", term: "Peptide",
    short: "Short chain of amino-acid residues joined by peptide bonds, typically fewer than about 50 residues.",
    populated: true },
  { slug: "amino-acid", term: "Amino Acid",
    short: "Bifunctional organic molecule bearing both amino and carboxyl groups; the monomer unit of peptides and proteins.",
    populated: true },
  { slug: "peptide-bond", term: "Peptide Bond",
    short: "Covalent amide linkage between the carboxyl of one amino acid and the amino group of the next, releasing water.",
    populated: true },
  { slug: "lyophilisation", term: "Lyophilisation",
    short: "Freeze-drying — low-temperature dehydration of a frozen sample by vacuum sublimation.",
    populated: true },
  { slug: "lyophilised-powder", term: "Lyophilised Powder",
    short: "Dry porous cake or powder produced by freeze-drying an aqueous peptide solution.",
    populated: true },
  { slug: "reconstitution", term: "Reconstitution",
    short: "Aseptic dissolution of a lyophilised peptide in a defined volume of sterile diluent.",
    populated: true },
  { slug: "bioavailability", term: "Bioavailability",
    short: "Fraction of an administered dose that reaches the systemic circulation in an active form.",
    populated: true },
  { slug: "half-life", term: "Half-life",
    short: "Time required for the plasma concentration of a compound to fall to half of its initial value.",
    populated: true },
  { slug: "stability", term: "Stability",
    short: "Capacity of a peptide to retain chemical structure, purity and activity over time under defined storage.",
    populated: true },
  { slug: "molecular-weight", term: "Molecular Weight",
    short: "Sum of atomic weights of all atoms in a molecule; for peptides, residue masses minus one water per bond.",
    populated: true },

  // Pharmacology
  { slug: "agonist", term: "Agonist",
    short: "Ligand that binds a receptor and produces the functional response of the endogenous activator.",
    populated: true },
  { slug: "antagonist", term: "Antagonist",
    short: "Ligand that binds a receptor without activating it and blocks the effect of an agonist.",
    populated: true },
  { slug: "partial-agonist", term: "Partial Agonist",
    short: "Ligand that activates a receptor but produces a lower maximal response than a full agonist.",
    populated: true },
  { slug: "receptor", term: "Receptor",
    short: "Cellular protein that binds a specific ligand and initiates a defined intracellular signalling event.",
    populated: true },
  { slug: "ligand", term: "Ligand",
    short: "Molecule that binds a receptor or other biomolecule with defined affinity to form a reversible complex.",
    populated: true },
  { slug: "affinity", term: "Affinity",
    short: "Thermodynamic strength of a ligand–receptor interaction, quantified by the dissociation constant Kd.",
    populated: true },
  { slug: "potency", term: "Potency",
    short: "Concentration of a ligand required to produce a defined functional response (typically EC50 or IC50).",
    populated: true },
  { slug: "ec50", term: "EC50",
    short: "Concentration of an agonist producing half of its own maximal response in a defined assay.",
    populated: true },
  { slug: "ic50", term: "IC50",
    short: "Concentration of an inhibitor that reduces a defined response by 50% in a given assay system.",
    populated: true },
  { slug: "pharmacodynamics", term: "Pharmacodynamics",
    short: "Branch of pharmacology describing what a compound does to the organism and the mechanism responsible.",
    populated: true },

  // Receptor biology
  { slug: "gpcr", term: "GPCR",
    short: "G-protein-coupled receptor — seven-transmembrane family that transduces ligand binding via heterotrimeric G proteins.",
    populated: true },
  { slug: "signal-transduction", term: "Signal Transduction",
    short: "Cascade of intracellular events by which a receptor converts a ligand-binding event into a cellular response.",
    populated: true },
  { slug: "second-messenger", term: "Second Messenger",
    short: "Small intracellular molecule that relays and amplifies signals from a receptor to downstream effectors.",
    populated: true },
  { slug: "camp", term: "cAMP",
    short: "Cyclic adenosine 3′,5′-monophosphate — the central second messenger downstream of Gs-coupled receptors.",
    populated: true },
  { slug: "protein-kinase-a", term: "Protein Kinase A",
    short: "cAMP-dependent serine/threonine kinase that phosphorylates intracellular substrates on receptor activation.",
    populated: true },

  // Laboratory
  { slug: "hplc", term: "HPLC",
    short: "High-performance liquid chromatography — the standard technique for assessing peptide purity.",
    populated: true },
  { slug: "lc-ms", term: "LC-MS",
    short: "Liquid chromatography–mass spectrometry — hyphenated technique confirming peptide identity by intact mass.",
    populated: true },
  { slug: "endotoxin", term: "Endotoxin",
    short: "Lipopolysaccharide from Gram-negative bacteria; a pyrogenic contaminant assayed during peptide manufacture.",
    populated: true },
  { slug: "lal-assay", term: "LAL Assay",
    short: "Limulus amebocyte lysate assay — the standard method for detecting and quantifying bacterial endotoxin.",
    populated: true },
  { slug: "certificate-of-analysis", term: "Certificate of Analysis",
    short: "Batch-specific quality document reporting identity, purity, endotoxin and related analytical results.",
    populated: true },

  // ---- Glossary Batch 2 — Semaglutide cluster (Authority Sprint 2B) ----
  { slug: "glp-1", term: "GLP-1",
    short: "Glucagon-like peptide-1 — an intestinal incretin hormone that potentiates glucose-dependent insulin secretion.",
    relatedCompoundSlugs: ["semaglutide"], relatedMechanismIds: ["glp1r"], populated: true },
  { slug: "incretin", term: "Incretin",
    short: "Gut-derived peptide hormone (GLP-1, GIP) that amplifies insulin secretion in response to oral nutrient intake.",
    relatedCompoundSlugs: ["semaglutide", "retatrutide"], populated: true },
  { slug: "incretin-effect", term: "Incretin Effect",
    short: "Greater insulin release from oral than intravenous glucose at equivalent glycaemia, mediated by GLP-1 and GIP.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "glp-1-receptor-agonist", term: "GLP-1 Receptor Agonist",
    short: "Pharmacological class of peptides and small molecules that activate the GLP-1 receptor.",
    relatedCompoundSlugs: ["semaglutide"], relatedMechanismIds: ["glp1r"], populated: true },
  { slug: "biased-agonism", term: "Biased Agonism",
    short: "Ligand-selective preference for one branch of a receptor's signalling output over another (e.g. G-protein vs β-arrestin).",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "beta-arrestin", term: "Beta-Arrestin",
    short: "Adaptor protein family that binds phosphorylated GPCRs, driving receptor internalisation and arrestin-dependent signalling.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "camp-pka-signalling", term: "cAMP / PKA Signalling",
    short: "Canonical GPCR signalling module: Gαs elevates cAMP, activating protein kinase A on intracellular substrates.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "epac2", term: "EPAC2",
    short: "Exchange protein directly activated by cAMP (isoform 2); a PKA-independent cAMP effector important in β-cell exocytosis.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "gastric-emptying", term: "Gastric Emptying",
    short: "Rate at which stomach contents transit into the duodenum; slowed by GLP-1R activation via vagal pathways.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "pomc-neuron", term: "POMC Neuron",
    short: "Hypothalamic arcuate-nucleus neuron expressing proopiomelanocortin; anorexigenic node in central appetite regulation.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "npy-neuron", term: "NPY Neuron",
    short: "Hypothalamic arcuate-nucleus neuron co-expressing NPY and AgRP; orexigenic node in central appetite regulation.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "insulinotropic", term: "Insulinotropic",
    short: "Property of stimulating insulin secretion from pancreatic β-cells, typically in a glucose-dependent manner for incretins.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "glucagonostatic", term: "Glucagonostatic",
    short: "Property of suppressing glucagon secretion from pancreatic α-cells, contributing to reduced hepatic glucose output.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "acylation", term: "Acylation",
    short: "Covalent attachment of an acyl (typically fatty-acid) group to a peptide side chain to modify pharmacokinetics.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "albumin-binding", term: "Albumin Binding",
    short: "Reversible non-covalent association of a molecule with serum albumin, prolonging plasma residence.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "snac", term: "SNAC",
    short: "Sodium N-[8-(2-hydroxybenzoyl)amino]caprylate — the absorption enhancer used in oral Semaglutide.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "subcutaneous-administration", term: "Subcutaneous Administration",
    short: "Delivery of a drug into the subcutaneous fat, providing slow systemic absorption from the injection depot.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "steady-state", term: "Steady State",
    short: "Pharmacokinetic condition in which drug input rate equals elimination rate — reached after ~5 half-lives of regular dosing.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "receptor-internalisation", term: "Receptor Internalisation",
    short: "Endocytic removal of an activated receptor from the plasma membrane, typically after β-arrestin recruitment.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "desensitisation", term: "Desensitisation",
    short: "Diminished receptor responsiveness during sustained agonist exposure, mediated by phosphorylation and internalisation.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "mace", term: "MACE",
    short: "Major adverse cardiovascular events — composite endpoint of cardiovascular death, non-fatal myocardial infarction and non-fatal stroke.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "dio-model", term: "DIO Model",
    short: "Diet-induced obesity model — rodent (typically mouse or rat) fed a high-fat diet to model obesity and metabolic dysregulation.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "native-glp-1", term: "Native GLP-1",
    short: "Endogenous glucagon-like peptide-1 (GLP-1(7-37) / GLP-1(7-36)amide) — rapidly degraded by DPP-4 in plasma.",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "oral-semaglutide", term: "Oral Semaglutide",
    short: "Oral tablet formulation of Semaglutide co-formulated with the absorption enhancer SNAC (marketed as Rybelsus).",
    relatedCompoundSlugs: ["semaglutide"], populated: true },
  { slug: "semaglutide", term: "Semaglutide",
    short: "Long-acting synthetic GLP-1 receptor agonist derived from GLP-1(7-37) with a C18 fatty-di-acid supporting albumin binding.",
    relatedCompoundSlugs: ["semaglutide"], relatedMechanismIds: ["glp1r"], populated: true },
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
