import * as React from "react";
import { cn } from "@/lib/utils";
import {
  BookMarked,
  ChevronDown,
  Copy,
  Download,
  ExternalLink,
  Check,
} from "lucide-react";
import { PubHeading } from "./primitives";
import { formatCitation, useReferences } from "./references";
import type { CitationStyle, EvidenceLevel, Reference } from "./types";

/**
 * Enhanced references — DOI, PMID, journal, year, citation type, evidence
 * category, expand/collapse, copy citation, export (BibTeX / plain text).
 *
 * This is additive to the existing `ReferenceList`. Use whichever fits the
 * page: `ReferenceList` for a short list, `EnhancedReferenceList` for a
 * full bibliography with author tooling.
 */

export type CitationType =
  | "primary-research"
  | "systematic-review"
  | "meta-analysis"
  | "clinical-trial"
  | "review"
  | "preprint"
  | "book"
  | "guideline"
  | "other";

export interface EnhancedReference extends Reference {
  citationType?: CitationType;
  evidenceCategory?: EvidenceLevel;
}

export interface EnhancedReferenceListProps {
  references?: EnhancedReference[];
  title?: string;
  style?: CitationStyle;
  defaultOpen?: boolean;
  /** Group by a derived key (e.g. citationType, evidenceCategory). */
  groupBy?: "type" | "evidence" | "year" | "none";
}

const citationTypeLabel: Record<CitationType, string> = {
  "primary-research": "Primary research",
  "systematic-review": "Systematic review",
  "meta-analysis": "Meta-analysis",
  "clinical-trial": "Clinical trial",
  review: "Review",
  preprint: "Preprint",
  book: "Book",
  guideline: "Guideline",
  other: "Other",
};

function toBibtex(r: EnhancedReference): string {
  const firstAuthor = r.authors?.[0]?.split(/[ ,]/)[0] ?? "anon";
  const key = `${firstAuthor.toLowerCase()}${r.year ?? ""}`;
  const authors = r.authors?.join(" and ") ?? "";
  const type =
    r.citationType === "book"
      ? "book"
      : r.journal
        ? "article"
        : "misc";
  const fields: Array<[string, string | number | undefined]> = [
    ["author", authors],
    ["title", r.title],
    ["journal", r.journal],
    ["year", r.year],
    ["volume", r.volume],
    ["number", r.issue],
    ["pages", r.pages],
    ["doi", r.doi],
    ["pmid", r.pmid],
    ["url", r.url],
    ["note", r.note],
  ];
  const body = fields
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `  ${k} = {${v}}`)
    .join(",\n");
  return `@${type}{${key},\n${body}\n}`;
}

async function copyToClipboard(text: string) {
  if (typeof navigator === "undefined" || !navigator.clipboard) return false;
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

function downloadFile(name: string, content: string, mime = "text/plain") {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function CopyButton({
  getText,
  label,
  icon: Icon = Copy,
}: {
  getText: () => string;
  label: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}) {
  const [ok, setOk] = React.useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        const done = await copyToClipboard(getText());
        if (done) {
          setOk(true);
          setTimeout(() => setOk(false), 1400);
        }
      }}
      aria-label={label}
      className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {ok ? (
        <Check className="h-3 w-3 text-[color:var(--gold)]" aria-hidden />
      ) : (
        <Icon className="h-3 w-3" aria-hidden />
      )}
      {ok ? "Copied" : label}
    </button>
  );
}

