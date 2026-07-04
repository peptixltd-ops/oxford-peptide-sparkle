# Research Literature Programme 1 — Landmark peptide trial summaries

Status: shipped. Typecheck PASS (`bunx tsgo --noEmit`, exit 0).

## Objective

Begin building the UK's strongest educational library of landmark peptide
research studies. Publish neutral, citation-friendly scientific
summaries — never reproductions — of the pivotal STEP, SURPASS and
Retatrutide Phase 2 trials, all rendered through the existing
Literature route infrastructure.

## Scope

Content-only sprint. No new platform features, no publishing
infrastructure changes, no compound-page changes, no Shopify changes.

Every study page is rendered by the existing
`/research-hub/literature/$slug` route via the existing `GuideLayout`
publishing shell.

## Deliverables

### 13 new study pages

**Semaglutide (STEP programme):**
- `/research-hub/literature/step-1` — STEP-1 (Wilding et al. 2021, NEJM)
- `/research-hub/literature/step-2` — STEP-2 (Davies et al. 2021, Lancet)
- `/research-hub/literature/step-3` — STEP-3 (Wadden et al. 2021, JAMA)
- `/research-hub/literature/step-4` — STEP-4 (Rubino et al. 2021, JAMA)
- `/research-hub/literature/step-5` — STEP-5 (Garvey et al. 2022, Nature Medicine)
- `/research-hub/literature/step-8` — STEP-8 (Rubino et al. 2022, JAMA)

**Tirzepatide (SURPASS programme):**
- `/research-hub/literature/surpass-1` — SURPASS-1 (Rosenstock et al. 2021, Lancet)
- `/research-hub/literature/surpass-2` — SURPASS-2 (Frías et al. 2021, NEJM)
- `/research-hub/literature/surpass-3` — SURPASS-3 (Ludvik et al. 2021, Lancet)
- `/research-hub/literature/surpass-4` — SURPASS-4 (Del Prato et al. 2021, Lancet)
- `/research-hub/literature/surpass-5` — SURPASS-5 (Dahl et al. 2022, JAMA)

**Retatrutide (Phase 2):**
- `/research-hub/literature/retatrutide-phase-2-obesity` — Jastreboff et al. 2023, NEJM
- `/research-hub/literature/retatrutide-phase-2-diabetes` — Rosenstock et al. 2023, Lancet

Every page contains the required sections: Quick Summary, Extended
Summary, Background, Study Design, Population, Intervention,
Comparator, Primary Endpoints, Secondary Endpoints, Key Findings,
Mechanistic Significance, Limitations, Research Context, Related
Compounds, Related Mechanisms, Related Guides, Related Studies,
References with DOI + PMID + Journal + Publication Date, editorial
metadata and Research-Use-Only framing.

### Knowledge Graph updates

Each study is registered as a first-class entity in
`src/lib/taxonomy.ts`, alongside the pre-existing SUSTAIN-6, STEP
programme umbrella, SELECT and FLOW records. Every new entry declares:

- `compoundSlugs` — links back to `/compounds/{semaglutide|tirzepatide|retatrutide}`
- `mechanismIds` — GLP-1R (all), plus GIPR (Tirzepatide, Retatrutide)
  and GCGR (Retatrutide)
- `pathwayIds` — `glp1r-signalling`
- `areaIds` — `receptor-studies`
- `guideSlugs` — links to the corresponding compound guides

This propagates automatically to the sitemap pipeline
(`src/routes/sitemap.xml.ts` already iterates `studies.filter(populated)`).

### Schema pipeline

Each `/research-hub/literature/$slug` page emits the existing schema
set via `src/routes/research-hub.literature.$slug.tsx`:

- `Article` (headline, description, dates, author, reviewer)
- `BreadcrumbList`
- `FAQPage` (from each page's FAQ pairs)

No new schema types were introduced — the sprint reuses the existing
Article/Breadcrumb/FAQ pipeline supported by `src/lib/seo.ts`.

### AI-search extended answers

Each page renders a 120–180 word `HundredFiftyWordAnswer` "Extended
answer" block explicitly answering
"What was the {trial} trial?" in a citation-friendly form,
alongside two structured FAQ pairs per page.

## Internal linking

Every study page links to:

- Its compound monograph (`/compounds/{slug}`)
- Its top three related compound guides (What is, Mechanism, Applications/FAQ)
- Its related mechanism pages (via `RelatedMechanisms`)
- The full set of sibling studies in its programme (STEP / SURPASS)
  plus at least one cross-class comparator (e.g. Retatrutide pages
  link to SURPASS-2 and STEP-1; SURPASS-2 links to STEP-8; STEP pages
  cross-link to SURPASS)

No orphan pages introduced.

## Sitemap / indexation report

Diff: **+13 canonical URLs** under `/research-hub/literature/`.

Existing Literature URLs retained: `/sustain-6`, `/step-programme`,
`/select-trial`, `/flow-trial`.

Total Literature URLs after sprint: **17 populated study pages**.

All pages are indexable — `populated: true` for every new
`StudyEntry`; the route file emits real `<meta>` and canonical values
via `seo()` and does not set `noindex` when a `StudyContent` record
exists.

## Study entity report

| Slug | Compound | Type | Journal | Year |
|---|---|---|---|---|
| step-1 | Semaglutide | RCT | NEJM | 2021 |
| step-2 | Semaglutide | RCT | Lancet | 2021 |
| step-3 | Semaglutide | RCT | JAMA | 2021 |
| step-4 | Semaglutide | RCT | JAMA | 2021 |
| step-5 | Semaglutide | RCT | Nature Medicine | 2022 |
| step-8 | Semaglutide | RCT | JAMA | 2022 |
| surpass-1 | Tirzepatide | RCT | Lancet | 2021 |
| surpass-2 | Tirzepatide / Semaglutide | RCT | NEJM | 2021 |
| surpass-3 | Tirzepatide | RCT | Lancet | 2021 |
| surpass-4 | Tirzepatide | RCT | Lancet | 2021 |
| surpass-5 | Tirzepatide | RCT | JAMA | 2022 |
| retatrutide-phase-2-obesity | Retatrutide | RCT | NEJM | 2023 |
| retatrutide-phase-2-diabetes | Retatrutide | RCT | Lancet | 2023 |

Every entry carries a real DOI and PMID.

## Files changed

- `src/content/programme1-studies.tsx` — new; 13 study configurations
  and a shared `buildStudyContent` factory
- `src/content/studies-content.tsx` — extended `studyRegistry` with
  `programme1Studies`
- `src/lib/taxonomy.ts` — 13 new `StudyEntry` records
- `RELEASE_RESEARCH_PROGRAMME_1.md` — this document

## QA

- Typecheck: `bunx tsgo --noEmit` — PASS
- Sitemap: 13 new canonical URLs auto-emitted by the existing pipeline
- Schema: Article + BreadcrumbList + FAQPage per page via
  `research-hub.literature.$slug.tsx`
- Knowledge Graph: every study linked back to compound / mechanism /
  pathway / research area / guides / sibling studies
- Editorial framing: every page carries `ScientificDisclaimer`,
  `PageEditorial` revision log and a Research-Use-Only note
- Content quality: neutral summaries, no reproduced journal text, no
  medical guidance, findings vs interpretation clearly separated
