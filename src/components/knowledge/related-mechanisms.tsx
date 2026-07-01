import { Link } from "@tanstack/react-router";
import { mechanismGroups, type MechanismGroupId } from "@/lib/taxonomy";
import { getRelated, type EntityRef } from "@/lib/knowledge-graph";

interface MechanismLike {
  id: string;
  label: string;
  description?: string;
}

/**
 * Renders links to mechanism pages. Consumes the Knowledge Graph when an
 * `entityRef` is supplied, otherwise falls back to the mechanism id list.
 * Hides itself when there is nothing to show and no `emptyLabel`.
 */
export function RelatedMechanisms({
  entityRef,
  mechanismIds,
  heading = "Related mechanisms",
  emptyLabel,
  limit = 6,
}: {
  entityRef?: EntityRef;
  mechanismIds?: readonly MechanismGroupId[];
  heading?: string;
  emptyLabel?: string;
  limit?: number;
}) {
  let list: MechanismLike[] = [];

  if (entityRef) {
    list = getRelated(entityRef, { type: "mechanism", limit }).map((e) => ({
      id: e.slug,
      label: e.title,
      description: e.description,
    }));
  } else if (mechanismIds && mechanismIds.length) {
    list = mechanismGroups
      .filter((m) => mechanismIds.includes(m.id))
      .map((m) => ({ id: m.id, label: m.label, description: m.description }));
  }

  if (list.length === 0 && !emptyLabel) return null;

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
                {m.description && (
                  <p className="text-xs text-muted-foreground leading-snug">{m.description}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
