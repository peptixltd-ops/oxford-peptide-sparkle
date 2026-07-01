# Release 2.1 — Publishing System Integration

Wires the Release 2.0 Scientific Publishing component library into the
Release 1.2 knowledge architecture. Proves that GuideLayout and
CompoundLayout render publishing components from structured data with no
per-page bespoke code and no hardcoded content.

## Files created

- `src/lib/scaffolds.tsx` — structured scaffold dataset (compounds,
  methodology guides, mechanism guides) plus `buildGuideLayoutProps` and
  `buildCompoundLayoutProps` renderers that compose publishing components
  into GuideLayout / CompoundLayout slots.
- `src/components/knowledge/scaffold-guide-page.tsx` — thin route wrapper
  (header, breadcrumbs, GuideLayout) used by both mechanism and
  methodology `$slug` routes so no route file contains editorial content.

## Files changed

- `src/lib/taxonomy.ts` — added structured `CompoundEntry` records for
  `retatrutide` and `bpc-157` (populated: false → noindex preserved).
- `src/routes/compounds.$slug.tsx` — renders `CompoundLayout` from
  `buildCompoundLayoutProps(scaffold)` when a scaffold exists; falls back
  to the empty structural template otherwise.
- `src/routes/research-hub.methodology.$slug.tsx` — renders
  `ScaffoldGuidePage` when a methodology scaffold exists.
- `src/routes/research-hub.mechanisms.$slug.tsx` — renders
  `ScaffoldGuidePage` when a mechanism scaffold exists.

## Layout integrations completed

GuideLayout now consumes, via structured props from scaffolds:

- `QuickAnswer` → `quickAnswer` slot
- `KeyFacts` → `keyFacts` slot
- `KeyFindings` (Callout) → `mainContent`
- `LaboratoryProcedure` / `ComparisonTable` / `DataPanel` / `DefinitionBox`
  → `mainContent`
- `EvidenceSummary` → `evidenceSummary` slot
- `ResearchLimitations` → `researchLimitations` slot
- `ReferenceProvider` + `ReferenceList` → `references` slot (empty
  bibliography by design)
- `RelatedDefinitions` → `glossaryTerms` slot
- `ContinueReading` → `relatedGuides` slot
- `ScientificDisclaimer` → `editorialNotice` slot
- `AuthorCard` + `ScientificReviewerCard` +
  `EditorialStandardsNotice` + `RevisionHistory` → `versionHistory` slot

CompoundLayout now consumes:

- Identity block: `QuickAnswer` + `KeyFacts`
- Chemical metadata: `KeyFacts`
- Mechanism: prose + `KeyFindings`
- Receptor targets: `ComparisonTable`
- Laboratory notes: list
- Evidence summary: `EvidenceSummary` + `ResearchLimitations`
- References: `ReferenceProvider` + `ReferenceList` + editorial block +
  `ScientificDisclaimer`
- Related products / comparisons: label lists

## Scaffold pages created

Every scaffold is noindex until its taxonomy entry is marked populated.

| Route                                              | Kind        |
| -------------------------------------------------- | ----------- |
| `/compounds/retatrutide`                           | compound    |
| `/compounds/bpc-157`                               | compound    |
| `/research-hub/methodology/reconstitution`         | methodology |
| `/research-hub/methodology/hplc-purity`            | methodology |
| `/research-hub/mechanisms/glp-1`                   | mechanism   |

## Data files created / updated

- `src/lib/scaffolds.tsx` — sole location for scaffold editorial data.
- `src/lib/taxonomy.ts` — sole location for compound / mechanism / guide
  taxonomy. No new duplicate hierarchies.

## noindex handling

- `/compounds/$slug` — `noindex: !entry?.populated`. Both new compound
  entries are `populated: false`, so both scaffold URLs are noindex.
- `/research-hub/methodology/$slug` — `noindex: true` unconditionally.
- `/research-hub/mechanisms/$slug` — `noindex: true` unconditionally.

## QA

- Typecheck: `bunx tsgo --noEmit` → clean.
- Build: sandbox handler runs the build automatically; no errors reported.
- Mobile: GuideLayout / CompoundLayout use the existing
  `grid lg:grid-cols-[1fr_320px]` responsive shell — sidebar stacks below
  content on `<lg`.
- Breadcrumbs: scaffold guides render `Research Hub → <Category> → <Title>`;
  compounds render `Compound Reference → <Name>`.
- Publishing components inherit brand tokens and support dark mode via the
  `.dark` variant established in Release 2.0.
- No duplicate taxonomy or hardcoded navigation was introduced — all
  navigation continues to read from `researchCategories` and scaffold data.

## Recommendations for Release 2.2

1. Introduce a lightweight editorial pipeline (MDX or JSON-driven) so
   populated guides replace scaffolds without touching route code.
2. Populate first-tier references (DOI/PMID) for GLP-1R and reconstitution
   scaffolds and flip `populated: true` to remove the noindex gate.
3. Launch the glossary index with real `RelatedDefinitions` targets so
   scaffold `definitions` become hyperlinks.
4. Add JSON-LD (`ScholarlyArticle`, `TechArticle`, `DefinedTerm`,
   `ChemicalSubstance`) emitters that read the same scaffold/populated
   data — one schema source, all pages.
5. Add a `ReadingPathway` breadcrumb-aware component to sit above
   GuideLayout hero so cross-category navigation is visible on every
   guide.
