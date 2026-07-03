/**
 * Authority Sprint 2B — Semaglutide AI Search Optimisation layer.
 *
 * Additive supplement to the Semaglutide cluster: extended (120–180 word)
 * answers rendered beneath the QuickAnswer via GuideLayout's
 * `extendedAnswer` slot, plus FAQ supplements merged into per-page
 * FAQPage JSON-LD without editing existing content.
 *
 * Glossary DefinedTerm metadata is emitted directly by
 * `src/content/glossary-content.tsx`.
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

export const semaglutideGuideExtendedAnswers: Record<string, ReactNode> = {
  "what-is-semaglutide": (
    <EA question="What is Semaglutide?">
      Semaglutide is a synthetic long-acting glucagon-like peptide-1
      (GLP-1) receptor agonist first described in the peer-reviewed
      literature by Lau and colleagues in 2015. It is derived from the
      native human incretin GLP-1(7-37) with three targeted
      modifications: α-aminoisobutyric acid at position 8 (Aib8) to
      resist DPP-4 cleavage, arginine at position 34 (Arg34) to enable
      regioselective acylation, and a C18 fatty-di-acid attached at
      lysine-26 through a γGlu-2xOEG spacer that supports reversible
      binding to serum albumin. Together these changes extend plasma
      half-life to approximately one week in humans. Semaglutide
      selectively agonises the GLP-1 receptor, a class B G-protein-coupled
      receptor, and is one of the most extensively studied compounds in
      the GLP-1 class. Oxford Research Peptides supplies Semaglutide as
      a lyophilised reference standard for in-vitro laboratory research
      only.
    </EA>
  ),
  "semaglutide-mechanism-of-action": (
    <EA question="How does Semaglutide act at the GLP-1 receptor?">
      Semaglutide binds and activates the GLP-1 receptor (GLP-1R), a
      class B G-protein-coupled receptor coupled predominantly to Gαs.
      Receptor activation elevates intracellular cyclic AMP, engaging
      two parallel effector arms: protein kinase A, which phosphorylates
      ion channels, exocytotic machinery and transcription factors, and
      EPAC2, which supports glucose-dependent insulin exocytosis
      independently of PKA. β-arrestin is also recruited and contributes
      to receptor internalisation and pathway-specific signalling.
      Downstream biological outputs include glucose-dependent
      stimulation of insulin secretion from pancreatic β-cells,
      suppression of glucagon release from α-cells, slowed gastric
      emptying via vagal pathways, and reduced food intake through
      distributed central nervous system circuits involving brainstem
      NTS and hypothalamic POMC and NPY populations. Semaglutide does
      not agonise the GIP or glucagon receptors at meaningful
      concentrations.
    </EA>
  ),
  "semaglutide-faq": (
    <EA question="What are the most common research questions about Semaglutide?">
      Frequently asked research questions about Semaglutide cluster
      around four themes: identity, mechanism, pharmacokinetics and
      laboratory handling. On identity, Semaglutide is a 31-residue
      linear peptide derived from GLP-1(7-37) with Aib8, Arg34 and
      lysine-26 C18 fatty-di-acid modifications. On mechanism, it is a
      selective GLP-1R agonist engaging Gαs / cAMP / PKA and EPAC2, with
      β-arrestin recruitment, insulinotropic and glucagonostatic effects,
      slowed gastric emptying and distributed central appetite
      modulation. On pharmacokinetics, DPP-4 resistance plus albumin
      binding via the fatty-di-acid side chain extend plasma half-life
      to approximately one week, enabling once-weekly subcutaneous
      dosing and, with SNAC co-formulation, once-daily oral dosing.
      On handling, in-vitro potency for acylated GLP-1 analogues is
      highly sensitive to buffer albumin content and low-binding
      plasticware.
    </EA>
  ),
};

export const semaglutideGuideFaqSupplements: Record<
  string,
  readonly { question: string; answer: string }[]
> = {
  "semaglutide-mechanism-of-action": [
    {
      question: "Does Semaglutide have off-target receptor activity?",
      answer:
        "No pharmacologically meaningful off-target receptor activity is reported for Semaglutide at GIPR or GCGR. Its receptor selectivity for GLP-1R distinguishes it from dual (Tirzepatide) and triple (Retatrutide) receptor agonists.",
    },
    {
      question: "Which cAMP effector matters more — PKA or EPAC2?",
      answer:
        "Both contribute. PKA phosphorylates a broad set of substrates including transcription factors and ion channels, while EPAC2 supports PKA-independent glucose-dependent insulin exocytosis. The relative contribution is context-dependent and remains an active research question.",
    },
  ],
  "what-is-semaglutide": [
    {
      question: "How was Semaglutide discovered?",
      answer:
        "Semaglutide (development code NN9535) was described by Lau and colleagues in 2015 as a once-weekly GLP-1 analogue engineered from earlier work on Liraglutide by extending the fatty-acid modification chemistry.",
    },
  ],
};

export function getSemaglutideExtendedAnswer(slug: string): ReactNode | undefined {
  return semaglutideGuideExtendedAnswers[slug];
}

export function getSemaglutideFaqSupplement(
  slug: string,
): readonly { question: string; answer: string }[] {
  return semaglutideGuideFaqSupplements[slug] ?? [];
}
