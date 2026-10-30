"use client";
/**
 * Compact research-use-only notice shown near the end of page content.
 * Complements the smaller line in the site footer.
 */
export function ResearchUseNotice() {
  return (
    <aside
      aria-label="Research use only notice"
      className="border-t border-border bg-muted/50"
    >
      <div className="container-x py-4">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-navy-deep/70">
          Research Use Only. Not for Human or Animal Consumption.
        </p>
      </div>
    </aside>
  );
}
