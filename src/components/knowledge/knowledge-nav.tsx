import { Link } from "@tanstack/react-router";
import {
  getCategory,
  getRelatedCategories,
  type ResearchCategoryId,
} from "@/lib/taxonomy";
import { ArrowRight } from "lucide-react";

/**
 * Secondary educational navigation. Answers three questions for the reader:
 *   1. Where am I?
 *   2. What sits alongside this?
 *   3. What should I read next?
 *
 * Consumed by every category landing and (in future) every guide/compound
 * page — always driven off the central taxonomy.
 */
export function KnowledgeNav({
  currentCategoryId,
  suggestedNext,
}: {
  currentCategoryId: ResearchCategoryId;
  /** Optional explicit "next" pointer. Falls back to the first related category. */
  suggestedNext?: { label: string; href: string; hint?: string };
}) {
  const current = getCategory(currentCategoryId);
  const related = getRelatedCategories(currentCategoryId);
  const next =
    suggestedNext ??
    (related[0]
      ? { label: related[0].label, href: related[0].path, hint: related[0].description }
      : undefined);

  if (!current) return null;

  return (
    <nav
      aria-label="Knowledge navigation"
      className="bg-navy-deep text-bone border border-white/10"
    >
      <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {/* Current */}
        <div className="p-5">
          <div className="text-[10px] font-bold tracking-widest text-gold mb-2">YOU ARE HERE</div>
          <div className="font-display text-lg font-semibold leading-tight">{current.label}</div>
          <p className="text-xs text-bone/70 mt-1.5 leading-snug">{current.description}</p>
        </div>

        {/* Related */}
        <div className="p-5">
          <div className="text-[10px] font-bold tracking-widest text-gold mb-2">RELATED SECTIONS</div>
          <ul className="space-y-1.5">
            {related.length === 0 && (
              <li className="text-xs text-bone/60">No related sections listed.</li>
            )}
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to={r.path}
                  className="text-sm text-bone hover:text-gold focus-visible:text-gold focus-visible:outline-2 focus-visible:outline-gold transition-colors inline-flex items-center gap-1.5"
                >
                  <r.icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {r.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Suggested next */}
        <div className="p-5">
          <div className="text-[10px] font-bold tracking-widest text-gold mb-2">SUGGESTED NEXT</div>
          {next ? (
            <Link
              to={next.href}
              className="group block focus-visible:outline-2 focus-visible:outline-gold"
            >
              <div className="font-display text-base font-semibold leading-tight group-hover:text-gold transition-colors">
                {next.label}
                <ArrowRight
                  aria-hidden="true"
                  className="inline w-4 h-4 ml-1 -mt-0.5 opacity-70 group-hover:translate-x-0.5 transition-transform"
                />
              </div>
              {next.hint && (
                <p className="text-xs text-bone/70 mt-1.5 leading-snug">{next.hint}</p>
              )}
            </Link>
          ) : (
            <div className="text-xs text-bone/60">No suggestion configured.</div>
          )}
        </div>
      </div>
    </nav>
  );
}
