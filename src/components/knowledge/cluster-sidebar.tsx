import { cn } from "@/lib/utils";
import { AlertTriangle, Map as MapIcon, Sparkles } from "lucide-react";
import {
  clusterNavigationFor,
  computeCompleteness,
  type TopicCluster,
} from "@/lib/topic-clusters";
import {
  getFoundational,
  getRelated,
  type EntityRef,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

/**
 * Cluster-aware sidebar. Complements ResearchSidebar with cluster-specific
 * blocks — full cluster map, reading progress, related entities,
 * foundational reading, plus (dev-only) missing concepts.
 *
 * `showMissing` gates the developer-facing "missing concepts" block. In
 * production it should be false unless the user is inside the editorial
 * dashboard.
 */

export interface ClusterSidebarProps {
  anchor: EntityRef;
  showMissing?: boolean;
  className?: string;
}

function ClusterMap({
  cluster,
  currentKey,
}: {
  cluster: TopicCluster;
  currentKey?: string;
}) {
  return (
    <ul className="space-y-3">
      {cluster.slots.map((s) => (
        <li key={s.slot.id}>
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span>{s.slot.label}</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-[10px]",
                s.filled
                  ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]"
                  : "bg-muted text-muted-foreground",
              )}
              aria-hidden
            >
              {s.entities.length}
            </span>
          </div>
          <ul className="mt-1 space-y-0.5">
            {s.entities.slice(0, 4).map((e) => {
              const k = `${e.type}::${e.slug}`;
              const active = k === currentKey;
              return (
                <li key={k}>
                  {e.path ? (
                    <a
                      href={e.path}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block truncate rounded-sm px-1 py-0.5 text-xs",
                        active
                          ? "bg-[color:var(--gold)]/10 text-foreground"
                          : "text-foreground/85 hover:text-foreground",
                      )}
                    >
                      {e.title}
                    </a>
                  ) : (
                    <span className="block truncate px-1 py-0.5 text-xs text-muted-foreground">
                      {e.title}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function ReadingProgress({ cluster }: { cluster: TopicCluster }) {
  const filled = cluster.slots.filter((s) => s.filled).length;
  const pct = Math.round((filled / cluster.slots.length) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">Cluster progress</span>
        <span className="text-foreground">
          {filled}/{cluster.slots.length}
        </span>
      </div>
      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Cluster reading progress"
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className="h-full rounded-full bg-[color:var(--gold)]"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function EntityList({ items }: { items: readonly KnowledgeEntity[] }) {
  return (
    <ul className="space-y-1">
      {items.map((e) => (
        <li key={`${e.type}::${e.slug}`}>
          {e.path ? (
            <a
              href={e.path}
              className="text-sm text-foreground/85 hover:text-[color:var(--gold)]"
            >
              {e.title}
            </a>
          ) : (
            <span className="text-sm text-muted-foreground">{e.title}</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[color:var(--gold)]">
        {icon}
        {title}
      </div>
      {children}
    </section>
  );
}

export function ClusterSidebar({
  anchor,
  showMissing = false,
  className,
}: ClusterSidebarProps) {
  const nav = clusterNavigationFor(anchor);
  if (!nav) return null;

  const { cluster, currentEntity } = nav;
  const completeness = computeCompleteness(cluster);
  const related = getRelated(anchor, { limit: 6 });
  const foundational = getFoundational(4);
  const currentKey = currentEntity
    ? `${currentEntity.type}::${currentEntity.slug}`
    : undefined;

  return (
    <aside
      aria-label={`${cluster.title} cluster sidebar`}
      className={cn("space-y-4 text-sm", className)}
    >
      <Section title="Cluster map" icon={<MapIcon className="h-3 w-3" aria-hidden />}>
        <ClusterMap cluster={cluster} currentKey={currentKey} />
      </Section>

      <Section title="Reading progress">
        <ReadingProgress cluster={cluster} />
      </Section>

      {related.length ? (
        <Section title="Related entities">
          <EntityList items={related} />
        </Section>
      ) : null}

      {foundational.length ? (
        <Section
          title="Foundational reading"
          icon={<Sparkles className="h-3 w-3" aria-hidden />}
        >
          <EntityList items={foundational} />
        </Section>
      ) : null}

      {showMissing && completeness.missingSlots.length ? (
        <Section
          title="Missing concepts (dev)"
          icon={<AlertTriangle className="h-3 w-3" aria-hidden />}
        >
          <ul className="space-y-1 text-xs text-muted-foreground">
            {completeness.missingSlots.map((s) => (
              <li key={s.id}>• {s.label}</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </aside>
  );
}
