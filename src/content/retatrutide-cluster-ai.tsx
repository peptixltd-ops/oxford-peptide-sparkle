/**
 * Release 6.0A — AI Search Optimisation layer.
 *
 * This module supplements the Retatrutide authority cluster with content
 * targeted at generative-search and LLM retrieval:
 *   1. `guideExtendedAnswers` — 120–180 word structured explanations that
 *      render beneath the concise Quick Answer via the guide-layout
 *      `extendedAnswer` slot.
 *   2. `guideDefinedTerms` — schema.org DefinedTerm JSON-LD metadata for
 *      receptor- and concept-level pages.
 *   3. `guideFaqSupplements` — additional FAQ questions merged into the
 *      per-page FAQPage JSON-LD without editing existing content.
 *
 * Everything here is additive — the underlying cluster file is untouched.
 */
import type { ReactNode } from "react";
import { HundredFiftyWordAnswer } from "@/components/publishing";
import type { DefinedTermLdOpts } from "@/lib/seo";

// ---------------------------------------------------------------------------
// Extended (120–180 word) answers for AI retrieval
// ---------------------------------------------------------------------------

function EA({ question, children }: { question: string; children: ReactNode }) {
  return (
    <HundredFiftyWordAnswer title="Extended answer" question={question}>
      {children}
    </HundredFiftyWordAnswer>
  );
}

