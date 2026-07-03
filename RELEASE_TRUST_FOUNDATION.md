# Release Trust Foundation — Notes

Scope: EEAT, trust, editorial transparency, scientific credibility.
No new compound clusters. No new peptide articles. No redesign. No Shopify changes.

## Trust pages created

All render via the shared `LegalPage` primitive, are indexable, canonicalised, and
emit `AboutPage` / `MedicalWebPage` + `BreadcrumbList` JSON-LD. Each is added to
`sitemap.xml` and linked from a new footer "TRUST" column.

| Route | Schema | Purpose |
| --- | --- | --- |
| `/editorial-policy` | `AboutPage` + `BreadcrumbList` | Editorial mission, workflow, evidence hierarchy, reference standards, independence, corrections pointer. |
| `/corrections-policy` | `AboutPage` + `BreadcrumbList` | What we correct, how to report, response process, revision-history transparency. |
| `/funding-and-conflicts` | `AboutPage` + `BreadcrumbList` | Funding disclosure, commercial COI, editorial/product separation, no paid placements. |
| `/scientific-advisory-board` | `AboutPage` + `Person[]` + `BreadcrumbList` | Editorial Team and Scientific Review Panel by role — no fabricated named credentials. |
| `/testing-and-quality-control` | `AboutPage` + `BreadcrumbList` | Analytical programme (identity/MS, purity/RP-HPLC), batch traceability, scope + limits. |
| `/certificate-of-analysis` | `AboutPage` + `BreadcrumbList` | What a COA contains, how to request one, what it is not. Uses shared `CoaCard`. |
| `/research-use-only` | `MedicalWebPage` (`ResearchAspect`) + `BreadcrumbList` | UK research-use-only notice — not a medicine, not for human/animal use, not clinical guidance. |

## Author / reviewer transparency

- Scientific Advisory Board page renders every entry from the existing
  `src/lib/editorial/authors.ts` registry with role, credentials, affiliation, bio,
  and (for reviewers) explicit expertise areas.
- Each person emits `Person` JSON-LD with `jobTitle`, `description`, and
  `affiliation`. `sameAs` support is wired in the helper for future named
  attributions — no unverified `sameAs` links added.
- Existing `AuthorCard` / `ScientificReviewerCard` (Editorial framework) already
  render on every populated educational page via `PageEditorial`.

## Schema helpers added (`src/lib/seo.ts`)

- `personLd({ name, jobTitle, description, url, sameAs, affiliation })`
- `aboutPageLd(path, name, description)`
- `webPageLd(path, name, description)`
- `medicalWebPageLd(path, name, description, aspect?)`

All existing helpers unchanged (`articleLd`, `chemicalSubstanceLd`, `faqLd`,
`definedTermLd`, `breadcrumbLd`, `ORGANIZATION_LD`).

## Research-use framing

- Added a persistent above-the-fold **UK Research Use Only** notice bar to
  `CompoundLayout` (renders under the hero on every compound monograph and
  scaffold), linking to `/research-use-only`.
- The `ScientificDisclaimer` block continues to render inside `PageEditorial` on
  every populated educational page.
- No changes to educational voice — pages remain research-first, no medical
  advice language introduced.

## Reference formatting

- Editorial and Corrections pages now formally anchor AMA citation style and DOI /
  PMID rendering to the existing `Editorial Standards` page. The publishing
  library (`enhanced-references`, `references`) already renders DOI/PMID as
  resolvable links; no component changes required.

## Footer

- New `TRUST` column added to `src/components/site-footer.tsx`, sitting alongside
  `LEGAL` and `POLICIES`. Main site navigation is unchanged.

## Sitemap / indexation

- All seven trust routes appended to `src/routes/sitemap[.]xml.ts`.
- No `noindex` applied to any trust page (verified — `seo()` only emits robots
  meta when `noindex: true`).
- Canonicals emitted via central `seo()` helper.

## Files created

- `src/routes/editorial-policy.tsx`
- `src/routes/corrections-policy.tsx`
- `src/routes/funding-and-conflicts.tsx`
- `src/routes/scientific-advisory-board.tsx`
- `src/routes/testing-and-quality-control.tsx`
- `src/routes/certificate-of-analysis.tsx`
- `src/routes/research-use-only.tsx`
- `RELEASE_TRUST_FOUNDATION.md`

## Files edited

- `src/lib/seo.ts` — trust schema helpers.
- `src/components/site-footer.tsx` — TRUST column.
- `src/components/knowledge/compound-layout.tsx` — above-the-fold RUO notice bar.
- `src/routes/sitemap[.]xml.ts` — trust routes.

## QA

- No fabricated author names, credentials, or `sameAs` links introduced.
- No unsupported product / clinical claims introduced.
- Trust pages are indexable and canonicalised.
- Schema types used are within the requested allowlist: `Person`, `Organization`,
  `AboutPage`, `WebPage`, `MedicalWebPage`, `BreadcrumbList`, `ChemicalSubstance`.
- Typecheck: run via project's automatic build/typecheck pipeline.
