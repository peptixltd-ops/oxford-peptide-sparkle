# Release 4.0 — Retatrutide Authority Cluster & Compound Authority Framework

Release 4.0 begins **content activation**. Rather than shipping a handful of
one-off articles, this release establishes the reusable **Compound Authority
Framework** that every future monograph will consume — and lands the first
end-to-end implementation of it around **Retatrutide**.

Everything in this release is data-driven and inherits from the
Release 1.2 taxonomy, Release 2.0 publishing components, Release 3.0
Knowledge Graph and Release 3.1 editorial framework. No layout or
infrastructure was forked.

---

## 1. Expanded `CompoundLayout` (Compound Authority Template)

`src/components/knowledge/compound-layout.tsx` now supports every section a
scientific monograph needs. Each is an **optional slot** — an omitted slot
does not render:

| Slot                    | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `quickDefinition`       | One-line hero definition                            |
| `overview`              | Editorial abstract                                  |
| `identity`              | Identity summary                                    |
| `synonyms`              | Structured synonyms / codes                         |
| `researchClassification`| Family, class, mechanism-group tagging              |
| `chemicalMetadata`      | IUPAC, formula, MW, CAS, sequence                   |
| `mechanism`             | Mechanism of action narrative                       |
| `receptorTargets`       | Receptor table                                      |
| `relatedMechanisms`     | Knowledge-Graph-driven links                        |
| `pharmacology`          | Pharmacokinetics / receptor selectivity             |
| `researchApplications`  | In-vitro applications and model systems             |
| `researchAreas`         | Cross-cutting research areas                        |
| `laboratoryMethodology` | Analytical characterisation                         |
| `storage`               | Storage & handling                                  |
| `reconstitution`        | Reconstitution procedure summary                    |
| `laboratoryNotes`       | Additional handling notes                           |
| `evidenceSummary`       | Evidence tier + limitations                         |
| `faqs`                  | Frequently asked questions                          |
| `references`            | Reference list (via `ReferenceProvider`)            |
| `relatedGuides`         | Related guides card                                 |
| `relatedProducts`       | Related product SKUs                                |
| `relatedComparisons`    | Related comparisons                                 |
| `editorial`             | `<PageEditorial />` block                           |

Backwards-compatible with Release 2.1 scaffolds and the pre-4.0 signature.

---

## 2. Content module — `src/content/retatrutide-cluster.tsx`

Single self-contained module that publishes the flagship cluster:

- **Shared reference registry** (Coskun 2022, Jastreboff 2023, Rosenstock
  2023, Baggio & Drucker 2007, Drucker 2018, de Graaf 2016) — 6 primary
  sources threaded through the monograph and guides via `<Cite />`.
- **Retatrutide monograph** — real content across every new
  `CompoundLayout` slot.
- **Four supporting guides** — each returns a full `GuideLayoutProps`:
  1. **What is Retatrutide?** (`/research-hub/guides/what-is-retatrutide`)
  2. **Retatrutide Mechanism of Action** (`.../retatrutide-mechanism-of-action`)
  3. **GLP-1 Receptor Explained** (`.../glp-1-receptor-explained`)
  4. **Laboratory Reconstitution Guide** (`.../laboratory-reconstitution-guide`)

Registries: `getCompoundMonograph(slug)` and `getGuideContent(slug)`.
Adding a second compound cluster in a later release means dropping a new
file into `src/content/` and registering it — no route or layout changes.

---

## 3. Route changes

- **`compounds.$slug.tsx`** — three-tier resolution: real monograph →
  Release 2.1 scaffold → empty template.
- **`research-hub.guides.$slug.tsx`** — real guide content is rendered
  with `GuideLayout` and full `head()` metadata; missing slugs continue
  to render the `PlaceholderKnowledgePage`.

---

## 4. Editorial & Knowledge Graph integration

- Every populated page renders `<PageEditorial />` (Release 3.1) with
  authors, reviewers, revision history, next-review date, standards
  notice, COI notice and disclaimer — inherited from the registries.
- `RelatedGuides`, `RelatedCompounds`, `RelatedMechanisms` remain the
  single source of cross-links; the taxonomy update below is all it took
  for them to start populating.

## 5. Taxonomy updates (`src/lib/taxonomy.ts`)

- `researchCategories["guides"].populated → true`
- `researchCategories["compounds"].populated → true`
- `compoundEntries["retatrutide"].populated → true`
- `guides` array populated with four `populated: true` entries covering
  the four new supporting guides.

---

## 6. Indexation changes

Removed `noindex` from:

- `/compounds` (landing) — auto-flipped by `populated: true`.
- `/research-hub/guides` (landing) — same.
- `/compounds/retatrutide` — served by the new monograph branch, which
  never sets `noindex`.
- The four supporting guides — served by the new content branch.

All other scaffolds (BPC-157, methodology, mechanism scaffolds, etc.)
remain `noindex` until a subsequent release publishes their content.

---

## 7. Schema.org / JSON-LD

`seo()` now accepts an optional `jsonLd` array and emits it as
`<script type="application/ld+json">`. Builders added in `src/lib/seo.ts`:

- `articleLd({ ... })` — Article + Person author + Person reviewer + Organization publisher
- `chemicalSubstanceLd({ ... })` — ChemicalSubstance with molecular formula, molecular weight and PropertyValue identifiers (CAS, developmental code)
- `breadcrumbLd([ ... ])` — BreadcrumbList
- `faqLd([ ... ])` — FAQPage
- `ORGANIZATION_LD` — reused across pages

Retatrutide compound page emits: ChemicalSubstance + Article +
BreadcrumbList + FAQPage. Each guide emits: Article + BreadcrumbList
(+ FAQPage where FAQs exist).

---

## 8. Sitemap

`src/routes/sitemap[.]xml.ts` now enumerates populated compounds and
populated guides directly from the taxonomy — new populated entries
appear in the sitemap on their next request.

---

## 9. QA

- `bunx tsgo --noEmit` — **PASS**.
- All internal links use `<Link to>` / typed hrefs to existing routes.
- Canonicals and `og:url` self-reference each page.
- Knowledge Graph relationships resolve for `retatrutide`, and
  `RelatedGuides` now returns the four new guides on the monograph.
- Breadcrumbs render on every new page.

---

## 10. What ships next

- Second compound cluster using the same framework (e.g. Semaglutide or
  Tirzepatide) — expected effort: content only.
- Populating the mechanism landing pages once each mechanism has an
  original article.
- Comparison articles (Retatrutide vs Tirzepatide) once a second cluster
  lands.

---

**Deliverables**

- Retatrutide compound authority cluster ✅
- Expanded `CompoundLayout` ✅
- Four supporting educational guides ✅
- Production JSON-LD (Article, ChemicalSubstance, BreadcrumbList, FAQPage, Organization, Person) ✅
- Indexation flipped for populated surfaces ✅
- `RELEASE_4.0_NOTES.md` ✅
- Typecheck **PASS** ✅
