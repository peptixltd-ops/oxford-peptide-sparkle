/**
 * ============================================================================
 *  Knowledge API — Version 1.0 Finalisation
 * ============================================================================
 *
 *  A single, strongly-typed aggregation layer over every existing knowledge
 *  registry. The API is READ-ONLY and DERIVATION-ONLY — it consumes the
 *  registries below and never duplicates their data:
 *
 *   - taxonomy stubs           → src/lib/taxonomy.ts
 *   - knowledge graph edges    → src/lib/knowledge-graph.ts
 *   - guide content            → src/content/registry.ts
 *   - compound monographs      → src/content/registry.ts
 *   - study content            → src/content/studies-content.tsx
 *   - comparison content       → src/content/comparisons-content.tsx
 *   - glossary content         → src/content/glossary-content.tsx
 *   - study citation graph     → src/lib/study-graph.ts
 *   - study collections        → src/lib/study-collections.ts
 *   - programmes               → src/lib/programmes.ts
 *   - authors/reviewers        → src/lib/editorial/authors.ts + editorial-graph.ts
 *   - figures                  → src/components/publishing/research-figures.tsx
 *   - products                 → src/lib/products.ts
 *
 *  The API is INTERNAL. It is not a public developer API.
 */

import {
  compoundEntries,
  compoundsByMechanism,
  getCompoundEntry,
  getGuide,
  getGlossaryTerm,
  getStudy,
  getComparison,
  guides as taxonomyGuides,
  guidesByCompound,
  guidesByMechanism,
  guidesByArea,
  glossaryTerms,
  studies as studyEntries,
  studiesByCompound,
  studiesByMechanism,
  comparisons as comparisonEntries,
  comparisonsByCompound,
  mechanismGroups,
  researchAreas,
  researchCategories,
  compoundFamilies,
  type CompoundEntry,
  type Guide as GuideStub,
  type GlossaryTerm as GlossaryStub,
  type StudyEntry,
  type ComparisonEntry,
  type MechanismGroup,
  type MechanismGroupId,
} from "@/lib/taxonomy";

