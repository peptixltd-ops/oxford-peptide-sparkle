/**
 * ============================================================================
 *  Topic Cluster Engine — Release 5.0
 * ============================================================================
 *
 *  A Topic Cluster is a semantically-related group of pages built around a
 *  single compound (or, in future, mechanism / research area). Every cluster
 *  is DERIVED from the Knowledge Graph — this file adds no new content and
 *  no new relationships. It:
 *
 *   1. Declares the STRUCTURE every cluster must have (pillar, compound
 *      monograph, mechanisms, methodology, storage, reconstitution,
 *      comparisons, FAQ, glossary, research applications, references,
 *      related compounds, product page).
 *   2. Provides a REGISTRY that turns every populated compound into a
 *      cluster automatically. Adding a new compound to `taxonomy.ts` +
 *      linking it in the knowledge graph produces a new cluster with zero
 *      extra wiring here.
 *   3. Exposes a COMPLETENESS ENGINE that scores each cluster and lists
 *      what is missing — used by the editorial dashboard.
 *   4. Exposes GOVERNANCE utilities that flag orphaned pages, broken
 *      relationships, missing parents, duplicate entities, etc.
 *   5. Derives CLUSTER NAVIGATION (breadcrumbs, next-reading, related
 *      clusters) from the same registry.
 *
 *  Nothing in here ships to end users on its own — cluster metadata /
 *  navigation is rendered by the components in
 *  `src/components/knowledge/cluster-*.tsx`. The `/dashboard/editorial`
 *  route consumes the completeness + governance output.
 */

