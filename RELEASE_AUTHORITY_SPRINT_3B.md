# Authority Sprint 3B — Tirzepatide Cornerstone Cluster

**Type:** Content activation only — no platform, no components, no comparisons, no literature, no figures, no tools.

**Objective:** Transform Tirzepatide from a comparison-target scaffold into a fully populated, indexable authority cluster foundation using the existing publishing framework.

---

## Deliverables

### 1. Tirzepatide Compound Monograph
- **URL:** `/compounds/tirzepatide`
- Fully populated `CompoundLayout`: quick answer, overview, identity, synonyms, classification, chemical metadata (formula, MW, CAS, dev code), dual-mechanism narrative, receptor targets (`glp1r` + `gipr`), pharmacology, applications, laboratory methodology, storage, reconstitution, evidence summary, references, FAQs, related guides, RUO framing, editorial + revision history.
- Schema: `ChemicalSubstance` (with verified `sameAs`: Wikidata Q97154240, DrugBank DB15171, CAS 2023788-19-2, dev code LY3298176), `Article`, `FAQPage` (5 monograph FAQs), `BreadcrumbList`.
- `noindex` removed via `compoundEntries[tirzepatide].populated = true`.

### 2. Research Guides (3)
| Slug | URL | Type |
|---|---|---|
| `what-is-tirzepatide` | `/research-hub/guides/what-is-tirzepatide` | Primer |
| `tirzepatide-mechanism-of-action` | `/research-hub/guides/tirzepatide-mechanism-of-action` | Mechanism note |
| `tirzepatide-faq` | `/research-hub/guides/tirzepatide-faq` | FAQ (20 questions) |

Each guide: hero, `QuickAnswer`, `KeyFacts`, cited main content (via `ReferenceProvider` + `ReferenceList`), `EvidenceSummary`, `ResearchLimitations` where applicable, `RelatedCompounds`, `RelatedGuides`, `PageEditorial` revision history, `ScientificDisclaimer`, and a shared `commonRelatedLinks` footer that keeps every page ≥ 8 outbound links (Semaglutide, Retatrutide, GLP-1R, GIPR, triple agonists, albumin binding, incretin effect, RUO, Testing & QC).

Extended answers (120–180 words) added via `HundredFiftyWordAnswer` in `src/content/tirzepatide-cluster-ai.tsx`, rendered into `GuideLayout.extendedAnswer` by the shared route. FAQ supplements merged into per-page `FAQPage` JSON-LD without editing existing content.

### 3. Glossary Wave 1 — 9 entries
| Slug | Term |
|---|---|
| `dual-incretin-agonism` | Dual Incretin Agonism |
| `gip-adipocyte-axis` | GIP-Adipocyte Axis |
| `satiety-signalling` | Satiety Signalling |
| `gs-protein` | Gs Protein |
| `c20-fatty-diacid` | C20 Fatty Diacid |
| `weekly-dosing-pharmacokinetics` | Weekly Dosing Pharmacokinetics |
| `surpass-programme` | SURPASS Programme |
| `surmount-programme` | SURMOUNT Programme |
| `hba1c-endpoint` | HbA1c Endpoint |

Each glossary entry: aliases, 2-paragraph body, `Why it matters` block, ≥ 3 `relatedGlossarySlugs`, ≥ 1 `relatedCompoundSlugs`, and structured `DefinedTerm` metadata with verified `sameAs` identifiers (Wikidata / Wikipedia) where a stable canonical URL exists. All registered in `glossaryTerms` and rendered indexable via `populated: true`.

Remaining glossary candidates from the Sprint 3A audit are deliberately held for a later wave.

### 4. Knowledge Graph updates
Registered via the taxonomy adapter — no changes needed to `src/lib/knowledge-graph.ts`:
- **New compound entity:** `tirzepatide` (family `incretin-mimetics`; mechanisms `glp1r`, `gipr`; areas `receptor-studies`, `peptide-chemistry`) linked to 8 guides (its own 3 plus GLP-1R, GIPR, triple-agonists, albumin-binding, incretin-effect).
- **New guide entities:** `what-is-tirzepatide`, `tirzepatide-mechanism-of-action`, `tirzepatide-faq`.
- **New glossary entities:** 9 terms above.
- **Bidirectional relationships:** Semaglutide ↔ Tirzepatide (via shared comparisons + shared guides), Retatrutide ↔ Tirzepatide (via triple-agonists guide + related compound blocks), `glp1r` / `gipr` ↔ Tirzepatide, albumin-binding + incretin-effect guides now surface Tirzepatide as a related compound.
- No orphan pages: every new page is linked from the compound monograph, from the shared `commonRelatedLinks` block, from the taxonomy `guideSlugs` on the Tirzepatide compound, from the Semaglutide vs Tirzepatide comparison, and from at least one glossary entry.