import {
  getEntity as getGraphEntity,
  getEntitiesOfType,
  getRelated,
  getReferenceCount,
  compoundRef,
  mechanismRef,
  type EntityRef,
  type EntityType,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

import {
  getCompoundMonographRecord,
  getGuideContent,
} from "@/content/registry";

import { getStudyContent } from "@/content/studies-content";
import { getComparisonContent } from "@/content/comparisons-content";
import { getGlossaryContent } from "@/content/glossary-content";

import {
  studyCitationRecord,
  studiesForCompound,
  studiesForMechanism,
  studiesForArea,
} from "@/lib/study-graph";

import {
  listStudyCollectionViews,
  getStudyCollection,
  buildCollectionView,
} from "@/lib/study-collections";

import {
  programmeDefinitions,
  getProgramme as getProgrammeDefinition,
  buildProgrammeView,
  listProgrammeViews,
  programmePath,
  type ProgrammeDefinition,
  type ProgrammeView,
} from "@/lib/programmes";

import {
  editorialAuthors,
  scientificReviewers,
  getAuthor as getAuthorRecord,
  getReviewer as getReviewerRecord,
  type EditorialAuthor,
  type ScientificReviewer,
} from "@/lib/editorial/authors";

import {
  getAuthorProfile,
  getReviewerProfile,
  authorProfileIds,
  reviewerProfileIds,
  type AuthorProfile,
  type ReviewerProfile,
} from "@/lib/editorial-graph";

import {
  RESEARCH_FIGURE_REGISTRY,
  getFigureAsset,
  getFigureAssetsForEntity,
  type FigureAssetMeta,
} from "@/components/publishing/research-figures";

import { products, getProduct, type Product } from "@/lib/products";

import { allReferences, getReference } from "@/lib/editorial/citations";

// ---------------------------------------------------------------------------
//  Unified type surface
// ---------------------------------------------------------------------------

/**
 * The set of entity kinds exposed by the Knowledge API. Superset of the
 * knowledge-graph `EntityType` so we can also surface figures, programmes,
 * study collections, authors, reviewers, and products through the same
 * `getEntity`/search interface.
 */
export type KnowledgeEntityType =
  | EntityType
  | "study"
  | "figure"
  | "programme"
  | "study-collection"
  | "author"
  | "reviewer"
  | "product"
  | "research-journey";

export interface KnowledgeIdentity {
  /** Discriminator — matches KnowledgeEntityType. */
  type: KnowledgeEntityType;
  /** URL-safe slug (id for authors/reviewers). */
  slug: string;
  /** Human-readable title. */
  title: string;
  /** Optional aliases used by search. */
  aliases?: readonly string[];
  /** Canonical path within the app (when the entity has a dedicated page). */
  path?: string;
}

export interface KnowledgeEditorial {
  updated?: string;
  author?: string;
  reviewer?: string;
  datePublished?: string;
  dateModified?: string;
  populated?: boolean;
}

/**
 * The unified response shape returned by every `get<X>` function.
 *
 * Fields are all optional except identity + type so callers can consume
 * one shape across entities. `raw` exposes the underlying registry record
 * for consumers that need entity-specific data without a second lookup.
 */
export interface KnowledgeEntityResponse<TRaw = unknown> {
  identity: KnowledgeIdentity;
  summary?: string;
  editorial: KnowledgeEditorial;
  graph?: KnowledgeEntity;

  // Relationships (slug references — hydrate via getEntity when needed).
  relationships: {
    compounds: EntityRef[];
    guides: EntityRef[];
    mechanisms: EntityRef[];
    studies: EntityRef[];
    comparisons: EntityRef[];
    glossary: EntityRef[];
    methodology: EntityRef[];
    figures: EntityRef[];
    programmes: EntityRef[];
    products: EntityRef[];
    related: EntityRef[];
  };

  references: string[];
  raw: TRaw;
}

// ---------------------------------------------------------------------------
//  Helpers
// ---------------------------------------------------------------------------

function emptyRelationships(): KnowledgeEntityResponse["relationships"] {
  return {
    compounds: [],
    guides: [],
    mechanisms: [],
    studies: [],
    comparisons: [],
    glossary: [],
    methodology: [],
    figures: [],
    programmes: [],
    products: [],
    related: [],
  };
}

function guideRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => ({ type: "guide" as EntityType, slug }));
}

function compoundRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => compoundRef(slug));
}

function mechanismRefs(ids: readonly MechanismGroupId[] | undefined): EntityRef[] {
  return (ids ?? []).map((id) => mechanismRef(id));
}

function studyRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => ({ type: "study" as KnowledgeEntityType, slug }) as EntityRef);
}

function comparisonRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => ({ type: "comparison" as EntityType, slug }));
}

function glossaryRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => ({ type: "glossary-term" as EntityType, slug }));
}

function methodologyRefs(slugs: readonly string[] | undefined): EntityRef[] {
  return (slugs ?? []).map((slug) => ({ type: "methodology" as EntityType, slug }));
}

function figureRefs(figures: readonly FigureAssetMeta[]): EntityRef[] {
  return figures.map((f) => ({ type: "figure" as KnowledgeEntityType, slug: f.slug }) as EntityRef);
}

function programmesForCompound(compoundSlug: string): EntityRef[] {
  return programmeDefinitions
    .filter((p) => p.compoundSlugs.includes(compoundSlug))
    .map((p) => ({ type: "programme" as KnowledgeEntityType, slug: p.slug }) as EntityRef);
}

function programmesForMechanism(id: MechanismGroupId): EntityRef[] {
  return programmeDefinitions
    .filter((p) => p.mechanismIds.includes(id))
    .map((p) => ({ type: "programme" as KnowledgeEntityType, slug: p.slug }) as EntityRef);
}

function relatedFromGraph(ref: EntityRef): EntityRef[] {
  const entity = getGraphEntity(ref);
  if (!entity) return [];
  return getRelated(ref);
}

