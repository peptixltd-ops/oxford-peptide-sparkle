import * as React from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Network } from "lucide-react";
import {
  getRelated,
  type EntityRef,
  type EntityType,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

/**
 * Auto-generated related-content panel driven entirely by the Knowledge
 * Graph. Empty buckets are hidden. Use on any populated educational page.
 */

interface Bucket {
  key: string;
  label: string;
  types: EntityType[];
}

const DEFAULT_BUCKETS: Bucket[] = [
  { key: "receptors", label: "Related receptors", types: ["receptor"] },
  { key: "pathways", label: "Related pathways", types: ["pathway"] },
  { key: "methods", label: "Related laboratory methods", types: ["methodology"] },
  { key: "compounds", label: "Related compounds", types: ["compound"] },
  { key: "comparisons", label: "Related comparisons", types: ["comparison"] },
  { key: "glossary", label: "Related glossary terms", types: ["glossary-term"] },
];

export interface GraphRelationsProps {
  anchor: EntityRef;
  /** Override buckets. Defaults cover receptor/pathway/methods/compound/comparison/glossary. */
  buckets?: Bucket[];
  /** Maximum items per bucket. */
  limitPerBucket?: number;
  title?: string;
  className?: string;
}

function EntityCard({ e }: { e: KnowledgeEntity }) {
  const inner = (
    <>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {e.type.replace(/-/g, " ")}
      </div>
      <div className="mt-1 flex items-start justify-between gap-2">
        <span className="font-display text-sm text-foreground group-hover:text-[color:var(--gold)]">
          {e.title}
        </span>
        {e.path ? (
          <ArrowRight
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        ) : null}
      </div>
      {e.description ? (
        <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
          {e.description}
        </p>
      ) : null}
    </>
  );
  const base =
    "group block rounded-lg border border-border bg-card p-3 transition-colors hover:border-[color:var(--gold)]/60";
  return e.path ? (
    <a href={e.path} className={base}>
      {inner}
    </a>
  ) : (
    <div className={cn(base, "opacity-70")}>{inner}</div>
  );
}

export function GraphRelations({
  anchor,
  buckets = DEFAULT_BUCKETS,
  limitPerBucket = 6,
  title = "Related from the knowledge graph",
  className,
}: GraphRelationsProps) {
  const rendered = buckets
    .map((b) => ({
      bucket: b,
      items: getRelated(anchor, { type: b.types, limit: limitPerBucket }),
    }))
    .filter((r) => r.items.length > 0);

  if (!rendered.length) return null;

  return (
    <section aria-label={title} className={cn("space-y-5", className)}>
      <div className="flex items-center gap-2">
        <Network className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        <h3 className="font-display text-lg text-foreground">{title}</h3>
      </div>
      <div className="space-y-6">
        {rendered.map(({ bucket, items }) => (
          <div key={bucket.key} className="space-y-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {bucket.label}
            </h4>
            <ul className="grid gap-2 sm:grid-cols-2">
              {items.map((e) => (
                <li key={`${e.type}::${e.slug}`}>
                  <EntityCard e={e} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
