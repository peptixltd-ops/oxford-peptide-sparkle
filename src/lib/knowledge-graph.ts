/**
 * ============================================================================
 *  Knowledge Graph Registry — Release 3.0
 * ============================================================================
 *
 *  The Knowledge Graph is the single source of truth for RELATIONSHIPS between
 *  every educational entity on Oxford Research Peptides. Layouts and
 *  related-content components consume it directly — they never hardcode
 *  relationships or perform their own lookups.
 *
 *  DESIGN RULES
 *  ------------
 *  1. Configuration-driven. Adding a new page = adding a new entity here.
 *     Do NOT edit layouts or related-content components to add new links.
 *  2. Typed. Every entity has a fixed shape (see `KnowledgeEntity`) and every
 *     relationship is an `EntityRef` (type + slug) — no free-form strings.
 *  3. Backwards-compatible with the existing taxonomy (Release 1.2). Where an
 *     entity already exists in `taxonomy.ts` (mechanisms, categories,
 *     compounds), the graph mirrors it rather than replacing it. Taxonomy
 *     remains the source of labels / icons; the graph adds RELATIONSHIPS on
 *     top.
 *  4. Empty until populated. Release 3.0 seeds a minimal set of entities so
 *     the engine works end-to-end. Future releases only ADD entities.
 *
 *  See KNOWLEDGE_GRAPH.md for the full contributor guide.
 */
import {
  researchCategories,
  mechanismGroups,
  compoundEntries,
  compoundFamilies,
  researchAreas,
  glossaryTerms,
  guides as taxonomyGuides,
  type ResearchCategoryId,
  type MechanismGroupId,
} from "@/lib/taxonomy";

// ---------------------------------------------------------------------------
//  Types
// ---------------------------------------------------------------------------

/** Every kind of entity that can appear in the knowledge graph. */
export type EntityType =
  | "category"
  | "compound"
  | "compound-family"
  | "mechanism"
  | "receptor"
  | "pathway"
  | "research-area"
  | "methodology"
  | "comparison"
  | "glossary-term"
  | "literature-review"
  | "guide";

/** Publication status. Drives noindex + "coming soon" affordances. */
export type EntityStatus = "populated" | "scaffold" | "planned";

/**
 * Learning pathway tags. An entity can belong to multiple pathways; the
 * ReadingPathway component filters + orders entities by these tags.
 */
export type PathwayType =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "compound-focused"
  | "mechanism-focused"
  | "methodology-focused";

/**
 * Future schema.org mapping. Not emitted in Release 3.0 — layouts read this
 * flag in a later release when structured data is expanded.
 */
export type SchemaMapping =
  | "Article"
  | "DefinedTerm"
  | "ChemicalSubstance"
  | "MedicalEntity"
  | "FAQPage"
  | "BreadcrumbList";

/** Compact reference to another entity. */
export interface EntityRef {
  type: EntityType;
  slug: string;
}

/** Canonical entity record. */
export interface KnowledgeEntity {
  type: EntityType;
  slug: string;
  title: string;
  description?: string;
  aliases?: readonly string[];

  /** Canonical URL if the entity has its own page. */
  path?: string;

  /** Hierarchy — every entity may have at most one parent. */
  parent?: EntityRef;
  children?: readonly EntityRef[];

  /** Non-hierarchical relationships (siblings, cross-links). */
  related?: readonly EntityRef[];

  /** Publication status. Drives sidebar + noindex behaviour. */
  status: EntityStatus;

  /** ISO date of last meaningful update (drives "recently updated"). */
  updated?: string;

  /**
   * How often this entity is referenced from other entities. Populated at
   * build time by `computeReferenceCounts`; consumers should read it via
   * `getReferenceCount(ref)` rather than trusting the raw field.
   */
  referenceCount?: number;

  /** Marked as foundational reading (drives sidebar section). */
  foundational?: boolean;

  /** Learning pathways this entity participates in. */
  pathwayTags?: readonly PathwayType[];

  /** Future schema.org type mapping (not emitted yet). */
  schemaType?: SchemaMapping;
}

// ---------------------------------------------------------------------------
//  Helpers used to synthesise entries from the existing taxonomy
// ---------------------------------------------------------------------------

const HUB: EntityRef = { type: "category", slug: "research-hub" };
const COMPOUND_ROOT: EntityRef = { type: "category", slug: "compounds" };

function ref(type: EntityType, slug: string): EntityRef {
  return { type, slug };
}

function categoryEntity(c: (typeof researchCategories)[number]): KnowledgeEntity {
  return {
    type: "category",
    slug: c.id,
    title: c.label,
    description: c.description,
    path: c.path,
    parent: HUB,
    related: c.related.map((r) => ref("category", r)),
    status: c.populated ? "populated" : "scaffold",
    schemaType: "BreadcrumbList",
    foundational: c.id === "guides" || c.id === "mechanisms",
    pathwayTags: ["beginner"],
  };
}

