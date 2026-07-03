import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Editorial Policy" updated="January 2026">
      <P>
        Oxford Research Peptides publishes educational reference material for qualified
        in-vitro laboratory researchers. This policy describes how our editorial content
        is planned, written, reviewed, published, and maintained. It applies to every page
        in the <Link to="/research-hub" className="text-gold">Research Hub</Link> and{" "}
        <Link to="/compounds" className="text-gold">Compound Library</Link>.
      </P>

      <H2>Editorial mission</H2>
      <P>
        Our mission is to provide clear, sourced, research-first educational content on
        peptide compounds, mechanisms, and laboratory methodology. We do not publish
        clinical guidance, dosing recommendations for humans, or therapeutic advice.
      </P>

      <H2>Content development process</H2>
      <UL>
        <li><strong>Scoping.</strong> Each page is scoped against our Knowledge Graph so it fits an existing compound, mechanism, methodology, comparison, or glossary node.</li>
        <li><strong>Drafting.</strong> The in-house Editorial Team drafts the page against a structured template (Overview, Mechanism, Applications, Methodology, References).</li>
        <li><strong>Sourcing.</strong> Every scientific claim is anchored to a primary reference (peer-reviewed publication, textbook, or a recognised database record). Preference is given to peer-reviewed sources.</li>
        <li><strong>Scientific review.</strong> Drafts are reviewed by an independent Scientific Reviewer for accuracy, faithfulness to the cited evidence, appropriate evidence tiering, and correct research-use framing.</li>
        <li><strong>Publication.</strong> Approved content is versioned and published with a visible publication date, last-reviewed date, and revision history.</li>
        <li><strong>Maintenance.</strong> Every page carries a next-review date based on its category and is revisited when new primary evidence becomes available.</li>
      </UL>

      <H2>Evidence hierarchy</H2>
      <P>
        We grade evidence transparently. Human clinical evidence is prioritised where it
        exists; animal, in-vitro, and mechanistic evidence are labelled as such and not
        conflated with clinical claims. Preliminary or conflicting evidence is called out
        explicitly rather than smoothed over.
      </P>

      <H2>Reference formatting</H2>
      <P>
        References follow the American Medical Association (AMA) citation style. Where a
        Digital Object Identifier (DOI) or PubMed identifier (PMID) is available, it is
        rendered as a resolvable link. See our{" "}
        <Link to="/editorial-standards" className="text-gold">Editorial Standards</Link>{" "}
        for the reference schema and worked examples.
      </P>

      <H2>Independence and boundaries</H2>
      <UL>
        <li>Editorial pages do not promote products. Product pages are separated from educational pages.</li>
        <li>We do not accept payment in exchange for editorial coverage of a compound or supplier.</li>
        <li>Educational pages never provide human dosing schedules or therapeutic instructions.</li>
      </UL>

      <H2>Corrections and updates</H2>
      <P>
        Substantive changes are logged in the visible revision history on each page. To
        report a factual error, see our{" "}
        <Link to="/corrections-policy" className="text-gold">Corrections Policy</Link>.
      </P>

      <H2>Funding and conflicts of interest</H2>
      <P>
        Our funding sources and conflict-of-interest disclosures are described on the{" "}
        <Link to="/funding-and-conflicts" className="text-gold">Funding & Conflicts of Interest</Link>{" "}
        page.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/editorial-policy")({
  head: () =>
    seo({
      path: "/editorial-policy",
      title: "Editorial Policy — Oxford Research Peptides",
      description:
        "How Oxford Research Peptides plans, writes, scientifically reviews, publishes, and maintains educational content on peptide compounds, mechanisms, and laboratory methodology.",
      jsonLd: [
        aboutPageLd(
          "/editorial-policy",
          "Editorial Policy",
          "Editorial mission, workflow, evidence hierarchy, reference standards, and independence policy.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Editorial Policy", path: "/editorial-policy" },
        ]),
      ],
    }),
  component: Page,
});
