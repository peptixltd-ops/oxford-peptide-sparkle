/**
 * Release 3.1 — Shared citation registry.
 *
 * A single canonical library of structured `Reference` records. Pages cite
 * by ID (`citeIds: ["glp1-baggio-2007"]`); the editorial framework resolves
 * IDs to full Reference records at render time. This guarantees:
 *  - one canonical record per source across the site,
 *  - consistent citation formatting,
 *  - auditability (each citation is a data row, not free text),
 *  - straightforward migration to a database-backed store later.
 *
 * NO citations are seeded here — Release 3.1 ships the infrastructure only.
 * Real references are added starting in Release 4.0 alongside content.
 */

import type { Reference } from "@/components/publishing/types";

// ---------------------------------------------------------------------------
// Registry storage
// ---------------------------------------------------------------------------

const registry = new Map<string, Reference>();

/**
 * Register a Reference. Idempotent — re-registering the same ID overwrites,
 * which is desirable if the record is corrected.
 */
export function registerReference(ref: Reference): void {
  registry.set(ref.id, ref);
}

/** Register multiple references in one call. */
export function registerReferences(refs: readonly Reference[]): void {
  for (const r of refs) registry.set(r.id, r);
}

/** Get a single reference by ID, or undefined. */
export function getReference(id: string): Reference | undefined {
  return registry.get(id);
}

/**
 * Resolve a list of citation IDs to concrete Reference records. Unknown IDs
 * are skipped silently — the editorial workflow enforces validity at review
 * time, not at render time.
 */
export function resolveCitations(ids: readonly string[]): Reference[] {
  const out: Reference[] = [];
  for (const id of ids) {
    const r = registry.get(id);
    if (r) out.push(r);
  }
  return out;
}

/** All registered references. Useful for a future "all sources" page. */
export function allReferences(): Reference[] {
  return Array.from(registry.values());
}

/** Registry size — used by the editorial standards page for a live count. */
export function referenceCount(): number {
  return registry.size;
}
