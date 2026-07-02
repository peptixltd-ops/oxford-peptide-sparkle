import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import { PUBLICATION_WORKFLOW, REVIEW_CADENCE_MONTHS } from "@/lib/editorial";

export const Route = createFileRoute("/publication-workflow")({
  head: () =>
    seo({
      path: "/publication-workflow",
      title: "Publication Workflow — Oxford Research Peptides",
      description:
        "How every educational page moves from draft to publication and through scheduled review at Oxford Research Peptides: stages, owners and revision history.",
    }),
  component: PublicationWorkflowPage,
});

function PublicationWorkflowPage() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Publication Workflow" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              WORKFLOW
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">
              Publication Workflow
            </h1>
            <p className="mt-4 text-bone/75 text-sm leading-relaxed max-w-2xl">
              The end-to-end path every editorial page takes from draft, through
              independent scientific review, to publication and scheduled
              re-audit.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x max-w-4xl">
            <ol className="space-y-4">
              {PUBLICATION_WORKFLOW.map((s, i) => (
                <li
                  key={s.state}
                  className="border border-navy-deep/10 bg-white p-5 flex gap-5"
                >
                  <div className="text-gold font-display text-3xl w-10 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="font-display text-lg">{s.label}</span>
                      <span className="text-[10px] font-bold tracking-widest text-navy-deep/60 border border-navy-deep/15 px-1.5 py-0.5">
                        {s.owner.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-navy-deep/75 mt-1 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="py-12 border-t border-navy-deep/10">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-2">
              CADENCE
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-4">
              Scheduled review intervals
            </h2>
            <p className="text-sm text-navy-deep/75 max-w-3xl leading-relaxed mb-4">
              Once published, pages return to scientific review at the interval
              defined for their type. Reviewers may bring a review forward when
              new evidence materially changes a claim.
            </p>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              {Object.entries(REVIEW_CADENCE_MONTHS).map(([k, m]) => (
                <li key={k} className="border border-navy-deep/10 bg-white p-3">
                  <div className="text-[10px] font-bold tracking-widest text-gold">
                    {k.toUpperCase()}
                  </div>
                  <div className="mt-1">Every {m} months</div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
