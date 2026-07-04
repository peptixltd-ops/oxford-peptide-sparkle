# Research Asset Programme 1 — Scientific Figure Library

This sprint delivers a reusable, proprietary SVG figure library for the
Oxford Research Peptides educational platform. No educational copy, no
new guides, no new compounds, and no platform infrastructure were
added — only assets and their registry.

All figures live in `src/components/publishing/research-figures.tsx`
and are re-exported through `src/components/publishing/index.ts`.

## Guarantees (applied to every figure)

- Accessible SVG: `role="img"`, `<title>`, `<desc>`, aria-labelledby.
- Prop-driven — no hardcoded scientific claims; captions supplied by callers.
- Inherit brand tokens (`--gold`, `navy-deep`, `bone`) — dark-mode safe.
- `preserveAspectRatio="xMidYMid meet"` + viewBox → responsive & print safe.
- Wrapped in the shared `<Figure>` shell for consistent captions / attribution.
- `data-figure-entities` attribute exposes the KG entities visualised, so
  Knowledge Graph consumers can auto-cross-reference in future guides.
- `print:break-inside-avoid` + `print:text-black` for print rendering.

## Components

| # | Component | Category |
|---|-----------|----------|
| 1 | `SignallingCascadeFigure` (GLP-1R preset) | incretin-biology |
| 2 | `SignallingCascadeFigure` (GIPR preset) | incretin-biology |
| 3 | `SignallingCascadeFigure` (GCGR preset) | incretin-biology |
| 4 | `AgonistClassFigure` | incretin-biology |
| 5 | `IncretinPhysiologyFigure` | incretin-biology |
| 6 | `MolecularArchitectureFigure` (Semaglutide) | compound-biology |
| 7 | `MolecularArchitectureFigure` (Tirzepatide) | compound-biology |
| 8 | `ReceptorProfileFigure` (Retatrutide) | compound-biology |
| 9 | `AlbuminBindingFigure` | compound-biology |
| 10 | `ProgrammeTimelineFigure` (STEP) | study |
| 11 | `ProgrammeTimelineFigure` (SURPASS) | study |
| 12 | `ProgrammeTimelineFigure` (SURMOUNT) | study |
| 13 | `ProgrammeTimelineFigure` (Landmarks) | study |
| 14 | `EvidencePyramidFigure` | evidence |
| 15 | `EvidenceFlowFigure` | evidence |
| 16 | `PipelineFigure` | evidence |
| 17 | `ChromatogramFigure` (HPLC) | laboratory |
| 18 | `WorkflowStepsFigure` (LC-MS) | laboratory |
| 19 | `WorkflowStepsFigure` (Reconstitution) | laboratory |
| 20 | `StabilityTimelineFigure` | laboratory |
| 21 | `ComparisonMatrixFigure` (GLP-1 agonists) | comparison |
| 22 | `ComparisonMatrixFigure` (Mono/Dual/Triple) | comparison |
| 23 | `ComparisonMatrixFigure` (Weekly peptides) | comparison |
| 24 | `ComparisonMatrixFigure` (Compound family) | comparison |

Components #1–3 all use the same `SignallingCascadeFigure` primitive with
different `ligand`, `receptor`, `gProtein`, `secondMessenger`, `effectors`
props. Components #10–13 share `ProgrammeTimelineFigure`; #18–19 share
`WorkflowStepsFigure`; #21–24 share `ComparisonMatrixFigure`. Sharing
primitives keeps the visual language consistent across every editorial
surface.

## Asset registry

`RESEARCH_FIGURE_REGISTRY` in the same module lists all 24 preset assets
with slug, name, category, description, and the Knowledge Graph entity
slugs they visualise. Two helpers:

```ts
getFigureAsset(slug)                  // → FigureAssetMeta | undefined
getFigureAssetsForEntity(entitySlug)  // → FigureAssetMeta[]
```

Future guides can look up figures by entity (e.g. "which figures depict
GLP-1R?") without hand-wiring anything in the guide itself.

## Knowledge Graph integration

The registry entries reference existing entity slugs from
`src/lib/taxonomy.ts` and `src/lib/knowledge-graph.ts`. No taxonomy
mutations are required — figures are pure consumers.

## Usage sketch

```tsx
import {
  SignallingCascadeFigure,
  AgonistClassFigure,
  ProgrammeTimelineFigure,
  ChromatogramFigure,
  EvidencePyramidFigure,
} from "@/components/publishing";

<SignallingCascadeFigure
  title="GLP-1 receptor signalling cascade"
  ligand="GLP-1"
  receptor="GLP-1R"
  effectors={["PKA", "EPAC2"]}
  outcomes={["Insulin secretion", "Satiety", "Gastric emptying"]}
  entities={["glp1", "glp1r"]}
  caption="Canonical GLP-1R Gαs / cAMP cascade."
/>

<ProgrammeTimelineFigure
  programme="STEP programme"
  items={[
    { year: 2021, label: "STEP 1", detail: "Adults with obesity" },
    { year: 2021, label: "STEP 2", detail: "Type 2 diabetes" },
    { year: 2022, label: "STEP 5", detail: "104-week extension" },
  ]}
  entities={["semaglutide", "step-programme"]}
/>
```

## QA

- `bunx tsgo --noEmit` — Typecheck **PASS**.
- Accessibility: every SVG has `role="img"`, `<title>`, `<desc>`, and
  a labelling relationship (`aria-labelledby`).
- Responsive: viewBox-driven, no fixed widths.
- Dark mode: all fills come from CSS variables / Tailwind tokens.
- Print: `print:break-inside-avoid` on the figure shell, `print:text-black`
  on SVGs, no background-only differentiation.
- No changes to Shopify, routes, or existing content clusters.

## Files added

- `src/components/publishing/research-figures.tsx`
- `RELEASE_RESEARCH_ASSET_PROGRAMME_1.md`

## Files edited

- `src/components/publishing/index.ts` — re-exports the new module.
