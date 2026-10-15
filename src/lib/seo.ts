// Central SEO helper — emits canonical, og:*, twitter:*, JSON-LD, and optional noindex.
// Every leaf route should call this from head() to guarantee consistent metadata.
import { SEO_METADATA } from "./seo-metadata";

const BRAND_SUFFIX = " | Oxford Research Peptides";
export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 155;

function fitWords(text: string, limit: number): string {
  if (text.length <= limit) return text;
  const prefix = text.slice(0, limit + 1);
  const boundary = prefix.lastIndexOf(" ");
  return (boundary > 0 ? prefix.slice(0, boundary) : text.slice(0, limit))
    .replace(/[\s,;:—|/-]+$/, "");
}

/** Metadata-only normalization: never mutate the visible content registries. */
export function seoText(path: string, originalTitle: string, originalDescription: string) {
  const editorial = SEO_METADATA[path.replace(/\/$/, "") || "/"];
  const topic = (editorial?.topic ?? originalTitle
    .replace(/\s*[—|]\s*Oxford Research Peptides.*$/, "")
    .replace(/\s*—\s*(Research Guide|Literature Review|Research Programme|Study Collection|Compound Reference|Glossary|Comparison|Mechanism|Laboratory Methodology|Peptide Research Reading Path)$/, ""))
    .replace(/\s+/g, " ").trim();
  const title = `${fitWords(topic, TITLE_LIMIT - BRAND_SUFFIX.length)}${BRAND_SUFFIX}`;
  const source = (editorial?.description ?? originalDescription).replace(/\s+/g, " ").trim();
  let description = source;
  if (source.length > DESCRIPTION_LIMIT) {
    // Reserve the explicit restriction rather than losing it at the end of a long summary.
    const restriction = /(?:research[ -]use[ -]only|(?:laboratory|in[ -]vitro).*research only|not for human consumption)/i.test(originalDescription)
      ? " For laboratory research only." : "";
    description = `${fitWords(source, DESCRIPTION_LIMIT - restriction.length - 1).replace(/[.!?]+$/, "")}.${restriction}`;
  }
  return { title, description };
}

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
  const { title, description } = seoText(opts.path, opts.title, opts.description);
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.ogImage ?? DEFAULT_OG_IMAGE;
  const meta: Array<Record<string, string>> = [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:type", content: opts.ogType ?? "website" },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
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

export interface DefinedTermLdOpts {
  path: string;
  name: string;
  description: string;
  termCode?: string;
  inDefinedTermSet?: string;
  sameAs?: readonly string[];
}

/**
 * Emits a schema.org DefinedTerm for glossary / receptor / concept pages.
 * Helps AI search engines model page content as a named entity.
 */
export function definedTermLd(
  opts: DefinedTermLdOpts,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `${SITE_URL}${opts.path}#term`,
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    ...(opts.termCode ? { termCode: opts.termCode } : {}),
    ...(opts.inDefinedTermSet
      ? {
          inDefinedTermSet: {
            "@type": "DefinedTermSet",
            name: opts.inDefinedTermSet,
          },
        }
      : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
  };
}

// ---------------------------------------------------------------------------
// Trust / EEAT schema helpers — Person, AboutPage, WebPage, MedicalWebPage.
// ---------------------------------------------------------------------------

export interface PersonLdOpts {
  name: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  sameAs?: readonly string[];
  affiliation?: string;
}

export function personLd(opts: PersonLdOpts): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: opts.name,
    ...(opts.jobTitle ? { jobTitle: opts.jobTitle } : {}),
    ...(opts.description ? { description: opts.description } : {}),
    ...(opts.url ? { url: opts.url } : {}),
    ...(opts.sameAs?.length ? { sameAs: opts.sameAs } : {}),
    ...(opts.affiliation
      ? { affiliation: { "@type": "Organization", name: opts.affiliation } }
      : {}),
  };
}

export function aboutPageLd(path: string, name: string, description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: ORGANIZATION_LD,
  };
}

export function webPageLd(path: string, name: string, description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    isPartOf: ORGANIZATION_LD,
  };
}

export function medicalWebPageLd(
  path: string,
  name: string,
  description: string,
  aspect: string = "ResearchAspect",
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${SITE_URL}${path}`,
    url: `${SITE_URL}${path}`,
    name,
    description,
    aspect,
    isPartOf: ORGANIZATION_LD,
  };
}

