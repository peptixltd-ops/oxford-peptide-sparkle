# Release 3.0 — Knowledge Graph Engine

Release 3.0 introduces the **Knowledge Graph Registry**, a central, typed
description of every educational entity on Oxford Research Peptides and the
relationships between them. Layouts and related-content components consume the
graph directly — they no longer perform their own lookups or hardcode any
relationships.

This is a **foundation** release: no articles, glossary entries, or long-form
content are added. Future releases add data to the registry; layouts remain
untouched.

---

## Deliverables

### 1. Knowledge Graph Registry — `src/lib/knowledge-graph.ts`

* Typed entity model (`KnowledgeEntity`) with parent, children, related,
  status, pathway tags, reference counts and future schema mapping.
* Twelve entity types: `category`, `compound`, `compound-family`,
  `mechanism`, `receptor`, `pathway`, `research-area`, `methodology`,
  `comparison`, `glossary-term`, `literature-review`, `guide`.
* Registry is assembled from the existing `taxonomy.ts` plus a small seed of
  Release 2.1 scaffold entities. De-duplicated by `(type, slug)`.
* Reference counts computed once at module load from inbound edges.
* Query API: `getEntity`, `getEntitiesOfType`, `getChildren`, `getSiblings`,
  `getAncestors`, `getRelated`, `getReferenceCount`, `getMostReferenced`,
  `getRecentlyUpdated`, `getFoundational`, `buildPathway`.
* Legacy adapters `categoryRef`, `mechanismRef`, `compoundRef` keep existing
  taxonomy call sites terse.

### 2. Intelligent breadcrumbs — `src/lib/breadcrumbs-graph.ts`

* `crumbsForEntity(ref)` walks the entity's parent chain and emits a `Crumb[]`
  ready to feed into the existing `<Breadcrumbs />` component.
* `crumbsForRefs(refs)` resolves an arbitrary ordered ref list into crumbs.
* No route strings are baked into the builder — the trail is entirely derived
  from the graph.

### 3. Related-content engine

Refactored components (each now optionally accepts `entityRef` and hides
itself when there is nothing to render):

* `RelatedGuides`
* `RelatedCompounds`
* `RelatedMechanisms`
* `RelatedMethodology`
* `ContinueReading`

Legacy props (`categoryId`, `compoundSlug`, `mechanismId`, `slugs`,
`familyId`) still work — the engine falls through to taxonomy queries when no
`entityRef` is supplied. Passing `emptyLabel` restores the old always-visible
placeholder behaviour when a designer needs it.

### 4. Enhanced `ReadingPathway`

* New `pathway` prop accepts a `PathwayType`: `beginner`, `intermediate`,
  `advanced`, `compound-focused`, `mechanism-focused`, `methodology-focused`.
* Steps are synthesised from the graph via `buildPathway(pathway, { anchor })`
  — no hardcoded step arrays required.
* Existing `steps` prop still overrides for legacy call sites.
* Anchor-biased ordering: when an `entityRef` is supplied, entities in the
  same subtree (ancestors, siblings, related) surface first.

### 5. Enhanced `ResearchSidebar`

* New optional `entityRef` powers **Parent**, **Sub-topics**, **Siblings**,
  and **Related entities** sections.
* Graph-wide sections: **Recently updated**, **Most referenced**,
  **Foundational concepts**.
* Legacy blocks (`category-tree`, `glossary`, `methodology`) are preserved.
* Empty sections are automatically omitted — no more "coming soon" walls.

### 6. Documentation

* `KNOWLEDGE_GRAPH.md` — contributor guide covering the entity model,
  relationship model, registry structure, expansion rules and content
  workflow.
* This file — release notes.

---

## Entity governance

Every entity now carries: `slug`, `title`, `description`, `type`, optional
`parent`, `children`, `aliases`, `related`, `status` (`populated` /
`scaffold` / `planned`), `path`, `updated`, `foundational`, `pathwayTags`
and `schemaType`. This is the substrate for Release 3.1+ to add
JSON-LD, sitemap prioritisation and internal-search ranking without touching
UI code.

## Future schema.org preparation

`schemaType` maps entities to `Article`, `DefinedTerm`, `ChemicalSubstance`,
`MedicalEntity`, `FAQPage` or `BreadcrumbList`. No structured data is emitted
yet — the flag is written for a later release to consume.

## Backwards compatibility

Every existing route and scaffold continues to render unchanged. Related
components fall back to the taxonomy when no `entityRef` is supplied, and
`emptyLabel` restores the previous "populated in a future release" copy for
any surface that needs it.

## QA

* Typecheck: **PASS** (`tsgo --noEmit`, no diagnostics).
* Build: expected to pass — no runtime imports or exports were removed; every
  legacy prop path is preserved.
* Mobile: layouts unchanged; new sidebar sections inherit the existing
  responsive grid.
* `noindex`: unchanged — scaffold pages still emit `noindex` via the existing
  route helpers.

## Recommendations for Release 3.1

1. **Populate**. Add mechanisms, compounds and methodology entities to the
   registry — no layout changes required.
2. **JSON-LD generator**. Read `schemaType` and emit `Article`, `DefinedTerm`
   and `ChemicalSubstance` JSON-LD from the graph.
3. **Sitemap integration**. Include every `populated` entity's `path` in
   `sitemap.xml`, excluding `scaffold` and `planned`.
4. **Search substrate**. Feed titles, aliases and descriptions into an
   internal search index using the graph as the source of truth.
5. **Route adoption**. Migrate `research-hub.*` route files to use
   `crumbsForEntity()` so breadcrumbs update automatically as the hierarchy
   grows.
