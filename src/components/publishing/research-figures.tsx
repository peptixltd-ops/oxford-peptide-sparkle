import * as React from "react";
import { cn } from "@/lib/utils";
import { Figure } from "./figures";

/**
 * Research Asset Programme 1 — Reusable scientific SVG figure library.
 *
 * Every figure in this module:
 *   - is a prop-driven, accessible SVG (role="img", <title>, <desc>)
 *   - inherits brand tokens (navy, gold, bone) via CSS variables
 *   - is dark-mode and print safe (no hardcoded fills)
 *   - is responsive via viewBox (no fixed pixel widths)
 *   - renders inside the shared <Figure> shell for caption/attribution
 *   - exposes `entities` metadata for Knowledge Graph consumers
 *
 * Figures do NOT contain scientific copy; callers supply captions.
 * Preset compositions (INCRETIN_BIOLOGY, COMPOUND_BIOLOGY, etc.) provide
 * curated defaults for the most common editorial uses.
 */

// ---------------------------------------------------------------------------
// Shared shell + a11y SVG wrapper
// ---------------------------------------------------------------------------

export interface ResearchFigureBaseProps {
  id?: string;
  title: string;
  desc?: string;
  caption?: React.ReactNode;
  number?: string | number;
  attribution?: React.ReactNode;
  className?: string;
  /** Optional Knowledge Graph entity slugs this figure visualises. */
  entities?: string[];
}

function FigureShell({
  id,
  number,
  caption,
  attribution,
  className,
  children,
  entities,
}: {
  id?: string;
  number?: string | number;
  caption?: React.ReactNode;
  attribution?: React.ReactNode;
  className?: string;
  entities?: string[];
  children: React.ReactNode;
}) {
  return (
    <Figure
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={cn("print:break-inside-avoid", className)}
    >
      <div
        className="p-4 md:p-6 print:p-2"
        data-figure-entities={entities?.join(",") || undefined}
      >
        {children}
      </div>
    </Figure>
  );
}

function A11ySvg({
  title,
  desc,
  viewBox,
  children,
  className,
}: {
  title: string;
  desc?: string;
  viewBox: string;
  children: React.ReactNode;
  className?: string;
}) {
  const titleId = React.useId();
  const descId = React.useId();
  return (
    <svg
      role="img"
      aria-labelledby={desc ? `${titleId} ${descId}` : titleId}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={cn("h-auto w-full text-foreground print:text-black", className)}
    >
      <title id={titleId}>{title}</title>
      {desc ? <desc id={descId}>{desc}</desc> : null}
      <defs>
        <marker
          id="rf-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-[color:var(--gold)]" />
        </marker>
        <marker
          id="rf-arrow-muted"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" className="fill-border" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Generic building blocks
// ---------------------------------------------------------------------------

interface NodeSpec {
  id: string;
  label: string;
  sublabel?: string;
  x: number;
  y: number;
  kind?: "input" | "process" | "output" | "receptor" | "ligand";
  w?: number;
  h?: number;
}

interface EdgeSpec {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
}

const nodeFill: Record<NonNullable<NodeSpec["kind"]>, string> = {
  input: "fill-[color:var(--gold)]",
  process: "fill-card",
  output: "fill-navy-deep",
  receptor: "fill-card",
  ligand: "fill-[color:var(--gold)]",
};

const nodeText: Record<NonNullable<NodeSpec["kind"]>, string> = {
  input: "fill-navy-deep",
  process: "fill-foreground",
  output: "fill-bone",
  receptor: "fill-foreground",
  ligand: "fill-navy-deep",
};

function GraphNode({ n }: { n: NodeSpec }) {
  const w = n.w ?? 20;
  const h = n.h ?? 8;
  const kind = n.kind ?? "process";
  return (
    <g>
      <rect
        x={n.x - w / 2}
        y={n.y - h / 2}
        width={w}
        height={h}
        rx="1.2"
        className={cn("stroke-border", nodeFill[kind])}
        strokeWidth="0.3"
      />
      <text
        x={n.x}
        y={n.y + (n.sublabel ? -0.3 : 1)}
        textAnchor="middle"
        className={nodeText[kind]}
        style={{ font: "600 2.6px system-ui" }}
      >
        {n.label}
      </text>
      {n.sublabel ? (
        <text
          x={n.x}
          y={n.y + 2.4}
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ font: "2px system-ui" }}
        >
          {n.sublabel}
        </text>
      ) : null}
    </g>
  );
}

function GraphEdge({ e, nodes }: { e: EdgeSpec; nodes: Record<string, NodeSpec> }) {
  const a = nodes[e.from];
  const b = nodes[e.to];
  if (!a || !b) return null;
  return (
    <g>
      <line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        strokeDasharray={e.dashed ? "1.2 1" : "0"}
        className="stroke-border"
        strokeWidth="0.35"
        markerEnd="url(#rf-arrow-muted)"
      />
      {e.label ? (
        <text
          x={(a.x + b.x) / 2}
          y={(a.y + b.y) / 2 - 0.8}
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ font: "1.9px system-ui" }}
        >
          {e.label}
        </text>
      ) : null}
    </g>
  );
}

