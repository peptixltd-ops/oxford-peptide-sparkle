/**
 * Authority Sprint 1B — BPC-157 AI Search Optimisation layer.
 *
 * Additive supplement to the BPC-157 cluster: extended (120–180 word)
 * answers rendered beneath the QuickAnswer via GuideLayout's
 * `extendedAnswer` slot, and FAQ supplements merged into per-page
 * FAQPage JSON-LD.
 *
 * BPC-157 does not currently have receptor-guide pages (Wave 1 scope),
 * so no DefinedTerm entries are emitted here — glossary DefinedTerms live
 * with the glossary content in `src/content/glossary-content.tsx`.
 */
import type { ReactNode } from "react";
import { HundredFiftyWordAnswer } from "@/components/publishing";

function EA({ question, children }: { question: string; children: ReactNode }) {
  return (
    <HundredFiftyWordAnswer title="Extended answer" question={question}>
      {children}
    </HundredFiftyWordAnswer>
  );
}

export const bpc157GuideExtendedAnswers: Record<string, ReactNode> = {
  "bpc-157-mechanism-of-action": (
    <EA question="How does BPC-157 act at the molecular and cellular level?">
      BPC-157 does not have a single canonical receptor characterised in
      the peer-reviewed literature. Instead, published preclinical work
      describes convergent modulation of several conserved pathways
      associated with tissue repair. In rodent studies BPC-157 interacts
      with the nitric-oxide system in a context-dependent manner,
      countering both L-NAME- and L-arginine-induced disturbances. In
      vascular models it is associated with VEGFR2 activation and
      up-regulation and downstream pro-angiogenic signalling, though
      direct high-affinity binding of BPC-157 to VEGFR2 has not been
      demonstrated. At the cellular level, work in cultured tendon
      fibroblasts describes accelerated outgrowth and migration through
      FAK-paxillin signalling. Sikirić and colleagues situate these
      observations within Robert's cytoprotection paradigm, describing
      BPC-157 as an organoprotector rather than a single-target
      pharmacological agent.
    </EA>
  ),
  "bpc-157-faq": (
    <EA question="What are the most common research questions about BPC-157?">
      Frequently asked research questions about BPC-157 cluster around
      four themes: identity, mechanism, laboratory handling and
      regulatory context. On identity, BPC-157 is a synthetic
      pentadecapeptide with sequence GEPPPGKPADDAGLV, molecular formula
      C62H98N16O22 and molecular weight approximately 1419.55 g/mol,
      derived from a fragment of a gastric-juice protein. On mechanism,
      no single canonical receptor is established; reported work
      describes convergent modulation of the nitric-oxide system,
      VEGFR2-linked angiogenesis and FAK-paxillin fibroblast migration
      within a broader cytoprotection framework. On handling, lyophilised
      material is stored at −20 °C, desiccated, and reconstituted with
      sterile or bacteriostatic water using aseptic technique. On
      context, no phase 3 clinical trials are published, no UK marketing
      authorisation exists, and Oxford Research Peptides supplies BPC-157
      strictly as an in-vitro reference standard.
    </EA>
  ),
};

export const bpc157GuideFaqSupplements: Record<
  string,
  readonly { question: string; answer: string }[]
> = {
  "bpc-157-mechanism-of-action": [
    {
      question: "Is BPC-157 an agonist at a specific receptor?",
      answer:
        "No. Reported effects at receptors such as VEGFR2 are described as indirect activation and up-regulation, not high-affinity orthosteric agonism at a defined pocket.",
    },
    {
      question: "Which mechanistic finding is the most independently replicated?",
      answer:
        "Pro-angiogenic activity in preclinical models — including endothelial and wound-healing readouts — is the most frequently reported class of finding across the published BPC-157 literature.",
    },
  ],
};

export function getBpc157ExtendedAnswer(slug: string): ReactNode | undefined {
  return bpc157GuideExtendedAnswers[slug];
}

export function getBpc157FaqSupplement(
  slug: string,
): readonly { question: string; answer: string }[] {
  return bpc157GuideFaqSupplements[slug] ?? [];
}
