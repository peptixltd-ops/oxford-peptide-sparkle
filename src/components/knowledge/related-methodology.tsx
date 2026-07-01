import { Link } from "@tanstack/react-router";

/**
 * Placeholder for methodology cross-links. Consumes methodology guides from
 * the taxonomy when they exist (Release 2). Renders a link to the methodology
 * landing until then.
 */
export function RelatedMethodology({
  slugs = [],
  heading = "Related methodology",
  emptyLabel = "Methodology procedures are populated in a future release.",
}: {
  slugs?: readonly string[];
  heading?: string;
  emptyLabel?: string;
}) {
  return (
    <section
      aria-label={heading}
      className="bg-white border border-navy-deep/10 p-6 md:p-8"
    >
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {heading.toUpperCase()}
      </div>
      {slugs.length === 0 ? (
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
          {slugs.map((s) => (
            <li key={s}>
              <Link
                to="/research-hub/methodology/$slug"
                params={{ slug: s }}
                className="text-navy-deep/85 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
              >
                {s}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
