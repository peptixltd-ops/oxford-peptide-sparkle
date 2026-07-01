import { Link } from "@tanstack/react-router";
import { mechanismGroups, type MechanismGroupId } from "@/lib/taxonomy";

/**
 * Renders links to mechanism-of-action pages. Consumes taxonomy for labels
 * and descriptions.
 */
export function RelatedMechanisms({
  mechanismIds,
  heading = "Related mechanisms",
  emptyLabel = "No mechanisms linked yet.",
}: {
  mechanismIds?: readonly MechanismGroupId[];
  heading?: string;
  emptyLabel?: string;
}) {
  const list = mechanismIds && mechanismIds.length
    ? mechanismGroups.filter((m) => mechanismIds.includes(m.id))
    : [];

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
        <ul className="space-y-2">
          {list.map((m) => (
            <li key={m.id}>
              <Link
                to="/research-hub/mechanisms/$slug"
                params={{ slug: m.id }}
                className="block group focus-visible:outline-2 focus-visible:outline-gold"
              >
                <div className="font-display text-sm font-semibold text-navy-deep group-hover:text-gold transition-colors">
                  {m.label}
                </div>
                <p className="text-xs text-muted-foreground leading-snug">{m.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
