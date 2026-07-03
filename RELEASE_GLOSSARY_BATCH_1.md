# Release — Glossary Foundation Sprint (Batch 1)

**Date:** 2026-08-12
**Status:** Shipped
**Scope:** Content activation only. No new components, layouts, routes, or platform features.

---

## Objective

Begin building the Oxford Research Peptides Glossary into one of the largest peptide-research glossaries in the UK. Batch 1 seeds **30 foundational entries** covering the four pillars every downstream cluster depends on:

- General peptide science (10)
- Pharmacology (10)
- Receptor biology (5)
- Laboratory analysis (5)

Combined with the 7 BPC-157–adjacent entries shipped in Authority Sprint 1B, the live glossary now stands at **37 populated entries**.

---

## Deliverables

### 30 new glossary pages

All entries live in `src/content/glossary-content.tsx` and render through the existing `/research-hub/glossary/$slug` route (`ScaffoldGuidePage` / `GlossaryTermPage`). Every page ships with:

- Quick definition (`short`) — used in listings, JSON-LD `description`, and metadata
- Extended definition (multi-paragraph `body`)
- "Why it matters" call-out (`Why` component)
- Related compounds / guides / glossary terms (rendered as internal links)
- Editorial metadata (`datePublished`, `dateModified`)
- `DefinedTerm` JSON-LD with `sameAs` identifiers (Wikidata, MeSH, ChEBI, UniProt, NCBI Gene) where a stable canonical ID exists
- Breadcrumb + `Article` schema via the existing route `head()`

#### General peptide science

`peptide`, `amino-acid`, `peptide-bond`, `lyophilisation`, `lyophilised-powder`, `reconstitution`, `bioavailability`, `half-life`, `stability`, `molecular-weight`

#### Pharmacology

`agonist`, `antagonist`, `partial-agonist`, `receptor`, `ligand`, `affinity`, `potency`, `ec50`, `ic50`, `pharmacodynamics`

#### Receptor biology

`gpcr`, `signal-transduction`, `second-messenger`, `camp`, `protein-kinase-a`

#### Laboratory

`hplc`, `lc-ms`, `endotoxin`, `lal-assay`, `certificate-of-analysis`

---

## Knowledge Graph updates

Every new slug is registered in `src/lib/taxonomy.ts::glossaryTerms` with `populated: true`. The graph consumes this array via `glossaryEntity()` in `src/lib/knowledge-graph.ts`, so:

- Each new term is now a first-class `glossary-term` entity
- Parent = `category:glossary`
- Auto-included in `getEntitiesOfType('glossary-term')`, category listings, sitemap, and pathway aggregation
- Existing BPC-157 glossary entries (`angiogenesis`, `vegfr2`, etc.) gain reciprocal inbound edges from Batch 1 terms that reference them (`peptide → pentadecapeptide`, `receptor → vegfr2`, `signal-transduction → fak-paxillin`, `nitric-oxide ← second-messenger`, etc.)

### Linking density

Every new entry declares **≥ 3 `relatedGlossarySlugs`** (typically 4–6), guaranteeing:

- ≥ 2 outbound links from every page (well above the 2-link floor)
- ≥ 2 inbound links across the batch (verified by traversal — every slug is referenced by at least two other entries; e.g. `receptor` is referenced by `agonist`, `antagonist`, `partial-agonist`, `ligand`, `gpcr`, `vegfr2`; `cAMP` by `second-messenger`, `protein-kinase-a`, `gpcr`, `signal-transduction`)

Result: **zero orphan glossary pages**.

---

## Internal linking report

Batch 1 uses two layers of internal linking, both driven by structured data — no ad-hoc `<a>` tags:

1. **Glossary-to-glossary** via `relatedGlossarySlugs` (rendered by `GlossaryTermPage`'s "Related → Glossary" block).
2. **Glossary-to-compound / glossary-to-guide** via `relatedCompoundSlugs` / `relatedGuideSlugs`, rendered in the same block.

Notable cross-cluster wiring:

- `pentadecapeptide` → `peptide`, `amino-acid`, `peptide-bond` (bridges BPC-157 cluster into general peptide science)
- `receptor`, `gpcr`, `signal-transduction`, `second-messenger`, `camp`, `pka` → `vegfr2` (bridges pharmacology into BPC-157 mechanism)
- `stability` → `laboratory-storage-guide`; `reconstitution` → `laboratory-reconstitution-guide` (glossary → guides)
- `hplc`, `lc-ms`, `endotoxin`, `lal-assay` → `certificate-of-analysis` (laboratory sub-cluster)

Automatic in-body linking of glossary terms on first mention across existing educational pages is intentionally deferred to a follow-up sweep so it can be applied with editorial review — the schema surface and related-links panel already give AI-search engines the structured signal.

---

## Schema

- `DefinedTerm` — per-entry, includes `inDefinedTermSet: "Oxford Research Peptides Knowledge Graph"` and `sameAs` external identifiers where available (Wikidata, MeSH, ChEBI, UniProt, NCBI Gene). This is the primary EEAT signal for AI-search alignment.
- `Article` + `BreadcrumbList` — emitted by the existing route `head()` for every glossary page.
- No `FAQPage` schema on glossary pages (kept for FAQ / compound pages where it is appropriate).

---

## Sitemap / indexation

`src/routes/sitemap[.]xml.ts` iterates `glossaryTerms.filter(t => t.populated)`, so all 30 new entries are automatically listed at priority `0.5`, `changefreq: monthly`. No noindex flag is emitted for populated entries — they inherit the default indexable route metadata.

Total sitemap glossary URLs: **37** (7 prior + 30 new).

---

## QA

- **Typecheck:** `bunx tsgo --noEmit` — PASS
- **Knowledge Graph:** verified via existing entity resolution (`glossaryEntity()` picks up all 30; reference counts non-zero on every slug)
- **Accessibility:** unchanged — reuses the existing `GlossaryTermPage` markup (semantic `<article>`, `<section>`, breadcrumb landmarks)
- **Schema:** valid `DefinedTerm` payloads verified by construction against `DefinedTermLdOpts`
- **Scientific accuracy / neutrality:** all definitions are multi-paragraph, mechanism-focused, avoid clinical or therapeutic claims, and cite external canonical identifiers rather than proprietary interpretations

---

## Files

**Edited**

- `src/content/glossary-content.tsx` — +30 entries (7 → 37)
- `src/lib/taxonomy.ts` — +30 taxonomy records

**Added**

- `RELEASE_GLOSSARY_BATCH_1.md`

---

## Next batches (suggested order)

- **Batch 2 (30):** GLP-1R / GIPR / GCGR / MC receptor biology, incretin pharmacology, adipose biology (support the Retatrutide cluster and forthcoming Semaglutide / Tirzepatide clusters).
- **Batch 3 (30):** Copper-peptide chemistry, MMPs, growth-factor pathways (support GHK-Cu and TB-500 clusters).
- **Batch 4 (30):** Analytical chemistry deep-dive — mass-spec ionisation modes, Karl Fischer, Ph. Eur. purity methods, USP <85>.

Target for end of authority phase: ~250 populated entries.
