// Central SEO helper — emits canonical, og:*, twitter:*, and optional noindex.
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
  return {
    meta,
    links: [{ rel: "canonical", href: url }],
  };
}
