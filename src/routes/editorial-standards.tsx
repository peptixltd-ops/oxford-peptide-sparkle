import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";
import {
  EDITORIAL_PRINCIPLES,
  EDITORIAL_FRAMEWORK_VERSION,
  EDITORIAL_FRAMEWORK_EFFECTIVE_DATE,
  EVIDENCE_HIERARCHY,
  STUDY_QUALITY_GRADES,
  REVIEW_CADENCE_MONTHS,
  RESEARCH_USE_DISCLAIMER,
  CONFLICT_OF_INTEREST_STATEMENT,
  AI_ASSISTANCE_STATEMENT,
  DEFAULT_CITATION_STYLE,
  PUBLISHER,
  editorialAuthors,
  scientificReviewers,
} from "@/lib/editorial";

export const Route = createFileRoute("/editorial-standards")({
  head: () =>
    seo({
      path: "/editorial-standards",
      title: "Editorial Standards — Oxford Research Peptides",
      description:
        "How Oxford Research Peptides drafts, cites, reviews and revises every educational page: evidence hierarchy, scientific review, citation policy, corrections and disclosures.",
    }),
  component: EditorialStandardsPage,
});

function EditorialStandardsPage() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Editorial Standards" }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x max-w-4xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              EDITORIAL FRAMEWORK
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">
              Editorial Standards
            </h1>
            <p className="mt-4 text-bone/75 max-w-2xl text-sm leading-relaxed">
              This page describes how every educational page on{" "}
              {PUBLISHER.name} is drafted, cited, reviewed and revised. It is
              maintained by the {PUBLISHER.name} editorial team and applies to
              all pages under the Research Hub and Compound Library.
            </p>
            <p className="mt-3 text-bone/60 text-xs">
              Framework version {EDITORIAL_FRAMEWORK_VERSION} · Effective{" "}
              {EDITORIAL_FRAMEWORK_EFFECTIVE_DATE} · Default citation style{" "}
              {DEFAULT_CITATION_STYLE.toUpperCase()}
            </p>
          </div>
        </section>

        <Section title="Editorial principles" eyebrow="PRINCIPLES">
          <ul className="grid md:grid-cols-2 gap-4">
            {EDITORIAL_PRINCIPLES.map((p) => (
              <li
                key={p.id}
                className="border border-navy-deep/10 bg-white p-5"
              >
                <div className="font-display text-lg">{p.title}</div>
                <p className="mt-2 text-sm text-navy-deep/75 leading-relaxed">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Evidence hierarchy" eyebrow="EVIDENCE">
          <p className="text-sm text-navy-deep/75 max-w-3xl leading-relaxed mb-6">
            Every substantive claim on an editorial page is labelled against
            the tiers below so readers can weigh confidence at a glance. Tiers
            are applied by scientific reviewers, not by authors.
          </p>
          <div className="border border-navy-deep/10 bg-white overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-navy-deep/5 text-left">
                <tr>
                  <th className="p-3 font-semibold">Tier</th>
                  <th className="p-3 font-semibold">Short</th>
                  <th className="p-3 font-semibold">When it applies</th>
                </tr>
              </thead>
              <tbody>
                {EVIDENCE_HIERARCHY.map((t) => (
                  <tr key={t.level} className="border-t border-navy-deep/10">
                    <td className="p-3 font-medium">{t.label}</td>
                    <td className="p-3 text-navy-deep/75">{t.short}</td>
                    <td className="p-3 text-navy-deep/75">{t.detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="font-display text-xl mt-8 mb-3">Study quality grades</h3>
          <ul className="space-y-1.5 text-sm">
            {Object.entries(STUDY_QUALITY_GRADES).map(([g, d]) => (
              <li key={g}>
                <span className="inline-block font-mono font-semibold w-16">{g}</span>
                <span className="text-navy-deep/75">{d}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Review cadence" eyebrow="REVIEW">
          <p className="text-sm text-navy-deep/75 max-w-3xl leading-relaxed mb-4">
            Each page type is re-audited against current literature at the
            interval below. Reviewers may bring a review forward if new
            evidence changes a claim.
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
        </Section>

        <Section title="Authors & reviewers" eyebrow="PEOPLE">
          <p className="text-sm text-navy-deep/75 max-w-3xl leading-relaxed mb-4">
            The editorial team drafts and structures content. Independent
            scientific reviewers audit claims against cited evidence before any
            page is published.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-display text-lg mb-3">Editorial team</h3>
              <ul className="space-y-3">
                {editorialAuthors.map((a) => (
                  <li key={a.id} className="border border-navy-deep/10 bg-white p-4">
                    <div className="font-semibold">{a.name}</div>
                    <div className="text-xs text-navy-deep/60">{a.role}</div>
                    {a.bio && <p className="text-sm mt-2 text-navy-deep/75">{a.bio}</p>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-display text-lg mb-3">Scientific reviewers</h3>
              <ul className="space-y-3">
                {scientificReviewers.map((r) => (
                  <li key={r.id} className="border border-navy-deep/10 bg-white p-4">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-navy-deep/60">{r.role}</div>
                    <div className="text-xs text-navy-deep/60 mt-1">
                      Expertise: {r.expertise.join(" · ")}
                    </div>
                    {r.bio && <p className="text-sm mt-2 text-navy-deep/75">{r.bio}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Disclosures" eyebrow="TRANSPARENCY">
          <div className="space-y-4 max-w-3xl">
            <Disclosure title="Research-use-only">{RESEARCH_USE_DISCLAIMER}</Disclosure>
            <Disclosure title="Conflict of interest">
              {CONFLICT_OF_INTEREST_STATEMENT}
            </Disclosure>
            <Disclosure title="AI assistance">{AI_ASSISTANCE_STATEMENT}</Disclosure>
            <Disclosure title="Corrections">
              Factual errors are corrected in place and logged in the page's
              revision history with a short summary of what changed. Corrections
              are never made silently.
            </Disclosure>
          </div>
        </Section>

        <Section title="Publication workflow" eyebrow="WORKFLOW">
          <p className="text-sm text-navy-deep/75 max-w-3xl leading-relaxed">
            The end-to-end path every page takes from draft to publication and
            through scheduled review is documented on the{" "}
            <a href="/publication-workflow" className="text-gold underline">
              publication workflow
            </a>{" "}
            page. The scientific process used within scientific review is
            documented on the{" "}
            <a href="/research-methodology" className="text-gold underline">
              research methodology
            </a>{" "}
            page.
          </p>
        </Section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-12 border-t border-navy-deep/10">
      <div className="container-x max-w-5xl">
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-2">
          {eyebrow}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-medium mb-6">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}

function Disclosure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border border-navy-deep/10 bg-white p-5">
      <div className="font-display text-lg">{title}</div>
      <p className="mt-2 text-sm text-navy-deep/75 leading-relaxed">{children}</p>
    </div>
  );
}
