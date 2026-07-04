# Knowledge API

`src/lib/knowledge-api.ts` is the internal, strongly-typed aggregation layer
over every existing knowledge registry on Oxford Research Peptides. It is
read-only, derivation-only, and does not duplicate any registry data.

The API is **internal**. It is not a public developer API.

## Design principles

- **Zero duplication.** Every function consumes an existing registry
  (taxonomy, knowledge graph, content registries, editorial graph, study
  graph, programmes, collections, figures, products). No entity data is
  restated inside `knowledge-api.ts`.
- **One shape everywhere.** All `get<X>` functions return the same
  `KnowledgeEntityResponse<TRaw>` discriminated by
  `identity.type: KnowledgeEntityType`.
- **Slug-first refs.** Relationships are `EntityRef` (type + slug) values;
  callers hydrate them with `getEntity` when they need the full record.
- **Registry-driven search.** `searchKnowledge()` builds a single index on
  first call by iterating each existing registry — no duplicated corpus.
- **No circular deps.** The API imports downstream from every registry; no
  registry imports back into the API.

## The unified response

```ts
interface KnowledgeEntityResponse<TRaw = unknown> {
  identity: {
    type: KnowledgeEntityType;
    slug: string;
    title: string;
    aliases?: readonly string[];
    path?: string;
  };
  summary?: string;
  editorial: {
    updated?: string;
    author?: string;
    reviewer?: string;
    datePublished?: string;
    dateModified?: string;
    populated?: boolean;
  };
  graph?: KnowledgeEntity;
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
```

## Entity kinds

`KnowledgeEntityType` extends the knowledge-graph `EntityType` with:

- `study`
- `figure`
- `programme`
- `study-collection` (alias of `research-journey`)
- `author`
- `reviewer`
- `product`
- `research-journey`

## Functions

| Function | Returns |
|---|---|
| `getCompound(slug)` | Compound (monograph + taxonomy + KG) |
| `getGuide(slug)` | Guide (taxonomy stub + full content when populated) |
| `getMechanism(id)` | Mechanism group + downstream links |
| `getStudy(slug)` | Study (taxonomy + citation record + full content) |
| `getGlossary(slug)` | Glossary term (taxonomy + full content) |
| `getComparison(slug)` | Comparison (taxonomy + full content) |
| `getFigure(slug)` | Figure asset from `RESEARCH_FIGURE_REGISTRY` |
| `getProgramme(slug)` | Programme + derived view |
| `getResearchJourney(slug)` | Study collection view |
| `getAuthor(id)` | Editorial author + `AuthorProfile` |
| `getReviewer(id)` | Scientific reviewer + `ReviewerProfile` |
| `getMethodology(slug)` | Methodology KG entity |
| `getEntity({ type, slug })` | Any of the above by discriminator |
| `getRelatedKnowledge(ref)` | Deduped flat list of every related `EntityRef` |
| `searchKnowledge(query, opts?)` | Token-scored `SearchHit[]` |
| `listEntities(type)` | `KnowledgeIdentity[]` for a type |
| `knowledgeStats()` | Counts by type + references/programmes/figures/products |

Convenience re-exports: `getGraphEntity`, `getEntitiesOfType`, `getRelated`,
`getReferenceCount`, `listProgrammeViews`, `listStudyCollectionViews`,
`authorProfileIds`, `reviewerProfileIds`, `getReference`.

## Search

```ts
searchKnowledge("semaglutide step");
searchKnowledge("glp-1", { types: ["mechanism", "compound"], limit: 10 });
```

- All query tokens must appear in the entry haystack.
- Score boosts: title (+3), slug (+2), alias (+2), any match (+1).
- Index is built lazily on first call and cached for the process.

## Usage examples

```ts
import {
  getEntity,
  getRelatedKnowledge,
  searchKnowledge,
  knowledgeStats,
} from "@/lib/knowledge-api";

// Fetch one entity
const semaglutide = getEntity({ type: "compound", slug: "semaglutide" });

// All related refs for the STEP-1 study
const related = getRelatedKnowledge({ type: "study", slug: "step-1" });

// Search across every registry
const hits = searchKnowledge("GLP-1 receptor", { limit: 8 });

// Editorial dashboards
const stats = knowledgeStats();
```

## Guarantees

- Typecheck: `bunx tsgo --noEmit` — **PASS**.
- Zero duplicated data — every field is derived from an existing registry.
- 100% registry driven — no hardcoded slugs, titles, or relationships.
- No circular imports — the API is a downstream consumer only.
