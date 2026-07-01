# Release 2.0 — Scientific Publishing Design System

Release 2.0 introduces a reusable **Scientific Publishing** component library.
This is an architecture release only — no educational content, no brand
redesign, no ecommerce changes. Every future educational page (Guides,
Compound Monographs, Methodology, Literature Reviews, Comparisons, Glossary)
will compose these primitives.

---

## Files created

```
src/components/publishing/
  index.ts          — public barrel export
  types.ts          — shared TypeScript types (EvidenceLevel, Author, Reference, …)
  primitives.tsx    — PubPanel, PubHeading, PubMeta, tone system
  evidence.tsx      — evidence & confidence components
  callouts.tsx      — scientific callouts (KeyFindings, SafetyNote, …)
  references.tsx    — citation/reference system with ReferenceProvider
  figures.tsx       — Figure, tables, timeline, infographic container
  editorial.tsx     — authors, reviewers, revision history, notices
  article.tsx       — reading time, difficulty, quick answer, actions
  styling.tsx       — data panels, definition boxes, quote blocks, procedures
```

No existing files were modified.

---

## Components created

### 1. Evidence (`evidence.tsx`)
- `EvidenceLevelBadge` — 6 levels: strong / moderate / limited / preliminary / insufficient / conflicting
- `ResearchConfidenceMeter` — high / moderate / low / very-low, ARIA `role="meter"`
- `EvidenceSummary` — headline block combining level + confidence + summary
- `EvidenceDomainCard` + presets `HumanEvidence`, `AnimalEvidence`, `InVitroEvidence`, `MechanisticEvidence`
- `ResearchLimitations`, `FutureResearch`
- `StudyQualityBadge` (Grades A–D + insufficient)

### 2. Callouts (`callouts.tsx`)
Single `Callout` primitive + typed presets:
`KeyFindings`, `ImportantNote`, `ResearchHighlight`, `SafetyNote`,
`LaboratoryNote`, `MethodologyTip`, `Definition`, `HistoricalContext`,
`Warning`. All support icons, headings, and `expandable` mode with
`aria-expanded` / `aria-controls`.

### 3. References (`references.tsx`)
- `ReferenceProvider` + `useReferences` — context-based citation registry
- `Cite` — inline superscript citation with auto-numbering
- `ReferenceList` — expandable, groupable, formatted list
- `ReferenceItem` — single reference row with DOI / PMID / URL links
- `CitationCount` — pill badge
- `formatCitation` — AMA / APA / Vancouver / custom formatter
- Supports: authors, year, journal, volume, issue, pages, DOI, PMID, URL, note, citation count, group

### 4. Figures (`figures.tsx`)
- `Figure`, `FigureCaption`, `ImageAttribution`
- `ScientificDiagram` — responsive `aspect` prop (video / square / wide / portrait)
- `ResearchTable` — accessible, scrollable, dark-mode friendly
- `ComparisonTable` — column/row structured data
- `Timeline` — vertical gold-marker timeline
- `InfographicContainer` — bone→background gradient wrapper

### 5. Editorial (`editorial.tsx`)
- `AuthorCard`, `ScientificReviewerCard`
- `EditorialReviewPanel` — combined authors + reviewers + review date
- `PublicationInformation` — published / updated / reviewed / version / DOI
- `RevisionHistory` (alias `VersionHistory`)
- `EditorialStandardsNotice`
- `ConflictOfInterestNotice`
- `ScientificDisclaimer` — research-use-only default copy
- `CredentialBadge`

### 6. Article utilities (`article.tsx`)
- `ReadingTime`, `DifficultyBadge`
- `QuickAnswer`, `KeyFacts`, `LearningObjectives`, `Takeaways`
- `RelatedDefinitions`, `ContinueReading`
- `PrintableArticle`, `ShareArticle` (Web Share API + clipboard fallback)
- `BookmarkArticle` (localStorage-backed toggle)
- `ArticleActions` — grouped reader actions

### 7. Scientific styling (`styling.tsx`)
- `DataPanel`, `DefinitionBox`, `QuoteBlock`
- `ResearchNote`
- `LaboratoryProcedure` — numbered step list
- `ExperimentalResults`
- `ProcedureChecklist` — accessible checkbox list

### 8. Primitives (`primitives.tsx`)
- `PubPanel` — shared bordered/toned container (neutral, info, success, warning, danger, accent)
- `PubHeading` — heading with optional eyebrow + icon
- `PubMeta` — key/value definition grid
- `toneClasses` — the single source of visual tone styling; used by every callout, evidence card, and editorial notice to eliminate duplicated styling.

---

## Component governance

- **Reusable**: every component is prop-driven, no hardcoded copy.
- **Structured props**: exported types in `types.ts` (`Reference`, `Author`, `EvidenceLevel`, `RevisionEntry`, `DifficultyLevel`, `CitationStyle`, …).
- **No duplicated styling**: all tone/border/background classes come from `toneClasses` in `primitives.tsx`.
- **No duplicated layouts**: heading + panel patterns collapse into `PubPanel` + `PubHeading`.
- **Dark mode**: all colors use CSS variables from `src/styles.css` (`--navy`, `--gold`, `--bone`, semantic tokens) and Tailwind `dark:` variants.
- **Accessibility**: `aria-label` on landmarks, `role="meter"` on confidence bar, `aria-expanded` / `aria-controls` on expandable callouts and reference lists, `aria-pressed` on bookmark toggle, semantic `<figure>` / `<figcaption>` / `<table>` / `<ol>` / `<dl>`.
- **Future schema integration**: `Reference` maps cleanly to schema.org `ScholarlyArticle`; `Author` to `Person`; `RevisionHistory` entries to `dateModified` chains; `EvidenceLevel` / `StudyQualityGrade` reserved for future MedicalEvidence extensions.

---

## Future integration points

- `GuideLayout` and `CompoundLayout` (from Release 1.2) will render slots via `EvidenceSummary`, `Takeaways`, `EditorialReviewPanel`, `ReferenceList`.
- Compound monographs will use `KeyFacts` for chemical metadata and `EvidenceDomainCard` grids per evidence tier.
- Methodology pages will use `LaboratoryProcedure` + `ProcedureChecklist`.
- Comparison routes will use `ComparisonTable`.
- Glossary entries will use `DefinitionBox` + `RelatedDefinitions`.
- Literature reviews will use `ReferenceProvider` + `Cite` + `ReferenceList` (grouped).
- Future JSON-LD emitters can read the same `Reference` / `Author` shapes without a transform layer.

---

## Not built (intentionally excluded per spec)

- No educational articles or scientific copy
- No search UI or AI search
- No populated references
- No Compound Library launch
- No homepage redesign
- No Shopify integration changes

---

## Typecheck & build

- Typecheck: pending harness run (`tsgo --noEmit`) — no new external deps introduced; all imports resolve to existing project paths (`@/lib/utils`, `lucide-react`, `react`).
- Build: no route files added; no changes to `routeTree.gen.ts`. Bundle impact limited to the new `src/components/publishing/` tree, tree-shaken by consumer imports.
