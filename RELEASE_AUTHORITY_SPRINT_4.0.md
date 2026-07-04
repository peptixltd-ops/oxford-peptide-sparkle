# Release — Authority Sprint 4.0

**Scope:** Authority optimisation only. No redesign, no Shopify, no new
compound clusters, no new mechanisms, no new comparison / literature pages,
no interactive tools. Every deliverable strengthens the authority of the
existing educational platform through infrastructure and reuse.

---

## 1. Study Citation Graph

New module `src/lib/study-graph.ts` — a query layer over the existing
taxonomy + Knowledge Graph. For any populated study it resolves the full
Study → Compound → Mechanism → Pathway → Glossary → Guide → Comparison →
Methodology → Research Application chain via `studyCitationRecord(slug)`:

* related compounds
* related mechanisms
* related glossary terms
* related literature (sibling studies by compound / mechanism)
* related comparisons
* related methodology (inbound compound → methodology edges)
* related research applications (research areas)
* related guides

No new relationships or content added — the module only exposes what the
graph already knows.

## 2. Author Entity System

New route `src/routes/editorial.authors.$id.tsx` renders a profile for
every id declared in `editorialAuthors`. Each profile automatically
displays:

* Biography
* Role, credentials, affiliation
* Published guides
* Published literature summaries
* Published comparisons
* Recent publications (sorted by ISO `updated`)
* Editorial standards followed (linked to Editorial Policy, Publication
  Workflow, Corrections Policy, Funding & Conflicts)
* `Person` + `AboutPage` + `BreadcrumbList` JSON-LD

Publication membership is derived by `getAuthorProfile(id)` in
`src/lib/editorial-graph.ts` from the `author` field on every guide, study
and comparison record. No fabricated qualifications.

## 3. Reviewer Entity System

Mirrors the Author system at `src/routes/editorial.reviewers.$id.tsx`.
Each reviewer profile automatically displays:

* Role and expertise
* Reviewed guides
* Reviewed literature summaries
* Reviewed comparisons
* Recent reviews
* Editorial responsibilities

`getReviewerProfile(id)` reads the `reviewer` field on every guide, study
and comparison.

The Scientific Advisory Board page now links every person card to its
new profile.

## 4. Citation Quality Audit

New `runCitationAudit()` in `src/lib/editorial-graph.ts` scores every
populated study on DOI / PMID / Journal / Year / Evidence Tier presence.
Surfaced in the editorial dashboard as the "Citation quality" table with
per-study PASS / FAIL status. No identifiers invented — the audit only
reports what's already recorded.

## 5. Scientific Programme Pages

New registry `src/lib/programmes.ts` with five programmes:

| Slug                              | Programme                          | Status |
|-----------------------------------|-----------------------------------|--------|
| `incretin-biology`                | Incretin Biology                   | populated |
| `tissue-repair`                   | Tissue Repair                      | populated |
| `growth-hormone-axis`             | Growth Hormone Axis                | scaffold |
| `cognitive-peptides`              | Cognitive Peptides                 | scaffold |
| `longevity-mitochondrial-biology` | Longevity & Mitochondrial Biology  | scaffold |

Routes:

* `src/routes/research-hub.programmes.index.tsx` (`/research-hub/programmes`)
* `src/routes/research-hub.programmes.$slug.tsx` (`/research-hub/programmes/$slug`)

Each programme page auto-populates from the Knowledge Graph:

* Included compounds
* Core mechanisms
* Landmark literature
* Comparisons
* Research guides
* Methodology
* Glossary terms
* Related research areas
* Reading pathways

No duplicated educational copy — every entity is a link back to its
canonical page.

## 6. Knowledge Graph Health

Extended governance in `src/lib/study-graph.ts`:

* `runExtendedGovernance()` — reciprocal-link check, weak-relationship
  check (populated entity with <2 outbound edges), missing glossary
  coverage per compound (<3 terms), and compounds with no linked studies.
* `runStudyCitationAudit()` — every populated study checked for DOI,
  PMID, journal, compound + mechanism relationship, and guide linkage.

All results are rendered inside the Editorial Dashboard alongside the
existing cluster-completeness and governance sections.

## 7. Scientific Collection Pages

New registry `src/lib/study-collections.ts` with four umbrella
programmes:

