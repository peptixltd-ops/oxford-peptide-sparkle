# Authority Sprint 2B — Semaglutide Cluster (Wave 1)

## Objective

Transform Semaglutide from a scaffold entity into a populated,
indexable authority cluster foundation. Content activation only —
no new components, no new layouts, no Shopify changes, no
comparison pages, no interactive tools, no SVG figures.

## Wave 1 Scope (published)

### Compound monograph
- `/compounds/semaglutide` — cornerstone monograph covering
  overview, identity, synonyms, research classification, chemical
  metadata (formula, MW, CAS, developmental code, modification
  summary), mechanism (GLP-1R / cAMP / PKA / EPAC2 / β-arrestin /
  central appetite), pharmacokinetics (Aib8, Arg34, lysine-26
  fatty-di-acid, albumin binding, half-life, steady state, SC/oral
  bioavailability, SNAC), research applications, laboratory
  methodology, storage, reconstitution, evidence summary, research
  limitations, regulatory framing, FAQs, references, editorial
  metadata and revision history.

### Research guides
- `/research-hub/guides/what-is-semaglutide` — beginner primer.
- `/research-hub/guides/semaglutide-mechanism-of-action` —
  receptor-level mechanism note (GLP-1R → Gαs → cAMP / PKA / EPAC2;
  β-arrestin; insulinotropic; glucagonostatic; gastric emptying;
  central appetite modulation).
- `/research-hub/guides/semaglutide-faq` — 20-question research
  FAQ, rendered with per-question `<section aria-labelledby>` and
  emitted as `FAQPage` JSON-LD.

### Glossary Batch 2 (25 entries)
`glp-1`, `incretin`, `incretin-effect`, `glp-1-receptor-agonist`,
`biased-agonism`, `beta-arrestin`, `camp-pka-signalling`, `epac2`,
`gastric-emptying`, `pomc-neuron`, `npy-neuron`, `insulinotropic`,
`glucagonostatic`, `acylation`, `albumin-binding`, `snac`,
`subcutaneous-administration`, `steady-state`,
`receptor-internalisation`, `desensitisation`, `mace`, `dio-model`,
`native-glp-1`, `oral-semaglutide`, `semaglutide`.

Every entry carries: short definition, extended body (2–3
paragraphs), a "Why it matters" callout, aliases, related-glossary
and related-compound edges, and `DefinedTerm` JSON-LD with `sameAs`
identifiers where a stable canonical source exists (Wikidata, MeSH,
Wikipedia, DrugBank). No `sameAs` values were fabricated —
entries without a stable external identifier ship without one.

Two audit-requested slugs (`cAMP`, `PKA`) already exist in Batch 1
as `camp` and `protein-kinase-a` and are cross-linked from new
Batch 2 entries. A new `camp-pka-signalling` entry covers the
signalling module explicitly, and `semaglutide` is registered as a
short glossary anchor pointing to the full monograph, keeping the
new-entry count at 25.

## Knowledge Graph updates

`src/lib/taxonomy.ts` registers:
- `compoundEntries` → `semaglutide` (populated), family
  `incretin-mimetics`, mechanism `glp1r`, cross-linked
  `guideSlugs` including the existing `glp-1-receptor-explained`
  and `triple-agonists-explained`.
- `guides` → three new Semaglutide guides, all `populated: true`
  with named author (`orp-editorial-team`) and reviewer
  (`scientific-review-panel`).
- `glossaryTerms` → 25 Batch 2 slugs, all `populated: true`.

The Knowledge Graph (`src/lib/knowledge-graph.ts`) picks these up
automatically through its taxonomy adapters — no direct graph
edits were required. Semaglutide is therefore related, at the
graph level, to: `glp-1-receptor`, `retatrutide`, `incretin-mimetics`
family, the reconstitution and storage methodology entries, and
the Batch 2 glossary anchors.

## Schema pipeline

Only accurate schema types are emitted:
- Monograph: `ChemicalSubstance` (formula, MW, CAS, developmental
  code, Wikidata Q27088395, DrugBank DB13928), `Article`,
  `BreadcrumbList`, `FAQPage`, `Organization` (via publisher).
- Guides: `Article`, `BreadcrumbList`, `FAQPage` (with per-guide
  supplemental Q&A merged from `semaglutideGuideFaqSupplements`).
