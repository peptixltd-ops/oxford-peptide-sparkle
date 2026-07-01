import * as React from "react";
import { cn } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

/**
 * Scientific figures, tables, timelines and infographic containers.
 * All layouts are responsive by default.
 */

export interface FigureProps {
  id?: string;
  number?: string | number;
  caption?: React.ReactNode;
  attribution?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Figure({ id, number, caption, attribution, children, className }: FigureProps) {
  return (
    <figure
      id={id}
      className={cn(
        "my-6 overflow-hidden rounded-lg border border-border bg-card",
        className,
      )}
    >
      <div className="relative bg-muted/40">{children}</div>
      {caption || attribution ? (
        <FigureCaption number={number} attribution={attribution}>
          {caption}
        </FigureCaption>
      ) : null}
    </figure>
  );
}

export function FigureCaption({
  number,
  attribution,
  children,
}: {
  number?: string | number;
  attribution?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <figcaption className="space-y-1 border-t border-border px-4 py-3 text-sm text-muted-foreground">
      <div>
        {number != null ? (
          <span className="mr-2 font-semibold text-foreground">
            Fig. {number}.
          </span>
        ) : null}
        {children}
      </div>
      {attribution ? <ImageAttribution>{attribution}</ImageAttribution> : null}
    </figcaption>
  );
}

export function ImageAttribution({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs italic text-muted-foreground/80">
      <ImageIcon className="mr-1 inline h-3 w-3 align-[-2px]" aria-hidden />
      {children}
    </p>
  );
}

export interface ScientificDiagramProps {
  src?: string;
  alt: string;
  aspect?: "video" | "square" | "wide" | "portrait";
  className?: string;
  children?: React.ReactNode;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
} as const;

export function ScientificDiagram({
  src,
  alt,
  aspect = "video",
  className,
  children,
}: ScientificDiagramProps) {
  return (
    <div className={cn("relative w-full", aspectMap[aspect], className)}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-contain"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground"
        >
          {children ?? "Diagram unavailable"}
        </div>
      )}
    </div>
  );
}

export interface ResearchTableProps
  extends React.TableHTMLAttributes<HTMLTableElement> {
  caption?: React.ReactNode;
  compact?: boolean;
}

export function ResearchTable({
  caption,
  compact,
  className,
  children,
  ...rest
}: ResearchTableProps) {
  return (
    <div className="my-4 w-full overflow-x-auto rounded-lg border border-border">
      <table
        className={cn(
          "w-full border-collapse text-left text-sm",
          compact ? "[&_td]:py-1.5 [&_th]:py-1.5" : "[&_td]:py-2.5 [&_th]:py-2.5",
          "[&_th]:px-3 [&_td]:px-3",
          "[&_thead]:bg-muted/50 [&_thead_th]:text-xs [&_thead_th]:font-semibold [&_thead_th]:uppercase [&_thead_th]:tracking-wider [&_thead_th]:text-muted-foreground",
          "[&_tbody_tr]:border-t [&_tbody_tr]:border-border",
          "[&_tbody_tr:hover]:bg-muted/30",
          className,
        )}
        {...rest}
      >
        {caption ? (
          <caption className="border-b border-border bg-card px-3 py-2 text-left text-xs font-medium text-muted-foreground">
            {caption}
          </caption>
        ) : null}
        {children}
      </table>
    </div>
  );
}

export interface ComparisonTableColumn {
  key: string;
  label: React.ReactNode;
}
export interface ComparisonTableRow {
  label: React.ReactNode;
  values: Record<string, React.ReactNode>;
}

export function ComparisonTable({
  columns,
  rows,
  caption,
  rowHeaderLabel = "Attribute",
}: {
  columns: ComparisonTableColumn[];
  rows: ComparisonTableRow[];
  caption?: React.ReactNode;
  rowHeaderLabel?: string;
}) {
  return (
    <ResearchTable caption={caption}>
      <thead>
        <tr>
          <th scope="col">{rowHeaderLabel}</th>
          {columns.map((c) => (
            <th key={c.key} scope="col">
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <th scope="row" className="bg-muted/20 font-medium text-foreground">
              {r.label}
            </th>
            {columns.map((c) => (
              <td key={c.key}>{r.values[c.key] ?? "—"}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </ResearchTable>
  );
}

export interface TimelineItem {
  date: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return (
    <ol className={cn("relative space-y-6 border-l border-border pl-6", className)}>
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span
            aria-hidden
            className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[color:var(--gold)] bg-background"
          />
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {it.date}
          </div>
          <h4 className="mt-0.5 font-display text-base text-foreground">{it.title}</h4>
          {it.description ? (
            <div className="mt-1 text-sm text-muted-foreground">{it.description}</div>
          ) : null}
        </li>
      ))}
    </ol>
  );
}

export function InfographicContainer({
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
        "my-6 rounded-xl border border-border bg-gradient-to-br from-[color:var(--bone)] to-background p-4 md:p-6 dark:from-card dark:to-background",
        className,
      )}
      aria-label={typeof title === "string" ? title : undefined}
    >
      {title ? (
        <h3 className="mb-4 font-display text-lg text-foreground">{title}</h3>
      ) : null}
      {children}
    </section>
  );
}