// ---------------------------------------------------------------------------
//  Compounds
// ---------------------------------------------------------------------------

export function getCompound(slug: string): KnowledgeEntityResponse<CompoundEntry> | undefined {
  const entry = getCompoundEntry(slug);
  if (!entry) return undefined;
  const monograph = getCompoundMonographRecord(slug);
  const graph = getGraphEntity({ type: "compound", slug });
  const figures = getFigureAssetsForEntity(slug);
  const studies = studiesForCompound(slug);
  return {
    identity: {
      type: "compound",
      slug,
      title: entry.name,
      aliases: entry.aliases,
      path: monograph?.meta.path ?? `/compounds/${slug}`,
    },
    summary: monograph?.meta.shortDescription ?? graph?.description,
    editorial: {
      populated: entry.populated,
      datePublished: monograph?.meta.datePublished,
      dateModified: monograph?.meta.dateModified,
      updated: monograph?.meta.dateModified,
    },
    graph,
    relationships: {
      ...emptyRelationships(),
      guides: guideRefs(entry.guideSlugs),
      mechanisms: mechanismRefs(entry.mechanismIds),
      studies: studies.map((s) => ({ type: "study" as KnowledgeEntityType, slug: s.slug }) as EntityRef),
      comparisons: comparisonsByCompound(slug).map((c) => ({ type: "comparison" as EntityType, slug: c.slug })),
      figures: figureRefs(figures),
      programmes: programmesForCompound(slug),
      products: entry.productSlug
        ? [{ type: "product" as KnowledgeEntityType, slug: entry.productSlug } as EntityRef]
        : [],
      related: graph ? relatedFromGraph({ type: "compound", slug }) : [],
    },
    references: [],
    raw: entry,
  };
}

// ---------------------------------------------------------------------------
//  Guides
// ---------------------------------------------------------------------------

export function getGuideEntity(slug: string): KnowledgeEntityResponse<GuideStub> | undefined {
  const stub = getGuide(slug);
  if (!stub) return undefined;
  const content = getGuideContent(slug);
  const graph = getGraphEntity({ type: "guide", slug });
  return {
    identity: {
      type: "guide",
      slug,
      title: stub.title,
      path: `/research-hub/guides/${slug}`,
    },
    summary: stub.summary ?? graph?.description,
    editorial: {
      populated: stub.populated,
      updated: stub.updated,
      author: stub.author,
      reviewer: stub.reviewer,
    },
    graph,
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(stub.compoundSlugs),
      mechanisms: mechanismRefs(stub.mechanismIds),
      methodology: methodologyRefs(stub.methodologySlugs),
      figures: figureRefs(getFigureAssetsForEntity(slug)),
      related: graph ? relatedFromGraph({ type: "guide", slug }) : [],
    },
    references: [],
    raw: { ...stub, content } as GuideStub,
  };
}

// ---------------------------------------------------------------------------
//  Mechanisms
// ---------------------------------------------------------------------------

export function getMechanism(id: string): KnowledgeEntityResponse<MechanismGroup> | undefined {
  const mech = mechanismGroups.find((m) => m.id === id);
  if (!mech) return undefined;
  const graph = getGraphEntity({ type: "mechanism", slug: id });
  return {
    identity: {
      type: "mechanism",
      slug: id,
      title: mech.label,
      path: `/explore/mechanisms#${id}`,
    },
    summary: mech.description,
    editorial: {},
    graph,
    relationships: {
      ...emptyRelationships(),
      compounds: compoundsByMechanism(mech.id).map((c) => compoundRef(c.slug)),
      guides: guidesByMechanism(mech.id).map((g) => ({ type: "guide" as EntityType, slug: g.slug })),
      studies: studiesForMechanism(mech.id).map(
        (s) => ({ type: "study" as KnowledgeEntityType, slug: s.slug }) as EntityRef,
      ),
      figures: figureRefs(getFigureAssetsForEntity(id)),
      programmes: programmesForMechanism(mech.id),
      related: graph ? relatedFromGraph({ type: "mechanism", slug: id }) : [],
    },
    references: [],
    raw: mech,
  };
}

