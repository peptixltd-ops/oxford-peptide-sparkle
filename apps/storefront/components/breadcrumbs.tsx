"use client";
import { Link } from "@/shims/router";
import { SITE_URL } from "@/lib/seo";

export type Crumb = { label: string; to?: string };

/**
 * Reusable breadcrumb trail with BreadcrumbList JSON-LD.
 * Home is prepended automatically. Pass the trail from the current page
 * down to (but not including) the leaf label — the last item is rendered
 * as plain text.
 */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const trail: Crumb[] = [{ label: "Home", to: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.to ? { item: `${SITE_URL}${c.to}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="container-x pt-5 pb-2">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        {trail.map((c, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-1.5">
              {c.to && !isLast ? (
                <Link to={c.to} className="hover:text-gold focus-visible:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className={isLast ? "text-navy-deep font-medium" : ""}>{c.label}</span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
