# Oxford Research Peptides — Knowledge Architecture

This document is the canonical description of the educational architecture
introduced in Release 1.2. It is intended for anyone authoring content,
adding routes, or extending taxonomy in future releases.

The rule of thumb for every future release:

> **Add data, not layouts.**

If a change requires editing a layout component, a sidebar, or a page
template, the taxonomy is probably missing a field — extend the taxonomy
first, then the layout consumes it.

---

## 1. Educational hierarchy

The site is organised into **eight top-level educational categories**, all
declared in `src/lib/taxonomy.ts` under `researchCategories`.

```text
Research Hub  (/research-hub)
├── Research Guides         (/research-hub/guides)
├── Compound Reference      (/compounds)                ← lives at root for URL clarity
├── Mechanisms of Action    (/research-hub/mechanisms)
├── Laboratory Methodology  (/research-hub/methodology)
├── Scientific Literature   (/research-hub/literature)
├── Comparisons             (/research-hub/comparisons)
├── FAQs                    (/research-hub/faqs)        ← full FAQ content at /faqs
└── Glossary                (/research-hub/glossary)
```

Under each category sits a flat `$slug` space. Nested category trees are
NOT introduced in Release 1.2. If a category later needs sub-categories,
add a `subcategoryId` field to the entry shape — do not add another URL
segment.

### Category shape

Every category has:

| Field | Purpose |
| --- | --- |
| `id` | Machine identifier used everywhere in code. Never changes once set. |
| `path` | Absolute URL of the landing page. |
| `label` | Long, human-readable name. |
| `short` | Chip / breadcrumb label. |
| `eyebrow` | Uppercased eyebrow above hero titles. |
| `description` | One-line intro. Kept short by design. |
| `purpose` | One-line statement of why the category exists. |
| `icon` | Lucide icon component. |
| `related` | IDs of the other categories that pair with this one. Drives `KnowledgeNav` and `ResearchSidebar`. |
| `populated` | `false` until real content ships. Controls `noindex` and "SOON" badges. |

---

## 2. Taxonomy

The taxonomy is the **single source of truth**. Every navigation surface,
sidebar, breadcrumb, related-content component and JSON-LD emitter reads
from it. No duplicated hierarchy exists anywhere in the codebase.

### Datasets

| Dataset | File location | Purpose |
| --- | --- | --- |
| `researchCategories` | `src/lib/taxonomy.ts` | Top-level educational categories. |
| `guideTypes` | `src/lib/taxonomy.ts` | Sub-classification of a guide (Primer, Handling, Mechanism Note, Structural Note, Comparison, Methodology). |
| `compoundFamilies` | `src/lib/taxonomy.ts` | Compound family classification (Incretin Mimetics, GH Secretagogues, etc.). |
| `mechanismGroups` | `src/lib/taxonomy.ts` | Receptor / pathway groups (GLP-1R, GIPR, GCGR, GHSR, MCR, Growth Factors, Copper-binding). |
| `researchAreas` | `src/lib/taxonomy.ts` | Cross-family research areas (Peptide Chemistry, Receptor Studies, Assay Development, Stability, Specialty). |
| `guides` | `src/lib/taxonomy.ts` | Empty in Release 1.2. Populated in Release 2. |
| `compoundEntries` | `src/lib/taxonomy.ts` | Empty in Release 1.2. |
| `glossaryTerms` | `src/lib/taxonomy.ts` | Empty in Release 1.2. |
| `defaultReadingPathway` | `src/lib/taxonomy.ts` | Ordered steps for the "How to read the Research Hub" component. |

### Adding taxonomy data

- **New category** → add an entry to `researchCategories`, add matching
  route files (`.index.tsx` and `.$slug.tsx`) that consume `CategoryLanding`
  and `PlaceholderKnowledgePage`.
- **New guide** → append a `Guide` object to `guides`. No layout change.
- **New compound** → append a `CompoundEntry` to `compoundEntries`. Flip
  `populated: true` when the monograph is complete.
- **New mechanism** → append to `mechanismGroups`. It becomes selectable in
  `RelatedMechanisms` automatically.
- **New family** → append to `compoundFamilies`. It appears in the
  `/compounds` landing automatically.
- **New guide type** → append to `guideTypes`.

Never hardcode a taxonomy value inside a component. If the component needs
new metadata, extend the taxonomy shape first.

---

## 3. URL conventions

- **Kebab-case slugs only.** `/research-hub/mechanisms/glp1-receptor`, not
  `/research-hub/mechanisms/glp1_receptor`.
- **Category landings live at the category root** — `/research-hub/<category>`.
  Compound Reference is the one exception (`/compounds`) because it will
  hold the largest single body of pages and deserves a top-level URL.
- **Detail pages sit at `<category-root>/<slug>`**, one level deep.
  No arbitrary nesting.
- **Layout routes** (`research-hub.tsx`, `compounds.tsx`) render only
  `<Outlet />`. All chrome lives in the leaf components so each leaf owns
  its `head()` metadata and can emit `noindex` independently.
- **Existing operational routes are untouched.** `/faqs`, `/shop`,
  `/wholesale`, `/lab-testing`, `/contact` and the legal pages remain at
  their existing URLs.