function mechanismEntity(m: (typeof mechanismGroups)[number]): KnowledgeEntity {
  return {
    type: "mechanism",
    slug: m.id,
    title: m.label,
    description: m.description,
    path: `/research-hub/mechanisms/${m.id}`,
    parent: ref("category", "mechanisms"),
    status: "scaffold",
    schemaType: "MedicalEntity",
    pathwayTags: ["intermediate", "mechanism-focused"],
  };
}

function familyEntity(f: (typeof compoundFamilies)[number]): KnowledgeEntity {
  return {
    type: "compound-family",
    slug: f.id,
    title: f.label,
    description: f.description,
    parent: COMPOUND_ROOT,
    related: f.mechanismIds.map((m) => ref("mechanism", m)),
    status: "scaffold",
    pathwayTags: ["intermediate"],
  };
}

function areaEntity(a: (typeof researchAreas)[number]): KnowledgeEntity {
  return {
    type: "research-area",
    slug: a.id,
    title: a.label,
    description: a.description,
    parent: HUB,
    status: "scaffold",
    pathwayTags: ["beginner"],
  };
}

function compoundEntity(c: (typeof compoundEntries)[number]): KnowledgeEntity {
  return {
    type: "compound",
    slug: c.slug,
    title: c.name,
    aliases: c.aliases,
    path: `/compounds/${c.slug}`,
    parent: c.familyId
      ? ref("compound-family", c.familyId)
      : COMPOUND_ROOT,
    related: (c.mechanismIds ?? []).map((m) => ref("mechanism", m)),
    status: c.populated ? "populated" : "scaffold",
    schemaType: "ChemicalSubstance",
    pathwayTags: ["intermediate", "compound-focused"],
  };
}

function glossaryEntity(g: (typeof glossaryTerms)[number]): KnowledgeEntity {
  return {
    type: "glossary-term",
    slug: g.slug,
    title: g.term,
    description: g.short,
    path: `/research-hub/glossary/${g.slug}`,
    parent: ref("category", "glossary"),
    related: [
      ...(g.relatedCompoundSlugs ?? []).map((s) => ref("compound", s)),
      ...(g.relatedMechanismIds ?? []).map((m) => ref("mechanism", m)),
    ],
    status: g.populated ? "populated" : "scaffold",
    schemaType: "DefinedTerm",
    pathwayTags: ["beginner"],
  };
}

function guideEntity(g: (typeof taxonomyGuides)[number]): KnowledgeEntity {
  return {
    type: "guide",
    slug: g.slug,
    title: g.title,
    description: g.summary,
    path: `/research-hub/guides/${g.slug}`,
    parent: ref("category", g.categoryId),
    related: [
      ...(g.compoundSlugs ?? []).map((s) => ref("compound", s)),
      ...(g.mechanismIds ?? []).map((m) => ref("mechanism", m)),
      ...(g.methodologySlugs ?? []).map((s) => ref("methodology", s)),
    ],
    updated: g.updated,
    status: g.populated ? "populated" : "scaffold",
    schemaType: "Article",
    pathwayTags: ["intermediate"],
  };
}

// ---------------------------------------------------------------------------
//  Seed entities beyond what taxonomy already provides
// ---------------------------------------------------------------------------

/**
 * A few first-class entities that don't yet live in `taxonomy.ts`. Kept small
 * on purpose — Release 3.0 does not populate the graph, only proves the
 * mechanism works. Future releases add entries here freely.
 */
const seedEntities: readonly KnowledgeEntity[] = [
  {
    type: "category",
    slug: "research-hub",
    title: "Research Hub",
    description: "Top-level educational hub.",
    path: "/research-hub",
    status: "populated",
    foundational: true,
    schemaType: "BreadcrumbList",
  },
  {
    type: "category",
    slug: "compounds",
    title: "Compound Reference",
    description: "Compound monographs and reference standards.",
    path: "/compounds",
    parent: HUB,
    status: "scaffold",
    foundational: true,
    schemaType: "BreadcrumbList",
  },

  // Methodology scaffolds (mirrors scaffolds.tsx).
  {
    type: "methodology",
    slug: "reconstitution",
    title: "Reconstitution",
    description: "Reconstitution methodology guide (scaffold).",
    path: "/research-hub/methodology/reconstitution",
    parent: ref("category", "methodology"),
    status: "scaffold",
    schemaType: "Article",
    pathwayTags: ["beginner", "methodology-focused"],
  },
  {
    type: "methodology",
    slug: "hplc-purity",
    title: "HPLC Purity",
    description: "HPLC purity methodology guide (scaffold).",
    path: "/research-hub/methodology/hplc-purity",
    parent: ref("category", "methodology"),
    status: "scaffold",
    schemaType: "Article",
    pathwayTags: ["advanced", "methodology-focused"],
  },

  // Mechanism scaffold in addition to the taxonomy-mirrored mechanism groups.
  {
    type: "mechanism",
    slug: "glp-1",
    title: "GLP-1 Signalling",
    description: "GLP-1 receptor mechanism overview (scaffold).",
    path: "/research-hub/mechanisms/glp-1",
    parent: ref("category", "mechanisms"),
    related: [ref("compound", "retatrutide")],
    status: "scaffold",
    schemaType: "MedicalEntity",
    pathwayTags: ["intermediate", "mechanism-focused"],
  },
];

