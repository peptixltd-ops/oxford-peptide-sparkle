# Release 3.1 — Editorial & EEAT Framework

Release 3.1 is a **framework-only** release. No articles, no compound
monographs, no changes to the noindex status of the scaffold pages shipped
in Release 2.1. The goal is to give every future educational page a single
inherited source of truth for authors, reviewers, evidence grading,
citations, revision history, disclaimers and publication workflow — so
Release 4.0 can launch the Retatrutide content cluster on top of a
finished editorial infrastructure.

---

## 1. What ships

### New library — `src/lib/editorial/`

| File            | Responsibility |
| --------------- | -------------- |
| `authors.ts`    | Registry of editorial authors and independent scientific reviewers. Every page cites people by ID (`authorIds`, `reviewerIds`) — never as free text. |
| `policies.ts`   | Publisher identity, framework version, default citation style, review cadence per page type, evidence hierarchy, study-quality grades, research-use disclaimer, COI statement, AI-assistance statement, editorial principles, publication workflow states. |
| `citations.ts`  | Shared reference registry. `registerReference()`, `resolveCitations(ids)`, `allReferences()`, `referenceCount()`. Empty by design — populated alongside content from Release 4.0. |
| `revisions.ts`  | Typed `EditorialRevision` records and helpers to derive `publishedOn`, `updatedOn`, `reviewedOn` and `nextReviewOn` from history + page kind. |
| `index.ts`      | Barrel export. |

### New component — `src/components/editorial/page-editorial.tsx`

`<PageEditorial />` is the single component every future educational page
drops into its editorial slot. It composes the Release 2.0 publishing
primitives (`AuthorCard`, `ScientificReviewerCard`, `PublicationInformation`,
`RevisionHistory`, `EditorialStandardsNotice`, `ConflictOfInterestNotice`,
`ScientificDisclaimer`) with the Release 3.1 registries so that:

- authors and reviewers are resolved by ID from `authors.ts`,
- publication / updated / reviewed / next-review dates are derived from
  the revision history via `deriveEditorialDates()`,
- the standards link, COI notice and research-use-only disclaimer are
  applied consistently on every page,
- the review cadence is enforced from `REVIEW_CADENCE_MONTHS`.

Callers pass `pageKind`, `revisions`, and (optionally) `authorIds`,
`reviewerIds`, `doi`.

### New public routes

| Route                      | Purpose |
| -------------------------- | ------- |
| `/editorial-standards`     | Public editorial policy page: principles, evidence hierarchy, study-quality grades, review cadence, editorial team, scientific reviewers, disclosures (research-use, COI, AI assistance, corrections). |
| `/research-methodology`    | Scientific process: scope, search strategy, source appraisal, evidence grading, citation capture, scientific review, scheduled re-audit. |
| `/publication-workflow`    | End-to-end workflow: draft → scientific review → editorial review → revision → approved → published → scheduled review → retired. Cadence table. |

All three are indexable, canonicalised, and included in `sitemap.xml`.
They inherit the site's design system (navy hero + gold eyebrows + bone
body + white cards) — no bolted-on trust-page palette.

### Updated

- **`src/lib/scaffolds.tsx`** — the three scaffolded pages
  (Reconstitution, HPLC Purity, GLP-1 Mechanism) and two compound
  scaffolds (Retatrutide, BPC-157) now inherit editorial metadata via
  `<PageEditorial />` from the registry instead of hardcoded
  `AuthorCard` / `ScientificReviewerCard` / `RevisionHistory` blocks.
  Their `noindex` status is unchanged.
- **`src/components/site-footer.tsx`** — Company column now links
  Editorial Standards, Research Methodology and Publication Workflow.
- **`src/routes/sitemap[.]xml.ts`** — three new indexable routes added.

---

## 2. Design tenets

- **Inheritance over duplication.** Every editorial fact (author,
  reviewer, disclaimer text, evidence tier descriptor, review interval,
  workflow stage) has exactly one home. Pages reference IDs and enums,
  never free text.
- **Structured, not decorative.** Authors, reviewers, references and
  revisions are typed records. Rendering is derived; storage is not.
- **Derivable dates.** `publishedOn`, `updatedOn`, `reviewedOn` and
  `nextReviewOn` are computed from the revision history + page kind.
  Pages cannot desynchronise these fields.
- **Scaffolds stay noindex.** The scaffolds now demonstrate the
  inherited editorial footer, but remain `noindex` until Release 4.0
  replaces them with real editorial content.

---

## 3. Authoring model — how a future page uses the framework

```tsx
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";

const revisions: EditorialRevision[] = [
  { kind: "created",   version: "0.1", date: "2026-08-01", summary: "Draft assembled." },
  { kind: "reviewed",  version: "0.9", date: "2026-08-14", summary: "Scientific review complete." },
  { kind: "published", version: "1.0", date: "2026-08-20", summary: "Published." },
];

<PageEditorial
  pageKind="compound"
  authorIds={["orp-editorial-team"]}
  reviewerIds={["scientific-review-panel"]}
  revisions={revisions}
  doi="10.xxxx/xxxxx" // optional
/>
```

That single element renders authors, reviewers, publication
information, revision history, editorial standards notice, COI notice,
next scheduled review date, and the research-use-only disclaimer.

---

## 4. Deliverables checklist

- [x] Editorial system — `src/lib/editorial/policies.ts`
- [x] Author framework — `src/lib/editorial/authors.ts`
- [x] Reviewer framework — `src/lib/editorial/authors.ts`
- [x] Citation management — `src/lib/editorial/citations.ts`
- [x] Version history — `src/lib/editorial/revisions.ts`
- [x] Editorial policy page — `/editorial-standards`
- [x] Research methodology page — `/research-methodology`
- [x] Publication workflow — `/publication-workflow` + `PUBLICATION_WORKFLOW` enum
- [x] Inheritance component — `<PageEditorial />`
- [x] Scaffold pages migrated to inherit from the framework
- [x] Footer + sitemap updated
- [x] `RELEASE_3.1_NOTES.md`

---

## 5. Explicitly not shipped in 3.1

- No articles, monographs or mechanism narratives.
- No changes to `noindex` on scaffold pages.
- No Retatrutide content cluster (Release 4.0).
- No seed citations in the registry — real references arrive alongside
  the first flagship cluster.

---

## 6. Recommendations for Release 4.0

1. **Retatrutide flagship cluster.** Compound monograph +
   GLP-1 mechanism + Reconstitution methodology + supporting guide,
   fully interconnected via the Knowledge Graph, each rendering
   `<PageEditorial />` with real revisions.
2. **Seed the citation registry.** ~30–50 canonical peptide-pharmacology
   references registered via `registerReferences()` and shared across
   the cluster.
3. **Remove `noindex`** from the cluster pages once scientific review is
   complete and the workflow reaches `published`.
4. **Author profile pages** at `/editorial/authors/$id` (optional; only
   if real named individuals replace the current team-level entries).
5. **JSON-LD `Article` schema** on published pages, populated from
   `PageEditorial` data via a small helper.
