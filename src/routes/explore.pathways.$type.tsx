import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntityGraph } from "@/components/knowledge/entity-graph";
import { seo } from "@/lib/seo";
import {
  allPathwayTypes,
  getLearningJourney,
} from "@/lib/knowledge-explorer";
import type { PathwayType } from "@/lib/knowledge-graph";
import { ArrowRight, ChevronRight } from "lucide-react";

const VALID = new Set<string>(allPathwayTypes());

export const Route = createFileRoute("/explore/pathways/$type")({
  loader: ({ params }) => {
    if (!VALID.has(params.type)) throw notFound();
    return { type: params.type as PathwayType };
  },
  head: ({ params }) => {
    const type = params.type as PathwayType;
    if (!VALID.has(type)) {
      return seo({
        path: `/explore/pathways/${params.type}`,
        title: "Learning journey not found — Oxford Research Peptides",
        description: "This learning journey does not exist.",
        noindex: true,
      });
    }
    const j = getLearningJourney(type);
    return seo({
      path: `/explore/pathways/${type}`,
      title: `${j.title} — Peptide Research Reading Path | Oxford Research Peptides`,
      description: j.description,
    });
  },
  notFoundComponent: JourneyNotFound,
  component: JourneyDetail,
});

function JourneyDetail() {
  const { type } = Route.useLoaderData();
  const journey = getLearningJourney(type);
  const anchor = journey.steps[0];

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Explore", to: "/explore" },
          { label: "Learning Journeys", to: "/explore/pathways" },
          { label: journey.title },
        ]}
      />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-12">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              LEARNING JOURNEY
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-3">{journey.title}</h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">{journey.description}</p>
            <div className="mt-4 text-xs text-bone/70">
              {journey.audience} · {journey.steps.length} steps · ~{journey.minutes} min
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container-x">
            <ol className="space-y-3">
              {journey.steps.map((step, i) => {
                const inner = (
                  <div className="flex items-start gap-4 p-5 bg-white border border-navy-deep/10 group-hover:border-gold transition-colors">
                    <div className="text-[10px] font-bold tracking-widest text-muted-foreground min-w-[3rem]">
                      STEP {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">
                        {step.type.replace(/-/g, " ")}
                      </div>
                      <div className="font-display text-lg font-semibold group-hover:text-gold transition-colors">
                        {step.title}
                      </div>
                      {step.description && (
                        <p className="text-sm text-navy-deep/70 leading-snug mt-1.5">
                          {step.description}
                        </p>
                      )}
                    </div>
                    <ChevronRight
                      className="w-4 h-4 text-muted-foreground shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                );
                return (
                  <li key={`${step.type}-${step.slug}`}>
                    {step.path ? (
                      <a href={step.path} className="group block focus-visible:outline-2 focus-visible:outline-gold">
                        {inner}
                      </a>
                    ) : (
                      <div className="group">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>

        {anchor ? (
          <section className="pb-12">
            <div className="container-x">
              <EntityGraph
                title="Journey graph — how this path connects"
                anchor={{ type: anchor.type, slug: anchor.slug }}
              />
            </div>
          </section>
        ) : null}

        <section className="pb-16">
          <div className="container-x">
            <Link
              to="/explore/pathways"
              className="text-xs font-bold tracking-widest hover:text-gold inline-flex items-center gap-1"
            >
              ALL JOURNEYS <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}

function JourneyNotFound() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Explore", to: "/explore" },
          { label: "Learning Journeys", to: "/explore/pathways" },
          { label: "Not found" },
        ]}
      />
      <main id="main-content" className="container-x py-16">
        <h1 className="font-display text-3xl font-medium mb-3">Learning journey not found</h1>
        <p className="text-sm text-muted-foreground mb-6">
          The pathway you requested does not exist.
        </p>
        <Link
          to="/explore/pathways"
          className="text-xs font-bold tracking-widest hover:text-gold inline-flex items-center gap-1"
        >
          BROWSE ALL JOURNEYS <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
