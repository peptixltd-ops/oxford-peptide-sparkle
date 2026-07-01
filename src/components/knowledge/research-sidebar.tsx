import { Link } from "@tanstack/react-router";
import {
  researchCategories,
  guidesInCategory,
  glossaryTerms,
  type ResearchCategoryId,
} from "@/lib/taxonomy";

type SidebarBlock =
  | "category-tree"
  | "related-guides"
  | "recent-guides"
  | "popular-guides"
  | "glossary"
  | "methodology";

interface Props {
  /** Highlights the active category in the tree. */
  activeCategoryId?: ResearchCategoryId;
  /** Which blocks to render (in order). Defaults to all. */
  blocks?: readonly SidebarBlock[];
  /** Restrict related/recent/popular blocks to this category when provided. */
  scopeCategoryId?: ResearchCategoryId;
  className?: string;
}

const ALL_BLOCKS: readonly SidebarBlock[] = [
  "category-tree",
  "related-guides",
  "recent-guides",
  "popular-guides",
  "glossary",
  "methodology",
];

/**
 * Reusable Research Hub sidebar.
 *
 * Purely structural — every dataset it renders is derived from the taxonomy.
 * Empty states are labelled "Coming soon" instead of hidden so the layout is
 * stable while Release 2 populates the content.
 */
export function ResearchSidebar({
  activeCategoryId,
  blocks = ALL_BLOCKS,
  scopeCategoryId,
  className = "",
}: Props) {
  const methodologyCategory = researchCategories.find((c) => c.id === "methodology");

  return (
    <aside
      aria-label="Research navigation"
      className={`space-y-6 text-sm ${className}`}
    >
      {blocks.includes("category-tree") && (
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
      )}

      {blocks.includes("related-guides") && (
        <SidebarSection title="Related guides">
          <GuideList categoryId={scopeCategoryId} label="related" />
        </SidebarSection>
      )}

      {blocks.includes("recent-guides") && (
        <SidebarSection title="Recent guides">
          <GuideList categoryId={scopeCategoryId} label="recent" />
        </SidebarSection>
      )}

      {blocks.includes("popular-guides") && (
        <SidebarSection title="Popular guides">
          <GuideList categoryId={scopeCategoryId} label="popular" />
        </SidebarSection>
      )}

      {blocks.includes("glossary") && (
        <SidebarSection title="Glossary">
          {glossaryTerms.length === 0 ? (
            <EmptyRow label="Glossary populated in Release 2." />
          ) : (
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
          )}
        </SidebarSection>
      )}

      {blocks.includes("methodology") && methodologyCategory && (
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
      )}
    </aside>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-navy-deep/10 p-5">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
        {title.toUpperCase()}
      </div>
      {children}
    </div>
  );
}

function EmptyRow({ label }: { label: string }) {
  return <div className="text-xs text-muted-foreground italic">{label}</div>;
}

function GuideList({
  categoryId,
  label,
}: {
  categoryId?: ResearchCategoryId;
  label: "related" | "recent" | "popular";
}) {
  const list = categoryId ? guidesInCategory(categoryId) : [];
  if (list.length === 0) {
    return <EmptyRow label={`No ${label} guides yet — populated in Release 2.`} />;
  }
  return (
    <ul className="space-y-2">
      {list.slice(0, 5).map((g) => (
        <li key={g.slug}>
          <Link
            to="/research-hub/guides/$slug"
            params={{ slug: g.slug }}
            className="text-sm text-navy-deep/85 hover:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
          >
            {g.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
