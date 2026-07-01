import * as React from "react";
import { cn } from "@/lib/utils";
import { PubHeading } from "./primitives";
import { Quote, FlaskConical, ClipboardList, LineChart } from "lucide-react";

/**
 * Scientific styling primitives — reusable "boxed" content blocks that
 * inherit brand tokens (navy, gold, bone) and support dark mode.
 */

export function DataPanel({
  title,
  children,
  className,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-lg border border-border bg-card shadow-sm",
        className,
      )}
      aria-label={typeof title === "string" ? title : undefined}
    >
      {title ? (
        <header className="border-b border-border px-4 py-2.5">
          <h3 className="font-display text-sm uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
        </header>
      ) : null}
      <div className="p-4">{children}</div>
    </section>
  );
}

export function DefinitionBox({
  term,
  children,
  className,
}: {
  term: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "rounded-lg border-l-4 border-[color:var(--gold)] bg-muted/40 p-4",
        className,
      )}
    >
      <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        Definition
      </div>
      <div className="mt-0.5 font-display text-base text-foreground">{term}</div>
      <div className="mt-1 text-sm text-foreground/90">{children}</div>
    </aside>
  );
}

export function QuoteBlock({
  children,
  cite,
  className,
}: {
  children: React.ReactNode;
  cite?: React.ReactNode;
  className?: string;
}) {
  return (
    <figure className={cn("my-4", className)}>
      <blockquote className="relative rounded-lg border-l-4 border-[color:var(--gold)] bg-muted/30 py-3 pl-10 pr-4 italic text-foreground">
        <Quote className="absolute left-3 top-3 h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        {children}
      </blockquote>
      {cite ? (
        <figcaption className="mt-1 pl-10 text-xs text-muted-foreground">— {cite}</figcaption>
      ) : null}
    </figure>
  );
}

export function ResearchNote({
  children,
  title = "Research note",
  className,
}: {
  children: React.ReactNode;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-dashed border-border bg-background p-3 text-sm text-muted-foreground",
        className,
      )}
    >
      <span className="mr-2 font-semibold uppercase tracking-wider text-foreground">{title}:</span>
      {children}
    </div>
  );
}

export function LaboratoryProcedure({
  title = "Laboratory procedure",
  steps,
  className,
}: {
  title?: string;
  steps: React.ReactNode[];
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-lg border border-border bg-card", className)}
      aria-label={title}
    >
      <header className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <FlaskConical className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        <PubHeading level={4}>{title}</PubHeading>
      </header>
      <ol className="divide-y divide-border">
        {steps.map((s, i) => (
          <li key={i} className="flex gap-3 px-4 py-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--gold)]/15 text-xs font-semibold text-[color:var(--gold)]">
              {i + 1}
            </span>
            <div className="min-w-0">{s}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function ExperimentalResults({
  title = "Experimental results",
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-lg border border-border bg-card", className)}
      aria-label={title}
    >
      <header className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <LineChart className="h-4 w-4 text-[color:var(--gold)]" aria-hidden />
        <PubHeading level={4}>{title}</PubHeading>
      </header>
      <div className="p-4 text-sm leading-relaxed">{children}</div>
    </section>
  );
}

export function ProcedureChecklist({
  items,
  title = "Checklist",
  className,
}: {
  items: React.ReactNode[];
  title?: string;
  className?: string;
}) {
  return (
    <section
      className={cn("rounded-lg border border-border bg-card p-4", className)}
      aria-label={title}
    >
      <PubHeading level={4} icon={<ClipboardList className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <ul className="mt-2 space-y-1.5 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2">
            <input
              type="checkbox"
              className="mt-1 h-3.5 w-3.5 rounded border-border accent-[color:var(--gold)]"
              aria-label={`Checklist item ${i + 1}`}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
