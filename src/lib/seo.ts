// Central SEO helper — emits canonical, og:*, twitter:*, JSON-LD, and optional noindex.
// Every leaf route should call this from head() to guarantee consistent metadata.

export const SITE_URL = "https://oxfordresearchpeptides.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export type SeoOptions = {
  path: string;
  title: string;
  description: string;
  ogType?: "website" | "article" | "product";
  ogImage?: string;
  noindex?: boolean;
  /** JSON-LD objects to emit as <script type="application/ld+json"> tags. */
  jsonLd?: readonly Record<string, unknown>[];
};

export function seo(opts: SeoOptions) {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.ogImage ?? DEFAULT_OG_IMAGE;
  const meta: Array<Record<string, string>> = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
    { name: "twitter:image", content: image },
  ];
  if (opts.noindex) {
    meta.push({ name: "robots", content: "noindex, nofollow" });
  }
  const scripts = (opts.jsonLd ?? []).map((obj) => ({
    type: "application/ld+json",
    children: JSON.stringify(obj),
  }));
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
    ...(scripts.length ? { scripts } : {}),
  };
}

// ---------------------------------------------------------------------------
// JSON-LD builders — small helpers so route heads stay declarative.
// ---------------------------------------------------------------------------

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Oxford Research Peptides",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
} as const;

export function breadcrumbLd(
  items: readonly { name: string; path?: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      ...(it.path ? { item: `${SITE_URL}${it.path}` } : {}),
    })),
  };
}

export interface ArticleLdOpts {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  reviewerName?: string;
  image?: string;
}

export function articleLd(opts: ArticleLdOpts): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${opts.path}` },
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    author: { "@type": "Person", name: opts.authorName },
    ...(opts.reviewerName
      ? { reviewedBy: { "@type": "Person", name: opts.reviewerName } }
      : {}),
    publisher: ORGANIZATION_LD,
    image: opts.image ?? DEFAULT_OG_IMAGE,
  };
}

export interface ChemicalSubstanceLdOpts {
  path: string;
  name: string;
  alternateName?: readonly string[];
  description: string;
  molecularFormula?: string;
  molecularWeight?: string;
  identifier?: readonly { propertyID: string; value: string }[];
}

export function chemicalSubstanceLd(
  opts: ChemicalSubstanceLdOpts,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ChemicalSubstance",
    "@id": `${SITE_URL}${opts.path}`,
    name: opts.name,
    ...(opts.alternateName?.length ? { alternateName: opts.alternateName } : {}),
    description: opts.description,
    ...(opts.molecularFormula ? { molecularFormula: opts.molecularFormula } : {}),
    ...(opts.molecularWeight
      ? { molecularWeight: { "@type": "QuantitativeValue", value: opts.molecularWeight, unitText: "g/mol" } }
      : {}),
    ...(opts.identifier?.length
      ? {
          identifier: opts.identifier.map((id) => ({
            "@type": "PropertyValue",
            propertyID: id.propertyID,
            value: id.value,
          })),
        }
      : {}),
  };
}

export function faqLd(
  items: readonly { question: string; answer: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
