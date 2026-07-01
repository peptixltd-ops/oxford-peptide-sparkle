# Release 1.2 — Knowledge Architecture Foundation

Release 1.2 transitions Oxford Research Peptides from **"Shop with a Research
Hub"** into **"A Research Platform with a Shop."**

This release is **architecture only**. It delivers the taxonomy, layouts,
templates, routes and reusable components that every future educational page
will inherit. No long-form content, no visual redesign, no Compound Library
launch, no Shopify changes.

---

## 1. Knowledge Architecture Registry — single source of truth

`src/lib/taxonomy.ts`

Every route, sidebar, breadcrumb, navigation element and related-content
component in this release consumes this file. Future releases add DATA here
— they never rebuild the layouts.

| Export | Purpose |
| --- | --- |
| `researchCategories` | 8 top-level categories: Research Guides, Compound Reference, Mechanisms of Action, Laboratory Methodology, Scientific Literature, Comparisons, FAQs, Glossary. Each carries `path`, `label`, `short`, `eyebrow`, `description`, `purpose`, `icon`, `related`, `populated`. |
| `guideTypes` | Primer, Handling Guide, Mechanism Note, Structural Note, Comparison, Methodology. |
| `compoundFamilies` | Incretin Mimetics, GH Secretagogues, Melanocortin Ligands, Tissue Repair, Copper Peptides, Cyclic Peptides, Reference Standards. |
| `mechanismGroups` | GLP-1R, GIPR, GCGR, GHSR, MCR, Growth Factors, Copper-binding. |
| `researchAreas` | Peptide Chemistry, Receptor Studies, Assay Development, Stability Research, Specialty Compounds. |
| `guides`, `compoundEntries`, `glossaryTerms` | Typed shapes. Empty in Release 1.2 — populated in Release 2. |
| `defaultReadingPathway` | Start → Mechanism → Compound → Method → Comparison → Related Reading. |
| Helpers | `getCategory`, `getRelatedCategories`, `guidesInCategory`, `guidesByCompound`, `guidesByMechanism`, `guidesByArea`, `compoundsInFamily`, `compoundsByMechanism`, `getGuide`, `getCompoundEntry`, `getGlossaryTerm`. |

Every category carries a `populated: boolean` flag. Any category landing or
`$slug` scaffold whose `populated` is `false` emits `robots: noindex, nofollow`
via `seo()` — no thin scaffold pages are indexable.

---

## 2. Research Hub — genuine educational hub

`/research-hub` is now a real category root:

- Hero + purpose
- Category grid rendered from `researchCategories` (icons, populated flags)
- Reading pathway
- Sidebar
- "Continue reading" module

There is no long-form educational copy. No thin pages are indexable.

---

## 3. Educational URL structure

Layout routes:

- `/research-hub` — `src/routes/research-hub.tsx` — `<Outlet />`
- `/compounds` — `src/routes/compounds.tsx` — `<Outlet />`

Leaf routes (each uses `seo()`, breadcrumbs, and templates from below):

| URL | Route file | Renders |
| --- | --- | --- |
| `/research-hub` | `research-hub.index.tsx` | Hub landing |
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
| `/research-hub/faqs` | `research-hub.faqs.index.tsx` | Category landing linking to `/faqs` |
| `/compounds` | `compounds.index.tsx` | Landing (families + template preview) |
| `/compounds/$slug` | `compounds.$slug.tsx` | `CompoundLayout` — empty template until populated (noindex) |

Existing operational routes (`/faqs`, `/shop`, `/wholesale`, etc.) are
untouched.

---

## 4. `GuideLayout`

`src/components/knowledge/guide-layout.tsx`

Reusable structural template. Every section is a slot. Slots that aren't
passed are not rendered.

Slots: `hero`, `quickAnswer`, `keyFacts`, `tableOfContents`, `mainContent`,
`figures`, `evidenceSummary`, `researchLimitations`, `references`,
`glossaryTerms`, `relatedGuides`, `relatedCompounds`, `author`,
`scientificReviewer`, `publicationDate`, `lastUpdated`, `editorialNotice`,
`versionHistory`, `sidebar`.

Ships with `GuideSlotPlaceholder` for use during Release 2 authoring.

---

## 5. `CompoundLayout`

`src/components/knowledge/compound-layout.tsx`

Reusable structural template.

Slots: `identity`, `aliases`, `researchClassification`, `iupacName`,
`molecularFormula`, `molecularWeight`, `chemicalMetadata`, `mechanism`,
`receptorTargets`, `researchAreas`, `laboratoryNotes`, `evidenceSummary`,
`references`, `relatedGuides`, `relatedProducts`, `relatedComparisons`,
`sidebar`, `lastUpdated`.

