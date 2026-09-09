import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import {
  mechanismExplorer,
  mechanismFacets,
  type MechanismFilters,
} from "@/lib/knowledge-explorer";
import { ArrowRight, SlidersHorizontal } from "lucide-react";
import { compoundEntries } from "@/lib/taxonomy";

const searchSchema = z.object({
  receptorClass: z.enum(["gpcr", "kinase", "other"]).optional(),
  pathway: z.enum(["incretin", "growth", "melanocortin", "repair", "other"]).optional(),
  compoundSlug: z.string().optional(),
});

export const Route = createFileRoute("/explore/mechanisms")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () =>
    seo({
      path: "/explore/mechanisms",
      title: "Mechanism Explorer — Peptide Receptors & Pathways | Oxford Research Peptides",
      description:
        "Browse peptide mechanisms of action by biological pathway, receptor class, related compounds and laboratory methodology.",
    }),
  component: MechanismExplorerPage,
});

function MechanismExplorerPage() {
  const search = Route.useSearch();
  const filters: MechanismFilters = {
    receptorClass: search.receptorClass,
    pathway: search.pathway,
    compoundSlug: search.compoundSlug,
  };
  const rows = mechanismExplorer(filters);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Mechanisms" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-12">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              MECHANISM EXPLORER
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-3">
              Explore peptide mechanisms and receptor pathways
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">
              Filter mechanisms by biological pathway, receptor class or the compounds that engage
              them. Every row links back to its full monograph in the Research Hub.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div className="container-x grid lg:grid-cols-[280px_1fr] gap-8">
            <aside aria-label="Mechanism filters" className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-bold tracking-widest text-gold">
                <SlidersHorizontal className="w-3.5 h-3.5" aria-hidden="true" />
                FILTERS
              </div>

              <FacetGroup
                label="Receptor Class"
                paramKey="receptorClass"
                current={search.receptorClass}
                options={mechanismFacets.receptorClasses.map((r) => ({ id: r.id, label: r.label }))}
              />
              <FacetGroup
                label="Biological Pathway"
                paramKey="pathway"
                current={search.pathway}
                options={mechanismFacets.pathways.map((p) => ({ id: p.id, label: p.label }))}
              />
              <FacetGroup
                label="Related Compound"
                paramKey="compoundSlug"
                current={search.compoundSlug}
                options={compoundEntries.map((c) => ({ id: c.slug, label: c.name }))}
              />
              <Link
                to="/explore/mechanisms"
                search={{}}
                className="inline-block text-[11px] font-bold tracking-widest text-muted-foreground hover:text-navy-deep"
              >
                RESET FILTERS
              </Link>
            </aside>

            <div>
              <div className="text-xs text-muted-foreground mb-3">
                {rows.length} mechanism{rows.length === 1 ? "" : "s"}
              </div>
              {rows.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No mechanisms match these filters.
                </p>
              ) : (
                <ul className="space-y-4">
                  {rows.map((r) => (
                    <li key={r.id}>
                      <a
                        href={r.path}
                        className="group block p-5 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <div className="font-display text-xl font-semibold group-hover:text-gold">
                              {r.label}
                            </div>
                            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                              {r.receptorClass.replace(/^gpcr$/, "GPCR")} · {r.pathway} pathway
                            </div>
                          </div>
                          <ArrowRight
                            className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform mt-2"
                            aria-hidden="true"
                          />
                        </div>
                        <p className="text-sm text-navy-deep/75 leading-snug">{r.description}</p>
                        <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-muted-foreground">
                          <span>{r.compoundSlugs.length} compounds</span>
                          <span>·</span>
                          <span>{r.guideCount} guides</span>
                          {r.methodologySlugs.length > 0 && (
                            <>
                              <span>·</span>
                              <span>{r.methodologySlugs.length} methods</span>
                            </>
                          )}
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
                from="/explore/mechanisms"
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
