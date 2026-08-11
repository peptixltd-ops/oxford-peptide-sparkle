import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { CoaCard } from "@/components/coa-card";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Certificate of Analysis" updated="January 2026">
      <P>
        A Certificate of Analysis (COA) is the batch-specific analytical release document
        that accompanies each batch of research peptide supplied by Oxford Research
        Peptides. It records the identity, purity, and appearance results for that batch
        against our analytical release programme.
      </P>

      <div className="not-prose my-8 max-w-md">
        <CoaCard viewHref="/lab-testing" />
      </div>

      <H2>What a COA contains</H2>
      <UL>
        <li><strong>Product</strong> — the compound name and target sequence.</li>
        <li><strong>Batch number</strong> — a unique identifier that maps to the vial label.</li>
        <li><strong>Purity (HPLC)</strong> — reversed-phase HPLC area percent at the specified wavelength.</li>
        <li><strong>Appearance</strong> — visual description of the lyophilised solid.</li>
        <li><strong>Molecular weight</strong> — confirmed by mass spectrometry against the theoretical mass.</li>
        <li><strong>Test date</strong> — the date the analytical result was recorded.</li>
        <li><strong>Result</strong> — pass or fail against the release specification.</li>
        <li><strong>Signatory</strong> — the responsible quality-control reviewer.</li>
      </UL>

      <H2>Requesting the COA for your batch</H2>
      <P>
        Email <a className="text-gold" href="mailto:info@oxfordresearchpeptides.com?subject=COA%20request">info@oxfordresearchpeptides.com</a>{" "}
        with your order number and the batch number printed on the vial label. The COA is
        provided as a PDF.
      </P>

      <H2>What a COA is not</H2>
      <UL>
        <li>A COA is not a pharmaceutical release specification.</li>
        <li>A COA does not certify sterility, endotoxin content, or fitness for any therapeutic use.</li>
        <li>A COA does not authorise human or animal administration — see our <Link to="/research-use-only" className="text-gold">Research Use Only</Link> notice.</li>
      </UL>

      <H2>Related pages</H2>
      <P>
        See <Link to="/testing-and-quality-control" className="text-gold">Testing & Quality Control</Link>{" "}
        for the analytical programme, and <Link to="/lab-testing" className="text-gold">Lab Testing</Link>{" "}
        for a walkthrough of how testing is performed.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/certificate-of-analysis")({
  head: () =>
    seo({
      path: "/certificate-of-analysis",
      title: "Certificate of Analysis (COA) — Oxford Research Peptides",
      description:
        "What a Certificate of Analysis (COA) contains, how to request the COA for your batch, and the scope and limits of the analytical release document.",
      jsonLd: [
        aboutPageLd(
          "/certificate-of-analysis",
          "Certificate of Analysis",
          "Batch-specific analytical release document — contents, request process, and scope.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Certificate of Analysis", path: "/certificate-of-analysis" },
        ]),
      ],
    }),
  component: Page,
});