// ---------------------------------------------------------------------------
//  Studies
// ---------------------------------------------------------------------------

export function getStudyEntity(slug: string): KnowledgeEntityResponse<StudyEntry> | undefined {
  const stub = getStudy(slug);
  if (!stub) return undefined;
  const content = getStudyContent(slug);
  const record = studyCitationRecord(slug);
  return {
    identity: {
      type: "study",
      slug,
      title: stub.title,
      aliases: stub.shortName ? [stub.shortName] : undefined,
      path: `/research-hub/literature/${slug}`,
    },
    summary: stub.summary ?? content?.description,
    editorial: {
      populated: stub.populated,
      updated: stub.updated,
      author: stub.author,
      reviewer: stub.reviewer,
      datePublished: content?.datePublished,
      dateModified: content?.dateModified,
    },
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(stub.compoundSlugs),
      mechanisms: mechanismRefs(stub.mechanismIds),
      guides: guideRefs(stub.guideSlugs),
      studies:
        record?.relatedStudies.map(
          (s) => ({ type: "study" as KnowledgeEntityType, slug: s.slug }) as EntityRef,
        ) ?? [],
      comparisons:
        record?.comparisons.map((c) => ({ type: "comparison" as EntityType, slug: c.slug })) ?? [],
      glossary:
        record?.glossary.map((g) => ({ type: "glossary-term" as EntityType, slug: g.slug })) ?? [],
      methodology:
        record?.methodology.map((m) => ({ type: "methodology" as EntityType, slug: m.slug })) ?? [],
      figures: figureRefs(getFigureAssetsForEntity(slug)),
    },
    references: [stub.doi, stub.pmid].filter((v): v is string => Boolean(v)),
    raw: stub,
  };
}

// ---------------------------------------------------------------------------
//  Glossary
// ---------------------------------------------------------------------------

export function getGlossary(slug: string): KnowledgeEntityResponse<GlossaryStub> | undefined {
  const stub = getGlossaryTerm(slug);
  if (!stub) return undefined;
  const content = getGlossaryContent(slug);
  const graph = getGraphEntity({ type: "glossary-term", slug });
  return {
    identity: {
      type: "glossary-term",
      slug,
      title: stub.term,
      aliases: content?.aliases,
      path: `/research-hub/glossary/${slug}`,
    },
    summary: stub.short,
    editorial: {
      populated: stub.populated,
      datePublished: content?.datePublished,
      dateModified: content?.dateModified,
    },
    graph,
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(stub.relatedCompoundSlugs),
      mechanisms: mechanismRefs(stub.relatedMechanismIds),
      guides: guideRefs(content?.relatedGuideSlugs),
      glossary: glossaryRefs(content?.relatedGlossarySlugs),
      figures: figureRefs(getFigureAssetsForEntity(slug)),
      related: graph ? relatedFromGraph({ type: "glossary-term", slug }) : [],
    },
    references: [],
    raw: stub,
  };
}

// ---------------------------------------------------------------------------
//  Comparisons
// ---------------------------------------------------------------------------

export function getComparisonEntity(
  slug: string,
): KnowledgeEntityResponse<ComparisonEntry> | undefined {
  const stub = getComparison(slug);
  if (!stub) return undefined;
  const content = getComparisonContent(slug);
  const graph = getGraphEntity({ type: "comparison", slug });
  return {
    identity: {
      type: "comparison",
      slug,
      title: stub.title,
      path: `/research-hub/comparisons/${slug}`,
    },
    summary: stub.summary ?? content?.description,
    editorial: {
      populated: stub.populated,
      updated: stub.updated,
      author: stub.author,
      reviewer: stub.reviewer,
      datePublished: content?.datePublished,
      dateModified: content?.dateModified,
    },
    graph,
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(stub.compoundSlugs),
      mechanisms: mechanismRefs(stub.mechanismIds),
      guides: guideRefs(stub.guideSlugs),
      studies: studyRefs(stub.studySlugs),
      figures: figureRefs(getFigureAssetsForEntity(slug)),
      related: graph ? relatedFromGraph({ type: "comparison", slug }) : [],
    },
    references: [],
    raw: stub,
  };
}

