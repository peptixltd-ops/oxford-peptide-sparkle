# Release 6.0 — Retatrutide Authority Cluster (Content Activation)

## Objective

Release 6.0 begins the Authority Building phase. No new platform
features, no redesigns, no refactors — the platform built through 5.0
is complete and this release populates it with the first flagship
topical authority cluster.

Every page in this cluster is intended to serve as the benchmark that
future compound clusters follow. Content is written for researchers
first, cites the primary literature, and never uses marketing or sales
copy.

## Deliverables

### 1. Compound monograph (already published in 4.0, unchanged in 6.0)

- `/compounds/retatrutide` — full Retatrutide monograph (overview,
  identity, molecular classification, mechanism, receptor targets,
  pharmacology, pharmacokinetics, research applications, laboratory
  methodology, storage, reconstitution, stability, safety context,
  current evidence, limitations, FAQs, references).

### 2. Educational cluster (10 guides — 4 pre-existing + 6 new)

Pre-existing (from Release 4.0):

- `/research-hub/guides/what-is-retatrutide`
- `/research-hub/guides/retatrutide-mechanism-of-action`
- `/research-hub/guides/glp-1-receptor-explained`
- `/research-hub/guides/laboratory-reconstitution-guide`

New in Release 6.0:

- `/research-hub/guides/gip-receptor-explained`
- `/research-hub/guides/glucagon-receptor-explained`
- `/research-hub/guides/triple-agonists-explained`
- `/research-hub/guides/laboratory-storage-guide`
- `/research-hub/guides/retatrutide-research-applications`
- `/research-hub/guides/retatrutide-faq`

Every new guide uses the existing editorial and publishing
infrastructure:

- **Editorial Framework** — `PageEditorial`, revision history,
  scientific disclaimer, author + reviewer references.
- **Publishing Components** — `QuickAnswer`, `KeyFacts`,
  `EvidenceSummary`, `ResearchLimitations`, `KeyFindings`,
  `ComparisonTable`, `Definition`, `MethodologyTip`,
  `LaboratoryNote`, `ImportantNote`, `Callout`.
- **Citation system** — `ReferenceProvider` + `Cite` + `ReferenceList`
  wired to the shared six-source cluster registry.
- **Knowledge Graph** — `RelatedCompounds`, `RelatedGuides`,
  `RelatedMechanisms` (auto-generated from taxonomy).

## Internal linking report

Every guide links to at least three of the following:

- The Retatrutide monograph (`/compounds/retatrutide`).
- Sibling receptor guides (GLP-1R, GIPR, GCGR).
- `Triple Agonists Explained` primer.
- Handling companion guides (reconstitution ↔ storage).
- `Retatrutide FAQ` and `Retatrutide Research Applications`.

Related-content panels (`RelatedGuides`, `RelatedCompounds`,
`RelatedMechanisms`) are rendered automatically via the taxonomy — no
new orphan pages have been introduced.

## Schema

Per-page JSON-LD (unchanged mechanism from Release 4.0, extended by
adding new populated slugs):

- `Article` schema for each guide (via `articleLd`).
- `BreadcrumbList` schema for each guide.
- `FAQPage` schema for each guide that carries `faqs` metadata
  (all six new guides supply `faqs`).
- `ChemicalSubstance` + `Article` + `BreadcrumbList` + `FAQPage`
  for the Retatrutide monograph (unchanged).

## Indexation changes

- All 10 guide slugs are registered in `src/lib/taxonomy.ts` with
  `populated: true`. This automatically:
  - includes them in the sitemap
    (`src/routes/sitemap[.]xml.ts` iterates
    `guides.filter((g) => g.populated)`),
  - lifts the placeholder `noindex` fallback in
    `src/routes/research-hub.guides.$slug.tsx`,
  - exposes them to related-content panels across the site.

No scaffold pages were flipped to `index`; only the six new guides
(and by extension the six that were already populated).

## Files changed

- `src/content/retatrutide-cluster.tsx` — added six new
  `GuideContent` entries and expanded the registry.
- `src/lib/taxonomy.ts` — registered six new guides (with
  `populated: true`, category, type, mechanism, compound and area
  links).

No infrastructure, layout or Shopify code was touched.

## QA

- **Typecheck:** `bunx tsgo --noEmit` — **PASS**.
- **Internal links** — every new guide interlinks with at least three
  sibling pages plus the monograph.
- **Knowledge Graph** — new guides carry `compoundSlugs`,
  `mechanismIds` and (where relevant) `methodologySlugs`, so they
  appear in the auto-derived related-content panels without any
  additional wiring.
- **Metadata, canonicals, schema** — inherited from the existing
  guide-route `head()` implementation; each new guide has a unique
  title and description sourced from its `GuideContent`.
- **Editorial framework** — each new guide renders `PageEditorial`,
  `ScientificDisclaimer`, `EvidenceSummary`, and (where relevant)
  `ResearchLimitations`.
- **Accessibility** — Retatrutide FAQ uses `<section aria-labelledby>`
  per question; all guides use semantic H1 / H2 hierarchy.
