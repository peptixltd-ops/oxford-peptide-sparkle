"use client";
import { Link } from "@/shims/router";

type Row = [string, string];

const defaultRows: Row[] = [
  ["Product", "Retatrutide"],
  ["Batch Number", "ORP-240501"],
  ["Purity (HPLC)", ">99%"],
  ["Appearance", "White Lyophilised Powder"],
  ["Molecular Weight", "4,574.6 g/mol"],
  ["Test Date", "01/05/2024"],
  ["Result", "PASS"],
];

/**
 * Reusable Certificate of Analysis mock card. Signature brand asset —
 * now shared so future PDPs and the lab-testing page can render the same
 * component instead of duplicating markup.
 */
export function CoaCard({ rows = defaultRows, viewHref = "/lab-testing" }: { rows?: Row[]; viewHref?: string }) {
  return (
    <div className="bg-white text-navy-deep p-6 rounded-sm shadow-2xl">
      <div className="text-center font-display text-sm font-semibold tracking-widest border-b border-border pb-3 mb-4">
        CERTIFICATE OF ANALYSIS
      </div>
      <dl className="text-xs space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-dashed border-border pb-1.5">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="font-semibold">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="flex items-end justify-between mt-5">
        <div>
          <div className="font-display italic text-lg">Dr. A. Chen</div>
          <div className="text-[9px] text-muted-foreground">Head of Quality Control</div>
        </div>
        <div
          className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center text-gold text-[9px] font-bold rotate-[-12deg]"
          aria-hidden="true"
        >
          APPROVED
        </div>
      </div>
      <div className="text-center mt-5 pt-4 border-t border-border">
        <Link to={viewHref} className="text-[10px] font-bold tracking-widest hover:text-gold">
          VIEW SAMPLE COA →
        </Link>
      </div>
    </div>
  );
}