- **`noindex` policy.** Any landing or `$slug` scaffold whose taxonomy entry
  (or the entry itself) has `populated: false` MUST call `seo({ ..., noindex: true })`.
  This is already enforced by every existing route file.
- **Breadcrumbs.** Every knowledge route must render `<Breadcrumbs items=[...]>`
  above `<main>`. `Home` is prepended automatically and `BreadcrumbList`
  JSON-LD is emitted for SEO.

---

## 4. Component relationships

```text
              taxonomy.ts  ─────────── single source of truth
                    │
        ┌───────────┼───────────────────────────────────┐
        │           │                                   │
  ResearchSidebar   KnowledgeNav             Related{Guides,Compounds,
  (category tree,   (parent/siblings/         Mechanisms,Methodology}
   related lists,    suggested next)          (chip/list renderers)
   glossary…)                │                          │
        │                     │                          │
        └──────────┬──────────┴──────────────┬───────────┘
                   │                         │
             CategoryLanding           GuideLayout / CompoundLayout
                   │                         │
             research-hub.*.index.tsx        research-hub.guides.$slug.tsx
             compounds.index.tsx             compounds.$slug.tsx
```

Rules:

- **Layouts consume slots, never data.** `GuideLayout` and `CompoundLayout`
  render whatever nodes are passed in. They never fetch or query taxonomy
  themselves.
- **Navigation components consume the taxonomy directly.** `KnowledgeNav`,
  `ResearchSidebar`, `ReadingPathway`, `RelatedGuides`, `RelatedCompounds`,
  `RelatedMechanisms`, `RelatedMethodology`, `ContinueReading`.
- **Category landings use `CategoryLanding`.** The one prop is `categoryId`.
  Extra content (custom listings, tables, etc.) goes into `children`.
- **`$slug` scaffolds use `PlaceholderKnowledgePage`.** They render the
  chrome, breadcrumbs, `KnowledgeNav` and "Continue reading" so URLs are
  stable while awaiting content.
- **Empty datasets never disappear** — every list component renders a
  labelled "populated in a future release" note when the dataset is empty.
  This keeps layouts predictable during authoring.

---

## 5. Future expansion rules

### Adding a category

1. Append a new entry to `researchCategories`.
2. Create `src/routes/research-hub.<id>.index.tsx` using `CategoryLanding`.
3. Create `src/routes/research-hub.<id>.$slug.tsx` using
   `PlaceholderKnowledgePage`.
4. Update the `related` field on adjacent categories so `KnowledgeNav`
   surfaces the new section.

No other files need to change.

### Adding a guide

1. Append a `Guide` entry to `guides` with `populated: true`.
2. Render its content by producing a route (or, later, an MDX file) that
   returns `<GuideLayout ...>` populated slot-by-slot.

`RelatedGuides`, `ResearchSidebar` and search (Release 2) pick it up
automatically because they read from `guides`.

### Adding a compound monograph

1. Append a `CompoundEntry` to `compoundEntries` with `populated: true`.
2. Render at `/compounds/<slug>` via `<CompoundLayout ...>`.

The `/compounds/$slug` route already renders the empty template — populated
entries just fill the slots.

### Adding a mechanism / family / research area

Append to the respective array in `taxonomy.ts`. All related-content
renderers surface it automatically.

### Adding a new page type (e.g. Protocols)

1. Add a new category to `researchCategories`.
2. Consider whether a new layout template (à la `GuideLayout`) is warranted.
   If yes, add it under `src/components/knowledge/` following the same
   slot-based pattern.
3. Never inline layout markup in route files.

### Deprecating a category

1. Flip `populated: false` and add a `robots: noindex` — do not delete the
   category entry unless every route file has been removed.
2. Once the category has zero content and no consumer links to it, remove
   the taxonomy entry and its route files together in one commit.

### What not to do

- Do not hardcode a list of categories, families, mechanisms or guides in a
  component. Extend the taxonomy.
- Do not duplicate route logic across category types — every category
  landing must go through `CategoryLanding`.
- Do not create nested URL trees under a category (e.g.
  `/research-hub/guides/glp1/semaglutide`). Flat slugs only.
- Do not modify Shopify integration or product data for educational
  purposes — the shop and the knowledge platform are independent.

---

## 6. SEO invariants

- Every route calls `seo({ path, title, description, noindex? })` from
  `src/lib/seo.ts`. No route sets meta tags by hand.
- `og:image` is set only at leaf routes with a meaningful image. Never on
  `__root.tsx` or a layout route.
- Any route rendering scaffolded content sets `noindex: true`. Populated
  categories drop the flag.
- Breadcrumbs on every knowledge route emit `BreadcrumbList` JSON-LD.

---

## 7. Release trail

- **Release 1.1** — Technical SEO, mobile nav, shared UI primitives.
- **Release 1.2 (this release)** — Knowledge architecture registry, layouts,
  templates, routes.
- **Release 2.x** — Populate `guides`, `compoundEntries`, `glossaryTerms`.
  First real compound monographs. First real guides. Sitemap enumeration.
- **Release 3.x** — Educational search + internal-linking engine, both of
  which are explicitly excluded from Release 1.2.
