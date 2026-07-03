# RELEASE — Authority Sprint 2C

**Scope:** Semaglutide cluster depth expansion. Content activation only.
**Status:** Complete. `bunx tsgo --noEmit` PASS.
**Date:** 2026-10-01

---

## 1. Deliverables

Four new depth guides published under `/research-hub/guides/`:

| Slug | Type | Reading | Purpose |
|---|---|---|---|
| `semaglutide-pharmacokinetics` | Mechanism note | 8 min | Half-life, albumin binding, acylation, SC vs oral absorption, distribution, steady state, research limitations |
| `semaglutide-research-applications` | Primer | 9 min | Metabolic, CV, renal, CNS/neuroinflammation, NAFLD/MASH — with preclinical vs human evidence split |
| `albumin-binding-half-life-extension` | Mechanism note | 7 min | Reusable mechanism guide for GLP-1 peptides (Semaglutide + Liraglutide + Retatrutide context) |
| `incretin-effect-explained` | Primer | 7 min | Reusable foundation guide covering GLP-1 / GIP biology |

Each guide includes: Quick Answer · Extended Answer (150-word) · Key Facts · Evidence Snapshot · Research Limitations · References · Author (`orp-editorial-team`) · Reviewer (`scientific-review-panel`) · Last reviewed date · UK research-use-only framing.

## 2. Files changed

- `src/content/semaglutide-cluster.tsx` — 4 new `GuideContent` records + shared `sprint2cRevisions` + `commonRelatedLinks`.
- `src/content/semaglutide-cluster-ai.tsx` — 4 new extended answers (150-word format) for the AI-search layer.
- `src/lib/taxonomy.ts` — 4 new entries in the `guides` array + updated `guideSlugs` on the Semaglutide compound entry.
- `RELEASE_AUTHORITY_SPRINT_2C.md` — this file.

**No** platform features, layouts, UI components, Shopify config, glossary content, comparison pages, interactive tools or SVG figures were created or modified.

## 3. Knowledge Graph updates

Registered relationships (via taxonomy):

- `semaglutide-pharmacokinetics` → compound `semaglutide` · mechanism `glp1r` · area `peptide-chemistry`
- `semaglutide-research-applications` → compound `semaglutide` · mechanism `glp1r` · area `receptor-studies`
- `albumin-binding-half-life-extension` → compounds `semaglutide`, `retatrutide` · mechanism `glp1r`
- `incretin-effect-explained` → compounds `semaglutide`, `retatrutide` · mechanisms `glp1r`, `gipr`

Semaglutide compound entry now surfaces 9 guides (was 5): the three Wave 1 pieces, four new depth pieces, plus the shared `glp-1-receptor-explained` and `triple-agonists-explained` primers. `RelatedGuides` automatically picks these up.

## 4. Internal linking

Every new page contains a shared `commonRelatedLinks` footer linking to:

- `/compounds/semaglutide` (monograph)
- `/research-hub/guides/what-is-semaglutide`
- `/research-hub/guides/semaglutide-mechanism-of-action`
- `/research-hub/guides/glp-1-receptor-explained`
- `/compounds/retatrutide`
- `/research-hub/guides/triple-agonists-explained`
- `/research-use-only`
- `/testing-and-quality-control`

Plus inline glossary/mechanism/guide cross-links inside the body copy. **Zero orphan pages** — each guide is inbound-linked from the Semaglutide compound entry (via `guideSlugs`) and outbound-linked to ≥8 destinations.

## 5. Schema

Existing schema pipeline only:

- `Article` (per-page, via GuideLayout)
- `BreadcrumbList` (per-page)
- `FAQPage` (merged from per-guide `faqs` + AI FAQ supplements)
- `Person` / `Organization` (via `PageEditorial`)

No unsupported schema emitted. `DefinedTerm` untouched (glossary layer).

## 6. Sitemap / Indexation report

`src/routes/sitemap[.]xml.ts` reads the taxonomy directly, so the four new guides are indexed automatically. **+4 canonical URLs**:

```
/research-hub/guides/semaglutide-pharmacokinetics
/research-hub/guides/semaglutide-research-applications
/research-hub/guides/albumin-binding-half-life-extension
/research-hub/guides/incretin-effect-explained
```

All entries `populated: true`, so no accidental `noindex`. Canonicals resolve to `https://oxfordresearchpeptides.com` + path.

## 7. QA

- **Typecheck:** PASS (`bunx tsgo --noEmit`, exit 0).
- **Sitemap:** updated automatically via taxonomy (verified above).
- **Canonicals:** correct (guides route emits per-slug canonical from taxonomy).
- **Schema:** valid — existing pipeline only.
- **Knowledge Graph:** valid — all mechanism, compound, area references resolve to existing taxonomy IDs.
- **No orphan pages:** each new guide has inbound + outbound links.
- **Wave 1 regression:** `what-is-semaglutide`, `semaglutide-mechanism-of-action`, `semaglutide-faq` untouched and still pass.
- **No fake credentials, no unsupported claims, no dosing/therapeutic advice, no sales language.**

## 8. Editorial standards applied

- Clear preclinical vs human evidence split on research-applications guide.
- Every clinical claim traceable to the shared `semaglutideReferences` citation registry.
- UK research-use-only framing on every page.
- Educational, neutral tone. No "buy" or product-marketing language.

## 9. Not in scope (deferred)

Per brief: no interactive tools, no SVG figures, no comparison pages, no new glossary batch, no platform features. These remain on the roadmap for Sprints 2D+.
