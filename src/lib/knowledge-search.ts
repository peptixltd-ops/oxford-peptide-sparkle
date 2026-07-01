/**
 * Search architecture for the Research Hub.
 *
 * Release 1.2 ships ONLY the type contracts and a client-side in-memory
 * adapter that reads from the taxonomy. Release 2 can swap the adapter for
 * a real index (MiniSearch, Algolia, edge search) without touching the UI.
 */
import {
  guides,
  compoundEntries,
  glossaryTerms,
  mechanismGroups,
  researchCategories,
  type Guide,
  type CompoundEntry,
  type GlossaryTerm,
  type MechanismGroup,
  type ResearchCategory,
} from "./taxonomy";

export type KnowledgeResultKind =
  | "guide"
  | "compound"
  | "mechanism"
  | "glossary"
  | "methodology"
  | "category";

export interface KnowledgeSearchResult {
  id: string;
  kind: KnowledgeResultKind;
  title: string;
  summary?: string;
  href: string;
  populated: boolean;
}

export interface KnowledgeSearchQuery {
  q: string;
  kinds?: readonly KnowledgeResultKind[];
  limit?: number;
}

export interface KnowledgeSearchAdapter {
  search(query: KnowledgeSearchQuery): Promise<KnowledgeSearchResult[]>;
}

// --- default in-memory adapter (placeholder) ---------------------------------

const norm = (s: string) => s.toLowerCase().trim();

function fromGuide(g: Guide): KnowledgeSearchResult {
  return {
    id: `guide:${g.slug}`,
    kind: "guide",
    title: g.title,
    summary: g.summary,
    href: `/research-hub/guides/${g.slug}`,
    populated: g.populated,
  };
}
function fromCompound(c: CompoundEntry): KnowledgeSearchResult {
  return {
    id: `compound:${c.slug}`,
    kind: "compound",
    title: c.name,
    summary: c.aliases?.join(", "),
    href: `/compounds/${c.slug}`,
    populated: c.populated,
  };
}
function fromMechanism(m: MechanismGroup): KnowledgeSearchResult {
  return {
    id: `mechanism:${m.id}`,
    kind: "mechanism",
    title: m.label,
    summary: m.description,
    href: `/research-hub/mechanisms/${m.id}`,
    populated: false,
  };
}
function fromGlossary(t: GlossaryTerm): KnowledgeSearchResult {
  return {
    id: `glossary:${t.slug}`,
    kind: "glossary",
    title: t.term,
    summary: t.short,
    href: `/research-hub/glossary/${t.slug}`,
    populated: t.populated,
  };
}
function fromCategory(c: ResearchCategory): KnowledgeSearchResult {
  return {
    id: `category:${c.id}`,
    kind: "category",
    title: c.label,
    summary: c.description,
    href: c.path,
    populated: c.populated,
  };
}

export const inMemoryKnowledgeSearch: KnowledgeSearchAdapter = {
  async search({ q, kinds, limit = 20 }) {
    const query = norm(q);
    if (!query) return [];

    const universe: KnowledgeSearchResult[] = [
      ...researchCategories.map(fromCategory),
      ...mechanismGroups.map(fromMechanism),
      ...guides.map(fromGuide),
      ...compoundEntries.map(fromCompound),
      ...glossaryTerms.map(fromGlossary),
    ];

    const filtered = kinds && kinds.length > 0
      ? universe.filter((r) => kinds.includes(r.kind))
      : universe;

    return filtered
      .filter((r) => {
        const hay = `${r.title} ${r.summary ?? ""}`.toLowerCase();
        return hay.includes(query);
      })
      .slice(0, limit);
  },
};

/** Swap this to change the site-wide search backend in one place. */
export const knowledgeSearch: KnowledgeSearchAdapter = inMemoryKnowledgeSearch;
