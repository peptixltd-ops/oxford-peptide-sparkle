import * as React from "react";
import { cn } from "@/lib/utils";
import { Figure } from "./figures";

/**
 * Reusable, prop-driven scientific diagram primitives.
 *
 * These are lightweight SVG scaffolds — every node/label/edge is passed in.
 * No hardcoded scientific claims live here. Diagrams inherit brand tokens
 * (navy, gold, bone) via CSS custom properties and are dark-mode safe.
 *
 * All diagrams:
 *  - render inside <Figure> so caption + attribution are consistent
 *  - are responsive (viewBox based, no fixed pixel widths)
 *  - are keyboard-focusable when interactive
 *  - support a `title`/`desc` pair for screen readers
 */

export type DiagramKind =
  | "mechanism"
  | "receptor"
  | "pathway"
  | "molecular"
  | "lab-workflow";

interface CommonProps {
  id?: string;
  title: string;
  desc?: string;
  caption?: React.ReactNode;
  number?: string | number;
  attribution?: React.ReactNode;
  className?: string;
}

function FigureShell({
  id,
  number,
  caption,
  attribution,
  className,
  children,
}: {
  id?: string;
  number?: string | number;
  caption?: React.ReactNode;
  attribution?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Figure
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <div className="p-4 md:p-6">{children}</div>
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
      aria-labelledby={`${titleId} ${desc ? descId : ""}`.trim()}
      viewBox={viewBox}
      className={cn("h-auto w-full text-foreground", className)}
    >
      <title id={titleId}>{title}</title>
      {desc ? <desc id={descId}>{desc}</desc> : null}
      {children}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Mechanism diagram — linear signalling flow
// ---------------------------------------------------------------------------

export interface MechanismStep {
  label: string;
  sublabel?: string;
}

export interface MechanismDiagramProps extends CommonProps {
  steps: MechanismStep[];
}

export function MechanismDiagram({
  steps,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
}: MechanismDiagramProps) {
  const width = 100;
  const gap = width / Math.max(steps.length, 1);
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 28">
        {steps.map((s, i) => {
          const x = gap * i + gap / 2;
          return (
            <g key={i}>
              <rect
                x={x - gap / 2 + 2}
                y={4}
                width={gap - 4}
                height={14}
                rx={2}
                className="fill-card stroke-border"
                strokeWidth={0.3}
              />
              <text
                x={x}
                y={11}
                textAnchor="middle"
                className="fill-foreground"
                style={{ font: "600 3px system-ui" }}
              >
                {s.label}
              </text>
              {s.sublabel ? (
                <text
                  x={x}
                  y={15}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ font: "2.2px system-ui" }}
                >
                  {s.sublabel}
                </text>
              ) : null}
              {i < steps.length - 1 ? (
                <path
                  d={`M ${x + gap / 2 - 2} 11 L ${x + gap / 2 + 2} 11`}
                  className="stroke-[color:var(--gold)]"
                  strokeWidth={0.6}
                  markerEnd="url(#mech-arrow)"
                />
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker
            id="mech-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-[color:var(--gold)]" />
          </marker>
        </defs>
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// Receptor diagram — ligand + membrane + receptor + intracellular effector
// ---------------------------------------------------------------------------

export interface ReceptorDiagramProps extends CommonProps {
  ligand: string;
  receptor: string;
  effector?: string;
  downstream?: string[];
}

export function ReceptorDiagram({
  ligand,
  receptor,
  effector,
  downstream = [],
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
}: ReceptorDiagramProps) {
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 60">
        {/* extracellular */}
        <text
          x="2"
          y="8"
          className="fill-muted-foreground"
          style={{ font: "2.4px system-ui" }}
        >
          Extracellular
        </text>
        <circle cx="50" cy="14" r="4" className="fill-[color:var(--gold)]" />
        <text
          x="50"
          y="15"
          textAnchor="middle"
          className="fill-navy-deep"
          style={{ font: "600 2.4px system-ui" }}
        >
          {ligand}
        </text>
        {/* membrane */}
        <rect x="0" y="24" width="100" height="6" className="fill-muted" />
        <text
          x="98"
          y="28.5"
          textAnchor="end"
          className="fill-muted-foreground"
          style={{ font: "2px system-ui" }}
        >
          Membrane
        </text>
        {/* receptor */}
        <rect
          x="44"
          y="20"
          width="12"
          height="14"
          rx="1.5"
          className="fill-card stroke-[color:var(--gold)]"
          strokeWidth="0.4"
        />
        <text
          x="50"
          y="28.5"
          textAnchor="middle"
          className="fill-foreground"
          style={{ font: "600 2.6px system-ui" }}
        >
          {receptor}
        </text>
        {/* intracellular */}
        <text
          x="2"
          y="40"
          className="fill-muted-foreground"
          style={{ font: "2.4px system-ui" }}
        >
          Intracellular
        </text>
        {effector ? (
          <>
            <path
              d="M 50 34 L 50 42"
              className="stroke-[color:var(--gold)]"
              strokeWidth="0.5"
              markerEnd="url(#rec-arrow)"
            />
            <rect
              x="40"
              y="42"
              width="20"
              height="6"
              rx="1"
              className="fill-card stroke-border"
              strokeWidth="0.3"
            />
            <text
              x="50"
              y="46"
              textAnchor="middle"
              className="fill-foreground"
              style={{ font: "600 2.4px system-ui" }}
            >
              {effector}
            </text>
          </>
        ) : null}
        {downstream.map((d, i) => {
          const x = 20 + (60 / Math.max(downstream.length - 1, 1)) * i;
          return (
            <g key={i}>
              <path
                d={`M 50 48 L ${x} 54`}
                className="stroke-border"
                strokeWidth="0.3"
              />
              <text
                x={x}
                y={57}
                textAnchor="middle"
                className="fill-muted-foreground"
                style={{ font: "2.2px system-ui" }}
              >
                {d}
              </text>
            </g>
          );
        })}
        <defs>
          <marker
            id="rec-arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="4"
            markerHeight="4"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" className="fill-[color:var(--gold)]" />
          </marker>
        </defs>
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// Pathway diagram — branching graph of nodes + edges
// ---------------------------------------------------------------------------

export interface PathwayNode {
  id: string;
  label: string;
  kind?: "input" | "process" | "output";
  x: number; // 0-100
  y: number; // 0-60
}

export interface PathwayEdge {
  from: string;
  to: string;
  label?: string;
}

export interface PathwayDiagramProps extends CommonProps {
  nodes: PathwayNode[];
  edges: PathwayEdge[];
}

const kindFill: Record<Required<PathwayNode>["kind"], string> = {
  input: "fill-[color:var(--gold)]",
  process: "fill-card",
  output: "fill-navy-deep",
};

export function PathwayDiagram({
  nodes,
  edges,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
}: PathwayDiagramProps) {
  const byId = React.useMemo(
    () => Object.fromEntries(nodes.map((n) => [n.id, n])),
    [nodes],
  );
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 60">
        {edges.map((e, i) => {
          const a = byId[e.from];
          const b = byId[e.to];
          if (!a || !b) return null;
          return (
            <g key={i}>
              <path
                d={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                className="stroke-border"
                strokeWidth="0.4"
                markerEnd="url(#path-arrow)"
              />
              {e.label ? (
                <text
                  x={(a.x + b.x) / 2}
                  y={(a.y + b.y) / 2 - 1}
                  textAnchor="middle"
                  className="fill-muted-foreground"
                  style={{ font: "2px system-ui" }}
                >
                  {e.label}
                </text>
              ) : null}
            </g>
          );
        })}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x - 8}
              y={n.y - 3}
              width="16"
              height="6"
              rx="1"
              className={cn(
                "stroke-border",
                kindFill[n.kind ?? "process"],
              )}
              strokeWidth="0.3"
            />
            <text
              x={n.x}
              y={n.y + 1}
              textAnchor="middle"
              className={cn(
                n.kind === "output" ? "fill-bone" : "fill-foreground",
              )}
              style={{ font: "600 2.4px system-ui" }}
            >
              {n.label}
            </text>
          </g>
        ))}
        <defs>
          <marker
            id="path-arrow"
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
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// Molecular interaction diagram — two entities + interaction label
// ---------------------------------------------------------------------------

export interface MolecularInteractionProps extends CommonProps {
  entityA: string;
  entityB: string;
  interaction: string;
  bond?: "covalent" | "ionic" | "hydrogen" | "hydrophobic" | "allosteric";
}

const bondStyle: Record<
  Required<MolecularInteractionProps>["bond"],
  { dash: string; label: string }
> = {
  covalent: { dash: "0", label: "Covalent" },
  ionic: { dash: "1 1", label: "Ionic" },
  hydrogen: { dash: "2 1", label: "Hydrogen" },
  hydrophobic: { dash: "0.5 0.8", label: "Hydrophobic" },
  allosteric: { dash: "3 1", label: "Allosteric" },
};

export function MolecularInteractionDiagram({
  entityA,
  entityB,
  interaction,
  bond = "covalent",
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
}: MolecularInteractionProps) {
  const style = bondStyle[bond];
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <A11ySvg title={title} desc={desc} viewBox="0 0 100 40">
        <circle cx="22" cy="20" r="10" className="fill-card stroke-[color:var(--gold)]" strokeWidth="0.4" />
        <text
          x="22"
          y="21"
          textAnchor="middle"
          className="fill-foreground"
          style={{ font: "600 3px system-ui" }}
        >
          {entityA}
        </text>
        <circle cx="78" cy="20" r="10" className="fill-card stroke-[color:var(--gold)]" strokeWidth="0.4" />
        <text
          x="78"
          y="21"
          textAnchor="middle"
          className="fill-foreground"
          style={{ font: "600 3px system-ui" }}
        >
          {entityB}
        </text>
        <line
          x1="32"
          y1="20"
          x2="68"
          y2="20"
          strokeDasharray={style.dash}
          className="stroke-[color:var(--gold)]"
          strokeWidth="0.6"
        />
        <text
          x="50"
          y="14"
          textAnchor="middle"
          className="fill-foreground"
          style={{ font: "600 2.6px system-ui" }}
        >
          {interaction}
        </text>
        <text
          x="50"
          y="27"
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ font: "2.2px system-ui" }}
        >
          {style.label} interaction
        </text>
      </A11ySvg>
    </FigureShell>
  );
}

// ---------------------------------------------------------------------------
// Lab workflow diagram — numbered vertical protocol steps
// ---------------------------------------------------------------------------

export interface LabWorkflowStep {
  label: string;
  detail?: string;
}

export interface LabWorkflowDiagramProps extends CommonProps {
  steps: LabWorkflowStep[];
}

export function LabWorkflowDiagram({
  steps,
  title,
  desc,
  caption,
  number,
  attribution,
  id,
  className,
}: LabWorkflowDiagramProps) {
  return (
    <FigureShell
      id={id}
      number={number}
      caption={caption}
      attribution={attribution}
      className={className}
    >
      <A11ySvg
        title={title}
        desc={desc}
        viewBox={`0 0 100 ${Math.max(steps.length * 14 + 4, 20)}`}
      >
        {steps.map((s, i) => {
          const y = 8 + i * 14;
          return (
            <g key={i}>
              <circle
                cx="8"
                cy={y}
                r="4"
                className="fill-[color:var(--gold)]"
              />
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
                <line
                  x1="8"
                  y1={y + 4.5}
                  x2="8"
                  y2={y + 12}
                  className="stroke-border"
                  strokeWidth="0.4"
                />
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
