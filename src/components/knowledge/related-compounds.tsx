import { Link } from "@tanstack/react-router";
import {
  compoundEntries,
  compoundsInFamily,
  compoundsByMechanism,
  type CompoundEntry,
  type CompoundFamilyId,
  type MechanismGroupId,
} from "@/lib/taxonomy";


interface Props {
  familyId?: CompoundFamilyId;
  mechanismId?: MechanismGroupId;
  /** Explicit slug list wins when provided. */
  slugs?: readonly string[];
  heading?: string;
  emptyLabel?: string;
  limit?: number;
}

export function RelatedCompounds({
  familyId,
  mechanismId,
  slugs,
  heading = "Related compounds",
  emptyLabel = "Compound monographs are populated in a future release.",
  limit = 8,
}: Props) {
  let list: CompoundEntry[] = [];
  if (slugs && slugs.length) list = compoundEntries.filter((c) => slugs.includes(c.slug));
  else if (familyId) list = compoundsInFamily(familyId);
  else if (mechanismId) list = compoundsByMechanism(mechanismId);


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
        <ul className="flex flex-wrap gap-2">
          {list.slice(0, limit).map((c) => (
            <li key={c.slug}>
              <Link
                to="/compounds/$slug"
                params={{ slug: c.slug }}
                className="inline-block px-3 py-1.5 border border-navy-deep/15 text-xs font-semibold hover:border-gold hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
