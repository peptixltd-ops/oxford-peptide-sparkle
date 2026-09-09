import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import {
  compoundExplorer,
  compoundFacets,
  type CompoundFilters,
  type EvidenceLevel,
} from "@/lib/knowledge-explorer";
import type {
  CompoundFamilyId,
  MechanismGroupId,
  ResearchAreaId,
} from "@/lib/taxonomy";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

const searchSchema = z.object({
  familyId: z.string().optional(),
  mechanismId: z.string().optional(),
  areaId: z.string().optional(),
  evidence: z.enum(["authoritative", "reviewed", "scaffolded"]).optional(),
  sort: z.enum(["popularity", "az", "recent"]).optional(),
});

export const Route = createFileRoute("/explore/compounds")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () =>
    seo({
      path: "/explore/compounds",
      title: "Compound Explorer — Filter Peptides by Mechanism | Oxford Research Peptides",
      description:
        "Explore research peptides by compound family, receptor mechanism, evidence level and research application. Powered by the Oxford Research Peptides Knowledge Graph.",
    }),
  component: CompoundExplorerPage,
});

function CompoundExplorerPage() {
  const search = Route.useSearch();
  const filters: CompoundFilters = {
    familyId: search.familyId as CompoundFamilyId | undefined,
    mechanismId: search.mechanismId as MechanismGroupId | undefined,
    areaId: search.areaId as ResearchAreaId | undefined,
    evidence: search.evidence as EvidenceLevel | undefined,
    sort: search.sort,
  };
  const rows = compoundExplorer(filters);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Compounds" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-12">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              COMPOUND EXPLORER
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-3">
              Browse peptides by mechanism, family and evidence
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">
              Filter the compound catalogue by structural family, receptor target, research
              application and how well each entry is currently populated in the Knowledge Graph.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-x grid lg:grid-cols-[280px_1fr] gap-8">
            <aside aria-label="Compound filters" className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gold">
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                FILTERS
              </div>

              <FacetGroup
                label="Family"
                paramKey="familyId"
                current={search.familyId}
                options={compoundFacets.families.map((f) => ({ id: f.id, label: f.label }))}
              />
              <FacetGroup
                label="Mechanism / Receptor"
                paramKey="mechanismId"
                current={search.mechanismId}
                options={compoundFacets.mechanisms.map((m) => ({ id: m.id, label: m.label }))}
              />
              <FacetGroup
                label="Research Application"
                paramKey="areaId"
                current={search.areaId}
                options={compoundFacets.areas.map((a) => ({ id: a.id, label: a.label }))}
              />
              <FacetGroup
                label="Evidence Level"
                paramKey="evidence"
                current={search.evidence}
                options={compoundFacets.evidence.map((e) => ({ id: e.id, label: e.label }))}
              />
              <FacetGroup
                label="Sort"
                paramKey="sort"
                current={search.sort ?? "popularity"}
                options={[
                  { id: "popularity", label: "Popularity" },
                  { id: "az", label: "A – Z" },
                  { id: "recent", label: "Recently updated" },
                ]}
              />
              <Link
                to="/explore/compounds"
                search={{}}
                className="inline-block text-[11px] font-bold tracking-widest text-muted-foreground hover:text-navy-deep"
              >
                RESET FILTERS
              </Link>
            </aside>

            <div>
              <div className="text-xs text-muted-foreground mb-3">
                {rows.length} compound{rows.length === 1 ? "" : "s"}
              </div>
              {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No compounds match these filters yet.
                </p>
              ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                  {rows.map((r) => (
                    <li key={r.slug}>
                      <a
                        href={r.path}
                        className="group block h-full p-5 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="font-display text-xl font-semibold group-hover:text-gold">
                              {r.name}
                            </div>
                            {r.aliases?.length ? (
                              <div className="text-[11px] text-muted-foreground">
                                {r.aliases.join(" · ")}
                              </div>
                            ) : null}
                          </div>
                          <EvidenceBadge level={r.evidence} />
                        </div>
                        <ul className="flex flex-wrap gap-1.5 mt-3">
                          {r.mechanismIds.map((m) => (
                            <li
                              key={m}
                              className="text-[10px] font-medium tracking-wide bg-navy-deep/5 text-navy-deep px-2 py-0.5"
                            >
                              {mechanismLabel(m)}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span>
                            {r.guideCount} guide{r.guideCount === 1 ? "" : "s"} · {r.referenceCount} references
                          </span>
                          <ArrowRight
                            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                            aria-hidden="true"
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}

function FacetGroup({
  label,
  paramKey,
  current,
  options,
}: {
  label: string;
  paramKey: string;
  current?: string;
  options: { id: string; label: string }[];
}) {
  return (
    <div>
      <div className="text-[10px] font-bold tracking-widest text-navy-deep mb-2">{label}</div>
      <ul className="space-y-1">
        {options.map((o) => {
          const active = current === o.id;
          return (
            <li key={o.id}>
              <Link
                from="/explore/compounds"
                to="."
                search={(prev: Record<string, unknown>) => ({
                  ...prev,
                  [paramKey]: active ? undefined : o.id,
                })}
                className={`block text-xs px-2 py-1 border transition-colors ${
                  active
                    ? "border-gold bg-gold/10 text-navy-deep"
                    : "border-transparent hover:border-navy-deep/20 text-navy-deep/80"
                }`}
              >
                {o.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  const styles: Record<EvidenceLevel, string> = {
    authoritative: "bg-gold/15 text-navy-deep border-gold/40",
    reviewed: "bg-navy-deep/10 text-navy-deep border-navy-deep/20",
    scaffolded: "bg-muted text-muted-foreground border-navy-deep/10",
  };
  return (
    <span
      className={`shrink-0 text-[9px] font-bold tracking-widest uppercase px-1.5 py-0.5 border ${styles[level]}`}
    >
      {level}
    </span>
  );
}

function mechanismLabel(id: MechanismGroupId): string {
  const f = compoundFacets.mechanisms.find((m) => m.id === id);
  return f?.label ?? id;
}
