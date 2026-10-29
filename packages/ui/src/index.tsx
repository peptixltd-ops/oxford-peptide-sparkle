import type { ReactNode } from "react";

export function formatGbp(amount: number) {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(amount);
}

export function ResearchUseNotice({ children }: { children?: ReactNode }) {
  return (
    <p className="text-[11px] tracking-wide text-center px-4 py-3 bg-white border-y border-border text-navy-deep/70">
      {children ?? "Research use only. Not for human or animal consumption."}
    </p>
  );
}
