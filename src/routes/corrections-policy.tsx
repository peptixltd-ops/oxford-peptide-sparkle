import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Corrections Policy" updated="January 2026">
      <P>
        We aim to publish accurate, sourced, research-first educational content. Errors do
        occur — outdated citations, transposed values, ambiguous wording, or a change in the
        underlying scientific literature. This policy describes how we handle corrections and
        how you can report an issue.
      </P>

      <H2>What we correct</H2>
      <UL>
        <li><strong>Factual errors</strong> — incorrect molecular weight, receptor target, mechanism attribution, or citation.</li>
        <li><strong>Citation errors</strong> — wrong DOI/PMID, misattributed author, incorrect journal or year.</li>
        <li><strong>Outdated evidence</strong> — a claim superseded by more recent primary research.</li>
        <li><strong>Ambiguous language</strong> — phrasing that could be misread as clinical guidance rather than educational reference.</li>
        <li><strong>Broken internal or external links</strong> that affect the reader's ability to verify a claim.</li>
      </UL>

      <H2>How to report an error</H2>
      <P>
        Email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com?subject=Corrections%20request">oxfordresearchpeptides@gmail.com</a> with the subject line{" "}
        <em>Corrections request</em>. Please include:
      </P>
      <UL>
        <li>The full URL of the page in question.</li>
        <li>A short quotation of the passage you believe is incorrect.</li>
        <li>Your correction, with a citation (DOI / PMID / recognised reference) where possible.</li>
      </UL>

      <H2>How we respond</H2>
      <UL>
        <li><strong>Acknowledgement</strong> within five UK working days.</li>
        <li><strong>Review</strong> by the Managing Editor and, for scientific claims, an independent Scientific Reviewer.</li>
        <li><strong>Action</strong>: correct, clarify, add a note, or decline (with reasoning).</li>
      </UL>

      <H2>How corrections are shown</H2>
      <P>
        Substantive corrections are logged in the visible <em>Revision history</em> panel at
        the foot of each educational page, alongside the version number and the date of the
        change. The page's <em>Last updated</em> date is refreshed. Minor typographical fixes
        may be made silently.
      </P>

      <H2>What we do not do</H2>
      <UL>
        <li>We do not remove corrected content from the revision history to hide the change.</li>
        <li>We do not add human dosing information, therapeutic instructions, or clinical advice on request — see our <Link to="/research-use-only" className="text-gold">Research Use Only</Link> notice.</li>
      </UL>

      <H2>Related policies</H2>
      <P>
        See our <Link to="/editorial-policy" className="text-gold">Editorial Policy</Link> and{" "}
        <Link to="/editorial-standards" className="text-gold">Editorial Standards</Link> for
        the underlying editorial workflow and reference formatting rules.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/corrections-policy")({
  head: () =>
    seo({
      path: "/corrections-policy",
      title: "Corrections Policy — Oxford Research Peptides",
      description:
        "How Oxford Research Peptides handles factual, citation, and evidence corrections on educational pages, how readers can report an error, and how corrections are logged.",
      jsonLd: [
        aboutPageLd(
          "/corrections-policy",
          "Corrections Policy",
          "Reporting errors, response process, and how substantive corrections are logged in the visible revision history.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Corrections Policy", path: "/corrections-policy" },
        ]),
      ],
    }),
  component: Page,
});
