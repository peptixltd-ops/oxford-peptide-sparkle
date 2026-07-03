import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Layers } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  clusterNavigationFor,
  clusterBreadcrumbs,
  type ClusterNavigation,
  type TopicCluster,
} from "@/lib/topic-clusters";
import type { EntityRef, KnowledgeEntity } from "@/lib/knowledge-graph";

/**
 * Reusable cluster navigation. Given the current entity, renders:
 *  - cluster overview link
 *  - breadcrumb (Home → Hub → Pillar → Cluster)
 *  - supporting pages within the cluster
 *  - suggested next reading
 *  - related clusters
 *
 * Every dataset comes from the cluster registry. No page hardcodes links.
 */

export interface ClusterNavigationProps {
  anchor: EntityRef;
  className?: string;
}

function EntityLink({
  e,
  active,
}: {
  e: KnowledgeEntity;
  active?: boolean;
}) {
  const label = (
    <span className="flex items-center gap-2 text-sm">
      {e.title}
      {e.status !== "populated" ? (
        <span className="rounded-sm border border-border px-1 py-px text-[9px] font-bold uppercase tracking-widest text-muted-foreground">
          Soon
        </span>
      ) : null}
    </span>
  );
  if (!e.path) {
    return <span className="text-muted-foreground">{label}</span>;
  }
  return (
    <a
      href={e.path}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block rounded-md px-2 py-1 transition-colors",
        active
          ? "bg-[color:var(--gold)]/10 text-foreground"
          : "text-foreground/85 hover:bg-muted hover:text-foreground",
      )}
    >
      {label}
    </a>
  );
}

export function ClusterBreadcrumbs({
  cluster,
  className,
}: {
  cluster: TopicCluster;
  className?: string;
}) {
  const trail = clusterBreadcrumbs(cluster);
  return (
    <nav
      aria-label="Cluster breadcrumb"
      className={cn("text-xs text-muted-foreground", className)}
    >
      <ol className="flex flex-wrap items-center gap-1">
        {trail.map((crumb, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1">
              {crumb.href && !last ? (
                <a href={crumb.href} className="hover:text-foreground">
                  {crumb.label}
                </a>
              ) : (
                <span className={last ? "text-foreground" : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last ? <ChevronRight className="h-3 w-3" aria-hidden /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function ClusterNavigationPanel({ anchor, className }: ClusterNavigationProps) {
  const nav = clusterNavigationFor(anchor);
  if (!nav) return null;
  return <ClusterNavigationInner nav={nav} className={className} />;
}

function ClusterNavigationInner({
  nav,
  className,
}: {
  nav: ClusterNavigation;
  className?: string;
}) {
  const { cluster, currentEntity, siblingsInSlot, nextReading, relatedClusters } = nav;

  const supporting = cluster.slots
    .filter((s) => s.entities.length > 0 && s.slot.id !== "compound")
    .slice(0, 12);

  return (
    <section
      aria-label={`${cluster.title} cluster navigation`}
      className={cn("space-y-6", className)}
    >
      <ClusterBreadcrumbs cluster={cluster} />

      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[color:var(--gold)]">
          <Layers className="h-3.5 w-3.5" aria-hidden />
          {cluster.title} cluster
        </div>
        {cluster.path ? (
          <Link
            to={cluster.path}
            className="mt-2 inline-block font-display text-lg text-foreground hover:text-[color:var(--gold)]"
          >
            {cluster.title} overview →
          </Link>
        ) : null}
        {currentEntity ? (
          <p className="mt-1 text-xs text-muted-foreground">
            Currently reading: <span className="text-foreground">{currentEntity.title}</span>
          </p>
        ) : null}
      </div>

      {supporting.length ? (
        <div className="space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Supporting pages
          </h4>
          <ul className="space-y-3">
            {supporting.map((s) => (
              <li key={s.slot.id}>
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {s.slot.label}
                </div>
                <ul className="mt-1 space-y-0.5">
                  {s.entities.slice(0, 4).map((e) => (
                    <li key={`${e.type}::${e.slug}`}>
                      <EntityLink
                        e={e}
                        active={
                          !!currentEntity &&
                          e.type === currentEntity.type &&
                          e.slug === currentEntity.slug
                        }
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {siblingsInSlot.length ? (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            More in this section
          </h4>
          <ul className="space-y-0.5">
            {siblingsInSlot.slice(0, 6).map((e) => (
              <li key={`${e.type}::${e.slug}`}>
                <EntityLink e={e} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {nextReading ? (
        <a
          href={nextReading.path}
          className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-[color:var(--gold)]/60"
        >
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Suggested next
            </div>
            <div className="mt-0.5 font-display text-sm text-foreground group-hover:text-[color:var(--gold)]">
              {nextReading.title}
            </div>
          </div>
          <ArrowRight
            className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        </a>
      ) : null}

      {relatedClusters.length ? (
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Related clusters
          </h4>
          <ul className="space-y-0.5">
            {relatedClusters.slice(0, 6).map((c) => (
              <li key={c.id}>
                <a
                  href={c.path}
                  className="block rounded-md px-2 py-1 text-sm text-foreground/85 hover:bg-muted hover:text-foreground"
                >
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
