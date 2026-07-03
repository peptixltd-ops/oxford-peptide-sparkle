import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, aboutPageLd, breadcrumbLd, personLd } from "@/lib/seo";
import {
  editorialAuthors,
  scientificReviewers,
  type EditorialAuthor,
  type ScientificReviewer,
} from "@/lib/editorial/authors";

type Person = EditorialAuthor | ScientificReviewer;

function isReviewer(p: Person): p is ScientificReviewer {
  return (p as ScientificReviewer).expertise !== undefined;
}

function PersonCard({ p }: { p: Person }) {
  return (
    <article className="border border-navy-deep/15 bg-white p-5 rounded-sm">
      <div className="text-[10px] font-bold tracking-[0.25em] text-gold/90 uppercase mb-2">
        {p.role}
      </div>
      <div className="font-display text-lg text-navy-deep">{p.name}</div>
      {p.credentials && (
        <div className="text-xs text-navy-deep/70 mt-1">{p.credentials}</div>
      )}
      {p.affiliation && (
        <div className="text-xs text-navy-deep/60">{p.affiliation}</div>
      )}
      {isReviewer(p) && p.expertise.length > 0 && (
        <div className="text-xs text-navy-deep/70 mt-3">
          <strong className="text-navy-deep">Expertise:</strong> {p.expertise.join(", ")}
        </div>
      )}
      {p.bio && (
        <p className="text-[13px] leading-relaxed text-navy-deep/80 mt-3">{p.bio}</p>
      )}
    </article>
  );
}

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Scientific Advisory Board" updated="January 2026">
      <P>
        Educational content published by Oxford Research Peptides is produced by an in-house
        Editorial Team and reviewed by an independent Scientific Review Panel. Individual
        authors and reviewers are listed by role. Named individual credentials are added
        only where we can verify them; we do not attach fabricated names or qualifications
        to editorial output.
      </P>

      <H2>Editorial Team</H2>
      <div className="not-prose grid md:grid-cols-2 gap-5">
        {editorialAuthors.map((a) => (
          <PersonCard key={a.id} p={a} />
        ))}
      </div>

      <H2>Scientific Review Panel</H2>
      <div className="not-prose grid md:grid-cols-2 gap-5">
        {scientificReviewers.map((r) => (
          <PersonCard key={r.id} p={r} />
        ))}
      </div>

      <H2>How the panel operates</H2>
      <UL>
        <li>Every educational page (compound monograph, mechanism guide, methodology guide, comparison, glossary anchor) is passed through the Scientific Review Panel before publication.</li>
        <li>Analytical methodology pages (HPLC / MS / purity assessment) receive an additional review by the Analytical Chemistry Reviewer.</li>
        <li>The reviewer assigned to a page is recorded in the page's editorial footer and in its revision history.</li>
        <li>Review cadence is set per page category. Compound monographs and mechanism guides are re-reviewed at least annually; methodology and glossary pages are re-reviewed at least every 18 months.</li>
      </UL>

      <H2>Named individual profiles</H2>
      <P>
        Named individual profiles with verifiable credentials, affiliations, and{" "}
        <code>sameAs</code> links to institutional or ORCID pages will be added as they are
        formally attributed. We will not backfill this list with unverified names.
      </P>

      <H2>Related policies</H2>
      <P>
        See our <Link to="/editorial-policy" className="text-gold">Editorial Policy</Link>,{" "}
        <Link to="/corrections-policy" className="text-gold">Corrections Policy</Link>, and{" "}
        <Link to="/funding-and-conflicts" className="text-gold">Funding & Conflicts of Interest</Link>{" "}
        disclosure.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/scientific-advisory-board")({
  head: () => {
    const people: Person[] = [...editorialAuthors, ...scientificReviewers];
    return seo({
      path: "/scientific-advisory-board",
      title: "Scientific Advisory Board — Oxford Research Peptides",
      description:
        "The in-house Editorial Team and independent Scientific Review Panel responsible for reviewing every educational page at Oxford Research Peptides.",
      jsonLd: [
        aboutPageLd(
          "/scientific-advisory-board",
          "Scientific Advisory Board",
          "Editorial Team and Scientific Review Panel roles, expertise, and review cadence.",
        ),
        ...people.map((p) =>
          personLd({
            name: p.name,
            jobTitle: p.role,
            description: p.bio,
            affiliation: p.affiliation,
          }),
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Scientific Advisory Board", path: "/scientific-advisory-board" },
        ]),
      ],
    });
  },
  component: Page,
});
