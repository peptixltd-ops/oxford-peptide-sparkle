import { Link } from "@tanstack/react-router";
import {
  guidesInCategory,
  guidesByCompound,
  guidesByMechanism,
  type Guide,
  type ResearchCategoryId,
  type MechanismGroupId,
} from "@/lib/taxonomy";


interface Props {
  /** Filter by category. */
  categoryId?: ResearchCategoryId;
  /** Filter by referenced compound slug. */
  compoundSlug?: string;
  /** Filter by mechanism group. */
  mechanismId?: MechanismGroupId;
  heading?: string;
  emptyLabel?: string;
  limit?: number;
}

/**
 * Consumes the central taxonomy to render a list of related guides — never
 * a static array. Empty state renders a labelled placeholder.
 */
export function RelatedGuides({
  categoryId,
  compoundSlug,
  mechanismId,
  heading = "Related guides",
  emptyLabel = "Related guides are populated in a future release.",
  limit = 6,
}: Props) {
  let list: Guide[] = [];
  if (compoundSlug) list = guidesByCompound(compoundSlug);
  else if (mechanismId) list = guidesByMechanism(mechanismId);
  else if (categoryId) list = guidesInCategory(categoryId);


  return (
    <section
      aria-label={heading}
      className="bg-white border border-navy-deep/10 p-6 md:p-8"
    >
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {heading.toUpperCase()}
      </div>
      {list.length === 0 ? (
        <p className="text-sm text-muted-foreground italic">{emptyLabel}</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-3">
          {list.slice(0, limit).map((g) => (
            <li key={g.slug}>
              <Link
                to="/research-hub/guides/$slug"
                params={{ slug: g.slug }}
                className="block p-4 border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                <div className="font-display text-sm font-semibold text-navy-deep leading-tight">
                  {g.title}
                </div>
                {g.summary && (
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug">{g.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
