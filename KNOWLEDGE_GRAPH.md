# Knowledge Graph — Contributor Guide

The Knowledge Graph is the permanent **relationship engine** for Oxford
Research Peptides. It is a typed, in-repo registry that describes every
educational entity and how those entities relate to each other. Layouts and
related-content components consume the graph — they never encode
relationships themselves.

> **One rule**: to add new content, add entities to the registry. To change
> how relationships render, change the components. Never mix the two.

---

## 1. Entity model

Every entity is a `KnowledgeEntity`:

```ts
interface KnowledgeEntity {
  type: EntityType;             // discriminator
  slug: string;                 // stable, url-safe id
  title: string;
  description?: string;
  aliases?: readonly string[];

  path?: string;                // canonical URL if any
  parent?: EntityRef;
  children?: readonly EntityRef[];
  related?: readonly EntityRef[];

  status: "populated" | "scaffold" | "planned";
  updated?: string;             // ISO date
  referenceCount?: number;      // computed at load time
  foundational?: boolean;

  pathwayTags?: readonly PathwayType[];
  schemaType?: SchemaMapping;   // future schema.org mapping
}
```

Entity types:

| Type                 | Purpose                                     |
| -------------------- | ------------------------------------------- |
| `category`           | Top-level Research Hub section              |
| `compound`           | Peptide reference monograph                 |
| `compound-family`    | Grouping of related compounds               |
| `mechanism`          | Receptor / signalling pathway               |
| `receptor`           | Individual receptor                         |
| `pathway`            | Biochemical pathway                         |
| `research-area`      | Cross-cutting horizontal (e.g. Chemistry)   |
| `methodology`        | Laboratory procedure                        |
| `comparison`         | Side-by-side compound comparison            |
| `glossary-term`      | Defined term                                |
| `literature-review`  | Review of published studies                 |
| `guide`              | Long-form research guide                    |

Every reference to another entity uses `EntityRef = { type, slug }` — never
raw strings.

---

## 2. Relationship model

There are three edge kinds:

1. **Hierarchy** — `parent` and (optionally) `children`. Exactly one parent
   per entity. Children can be declared explicitly or derived automatically
   from any entity that lists this one as its `parent`.
2. **Related** — non-hierarchical cross-links. Symmetric conceptually; the
   engine also computes **inbound** links so a compound listing a mechanism
   automatically shows up under that mechanism's "Related entities".
3. **Pathway tags** — an entity can belong to any number of learning
   pathways (`beginner`, `intermediate`, `advanced`, `compound-focused`,
   `mechanism-focused`, `methodology-focused`).

Reference counts are computed once at module load and are surfaced through
`getReferenceCount(ref)` and the `getMostReferenced` helper.

---

## 3. Registry structure

`src/lib/knowledge-graph.ts` builds the registry in three layers:

1. **Seed entities** — hand-authored entries for anything that does not
   naturally exist in `taxonomy.ts` (root categories, methodology scaffolds,
   individual mechanism deep-dives).
2. **Taxonomy adapters** — `researchCategories`, `mechanismGroups`,
   `compoundFamilies`, `researchAreas`, `compoundEntries`, `glossaryTerms`
   and `guides` are automatically projected into the graph. This means every
   existing taxonomy entry gets an entity for free.
3. **De-duplication** — entries are keyed by `(type, slug)`. Seed entities
   win, so an author can override any adapter default from the graph.

The final `knowledgeGraph` array is immutable and cheap to iterate. A
`Map<key, entity>` is built once for O(1) lookups.

---

## 4. Query API

```ts
getEntity(ref)                       // KnowledgeEntity | undefined
getEntitiesOfType(type)              // KnowledgeEntity[]
getChildren(ref)                     // direct children (declared or derived)
getSiblings(ref)                     // shared-parent, minus self
getAncestors(ref)                    // root -> parent
getRelated(ref, { type?, limit? })   // typed related lookups
getReferenceCount(ref)               // inbound edge count
getMostReferenced({ type?, limit })  // popularity ranking
getRecentlyUpdated({ type?, limit }) // ISO-date sorted, populated only
getFoundational(limit)               // foundational=true
buildPathway(pathway, { anchor, limit })
```

Consumers should never poke the raw `knowledgeGraph` array — always call the
helpers so we can later swap the backing store without touching call sites.

---

## 5. Adding content

To add a new entity:

1. Open `src/lib/knowledge-graph.ts`.
2. If the entity is derived from an existing taxonomy entry, edit that entry
   instead — the adapter picks it up automatically.
3. Otherwise, append to the `seedEntities` array with the correct `type`,
   `slug`, `parent`, `related` and `status`.
4. If the entity has a page, set `path` to its canonical URL and add a route
   file under `src/routes/`.

That is the entire workflow. Do **not** edit `research-sidebar.tsx`,
`reading-pathway.tsx` or any `related-*.tsx` component to introduce new
content — they read from the graph automatically.

Similarly, to change how a page's breadcrumbs read, update the entity's
`parent` chain — do not hardcode crumbs in the route.

---

## 6. Component consumption

* **`<ResearchSidebar entityRef={ref} />`** — parent, children, siblings,
  related, foundational, recent, most-referenced. Empty blocks disappear.
* **`<ReadingPathway pathway="beginner" entityRef={ref} />`** — synthesises
  a six-step journey anchored on the entity.
* **`<RelatedGuides entityRef={ref} />`**,
  **`<RelatedCompounds entityRef={ref} />`**,
  **`<RelatedMechanisms entityRef={ref} />`**,
  **`<RelatedMethodology entityRef={ref} />`** — return `null` when empty.
* **`<ContinueReading entityRef={ref} />`** — graph-first, taxonomy
  fallback, then recently-updated across the whole registry.
* **`crumbsForEntity(ref)`** — feed into `<Breadcrumbs items={...} />`.

Every component keeps its legacy prop surface so migration is incremental.

---

## 7. Future expansion rules

* **Registry only grows.** Never delete an entity that has published pages;
  set `status: "planned"` and drop links from other entities instead.
* **Backwards-compatible schema evolution.** New optional fields on
  `KnowledgeEntity` are safe. Renames require a codemod pass over the
  registry — do not silently break `slug` values, they are URL identifiers.
* **One parent per entity.** For "belongs to multiple sections" use
  `related` instead. Breadcrumbs walk the parent chain and must remain a
  single line.
* **Slug hygiene.** Slugs are lowercase, kebab-case, ASCII-only, stable
  forever. If an entity is renamed, keep the slug and add the old name as an
  alias.
* **`schemaType` is a future promise.** Set it whenever an entity has enough
  metadata to justify JSON-LD. Emission is added in a later release; the
  flag lets us backfill without a data migration.

---

## 8. What the graph is *not*

* It is not a full ontology. There is no formal reasoning, no inference
  beyond direct edges, and no external vocabulary.
* It is not a CMS. Long-form article bodies live in scaffold data or MDX
  (future); only structured relationships live here.
* It is not a search index. Search feeds off the graph but is layered on top
  in a later release.

Keep it small, typed and honest, and it will scale as content grows.
