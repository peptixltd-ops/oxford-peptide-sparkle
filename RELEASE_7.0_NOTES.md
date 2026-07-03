# Release 7.0 — Knowledge Explorer

Exposes the Knowledge Graph as a browsable educational experience. No new
compound clusters, no redesign, no ecommerce changes — purely an additive
layer that turns the existing graph into an entry point.

## Deliverables

### 1. Knowledge Explorer (`/explore`)
- Landing page with entity-count summary of every node type in the graph.
- Featured "most-referenced" and "recently updated" panels driven by
  `getMostReferenced` / `getRecentlyUpdated`.
- Live `EntityGraph` visualisation seeded from the top compound.

### 2. Compound Explorer (`/explore/compounds`)
- URL-driven facets: family, mechanism/receptor, research application,
  evidence level, sort order (popularity / A–Z / recent).
- All facets round-trip through TanStack Router `validateSearch` (Zod schema).
- Rows show compound name, aliases, mechanism chips, guide count, reference
  count, evidence badge.

### 3. Mechanism Explorer (`/explore/mechanisms`)
- Facets: receptor class (GPCR / kinase / other), biological pathway
  (incretin / growth / melanocortin / repair / other), related compound.
- Automatic derivation from `mechanismGroups` + graph relationships.

### 4. Learning Journeys (`/explore/pathways`, `/explore/pathways/$type`)
- Six journeys generated automatically from `buildPathway`: beginner,
  intermediate, advanced, compound-focused, mechanism-focused,
  methodology-focused.
- Each journey renders as an ordered list plus a `EntityGraph` visualising
  the first step's neighbourhood.
- `notFoundComponent` handles unknown pathway types.

### 5. Visual Entity Relationships (`EntityGraph`)
- New reusable component at `src/components/knowledge/entity-graph.tsx`.
- Pure SVG, no external libraries. Radial layout with the anchor at the
  centre and parent / children / related entities arranged around it.
- Accessible: labelled with `role="img"` + `aria-label`; a
  `<details>` "Relationship list" beneath duplicates the graph as text
  links (screen-reader primary experience).
- Colour-coded by entity type; anchor is enlarged and outlined.

### 6. Homepage integration
- New "Knowledge Explorer" section inserted before the Wholesale block on
  `/` — no layout redesign. Links into `/explore` and
  `/explore/pathways`, previews the first six explorer sections.

## New helpers — `src/lib/knowledge-explorer.ts`

Pure functions consumed by every explorer route:

- `compoundExplorer(filters)` / `compoundFacets`
- `mechanismExplorer(filters)` / `mechanismFacets`
- `explorerSections()` — top-level nav entries with live counts
- `allLearningJourneys()`, `allPathwayTypes()`, `getLearningJourney(type)`
- `localGraph(anchor, limit)` — build the node/edge set for `EntityGraph`
- `evidenceLevel(entity)` — heuristic (populated + reference count)

Everything reads from `knowledgeGraph`, `getRelated`, `getChildren`,
`getMostReferenced`, `getRecentlyUpdated`, `buildPathway`. No new source of
truth is introduced.

## Indexation

Sitemap (`/sitemap.xml`) now advertises `/explore`, `/explore/compounds`,
`/explore/mechanisms`, `/explore/pathways` and every populated pathway
type. All explorer routes emit canonical URLs and standard `seo()`
metadata. Nothing is `noindex` (unknown pathway types are).

## QA

- **Knowledge Graph**: every explorer surface derives from
  `knowledgeGraph`; no hardcoded relationship data.
- **Entity relationships**: `localGraph` + `getRelated` guarantees parent /
  child / related buckets are correct and de-duplicated.
- **Accessibility**: breadcrumbs on every route; SVG graph has
  `role="img"` + accessible label plus a text list fallback; focus rings
  on every interactive element; facet buttons are `<Link>`s (real URLs).
- **Performance**: no client-side data fetching, no external libraries,
  no images added. All computation is O(N) over a small graph.
- **Typecheck**: `bunx tsgo --noEmit` — PASS.

## Files

Created:
- `src/lib/knowledge-explorer.ts`
- `src/components/knowledge/entity-graph.tsx`
- `src/routes/explore.tsx`
- `src/routes/explore.index.tsx`
- `src/routes/explore.compounds.tsx`
- `src/routes/explore.mechanisms.tsx`
- `src/routes/explore.pathways.index.tsx`
- `src/routes/explore.pathways.$type.tsx`
- `RELEASE_7.0_NOTES.md`

Edited:
- `src/routes/index.tsx` (added Knowledge Explorer homepage section)
- `src/routes/sitemap[.]xml.ts` (added explorer routes)
