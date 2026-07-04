/**
 * Glossary content registry.
 *
 * Authority Sprint 1B seeded seven BPC-157–adjacent entries. The Glossary
 * Foundation Sprint (Batch 1) extends the registry with 30 foundational
 * peptide-science entries spanning general peptide chemistry, pharmacology,
 * receptor biology and laboratory analysis. Every entry:
 *
 *  • uses the shared GlossaryContent shape (rendered by
 *    `src/routes/research-hub.glossary.$slug.tsx`)
 *  • carries structured `DefinedTerm` metadata with `sameAs` identifiers
 *    (Wikidata / MeSH / UniProt / NCBI Gene / ChEBI) where a stable
 *    canonical identifier exists
 *  • links to at least two related glossary terms so no page is an
 *    orphan (>= 2 outbound; inbound reciprocity is provided through
 *    reverse mentions in the batch)
 *  • is registered in `src/lib/taxonomy.ts` so the Knowledge Graph,
 *    sitemap and category listings pick it up automatically.
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
function Why({ children }: { children: ReactNode }) {
  return (
    <div className="border-l-2 border-gold pl-4">
      <div className="text-[10px] font-bold tracking-widest text-gold mb-1">
        WHY IT MATTERS
      </div>
      <p className="text-sm leading-relaxed text-navy-deep/90">{children}</p>
    </div>
  );
}

const KG_SET = "Oxford Research Peptides Knowledge Graph";
const DATE = "2026-08-12";
const SPRINT_DATE = "2026-08-05";

// ---------------------------------------------------------------------------
// Existing entries (Authority Sprint 1B — BPC-157 cluster)
// ---------------------------------------------------------------------------

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
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  relatedGlossarySlugs: ["angiogenesis", "nitric-oxide", "fak-paxillin", "receptor", "signal-transduction"],
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
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  relatedGlossarySlugs: ["vegfr2", "angiogenesis", "cytoprotection", "second-messenger"],
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
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  relatedGlossarySlugs: ["nitric-oxide", "angiogenesis", "pharmacodynamics"],
  definedTerm: {
    path: "/research-hub/glossary/cytoprotection",
    name: "Cytoprotection",
    description:
      "Research framework describing molecules that protect cells and tissues from injury independently of any specific receptor pathway; associated with the work of Robert and later Sikirić.",
    termCode: "cytoprotection",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://meshb.nlm.nih.gov/record/ui?ui=D003471"],
  },
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  relatedGlossarySlugs: ["peptide", "amino-acid", "peptide-bond"],
  definedTerm: {
    path: "/research-hub/glossary/pentadecapeptide",
    name: "Pentadecapeptide",
    description:
      "Peptide composed of fifteen amino-acid residues connected by peptide bonds; commonly synthesised by solid-phase peptide synthesis.",
    termCode: "pentadecapeptide",
    inDefinedTermSet: KG_SET,
  },
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
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
  relatedGlossarySlugs: ["fibroblast", "vegfr2", "angiogenesis", "signal-transduction"],
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
  datePublished: SPRINT_DATE,
  dateModified: SPRINT_DATE,
};

// ---------------------------------------------------------------------------
// Batch 1 — General Peptide Science
// ---------------------------------------------------------------------------

const peptide: GlossaryContent = {
  slug: "peptide",
  term: "Peptide",
  short:
    "Short chain of amino-acid residues joined by peptide bonds, typically fewer than about 50 residues in length.",
  aliases: ["Oligopeptide"],
  body: (
    <>
      <P>
        A <strong>peptide</strong> is a molecule composed of two or more
        amino-acid residues covalently linked by peptide (amide) bonds. By
        convention, chains of up to roughly 50 residues are described as
        peptides; longer chains that adopt a stable tertiary fold are
        described as proteins, though the boundary is not sharp.
      </P>
      <P>
        Peptides are typically written from N-terminus (free amine) to
        C-terminus (free carboxyl) using the one- or three-letter amino-acid
        code. Their primary structure — sequence, length, and any
        post-translational or synthetic modifications (acetylation,
        amidation, PEGylation, lipidation, cyclisation) — determines
        physicochemical properties such as solubility, charge, stability
        and receptor affinity.
      </P>
      <Why>
        Peptide is the base term underneath every compound in this
        catalogue. Receptor ligands, mimetics and reference standards are
        all classes of peptides differentiated by sequence and
        modification strategy.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["amino-acid", "peptide-bond", "molecular-weight", "pentadecapeptide"],
  definedTerm: {
    path: "/research-hub/glossary/peptide",
    name: "Peptide",
    description:
      "Short chain of amino-acid residues joined by peptide bonds, typically fewer than about 50 residues.",
    termCode: "peptide",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D010455",
      "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:16670",
      "https://www.wikidata.org/wiki/Q172847",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const aminoAcid: GlossaryContent = {
  slug: "amino-acid",
  term: "Amino Acid",
  short:
    "Bifunctional organic molecule bearing both an amino and a carboxyl group; the monomer unit of peptides and proteins.",
  body: (
    <>
      <P>
        An <strong>amino acid</strong> is an organic molecule containing
        both an amino group (–NH₂) and a carboxyl group (–COOH) attached
        to a central α-carbon that also bears a hydrogen and a
        side-chain (R group). The identity of the side chain distinguishes
        the twenty proteinogenic amino acids encoded by the standard
        genetic code and defines their polarity, charge and reactivity.
      </P>
      <P>
        Amino acids polymerise through condensation to form peptide
        bonds, releasing water and generating chains whose sequence
        constitutes the primary structure of a peptide or protein.
        Non-standard and D-configured amino acids are frequently
        incorporated into research peptides to modulate proteolytic
        stability, receptor selectivity or conformation.
      </P>
      <Why>
        Every downstream concept — sequence, molecular weight,
        modification, receptor interaction — is defined in terms of the
        constituent amino acids.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["peptide", "peptide-bond", "molecular-weight"],
  definedTerm: {
    path: "/research-hub/glossary/amino-acid",
    name: "Amino Acid",
    description:
      "Organic monomer of peptides and proteins bearing both amino and carboxyl functional groups on a central α-carbon.",
    termCode: "amino-acid",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D000596",
      "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:33709",
      "https://www.wikidata.org/wiki/Q37891",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const peptideBond: GlossaryContent = {
  slug: "peptide-bond",
  term: "Peptide Bond",
  short:
    "Covalent amide linkage formed between the carboxyl group of one amino acid and the amino group of the next, releasing water.",
  aliases: ["Amide bond"],
  body: (
    <>
      <P>
        A <strong>peptide bond</strong> is the covalent amide (–C(O)–NH–)
        linkage that joins consecutive amino-acid residues in a peptide
        or protein. It is formed by a condensation (dehydration) reaction
        between the α-carboxyl of one amino acid and the α-amino of the
        next, releasing one molecule of water.
      </P>
      <P>
        The peptide bond has partial double-bond character due to
        delocalisation of the carbonyl π-electrons onto the nitrogen. As
        a result the bond is planar and predominantly adopts the
        trans-configuration, restricting rotation and constraining
        backbone conformation to the φ / ψ angles described by the
        Ramachandran plot.
      </P>
      <Why>
        Peptide-bond geometry determines backbone folding and, together
        with side-chain chemistry, sets the conformational landscape a
        peptide can occupy — a prerequisite for receptor binding.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["amino-acid", "peptide", "molecular-weight"],
  definedTerm: {
    path: "/research-hub/glossary/peptide-bond",
    name: "Peptide Bond",
    description:
      "Covalent amide linkage between the carboxyl group of one amino acid and the amino group of the next.",
    termCode: "peptide-bond",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D010449",
      "https://www.wikidata.org/wiki/Q192065",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const lyophilisation: GlossaryContent = {
  slug: "lyophilisation",
  term: "Lyophilisation",
  short:
    "Low-temperature dehydration process (freeze-drying) that removes water from a frozen sample by sublimation under vacuum.",
  aliases: ["Freeze-drying", "Lyophilization"],
  body: (
    <>
      <P>
        <strong>Lyophilisation</strong>, also called freeze-drying, is a
        dehydration process in which a frozen aqueous sample is placed
        under reduced pressure so that water sublimes directly from the
        solid to the vapour phase, bypassing the liquid state. The
        process typically comprises three stages: freezing, primary
        drying (sublimation of ice) and secondary drying (desorption of
        residual bound water).
      </P>
      <P>
        Because the sample never returns to a liquid phase, thermally
        labile molecules such as peptides retain their conformation and
        activity. The resulting cake — a lyophilised powder — is
        stable at ambient or refrigerated temperatures for long periods
        and is reconstituted for use by adding a defined volume of
        sterile diluent.
      </P>
      <Why>
        Lyophilisation is the standard preservation method for research
        peptides. Understanding it is essential for correct shipping,
        storage and reconstitution.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["lyophilised-powder", "reconstitution", "stability"],
  definedTerm: {
    path: "/research-hub/glossary/lyophilisation",
    name: "Lyophilisation (Freeze-Drying)",
    description:
      "Dehydration process in which water is removed from a frozen sample by sublimation under vacuum.",
    termCode: "lyophilisation",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D005612",
      "https://www.wikidata.org/wiki/Q898091",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const lyophilisedPowder: GlossaryContent = {
  slug: "lyophilised-powder",
  term: "Lyophilised Powder",
  short:
    "Dry, porous cake or powder produced by freeze-drying an aqueous peptide solution; the standard supplied form of research peptides.",
  aliases: ["Freeze-dried powder", "Lyophilizate"],
  body: (
    <>
      <P>
        A <strong>lyophilised powder</strong> is the solid residue that
        remains after an aqueous solution of a peptide has been
        freeze-dried. It typically presents as a fluffy, porous cake or
        as a fine amorphous powder, and may include bulking or
        stabilising excipients such as mannitol or trehalose depending
        on the manufacturing process.
      </P>
      <P>
        The porous structure resulting from ice-crystal sublimation
        provides a high surface area, which enables rapid and complete
        reconstitution when sterile diluent is added. Lyophilised
        powders are typically shipped and stored between –20 °C and 8 °C
        to maximise long-term stability.
      </P>
      <Why>
        Every reconstitution calculation, storage decision and stability
        expectation for a research peptide starts from its lyophilised
        form.
      </Why>
    </>
  ),
  relatedGuideSlugs: ["laboratory-reconstitution-guide", "laboratory-storage-guide"],
  relatedGlossarySlugs: ["lyophilisation", "reconstitution", "stability", "bioavailability"],
  definedTerm: {
    path: "/research-hub/glossary/lyophilised-powder",
    name: "Lyophilised Powder",
    description:
      "Dry porous cake or powder produced by freeze-drying an aqueous peptide solution.",
    termCode: "lyophilised-powder",
    inDefinedTermSet: KG_SET,
  },
  datePublished: DATE,
  dateModified: DATE,
};

const reconstitution: GlossaryContent = {
  slug: "reconstitution",
  term: "Reconstitution",
  short:
    "Aseptic procedure in which a lyophilised peptide is dissolved in a defined volume of sterile diluent to yield a solution of known concentration.",
  body: (
    <>
      <P>
        <strong>Reconstitution</strong> is the aseptic laboratory
        procedure by which a lyophilised peptide is dissolved into a
        sterile diluent — most commonly bacteriostatic water for
        injection, sterile water for injection, or 0.9% sodium chloride
        — to prepare a stock solution at a known concentration.
      </P>
      <P>
        Correct reconstitution requires accurate diluent-volume
        calculation from the target concentration, gentle swirling
        rather than vortexing to avoid foaming and shear-induced
        aggregation, and a brief equilibration period to allow full
        dissolution. Post-reconstitution solutions are typically stored
        at 2–8 °C or aliquoted and frozen at −20 °C.
      </P>
      <Why>
        Reconstitution converts a shelf-stable powder into a working
        solution whose concentration underpins every downstream dose,
        assay dilution and stability calculation.
      </Why>
    </>
  ),
  relatedGuideSlugs: ["laboratory-reconstitution-guide"],
  relatedGlossarySlugs: ["lyophilised-powder", "lyophilisation", "stability", "molecular-weight"],
  definedTerm: {
    path: "/research-hub/glossary/reconstitution",
    name: "Reconstitution",
    description:
      "Aseptic dissolution of a lyophilised peptide in a defined volume of sterile diluent to prepare a solution of known concentration.",
    termCode: "reconstitution",
    inDefinedTermSet: KG_SET,
  },
  datePublished: DATE,
  dateModified: DATE,
};

const bioavailability: GlossaryContent = {
  slug: "bioavailability",
  term: "Bioavailability",
  short:
    "Fraction of an administered dose of a compound that reaches the systemic circulation in an active form, expressed as a percentage.",
  aliases: ["F"],
  body: (
    <>
      <P>
        <strong>Bioavailability</strong> (symbol F) is a pharmacokinetic
        parameter that quantifies the proportion of an administered dose
        of a compound that reaches the systemic circulation in an
        unchanged, active form. It is measured by comparing the area
        under the concentration-time curve (AUC) of a non-intravenous
        route against an intravenous reference dose, which is defined as
        F = 1.
      </P>
      <P>
        Peptides administered orally typically show very low
        bioavailability because they are hydrolysed by gastric and
        intestinal proteases and have limited transport across the
        intestinal epithelium. Parenteral routes (subcutaneous,
        intramuscular) can achieve substantially higher F values;
        pegylation, lipidation and cyclisation are structural strategies
        used to raise it further.
      </P>
      <Why>
        Bioavailability defines the effective dose that reaches its
        target and is a central variable in any preclinical
        pharmacokinetic study of a research peptide.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["half-life", "pharmacodynamics", "stability"],
  definedTerm: {
    path: "/research-hub/glossary/bioavailability",
    name: "Bioavailability",
    description:
      "Fraction of an administered dose of a compound that reaches the systemic circulation in an active form.",
    termCode: "bioavailability",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D001682",
      "https://www.wikidata.org/wiki/Q898950",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const halfLife: GlossaryContent = {
  slug: "half-life",
  term: "Half-life",
  short:
    "Time required for the plasma concentration of a compound to fall to half of its initial value.",
  aliases: ["t½", "Elimination half-life"],
  body: (
    <>
      <P>
        The <strong>half-life</strong> (t½) of a compound is the time
        required for its plasma concentration to decline to half of a
        given starting value. For a compound following first-order
        elimination kinetics, t½ is a constant related to the elimination
        rate constant kₑ by the relationship t½ = ln(2) / kₑ ≈ 0.693 / kₑ.
      </P>
      <P>
        Half-life determines the dosing interval required to maintain a
        steady-state plasma concentration and the time to reach and
        depart from that steady state (approximately four to five
        half-lives). Native peptides typically show very short
        half-lives (minutes to a few hours) due to rapid proteolytic
        degradation and renal clearance; modifications such as
        albumin-binding lipid tails or pegylation extend it substantially.
      </P>
      <Why>
        Half-life is one of the two variables (with bioavailability) that
        define a peptide's dosing profile and is central to any
        preclinical pharmacokinetic characterisation.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["bioavailability", "pharmacodynamics", "stability"],
  definedTerm: {
    path: "/research-hub/glossary/half-life",
    name: "Half-life (t½)",
    description:
      "Time required for the plasma concentration of a compound to fall to half of its initial value.",
    termCode: "half-life",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D006207",
      "https://www.wikidata.org/wiki/Q186338",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const stability: GlossaryContent = {
  slug: "stability",
  term: "Stability",
  short:
    "Capacity of a peptide to retain its chemical structure, purity and biological activity over time under defined storage conditions.",
  body: (
    <>
      <P>
        <strong>Stability</strong> in a peptide-chemistry context refers
        to the retention of chemical integrity, purity and biological
        activity of a peptide across time under a defined set of storage
        conditions (temperature, humidity, light, container material,
        aqueous vs lyophilised state).
      </P>
      <P>
        The principal degradation pathways relevant to peptides are
        proteolytic and non-enzymatic hydrolysis of peptide bonds,
        oxidation of methionine and cysteine residues, deamidation of
        asparagine and glutamine, aggregation, and adsorption to
        container surfaces. Lyophilisation dramatically slows most of
        these processes, which is why research peptides are typically
        supplied as freeze-dried powders.
      </P>
      <Why>
        Stability data determine expiry, storage temperature and
        handling recommendations for every research peptide; it is a
        core Certificate of Analysis parameter.
      </Why>
    </>
  ),
  relatedGuideSlugs: ["laboratory-storage-guide"],
  relatedGlossarySlugs: ["lyophilisation", "reconstitution", "certificate-of-analysis", "hplc"],
  definedTerm: {
    path: "/research-hub/glossary/stability",
    name: "Peptide Stability",
    description:
      "Capacity of a peptide to retain its chemical structure, purity and biological activity over time under defined storage conditions.",
    termCode: "stability",
    inDefinedTermSet: KG_SET,
  },
  datePublished: DATE,
  dateModified: DATE,
};

const molecularWeight: GlossaryContent = {
  slug: "molecular-weight",
  term: "Molecular Weight",
  short:
    "Sum of the atomic weights of all atoms in a molecule; for peptides, calculated from residue masses minus one water per peptide bond.",
  aliases: ["MW", "Molecular mass", "Relative molecular mass"],
  body: (
    <>
      <P>
        <strong>Molecular weight</strong> (MW), more precisely the
        relative molecular mass, is the sum of the atomic weights of all
        atoms in a molecule, reported in daltons (Da) or grams per mole
        (g mol⁻¹). For a peptide it is calculated as the sum of the
        residue masses of its constituent amino acids minus one molecule
        of water (18.015 Da) per peptide bond, with additional
        adjustments for N- and C-terminal modifications and any bound
        counterions.
      </P>
      <P>
        Two forms are commonly cited: the <em>monoisotopic mass</em>
        (used in high-resolution mass spectrometry) and the
        <em> average mass</em> (used in most laboratory
        concentration calculations). Reported MW should always specify
        which form and whether counterions or hydration water are
        included.
      </P>
      <Why>
        MW converts a mass of lyophilised powder into a molar amount and
        underpins every reconstitution and dilution calculation.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["peptide", "amino-acid", "reconstitution", "lc-ms"],
  definedTerm: {
    path: "/research-hub/glossary/molecular-weight",
    name: "Molecular Weight",
    description:
      "Sum of the atomic weights of all atoms in a molecule; for peptides calculated from residue masses minus one water per peptide bond.",
    termCode: "molecular-weight",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D008970",
      "https://www.wikidata.org/wiki/Q37937",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

// ---------------------------------------------------------------------------
// Batch 1 — Pharmacology
// ---------------------------------------------------------------------------

const agonist: GlossaryContent = {
  slug: "agonist",
  term: "Agonist",
  short:
    "Ligand that binds a receptor and produces the same functional response as the endogenous activator, with efficacy defined as unity.",
  body: (
    <>
      <P>
        An <strong>agonist</strong> is a ligand that binds to a receptor
        and stabilises the receptor conformation associated with signal
        transduction, producing a functional response of the same type
        as the endogenous ligand. In classical pharmacology a full
        agonist is defined as producing the maximum response the system
        can generate (intrinsic efficacy = 1).
      </P>
      <P>
        Agonists are characterised by two independent parameters:
        affinity, which describes how tightly they bind, and efficacy,
        which describes how effectively binding translates into a
        signal. A dose-response curve for an agonist is typically
        summarised by its EC50 (a potency measure) and its maximal
        response (an efficacy measure).
      </P>
      <Why>
        Many research peptides — GLP-1, GHSR and melanocortin ligands —
        are studied precisely because they act as agonists at defined
        receptors.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["antagonist", "partial-agonist", "receptor", "ligand", "ec50", "pharmacodynamics"],
  definedTerm: {
    path: "/research-hub/glossary/agonist",
    name: "Agonist",
    description:
      "Ligand that binds a receptor and produces the same functional response as the endogenous activator.",
    termCode: "agonist",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D058905",
      "https://www.wikidata.org/wiki/Q408620",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const antagonist: GlossaryContent = {
  slug: "antagonist",
  term: "Antagonist",
  short:
    "Ligand that binds a receptor without activating it and blocks the effect of an agonist at that receptor.",
  body: (
    <>
      <P>
        An <strong>antagonist</strong> is a ligand that binds a receptor
        but does not elicit the response associated with receptor
        activation. Instead, occupancy of the binding site prevents
        agonists from producing their effect. Antagonists therefore
        have measurable affinity but, by definition, zero intrinsic
        efficacy at the receptor of interest.
      </P>
      <P>
        Antagonism can be <em>competitive</em> — reversible binding at
        the orthosteric site, shifting the agonist dose-response curve
        rightward without lowering its maximum — or
        <em> non-competitive</em>, in which case both the position and
        the maximum of the agonist curve are affected. Antagonist
        potency is characterised by IC50 or, more rigorously, by Kᵢ or
        pA₂.
      </P>
      <Why>
        Antagonists are essential pharmacological tools for confirming
        that a proposed receptor mediates the effect of an agonist.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["agonist", "partial-agonist", "receptor", "ic50", "affinity"],
  definedTerm: {
    path: "/research-hub/glossary/antagonist",
    name: "Antagonist",
    description:
      "Ligand that binds a receptor without activating it and blocks the effect of an agonist at that receptor.",
    termCode: "antagonist",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D058907",
      "https://www.wikidata.org/wiki/Q419455",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const partialAgonist: GlossaryContent = {
  slug: "partial-agonist",
  term: "Partial Agonist",
  short:
    "Ligand that activates a receptor but produces a lower maximal response than a full agonist even at saturating concentrations.",
  body: (
    <>
      <P>
        A <strong>partial agonist</strong> is a ligand that binds and
        activates a receptor but cannot elicit the maximum response the
        system is capable of, even at saturating concentrations. Its
        intrinsic efficacy lies between 0 (a pure antagonist) and 1 (a
        full agonist).
      </P>
      <P>
        In systems with a full agonist already present, a partial
        agonist can behave as a functional antagonist: it occupies the
        receptor without producing the full signal and thereby lowers
        the overall response. This behaviour is exploited in clinical
        pharmacology to buffer against both under- and over-activation
        of a receptor.
      </P>
      <Why>
        Some research peptides display partial-agonist behaviour at one
        of several receptors they engage — a nuance that shapes
        selectivity profiles and mechanism-of-action reporting.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["agonist", "antagonist", "receptor", "pharmacodynamics"],
  definedTerm: {
    path: "/research-hub/glossary/partial-agonist",
    name: "Partial Agonist",
    description:
      "Ligand that activates a receptor but produces a lower maximal response than a full agonist even at saturating concentrations.",
    termCode: "partial-agonist",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://www.wikidata.org/wiki/Q7139807",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const receptor: GlossaryContent = {
  slug: "receptor",
  term: "Receptor",
  short:
    "Cellular protein that binds a specific ligand and, in response, initiates a defined intracellular signalling event.",
  body: (
    <>
      <P>
        A <strong>receptor</strong> is a protein — most often located at
        the cell surface, though nuclear and cytosolic receptors also
        exist — that binds a specific ligand and translates that
        binding event into a defined intracellular signal. Receptor
        families are typically distinguished by the mechanism of signal
        propagation: G-protein-coupled receptors (GPCRs), receptor
        tyrosine kinases, ligand-gated ion channels and nuclear
        receptors.
      </P>
      <P>
        Receptors are defined pharmacologically by their ligand
        specificity, binding affinity, downstream effectors and the
        physiological system they control. The same ligand may engage
        several receptor subtypes with different affinities, and
        selectivity is a central design consideration for research
        peptides.
      </P>
      <Why>
        Every receptor-targeted research peptide on this site — GLP-1R,
        GIPR, GHSR, MC1R–MC5R, VEGFR2 — is described in terms of the
        receptor it engages.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["ligand", "gpcr", "agonist", "antagonist", "signal-transduction", "vegfr2"],
  definedTerm: {
    path: "/research-hub/glossary/receptor",
    name: "Receptor (Cell-surface / Cellular Receptor)",
    description:
      "Cellular protein that binds a specific ligand and initiates a defined intracellular signalling event in response.",
    termCode: "receptor",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D011956",
      "https://www.wikidata.org/wiki/Q208467",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const ligand: GlossaryContent = {
  slug: "ligand",
  term: "Ligand",
  short:
    "Molecule that binds a receptor or other biomolecule with defined affinity, forming a specific reversible complex.",
  body: (
    <>
      <P>
        A <strong>ligand</strong> is any molecule that binds a target
        biomolecule — typically a receptor, enzyme or transport
        protein — with defined specificity and affinity, forming a
        non-covalent complex. Ligands may be endogenous (hormones,
        neurotransmitters, growth factors) or exogenous (synthetic
        agonists, antagonists, tool compounds).
      </P>
      <P>
        A ligand's pharmacological properties are described by two
        independent axes: affinity, which quantifies the strength of
        binding (Kd, Kᵢ), and efficacy, which describes how well the
        bound state activates the receptor (full agonist, partial
        agonist, antagonist, inverse agonist).
      </P>
      <Why>
        Every peptide in this catalogue is, functionally, a ligand for
        one or more molecular targets; ligand is the parent concept
        underneath agonism, antagonism and affinity.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["receptor", "agonist", "antagonist", "affinity", "potency"],
  definedTerm: {
    path: "/research-hub/glossary/ligand",
    name: "Ligand",
    description:
      "Molecule that binds a receptor or other biomolecule with defined affinity, forming a specific reversible complex.",
    termCode: "ligand",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D008024",
      "https://www.wikidata.org/wiki/Q11642",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const affinity: GlossaryContent = {
  slug: "affinity",
  term: "Affinity",
  short:
    "Thermodynamic strength of the non-covalent interaction between a ligand and its receptor, most often reported as a dissociation constant Kd or Kᵢ.",
  aliases: ["Binding affinity"],
  body: (
    <>
      <P>
        <strong>Affinity</strong> is the thermodynamic strength of the
        non-covalent interaction between a ligand and its target,
        typically quantified by the equilibrium dissociation constant
        Kd. Kd corresponds to the ligand concentration at which half of
        the target sites are occupied; a lower Kd therefore denotes
        higher affinity.
      </P>
      <P>
        In competition-binding experiments, affinity is often reported
        as an inhibition constant Kᵢ, derived from the measured IC50
        using the Cheng-Prusoff equation. Affinity is independent of
        efficacy: a high-affinity ligand may be an agonist, an
        antagonist or an inverse agonist depending on the receptor
        conformation it stabilises.
      </P>
      <Why>
        Affinity determines the concentration range at which a research
        peptide can act at its target and is a core input to
        selectivity profiling across receptor subtypes.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["ligand", "receptor", "potency", "ic50", "ec50"],
  definedTerm: {
    path: "/research-hub/glossary/affinity",
    name: "Binding Affinity",
    description:
      "Thermodynamic strength of the non-covalent interaction between a ligand and its receptor, quantified by the dissociation constant Kd.",
    termCode: "affinity",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://www.wikidata.org/wiki/Q4914792"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const potency: GlossaryContent = {
  slug: "potency",
  term: "Potency",
  short:
    "Concentration of a ligand required to produce a defined functional response; commonly reported as EC50 for agonists or IC50 for inhibitors.",
  body: (
    <>
      <P>
        <strong>Potency</strong> is a functional-pharmacology measure
        describing the concentration of a ligand required to produce a
        specified magnitude of response — usually half of the maximum
        response the system can generate. For agonists this is
        reported as the EC50; for inhibitors and antagonists it is
        reported as the IC50.
      </P>
      <P>
        Potency reflects a combination of affinity and efficacy and is
        system-dependent: the same ligand can display different EC50
        values in different cell types depending on receptor density
        and coupling efficiency. Comparisons of potency between
        compounds are therefore meaningful only within a single, defined
        assay system.
      </P>
      <Why>
        Potency is the primary numeric comparator between related
        peptide analogues and is central to structure-activity
        discussion.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["affinity", "ec50", "ic50", "pharmacodynamics"],
  definedTerm: {
    path: "/research-hub/glossary/potency",
    name: "Potency (Pharmacology)",
    description:
      "Concentration of a ligand required to produce a defined functional response, commonly reported as EC50 or IC50.",
    termCode: "potency",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://www.wikidata.org/wiki/Q3040921"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const ec50: GlossaryContent = {
  slug: "ec50",
  term: "EC50",
  short:
    "Concentration of an agonist that produces half of its own maximal response in a defined assay system.",
  aliases: ["Half-maximal effective concentration"],
  body: (
    <>
      <P>
        <strong>EC50</strong> — the half-maximal effective concentration
        — is the concentration of an agonist that produces a response
        equal to half of that agonist's own maximum response in a
        defined assay system. It is derived from a fitted
        concentration-response curve, most commonly a four-parameter
        logistic (Hill) equation.
      </P>
      <P>
        EC50 is a measure of potency, not affinity: it reflects both how
        well the ligand binds and how efficiently the resulting
        receptor conformation drives the measured downstream signal in
        that particular assay. Comparisons of EC50 across different
        assay platforms should therefore be made with caution.
      </P>
      <Why>
        EC50 is the single most-cited numeric parameter in receptor
        pharmacology and appears in every mechanism-of-action guide.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["ic50", "potency", "agonist", "pharmacodynamics", "affinity"],
  definedTerm: {
    path: "/research-hub/glossary/ec50",
    name: "EC50 (Half-Maximal Effective Concentration)",
    description:
      "Concentration of an agonist producing half of its own maximal response in a defined assay system.",
    termCode: "EC50",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://www.wikidata.org/wiki/Q1052021"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const ic50: GlossaryContent = {
  slug: "ic50",
  term: "IC50",
  short:
    "Concentration of an inhibitor that reduces a defined biological or biochemical response by 50% in a given assay system.",
  aliases: ["Half-maximal inhibitory concentration"],
  body: (
    <>
      <P>
        <strong>IC50</strong> — the half-maximal inhibitory
        concentration — is the concentration of an inhibitor,
        antagonist or competing ligand that reduces a measured response
        by 50% under the specific conditions of the assay in which it is
        determined.
      </P>
      <P>
        IC50 is assay-dependent: it varies with the concentration of
        the agonist or substrate being competed against, with enzyme or
        receptor density and with incubation time. In competition
        binding, IC50 can be converted to a system-independent
        inhibition constant Kᵢ via the Cheng-Prusoff equation, which
        adjusts for the concentration of the radiolabelled probe and
        its Kd.
      </P>
      <Why>
        IC50 is the standard reporting metric for antagonists and enzyme
        inhibitors and is essential to interpreting selectivity data.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["ec50", "antagonist", "potency", "affinity"],
  definedTerm: {
    path: "/research-hub/glossary/ic50",
    name: "IC50 (Half-Maximal Inhibitory Concentration)",
    description:
      "Concentration of an inhibitor that reduces a defined biological or biochemical response by 50% in a given assay system.",
    termCode: "IC50",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://www.wikidata.org/wiki/Q902970"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const pharmacodynamics: GlossaryContent = {
  slug: "pharmacodynamics",
  term: "Pharmacodynamics",
  short:
    "Branch of pharmacology that describes the biochemical and physiological effect of a compound on the body and its underlying mechanism.",
  aliases: ["PD"],
  body: (
    <>
      <P>
        <strong>Pharmacodynamics</strong> (PD) is the branch of
        pharmacology concerned with what a compound does to the
        organism — its biochemical, cellular and physiological effects
        and the molecular mechanisms responsible for them. It is
        conventionally paired with pharmacokinetics (PK), which
        describes what the organism does to the compound.
      </P>
      <P>
        Pharmacodynamic analysis quantifies the relationship between
        drug concentration at the site of action and the resulting
        response. The core parameters are the concentration-response
        curve, its EC50 (potency), its maximum response (efficacy) and
        its slope (typically fitted with a Hill coefficient).
      </P>
      <Why>
        Pharmacodynamics is the analytical framework used across every
        mechanism-of-action page on this site.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["ec50", "ic50", "potency", "agonist", "receptor", "half-life", "bioavailability"],
  definedTerm: {
    path: "/research-hub/glossary/pharmacodynamics",
    name: "Pharmacodynamics",
    description:
      "Branch of pharmacology describing the biochemical and physiological effect of a compound on the body and its underlying mechanism.",
    termCode: "pharmacodynamics",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D054865",
      "https://www.wikidata.org/wiki/Q901517",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

// ---------------------------------------------------------------------------
// Batch 1 — Receptor Biology
// ---------------------------------------------------------------------------

const gpcr: GlossaryContent = {
  slug: "gpcr",
  term: "GPCR",
  short:
    "G-protein-coupled receptor — a seven-transmembrane receptor family that transduces extracellular ligand binding via heterotrimeric G proteins.",
  aliases: ["G-protein-coupled receptor", "Seven-transmembrane receptor", "7TM receptor"],
  body: (
    <>
      <P>
        A <strong>G-protein-coupled receptor</strong> (GPCR) is a member
        of the largest superfamily of cell-surface receptors in the
        human genome. All GPCRs share a common architecture of seven
        α-helical transmembrane domains connected by three extracellular
        and three intracellular loops, with an extracellular
        N-terminus and an intracellular C-terminus.
      </P>
      <P>
        Ligand binding stabilises an active receptor conformation that
        catalyses GDP-to-GTP exchange on the α-subunit of an associated
        heterotrimeric G protein (Gs, Gi/o, Gq/11, G12/13), which
        dissociates from Gβγ and engages downstream effectors such as
        adenylyl cyclase, phospholipase C or ion channels. GPCRs are
        further regulated by phosphorylation and β-arrestin recruitment,
        leading to desensitisation and biased signalling.
      </P>
      <Why>
        Most receptor-targeted research peptides in this catalogue —
        GLP-1R, GIPR, GCGR, GHSR, MC1R–MC5R — are class B or class A
        GPCRs.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["receptor", "signal-transduction", "second-messenger", "camp", "protein-kinase-a"],
  definedTerm: {
    path: "/research-hub/glossary/gpcr",
    name: "G-Protein-Coupled Receptor (GPCR)",
    description:
      "Seven-transmembrane cell-surface receptor family that transduces extracellular ligand binding through heterotrimeric G proteins.",
    termCode: "GPCR",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D043562",
      "https://www.wikidata.org/wiki/Q38173",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const signalTransduction: GlossaryContent = {
  slug: "signal-transduction",
  term: "Signal Transduction",
  short:
    "Cascade of intracellular biochemical events by which a receptor converts a ligand-binding event into a defined cellular response.",
  body: (
    <>
      <P>
        <strong>Signal transduction</strong> is the process by which a
        cell converts an extracellular signal — most often the binding
        of a ligand to a receptor — into a defined intracellular
        response. The process typically comprises a receptor, one or
        more transducer proteins (G proteins, kinases, adapter
        proteins), second-messenger molecules and downstream effectors
        such as transcription factors or ion channels.
      </P>
      <P>
        Signal-transduction pathways are organised as cascades that
        amplify the input signal and integrate it with other cellular
        cues. They are regulated at every level by phosphorylation,
        ubiquitylation, feedback loops and receptor internalisation, all
        of which shape the magnitude and duration of the eventual
        response.
      </P>
      <Why>
        Every mechanism-of-action page on this site is, structurally,
        a description of a signal-transduction pathway.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["receptor", "gpcr", "second-messenger", "camp", "protein-kinase-a", "vegfr2", "fak-paxillin"],
  definedTerm: {
    path: "/research-hub/glossary/signal-transduction",
    name: "Signal Transduction",
    description:
      "Cascade of intracellular biochemical events by which a receptor converts a ligand-binding event into a defined cellular response.",
    termCode: "signal-transduction",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D015398",
      "https://www.wikidata.org/wiki/Q828130",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const secondMessenger: GlossaryContent = {
  slug: "second-messenger",
  term: "Second Messenger",
  short:
    "Small intracellular molecule that relays and amplifies signals from a receptor to downstream effectors within the cell.",
  body: (
    <>
      <P>
        A <strong>second messenger</strong> is a small intracellular
        molecule generated in response to receptor activation whose
        function is to relay and amplify the primary (extracellular)
        signal to downstream effector proteins. The classical second
        messengers include cyclic AMP (cAMP), cyclic GMP (cGMP),
        inositol trisphosphate (IP₃), diacylglycerol (DAG), calcium
        ions (Ca²⁺) and nitric oxide.
      </P>
      <P>
        Because second messengers can diffuse rapidly within the cell
        and each activated receptor can generate many messenger
        molecules, this layer of signalling provides substantial signal
        amplification. Compartmentalisation — mediated by scaffolding
        proteins, phosphodiesterases and localised production — restricts
        the messenger's action to specific subcellular regions.
      </P>
      <Why>
        Second-messenger systems (particularly cAMP) are the primary
        readouts in most functional GPCR assays used to characterise
        research peptides.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["camp", "protein-kinase-a", "signal-transduction", "gpcr", "nitric-oxide"],
  definedTerm: {
    path: "/research-hub/glossary/second-messenger",
    name: "Second Messenger",
    description:
      "Small intracellular molecule that relays and amplifies signals from a receptor to downstream effectors within the cell.",
    termCode: "second-messenger",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D012643",
      "https://www.wikidata.org/wiki/Q911244",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const camp: GlossaryContent = {
  slug: "camp",
  term: "cAMP",
  short:
    "Cyclic adenosine 3′,5′-monophosphate — a central second messenger generated by adenylyl cyclase downstream of Gs-coupled receptors.",
  aliases: ["Cyclic AMP", "Cyclic adenosine monophosphate", "3',5'-cyclic AMP"],
  body: (
    <>
      <P>
        <strong>cAMP</strong> (cyclic adenosine 3′,5′-monophosphate) is a
        small nucleotide-based second messenger produced from ATP by
        adenylyl cyclase in response to activation of Gs-coupled
        receptors. Gi-coupled receptors inhibit adenylyl cyclase and
        therefore lower cAMP.
      </P>
      <P>
        cAMP acts primarily by binding the regulatory subunits of
        protein kinase A (PKA), releasing its catalytic subunits and
        allowing phosphorylation of downstream substrates. It also
        activates Epac guanine-nucleotide exchange factors and cyclic
        nucleotide-gated ion channels. Intracellular cAMP is degraded
        by phosphodiesterases, allowing the signal to be tightly time-
        and space-limited.
      </P>
      <Why>
        Intracellular cAMP is the standard functional readout for
        Gs-coupled receptors including GLP-1R, GIPR, GCGR and
        melanocortin receptors — the receptor families underlying most
        peptides in this catalogue.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["second-messenger", "protein-kinase-a", "gpcr", "signal-transduction"],
  definedTerm: {
    path: "/research-hub/glossary/camp",
    name: "Cyclic AMP (cAMP)",
    description:
      "Cyclic adenosine 3′,5′-monophosphate — a central second messenger produced by adenylyl cyclase downstream of Gs-coupled receptors.",
    termCode: "cAMP",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D003165",
      "https://www.ebi.ac.uk/chebi/searchId.do?chebiId=CHEBI:17489",
      "https://www.wikidata.org/wiki/Q194105",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const proteinKinaseA: GlossaryContent = {
  slug: "protein-kinase-a",
  term: "Protein Kinase A",
  short:
    "cAMP-dependent serine/threonine kinase that phosphorylates a broad set of intracellular substrates in response to elevated cAMP.",
  aliases: ["PKA", "cAMP-dependent protein kinase"],
  body: (
    <>
      <P>
        <strong>Protein kinase A</strong> (PKA), also known as
        cAMP-dependent protein kinase, is a serine/threonine-specific
        kinase that exists in the resting state as an inactive tetramer
        of two regulatory (R) and two catalytic (C) subunits. Binding
        of four cAMP molecules to the regulatory subunits releases the
        catalytic subunits, which then phosphorylate a broad set of
        downstream substrates on serine or threonine residues within
        the consensus motif RRXS/T.
      </P>
      <P>
        PKA is the principal effector of Gs-coupled receptor signalling.
        Its substrates include the transcription factor CREB, metabolic
        enzymes such as phosphorylase kinase and hormone-sensitive
        lipase, ion channels, and multiple regulatory phosphatases and
        kinases. A-kinase anchoring proteins (AKAPs) localise PKA to
        specific subcellular compartments, providing spatial
        specificity to the response.
      </P>
      <Why>
        PKA activation is the canonical downstream event by which
        Gs-coupled peptide receptors — GLP-1R and its family — exert
        their effects at the cellular level.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["camp", "second-messenger", "gpcr", "signal-transduction"],
  definedTerm: {
    path: "/research-hub/glossary/protein-kinase-a",
    name: "Protein Kinase A (PKA)",
    description:
      "cAMP-dependent serine/threonine kinase that phosphorylates intracellular substrates in response to elevated cAMP.",
    termCode: "PKA",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D017868",
      "https://www.wikidata.org/wiki/Q419530",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

// ---------------------------------------------------------------------------
// Batch 1 — Laboratory
// ---------------------------------------------------------------------------

const hplc: GlossaryContent = {
  slug: "hplc",
  term: "HPLC",
  short:
    "High-performance liquid chromatography — a chromatographic technique used to assess the purity and identity of research peptides.",
  aliases: ["High-performance liquid chromatography", "High-pressure liquid chromatography"],
  body: (
    <>
      <P>
        <strong>HPLC</strong> (high-performance liquid chromatography)
        is a separation technique in which a liquid mobile phase is
        pumped at high pressure through a packed column of stationary
        phase. Compounds in a sample partition between the two phases
        and elute at characteristic retention times that reflect their
        physicochemical properties.
      </P>
      <P>
        For peptides, reversed-phase HPLC (RP-HPLC) is the standard
        method: a hydrophobic C18 column separates residues by their
        interaction with an acetonitrile-water gradient, typically
        modified with a low-pH ion-pairing reagent such as
        trifluoroacetic acid. Purity is reported as the percentage of
        total peak area attributable to the target species (%HPLC).
      </P>
      <Why>
        HPLC purity is the headline purity metric on every Oxford
        Research Peptides Certificate of Analysis.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["lc-ms", "certificate-of-analysis", "endotoxin", "stability", "molecular-weight"],
  definedTerm: {
    path: "/research-hub/glossary/hplc",
    name: "High-Performance Liquid Chromatography (HPLC)",
    description:
      "Chromatographic technique used to assess the purity and identity of research peptides.",
    termCode: "HPLC",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D002851",
      "https://www.wikidata.org/wiki/Q622934",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const lcMs: GlossaryContent = {
  slug: "lc-ms",
  term: "LC-MS",
  short:
    "Liquid chromatography–mass spectrometry — a hyphenated analytical technique used to confirm peptide identity by intact mass.",
  aliases: ["Liquid chromatography–mass spectrometry", "LC/MS"],
  body: (
    <>
      <P>
        <strong>LC-MS</strong> (liquid chromatography–mass spectrometry)
        couples an HPLC separation with a mass spectrometer, so that
        each chromatographic peak is analysed to yield an accurate mass
        of the eluting species. For peptides, the most common
        ionisation method is electrospray (ESI), which produces
        multiply charged ions from which the intact monoisotopic or
        average mass can be deconvolved.
      </P>
      <P>
        For research peptides, LC-MS is used to confirm identity by
        matching the observed mass to the theoretical mass calculated
        from the primary sequence and any declared modifications. It
        can also detect major synthesis- and stability-related
        impurities such as truncated sequences, deamidation or
        oxidation products.
      </P>
      <Why>
        LC-MS identity confirmation complements HPLC purity on the
        Certificate of Analysis and is the primary evidence that the
        supplied compound is the compound the label claims.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["hplc", "certificate-of-analysis", "molecular-weight", "peptide"],
  definedTerm: {
    path: "/research-hub/glossary/lc-ms",
    name: "Liquid Chromatography–Mass Spectrometry (LC-MS)",
    description:
      "Hyphenated analytical technique combining liquid chromatography with mass spectrometry to confirm peptide identity by intact mass.",
    termCode: "LC-MS",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D061766",
      "https://www.wikidata.org/wiki/Q908790",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const endotoxin: GlossaryContent = {
  slug: "endotoxin",
  term: "Endotoxin",
  short:
    "Lipopolysaccharide component of the outer membrane of Gram-negative bacteria; a pyrogenic contaminant tested for during peptide manufacture.",
  aliases: ["Lipopolysaccharide", "LPS"],
  body: (
    <>
      <P>
        <strong>Endotoxin</strong> is the lipopolysaccharide (LPS)
        component of the outer membrane of Gram-negative bacteria,
        composed of a lipid A anchor, a core oligosaccharide and a
        variable O-antigen polysaccharide. It is released on bacterial
        lysis and is a potent activator of the innate immune system,
        acting principally via the TLR4-MD2 receptor complex.
      </P>
      <P>
        Even trace endotoxin contamination can confound in-vitro
        experiments and produces a pyrogenic response in vivo.
        Endotoxin content in a peptide preparation is quantified by
        the LAL (Limulus amebocyte lysate) assay and reported in
        Endotoxin Units per milligram (EU / mg) on the Certificate of
        Analysis.
      </P>
      <Why>
        Endotoxin levels are one of the key quality parameters
        distinguishing research-grade peptides from low-quality
        material and are essential to interpretable cell-culture data.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["lal-assay", "certificate-of-analysis", "hplc"],
  definedTerm: {
    path: "/research-hub/glossary/endotoxin",
    name: "Endotoxin (Lipopolysaccharide)",
    description:
      "Lipopolysaccharide component of the outer membrane of Gram-negative bacteria; a pyrogenic contaminant assayed for during peptide manufacture.",
    termCode: "endotoxin",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D004769",
      "https://www.wikidata.org/wiki/Q205691",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const lalAssay: GlossaryContent = {
  slug: "lal-assay",
  term: "LAL Assay",
  short:
    "Limulus amebocyte lysate assay — the standard method for detecting and quantifying bacterial endotoxin in a peptide preparation.",
  aliases: ["Limulus amebocyte lysate assay", "Bacterial endotoxins test", "BET"],
  body: (
    <>
      <P>
        The <strong>LAL assay</strong> (Limulus amebocyte lysate assay)
        is the pharmacopoeial standard for detecting and quantifying
        bacterial endotoxin. It exploits the fact that amebocytes from
        the horseshoe crab (<em>Limulus polyphemus</em>) contain a
        clotting-cascade enzyme system that is activated by picogram
        quantities of endotoxin.
      </P>
      <P>
        LAL is performed in three principal formats: gel-clot (a
        semi-quantitative pass/fail at a defined sensitivity),
        turbidimetric and chromogenic (both quantitative). Results are
        reported in Endotoxin Units per millilitre (EU / mL) and
        converted to EU / mg based on the peptide concentration.
        Recombinant Factor C (rFC) assays offer an equivalent, animal-
        free alternative.
      </P>
      <Why>
        LAL is the assay behind every endotoxin figure reported on a
        Certificate of Analysis for a research peptide.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["endotoxin", "certificate-of-analysis", "hplc", "lc-ms"],
  definedTerm: {
    path: "/research-hub/glossary/lal-assay",
    name: "LAL Assay (Limulus Amebocyte Lysate)",
    description:
      "Standard assay for detecting and quantifying bacterial endotoxin in pharmaceutical and research preparations.",
    termCode: "LAL-assay",
    inDefinedTermSet: KG_SET,
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D008062",
      "https://www.wikidata.org/wiki/Q1811294",
    ],
  },
  datePublished: DATE,
  dateModified: DATE,
};

const certificateOfAnalysis: GlossaryContent = {
  slug: "certificate-of-analysis",
  term: "Certificate of Analysis",
  short:
    "Batch-specific quality document that reports identity, purity, endotoxin content and related analytical results for a manufactured peptide lot.",
  aliases: ["CoA", "COA"],
  body: (
    <>
      <P>
        A <strong>Certificate of Analysis</strong> (CoA) is a batch-
        specific quality document issued by the manufacturer of a
        research peptide summarising the analytical results generated
        during release testing. It provides the primary evidence that
        the supplied material meets its declared specifications.
      </P>
      <P>
        A CoA typically reports: identity (LC-MS observed vs
        theoretical mass), purity (HPLC %), sequence confirmation,
        counterion / salt content, water content (Karl Fischer),
        endotoxin content (LAL, EU / mg where relevant), appearance,
        batch and lot number, manufacture and expiry dates, and
        recommended storage conditions.
      </P>
      <Why>
        The CoA is the single artefact tying a specific lot to a
        specific set of analytical measurements — indispensable to
        laboratory record-keeping and reproducibility.
      </Why>
    </>
  ),
  relatedGlossarySlugs: ["hplc", "lc-ms", "endotoxin", "lal-assay", "stability", "molecular-weight"],
  definedTerm: {
    path: "/research-hub/glossary/certificate-of-analysis",
    name: "Certificate of Analysis (CoA)",
    description:
      "Batch-specific quality document reporting identity, purity, endotoxin content and related analytical results for a manufactured peptide lot.",
    termCode: "certificate-of-analysis",
    inDefinedTermSet: KG_SET,
    sameAs: ["https://www.wikidata.org/wiki/Q5062712"],
  },
  datePublished: DATE,
  dateModified: DATE,
};

// ---------------------------------------------------------------------------
// Glossary Batch 2 — Semaglutide cluster (Authority Sprint 2B)
// ---------------------------------------------------------------------------

const SPRINT_2B_DATE = "2026-09-02";

interface Batch2Def {
  slug: string;
  term: string;
  aliases?: readonly string[];
  short: string;
  bodyParas: readonly string[];
  why: string;
  relatedGlossarySlugs?: readonly string[];
  relatedCompoundSlugs?: readonly string[];
  relatedGuideSlugs?: readonly string[];
  sameAs?: readonly string[];
  termCode?: string;
}

const batch2Defs: readonly Batch2Def[] = [
  {
    slug: "glp-1",
    term: "GLP-1",
    aliases: ["Glucagon-like peptide-1", "GLP-1(7-37)", "GLP-1(7-36)amide"],
    short:
      "Glucagon-like peptide-1 — an intestinal incretin hormone that potentiates glucose-dependent insulin secretion.",
    bodyParas: [
      "GLP-1 (glucagon-like peptide-1) is an incretin peptide hormone released from intestinal L-cells in response to nutrient intake. Its two principal circulating active forms are GLP-1(7-37) and GLP-1(7-36)amide, both derived by post-translational processing of proglucagon.",
      "Native GLP-1 activates the GLP-1 receptor to potentiate glucose-dependent insulin secretion from pancreatic β-cells, suppress glucagon release from α-cells, slow gastric emptying and reduce food intake through central neural circuits. Its plasma half-life is very short (~1–2 minutes) because it is cleaved by dipeptidyl peptidase-4 (DPP-4).",
      "Long-acting synthetic GLP-1 receptor agonists such as Semaglutide overcome this pharmacokinetic constraint by combining DPP-4 resistance with albumin-binding acylation.",
    ],
    why: "Understanding native GLP-1 anchors the entire pharmacology of GLP-1 receptor agonists, dual agonists and triple agonists.",
    relatedGlossarySlugs: ["incretin", "incretin-effect", "glp-1-receptor-agonist", "native-glp-1", "insulinotropic"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    relatedGuideSlugs: ["glp-1-receptor-explained", "what-is-semaglutide"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q411057",
      "https://en.wikipedia.org/wiki/Glucagon-like_peptide-1",
    ],
  },
  {
    slug: "incretin",
    term: "Incretin",
    aliases: ["Incretin hormone"],
    short:
      "Gut-derived peptide hormone that amplifies glucose-dependent insulin secretion in response to oral nutrient intake.",
    bodyParas: [
      "Incretins are peptide hormones secreted by the intestine in response to food intake that amplify insulin secretion from pancreatic β-cells beyond what an equivalent intravenous glucose challenge would achieve.",
      "The two principal human incretins are glucagon-like peptide-1 (GLP-1, secreted by intestinal L-cells) and glucose-dependent insulinotropic polypeptide (GIP, secreted by K-cells). Together they mediate the incretin effect — the greater insulin release from oral than intravenous glucose at matched glycaemia.",
    ],
    why: "The incretin concept is the biological foundation for GLP-1, GIP and GLP-1 / GIP / glucagon receptor agonist pharmacology.",
    relatedGlossarySlugs: ["glp-1", "incretin-effect", "insulinotropic", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q1662214",
      "https://meshb.nlm.nih.gov/record/ui?ui=D054795",
    ],
  },
  {
    slug: "incretin-effect",
    term: "Incretin Effect",
    short:
      "Greater insulin release from oral than intravenous glucose at equivalent glycaemia, mediated by GLP-1 and GIP.",
    bodyParas: [
      "The incretin effect is the observation that oral glucose evokes a substantially larger insulin response than intravenous glucose delivered to match the same blood glucose profile. In healthy adults, the incretin effect accounts for a significant fraction of postprandial insulin secretion.",
      "Mechanistically it reflects the amplifying action of gut-secreted GLP-1 and GIP on pancreatic β-cells. The incretin effect is diminished in type 2 diabetes, motivating the clinical development of GLP-1 receptor agonists and dual GLP-1 / GIP agonists.",
    ],
    why: "The incretin effect is the physiological rationale for the entire GLP-1 receptor agonist and multi-agonist drug class.",
    relatedGlossarySlugs: ["incretin", "glp-1", "insulinotropic", "glucagonostatic"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Incretin"],
  },
  {
    slug: "glp-1-receptor-agonist",
    term: "GLP-1 Receptor Agonist",
    aliases: ["GLP-1 RA", "GLP-1R agonist"],
    short:
      "Pharmacological class of peptides and small molecules that activate the GLP-1 receptor.",
    bodyParas: [
      "GLP-1 receptor agonists (GLP-1 RAs) are compounds — mostly peptides — that bind and activate the glucagon-like peptide-1 receptor (GLP-1R), reproducing the physiological actions of native GLP-1 with markedly extended pharmacokinetics.",
      "Modern long-acting GLP-1 RAs such as Semaglutide combine DPP-4 resistance with albumin-binding acylation to achieve plasma half-lives measured in days rather than minutes. Dual (Tirzepatide) and triple (Retatrutide) agonists extend the design principle to additional incretin-family receptors.",
    ],
    why: "The GLP-1 RA class is the central reference class against which every dual and triple incretin agonist is benchmarked.",
    relatedGlossarySlugs: ["glp-1", "agonist", "incretin", "acylation", "albumin-binding"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    relatedGuideSlugs: ["glp-1-receptor-explained", "triple-agonists-explained"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q1418707",
      "https://meshb.nlm.nih.gov/record/ui?ui=D000077203",
    ],
  },
  {
    slug: "biased-agonism",
    term: "Biased Agonism",
    aliases: ["Functional selectivity"],
    short:
      "Ligand-selective preference for one branch of a receptor's signalling output over another (e.g. G-protein vs β-arrestin).",
    bodyParas: [
      "Biased agonism (also called functional selectivity) describes the phenomenon in which two agonists at the same receptor engage its downstream signalling arms — for example G-protein coupling versus β-arrestin recruitment — in different proportions.",
      "At GLP-1R and other class B GPCRs, biased agonism is an active research area with potential implications for separating desired pharmacology from receptor desensitisation and internalisation. The clinical significance of ligand bias at GLP-1R for existing agonists such as Semaglutide is not yet fully mapped.",
    ],
    why: "Biased agonism is a foundational conceptual framework for interpreting differences between GLP-1 receptor agonists at the signalling level.",
    relatedGlossarySlugs: ["gpcr", "beta-arrestin", "receptor-internalisation", "desensitisation", "camp-pka-signalling"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Functional_selectivity"],
  },
  {
    slug: "beta-arrestin",
    term: "Beta-Arrestin",
    aliases: ["β-arrestin", "Arrestin-2 / Arrestin-3"],
    short:
      "Adaptor protein family that binds phosphorylated GPCRs, driving receptor internalisation and arrestin-dependent signalling.",
    bodyParas: [
      "β-arrestins (β-arrestin-1 / ARRB1 and β-arrestin-2 / ARRB2) are cytoplasmic adaptor proteins that bind GPCRs after receptor phosphorylation by G-protein-coupled receptor kinases (GRKs). They uncouple the receptor from heterotrimeric G-proteins (desensitisation), scaffold clathrin-mediated endocytosis (internalisation) and act as signalling hubs in their own right.",
      "At GLP-1R and related class B receptors, β-arrestin recruitment is an important component of the overall signalling response and a central variable in biased-agonism research.",
    ],
    why: "β-arrestin biology is central to understanding receptor desensitisation, internalisation and biased signalling at GLP-1R.",
    relatedGlossarySlugs: ["gpcr", "biased-agonism", "receptor-internalisation", "desensitisation"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q806839",
      "https://meshb.nlm.nih.gov/record/ui?ui=D057090",
    ],
  },
  {
    slug: "camp-pka-signalling",
    term: "cAMP / PKA Signalling",
    short:
      "Canonical Gαs GPCR signalling module: cAMP is generated by adenylyl cyclase and activates protein kinase A.",
    bodyParas: [
      "The cAMP / PKA signalling module is the canonical downstream pathway of Gαs-coupled GPCRs. Agonist binding activates adenylyl cyclase, elevating intracellular cyclic AMP, which binds the regulatory subunits of protein kinase A (PKA) and releases active catalytic subunits.",
      "Active PKA phosphorylates a wide range of substrates — ion channels, exocytotic proteins, metabolic enzymes and transcription factors such as CREB. At GLP-1R, cAMP / PKA signalling is a principal driver of β-cell insulin secretion and gene-expression changes.",
    ],
    why: "cAMP / PKA is the primary intracellular signalling module engaged by GLP-1 receptor activation.",
    relatedGlossarySlugs: ["camp", "protein-kinase-a", "epac2", "gpcr", "second-messenger"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Cyclic_adenosine_monophosphate"],
  },
  {
    slug: "epac2",
    term: "EPAC2",
    aliases: ["Exchange protein activated by cAMP 2", "RAPGEF4"],
    short:
      "PKA-independent cAMP effector important in pancreatic β-cell exocytosis and other cAMP-driven processes.",
    bodyParas: [
      "EPAC2 (exchange protein directly activated by cAMP, isoform 2) is a guanine-nucleotide exchange factor for Rap GTPases whose activity is directly regulated by cAMP binding, independent of protein kinase A.",
      "In pancreatic β-cells, EPAC2 contributes to glucose-dependent insulin exocytosis downstream of GLP-1R activation, complementing the PKA pathway. The relative contribution of PKA versus EPAC2 to insulin release under different physiological contexts is an active research topic.",
    ],
    why: "EPAC2 defines the second, PKA-independent arm of GLP-1R signalling in β-cells.",
    relatedGlossarySlugs: ["camp", "camp-pka-signalling", "protein-kinase-a", "insulinotropic"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q14883734"],
  },
  {
    slug: "gastric-emptying",
    term: "Gastric Emptying",
    short:
      "Rate at which stomach contents pass into the duodenum; slowed by GLP-1 receptor activation via vagal pathways.",
    bodyParas: [
      "Gastric emptying is the rate at which food and liquid contents exit the stomach into the small intestine. It is a major determinant of postprandial glucose kinetics and of satiety signalling from gastric distension.",
      "GLP-1 receptor activation slows gastric emptying via vagally-mediated pathways. This is a well-documented pharmacological effect of GLP-1 receptor agonists such as Semaglutide and contributes both to reduced postprandial glucose excursions and to increased satiety.",
    ],
    why: "Slowed gastric emptying is one of the principal peripheral pharmacological effects of GLP-1 receptor agonism.",
    relatedGlossarySlugs: ["glp-1", "glp-1-receptor-agonist", "insulinotropic"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: [
      "https://meshb.nlm.nih.gov/record/ui?ui=D005744",
      "https://en.wikipedia.org/wiki/Gastric_emptying",
    ],
  },
  {
    slug: "pomc-neuron",
    term: "POMC Neuron",
    aliases: ["Proopiomelanocortin neuron"],
    short:
      "Hypothalamic arcuate-nucleus neuron expressing proopiomelanocortin; anorexigenic node in central appetite regulation.",
    bodyParas: [
      "POMC neurons of the hypothalamic arcuate nucleus express proopiomelanocortin, the precursor of α-melanocyte-stimulating hormone (α-MSH), and constitute a core anorexigenic population in the central regulation of food intake.",
      "GLP-1 receptor agonists such as Semaglutide engage distributed neural circuits including POMC neurons; preclinical rodent mapping studies have documented Semaglutide-driven activation of these and related appetite-relevant populations.",
    ],
    why: "POMC neurons are a central-nervous-system substrate for GLP-1R-mediated reductions in food intake.",
    relatedGlossarySlugs: ["npy-neuron", "glp-1", "gastric-emptying"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q1128102"],
  },
  {
    slug: "npy-neuron",
    term: "NPY Neuron",
    aliases: ["NPY / AgRP neuron"],
    short:
      "Hypothalamic arcuate-nucleus neuron co-expressing NPY and AgRP; orexigenic node in central appetite regulation.",
    bodyParas: [
      "Arcuate-nucleus NPY / AgRP neurons co-express neuropeptide Y and agouti-related peptide and constitute the principal orexigenic population opposite POMC neurons in the central regulation of food intake.",
      "GLP-1 receptor agonism modulates activity across this circuit as part of its broader effect on appetite; preclinical mapping of Semaglutide has documented distributed engagement of appetite-relevant hypothalamic and brainstem populations.",
    ],
    why: "NPY / AgRP neurons anchor the opposing arm of the ARC appetite circuit engaged by GLP-1R agonists.",
    relatedGlossarySlugs: ["pomc-neuron", "glp-1"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q413414"],
  },
  {
    slug: "insulinotropic",
    term: "Insulinotropic",
    short:
      "Property of stimulating insulin secretion from pancreatic β-cells, typically in a glucose-dependent manner for incretins.",
    bodyParas: [
      "Insulinotropic is used to describe an agent that stimulates insulin secretion from pancreatic β-cells. For incretin hormones and GLP-1 receptor agonists the effect is glucose-dependent — insulin release is amplified only when blood glucose is elevated.",
      "This glucose-dependence is central to the low intrinsic hypoglycaemia risk of GLP-1 receptor agonists as a pharmacological class in clinical studies.",
    ],
    why: "The insulinotropic effect is the primary β-cell pharmacology behind incretin therapies.",
    relatedGlossarySlugs: ["glp-1", "incretin", "incretin-effect", "glucagonostatic"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Insulinotropic"],
  },
  {
    slug: "glucagonostatic",
    term: "Glucagonostatic",
    short:
      "Property of suppressing glucagon secretion from pancreatic α-cells, contributing to reduced hepatic glucose output.",
    bodyParas: [
      "Glucagonostatic describes an agent that suppresses glucagon secretion from pancreatic α-cells. GLP-1 receptor activation reduces glucagon release in a glucose-dependent manner and reduces hepatic glucose output as a result.",
      "The glucagonostatic effect complements the insulinotropic effect and jointly explains the glucose-lowering pharmacology of GLP-1 receptor agonists.",
    ],
    why: "The glucagonostatic effect is the α-cell counterpart to the insulinotropic effect for incretin-class pharmacology.",
    relatedGlossarySlugs: ["insulinotropic", "glp-1", "incretin"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
  },
  {
    slug: "acylation",
    term: "Acylation",
    short:
      "Covalent attachment of an acyl (typically fatty-acid) group to a peptide side chain to modify pharmacokinetics.",
    bodyParas: [
      "Acylation is the covalent introduction of an acyl group — most often a long-chain fatty acid or fatty-di-acid — onto a peptide side chain, typically at a lysine ε-amino group via an amide bond or through a spacer such as γGlu-2xOEG.",
      "In peptide drug design, acylation is used primarily to introduce reversible albumin binding, dramatically extending plasma half-life. Semaglutide's lysine-26 C18 fatty-di-acid modification is a canonical example.",
    ],
    why: "Acylation is the key medicinal-chemistry strategy behind long-acting GLP-1 receptor agonists.",
    relatedGlossarySlugs: ["albumin-binding", "half-life", "peptide-bond", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q412292"],
  },
  {
    slug: "albumin-binding",
    term: "Albumin Binding",
    short:
      "Reversible non-covalent association of a molecule with serum albumin, prolonging plasma residence.",
    bodyParas: [
      "Serum albumin is the most abundant plasma protein and binds a wide range of hydrophobic small molecules and fatty acids. Reversible non-covalent binding to albumin creates a slowly-releasing plasma reservoir that dramatically extends the effective half-life of the bound molecule.",
      "For acylated peptides such as Semaglutide, albumin binding through the fatty-di-acid side chain is the principal mechanism sustaining once-weekly plasma exposure.",
    ],
    why: "Albumin binding is the pharmacokinetic mechanism that turns short-lived native GLP-1 into once-weekly Semaglutide.",
    relatedGlossarySlugs: ["acylation", "half-life", "steady-state", "subcutaneous-administration"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Serum_albumin"],
  },
  {
    slug: "snac",
    term: "SNAC",
    aliases: ["Sodium N-[8-(2-hydroxybenzoyl)amino]caprylate", "Salcaprozate sodium"],
    short:
      "Small-molecule absorption enhancer used in oral Semaglutide (Rybelsus) to enable gastric absorption of the peptide.",
    bodyParas: [
      "SNAC (sodium N-[8-(2-hydroxybenzoyl)amino]caprylate; salcaprozate sodium) is a small-molecule absorption enhancer developed for oral peptide delivery. It transiently raises local pH in the stomach, protects the co-formulated peptide from pepsin and increases membrane permeability enough to allow absorption of a small but pharmacologically sufficient fraction of the dose.",
      "SNAC is the enabling excipient in oral Semaglutide (Rybelsus), the first oral GLP-1 receptor agonist product.",
    ],
    why: "SNAC is the reason an acylated GLP-1 peptide can be delivered orally at all.",
    relatedGlossarySlugs: ["oral-semaglutide", "bioavailability", "acylation"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q7401738"],
  },
  {
    slug: "subcutaneous-administration",
    term: "Subcutaneous Administration",
    aliases: ["SC injection"],
    short:
      "Delivery of a drug into the subcutaneous fat, providing slow systemic absorption from the injection depot.",
    bodyParas: [
      "Subcutaneous administration introduces a drug into the fatty tissue beneath the skin. The drug is then absorbed slowly into the systemic circulation from the local depot, producing a smoother pharmacokinetic profile than intravenous administration.",
      "Long-acting GLP-1 receptor agonists such as Semaglutide are administered subcutaneously once weekly, exploiting depot release together with intrinsic albumin binding to sustain plasma exposure.",
    ],
    why: "Subcutaneous depot absorption is the delivery route enabling once-weekly Semaglutide dosing.",
    relatedGlossarySlugs: ["bioavailability", "half-life", "steady-state", "albumin-binding"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Subcutaneous_injection"],
  },
  {
    slug: "steady-state",
    term: "Steady State",
    short:
      "Pharmacokinetic condition in which drug input rate equals elimination rate — reached after ~5 half-lives of regular dosing.",
    bodyParas: [
      "At steady state, the rate at which a drug enters the systemic circulation equals the rate at which it is eliminated, and plasma concentrations fluctuate within a stable range across dosing intervals.",
      "For a drug with linear pharmacokinetics, steady state is reached after approximately five elimination half-lives of regular dosing. For once-weekly Semaglutide with a plasma half-life of ~1 week, this corresponds to 4–5 weeks of consistent dosing.",
    ],
    why: "Understanding steady state is essential when reading Semaglutide pharmacokinetic data and dosing schedules.",
    relatedGlossarySlugs: ["half-life", "bioavailability", "subcutaneous-administration"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Steady_state_(pharmacokinetics)"],
  },
  {
    slug: "receptor-internalisation",
    term: "Receptor Internalisation",
    aliases: ["Receptor endocytosis"],
    short:
      "Endocytic removal of an activated receptor from the plasma membrane, typically after β-arrestin recruitment.",
    bodyParas: [
      "After agonist binding and phosphorylation, many GPCRs — including GLP-1R — recruit β-arrestin and are internalised into clathrin-coated pits and endosomes. Internalised receptors may be recycled back to the plasma membrane, sorted for degradation, or continue to signal from endosomal compartments.",
      "The kinetics and trafficking fate of internalised receptors are a major determinant of sustained agonist effect versus desensitisation.",
    ],
    why: "Receptor internalisation shapes the duration and character of GLP-1R signalling under sustained agonism.",
    relatedGlossarySlugs: ["beta-arrestin", "desensitisation", "biased-agonism", "gpcr"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Endocytosis"],
  },
  {
    slug: "desensitisation",
    term: "Desensitisation",
    aliases: ["Receptor desensitisation", "Desensitization"],
    short:
      "Diminished receptor responsiveness during sustained agonist exposure, mediated by phosphorylation and internalisation.",
    bodyParas: [
      "Receptor desensitisation is the diminished responsiveness of a receptor during sustained or repeated agonist exposure. For GPCRs, it is typically initiated by GRK-mediated phosphorylation of the activated receptor, followed by β-arrestin binding, uncoupling from G-proteins and internalisation.",
      "Different agonists at the same receptor can drive desensitisation to different degrees — a property closely linked to biased agonism.",
    ],
    why: "Desensitisation is the receptor-level counterpart to observed tachyphylaxis and shapes chronic dosing behaviour.",
    relatedGlossarySlugs: ["beta-arrestin", "receptor-internalisation", "biased-agonism", "gpcr"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Desensitization_(medicine)"],
  },
  {
    slug: "mace",
    term: "MACE",
    aliases: ["Major adverse cardiovascular events"],
    short:
      "Composite endpoint of cardiovascular death, non-fatal myocardial infarction and non-fatal stroke used in outcome trials.",
    bodyParas: [
      "MACE (major adverse cardiovascular events) is a composite trial endpoint most commonly defined as cardiovascular death, non-fatal myocardial infarction and non-fatal stroke, sometimes extended to include hospitalisation for unstable angina.",
      "The Semaglutide SUSTAIN-6 and SELECT trials both used a MACE endpoint and reported significant reductions versus placebo in their respective populations. MACE is the standard trial currency for cardiovascular outcome comparisons across GLP-1 receptor agonists.",
    ],
    why: "MACE is the primary endpoint currency for interpreting Semaglutide's cardiovascular literature.",
    relatedGlossarySlugs: ["glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Major_adverse_cardiovascular_events"],
  },
  {
    slug: "dio-model",
    term: "DIO Model",
    aliases: ["Diet-induced obesity model"],
    short:
      "Rodent (typically mouse or rat) fed a high-fat diet to model obesity and metabolic dysregulation for preclinical research.",
    bodyParas: [
      "The diet-induced obesity (DIO) model is the standard rodent preclinical platform for evaluating anti-obesity and metabolic pharmacology. Mice or rats are fed a defined high-fat diet, typically for 8–20 weeks, to induce adiposity, insulin resistance and dyslipidaemia.",
      "DIO models are used extensively to benchmark GLP-1 receptor agonists such as Semaglutide alongside dual and triple incretin agonists in vivo.",
    ],
    why: "DIO is the workhorse preclinical model for GLP-1 receptor agonist and multi-agonist metabolic pharmacology.",
    relatedGlossarySlugs: ["glp-1-receptor-agonist", "incretin", "insulinotropic"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Diet-induced_obesity_model"],
  },
  {
    slug: "native-glp-1",
    term: "Native GLP-1",
    aliases: ["Endogenous GLP-1", "GLP-1(7-37)", "GLP-1(7-36)amide"],
    short:
      "Endogenous glucagon-like peptide-1 hormone — rapidly degraded by DPP-4, with a plasma half-life of only 1–2 minutes.",
    bodyParas: [
      "Native GLP-1 refers to the endogenous incretin hormone glucagon-like peptide-1 secreted by intestinal L-cells, circulating principally as GLP-1(7-37) and GLP-1(7-36)amide.",
      "It is rapidly cleaved by the plasma enzyme dipeptidyl peptidase-4 (DPP-4), giving a plasma half-life of only 1–2 minutes. This pharmacokinetic constraint motivated the design of long-acting GLP-1 receptor agonists such as Semaglutide.",
    ],
    why: "Native GLP-1 is the biological reference against which all GLP-1 receptor agonists are engineered.",
    relatedGlossarySlugs: ["glp-1", "incretin", "half-life", "acylation"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://www.wikidata.org/wiki/Q411057"],
  },
  {
    slug: "oral-semaglutide",
    term: "Oral Semaglutide",
    aliases: ["Rybelsus"],
    short:
      "Oral tablet formulation of Semaglutide co-formulated with the absorption enhancer SNAC.",
    bodyParas: [
      "Oral Semaglutide is a tablet formulation of the same Semaglutide peptide used in Ozempic and Wegovy, co-formulated with the absorption enhancer SNAC (sodium N-[8-(2-hydroxybenzoyl)amino]caprylate).",
      "SNAC transiently raises local pH in the stomach, protects the peptide from pepsin and increases membrane permeability enough to allow absorption of a small but pharmacologically sufficient fraction of the dose. Oral Semaglutide is marketed as Rybelsus and is administered once daily.",
    ],
    why: "Oral Semaglutide is the first successful oral GLP-1 receptor agonist and a proof of principle for peptide oral delivery.",
    relatedGlossarySlugs: ["snac", "bioavailability", "semaglutide"],
    relatedCompoundSlugs: ["semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Semaglutide"],
  },
  {
    slug: "semaglutide",
    term: "Semaglutide",
    aliases: ["NN9535", "Ozempic (brand)", "Wegovy (brand)", "Rybelsus (brand)"],
    short:
      "Long-acting synthetic GLP-1 receptor agonist derived from GLP-1(7-37) with a C18 fatty-di-acid supporting albumin binding.",
    bodyParas: [
      "Semaglutide is a synthetic long-acting glucagon-like peptide-1 (GLP-1) receptor agonist derived from native GLP-1(7-37) with three key modifications — Aib8, Arg34 and lysine-26 C18 fatty-di-acid acylation via a γGlu-2xOEG spacer.",
      "The modifications confer DPP-4 resistance and reversible albumin binding, extending plasma half-life to approximately one week. Semaglutide is one of the most extensively studied compounds in the GLP-1 class.",
      "Oxford Research Peptides supplies Semaglutide strictly as a lyophilised reference standard for in-vitro laboratory research; approved Semaglutide medicines are prescription therapeutics regulated by the MHRA in the United Kingdom.",
    ],
    why: "Semaglutide is the reference long-acting GLP-1 receptor agonist against which every subsequent incretin analogue is benchmarked.",
    relatedGlossarySlugs: ["glp-1", "glp-1-receptor-agonist", "acylation", "albumin-binding", "native-glp-1", "oral-semaglutide"],
    relatedCompoundSlugs: ["semaglutide", "retatrutide"],
    relatedGuideSlugs: ["what-is-semaglutide", "semaglutide-mechanism-of-action", "semaglutide-faq"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q27088395",
      "https://en.wikipedia.org/wiki/Semaglutide",
      "https://go.drugbank.com/drugs/DB13928",
    ],
  },
];

const batch2Entries: readonly GlossaryContent[] = batch2Defs.map((d) => ({
  slug: d.slug,
  term: d.term,
  short: d.short,
  aliases: d.aliases,
  body: (
    <>
      {d.bodyParas.map((para, i) => (
        <P key={i}>{para}</P>
      ))}
      <Why>{d.why}</Why>
    </>
  ),
  relatedCompoundSlugs: d.relatedCompoundSlugs,
  relatedGuideSlugs: d.relatedGuideSlugs,
  relatedGlossarySlugs: d.relatedGlossarySlugs,
  definedTerm: {
    path: `/research-hub/glossary/${d.slug}`,
    name: d.term,
    description: d.short,
    termCode: d.termCode ?? d.slug,
    inDefinedTermSet: KG_SET,
    sameAs: d.sameAs,
  },
  datePublished: SPRINT_2B_DATE,
  dateModified: SPRINT_2B_DATE,
}));

// ---------------------------------------------------------------------------
// Glossary Batch 3 — Tirzepatide cluster (Authority Sprint 3B)
// ---------------------------------------------------------------------------

const SPRINT_3B_DATE = "2026-11-05";

const batch3Defs: readonly Batch2Def[] = [
  {
    slug: "dual-incretin-agonism",
    term: "Dual Incretin Agonism",
    aliases: ["Dual GIP/GLP-1 receptor agonism"],
    short:
      "Concurrent activation of the GIP and GLP-1 receptors by a single ligand, exemplified by Tirzepatide.",
    bodyParas: [
      "Dual incretin agonism describes the pharmacological strategy of activating both the glucose-dependent insulinotropic polypeptide (GIP) receptor and the glucagon-like peptide-1 (GLP-1) receptor with a single molecule. Tirzepatide is the first clinically approved dual incretin receptor agonist.",
      "The rationale is complementary rather than additive coverage: GIP and GLP-1 receptors are expressed on overlapping but non-identical cell populations — β-cells, α-cells, adipocytes, vagal afferents and central satiety circuits — and combined engagement broadens the incretin response beyond what a mono-agonist such as Semaglutide can achieve.",
    ],
    why: "Dual incretin agonism is the defining pharmacological concept behind Tirzepatide and a stepping stone to triple agonists such as Retatrutide.",
    relatedGlossarySlugs: ["incretin", "glp-1", "gip-adipocyte-axis", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    relatedGuideSlugs: ["what-is-tirzepatide", "tirzepatide-mechanism-of-action", "triple-agonists-explained"],
  },
  {
    slug: "gip-adipocyte-axis",
    term: "GIP-Adipocyte Axis",
    aliases: ["GIP-adipose axis"],
    short:
      "GIP-receptor signalling on adipocytes that modulates lipid handling and insulin sensitivity in adipose tissue.",
    bodyParas: [
      "GIP receptors (GIPR) are expressed on adipocytes, where GIP signalling modulates triglyceride handling, lipoprotein lipase activity and insulin sensitivity. This adipose-tissue arm of GIP biology is one of the features that distinguishes GIP-active pharmacology from selective GLP-1 receptor agonism.",
      "Dual GIP / GLP-1 agonists such as Tirzepatide engage the GIP-adipocyte axis directly. The clinical significance of this axis relative to central appetite signalling remains an active research question, with rodent and human data both contributing.",
    ],
    why: "The GIP-adipocyte axis is a distinguishing mechanistic feature of dual and triple agonists compared with GLP-1 mono-agonists.",
    relatedGlossarySlugs: ["dual-incretin-agonism", "incretin", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["tirzepatide", "retatrutide"],
    relatedGuideSlugs: ["tirzepatide-mechanism-of-action", "gip-receptor-explained"],
  },
  {
    slug: "satiety-signalling",
    term: "Satiety Signalling",
    aliases: ["Satiety pathway"],
    short:
      "Integrated central-nervous-system pathways in the hypothalamus and hindbrain that translate incretin engagement into reduced food intake.",
    bodyParas: [
      "Satiety signalling refers to the central-nervous-system pathways that integrate peripheral and hormonal inputs into a sensation of fullness that reduces food intake. Key nodes include the nucleus of the solitary tract (NTS) and area postrema in the hindbrain and POMC / NPY-AgRP neurons in the hypothalamic arcuate nucleus.",
      "Both GIP and GLP-1 receptors are expressed at these nodes. Dual GIP / GLP-1 agonists such as Tirzepatide engage more of the satiety network than GLP-1 mono-agonists, which is one hypothesised contributor to the reported effects on food intake in preclinical models.",
    ],
    why: "Satiety signalling is the central-nervous-system substrate through which incretin pharmacology reduces food intake.",
    relatedGlossarySlugs: ["dual-incretin-agonism", "pomc-neuron", "npy-neuron", "gastric-emptying"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    relatedGuideSlugs: ["tirzepatide-mechanism-of-action", "semaglutide-mechanism-of-action"],
  },
  {
    slug: "gs-protein",
    term: "Gs Protein",
    aliases: ["Gαs", "Stimulatory G protein"],
    short:
      "Stimulatory heterotrimeric G protein (Gαs) that couples class B GPCRs to adenylyl cyclase and cAMP production.",
    bodyParas: [
      "Gs protein (Gαs) is the stimulatory α-subunit of the heterotrimeric G protein family. When a class B G-protein-coupled receptor such as GLP-1R or GIPR is activated, Gαs dissociates from the βγ subunits and stimulates membrane-bound adenylyl cyclase, elevating intracellular cyclic AMP.",
      "Elevated cAMP activates protein kinase A and EPAC2, driving downstream phosphorylation and exocytotic events. Gαs coupling is the canonical signalling arm of incretin receptors — both native and pharmacological.",
    ],
    why: "Gαs coupling is the foundational signal-transduction step for every GLP-1 and GIP receptor agonist.",
    relatedGlossarySlugs: ["gpcr", "camp", "camp-pka-signalling", "protein-kinase-a", "second-messenger"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    sameAs: ["https://en.wikipedia.org/wiki/Gs_alpha_subunit"],
  },
  {
    slug: "c20-fatty-diacid",
    term: "C20 Fatty Diacid",
    aliases: ["Eicosanedioic acid moiety", "C20 di-acid"],
    short:
      "Twenty-carbon dicarboxylic acid used as the albumin-binding side chain of Tirzepatide, attached at Lys20 via a γGlu-2xOEG spacer.",
    bodyParas: [
      "The C20 fatty-di-acid is a twenty-carbon dicarboxylic-acid moiety attached to Tirzepatide at the lysine-20 side chain through a γGlu-2xOEG spacer. It functions as the albumin-binding element, occupying serum-albumin fatty-acid binding sites reversibly.",
      "The chemistry is a step longer than Semaglutide's C18 fatty-di-acid. The extended chain contributes to Tirzepatide's high plasma protein binding and its reported plasma half-life of approximately five days.",
    ],
    why: "The C20 di-acid side chain is the structural key to Tirzepatide's once-weekly kinetics.",
    relatedGlossarySlugs: ["acylation", "albumin-binding", "weekly-dosing-pharmacokinetics", "half-life"],
    relatedCompoundSlugs: ["tirzepatide"],
    relatedGuideSlugs: ["albumin-binding-half-life-extension", "tirzepatide-mechanism-of-action"],
  },
  {
    slug: "weekly-dosing-pharmacokinetics",
    term: "Weekly Dosing Pharmacokinetics",
    aliases: ["Once-weekly PK"],
    short:
      "Pharmacokinetic profile — typically half-life of several days plus reversible albumin binding — that supports once-weekly subcutaneous administration.",
    bodyParas: [
      "Weekly dosing pharmacokinetics describes the pharmacokinetic profile characteristic of long-acting incretin analogues such as Semaglutide (~1 week half-life) and Tirzepatide (~5 day half-life) that supports once-weekly subcutaneous administration.",
      "The profile requires DPP-4 resistance (typically through Aib substitutions) combined with reversible non-covalent albumin binding (through a fatty-acid side chain). Steady state is reached after approximately five half-lives — four to five weeks for these analogues.",
    ],
    why: "Weekly dosing pharmacokinetics is a defining property of the modern long-acting incretin analogue class.",
    relatedGlossarySlugs: ["half-life", "steady-state", "albumin-binding", "acylation", "subcutaneous-administration"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    relatedGuideSlugs: ["semaglutide-pharmacokinetics", "albumin-binding-half-life-extension"],
  },
  {
    slug: "surpass-programme",
    term: "SURPASS Programme",
    aliases: ["SURPASS trials", "SURPASS-1", "SURPASS-2"],
    short:
      "Randomised trial programme evaluating Tirzepatide in adults with type 2 diabetes across monotherapy and active-comparator studies (SURPASS-1 through SURPASS-5).",
    bodyParas: [
      "The SURPASS programme is a series of randomised phase-3 clinical trials evaluating once-weekly subcutaneous Tirzepatide in adults with type 2 diabetes. SURPASS-1 (Rosenstock 2021) tested Tirzepatide as monotherapy against placebo; SURPASS-2 (Frías 2021) was a head-to-head comparison with once-weekly Semaglutide 1 mg.",
      "The programme extends across multiple background-therapy and active-comparator arms (SURPASS-3 through SURPASS-5). Primary and key secondary endpoints centre on HbA1c change from baseline and body-weight change.",
    ],
    why: "SURPASS is the core evidence base for Tirzepatide in type 2 diabetes and includes the first head-to-head trial versus a long-acting GLP-1 mono-agonist.",
    relatedGlossarySlugs: ["hba1c-endpoint", "dual-incretin-agonism", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    relatedGuideSlugs: ["tirzepatide-faq", "what-is-tirzepatide"],
  },
  {
    slug: "surmount-programme",
    term: "SURMOUNT Programme",
    aliases: ["SURMOUNT trials", "SURMOUNT-1"],
    short:
      "Randomised trial programme evaluating Tirzepatide for weight management in adults with overweight or obesity (SURMOUNT-1 onwards).",
    bodyParas: [
      "The SURMOUNT programme is a series of randomised phase-3 clinical trials evaluating once-weekly subcutaneous Tirzepatide for weight management. SURMOUNT-1 (Jastreboff 2022) evaluated Tirzepatide versus placebo in adults with obesity or overweight with a weight-related complication, without type 2 diabetes.",
      "The programme extends across additional populations and comparators. Primary endpoints centre on percent body-weight change and the proportion of participants achieving pre-specified weight-loss thresholds.",
    ],
    why: "SURMOUNT is the core evidence base for Tirzepatide as a weight-management pharmacotherapy.",
    relatedGlossarySlugs: ["dual-incretin-agonism", "satiety-signalling", "dio-model"],
    relatedCompoundSlugs: ["tirzepatide"],
    relatedGuideSlugs: ["what-is-tirzepatide", "tirzepatide-faq"],
  },
  {
    slug: "hba1c-endpoint",
    term: "HbA1c Endpoint",
    aliases: ["Glycated haemoglobin", "HbA1c"],
    short:
      "Glycated haemoglobin measured as a percentage; standard endpoint for glycaemic-control research reflecting average blood glucose over the preceding two to three months.",
    bodyParas: [
      "HbA1c (glycated haemoglobin) reflects the non-enzymatic glycation of the β-chain N-terminus of haemoglobin A. Because erythrocytes have an average lifespan of approximately 120 days, HbA1c integrates average blood glucose over roughly two to three months.",
      "HbA1c is the standard primary endpoint in glycaemic-control trials of GLP-1 receptor agonists and dual incretin agonists, including the SURPASS programme for Tirzepatide and the SUSTAIN programme for Semaglutide. It is typically reported as a percentage (DCCT) or mmol/mol (IFCC).",
    ],
    why: "HbA1c is the reference outcome measure that anchors interpretation of every glycaemic-control trial in incretin pharmacology.",
    relatedGlossarySlugs: ["surpass-programme", "dual-incretin-agonism", "glp-1-receptor-agonist"],
    relatedCompoundSlugs: ["tirzepatide", "semaglutide"],
    sameAs: [
      "https://www.wikidata.org/wiki/Q412921",
      "https://en.wikipedia.org/wiki/Glycated_hemoglobin",
    ],
  },
];

const batch3Entries: readonly GlossaryContent[] = batch3Defs.map((d) => ({
  slug: d.slug,
  term: d.term,
  short: d.short,
  aliases: d.aliases,
  body: (
    <>
      {d.bodyParas.map((para, i) => (
        <P key={i}>{para}</P>
      ))}
      <Why>{d.why}</Why>
    </>
  ),
  relatedCompoundSlugs: d.relatedCompoundSlugs,
  relatedGuideSlugs: d.relatedGuideSlugs,
  relatedGlossarySlugs: d.relatedGlossarySlugs,
  definedTerm: {
    path: `/research-hub/glossary/${d.slug}`,
    name: d.term,
    description: d.short,
    termCode: d.termCode ?? d.slug,
    inDefinedTermSet: KG_SET,
    sameAs: d.sameAs,
  },
  datePublished: SPRINT_3B_DATE,
  dateModified: SPRINT_3B_DATE,
}));

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------


export const glossaryContentRegistry: readonly GlossaryContent[] = [
  // Authority Sprint 1B
  angiogenesis,
  vegfr2,
  nitricOxide,
  cytoprotection,
  pentadecapeptide,
  fibroblast,
  fakPaxillin,
  // General peptide science
  peptide,
  aminoAcid,
  peptideBond,
  lyophilisation,
  lyophilisedPowder,
  reconstitution,
  bioavailability,
  halfLife,
  stability,
  molecularWeight,
  // Pharmacology
  agonist,
  antagonist,
  partialAgonist,
  receptor,
  ligand,
  affinity,
  potency,
  ec50,
  ic50,
  pharmacodynamics,
  // Receptor biology
  gpcr,
  signalTransduction,
  secondMessenger,
  camp,
  proteinKinaseA,
  // Laboratory
  hplc,
  lcMs,
  endotoxin,
  lalAssay,
  certificateOfAnalysis,
  // Authority Sprint 2B — Semaglutide cluster
  ...batch2Entries,
  // Authority Sprint 3B — Tirzepatide cluster
  ...batch3Entries,
];

export function getGlossaryContent(slug: string): GlossaryContent | undefined {
  return glossaryContentRegistry.find((g) => g.slug === slug);
}
