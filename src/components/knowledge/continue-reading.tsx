import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import {
  guidesInCategory,
  researchCategories,
  type ResearchCategoryId,
} from "@/lib/taxonomy";
import {
  getRelated,
  getRecentlyUpdated,
  type EntityRef,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

interface Item {
  slug: string;
  title: string;
  summary?: string;
  path?: string;
}

/**
 * "Continue reading" — data-driven successor list.
 *
 * Order of preference:
 *   1. Explicit `items` prop.
 *   2. Related guides from the Knowledge Graph, anchored on `entityRef`.
 *   3. Guides in the given `categoryId` (taxonomy fallback).
 *   4. Recently-updated guides across the graph.
 *   5. Top-level categories as a last-resort call to action.
 */
export function ContinueReading({
  entityRef,
  categoryId,
  items,
  heading = "Continue reading",
}: {
  entityRef?: EntityRef;
  categoryId?: ResearchCategoryId;
  items?: readonly Item[];
  heading?: string;
}) {
  const resolved = resolveItems({ entityRef, categoryId, items });

  return (
    <section
      aria-label={heading}
      className="bg-navy-deep text-bone p-6 md:p-8"
    >
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {heading.toUpperCase()}
      </div>

      {resolved.length > 0 ? (
        <ul className="grid sm:grid-cols-2 gap-3">
          {resolved.slice(0, 4).map((g) => (
            <li key={`${g.path ?? g.slug}`}>
              {g.path ? (
                <Link
                  to={g.path}
                  className="block p-4 border border-white/15 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <div className="font-display text-sm font-semibold leading-tight">{g.title}</div>
                  {g.summary && (
                    <p className="text-xs text-bone/70 mt-1.5 leading-snug">{g.summary}</p>
                  )}
                </Link>
              ) : (
                <div className="block p-4 border border-white/15">
                  <div className="font-display text-sm font-semibold leading-tight">{g.title}</div>
                </div>
              )}
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

function resolveItems({
  entityRef,
  categoryId,
  items,
}: {
  entityRef?: EntityRef;
  categoryId?: ResearchCategoryId;
  items?: readonly Item[];
}): Item[] {
  if (items?.length) return [...items];

  if (entityRef) {
    const related = getRelated(entityRef, { type: "guide", limit: 4 }).map(entityToItem);
    if (related.length) return related;
  }

  if (categoryId) {
    const cat = guidesInCategory(categoryId);
    if (cat.length) {
      return cat.map((g) => ({
        slug: g.slug,
        title: g.title,
        summary: g.summary,
        path: `/research-hub/guides/${g.slug}`,
      }));
    }
  }

  const recent = getRecentlyUpdated({ type: "guide", limit: 4 });
  if (recent.length) return recent.map(entityToItem);

  return [];
}

function entityToItem(e: KnowledgeEntity): Item {
  return { slug: e.slug, title: e.title, summary: e.description, path: e.path };
}