| Slug                | Programme                       | Members derived from |
|---------------------|---------------------------------|----------------------|
| `step-programme`    | STEP (Semaglutide obesity)      | `step-*`             |
| `surpass-programme` | SURPASS (Tirzepatide T2D)       | `surpass-*`          |
| `surmount-programme`| SURMOUNT (Tirzepatide obesity)  | `surmount-*`         |
| `sustain-programme` | SUSTAIN (Semaglutide T2D)       | `sustain-*`          |

Routes:

* `src/routes/research-hub.collections.index.tsx` (`/research-hub/collections`)
* `src/routes/research-hub.collections.$slug.tsx` (`/research-hub/collections/$slug`)

Each collection page aggregates:

* Studies (with slug-prefix membership)
* Timeline (sorted by publication year)
* Related compounds
* Mechanisms
* Applications
* Comparisons (via `studySlugs` or compound overlap)
* Reading pathways

Adding a new study slug that matches an existing prefix flows straight
into the correct collection with zero wiring changes.

## 8. Internal-Link Quality Audit

`runInternalLinkAudit()` scores every populated educational page on:

* ≥ 5 outbound contextual links
* ≥ 3 inbound contextual links
* ≥ 3 glossary references
* ≥ 2 study references (for guides / compounds / mechanisms /
  comparisons / literature-review entities)

Rendered as the "Internal-link audit" table in the Editorial Dashboard
with per-page PASS status and missing-threshold badges. Failing pages
are surfaced first.

## 9. AI Citation Optimisation

All new pages are composed entirely from existing reusable primitives
(SiteHeader, SiteFooter, Breadcrumbs, JSON-LD helpers from `@/lib/seo`).
Each page ships:

* Strong opening definition (eyebrow + h1 + summary paragraph)
* Concise answer block (summary badge counts)
* Extended answer (per-section auto-derived content)
* Key facts (counts + timeline)
* Evidence summary (linked studies + timeline for collections)
* References (linked literature summaries)
* Related studies / glossary / mechanisms

## 10. QA

* **Typecheck** — `bunx tsgo --noEmit` → **PASS** (no diagnostics)
* **Sitemap** — updated to include:
  * `/research-hub/programmes` + 5 programme pages
  * `/research-hub/collections` + 4 collection pages
  * `/editorial/authors/*` (2 profiles)
  * `/editorial/reviewers/*` (2 profiles)
  * **+13 new URLs**
* **Canonicals** — every new route emits `seo({ path })` with the correct
  self-canonical URL
* **Schema** — every new route emits `Person`, `AboutPage`, and
  `BreadcrumbList` JSON-LD as appropriate; noindex-only for the missing
  fallback branches
* **Knowledge Graph** — no changes to entity registry; new audits run
  against `knowledgeGraph` at module load with no cycles introduced
* **Governance** — Editorial Dashboard now surfaces:
  * Extended governance issues (reciprocal / weak / glossary / studies)
  * Study citation audit
  * Internal-link audit
  * Citation quality audit
* **No orphan entities** — every author / reviewer / programme /
  collection page is linked from either the Scientific Advisory Board,
  the Research Hub index, or from an existing route via the sitemap
* **No Shopify or product changes**

## Deliverables

| Deliverable                    | File(s) |
|-------------------------------|---------|
| Study Citation Graph          | `src/lib/study-graph.ts` |
| Author Entity Pages           | `src/lib/editorial-graph.ts`, `src/routes/editorial.authors.$id.tsx` |
| Reviewer Entity Pages         | `src/lib/editorial-graph.ts`, `src/routes/editorial.reviewers.$id.tsx` |
| Scientific Programme Pages    | `src/lib/programmes.ts`, `src/routes/research-hub.programmes.index.tsx`, `src/routes/research-hub.programmes.$slug.tsx` |
| Study Collection Pages        | `src/lib/study-collections.ts`, `src/routes/research-hub.collections.index.tsx`, `src/routes/research-hub.collections.$slug.tsx` |
| Governance improvements       | `runExtendedGovernance` + `runStudyCitationAudit` in `src/lib/study-graph.ts`; rendered in `src/routes/dashboard.editorial.tsx` |
| Internal-link audit           | `runInternalLinkAudit` in `src/lib/study-graph.ts`; rendered in dashboard |
| Citation audit                | `runCitationAudit` in `src/lib/editorial-graph.ts`; rendered in dashboard |
| Advisory board profile links  | `src/routes/scientific-advisory-board.tsx` |
| Sitemap update                | `src/routes/sitemap[.]xml.ts` |
| Release notes                 | `RELEASE_AUTHORITY_SPRINT_4.0.md` |