// ---------------------------------------------------------------------------
//  Figures
// ---------------------------------------------------------------------------

export function getFigure(slug: string): KnowledgeEntityResponse<FigureAssetMeta> | undefined {
  const meta = getFigureAsset(slug);
  if (!meta) return undefined;
  const compounds: string[] = [];
  const mechanisms: MechanismGroupId[] = [];
  const guides: string[] = [];
  const studies: string[] = [];
  for (const ent of meta.entities) {
    if (getCompoundEntry(ent)) compounds.push(ent);
    else if (mechanismGroups.some((m) => m.id === ent)) mechanisms.push(ent as MechanismGroupId);
    else if (getGuide(ent)) guides.push(ent);
    else if (getStudy(ent)) studies.push(ent);
  }
  return {
    identity: {
      type: "figure",
      slug,
      title: meta.name,
    },
    summary: meta.description,
    editorial: {},
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(compounds),
      mechanisms: mechanismRefs(mechanisms),
      guides: guideRefs(guides),
      studies: studyRefs(studies),
    },
    references: [],
    raw: meta,
  };
}

// ---------------------------------------------------------------------------
//  Programmes
// ---------------------------------------------------------------------------

export function getProgramme(
  slug: string,
): KnowledgeEntityResponse<ProgrammeDefinition> | undefined {
  const def = getProgrammeDefinition(slug);
  if (!def) return undefined;
  const view: ProgrammeView | undefined = buildProgrammeView(slug);
  return {
    identity: {
      type: "programme",
      slug,
      title: def.title,
      path: programmePath(slug),
    },
    summary: def.summary,
    editorial: { updated: def.updated, populated: view?.populated },
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(def.compoundSlugs),
      mechanisms: mechanismRefs(def.mechanismIds),
      guides: view?.guides.map((g) => ({ type: "guide" as EntityType, slug: g.slug })) ?? [],
      studies:
        view?.studies.map(
          (s) => ({ type: "study" as KnowledgeEntityType, slug: s.slug }) as EntityRef,
        ) ?? [],
      comparisons:
        view?.comparisons.map((c) => ({ type: "comparison" as EntityType, slug: c.slug })) ?? [],
      glossary:
        view?.glossary.map((g) => ({ type: "glossary-term" as EntityType, slug: g.slug })) ?? [],
      methodology:
        view?.methodology.map((m) => ({ type: "methodology" as EntityType, slug: m.slug })) ?? [],
    },
    references: [],
    raw: def,
  };
}

// ---------------------------------------------------------------------------
//  Authors / Reviewers
// ---------------------------------------------------------------------------

export function getAuthor(id: string): KnowledgeEntityResponse<EditorialAuthor> | undefined {
  const author = getAuthorRecord(id);
  if (!author) return undefined;
  const profile: AuthorProfile | undefined = getAuthorProfile(id);
  return {
    identity: {
      type: "author",
      slug: id,
      title: author.name,
      path: `/editorial/authors/${id}`,
    },
    summary: author.bio,
    editorial: {},
    relationships: {
      ...emptyRelationships(),
      guides:
        profile?.publications
          .filter((p) => p.type === "guide")
          .map((p) => ({ type: "guide" as EntityType, slug: p.slug })) ?? [],
      studies:
        profile?.publications
          .filter((p) => p.type === "study")
          .map(
            (p) => ({ type: "study" as KnowledgeEntityType, slug: p.slug }) as EntityRef,
          ) ?? [],
      comparisons:
        profile?.publications
          .filter((p) => p.type === "comparison")
          .map((p) => ({ type: "comparison" as EntityType, slug: p.slug })) ?? [],
    },
    references: [],
    raw: author,
  };
}

