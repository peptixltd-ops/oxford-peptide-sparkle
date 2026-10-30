import { products, fromPrice, type Product } from "@/lib/products";

/**
 * Suggestions are capped so the header dropdown stays scannable.
 */
export const MAX_SEARCH_SUGGESTIONS = 8;

/**
 * Lowercase and drop the separators that make catalogue names hard to type:
 * 'TB-500' and 'tb 500' both become 'tb500', so a shopper can search either way.
 */
export const normalizeProductTerm = (value: string) =>
  value.toLowerCase().replace(/[\s\-_./]+/g, "");

/**
 * Match products whose name (or catalogue slug, e.g. 'reta' for the product
 * shown as RT GLP) contains the typed text, ignoring case, hyphens and spaces.
 * Closer matches are offered first: names that start with the text, then names
 * that merely contain it, then the same two passes over the slug; within each
 * pass the shorter, more exact name wins. Returns at most `limit` products.
 */
export function searchProductSuggestions(
  query: string,
  limit = MAX_SEARCH_SUGGESTIONS,
): Product[] {
  const term = normalizeProductTerm(query);
  if (!term) return [];

  const tiers: Product[][] = [[], [], [], []];
  for (const p of products) {
    const name = normalizeProductTerm(p.name);
    const slug = normalizeProductTerm(p.slug);
    if (name.startsWith(term)) tiers[0].push(p);
    else if (name.includes(term)) tiers[1].push(p);
    else if (slug.startsWith(term)) tiers[2].push(p);
    else if (slug.includes(term)) tiers[3].push(p);
  }

  const byCloseness = (a: Product, b: Product) =>
    normalizeProductTerm(a.name).length - normalizeProductTerm(b.name).length;

  return tiers
    .flatMap((tier) => [...tier].sort(byCloseness))
    .slice(0, limit);
}

/** Price wording that mirrors the shop grid cards. */
export const suggestionPriceLabel = (p: Product) =>
  p.variants.length > 1 ? `from £${fromPrice(p)}` : `£${p.variants[0].price}`;
