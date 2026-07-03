# RELEASE — Authority Sprint 2D

**Scope:** Metabolic peptide domain — comparisons and literature review infrastructure.
**Status:** Complete. `bunx tsgo --noEmit` PASS.
**Date:** 2026-10-15

---

## 1. Deliverables

### Three comparison guides (`/research-hub/comparisons/*`)

| Slug | Compounds | Reading |
|---|---|---|
| `semaglutide-vs-retatrutide` | GLP-1 mono-agonist vs triple agonist | 9 min |
| `semaglutide-vs-tirzepatide` | GLP-1 mono vs GLP-1/GIP dual | 9 min |
| `semaglutide-vs-liraglutide` | Two acylated GLP-1 mono-agonists | 8 min |

Each comparison includes: Quick Answer · 150-word Extended Answer · Scientific overview · Mechanism comparison · Receptor selectivity · Pharmacokinetic comparison · Research applications comparison · Human evidence · Preclinical evidence · Advantages/limitations · Research context · References · Evidence summary · Author/reviewer/revision metadata.

### Four literature review pages (`/research-hub/literature/*`)

| Slug | Study | Journal / Year | Tier |
|---|---|---|---|
| `sustain-6` | Semaglutide CV outcomes in T2D | NEJM 2016 (Marso) | Landmark RCT |
| `step-programme` | Semaglutide 2.4 mg in obesity | NEJM 2021 lead (Wilding) | Programme summary |
| `select-trial` | Semaglutide CV outcomes in obesity w/o diabetes | NEJM 2023 (Lincoff) | Landmark RCT |
| `flow-trial` | Semaglutide kidney outcomes in T2D + CKD | NEJM 2024 (Perkovic) | Landmark RCT |

Each study page includes: Background · Study design · Population · Primary outcomes · Scientific significance · Limitations · Related compounds · Related guides · References · PMID/DOI/journal/year metadata.

## 2. Files changed

**New:**
- `src/content/comparisons-content.tsx` — 3 comparison records with GuideLayoutProps builders + accessible `<ComparisonTable>` primitive.
- `src/content/studies-content.tsx` — 4 study records with GuideLayoutProps builders.
- `src/routes/research-hub.literature.$slug.tsx` — new dynamic route for study pages (schema, breadcrumbs, article LD).
- `RELEASE_AUTHORITY_SPRINT_2D.md` — this file.

**Edited:**
- `src/lib/taxonomy.ts` — added `ComparisonEntry` type + `comparisons[]` array + helpers; added `StudyType`, `EvidenceTier`, `StudyEntry` type + `studies[]` array + helpers; flipped `comparisons` and `literature` category `populated` to `true`.
- `src/routes/research-hub.comparisons.$slug.tsx` — replaced placeholder with content-driven route (schema, breadcrumbs, article LD, FAQ LD).
- `src/routes/sitemap[.]xml.ts` — added comparison and study loops.

## 3. Study entity implementation

New `StudyEntry` shape in `src/lib/taxonomy.ts`:

```ts
export interface StudyEntry {
  slug: string;
  title: string;
  shortName?: string;
  pmid?: string;
  doi?: string;
  journal?: string;
  year: number;
  studyType: StudyType;                   // 'cardiovascular-outcomes-trial' | 'kidney-outcomes-trial' | 'programme' | ...
  evidenceTier: EvidenceTier;             // 'landmark-rct' | 'programme-summary' | ...
  summary: string;
  compoundSlugs: readonly string[];
  mechanismIds?: readonly MechanismGroupId[];
  pathwayIds?: readonly string[];
  areaIds?: readonly ResearchAreaId[];
  guideSlugs?: readonly string[];
  updated: string;
  author: string;
  reviewer: string;
  populated: boolean;
}
```

Exposed helpers: `getStudy(slug)`, `studiesByCompound(slug)`, `studiesByMechanism(id)`.

`ComparisonEntry` mirrors the same shape and integrates with the existing compound/guide/mechanism graph via `compoundSlugs`, `mechanismIds`, `guideSlugs`, `studySlugs`.

## 4. Knowledge Graph updates

Registered entities:

- **3 Comparison entities** — each linked to its compounds, mechanisms, guides and reference studies.
- **4 Study entities** — each linked to compound (`semaglutide`), mechanisms (`glp1r`), pathways (`camp-pka`, `glp1r-signalling`), research areas (`receptor-studies`) and related guides.
- **Literature ↔ compound relationships** — bidirectional via `compoundSlugs` on studies and (in reverse) via `studiesByCompound()`.
- **Study ↔ mechanism / pathway / research area** — via typed arrays on `StudyEntry`.
- **Comparison ↔ study** — via `studySlugs` array on `ComparisonEntry`.

