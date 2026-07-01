import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  researchCategories,
  glossaryTerms,
  type ResearchCategoryId,
} from "@/lib/taxonomy";
import {
  getEntity,
  getAncestors,
  getChildren,
  getSiblings,
  getRelated,
  getRecentlyUpdated,
  getMostReferenced,
  getFoundational,
  type EntityRef,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

type SidebarBlock =
  | "category-tree"
  | "parent"
  | "children"
  | "siblings"
  | "related"
  | "recent"
  | "most-referenced"
  | "foundational"
  | "related-guides"   // legacy
  | "recent-guides"    // legacy
  | "popular-guides"   // legacy
  | "glossary"
  | "methodology";

interface Props {
  /** Highlights the active category in the tree. */
  activeCategoryId?: ResearchCategoryId;
  /** Anchor entity — powers parent/children/siblings/related blocks. */
  entityRef?: EntityRef;
  /** Which blocks to render (in order). Defaults to a sensible set. */
  blocks?: readonly SidebarBlock[];
  /** Legacy alias for the anchor category id. */
  scopeCategoryId?: ResearchCategoryId;
  className?: string;
}

const DEFAULT_BLOCKS: readonly SidebarBlock[] = [
  "category-tree",
  "parent",
  "children",
  "siblings",
  "related",
  "foundational",
  "recent",
  "most-referenced",
  "glossary",
  "methodology",
];

/**
 * Knowledge sidebar — Release 3.0.
 *
 * Every dataset is derived from the Knowledge Graph. Empty blocks are
 * hidden rather than showing "coming soon" placeholders, so pages with
 * sparse relationships don't get a wall of empty cards.
 */
export function ResearchSidebar({
  activeCategoryId,
  entityRef,
  blocks = DEFAULT_BLOCKS,
  scopeCategoryId,
  className = "",
}: Props) {
  const anchor: EntityRef | undefined =
    entityRef ??
    (scopeCategoryId ? { type: "category", slug: scopeCategoryId } : undefined);

  const methodologyCategory = researchCategories.find((c) => c.id === "methodology");

  const parent = anchor ? getAncestors(anchor).slice(-1)[0] : undefined;
  const children = anchor ? getChildren(anchor) : [];
  const siblings = anchor ? getSiblings(anchor) : [];
  const related = anchor ? getRelated(anchor, { limit: 8 }) : [];
  const foundational = getFoundational(4);
  const recent = getRecentlyUpdated({ limit: 4 });
  const mostReferenced = getMostReferenced({ limit: 5 });

  const sections: Array<{ key: SidebarBlock; node: ReactNode }> = [];

  if (blocks.includes("category-tree")) {
    sections.push({
      key: "category-tree",
      node: (
        <SidebarSection title="Category">
          <ul className="space-y-1.5">
            {researchCategories.map((c) => {
              const active = c.id === activeCategoryId;
              return (
                <li key={c.id}>
                  <Link
                    to={c.path}
                    className={`inline-flex items-center gap-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-gold ${
                      active
                        ? "text-gold font-semibold"
                        : "text-navy-deep/80 hover:text-gold"
                    }`}
                  >
                    <c.icon className="w-3.5 h-3.5" aria-hidden="true" />
                    {c.short}
                    {!c.populated && (
                      <span className="text-[9px] font-bold tracking-widest text-muted-foreground border border-navy-deep/15 px-1 py-0.5 ml-1">
                        SOON
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("parent") && parent) {
    sections.push({
      key: "parent",
      node: (
        <SidebarSection title="Parent topic">
          <EntityLink e={parent} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("children") && children.length > 0) {
    sections.push({
      key: "children",
      node: (
        <SidebarSection title="Sub-topics">
          <EntityList items={children} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("siblings") && siblings.length > 0) {
    sections.push({
      key: "siblings",
      node: (
        <SidebarSection title="Related in this category">
          <EntityList items={siblings.slice(0, 6)} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("related") && related.length > 0) {
    sections.push({
      key: "related",
      node: (
        <SidebarSection title="Related entities">
          <EntityList items={related} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("foundational") && foundational.length > 0) {
    sections.push({
      key: "foundational",
      node: (
        <SidebarSection title="Foundational concepts">
          <EntityList items={foundational} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("recent") && recent.length > 0) {
    sections.push({
      key: "recent",
      node: (
        <SidebarSection title="Recently updated">
          <EntityList items={recent} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("most-referenced") && mostReferenced.length > 0) {
    sections.push({
      key: "most-referenced",
      node: (
        <SidebarSection title="Most referenced">
          <EntityList items={mostReferenced} />
        </SidebarSection>
      ),
    });
  }

  if (blocks.includes("glossary")) {
    if (glossaryTerms.length > 0) {
      sections.push({
        key: "glossary",
        node: (
          <SidebarSection title="Glossary">
            <ul className="space-y-1.5">
              {glossaryTerms.slice(0, 6).map((t) => (
                <li key={t.slug}>
                  <Link
                    to="/research-hub/glossary/$slug"
                    params={{ slug: t.slug }}
                    className="text-navy-deep/80 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    {t.term}
                  </Link>
                </li>
              ))}
            </ul>
          </SidebarSection>
        ),
      });
    }
  }

  if (blocks.includes("methodology") && methodologyCategory) {
    sections.push({
      key: "methodology",
      node: (
        <SidebarSection title="Laboratory methodology">
          <Link
            to={methodologyCategory.path}
            className="text-navy-deep/80 hover:text-gold transition-colors inline-flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-gold"
          >
            <methodologyCategory.icon className="w-3.5 h-3.5" aria-hidden="true" />
            Browse methodology
          </Link>
          <p className="text-xs text-muted-foreground mt-2 leading-snug">
            Reconstitution, storage, HPLC purity and mass spectrometry procedures.
          </p>
        </SidebarSection>
      ),
    });
  }

  if (sections.length === 0) return null;

  return (
    <aside
      aria-label="Research navigation"
      className={`space-y-6 text-sm ${className}`}
    >
      {sections.map((s) => (
        <div key={s.key}>{s.node}</div>
      ))}
    </aside>
  );
}

function SidebarSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-white border border-navy-deep/10 p-5">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

function EntityLink({ e }: { e: KnowledgeEntity }) {
  if (!e.path) {
    return (
      <span className="text-navy-deep/70 text-sm">{e.title}</span>
    );
  }
  return (
    <Link
      to={e.path}
      className="text-sm text-navy-deep/85 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
    >
      {e.title}
    </Link>
  );
}

function EntityList({ items }: { items: readonly KnowledgeEntity[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((e) => (
        <li key={`${e.type}-${e.slug}`}>
          <EntityLink e={e} />
        </li>
      ))}
    </ul>
  );
}
