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
      the GLP-1 class.
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
  "semaglutide-pharmacokinetics": (
    <EA question="What are the pharmacokinetics of Semaglutide?">
      Semaglutide has a plasma half-life of approximately one week in
      humans, dominated by two structural features: an Aib8 substitution
      that resists DPP-4 cleavage and a C18 fatty-di-acid at Lys26 that
      supports reversible non-covalent binding to serum albumin. Albumin
      binding exceeds 99%, so most of the peptide is sequestered from
      renal filtration and proteolysis while a small unbound fraction
      engages the GLP-1 receptor. Subcutaneous administration reaches peak
      plasma concentrations over one to three days, with steady state at
      roughly four to five weeks of once-weekly dosing. Oral Semaglutide
      is co-formulated with the absorption enhancer SNAC, giving ~1%
      bioavailability that is pharmacologically sufficient at the
      larger oral dose. Elimination is primarily proteolytic, with
      metabolites excreted in urine and faeces.
    </EA>
  ),
  "semaglutide-research-applications": (
    <EA question="Where has Semaglutide been studied in published research?">
      Semaglutide's published research base is broad. Metabolic evidence
      is strongest: SUSTAIN-6 (type 2 diabetes cardiovascular outcomes),
      STEP-1 (weight change in overweight and obesity) and PIONEER 6
      (oral Semaglutide in high-risk type 2 diabetes) are large
      randomised human trials. Cardiovascular evidence in obesity without
      diabetes derives from the SELECT trial. Renal outcomes are
      addressed by FLOW in type 2 diabetes with chronic kidney disease.
      Hepatic MASH endpoints combine randomised imaging and biopsy
      studies with mechanistic preclinical work. Central-nervous-system
      applications — including neuroinflammation — remain predominantly
      preclinical, resting on rodent circuit-mapping work such as Gabery
      and colleagues. Oxford Research Peptides describes this literature
      as scientific context.
    </EA>
  ),
  "albumin-binding-half-life-extension": (
    <EA question="How does albumin binding extend the half-life of GLP-1 peptides?">
      Serum albumin evolved to transport long-chain fatty acids and
      carries multiple hydrophobic binding sites of low-micromolar
      affinity. A peptide fitted with a fatty-acid side chain — a C16
      mono-acid on Liraglutide, a C18 di-acid with a γGlu-2xOEG spacer on
      Semaglutide — occupies these sites reversibly and inherits albumin's
      slow turnover. Because binding is reversible and non-covalent, only
      the small unbound fraction is available to engage the receptor and
      to be cleared, so intrinsic receptor pharmacology is largely
      preserved while renal filtration and proteolysis are dramatically
      reduced. The chemistry of the acylation modulates the effect:
      Liraglutide's mono-acid supports a ~13 h half-life and once-daily
      dosing, while Semaglutide's di-acid with a longer spacer supports a
      ~1 week half-life and once-weekly dosing. Combining albumin binding
      with DPP-4 resistance is what makes this class practical.
    </EA>
  ),
  "incretin-effect-explained": (
    <EA question="What is the incretin effect and why does it matter?">
      The incretin effect describes the observation that oral glucose
      provokes substantially more insulin secretion than an equivalent
      intravenous glucose challenge. Two gut peptides mediate it:
      glucagon-like peptide-1 (GLP-1) released from intestinal L-cells,
      and glucose-dependent insulinotropic polypeptide (GIP) released
      from K-cells. Both amplify glucose-dependent insulin secretion from
      pancreatic β-cells at class B G-protein-coupled receptors, and
      GLP-1 additionally suppresses glucagon secretion, slows gastric
      emptying and modulates central appetite pathways. Native GLP-1 has
      a plasma half-life of only one to two minutes because it is
      rapidly cleaved by DPP-4 — the fundamental problem long-acting
      analogues such as Semaglutide were engineered to solve.
      Understanding incretin biology is foundational to interpreting the
      pharmacology of every GLP-1 receptor agonist and every dual or
      triple agonist that builds on this class.
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
