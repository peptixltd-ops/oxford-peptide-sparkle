"use client";
import { createFileRoute, Link } from "@/shims/router";
import { LegalPage, H2, P, UL } from "@/components/legal-page";
import { seo, medicalWebPageLd, breadcrumbLd } from "@/lib/seo";

function Page() {
  return (
    <LegalPage eyebrow="TRUST" title="Research Use Only" updated="January 2026">
      <P>
        All materials supplied by Oxford Research Peptides — and all educational content
        published on this website — are intended <strong>strictly for qualified in-vitro
        laboratory research</strong>. This page explains what that means in the United Kingdom
        context, and what our products and content are <em>not</em>.
      </P>

      <H2>Not a medicine</H2>
      <UL>
        <li>The compounds referenced on this website are <strong>not medicinal products</strong> within the meaning of the Human Medicines Regulations 2012.</li>
        <li>They are <strong>not licensed</strong> by the Medicines and Healthcare products Regulatory Agency (MHRA) for human use.</li>
        <li>They are <strong>not veterinary medicines</strong> within the meaning of the Veterinary Medicines Regulations 2013.</li>
      </UL>

      <H2>Not for human or animal consumption</H2>
      <UL>
        <li>Products are not for human ingestion, injection, inhalation, or topical application.</li>
        <li>Products are not for administration to any living animal.</li>
        <li>Products are not food, food supplements, cosmetics, or novel foods.</li>
      </UL>

      <H2>Not clinical guidance</H2>
      <P>
        Educational pages on this website — including compound monographs, mechanism guides,
        methodology guides, comparisons, and glossary entries — describe scientific
        understanding of the compound in the research literature. They are not medical
        advice. They do not provide human dosing, treatment recommendations, indications,
        contraindications, or clinical decision support. Do not use them to make
        health decisions. Consult a qualified healthcare professional for medical questions.
      </P>

      <H2>Who our products are for</H2>
      <UL>
        <li>Qualified researchers working within a properly equipped in-vitro laboratory environment.</li>
        <li>Educational and academic institutions performing peptide research in accordance with local rules and their institutional risk assessments.</li>
        <li>Persons over the age of 18 in the United Kingdom.</li>
      </UL>

      <H2>Your responsibilities</H2>
      <UL>
        <li>Assess and follow the applicable laws, guidelines, and institutional policies for your jurisdiction and setting.</li>
        <li>Handle, store, and dispose of research materials in line with your local risk assessments and waste procedures.</li>
        <li>Do not resell, redistribute, or repackage research materials for human or animal use.</li>
      </UL>

      <H2>Related pages</H2>
      <P>
        See our <Link to="/disclaimer" className="text-gold">Disclaimer</Link>,{" "}
        <Link to="/testing-and-quality-control" className="text-gold">Testing & Quality Control</Link>,{" "}
        and <Link to="/editorial-policy" className="text-gold">Editorial Policy</Link>.
      </P>
    </LegalPage>
  );
}

export const Route = createFileRoute("/research-use-only")({
  head: () =>
    seo({
      path: "/research-use-only",
      title: "Research Use Only — Oxford Research Peptides",
      description:
        "UK research-use-only notice — products are not medicines, not for human or animal consumption, and educational content is not clinical guidance.",
      jsonLd: [
        medicalWebPageLd(
          "/research-use-only",
          "Research Use Only",
          "UK research-use-only notice covering regulatory status, prohibited uses, and reader responsibilities.",
          "ResearchAspect",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Use Only", path: "/research-use-only" },
        ]),
      ],
    }),
  component: Page,
});
