import { Link } from "@tanstack/react-router";
import { getEntity, getRelated, type EntityRef } from "@/lib/knowledge-graph";

interface MethodologyLike {
  slug: string;
  title: string;
}

/**
 * Methodology cross-links. Consumes the Knowledge Graph when an `entityRef`
 * is supplied; falls back to an explicit list of methodology slugs for
 * legacy call sites. Hides when empty unless `emptyLabel` is set.
 */
export function RelatedMethodology({
  entityRef,
  slugs,
  heading = "Related methodology",
  emptyLabel,
  limit = 6,
}: {
  entityRef?: EntityRef;
  slugs?: readonly string[];
  heading?: string;
  emptyLabel?: string;
  limit?: number;
}) {
  let list: MethodologyLike[] = [];

  if (entityRef) {
    list = getRelated(entityRef, { type: "methodology", limit }).map((e) => ({
      slug: e.slug,
      title: e.title,
    }));
  } else if (slugs && slugs.length) {
    list = slugs
      .map((slug) => {
        const entity = getEntity({ type: "methodology", slug });
        return { slug, title: entity?.title ?? slug };
      });
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
        <div className="text-sm text-muted-foreground">
          <p className="italic mb-3">{emptyLabel}</p>
          <Link
            to="/research-hub/methodology"
            className="inline-block px-4 py-2 border border-navy-deep text-navy-deep text-[10px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            BROWSE METHODOLOGY
          </Link>
        </div>
      ) : (
        <ul className="space-y-2 text-sm">
          {list.map((m) => (
            <li key={m.slug}>
              <Link
                to="/research-hub/methodology/$slug"
                params={{ slug: m.slug }}
                className="text-navy-deep/85 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                {m.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