- Glossary: `DefinedTerm` with `sameAs` links (Wikidata, MeSH,
  Wikipedia, DrugBank) where verified.

No unsupported schema types (e.g. `Drug`, `MedicalTherapy`) were
emitted — Semaglutide is framed as an in-vitro reference standard.

## Content registry

`src/content/registry.ts` now merges three cluster registries
(Retatrutide, BPC-157, Semaglutide). The unified helpers
(`getCompoundMonographRecord`, `getGuideContent`,
`getExtendedAnswer`, `getFaqSupplement`) fall through cluster
files in order, so route files remain cluster-agnostic.

## Sitemap and indexation

`src/routes/sitemap[.]xml.ts` continues to iterate
`compoundEntries`, `guides` and `glossaryTerms` filtered by
`populated: true`. Registering the new slugs in taxonomy therefore
adds them automatically:
- 1 new compound URL (`/compounds/semaglutide`)
- 3 new guide URLs
- 25 new glossary URLs

Total 29 new indexable URLs. All other future Wave 2/3/4 pages
remain uncreated; scaffolds continue to emit `noindex` via
`PlaceholderKnowledgePage`.

## Internal linking

Every new guide interlinks with the monograph, at least one
Semaglutide-adjacent guide (`glp-1-receptor-explained` /
`triple-agonists-explained`), the Retatrutide monograph and the
trust pages (`/research-use-only`, `/testing-and-quality-control`).
The FAQ guide additionally links to seven Batch 2 glossary anchors
and back to the monograph. No orphan pages: each new page has ≥ 5
contextual outbound links and each glossary entry has ≥ 2 related
edges.

## Editorial

- Named author: `orp-editorial-team` (registered).
- Named reviewer: `scientific-review-panel` (registered).
- Publication and last-reviewed dates: 2026-09-02.
- Revision history rendered via `PageEditorial` on every page.
- Every page carries the `ScientificDisclaimer` and, on the
  monograph, an `ImportantNote` framing Semaglutide as an
  in-vitro reference standard distinct from approved medicines
  (Ozempic, Wegovy, Rybelsus).

## AI Search Optimisation

`src/content/semaglutide-cluster-ai.tsx` supplies:
- 120–180 word extended answers for each of the three guides,
  rendered under the QuickAnswer via GuideLayout's
  `extendedAnswer` slot.
- FAQ supplements merged into the per-page `FAQPage` JSON-LD.

## QA

- **Typecheck:** `bunx tsgo --noEmit` — **PASS**.
- **Sitemap:** driven by taxonomy — 29 new indexable URLs
  automatically included.
- **Canonicals:** every new head() calls `seo({ path })` so
  canonical URLs are correct.
- **Schema:** no unsupported types; `sameAs` identifiers are
  restricted to verifiable sources.
- **Knowledge Graph:** new entities and edges surfaced via
  taxonomy adapters; no direct graph mutations.
- **Orphan check:** every new page has ≥ 5 contextual outbound
  links; every glossary entry has ≥ 2 related edges.
- **Shopify:** untouched.

## Files created

- `src/content/semaglutide-cluster.tsx`
- `src/content/semaglutide-cluster-ai.tsx`
- `RELEASE_AUTHORITY_SPRINT_2B.md`

## Files edited

- `src/content/glossary-content.tsx` (+25 Batch 2 entries)
- `src/lib/taxonomy.ts` (+1 compound, +3 guides, +25 glossary
  terms)
- `src/content/registry.ts` (cluster merged into unified lookups)

## Not in scope (deferred)

- Wave 2: Semaglutide pharmacokinetics guide, research
  applications guide, albumin-binding half-life extension guide,
  incretin-effect explained guide.
- Wave 3: Comparison pages (`semaglutide-vs-tirzepatide`,
  `semaglutide-vs-retatrutide`, `semaglutide-vs-liraglutide`).
- Wave 4: cAMP / PKA and β-arrestin dedicated mechanism guides,
  GLP-1 mono-agonists family page, oral Semaglutide dedicated
  guide.
- Wave 5: SELECT / STEP / SUSTAIN / PIONEER / FLOW literature
  pages (requires new `Study` entity type — future scope).
- SVG figure production and interactive tools (Reconstitution
  Calculator, Half-life Visualiser, Receptor Selectivity
  Comparator) — Sprint 3.
