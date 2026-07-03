/**
 * Authority Sprint 1B — Glossary content.
 *
 * First seven populated glossary entries, wiring the BPC-157 cornerstone
 * cluster into the Knowledge Graph. Each entry renders inside the
 * existing glossary route with a DefinedTerm schema block.
 *
 * External `sameAs` identifiers (UniProt, NCBI Gene, MeSH, ChEBI) are
 * added where a stable canonical identifier exists — this is what allows
 * generative-search systems to align our entities with the wider
 * scientific knowledge graph.
 */
import type { ReactNode } from "react";
import type { DefinedTermLdOpts } from "@/lib/seo";

export interface GlossaryContent {
  slug: string;
  term: string;
  short: string;
  aliases?: readonly string[];
  body: ReactNode;
  relatedCompoundSlugs?: readonly string[];
  relatedGuideSlugs?: readonly string[];
  relatedGlossarySlugs?: readonly string[];
  definedTerm: DefinedTermLdOpts;
  datePublished: string;
  dateModified: string;
}

function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-navy-deep/90">{children}</p>;
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5 text-sm">{children}</ul>;
}

const KG_SET = "Oxford Research Peptides Knowledge Graph";
const DATE = "2026-08-05";

const angiogenesis: GlossaryContent = {
  slug: "angiogenesis",
  term: "Angiogenesis",
  short:
    "Formation of new blood vessels from pre-existing vasculature, driven by endothelial proliferation and migration.",
  body: (
    <>
      <P>
        <strong>Angiogenesis</strong> is the biological process by which new
        blood vessels form from existing vasculature. It is distinct from
        vasculogenesis, which describes de-novo vessel formation from
        endothelial precursor cells. Angiogenesis underlies normal tissue
        development, wound repair and — in disease — tumour vascularisation
        and diabetic retinopathy.
      </P>
      <P>
        At the molecular level, angiogenesis is coordinated primarily by
        vascular endothelial growth factor (VEGF) signalling through the
        VEGFR2 receptor on endothelial cells, driving endothelial
        proliferation, migration and tube formation. Nitric-oxide
        signalling, integrin-mediated adhesion and the FAK-paxillin axis
        contribute downstream.
      </P>
      <P>
        In the context of BPC-157 research, several preclinical studies
        report enhanced angiogenic markers and endothelial activity
        following BPC-157 exposure, mediated in part by VEGFR2
        up-regulation.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["vegfr2", "nitric-oxide", "fibroblast"],
  definedTerm: {
    path: "/research-hub/glossary/angiogenesis",
    name: "Angiogenesis",
    description:
      "Formation of new blood vessels from pre-existing vasculature, driven by endothelial proliferation and migration and coordinated primarily by VEGF / VEGFR2 signalling.",
    termCode: "angiogenesis",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D000094623",
      "https://en.wikipedia.org/wiki/Angiogenesis",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const vegfr2: GlossaryContent = {
  slug: "vegfr2",
  term: "VEGFR2",
  short:
    "Vascular endothelial growth factor receptor 2 — the principal endothelial receptor tyrosine kinase driving angiogenic signalling.",
  aliases: ["KDR", "Kinase insert domain receptor", "Vascular endothelial growth factor receptor 2"],
  body: (
    <>
      <P>
        <strong>VEGFR2</strong> (vascular endothelial growth factor
        receptor 2; also known as KDR) is a receptor tyrosine kinase
        expressed principally on vascular endothelial cells. It is the
        primary receptor mediating the pro-angiogenic effects of
        VEGF-A, coupling ligand binding to endothelial proliferation,
        migration, survival and tube formation.
      </P>
      <P>
        Downstream signalling from activated VEGFR2 engages the
        PI3K-Akt-eNOS axis (linking VEGFR2 to nitric-oxide production),
        the MAPK cascade, and FAK-paxillin focal-adhesion signalling —
        pathways that together coordinate the endothelial phenotype
        required for new-vessel formation.
      </P>
      <P>
        In BPC-157 research, VEGFR2 is the most frequently cited
        receptor-level target. Reported effects are described as
        up-regulation and activation of VEGFR2 rather than direct
        high-affinity binding of BPC-157 to the receptor.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["angiogenesis", "nitric-oxide", "fak-paxillin"],
  definedTerm: {
    path: "/research-hub/glossary/vegfr2",
    name: "VEGFR2 (Vascular Endothelial Growth Factor Receptor 2)",
    description:
      "Receptor tyrosine kinase expressed on vascular endothelial cells and the principal mediator of VEGF-A driven angiogenic signalling.",
    termCode: "VEGFR2",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://www.uniprot.org/uniprotkb/P35968",
      "https://www.ncbi.nlm.nih.gov/gene/3791",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const nitricOxide: GlossaryContent = {
  slug: "nitric-oxide",
  term: "Nitric Oxide",
  short:
    "Small gaseous signalling molecule (NO) produced by nitric-oxide synthases, with vasodilatory, cytoprotective and cell-signalling roles.",
  aliases: ["NO"],
  body: (
    <>
      <P>
        <strong>Nitric oxide (NO)</strong> is a small gaseous signalling
        molecule generated enzymatically from L-arginine by three
        isoforms of nitric-oxide synthase: neuronal (nNOS / NOS1),
        inducible (iNOS / NOS2) and endothelial (eNOS / NOS3). NO
        diffuses freely across membranes and signals largely through
        activation of soluble guanylyl cyclase and elevation of cyclic
        GMP.
      </P>
      <P>
        In vascular biology, endothelial NO produced by eNOS is a
        principal vasodilator and contributes to platelet regulation and
        endothelial cytoprotection. In gastrointestinal biology, NO
        contributes to mucosal integrity — a system central to the
        cytoprotection framework within which BPC-157 is often
        discussed.
      </P>
      <P>
        In BPC-157 research, published rodent studies describe
        context-dependent modulation of the NO system: BPC-157 is
        reported to counter both L-NAME-induced NO-synthase inhibition
        and L-arginine-driven NO excess.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["vegfr2", "angiogenesis", "cytoprotection"],
  definedTerm: {
    path: "/research-hub/glossary/nitric-oxide",
    name: "Nitric Oxide (NO)",
    description:
      "Gaseous signalling molecule produced by nitric-oxide synthases from L-arginine; a principal endothelial vasodilator and contributor to mucosal cytoprotection.",
    termCode: "nitric-oxide",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D009569",
      "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:16480",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const cytoprotection: GlossaryContent = {
  slug: "cytoprotection",
  term: "Cytoprotection",
  short:
    "Research framework describing molecules that protect cells and tissues from injury independently of any specific receptor pathway.",
  body: (
    <>
      <P>
        <strong>Cytoprotection</strong> is a research framework introduced
        by André Robert and colleagues in the late 1970s to describe
        molecules that protect gastric mucosa (and later, other tissues)
        from injury without necessarily suppressing acid secretion or
        acting through a defined receptor. The related concept of
        <em> adaptive cytoprotection</em> extends the idea to
        pre-exposure with a mild injurious stimulus that raises
        resilience to a subsequent, stronger insult.
      </P>
      <P>
        Cytoprotection is not itself a receptor or a pathway — it is a
        <em> phenotypic framework</em> for describing convergent
        protective effects across tissues that may be driven by several
        molecular mechanisms.
      </P>
      <P>
        Sikirić and colleagues situate BPC-157 within this framework and
        describe it as an "organoprotector" with reported effects across
        gastrointestinal, vascular, musculoskeletal and neural
        preclinical models.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["nitric-oxide", "angiogenesis"],
  definedTerm: {
    path: "/research-hub/glossary/cytoprotection",
    name: "Cytoprotection",
    description:
      "Research framework describing molecules that protect cells and tissues from injury independently of any specific receptor pathway; associated with the work of Robert and later Sikirić.",
    termCode: "cytoprotection",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://meshb.nlm.nih.gov/record/ui?ui=D003471"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const pentadecapeptide: GlossaryContent = {
  slug: "pentadecapeptide",
  term: "Pentadecapeptide",
  short: "A peptide composed of fifteen amino-acid residues.",
  body: (
    <>
      <P>
        A <strong>pentadecapeptide</strong> is a peptide made up of
        fifteen amino-acid residues connected by peptide bonds. The
        prefix <em>penta-deca-</em> combines the Greek terms for five
        and ten.
      </P>
      <P>
        Fifteen residues sits at the boundary of "short peptide" and
        "medium peptide" chemistry: pentadecapeptides can be synthesised
        efficiently by solid-phase peptide synthesis and are typically
        purified by reversed-phase HPLC.
      </P>
      <UL>
        <li>Distinct from dipeptides, tripeptides and other short-chain species defined by residue count.</li>
        <li>Distinct from oligopeptides above 20 residues, which begin to occupy the polypeptide / small-protein range.</li>
        <li>The best-characterised pentadecapeptide in research-peptide chemistry is BPC-157 (sequence GEPPPGKPADDAGLV).</li>
      </UL>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action", "bpc-157-faq"],
  definedTerm: {
    path: "/research-hub/glossary/pentadecapeptide",
    name: "Pentadecapeptide",
    description:
      "Peptide composed of fifteen amino-acid residues connected by peptide bonds; commonly synthesised by solid-phase peptide synthesis.",
    termCode: "pentadecapeptide",
    inDefinedTermSet: KG_SET,
  },
  datePublished: DATE,
  dateModified: DATE,
};

const fibroblast: GlossaryContent = {
  slug: "fibroblast",
  term: "Fibroblast",
  short:
    "Connective-tissue cell that synthesises extracellular matrix and collagen and coordinates directed migration during tissue repair.",
  body: (
    <>
      <P>
        A <strong>fibroblast</strong> is a resident connective-tissue
        cell that produces the extracellular matrix and collagen
        scaffolds of most soft tissues. During tissue repair, fibroblasts
        proliferate, migrate directionally into the wound bed and
        remodel the matrix as new tissue matures.
      </P>
      <P>
        Directed fibroblast migration depends on focal-adhesion signalling
        — the FAK-paxillin axis in particular — which couples integrin
        engagement at the cell membrane to the cytoskeletal machinery
        that drives forward movement.
      </P>
      <P>
        In BPC-157 research, published work by Chang and colleagues
        reports that BPC-157 accelerates outgrowth and migration of
        cultured rat Achilles tendon fibroblasts through FAK-paxillin
        signalling.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["fak-paxillin", "angiogenesis"],
  definedTerm: {
    path: "/research-hub/glossary/fibroblast",
    name: "Fibroblast",
    description:
      "Connective-tissue cell that synthesises extracellular matrix and collagen and undergoes directed migration during tissue repair.",
    termCode: "fibroblast",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://meshb.nlm.nih.gov/record/ui?ui=D005347"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const fakPaxillin: GlossaryContent = {
  slug: "fak-paxillin",
  term: "FAK-Paxillin",
  short:
    "Focal-adhesion signalling axis coupling integrin engagement to directed cell migration and tissue-repair phenotypes.",
  body: (
    <>
      <P>
        <strong>FAK</strong> (focal adhesion kinase; PTK2) is a
        non-receptor cytoplasmic tyrosine kinase recruited to
        integrin-based focal adhesions at the cell membrane.
        <strong> Paxillin</strong> is a scaffold protein at the same
        adhesion complexes that binds FAK, vinculin and additional
        cytoskeletal partners.
      </P>
      <P>
        Together, the <strong>FAK-paxillin axis</strong> couples
        integrin engagement with the extracellular matrix to
        cytoskeletal reorganisation, focal-adhesion turnover and
        directed cell migration. It is a central regulator of
        fibroblast, endothelial and epithelial motility during tissue
        repair.
      </P>
      <P>
        In BPC-157 research, work by Chang and colleagues reports that
        BPC-157 promotes tendon fibroblast outgrowth and migration
        through the FAK-paxillin pathway.
      </P>
    </>
  ),
  relatedCompoundSlugs: ["bpc-157"],
  relatedGuideSlugs: ["bpc-157-mechanism-of-action"],
  relatedGlossarySlugs: ["fibroblast", "vegfr2", "angiogenesis"],
  definedTerm: {
    path: "/research-hub/glossary/fak-paxillin",
    name: "FAK-Paxillin Signalling Axis",
    description:
      "Focal-adhesion signalling axis in which focal adhesion kinase (FAK / PTK2) and the scaffold protein paxillin couple integrin engagement to directed cell migration.",
    termCode: "FAK-paxillin",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://www.uniprot.org/uniprotkb/Q05397",
      "https://www.uniprot.org/uniprotkb/P49023",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const glossaryContentRegistry: readonly GlossaryContent[] = [
  angiogenesis,
  vegfr2,
  nitricOxide,
  cytoprotection,
  pentadecapeptide,
  fibroblast,
  fakPaxillin,
];

export function getGlossaryContent(slug: string): GlossaryContent | undefined {
  return glossaryContentRegistry.find((g) => g.slug === slug);
}