export const guideExtendedAnswers: Record<string, ReactNode> = {
  "what-is-retatrutide": (
    <EA question="What is Retatrutide (LY3437943)?">
      Retatrutide, developmental code LY3437943, is an investigational
      synthetic peptide first described in the peer-reviewed literature by
      Coskun and colleagues in 2022. It is engineered to activate three
      related class B G-protein-coupled receptors — GLP-1R, GIPR and GCGR —
      from a single molecule, placing it in the emerging triple-agonist
      category alongside single-agonists such as Semaglutide and
      dual-agonists such as Tirzepatide. A fatty-acid modification supports
      albumin binding and an extended plasma half-life, enabling
      once-weekly dosing in reported phase 2 trials for obesity and type 2
      diabetes. Oxford Research Peptides supplies Retatrutide strictly as a
      lyophilised reference standard for in-vitro laboratory research; the
      compound is investigational and is not approved for therapeutic use
      in the United Kingdom.
    </EA>
  ),
  "retatrutide-mechanism-of-action": (
    <EA question="How does Retatrutide act at GLP-1R, GIPR and GCGR?">
      Retatrutide binds and activates three related class B secretin-like
      G-protein-coupled receptors — GLP-1R, GIPR and GCGR — from a single
      peptide backbone. All three receptors couple primarily to Gαs,
      elevate intracellular cyclic AMP and engage downstream effectors
      including protein kinase A and Epac. The reported discovery
      pharmacology describes balanced full-agonist activity across the
      three targets in cell-based cAMP assays, meaning each receptor is
      driven to near-maximal efficacy at comparable relative potency. The
      biological outputs differ by tissue: GLP-1R and GIPR support
      incretin-mediated insulin secretion and satiety signalling, while
      GCGR contributes to hepatic glucose output and energy expenditure.
      Long-term receptor adaptations and the relative contribution of each
      receptor to observed clinical effects remain open questions in the
      published literature.
    </EA>
  ),
  "glp-1-receptor-explained": (
    <EA question="What is the GLP-1 receptor and why does it matter for research peptides?">
      The GLP-1 receptor (GLP-1R) is a class B secretin-like
      G-protein-coupled receptor activated by the endogenous incretin
      hormone glucagon-like peptide-1 (7-36) amide. Ligand binding at its
      large extracellular N-terminal domain stabilises an active
      conformation that engages Gαs, elevates cyclic AMP and activates
      downstream effectors including protein kinase A and Epac. In the
      pancreas, GLP-1R signalling amplifies glucose-dependent insulin
      secretion; in the central nervous system it contributes to satiety
      signalling. GLP-1R is the shared molecular target of a large family
      of research peptides: single-agonists such as Semaglutide engage
      GLP-1R alone, dual-agonists such as Tirzepatide add GIPR, and
      triple-agonists such as Retatrutide add GCGR to the same scaffold.
      Working with recombinant human GLP-1R in HEK293 or CHO cell lines
      supports cAMP-based functional assays.
    </EA>
  ),
  "gip-receptor-explained": (
    <EA question="What is the GIP receptor and what role does it play in multi-agonist peptides?">
      The GIP receptor (GIPR) is a class B secretin-like G-protein-coupled
      receptor activated by the incretin hormone glucose-dependent
      insulinotropic polypeptide, a 42-amino-acid peptide released from
      intestinal K-cells in response to nutrient intake. GIPR couples
      primarily to Gαs, elevates intracellular cyclic AMP and drives
      glucose-dependent insulin secretion from pancreatic β-cells, with
      additional reported effects in adipose tissue and the central
      nervous system. Historically GLP-1R was the sole incretin-family
      target for peptide-drug research; adding GIPR engagement gives the
      dual agonist Tirzepatide its distinctive pharmacological profile,
      and Retatrutide extends this further by combining GIPR with GLP-1R
      and GCGR activity in one molecule. In-vitro potency at GIPR is
      typically characterised in recombinant HEK293 or CHO systems using
      cAMP-response readouts.
    </EA>
  ),
  "glucagon-receptor-explained": (
    <EA question="What is the glucagon receptor and why is it engaged by triple-agonist peptides?">
      The glucagon receptor (GCGR) is a class B secretin-like
      G-protein-coupled receptor activated by the 29-residue pancreatic
      peptide hormone glucagon, which is secreted from pancreatic α-cells
      principally in response to hypoglycaemia. GCGR couples primarily to
      Gαs and elevates intracellular cyclic AMP, with additional Gαq
      coupling that supports calcium mobilisation. It is highly expressed
      in hepatocytes, where activation drives gluconeogenesis and
      glycogenolysis; reported effects also extend to hepatic lipid
      handling and thermogenesis. Adding controlled GCGR activity to a
      GLP-1R / GIPR scaffold is the defining feature of the triple-agonist
      category exemplified by Retatrutide, and the scientific rationale
      centres on possible metabolic effects that a pure incretin agonist
      may not achieve. In-vitro pharmacology at GCGR is characterised by
      cAMP-response assays and, orthogonally, calcium-mobilisation
      readouts in recombinant systems.
    </EA>
  ),
  "triple-agonists-explained": (
    <EA question="What is a triple GLP-1 / GIP / glucagon receptor agonist?">
      A triple agonist is a single peptide engineered to activate three
      related class B G-protein-coupled receptors — GLP-1R, GIPR and GCGR
      — from one molecule. This positions the category one step beyond
      single-agonists such as Semaglutide, which engage only GLP-1R, and
      dual-agonists such as Tirzepatide, which add GIPR. The reference
      example in the published literature is Retatrutide (LY3437943),
      described by Coskun and colleagues as producing balanced full-agonist
      activity at all three receptors in cell-based cAMP assays. The
      structural strategy combines a modified incretin / glucagon backbone
      with amino-acid substitutions that preserve engagement at three
      related but non-identical receptor pockets, together with a
      fatty-acid modification for albumin binding and extended half-life.
      The category is currently defined by a small number of investigational
      compounds; long-term outcomes and independent replication continue to
      develop.
    </EA>
  ),
  "laboratory-reconstitution-guide": (
    <EA question="How is a lyophilised research peptide correctly reconstituted?">
      Reconstitution converts a lyophilised peptide reference standard
      into a working stock of known concentration for downstream
      laboratory use. Standard practice begins by confirming compound
      identity, batch and certificate-of-analysis peptide content, then
      calculating the diluent volume required for the target concentration
      using the relation volume = mass / concentration. Sterile or
      bacteriostatic water is the default diluent for most research
      peptides. The vial is equilibrated to room temperature, briefly
      centrifuged to collect material at the base, and diluent is
      introduced slowly against the inner wall of the vial — never onto
      the lyophilised cake directly. The solution is swirled gently rather
      than vortexed to avoid shear-driven aggregation, allowed to dissolve
      fully, then aliquoted into low-binding vials sized for single use
      and labelled with peptide, concentration, date, batch and analyst.
    </EA>
  ),
  "laboratory-storage-guide": (
    <EA question="How should lyophilised and reconstituted research peptides be stored?">
      Peptide reference standards are sensitive to four principal stress
      factors — temperature, humidity, light and repeated freeze-thaw
      cycles — and effective storage practice controls each systematically.
      Lyophilised solids are typically held at −20 °C in a dedicated
      peptide-storage freezer, kept desiccated in a sealed container or
      foil pouch with fresh desiccant, and equilibrated to room
      temperature before opening to prevent moisture condensation on cold
      material. Reconstituted stocks are aliquoted immediately after
      reconstitution into low-binding vials sized for single use where
      possible, with the working aliquot held at 2–8 °C and remaining
      aliquots stored at −20 °C protected from light. Each aliquot is
      thawed only once. Compound-specific stability data from a
      certificate of analysis or peer-reviewed report always takes
      precedence over these general defaults.
    </EA>
  ),
  "retatrutide-research-applications": (
    <EA question="How is Retatrutide used in laboratory research?">
      Retatrutide is used in vitro as a reference standard for
      incretin-receptor pharmacology and for analytical characterisation
      of peptide reference material. Common applications include
      functional cyclic-AMP dose-response assays and radioligand or
      fluorescent displacement binding at recombinant human GLP-1R, GIPR
      and GCGR expressed in HEK293 or CHO cell lines, together with
      orthogonal readouts such as calcium mobilisation and β-arrestin
      recruitment for signalling-bias studies. As a synthetic peptide
      reference, Retatrutide is also used in reversed-phase HPLC identity
      and purity methods and in mass-spectrometry confirmation of intact
      mass and fragmentation. Because it defines the triple-agonist
      category, it is often included as a comparator in side-by-side
      pharmacology alongside single-agonists such as Semaglutide and
      dual-agonists such as Tirzepatide. Published sponsor-led phase 2
      trials provide translational context for its position within the
      incretin-mimetic peptide family.
    </EA>
  ),
  "retatrutide-faq": (
    <EA question="What are the most common research questions about Retatrutide?">
      Frequently asked research questions about Retatrutide (LY3437943)
      cluster around four themes: identity, pharmacology, laboratory
      handling and research context. On identity, Retatrutide is an
      investigational synthetic peptide with molecular formula
      C226H344N50O68 and reported molecular weight of approximately
      4731 g/mol, classified as a triple GLP-1 / GIP / glucagon receptor
      agonist. On pharmacology, published discovery data describe balanced
      full-agonist activity at all three receptors in cell-based cAMP
      assays. On handling, lyophilised material is stored at −20 °C,
      desiccated and protected from light, and reconstituted in sterile or
      bacteriostatic water using aseptic technique. On research context,
      Retatrutide is supplied strictly as an in-vitro reference standard;
      it is investigational and not approved for therapeutic use in the
      United Kingdom. Primary sources include Coskun 2022, Jastreboff 2023
      and Rosenstock 2023.
    </EA>
  ),
};

