import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Funding & Conflicts of Interest" updated="January 2026">
      <P>
        Oxford Research Peptides is the educational and commercial brand operated by{" "}
        <strong>Oxford Research Syndicate Ltd</strong>, a company registered in England and
        Wales (Company Registration Number 17207898). This page discloses how our
        educational content is funded and how we manage the resulting conflicts of interest.
      </P>

      <H2>Funding</H2>
      <UL>
        <li>All editorial content is funded internally by Oxford Research Syndicate Ltd.</li>
        <li>We do not accept sponsored editorial, paid placements, or affiliate arrangements for the compounds we sell.</li>
        <li>We do not receive research grants tied to specific editorial coverage.</li>
      </UL>

      <H2>Conflicts of interest</H2>
      <P>
        We publish educational reference material about peptide compounds. We also supply
        those compounds to qualified in-vitro laboratory researchers. That commercial
        relationship is an inherent conflict, and we disclose it prominently rather than
        obscure it.
      </P>
      <UL>
        <li>Every published educational page carries a visible Conflict of Interest notice in its editorial footer.</li>
        <li>Product pages are structurally separated from educational reference pages. Compound monographs, mechanism guides, and methodology pages do not include purchase call-to-action language in-line with scientific claims.</li>
        <li>We do not publish comparative claims of the form "compound X is superior to compound Y" as a basis for a purchasing decision. Where compounds are compared, the comparison is scientific (mechanism, receptor selectivity, evidence base) and evidence-tiered.</li>
      </UL>

      <H2>Author and reviewer disclosures</H2>
      <P>
        Editorial team members and scientific reviewers are employees or engaged specialists
        of Oxford Research Syndicate Ltd. No author or reviewer has undisclosed equity in a
        competing peptide supplier, and none receives per-article payment tied to editorial
        stance.
      </P>

      <H2>Advertising and third-party content</H2>
      <UL>
        <li>We do not run third-party display advertising on the Research Hub or Compound Library.</li>
        <li>We do not sell inbound links from editorial pages.</li>
        <li>Outbound links to primary literature (DOI, PMID, journal, database) are provided for verification and are not affiliate links.</li>
      </UL>

      <H2>Reporting a concern</H2>
      <P>
        If you believe a page misrepresents evidence for commercial reasons, email{" "}
        <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com?subject=Conflict%20of%20interest%20concern">
          oxfordresearchpeptides@gmail.com
        </a>{" "}
        with the URL and passage in question. Substantive concerns are handled under our{" "}
        <Link to="/corrections-policy" className="text-gold">Corrections Policy</Link>.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/funding-and-conflicts")({
  head: () =>
    seo({
      path: "/funding-and-conflicts",
      title: "Funding & Conflicts of Interest — Oxford Research Peptides",
      description:
        "How Oxford Research Peptides funds its educational content, discloses commercial conflicts, and separates editorial reference material from product pages.",
      jsonLd: [
        aboutPageLd(
          "/funding-and-conflicts",
          "Funding & Conflicts of Interest",
          "Funding sources, commercial disclosures, editorial/product separation, and how to report a concern.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Funding & Conflicts of Interest", path: "/funding-and-conflicts" },
        ]),
      ],
    }),
  component: Page,
});