// ---------------------------------------------------------------------------
//  Registry assembly
// ---------------------------------------------------------------------------

function buildRegistry(): readonly KnowledgeEntity[] {
  const list: KnowledgeEntity[] = [
    ...seedEntities,
    ...researchCategories.map(categoryEntity),
    ...mechanismGroups.map(mechanismEntity),
    ...compoundFamilies.map(familyEntity),
    ...researchAreas.map(areaEntity),
    ...compoundEntries.map(compoundEntity),
    ...glossaryTerms.map(glossaryEntity),
    ...taxonomyGuides.map(guideEntity),
  ];

  // De-duplicate by (type, slug). Seed entries win over synthesised ones so
  // authors can override taxonomy-derived defaults from the graph itself.
  const seen = new Map<string, KnowledgeEntity>();
  for (const entity of list) {
    const key = `${entity.type}::${entity.slug}`;
    if (!seen.has(key)) seen.set(key, entity);
  }
  return Array.from(seen.values());
}

/** Immutable, deduplicated entity registry. */
export const knowledgeGraph: readonly KnowledgeEntity[] = buildRegistry();

// ---------------------------------------------------------------------------
//  Reference counts — computed once at module load
// ---------------------------------------------------------------------------

const referenceCounts = new Map<string, number>();
for (const entity of knowledgeGraph) {
  for (const r of entity.related ?? []) {
    const key = `${r.type}::${r.slug}`;
    referenceCounts.set(key, (referenceCounts.get(key) ?? 0) + 1);
  }
  for (const c of entity.children ?? []) {
    const key = `${c.type}::${c.slug}`;
    referenceCounts.set(key, (referenceCounts.get(key) ?? 0) + 1);
  }
}

// ---------------------------------------------------------------------------
//  Public query API
// ---------------------------------------------------------------------------

function keyOf(r: EntityRef): string {
  return `${r.type}::${r.slug}`;
}

const byKey = new Map<string, KnowledgeEntity>(
  knowledgeGraph.map((e) => [keyOf(e), e]),
);

/** Look up an entity by type + slug. Returns undefined when missing. */
export function getEntity(r: EntityRef): KnowledgeEntity | undefined {
  return byKey.get(keyOf(r));
}

/** All entities of a given type. */
export function getEntitiesOfType(type: EntityType): KnowledgeEntity[] {
  return knowledgeGraph.filter((e) => e.type === type);
}

/** Direct children of an entity. */
export function getChildren(r: EntityRef): KnowledgeEntity[] {
  const entity = getEntity(r);
  if (!entity) return [];
  const declared = (entity.children ?? [])
    .map((c) => getEntity(c))
    .filter((c): c is KnowledgeEntity => !!c);
  if (declared.length) return declared;
  // Fallback: derive children from any entity declaring this as parent.
  return knowledgeGraph.filter(
    (e) => e.parent && keyOf(e.parent) === keyOf(r),
  );
}

/** Siblings — entities sharing a parent with `r`, excluding `r` itself. */
export function getSiblings(r: EntityRef): KnowledgeEntity[] {
  const entity = getEntity(r);
  if (!entity?.parent) return [];
  return getChildren(entity.parent).filter(
    (e) => !(e.type === r.type && e.slug === r.slug),
  );
}

/** Ancestor chain from root down to the entity's parent. */
export function getAncestors(r: EntityRef): KnowledgeEntity[] {
  const trail: KnowledgeEntity[] = [];
  let cursor = getEntity(r)?.parent;
  const seen = new Set<string>();
  while (cursor && !seen.has(keyOf(cursor))) {
    seen.add(keyOf(cursor));
    const parent = getEntity(cursor);
    if (!parent) break;
    trail.unshift(parent);
    cursor = parent.parent;
  }
  return trail;
}

/**
 * Related entities of a given type (or all types). Uses `related` edges and
 * — for asymmetric cases — reverse lookups (something that references us).
 */
