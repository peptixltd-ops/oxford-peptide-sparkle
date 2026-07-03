import * as React from "react";
import { cn } from "@/lib/utils";
import { CalendarCheck2, ClipboardList } from "lucide-react";
import { PubPanel, PubHeading } from "./primitives";

/**
 * Additional article utilities layered on top of ./article.tsx.
 *
 * - `computeReadingTime` — derives minutes from raw text length.
 * - `LastEvidenceReview` — badge showing the last scientific review date.
 * - `ArticleMetaBar` — condensed meta strip (reading time + difficulty +
 *    last-reviewed + optional actions).
 */

/** Roughly 220 words per minute for scientific reading. Clamped to >= 1 min. */
export function computeReadingTime(text: string, wpm = 220): number {
  if (!text) return 1;
  const words = text
    .trim()
    .split(/\s+/g)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / wpm));
}

export function formatReviewDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export interface LastEvidenceReviewProps {
  /** ISO date of the last scientific / evidence review. */
  date: string;
  /** Optional reviewer name/attribution. */
  reviewer?: string;
  className?: string;
}

export function LastEvidenceReview({
  date,
  reviewer,
  className,
}: LastEvidenceReviewProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
      aria-label={`Last evidence review ${formatReviewDate(date)}${
        reviewer ? ` by ${reviewer}` : ""
      }`}
    >
      <CalendarCheck2 className="h-3 w-3" aria-hidden />
      Evidence reviewed {formatReviewDate(date)}
      {reviewer ? <span className="ml-1 italic">· {reviewer}</span> : null}
    </span>
  );
}

export interface ArticleMetaBarProps {
  /** Optional pre-rendered chips (ReadingTime, DifficultyBadge, etc.). */
  children?: React.ReactNode;
  /** Optional right-aligned actions (ArticleActions). */
  actions?: React.ReactNode;
  className?: string;
}

export function ArticleMetaBar({
  children,
  actions,
  className,
}: ArticleMetaBarProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-3 border-y border-border py-2",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">{children}</div>
      {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/**
 * Structured evidence review log — chronological list of when the article's
 * evidence base was last audited. Complements the editorial revision log.
 */
export interface EvidenceReviewEntry {
  date: string;
  reviewer?: string;
  summary: React.ReactNode;
}

export function EvidenceReviewLog({
  entries,
  title = "Evidence review log",
  className,
}: {
  entries: EvidenceReviewEntry[];
  title?: string;
  className?: string;
}) {
  if (!entries.length) return null;
  return (
    <PubPanel tone="neutral" className={className} aria-label={title}>
      <PubHeading level={4} icon={<ClipboardList className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ol className="mt-3 space-y-2 text-sm">
        {entries.map((e, i) => (
          <li
            key={i}
            className="grid grid-cols-[auto_1fr] gap-x-3 border-b border-border/60 pb-2 last:border-b-0"
          >
            <span className="text-xs font-semibold text-muted-foreground">
              {formatReviewDate(e.date)}
            </span>
            <div>
              <div className="text-foreground">{e.summary}</div>
              {e.reviewer ? (
                <div className="text-xs italic text-muted-foreground">
                  Reviewed by {e.reviewer}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </PubPanel>
  );
}