// ---------------------------------------------------------------------------
// 1. Signalling cascade (used by GLP-1R, GIPR, GCGR receptor cascades)
// ---------------------------------------------------------------------------

export interface SignallingCascadeProps extends ResearchFigureBaseProps {
  ligand: string;
  receptor: string;
  gProtein?: string;
  secondMessenger?: string;
  effectors?: string[];
  outcomes?: string[];
}

export function SignallingCascadeFigure({
  ligand,
  receptor,
  gProtein = "Gαs",
  secondMessenger = "cAMP",
  effectors = ["PKA", "EPAC"],
  outcomes = [],
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: SignallingCascadeProps) {
  const nodes: Record<string, NodeSpec> = {
    ligand: { id: "ligand", label: ligand, x: 50, y: 8, kind: "ligand", w: 22 },
    receptor: { id: "receptor", label: receptor, x: 50, y: 28, kind: "receptor", w: 22 },
    g: { id: "g", label: gProtein, x: 50, y: 42, w: 16 },
    sm: { id: "sm", label: secondMessenger, x: 50, y: 54, kind: "input", w: 18 },
  };
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 90">
        <text x="2" y="6" className="fill-muted-foreground" style={{ font: "2.2px system-ui" }}>
          Extracellular
        </text>
        <rect x="0" y="18" width="100" height="4" className="fill-muted" />
        <text x="98" y="21" textAnchor="end" className="fill-muted-foreground" style={{ font: "2px system-ui" }}>
          Plasma membrane
        </text>
        <text x="2" y="38" className="fill-muted-foreground" style={{ font: "2.2px system-ui" }}>
          Intracellular
        </text>
        {[nodes.ligand, nodes.receptor, nodes.g, nodes.sm].map((n) => (
          <GraphNode key={n.id} n={n} />
        ))}
        {(
          [
            ["ligand", "receptor"],
            ["receptor", "g"],
            ["g", "sm"],
          ] as const
        ).map(([f, t], i) => (
          <line
            key={i}
            x1={nodes[f].x}
            y1={nodes[f].y + 4}
            x2={nodes[t].x}
            y2={nodes[t].y - 4}
            className="stroke-[color:var(--gold)]"
            strokeWidth="0.5"
            markerEnd="url(#rf-arrow)"
          />
        ))}
        {effectors.map((eff, i) => {
          const x = 20 + (60 / Math.max(effectors.length - 1, 1)) * i;
          return (
            <g key={eff}>
              <line
                x1="50"
                y1="58"
                x2={x}
                y2="66"
                className="stroke-border"
                strokeWidth="0.35"
                markerEnd="url(#rf-arrow-muted)"
              />
              <GraphNode n={{ id: eff, label: eff, x, y: 70, w: 14 }} />
            </g>
          );
        })}
        {outcomes.map((o, i) => {
          const x = 15 + (70 / Math.max(outcomes.length - 1, 1)) * i;
          return (
            <g key={o}>
              <line
                x1={x}
                y1="74"
                x2={x}
                y2="82"
                className="stroke-border"
                strokeWidth="0.3"
                markerEnd="url(#rf-arrow-muted)"
              />
              <GraphNode n={{ id: `o-${o}`, label: o, x, y: 86, kind: "output", w: 18, h: 6 }} />
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 4. Mono vs Dual vs Triple agonist figure
// ---------------------------------------------------------------------------

export interface AgonistClassFigureProps extends ResearchFigureBaseProps {
  columns?: Array<{
    label: string;
    targets: string[];
    example?: string;
  }>;
}

const DEFAULT_AGONIST_COLUMNS = [
  { label: "Mono", targets: ["GLP-1R"], example: "Semaglutide" },
  { label: "Dual", targets: ["GLP-1R", "GIPR"], example: "Tirzepatide" },
  { label: "Triple", targets: ["GLP-1R", "GIPR", "GCGR"], example: "Retatrutide" },
];

export function AgonistClassFigure({
  columns = DEFAULT_AGONIST_COLUMNS,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: AgonistClassFigureProps) {
  const colW = 100 / columns.length;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 60">
        {columns.map((c, i) => {
          const cx = colW * i + colW / 2;
          return (
            <g key={c.label}>
              <rect
                x={colW * i + 2}
                y="2"
                width={colW - 4}
                height="56"
                rx="1.5"
                className="fill-card stroke-border"
                strokeWidth="0.3"
              />
              <text
                x={cx}
                y="8"
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "700 3.4px system-ui" }}
              >
                {c.label}
              </text>
              {c.targets.map((t, j) => (
                <g key={t}>
                  <rect
                    x={cx - 10}
                    y={14 + j * 10}
                    width="20"
                    height="7"
                    rx="1"
                    className="fill-[color:var(--gold)]"
                  />
                  <text
                    x={cx}
                    y={18.5 + j * 10}
                    textAnchor="middle"
                    className="fill-navy-deep"
                    style={{ font: "600 2.6px system-ui" }}
                  >
                    {t}
                  </text>
                </g>
              ))}
              {c.example ? (
                <text
                  x={cx}
                  y="54"
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ font: "italic 2.4px system-ui" }}
                >
                  e.g. {c.example}
                </text>
              ) : null}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 5. Incretin physiology overview (nutrient → gut → hormone → pancreas → outcomes)
// ---------------------------------------------------------------------------

export interface IncretinPhysiologyProps extends ResearchFigureBaseProps {
  nodes?: NodeSpec[];
  edges?: EdgeSpec[];
}

const DEFAULT_INCRETIN_NODES: NodeSpec[] = [
  { id: "meal", label: "Meal", x: 12, y: 20, kind: "input" },
  { id: "L", label: "L-cell", sublabel: "distal gut", x: 38, y: 12, w: 22 },
  { id: "K", label: "K-cell", sublabel: "proximal gut", x: 38, y: 30, w: 22 },
  { id: "glp1", label: "GLP-1", x: 62, y: 12, kind: "ligand", w: 18 },
  { id: "gip", label: "GIP", x: 62, y: 30, kind: "ligand", w: 18 },
  { id: "beta", label: "β-cell", sublabel: "pancreas", x: 84, y: 20, w: 20 },
  { id: "insulin", label: "Insulin", x: 84, y: 42, kind: "output", w: 20, h: 6 },
  { id: "glucose", label: "Glucose ↓", x: 50, y: 54, kind: "output", w: 26, h: 6 },
];

const DEFAULT_INCRETIN_EDGES: EdgeSpec[] = [
  { from: "meal", to: "L" },
  { from: "meal", to: "K" },
  { from: "L", to: "glp1" },
  { from: "K", to: "gip" },
  { from: "glp1", to: "beta" },
  { from: "gip", to: "beta" },
  { from: "beta", to: "insulin" },
  { from: "insulin", to: "glucose" },
];

export function IncretinPhysiologyFigure({
  nodes = DEFAULT_INCRETIN_NODES,
  edges = DEFAULT_INCRETIN_EDGES,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: IncretinPhysiologyProps) {
  const map = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 62">
        {edges.map((e, i) => (
          <GraphEdge key={i} e={e} nodes={map} />
        ))}
        {nodes.map((n) => (
          <GraphNode key={n.id} n={n} />
        ))}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 6-8. Molecular architecture — annotated peptide backbone
// ---------------------------------------------------------------------------

export interface MolecularArchitectureProps extends ResearchFigureBaseProps {
  name: string;
  backboneLabel?: string;
  modifications: Array<{
    position: number; // 0-100 along backbone
    label: string;
    detail?: string;
    kind?: "modification" | "linker" | "fatty-acid";
  }>;
}

export function MolecularArchitectureFigure({
  name,
  backboneLabel = "Peptide backbone",
  modifications,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: MolecularArchitectureProps) {
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 60">
        <text x="50" y="6" textAnchor="middle" className="fill-foreground" style={{ font: "700 3.4px system-ui" }}>
          {name}
        </text>
        <rect x="6" y="28" width="88" height="4" rx="2" className="fill-card stroke-border" strokeWidth="0.3" />
        <text x="50" y="38" textAnchor="middle" className="fill-muted-foreground" style={{ font: "2.2px system-ui" }}>
          {backboneLabel}
        </text>
        {modifications.map((m, i) => {
          const x = 6 + (m.position / 100) * 88;
          const isBelow = i % 2 === 1;
          const y = isBelow ? 44 : 16;
          return (
            <g key={i}>
              <circle
                cx={x}
                cy="30"
                r="1.6"
                className={cn(
                  m.kind === "fatty-acid"
                    ? "fill-[color:var(--gold)]"
                    : m.kind === "linker"
                      ? "fill-navy-deep"
                      : "fill-foreground",
                )}
              />
              <line
                x1={x}
                y1={isBelow ? 32 : 28}
                x2={x}
                y2={isBelow ? y - 3 : y + 3}
                className="stroke-border"
                strokeWidth="0.3"
              />
              <rect
                x={x - 12}
                y={y - 3}
                width="24"
                height="6"
                rx="1"
                className="fill-card stroke-border"
                strokeWidth="0.3"
              />
              <text
                x={x}
                y={y + 0.3}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 2.2px system-ui" }}
              >
                {m.label}
              </text>
              {m.detail ? (
                <text
                  x={x}
                  y={y + 2.6}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ font: "1.8px system-ui" }}
                >
                  {m.detail}
                </text>
              ) : null}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 8. Receptor profile radial figure (used for Retatrutide etc.)
// ---------------------------------------------------------------------------

export interface ReceptorProfileFigureProps extends ResearchFigureBaseProps {
  compound: string;
  receptors: Array<{ label: string; potency: number /* 0-1 */ }>;
}

export function ReceptorProfileFigure({
  compound,
  receptors,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: ReceptorProfileFigureProps) {
  const cx = 50;
  const cy = 32;
  const rMax = 24;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 66">
        <text x="50" y="6" textAnchor="middle" className="fill-foreground" style={{ font: "700 3.4px system-ui" }}>
          {compound}
        </text>
        {[0.33, 0.66, 1].map((f) => (
          <circle
            key={f}
            cx={cx}
            cy={cy}
            r={rMax * f}
            className="fill-none stroke-border"
            strokeWidth="0.2"
            strokeDasharray="0.8 0.8"
          />
        ))}
        {receptors.map((r, i) => {
          const angle = (Math.PI * 2 * i) / receptors.length - Math.PI / 2;
          const px = cx + Math.cos(angle) * rMax * Math.max(0.05, Math.min(1, r.potency));
          const py = cy + Math.sin(angle) * rMax * Math.max(0.05, Math.min(1, r.potency));
          const lx = cx + Math.cos(angle) * (rMax + 6);
          const ly = cy + Math.sin(angle) * (rMax + 6);
          return (
            <g key={r.label}>
              <line x1={cx} y1={cy} x2={px} y2={py} className="stroke-[color:var(--gold)]" strokeWidth="0.5" />
              <circle cx={px} cy={py} r="1.4" className="fill-[color:var(--gold)]" />
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 2.4px system-ui" }}
              >
                {r.label}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="1.6" className="fill-navy-deep" />
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 9. Albumin-binding half-life extension
// ---------------------------------------------------------------------------

export function AlbuminBindingFigure({
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: ResearchFigureBaseProps) {
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 50">
        <rect x="4" y="22" width="36" height="6" rx="2" className="fill-card stroke-border" strokeWidth="0.3" />
        <text x="22" y="26" textAnchor="middle" className="fill-foreground" style={{ font: "600 2.4px system-ui" }}>
          Peptide
        </text>
        <line x1="40" y1="25" x2="52" y2="25" className="stroke-[color:var(--gold)]" strokeWidth="0.6" />
        <rect x="52" y="21" width="10" height="8" rx="1" className="fill-[color:var(--gold)]" />
        <text x="57" y="25.6" textAnchor="middle" className="fill-navy-deep" style={{ font: "600 2px system-ui" }}>
          Linker
        </text>
        <rect x="62" y="19" width="8" height="12" rx="1" className="fill-navy-deep" />
        <text x="66" y="26" textAnchor="middle" className="fill-bone" style={{ font: "600 2px system-ui" }}>
          FA
        </text>
        <circle cx="86" cy="25" r="10" className="fill-card stroke-[color:var(--gold)]" strokeWidth="0.4" />
        <text x="86" y="26" textAnchor="middle" className="fill-foreground" style={{ font: "700 3px system-ui" }}>
          Albumin
        </text>
        <text x="50" y="10" textAnchor="middle" className="fill-foreground" style={{ font: "700 3.2px system-ui" }}>
          Albumin-binding half-life extension
        </text>
        <text x="50" y="44" textAnchor="middle" className="fill-muted-foreground" style={{ font: "2.2px system-ui" }}>
          Fatty-acid linker binds circulating albumin → reduced renal clearance
        </text>
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 10-13. Programme timeline (STEP, SURPASS, SURMOUNT, landmark research)
// ---------------------------------------------------------------------------

export interface ProgrammeTimelineProps extends ResearchFigureBaseProps {
  programme: string;
  items: Array<{ year: string | number; label: string; detail?: string }>;
}

export function ProgrammeTimelineFigure({
  programme,
  items,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: ProgrammeTimelineProps) {
  const height = Math.max(30, items.length * 12 + 14);
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox={`0 0 100 ${height}`}>
        <text x="4" y="8" className="fill-foreground" style={{ font: "700 3.4px system-ui" }}>
          {programme}
        </text>
        <line
          x1="14"
          y1="14"
          x2="14"
          y2={height - 4}
          className="stroke-border"
          strokeWidth="0.4"
        />
        {items.map((it, i) => {
          const y = 16 + i * 12;
          return (
            <g key={i}>
              <circle cx="14" cy={y} r="1.8" className="fill-[color:var(--gold)]" />
              <text
                x="4"
                y={y + 0.8}
                className="fill-muted-foreground"
                style={{ font: "600 2.4px system-ui" }}
              >
                {it.year}
              </text>
              <rect
                x="20"
                y={y - 4.5}
                width="76"
                height="9"
                rx="1"
                className="fill-card stroke-border"
                strokeWidth="0.3"
              />
              <text
                x="22"
                y={y - 1}
                className="fill-foreground"
                style={{ font: "600 2.6px system-ui" }}
              >
                {it.label}
              </text>
              {it.detail ? (
                <text
                  x="22"
                  y={y + 2.4}
                  className="fill-muted-foreground"
                  style={{ font: "2px system-ui" }}
                >
                  {it.detail}
                </text>
              ) : null}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 14. Evidence hierarchy pyramid
// ---------------------------------------------------------------------------

export interface EvidencePyramidProps extends ResearchFigureBaseProps {
  levels?: Array<{ label: string; detail?: string }>;
}

const DEFAULT_PYRAMID: NonNullable<EvidencePyramidProps["levels"]> = [
  { label: "Systematic reviews & meta-analyses" },
  { label: "Randomised controlled trials" },
  { label: "Cohort studies" },
  { label: "Case-control studies" },
  { label: "Case series & reports" },
  { label: "Mechanistic / preclinical" },
];

export function EvidencePyramidFigure({
  levels = DEFAULT_PYRAMID,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: EvidencePyramidProps) {
  const n = levels.length;
  const rowH = 60 / n;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 70">
        {levels.map((lv, i) => {
          const y = 4 + i * rowH;
          const halfW = 8 + (i * 34) / (n - 1);
          const nextHalfW = 8 + ((i + 1) * 34) / (n - 1);
          const points = [
            [50 - halfW, y],
            [50 + halfW, y],
            [50 + nextHalfW, y + rowH],
            [50 - nextHalfW, y + rowH],
          ]
            .map((p) => p.join(","))
            .join(" ");
          return (
            <g key={i}>
              <polygon
                points={points}
                className={cn(
                  i === 0
                    ? "fill-[color:var(--gold)]"
                    : i < 2
                      ? "fill-navy-deep"
                      : "fill-card stroke-border",
                )}
                strokeWidth="0.3"
              />
              <text
                x="50"
                y={y + rowH / 2 + 1}
                textAnchor="middle"
                className={cn(
                  i === 0
                    ? "fill-navy-deep"
                    : i < 2
                      ? "fill-bone"
                      : "fill-foreground",
                )}
                style={{ font: "600 2.4px system-ui" }}
              >
                {lv.label}
              </text>
            </g>
          );
        })}
        <text x="50" y="68" textAnchor="middle" className="fill-muted-foreground" style={{ font: "2px system-ui" }}>
          Increasing strength of evidence ↑
        </text>
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 15. Human vs preclinical evidence flow
// ---------------------------------------------------------------------------

export interface EvidenceFlowProps extends ResearchFigureBaseProps {
  preclinical?: string[];
  human?: string[];
}

const DEFAULT_PRECLINICAL = ["In vitro", "Cell culture", "Animal models"];
const DEFAULT_HUMAN = ["Phase 1", "Phase 2", "Phase 3", "Real-world"];

export function EvidenceFlowFigure({
  preclinical = DEFAULT_PRECLINICAL,
  human = DEFAULT_HUMAN,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: EvidenceFlowProps) {
  const drawRow = (items: string[], y: number, label: string, kind: NodeSpec["kind"]) => {
    const gap = 90 / items.length;
    return (
      <g>
        <text x="4" y={y - 6} className="fill-muted-foreground" style={{ font: "600 2.6px system-ui" }}>
          {label}
        </text>
        {items.map((it, i) => {
          const x = 8 + gap * i + gap / 2;
          return (
            <g key={it}>
              <GraphNode n={{ id: `${label}-${it}`, label: it, x, y, kind, w: gap - 4, h: 8 }} />
              {i < items.length - 1 ? (
                <line
                  x1={x + (gap - 4) / 2}
                  y1={y}
                  x2={x + gap - (gap - 4) / 2}
                  y2={y}
                  className="stroke-[color:var(--gold)]"
                  strokeWidth="0.4"
                  markerEnd="url(#rf-arrow)"
                />
              ) : null}
            </g>
          );
        })}
      </g>
    );
  };
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 50">
        {drawRow(preclinical, 16, "Preclinical", "process")}
        {drawRow(human, 38, "Human", "input")}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 16. Clinical development pipeline
// ---------------------------------------------------------------------------

export interface PipelineFigureProps extends ResearchFigureBaseProps {
  phases?: Array<{ label: string; sublabel?: string }>;
}

const DEFAULT_PIPELINE = [
  { label: "Discovery" },
  { label: "Preclinical" },
  { label: "Phase 1", sublabel: "Safety" },
  { label: "Phase 2", sublabel: "Efficacy" },
  { label: "Phase 3", sublabel: "Confirmatory" },
  { label: "Approval" },
  { label: "Phase 4", sublabel: "Post-market" },
];

export function PipelineFigure({
  phases = DEFAULT_PIPELINE,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: PipelineFigureProps) {
  const gap = 100 / phases.length;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 30">
        {phases.map((p, i) => {
          const x = gap * i;
          const isLast = i === phases.length - 1;
          const points = [
            [x + 1, 6],
            [x + gap - 3, 6],
            [x + gap - 1, 15],
            [x + gap - 3, 24],
            [x + 1, 24],
            [x + 3, 15],
          ]
            .map((p) => p.join(","))
            .join(" ");
          return (
            <g key={i}>
              <polygon
                points={points}
                className={cn(
                  isLast ? "fill-[color:var(--gold)]" : i > 3 ? "fill-navy-deep" : "fill-card stroke-border",
                )}
                strokeWidth="0.3"
              />
              <text
                x={x + gap / 2}
                y="14"
                textAnchor="middle"
                className={cn(isLast ? "fill-navy-deep" : i > 3 ? "fill-bone" : "fill-foreground")}
                style={{ font: "600 2.4px system-ui" }}
              >
                {p.label}
              </text>
              {p.sublabel ? (
                <text
                  x={x + gap / 2}
                  y="18"
                  textAnchor="middle"
                  className={cn(isLast ? "fill-navy-deep" : i > 3 ? "fill-bone" : "fill-muted-foreground")}
                  style={{ font: "1.8px system-ui" }}
                >
                  {p.sublabel}
                </text>
              ) : null}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 17. HPLC interpretation diagram
// ---------------------------------------------------------------------------

export interface ChromatogramFigureProps extends ResearchFigureBaseProps {
  peaks?: Array<{ retention: number /* 0-100 x-axis */; height: number /* 0-1 */; label?: string }>;
  method?: string;
}

const DEFAULT_PEAKS = [
  { retention: 22, height: 0.15, label: "Impurity A" },
  { retention: 52, height: 1, label: "Main peak" },
  { retention: 72, height: 0.08, label: "Impurity B" },
];

export function ChromatogramFigure({
  peaks = DEFAULT_PEAKS,
  method = "HPLC (RP-C18, UV 214 nm)",
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: ChromatogramFigureProps) {
  const baselineY = 46;
  const path = [`M 4 ${baselineY}`];
  for (let x = 4; x <= 96; x += 1) {
    let y = baselineY;
    for (const p of peaks) {
      const dx = x - (4 + (p.retention / 100) * 92);
      y -= p.height * 34 * Math.exp(-(dx * dx) / 4);
    }
    path.push(`L ${x.toFixed(1)} ${y.toFixed(2)}`);
  }
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 56">
        <text x="4" y="6" className="fill-muted-foreground" style={{ font: "2.2px system-ui" }}>
          {method}
        </text>
        <line x1="4" y1={baselineY} x2="96" y2={baselineY} className="stroke-border" strokeWidth="0.3" />
        <line x1="4" y1="10" x2="4" y2={baselineY} className="stroke-border" strokeWidth="0.3" />
        <text x="2" y="14" className="fill-muted-foreground" style={{ font: "1.8px system-ui" }}>
          Abs
        </text>
        <text x="96" y="54" textAnchor="end" className="fill-muted-foreground" style={{ font: "1.8px system-ui" }}>
          Retention time →
        </text>
        <path d={path.join(" ")} className="fill-none stroke-[color:var(--gold)]" strokeWidth="0.5" />
        {peaks.map((p, i) => {
          const x = 4 + (p.retention / 100) * 92;
          const y = baselineY - p.height * 34;
          return (
            <g key={i}>
              <line x1={x} y1={y - 2} x2={x} y2={y - 6} className="stroke-border" strokeWidth="0.3" />
              <text
                x={x}
                y={y - 7}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 2px system-ui" }}
              >
                {p.label}
              </text>
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 18. LC-MS identity workflow (numbered vertical steps + mass fragments)
// ---------------------------------------------------------------------------

export interface WorkflowStepsFigureProps extends ResearchFigureBaseProps {
  steps: Array<{ label: string; detail?: string }>;
}

export function WorkflowStepsFigure({
  steps,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: WorkflowStepsFigureProps) {
  const height = Math.max(20, steps.length * 14 + 6);
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox={`0 0 100 ${height}`}>
        {steps.map((s, i) => {
          const y = 8 + i * 14;
          return (
            <g key={i}>
              <circle cx="8" cy={y} r="4" className="fill-[color:var(--gold)]" />
              <text
                x="8"
                y={y + 1.2}
                textAnchor="middle"
                className="fill-navy-deep"
                style={{ font: "700 3px system-ui" }}
              >
                {i + 1}
              </text>
              {i < steps.length - 1 ? (
                <line x1="8" y1={y + 4.5} x2="8" y2={y + 12} className="stroke-border" strokeWidth="0.4" />
              ) : null}
              <rect
                x="16"
                y={y - 5}
                width="80"
                height="10"
                rx="1.5"
                className="fill-card stroke-border"
                strokeWidth="0.3"
              />
              <text
                x="18"
                y={y - 1.5}
                className="fill-foreground"
                style={{ font: "600 2.8px system-ui" }}
              >
                {s.label}
              </text>
              {s.detail ? (
                <text
                  x="18"
                  y={y + 2.8}
                  className="fill-muted-foreground"
                  style={{ font: "2.2px system-ui" }}
                >
                  {s.detail}
                </text>
              ) : null}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 20. Storage stability timeline
// ---------------------------------------------------------------------------

export interface StabilityTimelineProps extends ResearchFigureBaseProps {
  segments?: Array<{ label: string; range: string; stability: "high" | "medium" | "low" }>;
}

const DEFAULT_STABILITY: NonNullable<StabilityTimelineProps["segments"]> = [
  { label: "Lyophilised @ −20 °C", range: "24+ months", stability: "high" },
  { label: "Lyophilised @ 2–8 °C", range: "12 months", stability: "high" },
  { label: "Reconstituted @ 2–8 °C", range: "28 days", stability: "medium" },
  { label: "Room temperature", range: "days", stability: "low" },
];

const stabilityFill: Record<"high" | "medium" | "low", string> = {
  high: "fill-navy-deep",
  medium: "fill-[color:var(--gold)]",
  low: "fill-card stroke-border",
};

const stabilityText: Record<"high" | "medium" | "low", string> = {
  high: "fill-bone",
  medium: "fill-navy-deep",
  low: "fill-foreground",
};

export function StabilityTimelineFigure({
  segments = DEFAULT_STABILITY,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: StabilityTimelineProps) {
  const rowH = 10;
  const height = segments.length * (rowH + 4) + 10;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox={`0 0 100 ${height}`}>
        {segments.map((s, i) => {
          const y = 4 + i * (rowH + 4);
          return (
            <g key={i}>
              <rect
                x="4"
                y={y}
                width="92"
                height={rowH}
                rx="1.5"
                className={cn(stabilityFill[s.stability])}
                strokeWidth="0.3"
              />
              <text
                x="6"
                y={y + rowH / 2 + 1}
                className={stabilityText[s.stability]}
                style={{ font: "600 2.6px system-ui" }}
              >
                {s.label}
              </text>
              <text
                x="94"
                y={y + rowH / 2 + 1}
                textAnchor="end"
                className={stabilityText[s.stability]}
                style={{ font: "italic 2.4px system-ui" }}
              >
                {s.range}
              </text>
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// 21-24. Comparison matrix figures (SVG-driven, distinct from HTML tables)
// ---------------------------------------------------------------------------

export interface ComparisonMatrixFigureProps extends ResearchFigureBaseProps {
  rowHeader?: string;
  columns: string[];
  rows: Array<{ label: string; values: Array<React.ReactNode> }>;
}

export function ComparisonMatrixFigure({
  rowHeader = "",
  columns,
  rows,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
  entities,
}: ComparisonMatrixFigureProps) {
  const colCount = columns.length + 1;
  const colW = 100 / colCount;
  const rowH = 10;
  const headerH = 10;
  const height = headerH + rows.length * rowH + 4;
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
      entities={entities}
    >
      <A11ySvg title={title} desc={desc} viewBox={`0 0 100 ${height}`}>
        <rect x="0" y="0" width="100" height={headerH} className="fill-navy-deep" />
        <text
          x={colW / 2}
          y={headerH / 2 + 1.2}
          textAnchor="middle"
          className="fill-bone"
          style={{ font: "700 2.6px system-ui" }}
        >
          {rowHeader}
        </text>
        {columns.map((c, i) => (
          <text
            key={c}
            x={colW * (i + 1) + colW / 2}
            y={headerH / 2 + 1.2}
            textAnchor="middle"
            className="fill-bone"
            style={{ font: "700 2.6px system-ui" }}
          >
            {c}
          </text>
        ))}
        {rows.map((r, i) => {
          const y = headerH + i * rowH;
          return (
            <g key={i}>
              <rect
                x="0"
                y={y}
                width="100"
                height={rowH}
                className={cn(i % 2 === 0 ? "fill-card" : "fill-muted/40")}
              />
              <text
                x={colW / 2}
                y={y + rowH / 2 + 1}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 2.4px system-ui" }}
              >
                {r.label}
              </text>
              {r.values.map((v, j) => (
                <text
                  key={j}
                  x={colW * (j + 1) + colW / 2}
                  y={y + rowH / 2 + 1}
                  textAnchor="middle"
                  className="fill-foreground"
                  style={{ font: "2.4px system-ui" }}
                >
                  {typeof v === "string" || typeof v === "number" ? v : ""}
                </text>
              ))}
            </g>
          );
        })}
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// Preset registry — the 24 assets specified by Research Asset Programme 1
// ---------------------------------------------------------------------------

export interface FigureAssetMeta {
  slug: string;
  name: string;
  category:
    | "incretin-biology"
    | "compound-biology"
    | "study"
    | "evidence"
    | "laboratory"
    | "comparison";
  description: string;
  entities: string[];
}

export const RESEARCH_FIGURE_REGISTRY: FigureAssetMeta[] = [
  {
    slug: "glp1r-cascade",
    name: "GLP-1 receptor signalling cascade",
    category: "incretin-biology",
    description: "GLP-1 → GLP-1R → Gαs → cAMP → PKA/EPAC → downstream effectors.",
    entities: ["glp1", "glp1r"],
  },
  {
    slug: "gipr-cascade",
    name: "GIP receptor signalling cascade",
    category: "incretin-biology",
    description: "GIP → GIPR → Gαs → cAMP → PKA → insulin secretion & adipocyte axis.",
    entities: ["gip", "gipr"],
  },
  {
    slug: "gcgr-cascade",
    name: "Glucagon receptor signalling",
    category: "incretin-biology",
    description: "Glucagon → GCGR → Gαs → cAMP → hepatic glucose output.",
    entities: ["glucagon", "gcgr"],
  },
  {
    slug: "mono-dual-triple",
    name: "Mono vs dual vs triple agonists",
    category: "incretin-biology",
    description: "Side-by-side comparison of receptor engagement classes.",
    entities: ["semaglutide", "tirzepatide", "retatrutide"],
  },
  {
    slug: "incretin-physiology",
    name: "Incretin physiology overview",
    category: "incretin-biology",
    description: "Meal → L/K cells → GLP-1/GIP → β-cell → insulin → glucose.",
    entities: ["glp1", "gip", "glp1r", "gipr"],
  },
  {
    slug: "semaglutide-architecture",
    name: "Semaglutide molecular modification",
    category: "compound-biology",
    description: "Peptide backbone with C18 fatty-diacid linker & Aib substitution.",
    entities: ["semaglutide"],
  },
  {
    slug: "tirzepatide-architecture",
    name: "Tirzepatide molecular architecture",
    category: "compound-biology",
    description: "Dual-agonist backbone with C20 fatty-diacid linker.",
    entities: ["tirzepatide"],
  },
  {
    slug: "retatrutide-receptor-profile",
    name: "Retatrutide receptor profile",
    category: "compound-biology",
    description: "Radial receptor potency plot for GLP-1R, GIPR, GCGR.",
    entities: ["retatrutide", "glp1r", "gipr", "gcgr"],
  },
  {
    slug: "albumin-half-life",
    name: "Albumin-binding half-life extension",
    category: "compound-biology",
    description: "Fatty-acid linker binding to circulating albumin.",
    entities: ["semaglutide", "tirzepatide"],
  },
  {
    slug: "step-timeline",
    name: "STEP programme timeline",
    category: "study",
    description: "Chronological release of the STEP trial series.",
    entities: ["semaglutide", "step-programme"],
  },
  {
    slug: "surpass-timeline",
    name: "SURPASS programme timeline",
    category: "study",
    description: "Chronological release of the SURPASS trial series.",
    entities: ["tirzepatide", "surpass-programme"],
  },
  {
    slug: "surmount-timeline",
    name: "SURMOUNT programme timeline",
    category: "study",
    description: "Chronological release of the SURMOUNT trial series.",
    entities: ["tirzepatide", "surmount-programme"],
  },
  {
    slug: "incretin-landmarks",
    name: "Landmark incretin research timeline",
    category: "study",
    description: "Milestones in incretin biology and therapeutics.",
    entities: ["glp1", "gip", "semaglutide", "tirzepatide", "retatrutide"],
  },
  {
    slug: "evidence-pyramid",
    name: "Evidence hierarchy pyramid",
    category: "evidence",
    description: "Study-design pyramid from mechanistic to systematic review.",
    entities: [],
  },
  {
    slug: "human-vs-preclinical",
    name: "Human vs preclinical evidence flow",
    category: "evidence",
    description: "Two-track flow: in vitro → animal, then phase 1-4 human.",
    entities: [],
  },
  {
    slug: "clinical-pipeline",
    name: "Clinical development pipeline",
    category: "evidence",
    description: "Discovery → preclinical → phase 1-3 → approval → phase 4.",
    entities: [],
  },
  {
    slug: "hplc-interpretation",
    name: "HPLC interpretation diagram",
    category: "laboratory",
    description: "Annotated chromatogram with main peak and impurities.",
    entities: ["hplc"],
  },
  {
    slug: "lcms-workflow",
    name: "LC-MS identity workflow",
    category: "laboratory",
    description: "Numbered vertical workflow for LC-MS identity confirmation.",
    entities: ["lc-ms"],
  },
  {
    slug: "reconstitution-workflow",
    name: "Reconstitution workflow",
    category: "laboratory",
    description: "Numbered workflow: sanitise → diluent → swirl → store.",
    entities: ["reconstitution"],
  },
  {
    slug: "stability-timeline",
    name: "Storage stability timeline",
    category: "laboratory",
    description: "Storage conditions and stability windows.",
    entities: ["stability"],
  },
  {
    slug: "glp1-agonist-matrix",
    name: "GLP-1 agonist comparison matrix",
    category: "comparison",
    description: "Matrix of approved GLP-1R agonists across pharmacology attributes.",
    entities: ["semaglutide", "liraglutide", "dulaglutide"],
  },
  {
    slug: "mono-dual-triple-matrix",
    name: "Mono vs dual vs triple comparison matrix",
    category: "comparison",
    description: "Attribute-level comparison across incretin agonist classes.",
    entities: ["semaglutide", "tirzepatide", "retatrutide"],
  },
  {
    slug: "weekly-peptides",
    name: "Weekly peptide comparison",
    category: "comparison",
    description: "Weekly-dosing peptides: half-life, receptor targets, class.",
    entities: ["semaglutide", "tirzepatide", "dulaglutide"],
  },
  {
    slug: "compound-family",
    name: "Compound family overview",
    category: "comparison",
    description: "Family map of incretin-based compounds.",
    entities: ["semaglutide", "tirzepatide", "retatrutide", "liraglutide"],
  },
];

export function getFigureAsset(slug: string): FigureAssetMeta | undefined {
  return RESEARCH_FIGURE_REGISTRY.find((f) => f.slug === slug);
}

export function getFigureAssetsForEntity(entitySlug: string): FigureAssetMeta[] {
  return RESEARCH_FIGURE_REGISTRY.filter((f) => f.entities.includes(entitySlug));
}
