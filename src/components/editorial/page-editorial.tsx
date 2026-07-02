/**
 * Release 3.1 — PageEditorial
 *
 * Single component that every future educational page (guide, compound,
 * mechanism, methodology, comparison, literature) drops into its editorial
 * slot. It composes the Release 2.0 publishing primitives with the
 * Release 3.1 editorial registries so that authors, reviewers, publication
 * history, review cadence, disclaimers and standards notices are inherited
 * automatically instead of duplicated per page.
 */

import { Link } from "@tanstack/react-router";
import {
  AuthorCard,
  ScientificReviewerCard,
  PublicationInformation,
  RevisionHistory,
  EditorialStandardsNotice,
  ConflictOfInterestNotice,
  ScientificDisclaimer,
} from "@/components/publishing";
import type { RevisionEntry } from "@/components/publishing/types";
import {
  DEFAULT_AUTHOR_ID,
  DEFAULT_REVIEWER_ID,
  getAuthor,
  getReviewer,
  deriveEditorialDates,
  CONFLICT_OF_INTEREST_STATEMENT,
  type EditorialRevision,
  type PageKind,
} from "@/lib/editorial";

export interface PageEditorialProps {
  /** Kind of page — drives review cadence. */
  pageKind: PageKind;
  /** IDs from the author registry. Defaults to the editorial team. */
  authorIds?: readonly string[];
  /** IDs from the scientific reviewer registry. Defaults to the review panel. */
  reviewerIds?: readonly string[];
  /** Structured revision history. */
  revisions: readonly EditorialRevision[];
  /** Optional DOI or persistent identifier. */
  doi?: string;
  /** Show COI notice. Defaults to true — every editorial page carries this. */
  showConflictOfInterest?: boolean;
  /** Show research-use-only disclaimer. Defaults to true. */
  showResearchDisclaimer?: boolean;
  className?: string;
}

/**
 * Renders the full editorial footer block: authors, reviewers, publication
 * information, revision history, editorial standards link, COI notice and
 * research-use-only disclaimer. Order is fixed for consistency across pages.
 */
export function PageEditorial({
  pageKind,
  authorIds = [DEFAULT_AUTHOR_ID],
  reviewerIds = [DEFAULT_REVIEWER_ID],
  revisions,
  doi,
  showConflictOfInterest = true,
  showResearchDisclaimer = true,
  className,
}: PageEditorialProps) {
  const authors = authorIds.map((id) => getAuthor(id)).filter(Boolean);
  const reviewers = reviewerIds.map((id) => getReviewer(id)).filter(Boolean);
  const dates = deriveEditorialDates(revisions, pageKind);

  const revisionEntries: RevisionEntry[] = dates.sortedEntries.map((r) => ({
    version: r.version,
    date: r.date,
    summary: r.summary,
    author: r.author,
  }));

  return (
    <div className={className}>
      <div className="grid gap-4 md:grid-cols-2">
        {authors.map(
          (a) =>
            a && (
              <AuthorCard
                key={`author-${a.id}`}
                author={a}
                role={a.role ?? "Written by"}
              />
            ),
        )}
        {reviewers.map(
          (r) =>
            r && (
              <ScientificReviewerCard
                key={`reviewer-${r.id}`}
                author={r}
                role={r.role ?? "Scientifically reviewed by"}
              />
            ),
        )}
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <PublicationInformation
          publishedOn={dates.publishedOn}
          updatedOn={dates.updatedOn}
          reviewedOn={dates.reviewedOn}
          version={dates.version}
          doi={doi}
        />
        <RevisionHistory entries={revisionEntries} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <EditorialStandardsNotice href="/editorial-standards" />
        {showConflictOfInterest ? (
          <ConflictOfInterestNotice statement={CONFLICT_OF_INTEREST_STATEMENT} />
        ) : null}
      </div>

      {dates.nextReviewOn ? (
        <p className="mt-4 text-xs text-muted-foreground">
          Next scheduled review: <span className="font-medium">{dates.nextReviewOn}</span>. Our{" "}
          <Link to="/research-methodology" className="underline underline-offset-2">
            research methodology
          </Link>{" "}
          describes how the review is conducted.
        </p>
      ) : null}

      {showResearchDisclaimer ? (
        <div className="mt-4">
          <ScientificDisclaimer />
        </div>
      ) : null}
    </div>
  );
}
