import { Link } from "@tanstack/react-router";
import {
  guidesInCategory,
  guidesByCompound,
  guidesByMechanism,
  type ResearchCategoryId,
  type MechanismGroupId,
} from "@/lib/taxonomy";
import {
  getRelated,
  type EntityRef,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

interface Props {
  /** Anchor entity — resolves related guides through the Knowledge Graph. */
  entityRef?: EntityRef;
  /** Legacy: filter by category. */
  categoryId?: ResearchCategoryId;
  /** Legacy: filter by referenced compound slug. */
  compoundSlug?: string;
  /** Legacy: filter by mechanism group. */
  mechanismId?: MechanismGroupId;
  heading?: string;
  /** Set to render an explicit empty state instead of hiding the section. */
  emptyLabel?: string;
  limit?: number;
}

interface GuideLike {
  slug: string;
  title: string;
  summary?: string;
}

/**
 * Consumes the Knowledge Graph (Release 3.0) with a taxonomy fallback for
 * legacy call sites. Renders nothing when there are no related guides unless
 * an explicit `emptyLabel` is provided.
 */
export function RelatedGuides({
  entityRef,
  categoryId,
  compoundSlug,
  mechanismId,
  heading = "Related guides",
  emptyLabel,
  limit = 6,
}: Props) {
  let list: GuideLike[] = [];

  if (entityRef) {
    list = getRelated(entityRef, { type: "guide", limit }).map(toGuideLike);
  } else if (compoundSlug) {
    list = guidesByCompound(compoundSlug);
  } else if (mechanismId) {
    list = guidesByMechanism(mechanismId);
  } else if (categoryId) {
    list = guidesInCategory(categoryId);
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

function toGuideLike(e: KnowledgeEntity): GuideLike {
  return { slug: e.slug, title: e.title, summary: e.description };
}

// Ensure the `Guide` import is used (satisfy strict TS during noop rebuilds).
export type __GuideAlias = Guide;
