import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, FileText } from "lucide-react";
import { EvidenceLevelBadge } from "./evidence";
import { PubHeading } from "./primitives";
import type { EvidenceLevel } from "./types";

/**
 * Evidence matrix — reusable evidence table for guides and monographs.
 * Row content is prop-driven. Rows are keyboard-navigable and expandable.
 */

export interface EvidenceMatrixRow {
  id: string;
  title: string;
  year?: number | string;
  journal?: string;
  model?: string;
  level: EvidenceLevel;
  outcome: React.ReactNode;
  /** Optional expanded detail (design, methods, effect sizes). */
  detail?: React.ReactNode;
  /** Optional citation id to jump to the References list. */
  referenceId?: string;
  /** Optional external link (PMID/DOI/URL). */
  href?: string;
}

export interface EvidenceMatrixProps {
  title?: string;
  rows: EvidenceMatrixRow[];
  /** Which columns to show. Defaults show all. */
  columns?: Array<"year" | "journal" | "model" | "level">;
  className?: string;
}

const columnLabels: Record<
  Required<EvidenceMatrixProps>["columns"][number],
  string
> = {
  year: "Year",
  journal: "Journal",
  model: "Model",
  level: "Evidence",
};

export function EvidenceMatrix({
  title = "Evidence matrix",
  rows,
  columns = ["year", "journal", "model", "level"],
  className,
}: EvidenceMatrixProps) {
  const [open, setOpen] = React.useState<Set<string>>(new Set());

  if (!rows.length) return null;

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section
      aria-label={title}
      className={cn("rounded-lg border border-border bg-card", className)}
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-5">
        <PubHeading level={3} icon={<FileText className="h-4 w-4" />}>
          {title}
          <span className="ml-2 text-xs font-normal text-muted-foreground">
            {rows.length} {rows.length === 1 ? "study" : "studies"}
          </span>
        </PubHeading>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th
                scope="col"
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Study
              </th>
              {columns.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                >
                  {columnLabels[c]}
                </th>
              ))}
              <th
                scope="col"
                className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                Outcome
              </th>
              <th scope="col" className="w-8" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const isOpen = open.has(r.id);
              return (
                <React.Fragment key={r.id}>
                  <tr
                    className="border-t border-border align-top hover:bg-muted/30"
                  >
                    <td className="px-3 py-2">
                      {r.href ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-foreground hover:text-[color:var(--gold)]"
                        >
                          {r.title}
                        </a>
                      ) : r.referenceId ? (
                        <a
                          href={`#ref-${r.referenceId}`}
                          className="font-medium text-foreground hover:text-[color:var(--gold)]"
                        >
                          {r.title}
                        </a>
                      ) : (
                        <span className="font-medium text-foreground">
                          {r.title}
                        </span>
                      )}
                    </td>
                    {columns.map((c) => (
                      <td key={c} className="px-3 py-2 text-muted-foreground">
                        {c === "level" ? (
                          <EvidenceLevelBadge level={r.level} />
                        ) : (
                          r[c] ?? "—"
                        )}
                      </td>
                    ))}
                    <td className="px-3 py-2 text-foreground">{r.outcome}</td>
                    <td className="px-1 py-2">
                      {r.detail ? (
                        <button
                          type="button"
                          onClick={() => toggle(r.id)}
                          aria-expanded={isOpen}
                          aria-controls={`ev-${r.id}`}
                          aria-label={
                            isOpen ? "Hide study details" : "Show study details"
                          }
                          className="rounded-md p-1 text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 transition-transform",
                              isOpen && "rotate-180",
                            )}
                            aria-hidden
                          />
                        </button>
                      ) : null}
                    </td>
                  </tr>
                  {isOpen && r.detail ? (
                    <tr id={`ev-${r.id}`} className="bg-muted/20">
                      <td
                        colSpan={columns.length + 3}
                        className="px-3 py-3 text-sm text-muted-foreground"
                      >
                        {r.detail}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
