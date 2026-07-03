# Release 4.1 — Scientific Publishing Upgrades

Release 4.1 does not launch new articles or compound clusters. It hardens
the reusable systems that every future educational page inherits from,
moving Oxford Research Peptides closer to a scientific publisher in tone,
usability, and trust.

All new pieces are additive. No product pages, Shopify wiring, or
existing route layouts were modified.

## 1. Scientific figure library

`src/components/publishing/scientific-figures.tsx`

Prop-driven, responsive SVG diagrams that inherit brand tokens and are
dark-mode / screen-reader safe:

- `MechanismDiagram` — linear signalling flow with arrow markers.
- `ReceptorDiagram` — ligand → membrane → receptor → effector → downstream.
- `PathwayDiagram` — arbitrary node/edge graph with input/process/output kinds.
- `MolecularInteractionDiagram` — two-entity interaction with bond style
  (covalent / ionic / hydrogen / hydrophobic / allosteric).
- `LabWorkflowDiagram` — numbered vertical protocol steps.

All diagrams render inside the existing `<Figure>` shell so captions and
attributions stay consistent across the site.

## 2. Evidence matrix

`src/components/publishing/evidence-matrix.tsx`

`EvidenceMatrix` renders a study-level table with:
Study · Year · Journal · Model · Evidence level · Outcome · expandable detail.

Rows support optional `href` (external) or `referenceId` (jump to the on-page
References list). Columns can be toggled per instance. Keyboard-navigable
and hides its expand affordance when no detail is provided.

## 3. Enhanced references

`src/components/publishing/enhanced-references.tsx`

`EnhancedReferenceList` builds on the existing `ReferenceProvider` / `Cite`
system and adds:

- DOI / PMID / URL badges.
- `citationType` (primary-research, systematic-review, meta-analysis,
  clinical-trial, review, preprint, book, guideline, other).
- `evidenceCategory` (uses the shared `EvidenceLevel` union).
- Per-item expand/collapse.
- Per-item **Copy citation** and **Copy BibTeX**.
- Whole-list **Copy all**, **Download BibTeX**, **Download plain text**.
- Optional grouping by `type`, `evidence`, `year`, or `none`.

`CitationExport` exposes the same export controls for use in article
action bars.

## 4. Article utilities

`src/components/publishing/article-utilities.tsx`

Extends the Release 2.0 article kit with:

- `computeReadingTime(text, wpm?)` — utility that pairs with the existing
  `<ReadingTime />` chip.
- `LastEvidenceReview` — small chip showing the last scientific review date
  (and optional reviewer), separate from the editorial "updated" date.
- `EvidenceReviewLog` — chronological log of evidence audits.
- `ArticleMetaBar` — shared meta-strip layout that arranges reading time,
  difficulty, last-reviewed and article actions on a consistent line.

Reading time, difficulty, learning objectives, key takeaways, printable
page and share/bookmark actions remain in `article.tsx` (Release 2.0).

## 5. Knowledge Graph enhancements

`src/components/knowledge/graph-relations.tsx`

`GraphRelations` reads the Release 3.0 knowledge graph via `getRelated`
and renders bucketed "Related X" sections:

- Related receptors
- Related pathways
- Related laboratory methods
- Related compounds
- Related comparisons
- Related glossary terms

Empty buckets are automatically hidden, so the panel adapts to whatever
relationships exist for a given anchor entity. Buckets and item limits
are overridable per page.

## 6. AI readability

`src/components/publishing/ai-readability.tsx`

Structural, prop-driven blocks that help LLM crawlers and generative
search engines extract answers cleanly:

- `FiftyWordAnswer` — direct-answer block (soft 50-word cap, dev warning).
- `HundredFiftyWordAnswer` — longer contextual answer (soft 150-word cap).
- `EvidenceSnapshot` — evidence level + study count + domains + one-line
  bottom line, with `data-ai-*` attributes for extraction.
- `CommonQuestionsShell` — FAQ shell with optional inline `FAQPage`
  JSON-LD emission.
- `KeyFacts` continues to live in `article.tsx`.

Each block emits `data-ai-block="..."` markers and semantic ARIA labels.
The library never generates its own scientific copy.

## 7. Performance & accessibility

- All new SVG diagrams use `role="img"`, `<title>`, `<desc>` and inherit
  brand tokens via CSS variables — no hardcoded colours.
- Images in `ScientificDiagram` use `loading="lazy"`.
- Every interactive control (evidence-matrix toggle, reference expand,
  copy/export buttons) exposes an accessible name, `aria-expanded` where
  applicable, and visible focus rings.
- All new components are responsive and dark-mode compatible.

## 8. QA

- `bunx tsgo --noEmit` — Typecheck **PASS**.
- No existing routes, product pages, or Shopify code paths were modified.
- Schema integrity unchanged (compound monograph JSON-LD from Release 4.0
  still valid; new `CommonQuestionsShell` emits `FAQPage` only when
  explicitly opted-in per instance).
- Knowledge graph integrity unchanged: `GraphRelations` is a pure consumer
  of `getRelated` and does not mutate the registry.

## Files added

- `src/components/publishing/scientific-figures.tsx`
- `src/components/publishing/evidence-matrix.tsx`
- `src/components/publishing/enhanced-references.tsx`
- `src/components/publishing/article-utilities.tsx`
- `src/components/publishing/ai-readability.tsx`
- `src/components/knowledge/graph-relations.tsx`
- `RELEASE_4.1_NOTES.md`

## Files edited

- `src/components/publishing/index.ts` — re-exports the new modules.

## Usage sketch

```tsx
import {
  MechanismDiagram,
  EvidenceMatrix,
  EnhancedReferenceList,
  FiftyWordAnswer,
  EvidenceSnapshot,
  CommonQuestionsShell,
  ArticleMetaBar,
  ReadingTime,
  DifficultyBadge,
  LastEvidenceReview,
  ArticleActions,
} from "@/components/publishing";
import { GraphRelations } from "@/components/knowledge/graph-relations";
import { compoundRef } from "@/lib/knowledge-graph";

// In a compound monograph / guide body:
<ArticleMetaBar
  actions={<ArticleActions id="retatrutide" />}
>
  <ReadingTime minutes={12} />
  <DifficultyBadge level="advanced" />
  <LastEvidenceReview date="2026-06-01" reviewer="Scientific Review Panel" />
</ArticleMetaBar>

<FiftyWordAnswer question="What is retatrutide?">
  {/* 50-word answer prop */}
</FiftyWordAnswer>

<EvidenceSnapshot level="moderate" studyCount={6} bottomLine={/* … */} />

<MechanismDiagram
  title="GLP-1 signalling cascade"
  steps={[/* … */]}
  caption="Simplified overview of the canonical GLP-1R cascade."
/>

<EvidenceMatrix rows={/* study rows */} />

<EnhancedReferenceList groupBy="type" style="ama" />

<GraphRelations anchor={compoundRef("retatrutide")} />

<CommonQuestionsShell items={/* … */} emitJsonLd />
```
