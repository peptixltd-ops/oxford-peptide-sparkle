import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Key,
  Info,
  Sparkles,
  ShieldAlert,
  FlaskConical,
  Wrench,
  BookOpen,
  History,
  AlertTriangle,
  ChevronDown,
} from "lucide-react";
import { PubPanel, PubHeading, type PubTone } from "./primitives";

/**
 * Scientific callouts. All props are structured; each accepts icon override,
 * heading, and optional expandable body.
 */

export interface CalloutProps {
  title?: React.ReactNode;
  icon?: React.ReactNode;
  tone?: PubTone;
  defaultOpen?: boolean;
  expandable?: boolean;
  className?: string;
  children?: React.ReactNode;
  ariaLabel?: string;
}

export function Callout({
  title,
  icon,
  tone = "neutral",
  defaultOpen = true,
  expandable = false,
  className,
  children,
  ariaLabel,
}: CalloutProps) {
  const [open, setOpen] = React.useState(defaultOpen);
  const bodyId = React.useId();

  if (!expandable) {
    return (
      <PubPanel tone={tone} className={className} aria-label={ariaLabel}>
        {title ? (
          <PubHeading level={4} icon={icon}>
            {title}
          </PubHeading>
        ) : null}
        {children ? <div className={cn(title && "mt-2", "text-sm leading-relaxed")}>{children}</div> : null}
      </PubPanel>
    );
  }

  return (
    <PubPanel tone={tone} className={className} aria-label={ariaLabel}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={bodyId}
        className="flex w-full items-center gap-3 text-left"
      >
        <div className="flex-1">
          <PubHeading level={4} icon={icon}>
            {title}
          </PubHeading>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={bodyId} className="mt-3 text-sm leading-relaxed">
          {children}
        </div>
      ) : null}
    </PubPanel>
  );
}

type PresetProps = Omit<CalloutProps, "tone" | "icon"> & { icon?: React.ReactNode };

export const KeyFindings = (p: PresetProps) => (
  <Callout tone="accent" icon={p.icon ?? <Key className="h-4 w-4" />} title={p.title ?? "Key findings"} {...p} />
);
export const ImportantNote = (p: PresetProps) => (
  <Callout tone="info" icon={p.icon ?? <Info className="h-4 w-4" />} title={p.title ?? "Important note"} {...p} />
);
export const ResearchHighlight = (p: PresetProps) => (
  <Callout tone="accent" icon={p.icon ?? <Sparkles className="h-4 w-4" />} title={p.title ?? "Research highlight"} {...p} />
);
export const SafetyNote = (p: PresetProps) => (
  <Callout tone="warning" icon={p.icon ?? <ShieldAlert className="h-4 w-4" />} title={p.title ?? "Safety note"} {...p} />
);
export const LaboratoryNote = (p: PresetProps) => (
  <Callout tone="info" icon={p.icon ?? <FlaskConical className="h-4 w-4" />} title={p.title ?? "Laboratory note"} {...p} />
);
export const MethodologyTip = (p: PresetProps) => (
  <Callout tone="neutral" icon={p.icon ?? <Wrench className="h-4 w-4" />} title={p.title ?? "Methodology tip"} {...p} />
);
export const Definition = (p: PresetProps & { term?: string }) => (
  <Callout
    tone="neutral"
    icon={p.icon ?? <BookOpen className="h-4 w-4" />}
    title={p.title ?? (p.term ? `Definition · ${p.term}` : "Definition")}
    {...p}
  />
);
export const HistoricalContext = (p: PresetProps) => (
  <Callout tone="neutral" icon={p.icon ?? <History className="h-4 w-4" />} title={p.title ?? "Historical context"} {...p} />
);
export const Warning = (p: PresetProps) => (
  <Callout tone="danger" icon={p.icon ?? <AlertTriangle className="h-4 w-4" />} title={p.title ?? "Warning"} {...p} />
);