export function getReviewer(
  id: string,
): KnowledgeEntityResponse<ScientificReviewer> | undefined {
  const reviewer = getReviewerRecord(id);
  if (!reviewer) return undefined;
  const profile: ReviewerProfile | undefined = getReviewerProfile(id);
  return {
    identity: {
      type: "reviewer",
      slug: id,
      title: reviewer.name,
      path: `/editorial/reviewers/${id}`,
    },
    summary: reviewer.bio,
    editorial: {},
    relationships: {
      ...emptyRelationships(),
      guides:
        profile?.publications
          .filter((p) => p.type === "guide")
          .map((p) => ({ type: "guide" as EntityType, slug: p.slug })) ?? [],
      studies:
        profile?.publications
          .filter((p) => p.type === "study")
          .map(
            (p) => ({ type: "study" as KnowledgeEntityType, slug: p.slug }) as EntityRef,
          ) ?? [],
      comparisons:
        profile?.publications
          .filter((p) => p.type === "comparison")
          .map((p) => ({ type: "comparison" as EntityType, slug: p.slug })) ?? [],
    },
    references: [],
    raw: reviewer,
  };
}

// ---------------------------------------------------------------------------
//  Methodology (KG-only)
// ---------------------------------------------------------------------------

export function getMethodology(slug: string): KnowledgeEntityResponse<KnowledgeEntity> | undefined {
  const entity = getGraphEntity({ type: "methodology", slug });
  if (!entity) return undefined;
  return {
    identity: {
      type: "methodology",
      slug,
      title: entity.title,
      aliases: entity.aliases,
      path: entity.path ?? `/research-hub/methodology/${slug}`,
    },
    summary: entity.description,
    editorial: { updated: entity.updated, populated: entity.status === "populated" },
    graph: entity,
    relationships: {
      ...emptyRelationships(),
      figures: figureRefs(getFigureAssetsForEntity(slug)),
      related: relatedFromGraph({ type: "methodology", slug }),
    },
    references: [],
    raw: entity,
  };
}

// ---------------------------------------------------------------------------
//  Research Journeys (study collections)
// ---------------------------------------------------------------------------

export function getResearchJourney(slug: string): KnowledgeEntityResponse | undefined {
  const collection = getStudyCollection(slug);
  if (!collection) return undefined;
  const view = buildCollectionView(slug);
  return {
    identity: {
      type: "research-journey",
      slug,
      title: collection.title,
      path: `/research-hub/collections/${slug}`,
    },
    summary: collection.summary,
    editorial: { updated: collection.updated },
    relationships: {
      ...emptyRelationships(),
      compounds: compoundRefs(collection.compoundSlugs),
      studies:
        view?.studies.map(
          (s) => ({ type: "study" as KnowledgeEntityType, slug: s.slug }) as EntityRef,
        ) ?? [],
      comparisons:
        view?.comparisons.map((c) => ({ type: "comparison" as EntityType, slug: c.slug })) ?? [],
    },
    references: [],
    raw: collection,
  };
}

// ---------------------------------------------------------------------------
//  Unified `getEntity`
// ---------------------------------------------------------------------------

export interface UnifiedEntityRef {
  type: KnowledgeEntityType;
  slug: string;
}

export function getEntity(ref: UnifiedEntityRef): KnowledgeEntityResponse | undefined {
  switch (ref.type) {
    case "compound":
      return getCompound(ref.slug);
    case "guide":
      return getGuideEntity(ref.slug);
    case "mechanism":
      return getMechanism(ref.slug);
    case "study":
      return getStudyEntity(ref.slug);
    case "glossary-term":
      return getGlossary(ref.slug);
    case "comparison":
      return getComparisonEntity(ref.slug);
    case "figure":
      return getFigure(ref.slug);
    case "programme":
      return getProgramme(ref.slug);
    case "study-collection":
    case "research-journey":
      return getResearchJourney(ref.slug);
    case "author":
      return getAuthor(ref.slug);
    case "reviewer":
      return getReviewer(ref.slug);
    case "methodology":
      return getMethodology(ref.slug);
    case "product": {
      const p = getProduct(ref.slug);
      if (!p) return undefined;
      return {
        identity: { type: "product", slug: p.slug, title: p.name, path: `/products/${p.slug}` },
        summary: p.description,
        editorial: {},
        relationships: emptyRelationships(),
        references: [],
        raw: p,
      };
    }
    default: {
      const graph = getGraphEntity({ type: ref.type as EntityType, slug: ref.slug });
      if (!graph) return undefined;
      return {
        identity: {
          type: ref.type,
          slug: ref.slug,
          title: graph.title,
          aliases: graph.aliases,
          path: graph.path,
        },
        summary: graph.description,
        editorial: { updated: graph.updated, populated: graph.status === "populated" },
        graph,
        relationships: {
          ...emptyRelationships(),
          related: getRelated({ type: ref.type as EntityType, slug: ref.slug }),
        },
        references: [],
        raw: graph,
      };
    }
  }
}

