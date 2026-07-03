# Release 6.0A — AI Search Optimisation

## Objective

Release 6.0A improves every published guide in the Retatrutide
authority cluster for AI retrieval, generative-search summaries and
semantic understanding. No new pages, no redesigns, no infrastructure
work.

## Deliverables

### 1. Quick-answer stack (H1 → 40–60w Quick Answer → 120–180w
Extended Answer → Key Facts)

Every published guide now surfaces three complementary answer layers
in this order beneath the H1:

- **Quick Answer** (existing `<QuickAnswer>` block, 40–60 words):
  concise, evidence-based definition.
- **Extended Answer** (new): 120–180 word structured explanation
  built on the existing `<HundredFiftyWordAnswer>` AI-readability
  block, marked up with `data-ai-block="answer-150"` and
  `data-ai-question=…` for LLM extraction.
- **Key Facts** (existing `<KeyFacts>` panel).

Implementation: additive `extendedAnswer` slot on `GuideLayoutProps`
(`src/components/knowledge/guide-layout.tsx`), rendered between the
Quick Answer and Key Facts sections. Extended-answer content for all
ten guides lives in a new module keyed by slug
(`src/content/retatrutide-cluster-ai.tsx`) and is injected by the
guide route — no edits to the existing per-guide `buildLayout` calls
were needed.

### 2. DefinedTerm schema (new)

New `definedTermLd` helper in `src/lib/seo.ts` emits schema.org
`DefinedTerm` metadata for entity-first pages. Registered for the
four glossary-adjacent guides:

- `/research-hub/guides/glp-1-receptor-explained` — GLP-1R
  (`sameAs`: UniProt P43220, NCBI Gene 2740)
- `/research-hub/guides/gip-receptor-explained` — GIPR
  (`sameAs`: UniProt P48546, NCBI Gene 2696)
- `/research-hub/guides/glucagon-receptor-explained` — GCGR
  (`sameAs`: UniProt P47871, NCBI Gene 2642)
- `/research-hub/guides/triple-agonists-explained` — the category
  itself, keyed to the internal Knowledge Graph term set.

Each DefinedTerm binds the page's canonical URL, a name matching the
Knowledge Graph label, a short authoritative description, a
`termCode`, and (where relevant) external `sameAs` identifiers.

### 3. FAQ expansion

FAQ supplements added (via `guideFaqSupplements`) for the three
guides that shipped without FAQ metadata in 4.0:

- `retatrutide-mechanism-of-action` — 3 new questions (Gα coupling,
  signalling bias, current mechanistic limitations).
- `glp-1-receptor-explained` — 3 new questions (receptor identity,
  signalling pathway, engaging research peptides).
- `laboratory-reconstitution-guide` — 3 new questions (diluent
  choice, vortex avoidance, aliquoting practice).

Supplements are merged into the per-page `FAQPage` JSON-LD in the
route `head()` with deduplication by question string, so no duplicate
Q entries can appear.

### 4. Schema QA report

Per-page JSON-LD (all validated against schema.org):

- Every populated guide: `Article` + `BreadcrumbList` + `FAQPage`.
- Four receptor / concept guides also emit `DefinedTerm`.
- Compound monograph (`/compounds/retatrutide`): `ChemicalSubstance`
  + `Article` + `BreadcrumbList` + `FAQPage`.
- No page emits schema it cannot back with rendered content.

### 5. Entity consistency

Extended answers and DefinedTerm entries mirror the canonical Knowledge
Graph labels used in `src/lib/taxonomy.ts`:

- GLP-1R ↔ "GLP-1 Receptor" (mechanism id `glp1r`)
- GIPR ↔ "GIP Receptor" (mechanism id `gipr`)
- GCGR ↔ "Glucagon Receptor" (mechanism id `gcgr`)
- Retatrutide ↔ "Retatrutide (LY3437943)" (compound slug `retatrutide`)
- Triple GLP-1 / GIP / glucagon receptor agonist ↔ category label

### 6. Internal-link QA report

Each of the ten cluster pages now links to at least three of:

- Retatrutide monograph (`/compounds/retatrutide`)
- Sibling receptor guides (GLP-1R / GIPR / GCGR)
- `Triple Agonists Explained`
- Handling companions (reconstitution ↔ storage)
- `Retatrutide Research Applications` and `Retatrutide FAQ`

Auto-generated related panels (`RelatedGuides`, `RelatedCompounds`,
`RelatedMechanisms`) continue to be driven by the taxonomy — no orphan
pages remain in the cluster.

### 7. Indexation QA

- Canonicals are self-referential (leaf `<link rel="canonical">` set
  from the `path` argument in `seo()`).
- No populated guide carries `noindex`; only unpopulated scaffold
  slugs fall through to `noindex: true`.
- Sitemap (`src/routes/sitemap[.]xml.ts`) iterates
  `guides.filter((g) => g.populated)` — every guide with a real
  registry entry is included automatically.
- Per-guide `og:type: "article"` and matching `og:title` /
  `og:description` set by the shared `seo()` helper.

## Files changed

- `src/lib/seo.ts` — added `definedTermLd` builder.
- `src/components/knowledge/guide-layout.tsx` — added `extendedAnswer`
  slot rendered between Quick Answer and Key Facts.
- `src/routes/research-hub.guides.$slug.tsx` — inject extended
  answer, DefinedTerm JSON-LD and merged FAQ supplements per guide.
- `src/content/retatrutide-cluster-ai.tsx` — new module: extended
  answers, DefinedTerm registry, FAQ supplements.

No existing guide `buildLayout` calls were mutated; no design,
Shopify or infrastructure code was touched.

## QA

- **Typecheck:** `bunx tsgo --noEmit` — **PASS**.
- **Runtime:** the guide-route pipeline receives the extended-answer
  node from a slug-keyed map and passes it into the layout via the
  new prop; layout renders it in its own slot with the "Extended
  answer" eyebrow.
- **Accessibility:** the extended-answer block reuses existing
  `<PubPanel>` semantics (aria-label carried by the block).

## AI Search optimisation summary

| Signal                | Before 6.0A            | After 6.0A                                     |
| --------------------- | ---------------------- | ---------------------------------------------- |
| Concise definition    | ✔ (`QuickAnswer`)     | ✔ (unchanged)                                  |
| Structured 150w answer | ✘                     | ✔ (all 10 guides)                              |
| Key Facts             | ✔                     | ✔                                              |
| FAQPage JSON-LD       | 7 / 10 guides         | 10 / 10 guides                                 |
| DefinedTerm JSON-LD   | 0                     | 4 (GLP-1R, GIPR, GCGR, Triple Agonists)        |
| Entity `sameAs` links | 0                     | 6 (UniProt + NCBI Gene for each receptor)      |
| Canonicals            | self-referential      | self-referential (unchanged)                   |
| Sitemap coverage      | 10 populated guides   | 10 populated guides                            |