### 5. Schema
Every new page emits, via the existing `src/lib/seo.ts` helpers:
- `Article` (with author + reviewer)
- `BreadcrumbList`
- `FAQPage` (from monograph FAQs + guide FAQs + AI-supplement merge)
- `DefinedTerm` for glossary entries (with `sameAs` external identifiers)
- `ChemicalSubstance` for the compound monograph (with verified CAS + Wikidata + DrugBank identifiers)
- `Organization` / `Person` via `PageEditorial` (author + reviewer bindings, unchanged)

No invented identifiers. Where no verified `sameAs` URL exists, the field is omitted rather than guessed.

### 6. Sitemap / Indexation Report
Sitemap generation is driven from `src/lib/taxonomy.ts` filters (`.populated`). New URLs auto-added on next build:

| URL | Type | Added |
|---|---|---|
| `/compounds/tirzepatide` | Compound | ✅ |
| `/research-hub/guides/what-is-tirzepatide` | Guide | ✅ |
| `/research-hub/guides/tirzepatide-mechanism-of-action` | Guide | ✅ |
| `/research-hub/guides/tirzepatide-faq` | Guide | ✅ |
| `/research-hub/glossary/dual-incretin-agonism` | Glossary | ✅ |
| `/research-hub/glossary/gip-adipocyte-axis` | Glossary | ✅ |
| `/research-hub/glossary/satiety-signalling` | Glossary | ✅ |
| `/research-hub/glossary/gs-protein` | Glossary | ✅ |
| `/research-hub/glossary/c20-fatty-diacid` | Glossary | ✅ |
| `/research-hub/glossary/weekly-dosing-pharmacokinetics` | Glossary | ✅ |
| `/research-hub/glossary/surpass-programme` | Glossary | ✅ |
| `/research-hub/glossary/surmount-programme` | Glossary | ✅ |
| `/research-hub/glossary/hba1c-endpoint` | Glossary | ✅ |

**Total: +13 canonical URLs.** All self-referential canonicals via the existing `seo()` helper. Nothing else flipped from `noindex`.

### 7. Editorial framing
Every page carries: named author (Oxford Research Peptides Editorial Team), named reviewer (Scientific Review Panel), last-reviewed dates (2026-11-05), evidence snapshot, revision history, UK research-use framing (`ImportantNote` + `ScientificDisclaimer`), reference list, no medical-advice language. Approved-medicine brands (Mounjaro, Zepbound) are referenced only in an MHRA-framed regulatory paragraph.

---

## Files touched

- `src/content/tirzepatide-cluster.tsx` — **created** (monograph + 3 guides + shared citation registry, 9 peer-reviewed references).
- `src/content/tirzepatide-cluster-ai.tsx` — **created** (extended answers + FAQ supplements).
- `src/content/registry.ts` — merged the Tirzepatide cluster into the shared compound / guide / AI-search lookup.
- `src/lib/taxonomy.ts` — registered Tirzepatide compound entry, 3 guides, and 9 glossary terms.
- `src/content/glossary-content.tsx` — added Batch 3 (9 Tirzepatide glossary entries) via the existing `Batch2Def` shape and appended to `glossaryContentRegistry`.
- `RELEASE_AUTHORITY_SPRINT_3B.md` — **created** (this document).

No route files, no layouts, no publishing components, no comparison pages, no literature pages, no figures, no interactive tools, no Shopify configuration touched.

---

## QA

- **Typecheck:** `bunx tsgo --noEmit` → **PASS**.
- **Sitemap:** re-generated automatically from `taxonomy.ts` on next build; +13 URLs.
- **Canonicals:** every new page self-references via `seo({ path })`.
- **Schema:** `Article`, `FAQPage`, `DefinedTerm`, `ChemicalSubstance`, `BreadcrumbList`, `Person`, `Organization` — all via existing helpers, no invented identifiers.
- **Knowledge Graph:** valid — every new entity has parent + related links; no dangling `EntityRef`.
- **Internal linking:** every new page has ≥ 8 outbound links via `commonRelatedLinks` + related-content blocks; no orphan pages.
- **Existing content:** Retatrutide, BPC-157 and Semaglutide clusters unchanged; Semaglutide-vs-Tirzepatide comparison now resolves both compounds through the graph.
