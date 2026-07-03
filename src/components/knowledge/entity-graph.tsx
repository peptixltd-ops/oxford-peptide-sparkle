import { cn } from "@/lib/utils";
import { localGraph, type LocalGraph } from "@/lib/knowledge-explorer";
import type { EntityRef, EntityType } from "@/lib/knowledge-graph";

/**
 * Accessible SVG visualisation of a Knowledge Graph entity's local
 * neighbourhood. No external libraries — a radial layout with the anchor
 * in the centre and parent / children / related entities arranged around it.
 *
 * The graphic is decorative — a labelled list beneath is the primary
 * accessible representation. Focused labels reveal the same URLs.
 */
export interface EntityGraphProps {
  anchor: EntityRef;
  title?: string;
  className?: string;
  limitPerBucket?: number;
}

const TYPE_COLOR: Record<EntityType, string> = {
  category: "#1B3A5B",
  compound: "#C9A34D",
  "compound-family": "#8A6D2F",
  mechanism: "#3F7DB0",
  receptor: "#3F7DB0",
  pathway: "#3F7DB0",
  "research-area": "#5F8F5F",
  methodology: "#A15A2F",
  comparison: "#7A5FA0",
  "glossary-term": "#6A6A6A",
  "literature-review": "#4A4A6A",
  guide: "#2E2E2E",
};

interface Positioned {
  x: number;
  y: number;
  node: LocalGraph["nodes"][number];
}

function layout(graph: LocalGraph, width: number, height: number): Positioned[] {
  const cx = width / 2;
  const cy = height / 2;
  const nonAnchor = graph.nodes.filter((n) => n.role !== "anchor");
  const anchor = graph.nodes.find((n) => n.role === "anchor")!;
  const radius = Math.min(width, height) / 2 - 70;
  const positioned: Positioned[] = [{ x: cx, y: cy, node: anchor }];
  const step = (Math.PI * 2) / Math.max(nonAnchor.length, 1);
  nonAnchor.forEach((n, i) => {
    const angle = -Math.PI / 2 + i * step;
    positioned.push({
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius,
      node: n,
    });
  });
  return positioned;
}

export function EntityGraph({
  anchor,
  title = "Entity relationships",
  className,
  limitPerBucket = 6,
}: EntityGraphProps) {
  const graph = localGraph(anchor, limitPerBucket);
  if (!graph) return null;

  const width = 640;
  const height = 420;
  const positioned = layout(graph, width, height);
  const anchorPos = positioned[0];

  return (
    <section aria-labelledby="entity-graph-title" className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between gap-3">
        <h3 id="entity-graph-title" className="font-display text-lg text-navy-deep">
          {title}
        </h3>
        <span className="text-[10px] font-bold tracking-widest text-muted-foreground">
          KNOWLEDGE GRAPH
        </span>
      </div>
      <div className="rounded-lg border border-navy-deep/10 bg-white p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Relationships around ${graph.anchor.title}. See labelled list below for the same information.`}
          className="w-full h-auto"
        >
          <g>
            {positioned.slice(1).map((p, i) => (
              <line
                key={`edge-${i}`}
                x1={anchorPos.x}
                y1={anchorPos.y}
                x2={p.x}
                y2={p.y}
                stroke="#D4C79A"
                strokeWidth={1.2}
                strokeDasharray={p.node.role === "related" ? "4 4" : "0"}
                aria-hidden="true"
              />
            ))}
          </g>
          {positioned.map((p, i) => {
            const color = TYPE_COLOR[p.node.type] ?? "#1B3A5B";
            const isAnchor = p.node.role === "anchor";
            const r = isAnchor ? 30 : 20;
            return (
              <g key={`node-${i}`}>
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={r}
                  fill={color}
                  opacity={isAnchor ? 0.95 : 0.85}
                  stroke="#0F2438"
                  strokeWidth={isAnchor ? 2 : 1}
                />
                <text
                  x={p.x}
                  y={p.y + r + 14}
                  textAnchor="middle"
                  className="fill-navy-deep"
                  fontSize={11}
                  fontWeight={isAnchor ? 700 : 500}
                >
                  {truncate(p.node.title, 22)}
                </text>
                <text
                  x={p.x}
                  y={p.y + r + 26}
                  textAnchor="middle"
                  fill="#5A5A5A"
                  fontSize={9}
                >
                  {p.node.type.replace(/-/g, " ")}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <details className="rounded-lg border border-navy-deep/10 bg-white/50 p-4">
        <summary className="cursor-pointer text-xs font-bold tracking-widest text-navy-deep">
          RELATIONSHIP LIST
        </summary>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          {(["parent", "child", "related"] as const).map((role) => {
            const items = graph.nodes.filter((n) => n.role === role);
            if (!items.length) return null;
            return (
              <div key={role}>
                <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  {role === "parent" ? "Parent" : role === "child" ? "Children" : "Related"}
                </dt>
                <dd>
                  <ul className="space-y-1">
                    {items.map((n) => (
                      <li key={`${n.type}-${n.ref.slug}-${role}`}>
                        {n.path ? (
                          <a
                            href={n.path}
                            className="text-navy-deep hover:text-gold focus-visible:text-gold underline-offset-2 hover:underline"
                          >
                            {n.title}
                          </a>
                        ) : (
                          <span className="text-navy-deep/80">{n.title}</span>
                        )}
                        <span className="ml-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                          {n.type.replace(/-/g, " ")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            );
          })}
        </dl>
      </details>
    </section>
  );
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n - 1)}…` : s;
}
