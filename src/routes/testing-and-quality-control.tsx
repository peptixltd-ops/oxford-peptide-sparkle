import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Testing & Quality Control" updated="January 2026">
      <P>
        Every batch of research peptide supplied by Oxford Research Peptides is subject to
        analytical testing before release. This page describes the analytical programme in
        plain language. It applies to material sold for qualified in-vitro laboratory
        research and does not constitute a therapeutic quality claim.
      </P>

      <H2>Analytical programme</H2>
      <UL>
        <li><strong>Identity</strong> — confirmed by mass spectrometry (MS) against the theoretical monoisotopic or average mass for the target sequence.</li>
        <li><strong>Purity</strong> — assessed by reversed-phase high-performance liquid chromatography (RP-HPLC) with UV detection. Purity is reported as area percent at the specified wavelength.</li>
        <li><strong>Appearance</strong> — visual inspection of the lyophilised solid.</li>
        <li><strong>Net peptide content</strong> — reported where relevant to the compound and method.</li>
      </UL>

      <H2>Batch traceability</H2>
      <UL>
        <li>Each batch is assigned a unique batch number.</li>
        <li>Analytical results are recorded against that batch number and released as a Certificate of Analysis (COA).</li>
        <li>The COA is retained and can be requested by qualified researchers who have purchased the batch.</li>
      </UL>

      <H2>Method summaries</H2>
      <P>
        The RP-HPLC and MS methods used for release testing follow standard reversed-phase
        and electrospray-ionisation practice for peptides in this molecular-weight range.
        Method summaries and reference literature are described in our{" "}
        <Link to="/research-methodology" className="text-gold">Research Methodology</Link>{" "}
        and the analytical guides in the Research Hub.
      </P>

      <H2>Scope and limits of the analytical programme</H2>
      <UL>
        <li>Testing is performed for research-use identity and purity confirmation. It is not a pharmaceutical release specification.</li>
        <li>The programme does not certify sterility, endotoxin content, or fitness for any therapeutic use.</li>
        <li>Materials are not for human or animal administration, diagnosis, or therapeutic use — see our <Link to="/research-use-only" className="text-gold">Research Use Only</Link> notice.</li>
      </UL>

      <H2>Sample COA</H2>
      <P>
        A sample Certificate of Analysis is available on the{" "}
        <Link to="/certificate-of-analysis" className="text-gold">Certificate of Analysis</Link>{" "}
        page and on our{" "}
        <Link to="/lab-testing" className="text-gold">Lab Testing</Link> page.
      </P>

      <H2>Requesting a COA for your batch</H2>
      <P>
        Email <a className="text-gold" href="mailto:oxfordresearchpeptides@gmail.com?subject=COA%20request">oxfordresearchpeptides@gmail.com</a>{" "}
        with your order number and the batch number printed on the vial label.
      </P>

      <H2>Reviewer</H2>
      <P>
        Analytical procedure pages are reviewed by our Analytical Chemistry Reviewer — see
        the <Link to="/scientific-advisory-board" className="text-gold">Scientific Advisory Board</Link>.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/testing-and-quality-control")({
  head: () =>
    seo({
      path: "/testing-and-quality-control",
      title: "Testing & Quality Control — Oxford Research Peptides",
      description:
        "Analytical testing programme for research peptides — identity by mass spectrometry, purity by RP-HPLC, batch traceability, and Certificate of Analysis release process.",
      jsonLd: [
        aboutPageLd(
          "/testing-and-quality-control",
          "Testing & Quality Control",
          "Identity (MS), purity (RP-HPLC), batch traceability, method summaries, and scope of the analytical release programme.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Testing & Quality Control", path: "/testing-and-quality-control" },
        ]),
      ],
    }),
  component: Page,
});
