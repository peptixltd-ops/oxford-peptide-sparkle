import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import type { PathwayStep } from "@/lib/taxonomy";
import { defaultReadingPathway } from "@/lib/taxonomy";
import {
  buildPathway,
  type EntityRef,
  type PathwayType,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

/**
 * Data-driven learning pathway.
 *
 * Three modes, in order of precedence:
 *   1. Explicit `steps` prop — legacy override (taxonomy PathwayStep[]).
 *   2. `pathway` type — synthesised from the Knowledge Graph via
 *      `buildPathway(pathway, { anchor: entityRef })`.
 *   3. Default reading pathway from the taxonomy.
 */
export function ReadingPathway({
  steps,
  pathway,
  entityRef,
  activeKind,
  title,
  className = "",
}: {
  steps?: readonly PathwayStep[];
  pathway?: PathwayType;
  entityRef?: EntityRef;
  activeKind?: PathwayStep["kind"];
  title?: string;
  className?: string;
}) {
  const resolvedSteps: readonly PathwayStep[] = steps
    ? steps
    : pathway
      ? buildPathway(pathway, { anchor: entityRef, limit: 6 }).map(entityToStep)
      : defaultReadingPathway;

  const resolvedTitle =
    title ??
    (pathway ? pathwayTitle(pathway) : "How to read the Research Hub");

  return (
    <section
      aria-label="Reading pathway"
      className={`bg-white border border-navy-deep/10 p-6 md:p-8 ${className}`}
    >
      <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">READING PATHWAY</div>
      <h2 className="font-display text-2xl font-medium text-navy-deep mb-6">{resolvedTitle}</h2>
      <ol className="grid gap-3 md:grid-cols-6 md:gap-2">
        {resolvedSteps.map((step, i) => {
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
              {i < resolvedSteps.length - 1 && (
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

function entityToStep(e: KnowledgeEntity): PathwayStep {
  return {
    kind: mapKind(e),
    label: e.title,
    hint: e.description,
    to: e.path,
  };
}

function mapKind(e: KnowledgeEntity): PathwayStep["kind"] {
  switch (e.type) {
    case "mechanism":
    case "pathway":
    case "receptor":
      return "mechanism";
    case "compound":
    case "compound-family":
      return "compound";
    case "methodology":
      return "method";
    case "comparison":
      return "comparison";
    case "literature-review":
    case "guide":
    case "glossary-term":
      return "reading";
    default:
      return "start";
  }
}

function pathwayTitle(p: PathwayType): string {
  switch (p) {
    case "beginner":
      return "Beginner learning pathway";
    case "intermediate":
      return "Intermediate learning pathway";
    case "advanced":
      return "Advanced learning pathway";
    case "compound-focused":
      return "Compound-focused pathway";
    case "mechanism-focused":
      return "Mechanism-focused pathway";
    case "methodology-focused":
      return "Methodology-focused pathway";
  }
}