// ---------------------------------------------------------------------------
//  Related entities (thin wrapper around KG + registry-derived edges)
// ---------------------------------------------------------------------------

export function getRelatedKnowledge(ref: UnifiedEntityRef): EntityRef[] {
  const response = getEntity(ref);
  if (!response) return [];
  const seen = new Set<string>();
  const out: EntityRef[] = [];
  const buckets = response.relationships;
  const all: EntityRef[] = [
    ...buckets.compounds,
    ...buckets.guides,
    ...buckets.mechanisms,
    ...buckets.studies,
    ...buckets.comparisons,
    ...buckets.glossary,
    ...buckets.methodology,
    ...buckets.figures,
    ...buckets.programmes,
    ...buckets.related,
  ];
  for (const r of all) {
    const key = `${r.type}:${r.slug}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
  }
  return out;
}

// ---------------------------------------------------------------------------
//  Search
// ---------------------------------------------------------------------------

export interface SearchHit {
  identity: KnowledgeIdentity;
  summary?: string;
  score: number;
}

export interface SearchOptions {
  types?: KnowledgeEntityType[];
  limit?: number;
}

interface SearchIndexEntry {
  identity: KnowledgeIdentity;
  summary?: string;
  haystack: string;
}

let searchIndex: SearchIndexEntry[] | null = null;

function pushIndex(index: SearchIndexEntry[], identity: KnowledgeIdentity, summary?: string) {
  const tokens = [identity.title, identity.slug, ...(identity.aliases ?? []), summary ?? ""]
    .join(" ")
    .toLowerCase();
  index.push({ identity, summary, haystack: tokens });
}

function buildSearchIndex(): SearchIndexEntry[] {
  const index: SearchIndexEntry[] = [];
  for (const c of compoundEntries) {
    pushIndex(
      index,
      { type: "compound", slug: c.slug, title: c.name, aliases: c.aliases, path: `/compounds/${c.slug}` },
    );
  }
  for (const g of taxonomyGuides) {
    pushIndex(
      index,
      { type: "guide", slug: g.slug, title: g.title, path: `/research-hub/guides/${g.slug}` },
      g.summary,
    );
  }
  for (const s of studyEntries) {
    pushIndex(
      index,
      {
        type: "study",
        slug: s.slug,
        title: s.title,
        aliases: s.shortName ? [s.shortName] : undefined,
        path: `/research-hub/literature/${s.slug}`,
      },
      s.summary,
    );
  }
  for (const t of glossaryTerms) {
    pushIndex(
      index,
      { type: "glossary-term", slug: t.slug, title: t.term, path: `/research-hub/glossary/${t.slug}` },
      t.short,
    );
  }
  for (const c of comparisonEntries) {
    pushIndex(
      index,
      { type: "comparison", slug: c.slug, title: c.title, path: `/research-hub/comparisons/${c.slug}` },
      c.summary,
    );
  }
  for (const m of mechanismGroups) {
    pushIndex(
      index,
      { type: "mechanism", slug: m.id, title: m.label, path: `/explore/mechanisms#${m.id}` },
      m.description,
    );
  }
  for (const f of RESEARCH_FIGURE_REGISTRY) {
    pushIndex(index, { type: "figure", slug: f.slug, title: f.name }, f.description);
  }
  for (const p of programmeDefinitions) {
    pushIndex(
      index,
      { type: "programme", slug: p.slug, title: p.title, path: programmePath(p.slug) },
      p.summary,
    );
  }
  for (const a of editorialAuthors) {
    pushIndex(
      index,
      { type: "author", slug: a.id, title: a.name, path: `/editorial/authors/${a.id}` },
      a.bio,
    );
  }
  for (const r of scientificReviewers) {
    pushIndex(
      index,
      { type: "reviewer", slug: r.id, title: r.name, path: `/editorial/reviewers/${r.id}` },
      r.bio,
    );
  }
  for (const p of products) {
    pushIndex(
      index,
      { type: "product", slug: p.slug, title: p.name, path: `/products/${p.slug}` },
      p.description,
    );
  }
  for (const view of listStudyCollectionViews()) {
    pushIndex(
      index,
      {
        type: "research-journey",
        slug: view.collection.slug,
        title: view.collection.title,
        path: `/research-hub/collections/${view.collection.slug}`,
      },
      view.collection.summary,
    );
  }
  return index;
}

