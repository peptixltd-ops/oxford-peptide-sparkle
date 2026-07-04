/**
 * ============================================================================
 *  Editorial Graph — Authority Sprint 4.0
 * ============================================================================
 *
 *  Author + reviewer entity lookups. Every published entity in the
 *  taxonomy records `author` and `reviewer` string ids; this module turns
 *  those ids into the collections that drive the author / reviewer
 *  profile pages.
 *
 *  Only real editorial data is used — no fabricated credentials.
 */

import {
  comparisons,
  guides,
  studies,
  type ComparisonEntry,
  type Guide,
  type StudyEntry,
} from "@/lib/taxonomy";
import {
  editorialAuthors,
  scientificReviewers,
  DEFAULT_AUTHOR_ID,
  DEFAULT_REVIEWER_ID,
  type EditorialAuthor,
  type ScientificReviewer,
} from "@/lib/editorial/authors";

// ---------------------------------------------------------------------------
//  Slug helpers
// ---------------------------------------------------------------------------

/** All ids that can be resolved as an author profile URL segment. */
export const authorProfileIds: readonly string[] = editorialAuthors.map((a) => a.id);
export const reviewerProfileIds: readonly string[] = scientificReviewers.map((r) => r.id);

export function authorPath(id: string): string {
  return `/editorial/authors/${id}`;
}
export function reviewerPath(id: string): string {
  return `/editorial/reviewers/${id}`;
}

// ---------------------------------------------------------------------------
//  Publication records
// ---------------------------------------------------------------------------

export interface PublishedWork {
  kind: "guide" | "study" | "comparison";
  slug: string;
  title: string;
  path: string;
  updated?: string;
  populated: boolean;
}

function pathForGuide(g: Guide): string {
  return `/research-hub/guides/${g.slug}`;
}
function pathForStudy(s: StudyEntry): string {
  return `/research-hub/literature/${s.slug}`;
}
function pathForComparison(c: ComparisonEntry): string {
  return `/research-hub/comparisons/${c.slug}`;
}

function guidesToWorks(items: readonly Guide[]): PublishedWork[] {
  return items.map((g) => ({
    kind: "guide",
    slug: g.slug,
    title: g.title,
    path: pathForGuide(g),
    updated: g.updated,
    populated: g.populated,
  }));
}
function studiesToWorks(items: readonly StudyEntry[]): PublishedWork[] {
  return items.map((s) => ({
    kind: "study",
    slug: s.slug,
    title: s.shortName ?? s.title,
    path: pathForStudy(s),
    updated: s.updated,
    populated: s.populated,
  }));
}
function comparisonsToWorks(items: readonly ComparisonEntry[]): PublishedWork[] {
  return items.map((c) => ({
    kind: "comparison",
    slug: c.slug,
    title: c.title,
    path: pathForComparison(c),
    updated: c.updated,
    populated: c.populated,
  }));
}

// ---------------------------------------------------------------------------
//  Author profile
// ---------------------------------------------------------------------------

export interface AuthorProfile {
  author: EditorialAuthor;
  path: string;
  publishedGuides: readonly PublishedWork[];
  publishedStudies: readonly PublishedWork[];
  publishedComparisons: readonly PublishedWork[];
  totalPublications: number;
  recentPublications: readonly PublishedWork[];
}

function sortByDateDesc(a: PublishedWork, b: PublishedWork): number {
  if (a.updated && b.updated) return a.updated < b.updated ? 1 : -1;
  if (a.updated) return -1;
  if (b.updated) return 1;
  return 0;
}

export function getAuthorProfile(id: string): AuthorProfile | undefined {
  const author = editorialAuthors.find((a) => a.id === id);
  if (!author) return undefined;

  const attributed = (fieldId?: string): boolean =>
    fieldId === author.id || (author.id === DEFAULT_AUTHOR_ID && !fieldId);

  const gs = guides.filter((g) => attributed(g.author));
  const ss = studies.filter((s) => attributed(s.author));
  const cs = comparisons.filter((c) => attributed(c.author));

  const publishedGuides = guidesToWorks(gs);
  const publishedStudies = studiesToWorks(ss);
  const publishedComparisons = comparisonsToWorks(cs);

  const all = [...publishedGuides, ...publishedStudies, ...publishedComparisons];
  const recent = [...all].sort(sortByDateDesc).slice(0, 8);

  return {
    author,
    path: authorPath(author.id),
    publishedGuides,
    publishedStudies,
    publishedComparisons,
    totalPublications: all.length,
    recentPublications: recent,
  };
}

// ---------------------------------------------------------------------------
//  Reviewer profile
// ---------------------------------------------------------------------------

export interface ReviewerProfile {
  reviewer: ScientificReviewer;
  path: string;
  reviewedGuides: readonly PublishedWork[];
  reviewedStudies: readonly PublishedWork[];
  reviewedComparisons: readonly PublishedWork[];
  totalReviews: number;
  recentReviews: readonly PublishedWork[];
}

export function getReviewerProfile(id: string): ReviewerProfile | undefined {
  const reviewer = scientificReviewers.find((r) => r.id === id);
  if (!reviewer) return undefined;

  const attributed = (fieldId?: string): boolean =>
    fieldId === reviewer.id || (reviewer.id === DEFAULT_REVIEWER_ID && !fieldId);

  const gs = guides.filter((g) => attributed(g.reviewer));
  const ss = studies.filter((s) => attributed(s.reviewer));
  const cs = comparisons.filter((c) => attributed(c.reviewer));

  const reviewedGuides = guidesToWorks(gs);
  const reviewedStudies = studiesToWorks(ss);
  const reviewedComparisons = comparisonsToWorks(cs);

  const all = [...reviewedGuides, ...reviewedStudies, ...reviewedComparisons];
  const recent = [...all].sort(sortByDateDesc).slice(0, 8);

  return {
    reviewer,
    path: reviewerPath(reviewer.id),
    reviewedGuides,
    reviewedStudies,
    reviewedComparisons,
    totalReviews: all.length,
    recentReviews: recent,
  };
}

// ---------------------------------------------------------------------------
//  Citation audit — checks every published record has consistent identifiers
// ---------------------------------------------------------------------------

export interface CitationAuditRow {
  scope: "study" | "guide" | "comparison";
  slug: string;
  title: string;
  hasDoi: boolean;
  hasPmid: boolean;
  hasJournal: boolean;
  hasYear: boolean;
  hasEvidenceTier: boolean;
  passes: boolean;
}

export function runCitationAudit(): CitationAuditRow[] {
  const rows: CitationAuditRow[] = [];
  for (const s of studies) {
    if (!s.populated) continue;
    const row: CitationAuditRow = {
      scope: "study",
      slug: s.slug,
      title: s.shortName ?? s.title,
      hasDoi: !!s.doi,
      hasPmid: !!s.pmid,
      hasJournal: !!s.journal,
      hasYear: !!s.year,
      hasEvidenceTier: !!s.evidenceTier,
      passes: false,
    };
    row.passes =
      row.hasDoi && row.hasJournal && row.hasYear && row.hasEvidenceTier;
    rows.push(row);
  }
  return rows;
}
