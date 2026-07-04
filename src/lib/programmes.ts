/**
 * ============================================================================
 *  Scientific Programme Registry — Authority Sprint 4.0
 * ============================================================================
 *
 *  Five overarching scientific research programmes. Each programme is a
 *  configuration record — its contents are derived at read time from the
 *  taxonomy + knowledge graph (compounds, mechanisms, studies, glossary,
 *  methodology, reading pathways). No educational copy is duplicated.
 */

import {
  compoundEntries,
  comparisons,
  glossaryTerms,
  guides,
  mechanismGroups,
  researchAreas,
  studies,
  type ComparisonEntry,
  type CompoundEntry,
  type GlossaryTerm,
  type Guide,
  type MechanismGroup,
  type MechanismGroupId,
  type ResearchArea,
  type ResearchAreaId,
  type StudyEntry,
} from "@/lib/taxonomy";
import {
  getEntitiesOfType,
  getRelated,
  compoundRef,
  type KnowledgeEntity,
  type PathwayType,
} from "@/lib/knowledge-graph";

export interface ProgrammeDefinition {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  compoundSlugs: readonly string[];
  mechanismIds: readonly MechanismGroupId[];
  areaIds?: readonly ResearchAreaId[];
  glossarySlugs?: readonly string[];
  pathways?: readonly PathwayType[];
  updated: string;
}

export const programmeDefinitions: readonly ProgrammeDefinition[] = [
  {
    slug: "incretin-biology",
    title: "Incretin Biology",
    eyebrow: "PROGRAMME · METABOLIC",
    summary:
      "Research programme covering the incretin axis: GLP-1, GIP and glucagon receptor pharmacology, mono / dual / triple agonist chemistry, and the landmark clinical evidence base.",
    compoundSlugs: ["semaglutide", "tirzepatide", "retatrutide"],
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    areaIds: ["receptor-studies", "peptide-chemistry"],
    pathways: ["compound-focused", "mechanism-focused"],
    updated: "2026-11-01",
  },
  {
    slug: "tissue-repair",
    title: "Tissue Repair",
    eyebrow: "PROGRAMME · REPAIR & REGENERATION",
    summary:
      "Research programme covering tissue-repair peptides — angiogenesis, gastroprotection, tendon/ligament healing and cytoprotective signalling.",
    compoundSlugs: ["bpc-157"],
    mechanismIds: [],
    areaIds: ["specialty-compounds"],
    pathways: ["compound-focused"],
    updated: "2026-11-01",
  },
  {
    slug: "growth-hormone-axis",
    title: "Growth Hormone Axis",
    eyebrow: "PROGRAMME · ENDOCRINE",
    summary:
      "Research programme covering growth-hormone-secretagogue peptides and the ghrelin / GHRH signalling axis. Scaffolded pending compound population.",
    compoundSlugs: [],
    mechanismIds: [],
    areaIds: ["receptor-studies"],
    pathways: ["mechanism-focused"],
    updated: "2026-11-01",
  },
  {
    slug: "cognitive-peptides",
    title: "Cognitive Peptides",
    eyebrow: "PROGRAMME · NEUROSCIENCE",
    summary:
      "Research programme covering cognitive and neurotrophic peptide signalling. Scaffolded pending compound population.",
    compoundSlugs: [],
    mechanismIds: [],
    areaIds: ["receptor-studies"],
    pathways: ["mechanism-focused"],
    updated: "2026-11-01",
  },
  {
    slug: "longevity-mitochondrial-biology",
    title: "Longevity & Mitochondrial Biology",
    eyebrow: "PROGRAMME · LONGEVITY",
    summary:
      "Research programme covering mitochondrial-targeted peptides, senescence signalling and longevity biology. Scaffolded pending compound population.",
    compoundSlugs: [],
    mechanismIds: [],
    areaIds: ["specialty-compounds"],
    pathways: ["mechanism-focused"],
    updated: "2026-11-01",
  },
];

export function getProgramme(slug: string): ProgrammeDefinition | undefined {
  return programmeDefinitions.find((p) => p.slug === slug);
}

export function programmePath(slug: string): string {
  return `/research-hub/programmes/${slug}`;
}

// ---------------------------------------------------------------------------
//  Derived programme view — auto-populated from KG + taxonomy
// ---------------------------------------------------------------------------

export interface ProgrammeView {
  programme: ProgrammeDefinition;
  path: string;
  populated: boolean;
  compounds: readonly CompoundEntry[];
  mechanisms: readonly MechanismGroup[];
  areas: readonly ResearchArea[];
  studies: readonly StudyEntry[];
  comparisons: readonly ComparisonEntry[];
  guides: readonly Guide[];
  glossary: readonly GlossaryTerm[];
  methodology: readonly KnowledgeEntity[];
}

export function buildProgrammeView(slug: string): ProgrammeView | undefined {
  const p = getProgramme(slug);
  if (!p) return undefined;

  const compoundSet = new Set(p.compoundSlugs);
  const mechanismSet = new Set(p.mechanismIds);
  const areaSet = new Set(p.areaIds ?? []);

  const cs = compoundEntries.filter((c) => compoundSet.has(c.slug));
  const ms = mechanismGroups.filter((m) => mechanismSet.has(m.id));
  const as = researchAreas.filter((a) => areaSet.has(a.id));

  const ss = studies.filter(
    (s) =>
      s.compoundSlugs.some((c) => compoundSet.has(c)) ||
      (s.mechanismIds ?? []).some((m) => mechanismSet.has(m)),
  );

  const cmps = comparisons.filter((c) =>
    c.compoundSlugs.some((cc) => compoundSet.has(cc)),
  );

  const gs = guides.filter(
    (g) =>
      (g.compoundSlugs ?? []).some((c) => compoundSet.has(c)) ||
      (g.mechanismIds ?? []).some((m) => mechanismSet.has(m)),
  );

  const glossary = glossaryTerms.filter(
    (t) =>
      (t.relatedCompoundSlugs ?? []).some((c) => compoundSet.has(c)) ||
      (t.relatedMechanismIds ?? []).some((m) => mechanismSet.has(m)),
  );

  const methodology: KnowledgeEntity[] = [];
  const seen = new Set<string>();
  for (const c of cs) {
    for (const m of getRelated(compoundRef(c.slug), { type: "methodology" })) {
      const key = `${m.type}::${m.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      methodology.push(m);
    }
  }

  return {
    programme: p,
    path: programmePath(p.slug),
    populated: cs.length > 0,
    compounds: cs,
    mechanisms: ms,
    areas: as,
    studies: ss,
    comparisons: cmps,
    guides: gs,
    glossary,
    methodology,
  };
}

export function listProgrammeViews(): ProgrammeView[] {
  return programmeDefinitions
    .map((p) => buildProgrammeView(p.slug))
    .filter((v): v is ProgrammeView => !!v);
}

// Silence unused-import warnings when future editors add filters.
void getEntitiesOfType;
