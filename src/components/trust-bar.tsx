import { Award, ClipboardCheck, FlaskConical, Microscope, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Badge = { icon: LucideIcon; title: string; sub: string };

export const defaultTrustBadges: Badge[] = [
  { icon: Award, title: "UK Manufactured", sub: "Made in the United Kingdom" },
  { icon: FlaskConical, title: "Third-Party Tested", sub: "Independent laboratory testing" },
  { icon: ClipboardCheck, title: "Batch Verified", sub: "Every batch verified" },
  { icon: Microscope, title: "Research Use Only", sub: "For laboratory research only" },
  { icon: Truck, title: "Next Day UK Delivery", sub: "Tracked & discreet packaging" },
];

/**
 * Sitewide navy trust strip. Same design token pattern as the previous
 * inline homepage implementation — now shared and reusable.
 */
export function TrustBar({ badges = defaultTrustBadges }: { badges?: Badge[] }) {
  return (
    <div className="bg-navy-deep text-bone border-b border-white/10">
      <div className="container-x grid grid-cols-2 md:grid-cols-5 gap-4 py-4">
        {badges.map((b) => (
          <div key={b.title} className="flex items-center gap-3">
            <b.icon className="w-7 h-7 text-gold shrink-0" strokeWidth={1.5} aria-hidden="true" />
            <div>
              <div className="text-[11px] font-bold tracking-wider">{b.title.toUpperCase()}</div>
              <div className="text-[11px] opacity-70">{b.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
