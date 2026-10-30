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
 * Match products whose name contains the typed text, ignoring case, hyphens and
 * spaces. Names that start with the text are offered first, then the rest, and
 * each group keeps catalogue order. Returns at most `limit` products.
 */
export function searchProductSuggestions(
  query: string,
  limit = MAX_SEARCH_SUGGESTIONS,
): Product[] {
  const term = normalizeProductTerm(query);
  if (!term) return [];

  const starts: Product[] = [];
  const contains: Product[] = [];
  for (const p of products) {
    const name = normalizeProductTerm(p.name);
    if (name.startsWith(term)) starts.push(p);
    else if (name.includes(term)) contains.push(p);
  }

  return [...starts, ...contains].slice(0, limit);
}

/** Price wording that mirrors the shop grid cards. */
export const suggestionPriceLabel = (p: Product) =>
  p.variants.length > 1 ? `from £${fromPrice(p)}` : `£${p.variants[0].price}`;
