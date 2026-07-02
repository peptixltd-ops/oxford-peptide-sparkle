/**
 * Release 3.1 — Revision & publication history helpers.
 *
 * A page's revision history is a typed array. These helpers keep entries
 * consistently ordered and derive publication / last-updated / last-reviewed
 * dates from the history itself, so pages don't have to duplicate that
 * information in multiple fields.
 */

import type { RevisionEntry } from "@/components/publishing/types";
import { REVIEW_CADENCE_MONTHS, type PageKind } from "./policies";

export type RevisionKind =
  | "created"
  | "published"
  | "reviewed"
  | "revised"
  | "corrected"
  | "retired";

export interface EditorialRevision extends RevisionEntry {
  /** Machine-readable classification of what this revision represents. */
  kind: RevisionKind;
}

/**
 * Sort revisions newest-first.
 */
export function sortRevisionsDesc(entries: readonly EditorialRevision[]): EditorialRevision[] {
  return [...entries].sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Find the first entry (chronologically earliest) with `kind: "published"`.
 * Returns undefined if the page has never been published.
 */
export function getPublicationDate(entries: readonly EditorialRevision[]): string | undefined {
  const published = entries.filter((e) => e.kind === "published");
  if (!published.length) return undefined;
  return published.reduce((min, e) => (e.date < min.date ? e : min)).date;
}

/**
 * Latest date among all revisions — used as "Last updated".
 */
export function getLastUpdatedDate(entries: readonly EditorialRevision[]): string | undefined {
  if (!entries.length) return undefined;
  return entries.reduce((max, e) => (e.date > max.date ? e : max)).date;
}

/**
 * Latest `reviewed` (or `published`) entry — used as "Last reviewed".
 */
export function getLastReviewedDate(entries: readonly EditorialRevision[]): string | undefined {
  const reviews = entries.filter((e) => e.kind === "reviewed" || e.kind === "published");
  if (!reviews.length) return undefined;
  return reviews.reduce((max, e) => (e.date > max.date ? e : max)).date;
}

/**
 * Compute the next scheduled review date from the last review + page type cadence.
 * Returns an ISO date string (YYYY-MM-DD).
 */
export function getNextReviewDate(
  entries: readonly EditorialRevision[],
  pageKind: PageKind,
): string | undefined {
  const last = getLastReviewedDate(entries);
  if (!last) return undefined;
  const months = REVIEW_CADENCE_MONTHS[pageKind];
  const d = new Date(`${last}T00:00:00Z`);
  d.setUTCMonth(d.getUTCMonth() + months);
  return d.toISOString().slice(0, 10);
}

/**
 * Editorial metadata derived from a revision history — the single object
 * that page layouts consume.
 */
export interface DerivedEditorialDates {
  publishedOn?: string;
  updatedOn?: string;
  reviewedOn?: string;
  nextReviewOn?: string;
  version?: string;
  sortedEntries: EditorialRevision[];
}

export function deriveEditorialDates(
  entries: readonly EditorialRevision[],
  pageKind: PageKind,
): DerivedEditorialDates {
  const sorted = sortRevisionsDesc(entries);
  return {
    publishedOn: getPublicationDate(entries),
    updatedOn: getLastUpdatedDate(entries),
    reviewedOn: getLastReviewedDate(entries),
    nextReviewOn: getNextReviewDate(entries, pageKind),
    version: sorted[0]?.version,
    sortedEntries: sorted,
  };
}
