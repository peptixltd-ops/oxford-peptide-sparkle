import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  guidesInCategory,
  researchCategories,
  type ResearchCategoryId,
} from "@/lib/taxonomy";

/**
 * "Continue reading" component. Prefers guides from the same category and
 * falls back to related categories from the taxonomy when the category
 * has no populated guides yet.
 */
export function ContinueReading({
  categoryId,
  heading = "Continue reading",
}: {
  categoryId?: ResearchCategoryId;
  heading?: string;
}) {
  const guides = categoryId ? guidesInCategory(categoryId) : [];

  return (
    <section
      aria-label={heading}
      className="bg-navy-deep text-bone p-6 md:p-8"
    >
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {heading.toUpperCase()}
      </div>

      {guides.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-3">
          {guides.slice(0, 4).map((g) => (
            <li key={g.slug}>
              <Link
                to="/research-hub/guides/$slug"
                params={{ slug: g.slug }}
                className="block p-4 border border-white/15 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                <div className="font-display text-sm font-semibold leading-tight">{g.title}</div>
                {g.summary && (
                  <p className="text-xs text-bone/70 mt-1.5 leading-snug">{g.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="grid sm:grid-cols-3 gap-3">
          {researchCategories.slice(0, 3).map((c) => (
            <li key={c.id}>
              <Link
                to={c.path}
                className="block p-4 border border-white/15 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold group"
              >
                <div className="flex items-center gap-2 mb-1">
                  <c.icon className="w-4 h-4 text-gold" aria-hidden="true" />
                  <div className="font-display text-sm font-semibold group-hover:text-gold transition-colors">
                    {c.label}
                  </div>
                </div>
                <p className="text-xs text-bone/70 leading-snug">{c.description}</p>
                <div className="text-[10px] font-bold tracking-widest text-gold mt-2 inline-flex items-center gap-1">
                  EXPLORE <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
