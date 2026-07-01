import { Link } from "@tanstack/react-router";
import {
  compoundEntries,
  compoundsInFamily,
  compoundsByMechanism,
  type CompoundEntry,
  type CompoundFamilyId,
  type MechanismGroupId,
} from "@/lib/taxonomy";
import { getRelated, type EntityRef } from "@/lib/knowledge-graph";

interface Props {
  /** Anchor entity — resolves related compounds through the Knowledge Graph. */
  entityRef?: EntityRef;
  familyId?: CompoundFamilyId;
  mechanismId?: MechanismGroupId;
  /** Explicit slug list wins when provided. */
  slugs?: readonly string[];
  heading?: string;
  emptyLabel?: string;
  limit?: number;
}

interface CompoundLike {
  slug: string;
  name: string;
}

export function RelatedCompounds({
  entityRef,
  familyId,
  mechanismId,
  slugs,
  heading = "Related compounds",
  emptyLabel,
  limit = 8,
}: Props) {
  let list: CompoundLike[] = [];

  if (entityRef) {
    list = getRelated(entityRef, { type: "compound", limit }).map((e) => ({
      slug: e.slug,
      name: e.title,
    }));
  } else if (slugs && slugs.length) {
    list = compoundEntries.filter((c) => slugs.includes(c.slug)).map(toCompoundLike);
  } else if (familyId) {
    list = compoundsInFamily(familyId).map(toCompoundLike);
  } else if (mechanismId) {
    list = compoundsByMechanism(mechanismId).map(toCompoundLike);
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

function toCompoundLike(c: CompoundEntry): CompoundLike {
  return { slug: c.slug, name: c.name };
}
