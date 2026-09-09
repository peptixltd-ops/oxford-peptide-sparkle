import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import { allLearningJourneys } from "@/lib/knowledge-explorer";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/explore/pathways/")({
  head: () =>
    seo({
      path: "/explore/pathways",
      title: "Learning Journeys — Guided Peptide Reading Paths | Oxford Research Peptides",
      description:
        "Structured educational journeys through the Oxford Research Peptides Knowledge Graph — beginner, intermediate, advanced, compound- and mechanism-focused.",
    }),
  component: PathwaysIndex,
});

function PathwaysIndex() {
  const journeys = allLearningJourneys();
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Explore", to: "/explore" }, { label: "Learning Journeys" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-12">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              LEARNING JOURNEYS
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium mb-3">
              Six reading paths through the Knowledge Graph
            </h1>
            <p className="text-bone/75 max-w-2xl leading-relaxed">
              Each journey is generated automatically from the graph — pick the audience closest
              to your work and follow a curated sequence of guides, mechanisms and methodology.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x">
            <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {journeys.map((j) => (
                <li key={j.type}>
                  <Link
                    to="/explore/pathways/$type"
                    params={{ type: j.type }}
                    className="group block h-full p-6 bg-white border border-navy-deep/10 hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-muted-foreground mb-2">
                      {j.audience.toUpperCase()}
                    </div>
                    <div className="font-display text-xl font-semibold group-hover:text-gold">
                      {j.title}
                    </div>
                    <p className="text-sm text-navy-deep/70 mt-2 leading-snug">{j.description}</p>
                    <div className="mt-5 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>{j.steps.length} steps · ~{j.minutes} min</span>
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