import {
  compoundEntries,
  glossaryTerms,
  guides as taxonomyGuides,
  mechanismGroups,
  type CompoundEntry,
  type MechanismGroupId,
} from "@/lib/taxonomy";
import {
  compoundRef,
  getEntity,
  getRelated,
  knowledgeGraph,
  type EntityRef,
  type EntityType,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";
import { products } from "@/lib/products";

// ---------------------------------------------------------------------------
//  Cluster slot taxonomy
// ---------------------------------------------------------------------------

/**
 * A cluster slot is a required *conceptual role* in a topic cluster. The
 * engine picks the concrete entity (or entities) that fills each slot from
 * the Knowledge Graph.
 */
export type ClusterSlotId =
  | "pillar"
  | "compound"
  | "mechanisms"
  | "methodology"
  | "storage"
  | "reconstitution"
  | "comparisons"
  | "faq"
  | "glossary"
  | "research-applications"
  | "references"
  | "related-compounds"
  | "product";

export interface ClusterSlot {
  id: ClusterSlotId;
  label: string;
  /** Slots the completeness engine treats as required (score-affecting). */
  required: boolean;
  /** Which knowledge-graph entity types can fill this slot. */
  entityTypes: readonly EntityType[];
  description: string;
}

export const clusterSlots: readonly ClusterSlot[] = [
  {
    id: "pillar",
    label: "Pillar page",
    required: true,
    entityTypes: ["category", "compound-family"],
    description:
      "Top-of-cluster authoritative overview (the compound family or research-hub category the compound belongs to).",
  },
  {
    id: "compound",
    label: "Compound monograph",
    required: true,
    entityTypes: ["compound"],
    description: "The compound reference page itself.",
  },
  {
    id: "mechanisms",
    label: "Mechanism pages",
    required: true,
    entityTypes: ["mechanism", "receptor", "pathway"],
    description: "Mechanism, receptor and pathway pages linked to the compound.",
  },
  {
    id: "methodology",
    label: "Methodology",
    required: true,
    entityTypes: ["methodology"],
    description:
      "Laboratory procedures relevant to the compound (HPLC, MS, storage, etc.).",
  },
  {
    id: "storage",
    label: "Storage guide",
    required: false,
    entityTypes: ["methodology", "guide"],
    description: "Storage / stability guidance page.",
  },
  {
    id: "reconstitution",
    label: "Reconstitution guide",
    required: false,
    entityTypes: ["methodology", "guide"],
    description: "Reconstitution guidance page.",
  },
  {
    id: "comparisons",
    label: "Comparisons",
    required: true,
    entityTypes: ["comparison"],
    description: "Head-to-head comparisons with related compounds.",
  },
  {
    id: "faq",
    label: "FAQ",
    required: true,
    entityTypes: ["guide"],
    description: "Compound-specific FAQ (guide tagged with the compound).",
  },
  {
    id: "glossary",
    label: "Glossary terms",
    required: true,
    entityTypes: ["glossary-term"],
    description: "Glossary entries related to the compound.",
  },
  {
    id: "research-applications",
    label: "Research applications",
    required: false,
    entityTypes: ["research-area"],
    description: "Research areas that reference the compound.",
  },
  {
    id: "references",
    label: "Reference base",
    required: true,
    entityTypes: ["literature-review", "guide"],
    description: "At least one literature review or citation-bearing guide.",
  },
  {
    id: "related-compounds",
    label: "Related compounds",
    required: false,
    entityTypes: ["compound"],
    description: "Other compounds in the same family or mechanism.",
  },
  {
    id: "product",
    label: "Product page",
    required: false,
    entityTypes: [],
    description: "The commercial product page for the compound.",
  },
];

const slotById = new Map<ClusterSlotId, ClusterSlot>(
  clusterSlots.map((s) => [s.id, s]),
);

// ---------------------------------------------------------------------------
//  Cluster data model
// ---------------------------------------------------------------------------

export interface ClusterSlotFill {
  slot: ClusterSlot;
  /** Populated entities for this slot. */
  entities: KnowledgeEntity[];
  /** Whether the slot is considered filled for completeness purposes. */
  filled: boolean;
}

export interface TopicCluster {
  /** Canonical id — matches the compound slug. */
  id: string;
  /** Human title (compound name). */
  title: string;
  /** Anchor entity — the compound the cluster is built around. */
  anchor: EntityRef;
  /** Cluster description derived from the compound entity. */
  description: string;
  /** Canonical URL (compound page). */
  path: string;
  /** Pillar entity (family or category), used for breadcrumbs. */
  pillar?: KnowledgeEntity;
  /** Slot-by-slot fills. */
  slots: readonly ClusterSlotFill[];
  /** Optional link to the commercial product. */
  productSlug?: string;
  /** Cluster status derived from the anchor entity. */
  status: KnowledgeEntity["status"];
}

// ---------------------------------------------------------------------------
//  Registry — one cluster per compound
// ---------------------------------------------------------------------------

function unique<T extends { type: string; slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  const out: T[] = [];
  for (const it of items) {
    const k = `${it.type}::${it.slug}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(it);
  }
  return out;
}

function slotFillsForCompound(
  compound: CompoundEntry,
  compoundEntity: KnowledgeEntity,
): ClusterSlotFill[] {
  const anchor = compoundRef(compound.slug);
  const related = getRelated(anchor);
  const relatedByType = (types: readonly EntityType[]): KnowledgeEntity[] =>
    unique(related.filter((e) => types.includes(e.type)));

  // Same-family compound siblings.
  const familyEntity = compoundEntity.parent
    ? getEntity(compoundEntity.parent)
    : undefined;
  const familySiblings: KnowledgeEntity[] =
    familyEntity && familyEntity.type === "compound-family"
      ? knowledgeGraph
          .filter(
            (e) =>
              e.type === "compound" &&
              e.slug !== compound.slug &&
              e.parent?.type === "compound-family" &&
              e.parent.slug === familyEntity.slug,
          )
          .slice(0, 8)
      : [];

  // Compound-specific guides (via taxonomy) — resolve to graph entities.
  const compoundGuides = taxonomyGuides
    .filter((g) => g.compoundSlugs?.includes(compound.slug))
    .map((g) => getEntity({ type: "guide", slug: g.slug }))
    .filter((e): e is KnowledgeEntity => !!e);

  const faqGuides = compoundGuides.filter((g) => /faq/i.test(g.title));
  const storageGuides = compoundGuides.filter((g) =>
    /storage|stability/i.test(g.title),
  );
  const reconstitutionGuides = compoundGuides.filter((g) =>
    /reconstit/i.test(g.title),
  );

  // Glossary terms explicitly linked to compound.
  const glossary = glossaryTerms
    .filter((t) => t.relatedCompoundSlugs?.includes(compound.slug))
    .map((t) => getEntity({ type: "glossary-term", slug: t.slug }))
    .filter((e): e is KnowledgeEntity => !!e);

  const pillarEntity = familyEntity ?? getEntity({ type: "category", slug: "compounds" });

  return clusterSlots.map((slot): ClusterSlotFill => {
    let entities: KnowledgeEntity[] = [];
    switch (slot.id) {
      case "pillar":
        entities = pillarEntity ? [pillarEntity] : [];
        break;
      case "compound":
        entities = [compoundEntity];
        break;
      case "mechanisms":
        entities = relatedByType(["mechanism", "receptor", "pathway"]);
        break;
      case "methodology":
        entities = relatedByType(["methodology"]);
        break;
      case "storage":
        entities = storageGuides;
        break;
      case "reconstitution":
        entities = reconstitutionGuides;
        break;
      case "comparisons":
        entities = relatedByType(["comparison"]);
        break;
      case "faq":
        entities = faqGuides;
        break;
      case "glossary":
        entities = glossary;
        break;
      case "research-applications":
        entities = relatedByType(["research-area"]);
        break;
      case "references":
        entities = [
          ...relatedByType(["literature-review"]),
          ...compoundGuides.filter((g) => g.status === "populated"),
        ];
        entities = unique(entities);
        break;
      case "related-compounds":
        entities = familySiblings;
        break;
      case "product":
        entities = [];
        break;
    }
    const filled =
      slot.id === "product"
        ? !!compound.productSlug &&
          products.some((p) => p.slug === compound.productSlug)
        : entities.some((e) => e.status === "populated") ||
          (slot.id === "compound" && compoundEntity.status === "populated");
    return { slot, entities, filled };
  });
}

function buildClusterFromCompound(compound: CompoundEntry): TopicCluster | null {
  const anchor = compoundRef(compound.slug);
  const compoundEntity = getEntity(anchor);
  if (!compoundEntity) return null;

  const slots = slotFillsForCompound(compound, compoundEntity);
  const pillarFill = slots.find((s) => s.slot.id === "pillar");
  const pillar = pillarFill?.entities[0];

  const description =
    compoundEntity.description ??
    `Topic cluster covering ${compound.name}: mechanism, methodology, comparisons and references.`;

  return {
    id: compound.slug,
    title: compound.name,
    anchor,
    description,
    path: compoundEntity.path ?? `/compounds/${compound.slug}`,
    pillar,
    slots,
    productSlug: compound.productSlug,
    status: compoundEntity.status,
  };
}

/** Immutable registry of clusters, one per compound entry. */
export const topicClusters: readonly TopicCluster[] = compoundEntries
  .map(buildClusterFromCompound)
  .filter((c): c is TopicCluster => !!c);

const clusterById = new Map<string, TopicCluster>(
  topicClusters.map((c) => [c.id, c]),
);

/** Look up a cluster by compound slug. */
export function getCluster(id: string): TopicCluster | undefined {
  return clusterById.get(id);
}

/** All clusters (optionally filtered by status). */
export function listClusters(opts: { status?: KnowledgeEntity["status"] } = {}): TopicCluster[] {
  return topicClusters.filter((c) => (opts.status ? c.status === opts.status : true));
}

// ---------------------------------------------------------------------------
//  Completeness engine
// ---------------------------------------------------------------------------

export interface ClusterCompleteness {
  clusterId: string;
  totalSlots: number;
  requiredSlots: number;
  filledRequired: number;
  filledOptional: number;
  totalPages: number;
  populatedPages: number;
  missingSlots: ClusterSlot[];
  missingGlossary: boolean;
  missingMethodology: boolean;
  missingComparisons: boolean;
  missingReferences: boolean;
  missingParent: boolean;
  internalLinkCompleteness: number; // 0..1
  entityCoverage: number; // 0..1
  score: number; // 0..100
}

function pagesInCluster(c: TopicCluster): KnowledgeEntity[] {
  const set = new Map<string, KnowledgeEntity>();
  for (const s of c.slots) {
    for (const e of s.entities) {
      set.set(`${e.type}::${e.slug}`, e);
    }
  }
  return Array.from(set.values());
}

export function computeCompleteness(c: TopicCluster): ClusterCompleteness {
  const requiredSlots = c.slots.filter((s) => s.slot.required);
  const optionalSlots = c.slots.filter((s) => !s.slot.required);
  const filledRequired = requiredSlots.filter((s) => s.filled).length;
  const filledOptional = optionalSlots.filter((s) => s.filled).length;
  const missingSlots = c.slots.filter((s) => s.slot.required && !s.filled).map((s) => s.slot);

  const pages = pagesInCluster(c);
  const populatedPages = pages.filter((p) => p.status === "populated").length;

  // Internal link completeness — fraction of pages that reference at least
  // one other page in the same cluster.
  const clusterKeys = new Set(pages.map((p) => `${p.type}::${p.slug}`));
  const linked = pages.filter((p) =>
    (p.related ?? []).some((r) => clusterKeys.has(`${r.type}::${r.slug}`)),
  ).length;
  const internalLinkCompleteness = pages.length ? linked / pages.length : 0;

  // Entity coverage — fraction of the compound's declared mechanism ids that
  // resolved to a real graph entity.
  const compound = compoundEntries.find((cc) => cc.slug === c.id);
  const declared: MechanismGroupId[] = compound?.mechanismIds
    ? [...compound.mechanismIds]
    : [];
  const resolved = declared.filter((m) => !!getEntity({ type: "mechanism", slug: m })).length;
  const entityCoverage = declared.length ? resolved / declared.length : 1;

  const requiredScore = requiredSlots.length
    ? (filledRequired / requiredSlots.length) * 70
    : 70;
  const optionalScore = optionalSlots.length
    ? (filledOptional / optionalSlots.length) * 15
    : 15;
  const linkScore = internalLinkCompleteness * 10;
  const entityScore = entityCoverage * 5;

  return {
    clusterId: c.id,
    totalSlots: c.slots.length,
    requiredSlots: requiredSlots.length,
    filledRequired,
    filledOptional,
    totalPages: pages.length,
    populatedPages,
    missingSlots,
    missingGlossary: !c.slots.find((s) => s.slot.id === "glossary")!.filled,
    missingMethodology: !c.slots.find((s) => s.slot.id === "methodology")!.filled,
    missingComparisons: !c.slots.find((s) => s.slot.id === "comparisons")!.filled,
    missingReferences: !c.slots.find((s) => s.slot.id === "references")!.filled,
    missingParent: !c.pillar,
    internalLinkCompleteness,
    entityCoverage,
    score: Math.round(requiredScore + optionalScore + linkScore + entityScore),
  };
}

// ---------------------------------------------------------------------------
//  Navigation derivations
// ---------------------------------------------------------------------------

export interface ClusterBreadcrumb {
  label: string;
  href?: string;
}

export function clusterBreadcrumbs(c: TopicCluster): ClusterBreadcrumb[] {
  const trail: ClusterBreadcrumb[] = [{ label: "Home", href: "/" }];
  trail.push({ label: "Research Hub", href: "/research-hub" });
  if (c.pillar) {
    trail.push({
      label: c.pillar.title,
      href: c.pillar.path,
    });
  } else {
    trail.push({ label: "Compounds", href: "/compounds" });
  }
  trail.push({ label: c.title, href: c.path });
  return trail;
}

export function clusterMetadata(c: TopicCluster) {
  return {
    title: `${c.title} — Topic cluster`,
    description: c.description,
    canonical: c.path,
    breadcrumb: clusterBreadcrumbs(c),
  } as const;
}

export interface ClusterNavigation {
  cluster: TopicCluster;
  currentEntity?: KnowledgeEntity;
  parent?: KnowledgeEntity;
  siblingsInSlot: KnowledgeEntity[];
  nextReading?: KnowledgeEntity;
  relatedClusters: TopicCluster[];
}

/** Locate the cluster + slot for a given entity, if any. */
export function findClusterFor(ref: EntityRef): TopicCluster | undefined {
  return topicClusters.find((c) =>
    c.slots.some((s) => s.entities.some((e) => e.type === ref.type && e.slug === ref.slug)),
  );
}

export function clusterNavigationFor(ref: EntityRef): ClusterNavigation | undefined {
  const cluster = findClusterFor(ref);
  if (!cluster) return undefined;
  const currentEntity = getEntity(ref);
  const parent = cluster.pillar;

  const slotContaining = cluster.slots.find((s) =>
    s.entities.some((e) => e.type === ref.type && e.slug === ref.slug),
  );
  const siblingsInSlot = slotContaining
    ? slotContaining.entities.filter((e) => !(e.type === ref.type && e.slug === ref.slug))
    : [];

  // Suggested next reading: pick the first populated entity from the next
  // required slot after the current one.
  const orderedSlotIds: ClusterSlotId[] = [
    "pillar",
    "compound",
    "mechanisms",
    "methodology",
    "reconstitution",
    "storage",
    "comparisons",
    "research-applications",
    "faq",
    "glossary",
    "references",
    "related-compounds",
  ];
  let nextReading: KnowledgeEntity | undefined;
  const currentIdx = slotContaining
    ? orderedSlotIds.indexOf(slotContaining.slot.id)
    : -1;
  for (let i = currentIdx + 1; i < orderedSlotIds.length; i += 1) {
    const slot = cluster.slots.find((s) => s.slot.id === orderedSlotIds[i]);
    const populated = slot?.entities.find((e) => e.status === "populated" && e.path);
    if (populated) {
      nextReading = populated;
      break;
    }
  }

  // Related clusters: other compounds in the same family / mechanism.
  const compound = compoundEntries.find((cc) => cc.slug === cluster.id);
  const related = topicClusters.filter((other) => {
    if (other.id === cluster.id) return false;
    const otherCompound = compoundEntries.find((cc) => cc.slug === other.id);
    if (!otherCompound) return false;
    if (compound?.familyId && otherCompound.familyId === compound.familyId) return true;
    return (compound?.mechanismIds ?? []).some((m) =>
      otherCompound.mechanismIds?.includes(m),
    );
  });

  return {
    cluster,
    currentEntity,
    parent,
    siblingsInSlot,
    nextReading,
    relatedClusters: related,
  };
}

// ---------------------------------------------------------------------------
//  Governance — issues surfaced in the editorial dashboard
// ---------------------------------------------------------------------------

export type GovernanceSeverity = "error" | "warning" | "info";

export interface GovernanceIssue {
  severity: GovernanceSeverity;
  code:
    | "orphaned-page"
    | "broken-relationship"
    | "missing-internal-links"
    | "missing-parent"
    | "duplicate-topic"
    | "duplicate-entity";
  message: string;
  entity?: EntityRef;
  clusterId?: string;
}

export function runGovernance(): GovernanceIssue[] {
  const issues: GovernanceIssue[] = [];

  // Duplicate entities (same type + slug).
  const seenKeys = new Map<string, number>();
  for (const e of knowledgeGraph) {
    const k = `${e.type}::${e.slug}`;
    seenKeys.set(k, (seenKeys.get(k) ?? 0) + 1);
  }
  for (const [k, n] of seenKeys) {
    if (n > 1) {
      const [type, slug] = k.split("::") as [EntityType, string];
      issues.push({
        severity: "error",
        code: "duplicate-entity",
        message: `Duplicate entity ${k} appears ${n}× in the graph.`,
        entity: { type, slug },
      });
    }
  }

  // Duplicate topic titles (same title, different slugs, same type).
  const byTypeTitle = new Map<string, EntityRef[]>();
  for (const e of knowledgeGraph) {
    const k = `${e.type}::${e.title.toLowerCase().trim()}`;
    const list = byTypeTitle.get(k) ?? [];
    list.push({ type: e.type, slug: e.slug });
    byTypeTitle.set(k, list);
  }
  for (const [k, refs] of byTypeTitle) {
    if (refs.length > 1) {
      issues.push({
        severity: "warning",
        code: "duplicate-topic",
        message: `Duplicate topic title '${k}' across ${refs.length} entities.`,
        entity: refs[0],
      });
    }
  }

  // Broken relationships — a related ref points at an entity that doesn't
  // exist in the registry.
  for (const e of knowledgeGraph) {
    for (const r of e.related ?? []) {
      if (!getEntity(r)) {
        issues.push({
          severity: "error",
          code: "broken-relationship",
          message: `${e.type}:${e.slug} references missing entity ${r.type}:${r.slug}.`,
          entity: { type: e.type, slug: e.slug },
        });
      }
    }
    if (e.parent && !getEntity(e.parent)) {
      issues.push({
        severity: "error",
        code: "missing-parent",
        message: `${e.type}:${e.slug} declares missing parent ${e.parent.type}:${e.parent.slug}.`,
        entity: { type: e.type, slug: e.slug },
      });
    }
  }

  // Orphaned pages — populated entities with no inbound and no outbound edges.
  const inboundCount = new Map<string, number>();
  for (const e of knowledgeGraph) {
    for (const r of e.related ?? []) {
      const k = `${r.type}::${r.slug}`;
      inboundCount.set(k, (inboundCount.get(k) ?? 0) + 1);
    }
  }
  for (const e of knowledgeGraph) {
    if (e.status !== "populated") continue;
    const outbound = (e.related?.length ?? 0) + (e.children?.length ?? 0);
    const inbound = inboundCount.get(`${e.type}::${e.slug}`) ?? 0;
    if (outbound === 0 && inbound === 0 && !e.parent) {
      issues.push({
        severity: "warning",
        code: "orphaned-page",
        message: `${e.type}:${e.slug} is populated but has no relationships.`,
        entity: { type: e.type, slug: e.slug },
      });
    } else if (outbound === 0) {
      issues.push({
        severity: "info",
        code: "missing-internal-links",
        message: `${e.type}:${e.slug} has no outbound internal links.`,
        entity: { type: e.type, slug: e.slug },
      });
    }
  }

  // Cluster-level parent / mechanism coverage warnings.
  for (const c of topicClusters) {
    if (!c.pillar) {
      issues.push({
        severity: "warning",
        code: "missing-parent",
        message: `Cluster '${c.id}' has no pillar page.`,
        clusterId: c.id,
      });
    }
  }

  return issues;
}

// ---------------------------------------------------------------------------
//  Convenience selectors
// ---------------------------------------------------------------------------

export function slotLabel(id: ClusterSlotId): string {
  return slotById.get(id)?.label ?? id;
}

export function clusterEntities(c: TopicCluster): KnowledgeEntity[] {
  return pagesInCluster(c);
}

export function isClusterPage(ref: EntityRef): boolean {
  return !!findClusterFor(ref);
}

/** All mechanism entities referenced across all clusters. */
export function allClusterMechanisms(): KnowledgeEntity[] {
  return knowledgeGraph.filter((e) =>
    ["mechanism", "receptor", "pathway"].includes(e.type),
  );
}

/** Mechanism-group ids used by any registered compound. */
export function mechanismGroupIdsInUse(): MechanismGroupId[] {
  const ids = new Set<MechanismGroupId>();
  for (const c of compoundEntries) {
    for (const m of c.mechanismIds ?? []) ids.add(m);
  }
  return mechanismGroups.map((m) => m.id).filter((id) => ids.has(id));
}