function ReferenceRow({
  r,
  index,
  style,
}: {
  r: EnhancedReference;
  index: number;
  style: CitationStyle;
}) {
  const [open, setOpen] = React.useState(false);
  const plain = formatCitation(r, style);
  return (
    <li
      id={`ref-${r.id}`}
      className="scroll-mt-24 border-b border-border/60 py-3 text-sm leading-relaxed last:border-b-0"
    >
      <div className="flex gap-3">
        <span className="min-w-[1.5rem] text-xs font-semibold text-muted-foreground">
          {index}.
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground">{plain}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            {r.citationType ? (
              <span className="rounded-full border border-border bg-background px-2 py-0.5">
                {citationTypeLabel[r.citationType]}
              </span>
            ) : null}
            {r.evidenceCategory ? (
              <span className="rounded-full border border-border bg-background px-2 py-0.5 capitalize">
                {r.evidenceCategory} evidence
              </span>
            ) : null}
            {r.doi ? (
              <a
                href={`https://doi.org/${r.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                DOI: {r.doi}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            {r.pmid ? (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${r.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                PMID: {r.pmid}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={`ref-detail-${r.id}`}
              className="ml-auto inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {open ? "Hide" : "Details"}
              <ChevronDown
                className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
                aria-hidden
              />
            </button>
          </div>
          {open ? (
            <div
              id={`ref-detail-${r.id}`}
              className="mt-2 space-y-2 rounded-md border border-border bg-muted/20 p-2"
            >
              <div className="flex flex-wrap gap-1.5">
                <CopyButton getText={() => plain} label="Copy citation" />
                <CopyButton getText={() => toBibtex(r)} label="Copy BibTeX" />
              </div>
              {r.note ? (
                <p className="text-xs italic text-muted-foreground">{r.note}</p>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function EnhancedReferenceList({
  references,
  title = "References",
  style = "ama",
  defaultOpen = true,
  groupBy = "none",
}: EnhancedReferenceListProps) {
  const ctx = useReferences();
  const list = (references ?? (ctx.references as EnhancedReference[])) ?? [];
  const [open, setOpen] = React.useState(defaultOpen);
  const bodyId = React.useId();

  const groups = React.useMemo(() => {
    if (groupBy === "none") return { "": list };
    return list.reduce<Record<string, EnhancedReference[]>>((acc, r) => {
      const key =
        groupBy === "type"
          ? r.citationType
            ? citationTypeLabel[r.citationType]
            : "Other"
          : groupBy === "evidence"
            ? r.evidenceCategory ?? "Uncategorised"
            : String(r.year ?? "Undated");
      (acc[key] ??= []).push(r);
      return acc;
    }, {});
  }, [list, groupBy]);

  if (!list.length) return null;

  const exportPlain = list
    .map((r, i) => `${i + 1}. ${formatCitation(r, style)}`)
    .join("\n\n");
  const exportBib = list.map(toBibtex).join("\n\n");

  return (
    <section aria-label={title} className="rounded-lg border border-border bg-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
        <PubHeading level={3} icon={<BookMarked className="h-4 w-4" />}>
          {title}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {list.length}
          </span>
        </PubHeading>
        <div className="flex flex-wrap items-center gap-1.5">
          <CopyButton
            getText={() => exportPlain}
            label="Copy all"
          />
          <button
            type="button"
            onClick={() => downloadFile("references.bib", exportBib)}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Download references as BibTeX"
          >
            <Download className="h-3 w-3" aria-hidden />
            BibTeX
          </button>
          <button
            type="button"
            onClick={() => downloadFile("references.txt", exportPlain)}
            className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Download references as plain text"
          >
            <Download className="h-3 w-3" aria-hidden />
            Plain text
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={bodyId}
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {open ? "Collapse" : "Expand"}
            <ChevronDown
              className={cn("h-3 w-3 transition-transform", open && "rotate-180")}
              aria-hidden
            />
          </button>
        </div>
      </div>
      {open ? (
        <div id={bodyId} className="px-4 py-2 md:px-5">
          {Object.entries(groups).map(([group, items]) => {
            let running = 0;
            return (
              <div key={group || "default"} className="py-2">
                {group ? (
                  <h4 className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {group}
                  </h4>
                ) : null}
                <ol className="list-none">
                  {items.map((r) => {
                    running += 1;
                    const idx = ctx.getIndex(r.id) ?? running;
                    return (
                      <ReferenceRow key={r.id} r={r} index={idx} style={style} />
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

/**
 * Standalone citation exporter — renders next to article actions.
 */
export function CitationExport({
  references,
  filenameStem = "references",
}: {
  references: EnhancedReference[];
  filenameStem?: string;
}) {
  const plain = references
    .map((r, i) => `${i + 1}. ${formatCitation(r, "ama")}`)
    .join("\n\n");
  const bib = references.map(toBibtex).join("\n\n");
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <CopyButton getText={() => plain} label="Copy citations" />
      <button
        type="button"
        onClick={() => downloadFile(`${filenameStem}.bib`, bib)}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Export citations as BibTeX"
      >
        <Download className="h-3.5 w-3.5" aria-hidden />
        BibTeX
      </button>
      <button
        type="button"
        onClick={() => downloadFile(`${filenameStem}.txt`, plain)}
        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1.5 text-xs font-medium text-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Export citations as plain text"
      >
        <Download className="h-3.5 w-3.5" aria-hidden />
        Plain text
      </button>
    </div>
  );
}
