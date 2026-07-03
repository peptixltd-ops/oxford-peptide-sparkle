import * as React from "react";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Sparkles,
  ListTree,
  HelpCircle,
} from "lucide-react";
import { PubPanel, PubHeading } from "./primitives";
import { EvidenceLevelBadge } from "./evidence";
import type { EvidenceLevel } from "./types";

/**
 * AI-readability blocks.
 *
 * These components produce dense, semantically-labeled answer blocks that
 * are easy for LLM crawlers and generative-search engines to extract.
 *
 * All content is prop-driven — this file NEVER emits its own copy.
 * Length limits (50 / 150 words) are advisory: the components warn in dev
 * if they are exceeded so authors can trim.
 */

function wordCount(node: React.ReactNode): number {
  if (typeof node === "string") return node.trim().split(/\s+/).filter(Boolean).length;
  if (typeof node === "number") return 1;
  if (Array.isArray(node)) return node.reduce<number>((a, b) => a + wordCount(b), 0);
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return wordCount(node.props.children);
  }
  return 0;
}

function useSoftLimit(children: React.ReactNode, limit: number, label: string) {
  React.useEffect(() => {
    if (import.meta.env?.DEV) {
      const wc = wordCount(children);
      if (wc > limit) {
        console.warn(
          `[ai-readability] ${label} is ${wc} words (soft limit ${limit}).`,
        );
      }
    }
  }, [children, limit, label]);
}

export interface AnswerBlockProps {
  children: React.ReactNode;
  title?: string;
  question?: React.ReactNode;
  className?: string;
}

/** 50-word answer — for direct-answer / featured-snippet extraction. */
export function FiftyWordAnswer({
  children,
  title = "50-word answer",
  question,
  className,
}: AnswerBlockProps) {
  useSoftLimit(children, 50, title);
  return (
    <PubPanel tone="accent" className={className} aria-label={title}>
      <PubHeading level={3} icon={<Sparkles className="h-4 w-4" />} eyebrow="AI-ready">
        {title}
      </PubHeading>
      {question ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {question}
        </p>
      ) : null}
      <div
        className="mt-1 text-sm leading-relaxed"
        data-ai-block="answer-50"
        data-ai-question={typeof question === "string" ? question : undefined}
      >
        {children}
      </div>
    </PubPanel>
  );
}

/** 150-word answer — longer contextual response for generative search. */
export function HundredFiftyWordAnswer({
  children,
  title = "150-word answer",
  question,
  className,
}: AnswerBlockProps) {
  useSoftLimit(children, 150, title);
  return (
    <PubPanel tone="info" className={className} aria-label={title}>
      <PubHeading level={3} icon={<MessageSquare className="h-4 w-4" />} eyebrow="AI-ready">
        {title}
      </PubHeading>
      {question ? (
        <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {question}
        </p>
      ) : null}
      <div
        className="mt-1 text-sm leading-relaxed"
        data-ai-block="answer-150"
        data-ai-question={typeof question === "string" ? question : undefined}
      >
        {children}
      </div>
    </PubPanel>
  );
}

export interface EvidenceSnapshotProps {
  level: EvidenceLevel;
  studyCount?: number;
  domains?: React.ReactNode[];
  bottomLine: React.ReactNode;
  className?: string;
}

/** Machine-parseable at-a-glance evidence card. */
export function EvidenceSnapshot({
  level,
  studyCount,
  domains,
  bottomLine,
  className,
}: EvidenceSnapshotProps) {
  return (
    <PubPanel tone="neutral" className={className} aria-label="Evidence snapshot">
      <PubHeading level={4} icon={<ListTree className="h-4 w-4" />} eyebrow="Snapshot">
        Evidence snapshot
      </PubHeading>
      <div
        className="mt-3 flex flex-wrap items-center gap-2"
        data-ai-block="evidence-snapshot"
        data-ai-level={level}
        data-ai-studies={studyCount}
      >
        <EvidenceLevelBadge level={level} />
        {typeof studyCount === "number" ? (
          <span className="text-xs text-muted-foreground">
            {studyCount} referenced {studyCount === 1 ? "study" : "studies"}
          </span>
        ) : null}
        {domains?.map((d, i) => (
          <span
            key={i}
            className="rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground"
          >
            {d}
          </span>
        ))}
      </div>
      <p
        className="mt-3 text-sm leading-relaxed text-foreground"
        data-ai-field="bottom-line"
      >
        {bottomLine}
      </p>
    </PubPanel>
  );
}

export interface CommonQuestion {
  question: string;
  answer: React.ReactNode;
}

/**
 * Common-questions shell — structural FAQ block. Consumers pass a fully
 * authored `items` array. Emits FAQPage-friendly JSON-LD when `emitJsonLd`
 * is true.
 */
export function CommonQuestionsShell({
  items,
  title = "Common questions",
  emitJsonLd = false,
  className,
}: {
  items: CommonQuestion[];
  title?: string;
  emitJsonLd?: boolean;
  className?: string;
}) {
  if (!items.length) return null;
  const jsonLd = emitJsonLd
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: typeof q.answer === "string" ? q.answer : q.question,
          },
        })),
      }
    : null;

  return (
    <section aria-label={title} className={cn("space-y-3", className)}>
      <PubHeading level={3} icon={<HelpCircle className="h-4 w-4" />} eyebrow="FAQ">
        {title}
      </PubHeading>
      <ul className="space-y-2" data-ai-block="common-questions">
        {items.map((q, i) => (
          <li
            key={i}
            className="rounded-lg border border-border bg-card p-4"
            data-ai-question={q.question}
          >
            <details className="group">
              <summary className="cursor-pointer list-none font-display text-base text-foreground marker:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                {q.question}
              </summary>
              <div
                className="mt-2 text-sm leading-relaxed text-muted-foreground"
                data-ai-field="answer"
              >
                {q.answer}
              </div>
            </details>
          </li>
        ))}
      </ul>
      {jsonLd ? (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
    </section>
  );
}
