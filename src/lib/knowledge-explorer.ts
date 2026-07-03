/**
 * Knowledge Explorer helpers — Release 7.0
 *
 * Facets and filter engines that turn the Knowledge Graph into a browsable
 * experience. Every helper is pure: input = graph + facet selection, output =
 * filtered entity list. Explorer routes render UI around these.
 */
import {
  knowledgeGraph,
  getEntity,
  getReferenceCount,
  getRelated,
  getChildren,
  buildPathway,
  type KnowledgeEntity,
  type EntityRef,
  type EntityType,
  type PathwayType,
} from "@/lib/knowledge-graph";
import {
  compoundEntries,
  mechanismGroups,
  compoundFamilies,
  researchAreas,
  type CompoundFamilyId,
  type MechanismGroupId,
  type ResearchAreaId,
} from "@/lib/taxonomy";

// ---------------------------------------------------------------------------
// Evidence level — derived heuristic from graph status. Kept intentionally
// simple until an editorial pipeline populates a real evidence field.
// ---------------------------------------------------------------------------
export type EvidenceLevel = "authoritative" | "reviewed" | "scaffolded";

export function evidenceLevel(e: KnowledgeEntity): EvidenceLevel {
  if (e.status === "populated") {
    return getReferenceCount({ type: e.type, slug: e.slug }) >= 3
      ? "authoritative"
      : "reviewed";
  }
  return "scaffolded";
}

// ---------------------------------------------------------------------------
// Compound Explorer
// ---------------------------------------------------------------------------
export interface CompoundFilters {
  familyId?: CompoundFamilyId;
  mechanismId?: MechanismGroupId;
  areaId?: ResearchAreaId;
  evidence?: EvidenceLevel;
  sort?: "popularity" | "az" | "recent";
}

export interface CompoundExplorerRow {
  slug: string;
  name: string;
  path: string;
  aliases?: readonly string[];
  familyId?: CompoundFamilyId;
  mechanismIds: readonly MechanismGroupId[];
  areaIds: readonly ResearchAreaId[];
  evidence: EvidenceLevel;
  referenceCount: number;
  guideCount: number;
  status: KnowledgeEntity["status"];
  updated?: string;
}

export function compoundExplorer(filters: CompoundFilters = {}): CompoundExplorerRow[] {
  const rows: CompoundExplorerRow[] = compoundEntries.map((c) => {
    const ref: EntityRef = { type: "compound", slug: c.slug };
    const entity = getEntity(ref);
    const guides = getRelated(ref, { type: "guide" });
    return {
      slug: c.slug,
      name: c.name,
      path: `/compounds/${c.slug}`,
      aliases: c.aliases,
      familyId: c.familyId,
      mechanismIds: c.mechanismIds ?? [],
      areaIds: c.areaIds ?? [],
      evidence: entity ? evidenceLevel(entity) : "scaffolded",
      referenceCount: getReferenceCount(ref),
      guideCount: guides.length,
      status: entity?.status ?? "planned",
      updated: entity?.updated,
    };
  });

  const filtered = rows.filter((r) => {
    if (filters.familyId && r.familyId !== filters.familyId) return false;
    if (filters.mechanismId && !r.mechanismIds.includes(filters.mechanismId)) return false;
    if (filters.areaId && !r.areaIds.includes(filters.areaId)) return false;
    if (filters.evidence && r.evidence !== filters.evidence) return false;
    return true;
  });

  const sort = filters.sort ?? "popularity";
  filtered.sort((a, b) => {
    if (sort === "az") return a.name.localeCompare(b.name);
    if (sort === "recent")
      return (b.updated ?? "").localeCompare(a.updated ?? "");
    // popularity: guides then reference count then A-Z
    if (b.guideCount !== a.guideCount) return b.guideCount - a.guideCount;
    if (b.referenceCount !== a.referenceCount)
      return b.referenceCount - a.referenceCount;
    return a.name.localeCompare(b.name);
  });

  return filtered;
}

export const compoundFacets = {
  families: compoundFamilies,
  mechanisms: mechanismGroups,
  areas: researchAreas,
  evidence: [
    { id: "authoritative" as EvidenceLevel, label: "Authoritative" },
    { id: "reviewed" as EvidenceLevel, label: "Reviewed" },
    { id: "scaffolded" as EvidenceLevel, label: "Scaffolded" },
  ],
};

// ---------------------------------------------------------------------------
// Mechanism Explorer
// ---------------------------------------------------------------------------
export interface MechanismFilters {
  receptorClass?: "gpcr" | "kinase" | "other";
  pathway?: "incretin" | "growth" | "melanocortin" | "repair" | "other";
  compoundSlug?: string;
}

