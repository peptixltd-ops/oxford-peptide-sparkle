/** Legacy sale slugs; scientific compound and literature routes are unaffected. */
export const isRetiredProductSlug = (slug: string) =>
  /^(?:orp[-_])?semaglutide(?:[-_].*)?$/i.test(slug);

export function withoutRetiredProducts<T extends { slug: string }>(items: T[]): T[] {
  return items.filter((item) => !isRetiredProductSlug(item.slug));
}