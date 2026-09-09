import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Network, Compass } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { EntityGraph } from "@/components/knowledge/entity-graph";
import { seo } from "@/lib/seo";
import {
  explorerSections,
  allLearningJourneys,
} from "@/lib/knowledge-explorer";
import {
  knowledgeGraph,
  getMostReferenced,
  getRecentlyUpdated,
} from "@/lib/knowledge-graph";

export const Route = createFileRoute("/explore/")({
  head: () =>
    seo({
      path: "/explore",
      title: "Knowledge Explorer — Browse Peptide Research | Oxford Research Peptides",
      description:
        "Explore the Oxford Research Peptides Knowledge Graph — compounds, mechanisms, receptors, methodology, learning journeys and visual entity relationships.",
    }),
  component: ExploreIndex,
});

function ExploreIndex() {
  const sections = explorerSections();
  const journeys = allLearningJourneys().slice(0, 3);
  const featured = getMostReferenced({ limit: 6 });
  const recent = getRecentlyUpdated({ limit: 6 });
  const totalEntities = knowledgeGraph.length;
  const anchor = getMostReferenced({ type: "compound", limit: 1 })[0];

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Explore" }]} />
      <main id="main-content">
        {/* Hero */}
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3 inline-flex items-center gap-2">
              <Compass className="w-3.5 h-3.5" aria-hidden="true" /> KNOWLEDGE EXPLORER
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-4">
              Browse peptide research by relationship, not by search
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">
              Every compound, receptor, mechanism, method and guide on Oxford Research Peptides
              is a node in a single Knowledge Graph. Choose an entry point below and traverse
              its relationships.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 text-xs text-bone/70">
              <Network className="w-4 h-4 text-gold" aria-hidden="true" />
              {totalEntities} entities · {sections.reduce((s, x) => s + x.count, 0)} indexed relationships
            </div>
          </div>
        </section>

        {/* Explorer sections */}
        <section className="py-12">
          <div className="container-x">
            <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">
              BROWSE BY ENTITY
            </div>
            <h2 className="font-display text-3xl font-medium mb-8">
              Choose an entry point
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sections.map((s) => (
                <li key={s.key}>
                  <Link
                    to={s.href}
                    className="group block h-full p-5 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-display text-lg font-semibold group-hover:text-gold transition-colors">
                        {s.title}
                      </div>
                      <span className="text-[10px] font-bold tracking-widest text-muted-foreground border border-navy-deep/15 px-1.5 py-0.5">
                        {s.count}
                      </span>
                    </div>
                    <p className="text-sm text-navy-deep/70 leading-snug mb-4">{s.description}</p>
                    <div className="text-[10px] font-bold tracking-widest inline-flex items-center gap-1 group-hover:text-gold">
                      EXPLORE <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Learning journeys */}
        <section className="pb-12">
          <div className="container-x">
            <div className="flex items-end justify-between mb-6">
              <div>
                <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">
                  LEARNING JOURNEYS
                </div>
                <h2 className="font-display text-3xl font-medium">Follow a reading path</h2>
              </div>
              <Link
                to="/explore/pathways"
                className="text-xs font-bold tracking-widest hover:text-gold inline-flex items-center gap-1"
              >
                ALL JOURNEYS <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <ul className="grid gap-4 md:grid-cols-3">
              {journeys.map((j) => (
                <li key={j.type}>
                  <Link
                    to="/explore/pathways/$type"
                    params={{ type: j.type }}
                    className="group block h-full p-5 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">
                      {j.audience.toUpperCase()}
                    </div>
                    <div className="font-display text-lg font-semibold group-hover:text-gold">
                      {j.title}
                    </div>
                    <p className="text-sm text-navy-deep/70 mt-2 leading-snug">{j.description}</p>
                    <div className="mt-4 text-[11px] text-muted-foreground">
                      {j.steps.length} steps · ~{j.minutes} min
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Visual entity graph for a featured anchor */}
        {anchor ? (
          <section className="pb-12">
            <div className="container-x">
              <div className="text-[11px] font-bold tracking-[0.3em] text-gold mb-3">
                LIVE VISUALISATION
              </div>
              <h2 className="font-display text-3xl font-medium mb-6">
                {anchor.title} — knowledge neighbourhood
              </h2>
              <EntityGraph anchor={{ type: anchor.type, slug: anchor.slug }} />
            </div>
          </section>
        ) : null}

        {/* Most-referenced + recently updated */}
        <section className="pb-16">
          <div className="container-x grid lg:grid-cols-2 gap-6">
            <FeaturedList
              eyebrow="MOST REFERENCED"
              title="High-authority entities"
              items={featured}
            />
            <FeaturedList
              eyebrow="RECENTLY UPDATED"
              title="Freshly reviewed"
              items={recent}
            />
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}

function FeaturedList({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: ReturnType<typeof knowledgeGraph.filter>;
}) {
  return (
    <div className="bg-white border border-navy-deep/10 p-6">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-2">{eyebrow}</div>
      <h3 className="font-display text-xl font-semibold mb-4">{title}</h3>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nothing yet.</p>
      ) : (
        <ul className="divide-y divide-navy-deep/10">
          {items.map((e) => (
            <li key={`${e.type}::${e.slug}`} className="py-2.5">
              {e.path ? (
                <a href={e.path} className="flex items-start justify-between gap-3 group">
                  <div>
                    <div className="text-sm text-navy-deep group-hover:text-gold">{e.title}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {e.type.replace(/-/g, " ")}
                    </div>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                <div className="text-sm text-navy-deep/70">{e.title}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
