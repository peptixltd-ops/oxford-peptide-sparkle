import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Beaker,
  FlaskConical,
  Microscope,
  Rat,
  User,
  ShieldQuestion,
  TrendingUp,
  Info,
} from "lucide-react";
import { PubPanel, PubHeading } from "./primitives";
import type {
  EvidenceLevel,
  ResearchConfidence,
  StudyQualityGrade,
} from "./types";

/**
 * Evidence components — reusable across guides, monographs, comparisons.
 * All states are prop-driven; no hardcoded scientific content.
 */

const evidenceLevelMeta: Record<
  EvidenceLevel,
  { label: string; dots: number; tone: "success" | "info" | "warning" | "neutral" | "danger" }
> = {
  strong: { label: "Strong evidence", dots: 5, tone: "success" },
  moderate: { label: "Moderate evidence", dots: 4, tone: "info" },
  limited: { label: "Limited evidence", dots: 3, tone: "warning" },
  preliminary: { label: "Preliminary evidence", dots: 2, tone: "warning" },
  insufficient: { label: "Insufficient evidence", dots: 1, tone: "neutral" },
  conflicting: { label: "Conflicting evidence", dots: 2, tone: "danger" },
};

export interface EvidenceLevelBadgeProps {
  level: EvidenceLevel;
  label?: string;
  className?: string;
}

export function EvidenceLevelBadge({ level, label, className }: EvidenceLevelBadgeProps) {
  const meta = evidenceLevelMeta[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
        "border-border bg-background text-foreground",
        className,
      )}
      aria-label={`Evidence level: ${label ?? meta.label}`}
    >
      <span className="flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              i < meta.dots ? "bg-[color:var(--gold)]" : "bg-border",
            )}
          />
        ))}
      </span>
      <span>{label ?? meta.label}</span>
    </span>
  );
}

const confidenceMeta: Record<ResearchConfidence, { label: string; pct: number }> = {
  high: { label: "High confidence", pct: 90 },
  moderate: { label: "Moderate confidence", pct: 65 },
  low: { label: "Low confidence", pct: 35 },
  "very-low": { label: "Very low confidence", pct: 15 },
};

export function ResearchConfidenceMeter({
  confidence,
  label,
  className,
}: {
  confidence: ResearchConfidence;
  label?: string;
  className?: string;
}) {
  const m = confidenceMeta[confidence];
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-muted-foreground">
          {label ?? "Research confidence"}
        </span>
        <span className="text-foreground">{m.label}</span>
      </div>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={m.pct}
        aria-label={label ?? "Research confidence"}
      >
        <div
          className="h-full rounded-full bg-[color:var(--gold)]"
          style={{ width: `${m.pct}%` }}
        />
      </div>
    </div>
  );
}

export interface EvidenceSummaryProps {
  title?: string;
  level: EvidenceLevel;
  confidence?: ResearchConfidence;
  summary?: React.ReactNode;
  studyCount?: number;
  lastReviewed?: string;
  children?: React.ReactNode;
}

export function EvidenceSummary({
  title = "Evidence summary",
  level,
  confidence,
  summary,
  studyCount,
  lastReviewed,
  children,
}: EvidenceSummaryProps) {
  return (
    <PubPanel tone="neutral" aria-label={title}>
      <PubHeading level={3} eyebrow="Evidence" icon={<TrendingUp className="h-4 w-4" />}>
        {title}
      </PubHeading>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <EvidenceLevelBadge level={level} />
        {typeof studyCount === "number" ? (
          <span className="text-xs text-muted-foreground">
            {studyCount} referenced {studyCount === 1 ? "study" : "studies"}
          </span>
        ) : null}
        {lastReviewed ? (
          <span className="text-xs text-muted-foreground">
            Last reviewed {lastReviewed}
          </span>
        ) : null}
      </div>
      {confidence ? (
        <div className="mt-4">
          <ResearchConfidenceMeter confidence={confidence} />
        </div>
      ) : null}
      {summary ? <div className="mt-4 text-sm leading-relaxed">{summary}</div> : null}
      {children ? <div className="mt-4">{children}</div> : null}
    </PubPanel>
  );
}

