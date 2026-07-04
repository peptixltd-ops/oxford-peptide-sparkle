# Release — Version 1.0 Finalisation

Version 1.0 is the final platform sprint for Oxford Research Peptides.
After this release, ORP transitions into an editorial publishing
programme; the platform surface is frozen.

This sprint delivers a **single internal Knowledge API** unifying every
educational registry behind one strongly-typed interface. No UI, routes,
content, or Shopify code paths were changed.

## What shipped

- `src/lib/knowledge-api.ts` — the unified Knowledge API.
- `KNOWLEDGE_API.md` — the internal contributor reference.

## What did NOT change

- No redesign.
- No new routes.
- No new educational content.
- No new compounds, guides, mechanisms, comparisons, studies, or glossary
  entries.
- No Shopify code changes.
- No layout changes.
- No new figures or components.

## Registries the API consumes (no duplication)

| Registry | Source |
|---|---|
| Taxonomy stubs | `src/lib/taxonomy.ts` |
| Knowledge graph edges | `src/lib/knowledge-graph.ts` |
| Compound monographs | `src/content/registry.ts` |
| Guide content | `src/content/registry.ts` |
| Study content | `src/content/studies-content.tsx` |
| Comparison content | `src/content/comparisons-content.tsx` |
| Glossary content | `src/content/glossary-content.tsx` |
| Study citation graph | `src/lib/study-graph.ts` |
| Study collections | `src/lib/study-collections.ts` |
| Programmes | `src/lib/programmes.ts` |
| Authors / reviewers | `src/lib/editorial/authors.ts` + `src/lib/editorial-graph.ts` |
| Figure library | `src/components/publishing/research-figures.tsx` |
| Products | `src/lib/products.ts` |
| References | `src/lib/editorial/citations.ts` |

## Exposed surface

Getter functions (each returns a `KnowledgeEntityResponse`):

`getCompound`, `getGuide`, `getMechanism`, `getStudy`, `getGlossary`,
`getComparison`, `getFigure`, `getProgramme`, `getAuthor`, `getReviewer`,
`getMethodology`, `getResearchJourney`, `getEntity`.

Search + traversal:

`searchKnowledge`, `getRelatedKnowledge`, `listEntities`, `knowledgeStats`.

Convenience re-exports: `getGraphEntity`, `getEntitiesOfType`, `getRelated`,
`getReferenceCount`, `listProgrammeViews`, `listStudyCollectionViews`,
`authorProfileIds`, `reviewerProfileIds`, `getReference`.

## Unified response

Every getter returns:

```
identity        { type, slug, title, aliases?, path? }
summary         string?
editorial       { updated?, author?, reviewer?, datePublished?, dateModified?, populated? }
graph           KnowledgeEntity?
relationships   { compounds, guides, mechanisms, studies, comparisons,
                  glossary, methodology, figures, programmes, products, related }
references      string[]   // DOI/PMID/URLs
raw             TRaw       // underlying registry record
```

Callers can therefore render any entity through one shared pattern.

## Search

`searchKnowledge(query, { types?, limit? })` builds a lazy in-process index
across compounds, guides, studies, glossary, comparisons, mechanisms,
figures, programmes, authors, reviewers, products, and research journeys.
Every entity in the index is derived from an existing registry — no
duplicated corpus is stored.

## QA

- `bunx tsgo --noEmit` — **PASS** (zero errors).
- Zero duplicated data — every field is derived from an existing registry.
- 100% registry-driven — no hardcoded slugs, titles, or relationships.
- No circular dependencies — the API only imports downstream; no registry
  imports back from `knowledge-api.ts`.
- No UI changes.
- No routes changed.
- No content added.
- No Shopify changes.

## Files added

- `src/lib/knowledge-api.ts`
- `KNOWLEDGE_API.md`
- `RELEASE_V1_FINALISATION.md`

## Files edited

None.
