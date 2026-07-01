/**
 * Release 3.0 — Intelligent breadcrumb builder.
 *
 * Derives breadcrumb trails from the Knowledge Graph hierarchy rather than
 * from static route strings. Any page that renders an entity can call
 * `crumbsForEntity(ref)` to get a properly ordered trail — including all
 * ancestors — without knowing anything about routing conventions.
 *
 * The trail excludes the "Home" root (Breadcrumbs component prepends it).
 */
import { getAncestors, getEntity, type EntityRef } from "@/lib/knowledge-graph";
import type { Crumb } from "@/components/breadcrumbs";

/** Build a breadcrumb trail for an entity. Leaf label is the last crumb. */
export function crumbsForEntity(r: EntityRef, opts?: { leafLabel?: string }): Crumb[] {
  const entity = getEntity(r);
  if (!entity) return [];
  const ancestors = getAncestors(r);
  const trail: Crumb[] = ancestors.map((a) => ({
    label: a.title,
    to: a.path,
  }));
  trail.push({
    label: opts?.leafLabel ?? entity.title,
    to: entity.path,
  });
  return trail;
}

/**
 * Convenience: build a trail from an ordered list of refs, resolving each
 * from the graph. Missing entries are dropped silently.
 */
export function crumbsForRefs(refs: readonly EntityRef[]): Crumb[] {
  return refs
    .map((r) => getEntity(r))
    .filter((e): e is NonNullable<typeof e> => !!e)
    .map((e) => ({ label: e.title, to: e.path }));
}
