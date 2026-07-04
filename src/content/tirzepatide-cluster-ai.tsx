/**
 * Authority Sprint 3B — Tirzepatide AI Search Optimisation layer.
 *
 * Additive supplement to the Tirzepatide cluster: extended (120–180 word)
 * answers rendered beneath the QuickAnswer via GuideLayout's
 * `extendedAnswer` slot, plus FAQ supplements merged into per-page
 * FAQPage JSON-LD.
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

export const tirzepatideGuideExtendedAnswers: Record<string, ReactNode> = {
  "what-is-tirzepatide": (
    <EA question="What is Tirzepatide?">
      Tirzepatide is a synthetic 39-residue linear peptide first
      characterised in the peer-reviewed literature by Coskun and
      colleagues in 2018 as the novel dual GIP and GLP-1 receptor agonist
      LY3298176. Its backbone is derived from GIP rather than GLP-1 and
      carries α-aminoisobutyric acid substitutions at positions 2 and 13
      to resist DPP-4 cleavage, together with a C20 fatty-di-acid at
      lysine 20 attached through a γGlu-2xOEG spacer that supports
      reversible binding to serum albumin. These changes give a plasma
      half-life of approximately five days and enable once-weekly
      subcutaneous dosing. Tirzepatide is the first approved dual
      incretin receptor agonist and sits between GLP-1 mono-agonists
      such as Semaglutide and triple GLP-1 / GIP / glucagon agonists
      such as Retatrutide. Oxford Research Peptides supplies Tirzepatide
      as a lyophilised reference standard for in-vitro laboratory
      research only.
    </EA>
  ),
  "tirzepatide-mechanism-of-action": (
    <EA question="How does Tirzepatide act at its two receptors?">
      Tirzepatide binds and activates both the GIP receptor and the
      GLP-1 receptor — class B G-protein-coupled receptors coupled
      predominantly to Gαs. Activation at either receptor elevates
      intracellular cAMP, engaging protein kinase A and the
      PKA-independent effector EPAC2 to drive glucose-dependent insulin
      secretion, α-cell modulation and additional receptor-specific
      pharmacology. Reported in-vitro data characterise Tirzepatide as
      an imbalanced or biased GLP-1R agonist that recruits less
      β-arrestin than native GLP-1, while retaining near-native GIPR
      pharmacology. The GIP arm additionally engages the GIP-adipocyte
      axis, modulating lipid handling in adipose tissue, and both
      receptors are expressed in hypothalamic and hindbrain satiety
      circuits that integrate central appetite signalling. Dual receptor
      coverage is proposed to widen the incretin response beyond what
      GLP-1 mono-agonists such as Semaglutide can achieve.
    </EA>
  ),
  "tirzepatide-faq": (
    <EA question="What are the most common research questions about Tirzepatide?">
      Frequently asked research questions about Tirzepatide cluster
      around four themes: identity, mechanism, pharmacokinetics and
      laboratory handling. On identity, Tirzepatide is a 39-residue
      linear peptide (LY3298176) derived from a GIP scaffold with Aib
      substitutions at positions 2 and 13 and a Lys20 C20 fatty-di-acid.
      On mechanism, it is a dual GIP / GLP-1 receptor agonist reported
      to be biased at GLP-1R with reduced β-arrestin recruitment; both
      arms engage Gαs / cAMP / PKA. On pharmacokinetics, DPP-4
      resistance plus albumin binding via the C20 di-acid extend plasma
      half-life to approximately five days, enabling once-weekly
      subcutaneous dosing. On handling, in-vitro potency for long-chain
      acylated peptides is highly sensitive to buffer albumin content
      and low-binding plasticware. Trial context spans the SURPASS
      (type 2 diabetes) and SURMOUNT (obesity) programmes.
    </EA>
  ),
};

export const tirzepatideGuideFaqSupplements: Record<
  string,
  readonly { question: string; answer: string }[]
> = {
  "what-is-tirzepatide": [
    {
      question: "How was Tirzepatide discovered?",
      answer:
        "Tirzepatide (development code LY3298176) was described by Coskun and colleagues in Molecular Metabolism in 2018 as a novel dual GIP and GLP-1 receptor agonist engineered from a GIP-based scaffold with Aib substitutions and lysine-20 C20 fatty-di-acid acylation.",
    },
  ],
  "tirzepatide-mechanism-of-action": [
    {
      question: "Does Tirzepatide activate the glucagon receptor?",
      answer:
        "No. Tirzepatide does not appreciably engage the glucagon receptor at pharmacologically meaningful concentrations. Its dual-receptor pharmacology is confined to GIPR and GLP-1R, which distinguishes it from triple agonists such as Retatrutide.",
    },
    {
      question: "Which cAMP effector matters more at each receptor?",
      answer:
        "Both PKA and EPAC2 contribute at both receptors. PKA phosphorylates a broad set of intracellular substrates including transcription factors and ion channels, while EPAC2 drives PKA-independent glucose-dependent insulin exocytosis. Their relative contribution is context-dependent and remains an active research question.",
    },
  ],
};

export function getTirzepatideExtendedAnswer(slug: string): ReactNode | undefined {
  return tirzepatideGuideExtendedAnswers[slug];
}

export function getTirzepatideFaqSupplement(
  slug: string,
): readonly { question: string; answer: string }[] {
  return tirzepatideGuideFaqSupplements[slug] ?? [];
}
