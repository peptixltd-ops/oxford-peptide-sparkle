import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";
import { listStudyCollectionViews } from "@/lib/study-collections";

const path = "/research-hub/collections";

export const Route = createFileRoute("/research-hub/collections/")({
  head: () =>
    seo({
      path,
      title: "Study Collections — Oxford Research Peptides",
      description:
        "Umbrella study collections — STEP, SURPASS, SURMOUNT and SUSTAIN — aggregating landmark trial evidence for Semaglutide and Tirzepatide.",
      jsonLd: [
        aboutPageLd(path, "Study Collections", "Umbrella study collections aggregating landmark trials."),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Hub", path: "/research-hub" },
          { name: "Collections", path },
        ]),
      ],
    }),
  component: CollectionsIndexPage,
});

function CollectionsIndexPage() {
  const views = listStudyCollectionViews();
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Research Hub", to: "/research-hub" }, { label: "Collections" }]} />
      <main id="main-content" className="container-x py-10 max-w-5xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          STUDY COLLECTIONS
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Trial Programme Collections</h1>
        <p className="mt-3 max-w-3xl text-[15px] text-navy-deep/80">
          Named clinical trial programmes grouped for cross-study reference. Members are derived
          automatically from the study registry.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {views.map((v) => (
            <li key={v.collection.slug}>
              <Link
                to="/research-hub/collections/$slug"
                params={{ slug: v.collection.slug }}
                className="block rounded-sm border border-navy-deep/15 bg-white p-5 hover:border-gold"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  {v.collection.eyebrow}
                </div>
                <div className="mt-1 font-display text-xl">{v.collection.title}</div>
                <p className="mt-2 text-sm text-navy-deep/75">{v.collection.summary}</p>
                <div className="mt-3 text-[11px] text-navy-deep/60">
                  {v.studies.length} study/ies · {v.comparisons.length} comparisons
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  );
}
