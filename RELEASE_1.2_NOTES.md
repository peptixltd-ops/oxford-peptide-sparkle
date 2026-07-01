# Release 1.2 — Information Architecture Foundation

Release 1.2 transitions Oxford Research Peptides from an ecommerce site into a
scientific knowledge platform **without writing any long-form content**. This
release delivers the reusable architecture — taxonomy, layouts, templates,
routes and cross-linking components — that Release 2 will populate.

No visual identity changes. No Shopify changes. No homepage redesign.

---

## 1. Shared taxonomy (single source of truth)

`src/lib/taxonomy.ts`

Every knowledge surface in this release consumes this file. Future releases
add data here — they do not modify layouts.

| Export | Purpose |
| --- | --- |
| `researchCategories` | 8 categories: Research Guides, Compound Reference, Mechanisms of Action, Laboratory Methodology, Scientific Literature, Comparisons, FAQs, Glossary. |
| `guideTypes` | Primer, Handling Guide, Mechanism Note, Structural Note, Comparison, Methodology. |
| `compoundFamilies` | Incretin Mimetics, GH Secretagogues, Melanocortin Ligands, Tissue Repair, Copper Peptides, Cyclic Peptides, Reference Standards. |
| `mechanismGroups` | GLP-1R, GIPR, GCGR, GHSR, MCR, Growth Factors, Copper-binding. |
| `researchAreas` | Peptide Chemistry, Receptor Studies, Assay Development, Stability Research, Specialty Compounds. |
| `guides`, `compoundEntries`, `glossaryTerms` | Empty arrays with typed shapes — populated in Release 2. |
| `defaultReadingPathway` | Start → Mechanism → Compound → Method → Comparison → Related Reading. |
| Helpers | `getCategory`, `getRelatedCategories`, `guidesInCategory`, `guidesByCompound`, `guidesByMechanism`, `guidesByArea`, `compoundsInFamily`, `compoundsByMechanism`, `getGuide`, `getCompoundEntry`, `getGlossaryTerm`. |

Every category carries a `populated: boolean` flag. Any category landing where
`populated === false` emits `noindex` automatically.

---

## 2. Reading pathway system

`src/components/knowledge/reading-pathway.tsx`

Content-agnostic, component-driven pathway. Renders the taxonomy's
`defaultReadingPathway` by default. Any consumer can pass a custom
`PathwayStep[]` and highlight a step with `activeKind`. Used on the Hub
landing and every category landing.

---

## 3. Knowledge navigation

`src/components/knowledge/knowledge-nav.tsx`

Secondary educational nav rendered inside every category page. Answers:
"Where am I?", "What sits alongside this?", "What should I read next?" —
all resolved from `getRelatedCategories()`.

---

## 4. Research sidebar

`src/components/knowledge/research-sidebar.tsx`

Reusable sidebar with slot-based blocks:

- Category tree (from `researchCategories`)
- Related guides / Recent guides / Popular guides (from `guidesInCategory`)
- Glossary (from `glossaryTerms`)
- Laboratory methodology quick-link

Empty datasets render as labelled "populated in Release 2" placeholders so
layouts remain stable.

---

## 5. Layout templates

| Template | Path | Slots |
| --- | --- | --- |
| `GuideLayout` | `src/components/knowledge/guide-layout.tsx` | Hero, Quick Summary, Table of Contents, Main Content, Figures, Evidence Summary, References, Related Guides, Related Compounds, Author, Reviewer, Last Updated, Sidebar. |
| `CompoundLayout` | `src/components/knowledge/compound-layout.tsx` | Identity, Aliases, Chemical Metadata, Mechanism, Receptor Targets, Research Areas, Laboratory Notes, Evidence Summary, References, Related Guides, Related Products, Sidebar, Last Updated. |
| `CategoryLanding` | `src/components/knowledge/category-landing.tsx` | Category-driven landing; requires only `categoryId`. |
| `PlaceholderKnowledgePage` | `src/components/knowledge/placeholder-knowledge-page.tsx` | Generic scaffolded page for `$slug` leaves before content lands. |

`GuideSlotPlaceholder` / `CompoundSlotPlaceholder` render short "populated in
a future release" notices — never dummy paragraphs.

---

## 6. Internal linking framework

All consume the taxonomy — no static arrays.

- `related-guides.tsx` — filters by `categoryId`, `compoundSlug` or `mechanismId`.
- `related-compounds.tsx` — filters by `familyId`, `mechanismId` or explicit slug list.
- `related-mechanisms.tsx` — chip links into `/research-hub/mechanisms/$slug`.
- `related-methodology.tsx` — chip links into `/research-hub/methodology/$slug`.
- `continue-reading.tsx` — prefers category guides, falls back to related categories.

---

## 7. Search architecture

`src/lib/knowledge-search.ts` (already present)
`src/components/knowledge/knowledge-search.tsx`

Adapter interface `KnowledgeSearchAdapter` decouples the UI from the index.
Ships with `inMemoryKnowledgeSearch`, which queries the taxonomy directly.
Release 2 can swap in a real index without touching the UI.

Result kinds: `guide`, `compound`, `mechanism`, `glossary`, `methodology`, `category`.

---

## 8. URL structure

Layout routes:

- `/research-hub` (`src/routes/research-hub.tsx`) — `<Outlet />`
- `/compounds` (`src/routes/compounds.tsx`) — `<Outlet />`

