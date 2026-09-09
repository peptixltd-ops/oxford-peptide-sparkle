import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import { EVIDENCE_HIERARCHY, DEFAULT_CITATION_STYLE } from "@/lib/editorial";

export const Route = createFileRoute("/research-methodology")({
  head: () =>
    seo({
      path: "/research-methodology",
      title: "Research Methodology — Oxford Research Peptides",
      description:
        "How Oxford Research Peptides sources, appraises, cites and grades scientific literature for every educational page. Search strategy, inclusion criteria, evidence grading and citation policy.",
    }),
  component: ResearchMethodologyPage,
});

const STEPS = [
  {
    n: "01",
    title: "Scope definition",
    body:
      "Each page starts with a defined scope: subject compound / mechanism / methodology, question the page answers, target reader (laboratory researcher) and out-of-scope claims (clinical dosing, therapeutic outcomes, human-use recommendations).",
  },
  {
    n: "02",
    title: "Literature search",
    body:
      "Primary databases: PubMed / MEDLINE, Europe PMC and Google Scholar. Secondary: DrugBank, ChEMBL, UniProt and receptor / pathway databases where relevant. Search strings, date ranges and databases used are recorded for reviewer audit.",
  },
  {
    n: "03",
    title: "Source appraisal",
    body:
      "Sources are appraised for study design, sample size, control adequacy, replication, funding disclosures and whether the finding is primary or secondary. Preprints are labelled explicitly and treated with additional caution.",
  },
  {
    n: "04",
    title: "Evidence grading",
    body:
      "Each substantive claim is graded against the site-wide evidence hierarchy (Strong → Conflicting) and, where relevant, individual studies are tagged with a study-quality grade (A–D or Insufficient).",
  },
  {
    n: "05",
    title: "Citation capture",
    body:
      "Every cited source is captured as a structured record — authors, year, title, journal, volume, issue, pages, DOI, PMID — and stored in the shared citation registry so it can be referenced consistently across pages.",
  },
  {
    n: "06",
    title: "Scientific review",
    body:
      "A scientific reviewer independently checks that each claim is supported by the cited source, that gradings are defensible, and that the page maintains research-use framing. Reviewer may require revisions before approval.",
  },
  {
    n: "07",
    title: "Scheduled re-audit",
    body:
      "Approved pages enter the review cadence defined on the editorial standards page. At each re-audit the search is repeated, new evidence is incorporated, and the revision history is updated.",
  },
];

function ResearchMethodologyPage() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Research Methodology" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              SCIENTIFIC PROCESS
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">
              Research Methodology
            </h1>
            <p className="mt-4 text-bone/75 text-sm leading-relaxed max-w-2xl">
              The scientific process that sits behind every editorial page:
              how sources are found, appraised, cited and graded, and how
              scheduled re-audits keep content current.
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-x max-w-4xl">
            <ol className="space-y-4">
              {STEPS.map((s) => (
                <li
                  key={s.n}
                  className="border border-navy-deep/10 bg-white p-5 flex gap-5"
                >
                  <div className="text-gold font-display text-3xl">{s.n}</div>
                  <div>
                    <div className="font-display text-lg">{s.title}</div>
                    <p className="text-sm text-navy-deep/75 mt-1 leading-relaxed">
                      {s.body}
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
              EVIDENCE HIERARCHY
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-4">
              How claims are graded
            </h2>
            <ul className="space-y-2 text-sm">
              {EVIDENCE_HIERARCHY.map((t) => (
                <li
                  key={t.level}
                  className="border border-navy-deep/10 bg-white p-4"
                >
                  <div className="font-semibold">{t.label}</div>
                  <div className="text-navy-deep/75 mt-1">{t.detail}</div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="py-12 border-t border-navy-deep/10">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-2">
              CITATION POLICY
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-medium mb-4">
              Citation policy
            </h2>
            <ul className="space-y-3 text-sm text-navy-deep/80 leading-relaxed list-disc pl-5">
              <li>
                Default citation style:{" "}
                <span className="font-medium">
                  {DEFAULT_CITATION_STYLE.toUpperCase()}
                </span>{" "}
                (American Medical Association).
              </li>
              <li>
                Inline citations are numeric superscripts linked to the reference
                list on the same page.
              </li>
              <li>
                Every reference carries structured metadata (authors, year,
                title, journal, DOI or PMID) so it can be verified independently.
              </li>
              <li>
                Preprints and non-peer-reviewed sources are labelled explicitly.
              </li>
              <li>
                Secondary sources (reviews, textbooks) are cited only where
                appropriate; primary sources are preferred for evidence claims.
              </li>
            </ul>
          </div>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