Ships with `CompoundSlotPlaceholder`. The Compound Library is NOT launched
— only the reusable monograph template.

---

## 6. Knowledge Navigation

`src/components/knowledge/knowledge-nav.tsx`

Secondary educational nav rendered inside every category page. Consumes
`getCategory` + `getRelatedCategories` to answer:

1. Where am I?
2. What sits alongside this?
3. What should I read next?

`src/components/knowledge/reading-pathway.tsx` renders the taxonomy's
default reading pathway (`Start → Mechanism → Compound → Method → Comparison
→ Related Reading`). Consumers can override with any `PathwayStep[]` and
highlight an active step.

Cross-link renderers (all data-driven, no hardcoded lists):

- `related-guides.tsx` — by category / compound / mechanism.
- `related-compounds.tsx` — by family / mechanism / explicit slug list.
- `related-mechanisms.tsx` — receptor / pathway links.
- `related-methodology.tsx` — methodology procedure links.
- `continue-reading.tsx` — prefers same-category guides, falls back to related categories.

---

## 7. Research Sidebar

`src/components/knowledge/research-sidebar.tsx`

Reusable, slot-based sidebar. Every dataset is derived from the taxonomy —
no hardcoded links.

Blocks: `category-tree`, `related-guides`, `recent-guides`, `popular-guides`,
`glossary`, `methodology`.

Empty datasets render as labelled "populated in Release 2" placeholders so
the layout is stable during authoring.

---

## 8. Reusable page templates

| Template | File | Purpose |
| --- | --- | --- |
| `CategoryLanding` | `category-landing.tsx` | One prop (`categoryId`). Renders the entire category landing (header, `KnowledgeNav`, purpose, related guides, reading pathway, sidebar). |
| `PlaceholderKnowledgePage` | `placeholder-knowledge-page.tsx` | Generic scaffold rendered by every `$slug` leaf before real content lands — stable URL, chrome and sidebar. |
| `GuideLayout` | `guide-layout.tsx` | Long-form guide template. |
| `CompoundLayout` | `compound-layout.tsx` | Monograph template. |

---

## 9. Architecture standards

- **Reusable.** Every layout is a component, not a copy-paste page.
- **Configuration driven.** Every category, family, mechanism and pathway
  lives in `taxonomy.ts`.
- **Component driven.** Every list is rendered by a component that queries
  the taxonomy.
- **Future-proof.** Populating Release 2 is *data only* — flipping
  `populated: true` and pushing to `guides` / `compoundEntries` /
  `glossaryTerms` is enough.
- **Scalable.** Adding a new category means: one entry in
  `researchCategories`, one route file using `CategoryLanding`, one route
  file for `$slug`.

No duplicated route logic. No duplicated taxonomy. No duplicated navigation.

---

## 10. Explicitly out of scope

- No educational articles.
- No scientific copy or placeholder paragraphs.
- No AI search.
- No educational search (the earlier `KnowledgeSearch` component and its
  adapter were removed to keep the release strictly structural).
- No internal linking engine.
- No homepage redesign.
- No Shopify integration changes.
- No Compound Library launch.

---

## 11. Files

**Created — routes (15)**

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
- `src/routes/research-hub.faqs.index.tsx`
- `src/routes/compounds.index.tsx`
- `src/routes/compounds.$slug.tsx`

**Modified — routes**

- `src/routes/research-hub.tsx` → layout route (`<Outlet />`).
- `src/routes/compounds.tsx` → layout route (`<Outlet />`).

**Created — knowledge components (12)**

- `reading-pathway.tsx`
- `knowledge-nav.tsx`
- `research-sidebar.tsx`
- `guide-layout.tsx`
- `compound-layout.tsx`
- `category-landing.tsx`
- `placeholder-knowledge-page.tsx`
- `related-guides.tsx`
- `related-compounds.tsx`
- `related-mechanisms.tsx`
- `related-methodology.tsx`
- `continue-reading.tsx`

**Created — library**

- `src/lib/taxonomy.ts` (Knowledge Architecture registry)

**Removed**

- `src/components/knowledge/knowledge-search.tsx`
- `src/lib/knowledge-search.ts`
  (Educational search is explicitly out of scope for Release 1.2.)

---

## 12. Status

- **Typecheck:** ✅ `bunx tsgo --noEmit` clean.
- **Build:** ✅ handled by the harness on merge.
- **noindex coverage:** every unpopulated category landing and every `$slug`
  scaffold emits `robots: noindex, nofollow` via `seo()`.

See `KNOWLEDGE_ARCHITECTURE.md` for the canonical rules Release 2 authors
must follow.
