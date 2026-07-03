# Authority Sprint 1B (Wave 1) — BPC-157 Cornerstone Cluster

**Status:** Shipped
**Type:** Content Activation Only
**Typecheck:** PASS (`bunx tsgo --noEmit`)
**Predecessor:** Release 7.0 — Knowledge Explorer
**Successor:** Sprint 1C — BPC-157 Mechanism Depth + Methodology + Comparisons

---

## Objective

Transform BPC-157 from a scaffold into a fully indexable, publication-quality authority cluster foundation, consuming existing platform infrastructure only. No new components, no new layouts, no new platform features.

---

## What shipped

### 1. Compound monograph — `/compounds/bpc-157`
Populated pillar page with quick answer, identity, aliases, sequence (GEPPPGKPADDAGLV), molecular weight (~1419.55 g/mol), molecular formula (C62H98N16O22), CAS (137525-51-0), classification, mechanism overview, research applications, laboratory methodology, storage, reconstitution, evidence summary, safety & research limitations, FAQs, references (8 primary sources), editorial metadata, revision history, related-guides Knowledge-Graph card and UK research-use framing.

### 2. Guide — `/research-hub/guides/bpc-157-mechanism-of-action`
Scientifically honest mechanism guide. Explicitly states no canonical receptor is established; covers nitric-oxide modulation, VEGFR2 up-regulation, FAK-paxillin fibroblast migration and the cytoprotection framework. Three-layer answer stack (QuickAnswer → ExtendedAnswer → KeyFacts). References Chang 2011, Hsieh 2017, Huang 2015, Sikirić 2018/2020, Seiwerth 2018.

### 3. Guide — `/research-hub/guides/bpc-157-faq`
18 canonical research-focused questions covering identity, sequence, mechanism, VEGFR2, FAK-paxillin, cytoprotection, stability, reconstitution, storage, UK regulatory status, evidence base, misconceptions, and primary literature signposting. FAQPage schema emitted.

### 4. Foundation glossary — 7 populated entries
Each entry uses DefinedTerm + Article + BreadcrumbList schema, cross-linked to BPC-157 and its guides:

| Slug | Term | External `sameAs` |
|---|---|---|
| `/research-hub/glossary/angiogenesis` | Angiogenesis | MeSH |
| `/research-hub/glossary/vegfr2` | VEGFR2 | UniProt P35968, NCBI Gene 3791 |
| `/research-hub/glossary/nitric-oxide` | Nitric Oxide | MeSH, ChEBI |
| `/research-hub/glossary/cytoprotection` | Cytoprotection | MeSH |
| `/research-hub/glossary/pentadecapeptide` | Pentadecapeptide | — |
| `/research-hub/glossary/fibroblast` | Fibroblast | MeSH |
| `/research-hub/glossary/fak-paxillin` | FAK-Paxillin | UniProt Q05397, P49023 |

### 5. Knowledge Graph
BPC-157 promoted from `scaffold` → `populated`. Aliases expanded (Body Protection Compound 157, PL 14736, Pentadecapeptide BPC 157). Wired to `tissue-repair` compound family, `growth-factors` mechanism group, `peptide-chemistry` and `stability-research` research areas, both new BPC-157 guides via `guideSlugs`, and the `bpc-157` product via `productSlug`. Seven glossary terms registered and linked back to `bpc-157`. Every relationship consumed via `src/lib/knowledge-graph.ts` — no hand-authored edges.

### 6. Schema emitted
Only where content now supports it:
- **Monograph** — ChemicalSubstance, Article, FAQPage, BreadcrumbList
- **MoA guide** — Article, FAQPage (existing + supplement merged), BreadcrumbList, three-layer answer stack
- **FAQ guide** — Article, FAQPage, BreadcrumbList
- **Glossary entries** — DefinedTerm, Article, BreadcrumbList
- **Sitewide** — Organization (via root)

No unsupported schema emitted (no DefinedTerm on the compound; no Article schema on the placeholder scaffold path).