// ---------------------------------------------------------------------------
// DefinedTerm schema for entity-first pages (glossary-adjacent)
// ---------------------------------------------------------------------------

export const guideDefinedTerms: Record<string, DefinedTermLdOpts> = {
  "glp-1-receptor-explained": {
    path: "/research-hub/guides/glp-1-receptor-explained",
    name: "GLP-1 Receptor (GLP-1R)",
    description:
      "Class B secretin-like G-protein-coupled receptor activated by the endogenous incretin hormone glucagon-like peptide-1; primary molecular target of single-, dual- and triple-agonist research peptides.",
    termCode: "GLP1R",
    inDefinedTermSet: "Oxford Research Peptides Knowledge Graph",
    sameAs: [
      "https://www.uniprot.org/uniprotkb/P43220",
      "https://www.ncbi.nlm.nih.gov/gene/2740",
    ],
  },
  "gip-receptor-explained": {
    path: "/research-hub/guides/gip-receptor-explained",
    name: "GIP Receptor (GIPR)",
    description:
      "Class B secretin-like G-protein-coupled receptor activated by glucose-dependent insulinotropic polypeptide; incretin-family receptor engaged by dual and triple agonists.",
    termCode: "GIPR",
    inDefinedTermSet: "Oxford Research Peptides Knowledge Graph",
    sameAs: [
      "https://www.uniprot.org/uniprotkb/P48546",
      "https://www.ncbi.nlm.nih.gov/gene/2696",
    ],
  },
  "glucagon-receptor-explained": {
    path: "/research-hub/guides/glucagon-receptor-explained",
    name: "Glucagon Receptor (GCGR)",
    description:
      "Class B secretin-like G-protein-coupled receptor activated by the pancreatic peptide hormone glucagon; hepatic receptor engaged as the third target in triple-agonist research peptides.",
    termCode: "GCGR",
    inDefinedTermSet: "Oxford Research Peptides Knowledge Graph",
    sameAs: [
      "https://www.uniprot.org/uniprotkb/P47871",
      "https://www.ncbi.nlm.nih.gov/gene/2642",
    ],
  },
  "triple-agonists-explained": {
    path: "/research-hub/guides/triple-agonists-explained",
    name: "Triple GLP-1 / GIP / Glucagon Receptor Agonist",
    description:
      "Category of research peptides engineered to activate three related class B G-protein-coupled receptors — GLP-1R, GIPR and GCGR — from a single molecule; defined in the current literature by Retatrutide (LY3437943).",
    termCode: "triple-agonist",
    inDefinedTermSet: "Oxford Research Peptides Knowledge Graph",
  },
};

