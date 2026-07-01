import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Shared low-level primitives for publishing components.
 * Keeps styling consistent and avoids duplication across evidence,
 * callouts, figures and editorial modules.
 */

export type PubTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "accent";

export const toneClasses: Record<PubTone, { border: string; bg: string; icon: string; text: string }> = {
  neutral: {
    border: "border-border",
    bg: "bg-muted/40",
    icon: "text-muted-foreground",
    text: "text-foreground",
  },
  info: {
    border: "border-sky-500/30 dark:border-sky-400/30",
    bg: "bg-sky-50/70 dark:bg-sky-950/30",
    icon: "text-sky-700 dark:text-sky-300",
    text: "text-foreground",
  },
  success: {
    border: "border-emerald-500/30 dark:border-emerald-400/30",
    bg: "bg-emerald-50/70 dark:bg-emerald-950/30",
    icon: "text-emerald-700 dark:text-emerald-300",
    text: "text-foreground",
  },
  warning: {
    border: "border-amber-500/40 dark:border-amber-400/40",
    bg: "bg-amber-50/70 dark:bg-amber-950/30",
    icon: "text-amber-700 dark:text-amber-300",
    text: "text-foreground",
  },
  danger: {
    border: "border-destructive/40",
    bg: "bg-destructive/5",
    icon: "text-destructive",
    text: "text-foreground",
  },
  accent: {
    border: "border-[color:var(--gold)]/40",
    bg: "bg-[color:var(--gold-soft)]/10",
    icon: "text-[color:var(--gold)]",
    text: "text-foreground",
  },
};

export interface PubPanelProps extends React.HTMLAttributes<HTMLElement> {
  tone?: PubTone;
  as?: keyof React.JSX.IntrinsicElements;
}

export const PubPanel = React.forwardRef<HTMLElement, PubPanelProps>(
  ({ tone = "neutral", as = "section", className, children, ...rest }, ref) => {
    const t = toneClasses[tone];
    const Comp = as as React.ElementType;
    return (
      <Comp
        ref={ref as React.Ref<HTMLElement>}
        className={cn(
          "rounded-lg border p-4 md:p-5",
          t.border,
          t.bg,
          t.text,
          className,
        )}
        {...rest}
      >
        {children}
      </Comp>
    );
  },
);
PubPanel.displayName = "PubPanel";

export interface PubHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 2 | 3 | 4 | 5 | 6;
  eyebrow?: React.ReactNode;
  icon?: React.ReactNode;
}

export function PubHeading({
  level = 3,
  eyebrow,
  icon,
  children,
  className,
  ...rest
}: PubHeadingProps) {
  const Tag = `h${level}` as React.ElementType;
  return (
    <div className="flex items-start gap-3">
      {icon ? <span aria-hidden className="mt-0.5 shrink-0">{icon}</span> : null}
      <div className="min-w-0">
        {eyebrow ? (
          <div className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {eyebrow}
          </div>
        ) : null}
        <Tag
          className={cn(
            "font-display text-lg md:text-xl leading-tight text-foreground",
            className,
          )}
          {...rest}
        >
          {children}
        </Tag>
      </div>
    </div>
  );
}

export function PubMeta({
  items,
  className,
}: {
  items: Array<{ label: string; value: React.ReactNode }>;
  className?: string;
}) {
  return (
    <dl className={cn("grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-6", className)}>
      {items.map((it) => (
        <div key={it.label} className="flex items-baseline gap-2 border-b border-border/60 py-1.5">
          <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {it.label}
          </dt>
          <dd className="ml-auto text-sm text-foreground">{it.value}</dd>
        </div>
      ))}
    </dl>
  );
}