const domainMeta = {
  human: { label: "Human evidence", Icon: User },
  animal: { label: "Animal evidence", Icon: Rat },
  "in-vitro": { label: "In vitro evidence", Icon: FlaskConical },
  mechanistic: { label: "Mechanistic evidence", Icon: Microscope },
} as const;

export interface EvidenceDomainCardProps {
  domain: keyof typeof domainMeta;
  level?: EvidenceLevel;
  studyCount?: number;
  summary?: React.ReactNode;
  children?: React.ReactNode;
}

export function EvidenceDomainCard({
  domain,
  level,
  studyCount,
  summary,
  children,
}: EvidenceDomainCardProps) {
  const meta = domainMeta[domain];
  const Icon = meta.Icon;
  return (
    <PubPanel tone="neutral">
      <PubHeading level={4} icon={<Icon className="h-4 w-4" />}>
        {meta.label}
      </PubHeading>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {level ? <EvidenceLevelBadge level={level} /> : null}
        {typeof studyCount === "number" ? (
          <span className="text-xs text-muted-foreground">
            {studyCount} {studyCount === 1 ? "study" : "studies"}
          </span>
        ) : null}
      </div>
      {summary ? <p className="mt-3 text-sm leading-relaxed">{summary}</p> : null}
      {children}
    </PubPanel>
  );
}

export const HumanEvidence = (p: Omit<EvidenceDomainCardProps, "domain">) => (
  <EvidenceDomainCard {...p} domain="human" />
);
export const AnimalEvidence = (p: Omit<EvidenceDomainCardProps, "domain">) => (
  <EvidenceDomainCard {...p} domain="animal" />
);
export const InVitroEvidence = (p: Omit<EvidenceDomainCardProps, "domain">) => (
  <EvidenceDomainCard {...p} domain="in-vitro" />
);
export const MechanisticEvidence = (p: Omit<EvidenceDomainCardProps, "domain">) => (
  <EvidenceDomainCard {...p} domain="mechanistic" />
);

export function ResearchLimitations({
  items,
  title = "Research limitations",
  children,
}: {
  items?: React.ReactNode[];
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <PubPanel tone="warning">
      <PubHeading level={4} icon={<ShieldQuestion className="h-4 w-4" />}>
        {title}
      </PubHeading>
      {items?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      ) : null}
      {children}
    </PubPanel>
  );
}

export function FutureResearch({
  items,
  title = "Future research directions",
  children,
}: {
  items?: React.ReactNode[];
  title?: string;
  children?: React.ReactNode;
}) {
  return (
    <PubPanel tone="info">
      <PubHeading level={4} icon={<Beaker className="h-4 w-4" />}>
        {title}
      </PubHeading>
      {items?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
          {items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      ) : null}
      {children}
    </PubPanel>
  );
}

const gradeMeta: Record<StudyQualityGrade, { label: string; tone: "success" | "info" | "warning" | "danger" | "neutral" }> = {
  A: { label: "Grade A · High quality", tone: "success" },
  B: { label: "Grade B · Good quality", tone: "info" },
  C: { label: "Grade C · Fair quality", tone: "warning" },
  D: { label: "Grade D · Low quality", tone: "danger" },
  insufficient: { label: "Insufficient", tone: "neutral" },
};

export function StudyQualityBadge({
  grade,
  className,
}: {
  grade: StudyQualityGrade;
  className?: string;
}) {
  const m = gradeMeta[grade];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs font-medium",
        "border-border bg-background text-foreground",
        className,
      )}
      aria-label={m.label}
    >
      <Info className="h-3 w-3" aria-hidden />
      {m.label}
    </span>
  );
}
