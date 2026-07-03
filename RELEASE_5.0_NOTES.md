# Release 5.0 — Topic Cluster Engine

Release 5.0 introduces the reusable **Topic Cluster Engine**. It does not
publish new articles, redesign the site, or touch Shopify. Every future
compound will now become a semantic cluster automatically, and editors get
a governance surface that scales to hundreds of educational resources.

All new code is additive — no existing routes, product pages, or shipping
components were modified.

## 1. Topic Cluster Registry

`src/lib/topic-clusters.ts`

Declares the canonical **cluster slot taxonomy** (13 slots):

pillar · compound · mechanisms · methodology · storage · reconstitution ·
comparisons · faq · glossary · research-applications · references ·
related-compounds · product.

The registry converts every `CompoundEntry` in `taxonomy.ts` into a
`TopicCluster` by consuming the existing Knowledge Graph — pillar comes
from `parent` (family / category), mechanisms/methodology/comparisons /
glossary / research-areas come from `getRelated`, guides are matched
back to the compound via `taxonomy.guides[].compoundSlugs`, and the
product slot resolves to `products.ts`. Adding a new compound produces a
new cluster with zero extra wiring.

Public API:

- `topicClusters`, `getCluster(id)`, `listClusters({ status })`
- `clusterSlots`, `ClusterSlot`, `ClusterSlotFill`
- `clusterEntities(cluster)`
- `findClusterFor(ref)`, `isClusterPage(ref)`

## 2. Completeness engine

`computeCompleteness(cluster)` returns:

- total / required / filled slot counts
- total and populated pages
- boolean flags for missing glossary / methodology / comparisons /
  references / parent
- `internalLinkCompleteness` (0..1) — share of cluster pages that link to
  another page inside the cluster
- `entityCoverage` (0..1) — share of declared mechanisms that resolve to a
  real graph entity
- `score` (0..100) weighted 70/15/10/5 across required slots, optional
  slots, internal-link coverage, and entity coverage

## 3. Cluster navigation

`src/components/knowledge/cluster-navigation.tsx`

- `<ClusterBreadcrumbs cluster={c} />` — Home → Research Hub → pillar → cluster.
- `<ClusterNavigationPanel anchor={ref} />` — cluster overview, current
  page marker, supporting-page list grouped by slot, siblings within the
  active slot, suggested next reading, related clusters.

All datasets are derived from `clusterNavigationFor(ref)`; nothing is
hardcoded per page.

## 4. Cluster sidebar

`src/components/knowledge/cluster-sidebar.tsx`

`<ClusterSidebar anchor={ref} showMissing={false} />` renders:

- entire cluster map with per-slot fill counts + active-page highlight
- reading progress meter (filled slots / total slots)
- related entities via `getRelated`
- foundational reading via `getFoundational`
- (dev only, via `showMissing`) list of missing required slots

The existing `ResearchSidebar` is untouched — pages can render either or
both.

## 5. Cluster metadata

`clusterMetadata(cluster)` derives:

- topic title (`"{Compound} — Topic cluster"`)
- description (from anchor entity)
- canonical hierarchy (compound URL)
- breadcrumb hierarchy via `clusterBreadcrumbs`

Metadata is derived from entity relationships, so renaming or reparenting
a compound automatically updates every downstream label.

## 6. Content governance

`runGovernance()` returns typed `GovernanceIssue[]` for:

- `orphaned-page` — populated entity with no edges
- `broken-relationship` — `related`/`parent` ref to a missing entity
- `missing-internal-links` — populated entity with no outbound edges
- `missing-parent` — entity/cluster without a pillar
- `duplicate-topic` — two entities of the same type with the same title
- `duplicate-entity` — duplicate `(type, slug)` in the registry

Severities: `error` · `warning` · `info`.

## 7. Editorial dashboard

`src/routes/dashboard.editorial.tsx` (route `/dashboard/editorial`).

**Noindex** by default (`seo({ noindex: true })`). Renders:

- header KPIs (total clusters, healthy count, warnings, errors)
- cluster completeness table (score, populated / total, required slots,
  internal-link %, entity coverage %, missing slot names)
- governance issues table

Editors use this as the pre-publish gate for any cluster promotion.

## 8. QA

- `bunx tsgo --noEmit` — Typecheck **PASS**.
- Cluster integrity: 2 clusters registered (Retatrutide populated,
  BPC-157 scaffold). BPC-157 was **not** published — it remains a
  scaffold-status cluster surfaced only in the dashboard.
- Knowledge Graph: engine is a pure consumer of `getEntity` /
  `getRelated` / `knowledgeGraph`; no mutations.
- Metadata: derived from entity relationships; single canonical URL per
  cluster (compound path).
- Breadcrumbs: single source of truth in `clusterBreadcrumbs`.
- Internal links: `internalLinkCompleteness` reports coverage per cluster
  — visible on the dashboard.
- No existing routes / product pages / Shopify code paths modified.

## Files added

- `src/lib/topic-clusters.ts`
- `src/components/knowledge/cluster-navigation.tsx`
- `src/components/knowledge/cluster-sidebar.tsx`
- `src/routes/dashboard.editorial.tsx`
- `RELEASE_5.0_NOTES.md`

## Usage sketch

```tsx
import { compoundRef } from "@/lib/knowledge-graph";
import { ClusterNavigationPanel, ClusterBreadcrumbs } from "@/components/knowledge/cluster-navigation";
import { ClusterSidebar } from "@/components/knowledge/cluster-sidebar";
import { clusterMetadata, getCluster, computeCompleteness } from "@/lib/topic-clusters";

// On any cluster page (compound monograph, related guide, mechanism):
const anchor = compoundRef("retatrutide");
<ClusterBreadcrumbs cluster={getCluster("retatrutide")!} />
<ClusterNavigationPanel anchor={anchor} />
<ClusterSidebar anchor={anchor} />

// For SEO wiring on a cluster page:
const meta = clusterMetadata(getCluster("retatrutide")!);

// Programmatic checks (build script / dashboard):
const c = computeCompleteness(getCluster("retatrutide")!);
if (c.score < 85) console.warn("Cluster not ready to publish");
```