Leaf routes (all use `seo()`, breadcrumbs, and templates from above):

| URL | Route file | Component |
| --- | --- | --- |
| `/research-hub` | `research-hub.index.tsx` | Hub landing (categories + search + pathway) |
| `/research-hub/guides` | `research-hub.guides.index.tsx` | `CategoryLanding` |
| `/research-hub/guides/$slug` | `research-hub.guides.$slug.tsx` | `PlaceholderKnowledgePage` (noindex) |
| `/research-hub/methodology` | `research-hub.methodology.index.tsx` | `CategoryLanding` |
| `/research-hub/methodology/$slug` | `research-hub.methodology.$slug.tsx` | `PlaceholderKnowledgePage` (noindex) |
| `/research-hub/mechanisms` | `research-hub.mechanisms.index.tsx` | `CategoryLanding` + `RelatedMechanisms` |
| `/research-hub/mechanisms/$slug` | `research-hub.mechanisms.$slug.tsx` | `PlaceholderKnowledgePage` + `RelatedCompounds` (noindex) |
| `/research-hub/comparisons` | `research-hub.comparisons.index.tsx` | `CategoryLanding` |
| `/research-hub/comparisons/$slug` | `research-hub.comparisons.$slug.tsx` | `PlaceholderKnowledgePage` (noindex) |
| `/research-hub/glossary` | `research-hub.glossary.index.tsx` | `CategoryLanding` |
| `/research-hub/glossary/$slug` | `research-hub.glossary.$slug.tsx` | `PlaceholderKnowledgePage` (noindex) |
| `/research-hub/literature` | `research-hub.literature.index.tsx` | `CategoryLanding` |
| `/compounds` | `compounds.index.tsx` | Landing (families + template preview + pathway) |
| `/compounds/$slug` | `compounds.$slug.tsx` | `CompoundLayout` — renders empty template when entry is not populated (noindex) |

Any category landing whose `populated` flag is `false` emits `noindex` via
`seo()`, so search engines will not index the thin scaffolding.

---

## 9. Files created / modified

**Created — routes (13)**

- `src/routes/research-hub.index.tsx`
- `src/routes/research-hub.guides.index.tsx`
- `src/routes/research-hub.guides.$slug.tsx`
- `src/routes/research-hub.methodology.index.tsx`
- `src/routes/research-hub.methodology.$slug.tsx`
- `src/routes/research-hub.mechanisms.index.tsx`
- `src/routes/research-hub.mechanisms.$slug.tsx`
- `src/routes/research-hub.comparisons.index.tsx`
- `src/routes/research-hub.comparisons.$slug.tsx`
- `src/routes/research-hub.glossary.index.tsx`
- `src/routes/research-hub.glossary.$slug.tsx`
- `src/routes/research-hub.literature.index.tsx`
- `src/routes/compounds.index.tsx`
- `src/routes/compounds.$slug.tsx`

**Modified — routes**

- `src/routes/research-hub.tsx` → converted to layout route with `<Outlet />`.
- `src/routes/compounds.tsx` → converted to layout route with `<Outlet />`.

**Created — knowledge components (13)**

- `src/components/knowledge/reading-pathway.tsx`
- `src/components/knowledge/knowledge-nav.tsx`
- `src/components/knowledge/research-sidebar.tsx`
- `src/components/knowledge/guide-layout.tsx`
- `src/components/knowledge/compound-layout.tsx`
- `src/components/knowledge/category-landing.tsx`
- `src/components/knowledge/placeholder-knowledge-page.tsx`
- `src/components/knowledge/related-guides.tsx`
- `src/components/knowledge/related-compounds.tsx`
- `src/components/knowledge/related-mechanisms.tsx`
- `src/components/knowledge/related-methodology.tsx`
- `src/components/knowledge/continue-reading.tsx`
- `src/components/knowledge/knowledge-search.tsx`

**Created — libraries**

- `src/lib/taxonomy.ts`
- `src/lib/knowledge-search.ts`

---

## 10. Status

- **Typecheck:** ✅ `bunx tsgo --noEmit` — clean.
- **Build:** ✅ handled by the harness on merge.
- **noindex coverage:** all placeholder categories and every `$slug` scaffold
  route emit `robots: noindex, nofollow` until `populated === true`.

---

## 11. Recommendations for Release 2.0

1. **Populate `guides`, `compoundEntries`, `glossaryTerms`.** No layouts need
   to change — flipping `populated: true` is enough to remove the `noindex`.
2. **First compound monograph pilots.** Ship 3–5 monographs to validate
   `CompoundLayout` before scaling to the full library.
3. **Author + Reviewer schema.** Extend `Guide` with `Person` metadata and
   emit `Article` + `sdPublisher` JSON-LD in the guide route.
4. **Real search index.** Swap `inMemoryKnowledgeSearch` for a MiniSearch or
   Meilisearch adapter — the UI does not change.
5. **Compound → Product linking.** When populating `CompoundEntry.productSlug`,
   populate the `Related Products` slot in `CompoundLayout` from the product
   database.
6. **Homepage promotion.** Once at least a category has real guides, promote a
   "Featured guide" module above the product grid on `/`.
7. **Sitemap.** Extend `sitemap.xml.ts` to enumerate every populated guide,
   compound, mechanism, glossary term and methodology procedure.
8. **Editorial workflow.** MDX or a headless CMS is now viable — the layout
   contracts are stable.