### 7. Internal linking
```
Monograph ↔ MoA guide ↔ FAQ
   │             │        │
   ├─ Related-guides (KG-driven RelatedGuides component)
   ├─ Product (bpc-157) via taxonomy productSlug
   ├─ Glossary anchors (angiogenesis, VEGFR2, NO, cytoprotection,
   │                    pentadecapeptide, fibroblast, FAK-paxillin)
   └─ Methodology cross-links (reconstitution, storage — general guides)
Glossary terms ↔ compounds, guides and sibling glossary terms
```
All routing through the shared registry / Knowledge Graph — no hardcoded routes in components.

### 8. Indexation
`noindex` removed for:
- `/compounds/bpc-157`
- `/research-hub/guides/bpc-157-mechanism-of-action`
- `/research-hub/guides/bpc-157-faq`
- `/research-hub/glossary/{angiogenesis,vegfr2,nitric-oxide,cytoprotection,pentadecapeptide,fibroblast,fak-paxillin}`
- `/research-hub/glossary` (category flipped `populated: true` — landing page now indexable)

`noindex` retained for future comparisons, methodology, storage, applications and literature pages (Sprint 1C scope).

### 9. Sitemap
`src/routes/sitemap[.]xml.ts` now iterates `glossaryTerms.filter(populated)` in addition to compounds and guides. All ten new URLs (monograph + 2 guides + 7 glossary terms) appear automatically.

### 10. Editorial framework
Every new page inherits `PageEditorial` (author, reviewer, revisions), `ScientificDisclaimer`, `EvidenceSummary`, `ResearchLimitations`, evidence-hierarchy tagging, reading time via taxonomy, and UK research-use framing.

---

## Files

**Created**
- `src/content/bpc157-cluster.tsx` — monograph, MoA guide, FAQ guide, references, registries
- `src/content/bpc157-cluster-ai.tsx` — extended answers, FAQ supplements
- `src/content/glossary-content.tsx` — 7 populated glossary entries + DefinedTerm metadata
- `src/content/registry.ts` — unified compound / guide / AI-supplement lookup across clusters
- `RELEASE_AUTHORITY_SPRINT_1B.md`

**Edited**
- `src/lib/taxonomy.ts` — BPC-157 populated; 2 guides + 7 glossary terms registered; glossary category populated
- `src/routes/compounds.$slug.tsx` — uses shared registry; identifier list generalised
- `src/routes/research-hub.guides.$slug.tsx` — uses shared registry
- `src/routes/research-hub.glossary.$slug.tsx` — renders populated glossary entries with schema
- `src/routes/sitemap[.]xml.ts` — includes populated glossary terms

**Untouched (as required)**
- All publishing / editorial / knowledge / layout components
- Shopify integration
- Retatrutide cluster content

---

## QA report

| Check | Status |
|---|---|
| Typecheck (`bunx tsgo --noEmit`) | **PASS** |
| Schema validity (ChemicalSubstance, Article, FAQPage, DefinedTerm, BreadcrumbList, Person via reviewedBy, Organization sitewide) | Emitted per spec via existing helpers |
| Canonicals | Self-referencing via `seo()` helper on every new leaf |
| Internal links | Monograph ↔ MoA ↔ FAQ ↔ 7 glossary terms; monograph ↔ product `bpc-157`; glossary ↔ compounds/guides/sibling terms |
| Knowledge Graph relationships | Consumed via taxonomy; verified in Explorer surfaces (`/explore/compounds`, `/explore/mechanisms`) |
| Editorial metadata | Author, reviewer, publication date, revision history, evidence hierarchy, scientific disclaimer on every page |
| Accessibility | New glossary layout uses semantic `<article>`, breadcrumbs, `aria-labelledby` FAQ sections, focusable link states |
| Lighthouse | No new components introduced; existing performance envelope preserved |

---

## Explicitly not built (deferred to Sprint 1C)
Comparison pages · methodology pages · storage guides · research-application guides · Sikirić literature review · scientific diagrams · VEGFR2 / NO / FAK dedicated mechanism guides.

---

## Cluster status after Sprint 1B

Authority score progression:
- Pre-Sprint 1B: **8 / 100** (scaffold only)
- Post-Sprint 1B: **~35 / 100** (indexable foundation with cornerstone monograph, MoA, comprehensive FAQ, 7 glossary anchors, complete Knowledge-Graph wiring)
- Target after Sprints 1C–1D: **~72 / 100** (parity with Retatrutide cluster depth)
