import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ShieldCheck,
  GraduationCap,
  ClipboardCheck,
  FileClock,
  Scale,
  AlertOctagon,
  BookOpenCheck,
} from "lucide-react";
import { PubPanel, PubHeading, PubMeta } from "./primitives";
import type { Author, RevisionEntry } from "./types";

/**
 * Editorial components — authors, reviewers, revision history and standard
 * notices that appear across every educational page.
 */

export interface AuthorCardProps {
  author: Author;
  role?: string; // override role for context (Written by, Reviewed by...)
  className?: string;
}

export function AuthorCard({ author, role, className }: AuthorCardProps) {
  return (
    <article
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-card p-3",
        className,
      )}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-muted text-xs font-semibold uppercase text-muted-foreground">
        {author.avatarUrl ? (
          <img src={author.avatarUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden>{author.name.slice(0, 2)}</span>
        )}
      </div>
      <div className="min-w-0">
        {role || author.role ? (
          <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {role ?? author.role}
          </div>
        ) : null}
        {author.profileUrl ? (
          <a
            href={author.profileUrl}
            className="font-display text-sm text-foreground hover:text-[color:var(--gold)]"
          >
            {author.name}
          </a>
        ) : (
          <div className="font-display text-sm text-foreground">{author.name}</div>
        )}
        {author.credentials ? (
          <div className="text-xs text-muted-foreground">{author.credentials}</div>
        ) : null}
        {author.affiliation ? (
          <div className="text-xs text-muted-foreground">{author.affiliation}</div>
        ) : null}
      </div>
    </article>
  );
}

export function ScientificReviewerCard(props: AuthorCardProps) {
  return <AuthorCard {...props} role={props.role ?? "Scientifically reviewed by"} />;
}

export interface EditorialReviewPanelProps {
  authors?: Author[];
  reviewers?: Author[];
  reviewedOn?: string;
  standardsUrl?: string;
  className?: string;
}

export function EditorialReviewPanel({
  authors = [],
  reviewers = [],
  reviewedOn,
  standardsUrl,
  className,
}: EditorialReviewPanelProps) {
  return (
    <PubPanel tone="neutral" className={className} aria-label="Editorial review">
      <PubHeading level={3} icon={<ClipboardCheck className="h-4 w-4" />} eyebrow="Editorial">
        Editorial review
      </PubHeading>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {authors.map((a) => (
          <AuthorCard key={a.id ?? a.name} author={a} role="Written by" />
        ))}
        {reviewers.map((a) => (
          <ScientificReviewerCard key={a.id ?? a.name} author={a} />
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        {reviewedOn ? <span>Reviewed on {reviewedOn}</span> : null}
        {standardsUrl ? (
          <a
            href={standardsUrl}
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <BookOpenCheck className="h-3 w-3" aria-hidden /> Editorial standards
          </a>
        ) : null}
      </div>
    </PubPanel>
  );
}

export interface PublicationInformationProps {
  publishedOn?: string;
  updatedOn?: string;
  reviewedOn?: string;
  version?: string;
  doi?: string;
  className?: string;
}

export function PublicationInformation({
  publishedOn,
  updatedOn,
  reviewedOn,
  version,
  doi,
  className,
}: PublicationInformationProps) {
  const items = [
    publishedOn && { label: "Published", value: publishedOn },
    updatedOn && { label: "Updated", value: updatedOn },
    reviewedOn && { label: "Reviewed", value: reviewedOn },
    version && { label: "Version", value: version },
    doi && { label: "DOI", value: doi },
  ].filter(Boolean) as Array<{ label: string; value: React.ReactNode }>;
  if (!items.length) return null;
  return (
    <PubPanel tone="neutral" className={className} aria-label="Publication information">
      <PubHeading level={4} icon={<FileClock className="h-4 w-4" />}>
        Publication information
      </PubHeading>
      <div className="mt-3">
        <PubMeta items={items} />
      </div>
    </PubPanel>
  );
}

export function RevisionHistory({
  entries,
  title = "Revision history",
  className,
}: {
  entries: RevisionEntry[];
  title?: string;
  className?: string;
}) {
  if (!entries.length) return null;
  return (
    <PubPanel tone="neutral" className={className} aria-label={title}>
      <PubHeading level={4} icon={<FileClock className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ol className="mt-3 space-y-3 text-sm">
        {entries.map((e) => (
          <li key={e.version} className="border-l-2 border-[color:var(--gold)]/60 pl-3">
            <div className="flex flex-wrap items-baseline gap-x-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">v{e.version}</span>
              <span>{e.date}</span>
              {e.author ? <span>· {e.author}</span> : null}
            </div>
            <p className="mt-0.5">{e.summary}</p>
          </li>
        ))}
      </ol>
    </PubPanel>
  );
}

export const VersionHistory = RevisionHistory;

export function EditorialStandardsNotice({
  href = "/editorial-standards",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="info" className={className} aria-label="Editorial standards">
      <PubHeading level={4} icon={<ShieldCheck className="h-4 w-4" />}>
        Editorial standards
      </PubHeading>
      <p className="mt-2 text-sm">
        Content is reviewed against our editorial process for scientific
        accuracy, sourcing, and clarity.{" "}
        <a href={href} className="font-medium text-foreground underline underline-offset-2">
          Read our editorial standards
        </a>
        .
      </p>
    </PubPanel>
  );
}

export function ConflictOfInterestNotice({
  statement,
  className,
}: {
  statement?: React.ReactNode;
  className?: string;
}) {
  return (
    <PubPanel tone="neutral" className={className} aria-label="Conflict of interest">
      <PubHeading level={4} icon={<Scale className="h-4 w-4" />}>
        Conflict of interest
      </PubHeading>
      <div className="mt-2 text-sm">
        {statement ?? "No conflicts of interest have been declared for this article."}
      </div>
    </PubPanel>
  );
}

export function ScientificDisclaimer({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <PubPanel tone="warning" className={className} aria-label="Scientific disclaimer">
      <PubHeading level={4} icon={<AlertOctagon className="h-4 w-4" />}>
        Research use only
      </PubHeading>
      <div className="mt-2 text-sm">
        {children ??
          "All materials referenced are supplied strictly for in-vitro laboratory research. Not for human or animal consumption, diagnosis, or therapeutic use."}
      </div>
    </PubPanel>
  );
}

export function CredentialBadge({
  icon,
  children,
  className,
}: {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      {icon ?? <GraduationCap className="h-3 w-3" aria-hidden />}
      {children}
    </span>
  );
}
