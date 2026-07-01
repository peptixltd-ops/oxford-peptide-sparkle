import * as React from "react";
import { cn } from "@/lib/utils";
import { ExternalLink, BookMarked, ChevronDown } from "lucide-react";
import { PubHeading } from "./primitives";
import type { Reference, CitationStyle } from "./types";

/**
 * Reference & citation system. Structural only — no seed data.
 */

const ReferenceCtx = React.createContext<{
  references: Reference[];
  register: (r: Reference) => number;
  getIndex: (id: string) => number | undefined;
}>({
  references: [],
  register: () => 0,
  getIndex: () => undefined,
});

export function ReferenceProvider({
  references = [],
  children,
}: {
  references?: Reference[];
  children: React.ReactNode;
}) {
  const listRef = React.useRef<Reference[]>([...references]);
  const indexMap = React.useRef<Map<string, number>>(
    new Map(references.map((r, i) => [r.id, i + 1])),
  );

  const register = React.useCallback((r: Reference) => {
    if (indexMap.current.has(r.id)) return indexMap.current.get(r.id)!;
    const next = listRef.current.length + 1;
    listRef.current.push(r);
    indexMap.current.set(r.id, next);
    return next;
  }, []);

  const getIndex = React.useCallback(
    (id: string) => indexMap.current.get(id),
    [],
  );

  const value = React.useMemo(
    () => ({ references: listRef.current, register, getIndex }),
    [register, getIndex],
  );

  return <ReferenceCtx.Provider value={value}>{children}</ReferenceCtx.Provider>;
}

export function useReferences() {
  return React.useContext(ReferenceCtx);
}

export interface CitationProps {
  refId: string;
  className?: string;
}

/** Inline superscript citation link, e.g. text<Cite refId="smith-2020" /> */
export function Cite({ refId, className }: CitationProps) {
  const { getIndex } = useReferences();
  const idx = getIndex(refId);
  if (!idx) return null;
  return (
    <sup className={cn("mx-0.5", className)}>
      <a
        href={`#ref-${refId}`}
        className="rounded-sm px-0.5 text-[0.7em] font-medium text-[color:var(--gold)] no-underline hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label={`Reference ${idx}`}
      >
        [{idx}]
      </a>
    </sup>
  );
}

function joinAuthors(authors: string[], style: CitationStyle): string {
  if (!authors.length) return "";
  if (style === "apa") {
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
    return `${authors[0]} et al.`;
  }
  // AMA / Vancouver default
  if (authors.length <= 6) return authors.join(", ");
  return `${authors.slice(0, 6).join(", ")}, et al.`;
}

export function formatCitation(r: Reference, style: CitationStyle = "ama"): string {
  const authors = joinAuthors(r.authors, style);
  const parts: string[] = [];
  if (style === "apa") {
    parts.push(`${authors} (${r.year ?? "n.d."}).`);
    parts.push(`${r.title}.`);
    if (r.journal) {
      const vol = r.volume ? `, ${r.volume}` : "";
      const iss = r.issue ? `(${r.issue})` : "";
      const pg = r.pages ? `, ${r.pages}` : "";
      parts.push(`${r.journal}${vol}${iss}${pg}.`);
    }
  } else {
    parts.push(`${authors}.`);
    parts.push(`${r.title}.`);
    if (r.journal) {
      const yr = r.year ? ` ${r.year}` : "";
      const vol = r.volume ? `;${r.volume}` : "";
      const iss = r.issue ? `(${r.issue})` : "";
      const pg = r.pages ? `:${r.pages}` : "";
      parts.push(`${r.journal}.${yr}${vol}${iss}${pg}.`);
    }
  }
  return parts.filter(Boolean).join(" ");
}

export function ReferenceItem({
  reference,
  index,
  style = "ama",
}: {
  reference: Reference;
  index: number;
  style?: CitationStyle;
}) {
  return (
    <li
      id={`ref-${reference.id}`}
      className="scroll-mt-24 border-b border-border/60 py-3 text-sm leading-relaxed last:border-b-0"
    >
      <div className="flex gap-3">
        <span className="min-w-[1.5rem] text-xs font-semibold text-muted-foreground">
          {index}.
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-foreground">{formatCitation(reference, style)}</p>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            {reference.doi ? (
              <a
                href={`https://doi.org/${reference.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                DOI: {reference.doi}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            {reference.pmid ? (
              <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                PMID: {reference.pmid}
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            {reference.url && !reference.doi && !reference.pmid ? (
              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-foreground"
              >
                Source
                <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            ) : null}
            {typeof reference.citationCount === "number" ? (
              <span>Cited {reference.citationCount}×</span>
            ) : null}
          </div>
          {reference.note ? (
            <p className="mt-1 text-xs italic text-muted-foreground">{reference.note}</p>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export interface ReferenceListProps {
  references?: Reference[];
  title?: string;
  style?: CitationStyle;
  expandable?: boolean;
  defaultOpen?: boolean;
  groupBy?: (r: Reference) => string;
}

export function ReferenceList({
  references,
  title = "References",
  style = "ama",
  expandable = false,
  defaultOpen = true,
  groupBy,
}: ReferenceListProps) {
  const ctx = useReferences();
  const list = references ?? ctx.references;
  const [open, setOpen] = React.useState(defaultOpen);

  if (!list.length) return null;

  const grouped = groupBy
    ? list.reduce<Record<string, Reference[]>>((acc, r) => {
        const k = groupBy(r) ?? "Other";
        (acc[k] ??= []).push(r);
        return acc;
      }, {})
    : { [""]: list };

  const bodyId = React.useId();

  return (
    <section aria-label={title} className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:px-5">
        <PubHeading level={3} icon={<BookMarked className="h-4 w-4" />}>
          {title}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {list.length}
          </span>
        </PubHeading>
        {expandable ? (
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
        ) : null}
      </div>
      {open ? (
        <div id={bodyId} className="px-4 py-2 md:px-5">
          {Object.entries(grouped).map(([group, items]) => {
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
                      <ReferenceItem key={r.id} reference={r} index={idx} style={style} />
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

export function CitationCount({ count, className }: { count: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-border bg-background px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
      aria-label={`Cited ${count} times`}
    >
      <BookMarked className="h-3 w-3" aria-hidden /> {count}
    </span>
  );
}