export function getRelated(
  r: EntityRef,
  filter?: { type?: EntityType | readonly EntityType[]; limit?: number },
): KnowledgeEntity[] {
  const entity = getEntity(r);
  if (!entity) return [];

  const declared = (entity.related ?? [])
    .map((rr) => getEntity(rr))
    .filter((e): e is KnowledgeEntity => !!e);

  const inbound = knowledgeGraph.filter((other) =>
    (other.related ?? []).some((rr) => keyOf(rr) === keyOf(r)),
  );

  const merged: KnowledgeEntity[] = [];
  const seen = new Set<string>();
  for (const e of [...declared, ...inbound]) {
    const k = keyOf(e);
    if (seen.has(k)) continue;
    if (e.type === r.type && e.slug === r.slug) continue;
    seen.add(k);
    merged.push(e);
  }

  const types = Array.isArray(filter?.type)
    ? filter?.type
    : filter?.type
      ? [filter.type as EntityType]
      : undefined;

  const filtered = types
    ? merged.filter((e) => types.includes(e.type))
    : merged;

  return filter?.limit ? filtered.slice(0, filter.limit) : filtered;
}

/** Reference count for an entity (inbound edges). */
export function getReferenceCount(r: EntityRef): number {
  return referenceCounts.get(keyOf(r)) ?? 0;
}

/** Most-referenced entities (optionally filtered by type). */
export function getMostReferenced(
  opts: { type?: EntityType; limit?: number } = {},
): KnowledgeEntity[] {
  const pool = opts.type ? getEntitiesOfType(opts.type) : [...knowledgeGraph];
  return pool
    .filter((e) => e.status !== "planned")
    .map((e) => ({ e, count: getReferenceCount({ type: e.type, slug: e.slug }) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, opts.limit ?? 6)
    .map((r) => r.e);
}

/** Recently updated entities (populated only, sorted by ISO `updated`). */
export function getRecentlyUpdated(
  opts: { type?: EntityType; limit?: number } = {},
): KnowledgeEntity[] {
  const pool = opts.type ? getEntitiesOfType(opts.type) : [...knowledgeGraph];
  return pool
    .filter((e) => e.status === "populated" && !!e.updated)
    .sort((a, b) => (a.updated! < b.updated! ? 1 : -1))
    .slice(0, opts.limit ?? 6);
}

/** Foundational entities (marked in the registry). */
export function getFoundational(limit = 6): KnowledgeEntity[] {
  return knowledgeGraph.filter((e) => e.foundational).slice(0, limit);
}

/**
 * Build a learning pathway from the graph. Filters entities by pathway tag
 * and returns them in a stable order suitable for the ReadingPathway UI.
 */
export function buildPathway(
  pathway: PathwayType,
  opts: { anchor?: EntityRef; limit?: number } = {},
): KnowledgeEntity[] {
  const inTag = knowledgeGraph.filter((e) =>
    (e.pathwayTags ?? []).includes(pathway),
  );

  // Anchor bias: when an anchor entity is provided, prioritise entities in
  // the same subtree (ancestors, siblings, direct related).
  if (opts.anchor) {
    const anchorKey = keyOf(opts.anchor);
    const relatedKeys = new Set([
      anchorKey,
      ...getAncestors(opts.anchor).map((e) => keyOf({ type: e.type, slug: e.slug })),
      ...getSiblings(opts.anchor).map((e) => keyOf({ type: e.type, slug: e.slug })),
      ...getRelated(opts.anchor).map((e) => keyOf({ type: e.type, slug: e.slug })),
    ]);
    inTag.sort((a, b) => {
      const aRel = relatedKeys.has(keyOf({ type: a.type, slug: a.slug })) ? 0 : 1;
      const bRel = relatedKeys.has(keyOf({ type: b.type, slug: b.slug })) ? 0 : 1;
      return aRel - bRel;
    });
  }

  // Prefer a canonical ordering: category → mechanism → compound → methodology
  // → comparison → guide → glossary-term.
  const rank: Record<EntityType, number> = {
    category: 0,
    "research-area": 1,
    "compound-family": 2,
    mechanism: 3,
    receptor: 4,
    pathway: 5,
    compound: 6,
    methodology: 7,
    comparison: 8,
    guide: 9,
    "literature-review": 10,
    "glossary-term": 11,
  };
  inTag.sort((a, b) => rank[a.type] - rank[b.type]);

  return inTag.slice(0, opts.limit ?? 6);
}

// ---------------------------------------------------------------------------
//  Legacy adapters — keep existing components working without churn
// ---------------------------------------------------------------------------

/** Adapt a `ResearchCategoryId` to an `EntityRef`. */
export function categoryRef(id: ResearchCategoryId): EntityRef {
  return { type: "category", slug: id };
}

/** Adapt a `MechanismGroupId` to an `EntityRef`. */
export function mechanismRef(id: MechanismGroupId): EntityRef {
  return { type: "mechanism", slug: id };
}

/** Adapt a compound slug to an `EntityRef`. */
export function compoundRef(slug: string): EntityRef {
  return { type: "compound", slug };
}