export interface MechanismExplorerRow {
  id: MechanismGroupId;
  label: string;
  description: string;
  path: string;
  receptorClass: "gpcr" | "kinase" | "other";
  pathway: "incretin" | "growth" | "melanocortin" | "repair" | "other";
  compoundSlugs: string[];
  guideCount: number;
  methodologySlugs: string[];
  status: KnowledgeEntity["status"];
}

const PATHWAY_MAP: Record<MechanismGroupId, MechanismExplorerRow["pathway"]> = {
  glp1r: "incretin",
  gipr: "incretin",
  gcgr: "incretin",
  ghsr: "growth",
  mcr: "melanocortin",
  "growth-factors": "growth",
  "copper-binding": "repair",
};

const RECEPTOR_CLASS_MAP: Record<
  MechanismGroupId,
  MechanismExplorerRow["receptorClass"]
> = {
  glp1r: "gpcr",
  gipr: "gpcr",
  gcgr: "gpcr",
  ghsr: "gpcr",
  mcr: "gpcr",
  "growth-factors": "kinase",
  "copper-binding": "other",
};

export function mechanismExplorer(
  filters: MechanismFilters = {},
): MechanismExplorerRow[] {
  const rows: MechanismExplorerRow[] = mechanismGroups.map((m) => {
    const ref: EntityRef = { type: "mechanism", slug: m.id };
    const entity = getEntity(ref);
    const compounds = compoundEntries.filter((c) =>
      c.mechanismIds?.includes(m.id),
    );
    const guides = getRelated(ref, { type: "guide" });
    const methodology = getRelated(ref, { type: "methodology" });
    return {
      id: m.id,
      label: m.label,
      description: m.description,
      path: `/research-hub/mechanisms/${m.id}`,
      receptorClass: RECEPTOR_CLASS_MAP[m.id] ?? "other",
      pathway: PATHWAY_MAP[m.id] ?? "other",
      compoundSlugs: compounds.map((c) => c.slug),
      guideCount: guides.length,
      methodologySlugs: methodology.map((x) => x.slug),
      status: entity?.status ?? "scaffold",
    };
  });

  return rows.filter((r) => {
    if (filters.receptorClass && r.receptorClass !== filters.receptorClass)
      return false;
    if (filters.pathway && r.pathway !== filters.pathway) return false;
    if (filters.compoundSlug && !r.compoundSlugs.includes(filters.compoundSlug))
      return false;
    return true;
  });
}

export const mechanismFacets = {
  receptorClasses: [
    { id: "gpcr" as const, label: "G-Protein-Coupled Receptor" },
    { id: "kinase" as const, label: "Kinase / Growth-Factor" },
    { id: "other" as const, label: "Other" },
  ],
  pathways: [
    { id: "incretin" as const, label: "Incretin Signalling" },
    { id: "growth" as const, label: "Growth / Secretagogue" },
    { id: "melanocortin" as const, label: "Melanocortin" },
    { id: "repair" as const, label: "Repair & Chelation" },
    { id: "other" as const, label: "Other" },
  ],
};

// ---------------------------------------------------------------------------
// Explorer index — high-level counts for the Knowledge Explorer landing.
// ---------------------------------------------------------------------------
export interface ExplorerSection {
  key: string;
  title: string;
  description: string;
  href: string;
  count: number;
  entityType?: EntityType;
}

export function explorerSections(): ExplorerSection[] {
  const byType = (t: EntityType) =>
    knowledgeGraph.filter((e) => e.type === t).length;
  return [
    {
      key: "compounds",
      title: "Compounds",
      description: "Browse peptides by family, mechanism, evidence and research application.",
      href: "/explore/compounds",
      count: byType("compound"),
      entityType: "compound",
    },
    {
      key: "mechanisms",
      title: "Mechanisms",
      description: "Explore receptor pathways, signalling classes and the compounds that act on them.",
      href: "/explore/mechanisms",
      count: byType("mechanism"),
      entityType: "mechanism",
    },
    {
      key: "receptors",
      title: "Receptors",
      description: "GPCRs and other receptors referenced in the knowledge graph.",
      href: "/explore/mechanisms?receptorClass=gpcr",
      count: mechanismGroups.length,
    },
    {
      key: "research-areas",
      title: "Research Areas",
      description: "Cross-cutting themes — chemistry, receptor studies, assay development, stability.",
      href: "/research-hub",
      count: byType("research-area"),
      entityType: "research-area",
    },
    {
      key: "methodology",
      title: "Methodology",
      description: "Laboratory procedures for handling and analysing reference material.",
      href: "/research-hub/methodology",
      count: byType("methodology"),
      entityType: "methodology",
    },
    {
      key: "comparisons",
      title: "Comparisons",
      description: "Side-by-side analyses of related compounds.",
      href: "/research-hub/comparisons",
      count: byType("comparison"),
      entityType: "comparison",
    },
    {
      key: "glossary",
      title: "Glossary",
      description: "Canonical definitions of scientific terminology used across the site.",
      href: "/research-hub/glossary",
      count: byType("glossary-term"),
      entityType: "glossary-term",
    },
  ];
}

