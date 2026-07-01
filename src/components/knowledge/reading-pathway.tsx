import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { PathwayStep } from "@/lib/taxonomy";
import { defaultReadingPathway } from "@/lib/taxonomy";
import { ChevronRight } from "lucide-react";

/**
 * Content-agnostic reading pathway.
 *
 * Renders a horizontal (desktop) / vertical (mobile) sequence of steps.
 * The default pathway lives in the taxonomy; any consumer can override with
 * its own ordered array of PathwayStep objects.
 */
export function ReadingPathway({
  steps = defaultReadingPathway,
  activeKind,
  title = "How to read the Research Hub",
  className = "",
}: {
  steps?: readonly PathwayStep[];
  activeKind?: PathwayStep["kind"];
  title?: string;
  className?: string;
}) {
  return (
    <section
      aria-label="Reading pathway"
      className={`bg-white border border-navy-deep/10 p-6 md:p-8 ${className}`}
    >
      <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">READING PATHWAY</div>
      <h2 className="font-display text-2xl font-medium text-navy-deep mb-6">{title}</h2>
      <ol className="grid gap-3 md:grid-cols-6 md:gap-2">
        {steps.map((step, i) => {
          const active = activeKind === step.kind;
          const inner: ReactNode = (
            <div
              className={`h-full p-4 border transition-colors ${
                active
                  ? "border-gold bg-gold/10 text-navy-deep"
                  : "border-navy-deep/15 bg-bone/60 hover:border-navy-deep/40"
              }`}
            >
              <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-1">
                STEP {i + 1}
              </div>
              <div className="font-display text-base font-semibold text-navy-deep leading-tight">
                {step.label}
              </div>
              {step.hint && (
                <div className="text-xs text-muted-foreground mt-1.5 leading-snug">{step.hint}</div>
              )}
            </div>
          );
          return (
            <li key={`${step.kind}-${i}`} className="relative">
              {step.to ? (
                <Link
                  to={step.to}
                  className="block h-full focus-visible:outline-2 focus-visible:outline-gold"
                >
                  {inner}
                </Link>
              ) : (
                inner
              )}
              {i < steps.length - 1 && (
                <ChevronRight
                  aria-hidden="true"
                  className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-deep/40"
                />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
