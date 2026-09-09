import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";
import { listProgrammeViews } from "@/lib/programmes";

const path = "/research-hub/programmes";

export const Route = createFileRoute("/research-hub/programmes/")({
  head: () =>
    seo({
      path,
      title: "Scientific Research Programmes — Oxford Research Peptides",
      description:
        "Overview of the five research programmes covered by Oxford Research Peptides: Incretin Biology, Tissue Repair, Growth Hormone Axis, Cognitive Peptides, and Longevity & Mitochondrial Biology.",
      jsonLd: [
        aboutPageLd(
          path,
          "Scientific Research Programmes",
          "Research programme index covering incretin biology, tissue repair, growth hormone axis, cognitive peptides, and longevity & mitochondrial biology.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Hub", path: "/research-hub" },
          { name: "Programmes", path },
        ]),
      ],
    }),
  component: ProgrammesIndexPage,
});

function ProgrammesIndexPage() {
  const views = listProgrammeViews();
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Research Hub", to: "/research-hub" }, { label: "Programmes" }]} />
      <main id="main-content" className="container-x py-10 max-w-5xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          SCIENTIFIC PROGRAMMES
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">Research Programmes</h1>
        <p className="mt-3 max-w-3xl text-[15px] text-navy-deep/80">
          Five overarching scientific programmes that organise the compounds, mechanisms, literature
          and methodology already published in the Research Hub. Each programme page is derived from
          the Knowledge Graph — nothing here duplicates educational content.
        </p>

        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {views.map((v) => (
            <li key={v.programme.slug}>
              <Link
                to="/research-hub/programmes/$slug"
                params={{ slug: v.programme.slug }}
                className="block rounded-sm border border-navy-deep/15 bg-white p-5 hover:border-gold"
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  {v.programme.eyebrow}
                </div>
                <div className="mt-1 font-display text-xl">{v.programme.title}</div>
                <p className="mt-2 text-sm text-navy-deep/75">{v.programme.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-navy-deep/60">
                  <span>{v.compounds.length} compounds</span>
                  <span>· {v.mechanisms.length} mechanisms</span>
                  <span>· {v.studies.length} studies</span>
                  <span>· {v.glossary.length} glossary</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