// ---------------------------------------------------------------------------
// Learning journeys — enriched pathway metadata used by /explore/pathways.
// ---------------------------------------------------------------------------
export interface LearningJourney {
  type: PathwayType;
  title: string;
  audience: string;
  description: string;
  minutes: number;
  steps: KnowledgeEntity[];
}

const JOURNEY_META: Record<
  PathwayType,
  { title: string; audience: string; description: string }
> = {
  beginner: {
    title: "Beginner journey",
    audience: "New to peptide research",
    description:
      "A short orientation across categories, receptor overviews and foundational reading.",
  },
  intermediate: {
    title: "Intermediate journey",
    audience: "Comfortable with receptor pharmacology",
    description:
      "Move from mechanism to compound to laboratory methodology in a single reading path.",
  },
  advanced: {
    title: "Advanced journey",
    audience: "Working with analytical or preparative methods",
    description:
      "Deeper methodology and mechanism-level reading for laboratory practitioners.",
  },
  "compound-focused": {
    title: "Compound-focused journey",
    audience: "Investigating a specific peptide",
    description:
      "Compound monograph → mechanism → handling — the shortest path from identity to method.",
  },
  "mechanism-focused": {
    title: "Mechanism-focused journey",
    audience: "Investigating a receptor pathway",
    description:
      "Start at a receptor and traverse every compound and guide connected to it.",
  },
  "methodology-focused": {
    title: "Methodology-focused journey",
    audience: "Standardising laboratory practice",
    description:
      "Reconstitution, storage, purity and reference procedures in reading order.",
  },
};

export function allPathwayTypes(): PathwayType[] {
  return [
    "beginner",
    "intermediate",
    "advanced",
    "compound-focused",
    "mechanism-focused",
    "methodology-focused",
  ];
}

export function getLearningJourney(
  type: PathwayType,
  opts: { anchor?: EntityRef; limit?: number } = {},
): LearningJourney {
  const steps = buildPathway(type, { anchor: opts.anchor, limit: opts.limit ?? 8 });
  const meta = JOURNEY_META[type];
  return {
    type,
    ...meta,
    minutes: Math.max(6, steps.length * 4),
    steps,
  };
}

export function allLearningJourneys(): LearningJourney[] {
  return allPathwayTypes().map((t) => getLearningJourney(t));
}

// ---------------------------------------------------------------------------
// Visualisation — build a small local graph around an anchor.
// ---------------------------------------------------------------------------
export interface GraphNode {
  ref: EntityRef;
  title: string;
  type: EntityType;
  path?: string;
  role: "anchor" | "parent" | "child" | "related";
}

export interface GraphEdge {
  from: EntityRef;
  to: EntityRef;
  kind: "parent" | "child" | "related";
}

export interface LocalGraph {
  anchor: KnowledgeEntity;
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export function localGraph(anchor: EntityRef, limitPerBucket = 6): LocalGraph | null {
  const entity = getEntity(anchor);
  if (!entity) return null;
  const nodes: GraphNode[] = [
    {
      ref: { type: entity.type, slug: entity.slug },
      title: entity.title,
      type: entity.type,
      path: entity.path,
      role: "anchor",
    },
  ];
  const edges: GraphEdge[] = [];
  const seen = new Set<string>([`${entity.type}::${entity.slug}`]);

  const push = (e: KnowledgeEntity, role: GraphNode["role"], kind: GraphEdge["kind"]) => {
    const key = `${e.type}::${e.slug}`;
    if (seen.has(key)) return;
    seen.add(key);
    nodes.push({ ref: { type: e.type, slug: e.slug }, title: e.title, type: e.type, path: e.path, role });
    edges.push({
      from: kind === "parent" ? { type: e.type, slug: e.slug } : anchor,
      to: kind === "parent" ? anchor : { type: e.type, slug: e.slug },
      kind,
    });
  };

  if (entity.parent) {
    const p = getEntity(entity.parent);
    if (p) push(p, "parent", "parent");
  }
  for (const c of getChildren(anchor).slice(0, limitPerBucket)) {
    push(c, "child", "child");
  }
  for (const r of getRelated(anchor, { limit: limitPerBucket })) {
    push(r, "related", "related");
  }
  return { anchor: entity, nodes, edges };
}
