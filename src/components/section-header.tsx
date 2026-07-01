import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title?: ReactNode;
  ctaLabel?: string;
  ctaTo?: string;
  className?: string;
};

/**
 * Shared eyebrow + title + optional right-aligned CTA link.
 * Used across every homepage and landing-page section header.
 */
export function SectionHeader({ eyebrow, title, ctaLabel, ctaTo, className = "" }: Props) {
  return (
    <div className={`flex items-center justify-between mb-10 ${className}`}>
      <div>
        {eyebrow && (
          <div className="text-[11px] md:text-xs font-bold tracking-[0.25em] text-navy-deep">
            {eyebrow}
          </div>
        )}
        {title && (
          <h2 className="font-display text-2xl md:text-3xl font-medium mt-1">{title}</h2>
        )}
      </div>
      {ctaLabel && ctaTo && (
        <Link
          to={ctaTo}
          className="text-xs font-bold tracking-widest inline-flex items-center gap-2 hover:text-gold transition-colors"
        >
          {ctaLabel} <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
