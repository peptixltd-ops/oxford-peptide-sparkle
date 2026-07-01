import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Clock,
  GraduationCap,
  HelpCircle,
  ListChecks,
  Target,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Printer,
  Share2,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { PubPanel, PubHeading } from "./primitives";
import type { DifficultyLevel } from "./types";

/**
 * Article-level utilities — meta blocks, learning aids and reader actions.
 */

export function ReadingTime({
  minutes,
  className,
}: {
  minutes: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-muted-foreground",
        className,
      )}
      aria-label={`Estimated reading time: ${minutes} minutes`}
    >
      <Clock className="h-3.5 w-3.5" aria-hidden />
      {minutes} min read
    </span>
  );
}

const difficultyLabel: Record<DifficultyLevel, string> = {
  introductory: "Introductory",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function DifficultyBadge({
  level,
  className,
}: {
  level: DifficultyLevel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      <GraduationCap className="h-3 w-3" aria-hidden />
      {difficultyLabel[level]}
    </span>
  );
}

export function QuickAnswer({
  children,
  title = "Quick answer",
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="accent" className={className} aria-label={title}>
      <PubHeading level={3} icon={<HelpCircle className="h-4 w-4" />} eyebrow="TL;DR">
        {title}
      </PubHeading>
      <div className="mt-2 text-sm leading-relaxed">{children}</div>
    </PubPanel>
  );
}

export function KeyFacts({
  items,
  title = "Key facts",
  className,
}: {
  items: Array<{ label: React.ReactNode; value: React.ReactNode }>;
  title?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="neutral" className={className} aria-label={title}>
      <PubHeading level={4} icon={<ListChecks className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <dl className="mt-3 grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6">
        {items.map((it, i) => (
          <div key={i} className="flex items-baseline gap-2 border-b border-border/60 py-1.5">
            <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {it.label}
            </dt>
            <dd className="ml-auto text-right text-sm text-foreground">{it.value}</dd>
          </div>
        ))}
      </dl>
    </PubPanel>
  );
}

export function LearningObjectives({
  items,
  title = "Learning objectives",
  className,
}: {
  items: React.ReactNode[];
  title?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="info" className={className} aria-label={title}>
      <PubHeading level={4} icon={<Target className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
        {items.map((it, i) => (
          <li key={i}>{it}</li>
        ))}
      </ul>
    </PubPanel>
  );
}

export function Takeaways({
  items,
  title = "Key takeaways",
  className,
}: {
  items: React.ReactNode[];
  title?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="accent" className={className} aria-label={title}>
      <PubHeading level={4} icon={<CheckCircle2 className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ul className="mt-2 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--gold)]" aria-hidden />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </PubPanel>
  );
}

export interface RelatedDefinitionItem {
  term: string;
  href?: string;
  short?: React.ReactNode;
}

export function RelatedDefinitions({
  items,
  title = "Related definitions",
  className,
}: {
  items: RelatedDefinitionItem[];
  title?: string;
  className?: string;
}) {
  return (
    <PubPanel tone="neutral" className={className} aria-label={title}>
      <PubHeading level={4} icon={<BookOpen className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <dl className="mt-2 space-y-2 text-sm">
        {items.map((it) => (
          <div key={it.term}>
            <dt className="font-semibold text-foreground">
              {it.href ? (
                <a href={it.href} className="hover:text-[color:var(--gold)]">
                  {it.term}
                </a>
              ) : (
                it.term
              )}
            </dt>
            {it.short ? <dd className="text-muted-foreground">{it.short}</dd> : null}
          </div>
        ))}
      </dl>
    </PubPanel>
  );
}

export interface ContinueReadingItem {
  title: React.ReactNode;
  href: string;
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
}

export function ContinueReading({
  items,
  title = "Continue reading",
  className,
}: {
  items: ContinueReadingItem[];
  title?: string;
  className?: string;
}) {
  return (
    <section aria-label={title} className={cn("space-y-3", className)}>
      <PubHeading level={3} icon={<ArrowRight className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((it, i) => (
          <li key={i}>
            <a
              href={it.href}
              className="group block rounded-lg border border-border bg-card p-4 transition-colors hover:border-[color:var(--gold)]/60"
            >
              {it.eyebrow ? (
                <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {it.eyebrow}
                </div>
              ) : null}
              <div className="mt-1 flex items-start justify-between gap-3">
                <div className="font-display text-base text-foreground group-hover:text-[color:var(--gold)]">
                  {it.title}
                </div>
                <ArrowRight
                  className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </div>
              {it.description ? (
                <p className="mt-1 text-sm text-muted-foreground">{it.description}</p>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ActionButton({
  onClick,
  children,
  label,
  pressed,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  label: string;
  pressed?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={pressed}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {children}
    </button>
  );
}

export function PrintableArticle({ label = "Print" }: { label?: string }) {
  return (
    <ActionButton onClick={() => window.print()} label="Print this article">
      <Printer className="h-3.5 w-3.5" aria-hidden />
      {label}
    </ActionButton>
  );
}

export function ShareArticle({
  title,
  url,
  label = "Share",
}: {
  title?: string;
  url?: string;
  label?: string;
}) {
  const onShare = React.useCallback(async () => {
    const shareUrl = url ?? (typeof window !== "undefined" ? window.location.href : "");
    const shareTitle = title ?? (typeof document !== "undefined" ? document.title : "");
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await (navigator as Navigator & { share: (d: ShareData) => Promise<void> }).share({
          title: shareTitle,
          url: shareUrl,
        });
        return;
      } catch {
        /* fall through */
      }
    }
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(shareUrl);
    }
  }, [title, url]);
  return (
    <ActionButton onClick={onShare} label="Share this article">
      <Share2 className="h-3.5 w-3.5" aria-hidden />
      {label}
    </ActionButton>
  );
}

export function BookmarkArticle({
  id,
  label = "Bookmark",
}: {
  id: string;
  label?: string;
}) {
  const storageKey = "orp:bookmarks";
  const [marked, setMarked] = React.useState(false);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      const list: string[] = raw ? JSON.parse(raw) : [];
      setMarked(list.includes(id));
    } catch {
      /* ignore */
    }
  }, [id]);

  const toggle = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      const list: string[] = raw ? JSON.parse(raw) : [];
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      localStorage.setItem(storageKey, JSON.stringify(next));
      setMarked(next.includes(id));
    } catch {
      /* ignore */
    }
  };

  return (
    <ActionButton onClick={toggle} label={marked ? "Remove bookmark" : "Bookmark this article"} pressed={marked}>
      {marked ? (
        <BookmarkCheck className="h-3.5 w-3.5 text-[color:var(--gold)]" aria-hidden />
      ) : (
        <Bookmark className="h-3.5 w-3.5" aria-hidden />
      )}
      {marked ? "Bookmarked" : label}
    </ActionButton>
  );
}

export function ArticleActions({
  id,
  title,
  url,
  className,
}: {
  id?: string;
  title?: string;
  url?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <PrintableArticle />
      <ShareArticle title={title} url={url} />
      {id ? <BookmarkArticle id={id} /> : null}
    </div>
  );
}