All new entities integrate into the existing graph — no new infrastructure required.

## 5. Internal linking

Bidirectional coverage:

- Every comparison links to: monographs (`/compounds/semaglutide`, `/compounds/retatrutide`), Semaglutide primer/mechanism/PK guides, GLP-1 receptor primer, triple-agonists primer, at least two study pages.
- Every study links to: compound monograph, Semaglutide research-applications guide, mechanism guide (SUSTAIN-6), and sibling studies.
- Semaglutide compound entry indirectly discovers all 3 comparisons via `comparisonsByCompound('semaglutide')` and all 4 studies via `studiesByCompound('semaglutide')`.

**Zero orphan pages** — every new page has ≥3 inbound routes and ≥5 outbound links.

## 6. Schema

Existing pipeline only:

- **Article** — per-page (comparisons and studies).
- **BreadcrumbList** — per-page, 4 levels.
- **FAQPage** — per-page from `faqs` array.
- **Person / Organization** — via `PageEditorial` + `ORGANIZATION_LD`.

No unsupported schema emitted. `DefinedTerm` unchanged (glossary layer only).

## 7. Sitemap / Indexation report

`src/routes/sitemap[.]xml.ts` now emits **+7 canonical URLs**:

```
/research-hub/comparisons/semaglutide-vs-retatrutide      priority 0.7
/research-hub/comparisons/semaglutide-vs-tirzepatide      priority 0.7
/research-hub/comparisons/semaglutide-vs-liraglutide      priority 0.7
/research-hub/literature/sustain-6                        priority 0.6
/research-hub/literature/step-programme                   priority 0.6
/research-hub/literature/select-trial                     priority 0.6
/research-hub/literature/flow-trial                       priority 0.6
```

The `Comparisons` and `Scientific Literature` category landings previously emitted `noindex` (both `populated: false`); flipped to `populated: true`, so both indexes are now indexable.

## 8. AI-search readiness

Every comparison and every study page contains:

- Definition-first opening (Quick Answer)
- 150-word Extended Answer (via `HundredFiftyWordAnswer`)
- Machine-readable comparison tables with `<caption>` + `<th scope="col">` (comparisons)
- FAQPage JSON-LD from `faqs`
- Article + Breadcrumb JSON-LD
- Named Author + Reviewer via `articleLd({ authorName, reviewerName })`
- Organization JSON-LD via `ORGANIZATION_LD`

## 9. Editorial

Existing editorial framework only:

- Author: `orp-editorial-team`
- Reviewer: `scientific-review-panel`
- Revisions: `sprint 2D — 2026-10-15 v1.0 published`
- Every scientific claim cite-able against the shared reference registry
- `ScientificDisclaimer` footer on every page
- UK research-use-only framing throughout

## 10. QA

- **Typecheck:** PASS (`bunx tsgo --noEmit`, exit 0).
- **Sitemap:** updated (7 new URLs, verified in file).
- **Study entities indexed:** yes (4).
- **Comparison entities indexed:** yes (3).
- **Schema valid:** Article + BreadcrumbList + FAQPage only, all from existing helpers.
- **Internal links valid:** all destinations resolve to existing routes.
- **No duplicate content:** each comparison and each study covers a distinct entity; overlap is only in shared citations and the shared publishing components.
- **Route regeneration:** `src/routeTree.gen.ts` picks up `research-hub.literature.$slug.tsx` automatically.

## 11. Out of scope (deferred)

- Tirzepatide compound monograph (scaffold only — the comparison architecture supports future activation without change).
- Interactive tools, SVG figures, dashboards.
- Non-Semaglutide-adjacent studies (LEADER, SURPASS-CVOT, SURMOUNT-CVOT — added to backlog).
- Meta-analyses / systematic reviews (backlog).
- Study entity front-end filtering UI on the literature landing (backlog — landing currently defers to `CategoryLanding`).

## 12. Success criteria

- 3 comparison guides ✅
- 4 literature review pages ✅
- Study entity implementation ✅
- Knowledge Graph updates ✅
- Sitemap updated ✅
- Typecheck PASS ✅
- No new platform features, no redesign, no Shopify changes ✅