// ---------------------------------------------------------------------------
// FAQ supplements — merged into per-page FAQPage JSON-LD
// ---------------------------------------------------------------------------

export const guideFaqSupplements: Record<
  string,
  readonly { question: string; answer: string }[]
> = {
  "retatrutide-mechanism-of-action": [
    {
      question: "Which G-protein does Retatrutide signal through?",
      answer:
        "Retatrutide's three targets — GLP-1R, GIPR and GCGR — all couple primarily to Gαs, so activation converges on elevation of intracellular cyclic AMP.",
    },
    {
      question: "Is Retatrutide biased at any of its three receptors?",
      answer:
        "Published discovery pharmacology characterises Retatrutide as producing balanced full-agonist activity across GLP-1R, GIPR and GCGR in cell-based cAMP assays. Fine-grained signalling-bias analyses continue to develop.",
    },
    {
      question: "What limits the current mechanistic evidence?",
      answer:
        "Primary pharmacology is described in a single discovery paper; independent replication, the relative contribution of each receptor in vivo, and long-term signalling adaptations beyond published trial durations remain open questions.",
    },
  ],
  "glp-1-receptor-explained": [
    {
      question: "What is the GLP-1 receptor?",
      answer:
        "The GLP-1 receptor (GLP-1R) is a class B G-protein-coupled receptor activated by the endogenous incretin hormone glucagon-like peptide-1 (7-36) amide.",
    },
    {
      question: "What signalling pathway does GLP-1R activate?",
      answer:
        "GLP-1R couples primarily to Gαs, elevates intracellular cyclic AMP and activates downstream effectors including protein kinase A and Epac.",
    },
    {
      question: "Which research peptides target GLP-1R?",
      answer:
        "GLP-1R is engaged by single-agonists such as Semaglutide and Liraglutide-class analogues, by dual-agonists such as Tirzepatide (GLP-1R + GIPR) and by triple-agonists such as Retatrutide (GLP-1R + GIPR + GCGR).",
    },
  ],
  "laboratory-reconstitution-guide": [
    {
      question: "What diluent should be used to reconstitute a research peptide?",
      answer:
        "Sterile or bacteriostatic water is the default diluent for most research peptides. Some peptides are more soluble with a small proportion of acetic acid or another co-solvent — always consult compound-specific documentation.",
    },
    {
      question: "Why should peptide solutions not be vortexed?",
      answer:
        "Vortex-induced shear can promote aggregation of sensitive peptides. Gentle swirling until fully dissolved is preferred.",
    },
    {
      question: "How should reconstituted stocks be aliquoted?",
      answer:
        "Aliquot into low-binding vials sized for single use where possible, labelled with peptide, concentration, diluent, date, batch and analyst, then store per the laboratory storage guide.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Convenience accessors
// ---------------------------------------------------------------------------

export function getExtendedAnswer(slug: string): ReactNode | undefined {
  return guideExtendedAnswers[slug];
}

export function getDefinedTerm(slug: string): DefinedTermLdOpts | undefined {
  return guideDefinedTerms[slug];
}

export function getFaqSupplement(
  slug: string,
): readonly { question: string; answer: string }[] {
  return guideFaqSupplements[slug] ?? [];
}