function getSearchIndex(): SearchIndexEntry[] {
  if (!searchIndex) searchIndex = buildSearchIndex();
  return searchIndex;
}

export function searchKnowledge(query: string, options: SearchOptions = {}): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const { types, limit = 25 } = options;
  const index = getSearchIndex();
  const hits: SearchHit[] = [];
  for (const entry of index) {
    if (types && !types.includes(entry.identity.type)) continue;
    let score = 0;
    let allMatch = true;
    for (const tok of tokens) {
      if (!entry.haystack.includes(tok)) {
        allMatch = false;
        break;
      }
      score += 1;
      if (entry.identity.title.toLowerCase().includes(tok)) score += 3;
      if (entry.identity.slug.includes(tok)) score += 2;
      if (entry.identity.aliases?.some((a) => a.toLowerCase().includes(tok))) score += 2;
    }
    if (!allMatch) continue;
    hits.push({ identity: entry.identity, summary: entry.summary, score });
  }
  hits.sort((a, b) => b.score - a.score);
  return hits.slice(0, limit);
}

// ---------------------------------------------------------------------------
//  List helpers (thin, registry-driven)
// ---------------------------------------------------------------------------

export function listEntities(type: KnowledgeEntityType): KnowledgeIdentity[] {
  return getSearchIndex()
    .filter((e) => e.identity.type === type)
    .map((e) => e.identity);
}

export function knowledgeStats() {
  const index = getSearchIndex();
  const byType: Partial<Record<KnowledgeEntityType, number>> = {};
  for (const entry of index) {
    byType[entry.identity.type] = (byType[entry.identity.type] ?? 0) + 1;
  }
  return {
    total: index.length,
    byType,
    references: allReferences().length,
    programmes: programmeDefinitions.length,
    figures: RESEARCH_FIGURE_REGISTRY.length,
    products: products.length,
  };
}

// ---------------------------------------------------------------------------
//  Re-exports (for callers that want to avoid a second import)
// ---------------------------------------------------------------------------

export {
  // KG
  getGraphEntity,
  getEntitiesOfType,
  getRelated,
  getReferenceCount,
  // programmes
  listProgrammeViews,
  // collections
  listStudyCollectionViews,
  // ids
  authorProfileIds,
  reviewerProfileIds,
  // references
  getReference,
};

// Aliases matching the public API surface requested in the spec.
export {
  getGuideEntity as getGuide,
  getStudyEntity as getStudy,
  getComparisonEntity as getComparison,
};

/* --------------------------------------------------------------------------
 * Silence unused-import warnings for helpers kept in scope for future use
 * without exercising them yet.
 * ------------------------------------------------------------------------ */
void guidesByCompound;
void guidesByArea;
void studiesByCompound;
void studiesByMechanism;
void studiesForArea;
void researchAreas;
void researchCategories;
void compoundFamilies;
