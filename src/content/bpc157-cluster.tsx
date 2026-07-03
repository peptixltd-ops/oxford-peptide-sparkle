/**
 * Authority Sprint 1B (Wave 1) — BPC-157 cornerstone cluster.
 *
 * Content activation only. Consumes existing Editorial, Publishing,
 * Knowledge Graph and Taxonomy infrastructure — no new components, no
 * new layouts. Every scientific claim is traceable to the citation
 * registry below.
 *
 * Content is intentionally scientifically honest: BPC-157 has no single
 * canonical receptor, the literature is dominated by rodent preclinical
 * work from a small number of laboratories, and no human trials are
 * reported. This cluster reflects that reality.
 */
import type { ReactNode } from "react";
import {
  QuickAnswer,
  KeyFacts,
  KeyFindings,
  ResearchLimitations,
  EvidenceSummary,
  ReferenceProvider,
  ReferenceList,
  Cite,
  LaboratoryNote,
  ImportantNote,
  MethodologyTip,
  ScientificDisclaimer,
} from "@/components/publishing";
import type { Reference } from "@/components/publishing/types";
import type { CompoundLayoutProps } from "@/components/knowledge/compound-layout";
import type { GuideLayoutProps } from "@/components/knowledge/guide-layout";
import { RelatedGuides } from "@/components/knowledge/related-guides";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";
import type { GuideContent } from "@/content/retatrutide-cluster";

// ---------------------------------------------------------------------------
// Shared citation registry — BPC-157 cornerstone literature
// ---------------------------------------------------------------------------

export const bpc157References: Reference[] = [
  {
    id: "sikiric-2018",
    authors: ["Sikirić P", "Seiwerth S", "Rucman R", "et al."],
    year: 2018,
    title:
      "Stable gastric pentadecapeptide BPC 157: novel therapy in gastrointestinal tract.",
    journal: "Current Neuropharmacology",
    volume: "16",
    issue: "8",
    pages: "1252-1264",
    doi: "10.2174/1570159X15666170929095100",
    pmid: "28925885",
  },
  {
    id: "chang-2011",
    authors: ["Chang CH", "Tsai WC", "Lin MS", "Hsu YH", "Pang JHS"],
    year: 2011,
    title:
      "The promoting effect of pentadecapeptide BPC 157 on tendon healing involves tendon outgrowth, cell survival, and cell migration.",
    journal: "Journal of Applied Physiology",
    volume: "110",
    issue: "3",
    pages: "774-780",
    doi: "10.1152/japplphysiol.00945.2010",
    pmid: "21030672",
  },
  {
    id: "hsieh-2017",
    authors: ["Hsieh MJ", "Liu HT", "Wang CN", "et al."],
    year: 2017,
    title:
      "Therapeutic potential of pro-angiogenic BPC 157 is associated with VEGFR2 activation and up-regulation.",
    journal: "Journal of Molecular Medicine",
    volume: "95",
    issue: "3",
    pages: "323-333",
    doi: "10.1007/s00109-016-1488-y",
    pmid: "27847966",
  },
  {
    id: "seiwerth-2018",
    authors: ["Seiwerth S", "Brčić L", "Vuletić LB", "et al."],
    year: 2018,
    title:
      "BPC 157 and standard angiogenic growth factors: gastrointestinal tract healing, lessons from tendon, ligament, muscle and bone healing.",
    journal: "Current Pharmaceutical Design",
    volume: "24",
    issue: "18",
    pages: "1972-1989",
    doi: "10.2174/1381612824666180712110447",
    pmid: "29998800",
  },
  {
    id: "sikiric-2020",
    authors: ["Sikirić P", "Hahm KB", "Blagaic AB", "et al."],
    year: 2020,
    title:
      "Stable gastric pentadecapeptide BPC 157, Robert's stomach cytoprotection/adaptive cytoprotection/organoprotection, and Selye's stress coping response: progress, achievements, and the future.",
    journal: "Gut and Liver",
    volume: "14",
    issue: "2",
    pages: "153-167",
    doi: "10.5009/gnl18490",
    pmid: "31158953",
  },
  {
    id: "huang-2015",
    authors: ["Huang T", "Zhang K", "Sun L", "et al."],
    year: 2015,
    title:
      "Body protective compound-157 enhances alkali-burn wound healing in vivo and promotes proliferation, migration, and angiogenesis in vitro.",
    journal: "Drug Design, Development and Therapy",
    volume: "9",
    pages: "2485-2499",
    doi: "10.2147/DDDT.S82030",
    pmid: "25995620",
  },
  {
    id: "vukojevic-2018",
    authors: ["Vukojević J", "Siroglavić M", "Kašnik K", "et al."],
    year: 2018,
    title:
      "Rat inferior caval vein (ICV) ligature and particular new insights with the stable gastric pentadecapeptide BPC 157.",
    journal: "Frontiers in Pharmacology",
    volume: "9",
    pages: "1029",
    doi: "10.3389/fphar.2018.01029",
    pmid: "30294272",
  },
  {
    id: "krivic-2008",
    authors: ["Krivic A", "Anic T", "Seiwerth S", "Huljev D", "Sikirić P"],
    year: 2008,
    title:
      "Achilles detachment in rat and stable gastric pentadecapeptide BPC 157: promoted tendon-to-bone healing and opposed corticosteroid aggravation.",
    journal: "Journal of Orthopaedic Research",
    volume: "24",
    issue: "5",
    pages: "982-989",
    doi: "10.1002/jor.20096",
    pmid: "16583442",
  },
];

// ---------------------------------------------------------------------------
// Editorial revisions
// ---------------------------------------------------------------------------

const clusterRevisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-08-05",
    summary:
      "Initial publication of the BPC-157 cornerstone cluster (Authority Sprint 1B, Wave 1).",
    author: "Editorial Team",
  },
];

// ---------------------------------------------------------------------------
// Typographic helpers
// ---------------------------------------------------------------------------

function P({ children }: { children: ReactNode }) {
  return <p className="text-sm leading-relaxed text-navy-deep/90">{children}</p>;
}
function Prose({ children }: { children: ReactNode }) {
  return <div className="space-y-4">{children}</div>;
}
function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1 pl-5 text-sm">{children}</ul>;
}
function OL({ children }: { children: ReactNode }) {
  return <ol className="list-decimal space-y-2 pl-5 text-sm">{children}</ol>;
}
function refWrap(node: ReactNode): ReactNode {
  return (
    <ReferenceProvider references={bpc157References}>
      {node}
      <div className="mt-6">
        <ReferenceList references={bpc157References} />
      </div>
    </ReferenceProvider>
  );
}

// ---------------------------------------------------------------------------
// Monograph metadata
// ---------------------------------------------------------------------------

export const BPC157_META = {
  slug: "bpc-157",
  title: "BPC-157",
  shortDescription:
    "BPC-157 (Body Protection Compound 157) is a synthetic pentadecapeptide fragment of a protein identified in human gastric juice, studied in preclinical models of tissue repair, angiogenesis and cytoprotection.",
  aliases: ["Body Protection Compound 157", "PL 14736", "Pentadecapeptide BPC 157"],
  molecularFormula: "C62H98N16O22",
  molecularWeight: "1419.55",
  cas: "137525-51-0",
  sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
  path: "/compounds/bpc-157",
  datePublished: "2026-08-05",
  dateModified: "2026-08-05",
} as const;

// ---------------------------------------------------------------------------
// Compound-page FAQs (short set for FAQPage schema on the monograph itself)
// ---------------------------------------------------------------------------

const bpc157Faqs: { question: string; answer: string }[] = [
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 (Body Protection Compound 157) is a synthetic 15-amino-acid peptide corresponding to a fragment of a protein originally isolated from human gastric juice. It is studied in preclinical models of tissue repair, angiogenesis and cytoprotection and is supplied by Oxford Research Peptides strictly as a reference standard for in-vitro laboratory research.",
  },
  {
    question: "Does BPC-157 have a defined receptor?",
    answer:
      "No single canonical receptor for BPC-157 has been established in the peer-reviewed literature. Reported mechanisms include modulation of nitric-oxide signalling and up-regulation of the VEGFR2 pathway supporting angiogenesis, but the exact molecular target or targets remain an open scientific question.",
  },
  {
    question: "Is BPC-157 approved for clinical use?",
    answer:
      "No. BPC-157 has no marketing authorisation in the United Kingdom or by other major regulators. Published research is dominated by rodent preclinical studies from a small number of laboratories, and no phase 3 clinical trials are available in the peer-reviewed literature.",
  },
  {
    question: "How should BPC-157 reference material be stored?",
    answer:
      "Lyophilised BPC-157 is stored at −20 °C, desiccated and protected from light. Reconstituted stocks are aliquoted into low-binding vials for single-use, held short-term at 2–8 °C and longer-term at −20 °C, with freeze-thaw cycles minimised.",
  },
];

// ---------------------------------------------------------------------------
// BPC-157 monograph
// ---------------------------------------------------------------------------

export function bpc157Monograph(): CompoundLayoutProps {
  const overview = (
    <Prose>
      <P>
        <strong>BPC-157</strong> — short for <em>Body Protection Compound 157</em>
        {" "}— is a synthetic pentadecapeptide derived from a partial sequence
        of a larger protein originally isolated from human gastric juice.<Cite refId="sikiric-2018" />
        {" "}The peptide has been studied for over two decades, primarily in
        rodent preclinical models, in the context of tissue repair, mucosal
        integrity, tendon and ligament healing, and vascular biology.<Cite refId="seiwerth-2018" />
      </P>
      <P>
        This monograph summarises the published identity, reported
        mechanisms and research context of BPC-157 as reported in the
        peer-reviewed literature. It is written for laboratory researchers
        working with peptide reference standards in vitro.
      </P>
      <p className="text-xs italic text-muted-foreground">
        Oxford Research Peptides supplies BPC-157 strictly as a reference
        standard for in-vitro laboratory research. Nothing on this page
        constitutes medical advice or endorses any therapeutic use. BPC-157
        is not an approved medicine in the United Kingdom.
      </p>
    </Prose>
  );

  const identity = (
    <Prose>
      <P>
        BPC-157 is a 15-residue linear peptide with no disulfide bonds and
        no post-translational modifications. It is reported to be unusually
        stable in the acidic environment of gastric juice — a defining
        physicochemical feature that distinguishes it from many other
        research peptides in the same size class.<Cite refId="sikiric-2018" />
      </P>
      <KeyFacts
        title="At a glance"
        items={[
          { label: "Class", value: "Synthetic pentadecapeptide" },
          { label: "Parent", value: "Gastric juice protein BPC (fragment)" },
          { label: "Residue count", value: "15 amino-acid residues" },
          { label: "Format", value: "Lyophilised powder" },
          { label: "Purity target", value: "≥ 99% (HPLC)" },
          { label: "Storage", value: "−20 °C, desiccated" },
        ]}
      />
    </Prose>
  );

  const synonyms = (
    <UL>
      <li><strong>Body Protection Compound 157</strong> — full descriptive name.</li>
      <li><strong>Pentadecapeptide BPC 157</strong> — name emphasising the 15-residue length.</li>
      <li><strong>PL 14736</strong> — historical development code (Pliva).</li>
      <li><strong>BPC-157</strong> — canonical short form used in most primary literature.</li>
    </UL>
  );

  const classification = (
    <UL>
      <li><strong>Family:</strong> Cytoprotective peptides (research classification).</li>
      <li><strong>Structural type:</strong> Linear synthetic pentadecapeptide; no cyclisation, no fatty-acid modification.</li>
      <li><strong>Reported activity:</strong> Modulation of angiogenic and cytoprotective signalling in preclinical models.</li>
      <li><strong>Research area:</strong> Tissue repair, gastrointestinal mucosal integrity, tendon and ligament biology.</li>
    </UL>
  );

  const mechanism = (
    <Prose>
      <P>
        Unlike a receptor-agonist peptide such as Retatrutide, BPC-157 does
        not have a single, well-defined canonical receptor in the
        peer-reviewed literature. Instead, reported mechanistic work
        describes convergent modulation of several conserved pathways
        associated with tissue repair.<Cite refId="seiwerth-2018" /><Cite refId="sikiric-2020" />
      </P>
      <UL>
        <li>
          <strong>Nitric-oxide (NO) system:</strong> Multiple rodent studies
          describe BPC-157 as interacting with the NO system in a
          context-dependent manner, countering both L-NAME- and L-arginine-
          induced disturbances of NO signalling.<Cite refId="sikiric-2018" />
        </li>
        <li>
          <strong>VEGFR2 / angiogenesis:</strong> Preclinical work reports
          up-regulation and activation of the VEGFR2 receptor and downstream
          angiogenic signalling in endothelial and wound-healing models.<Cite refId="hsieh-2017" /><Cite refId="huang-2015" />
        </li>
        <li>
          <strong>FAK-paxillin / fibroblast migration:</strong> In cultured
          tendon fibroblasts, BPC-157 has been reported to accelerate
          outgrowth and migration through FAK-paxillin signalling.<Cite refId="chang-2011" />
        </li>
        <li>
          <strong>Cytoprotection framework:</strong> Sikirić and colleagues
          situate BPC-157 within Robert's cytoprotection paradigm, describing
          it as an "organoprotector" active across multiple tissue systems
          rather than a single-target agonist.<Cite refId="sikiric-2020" />
        </li>
      </UL>
      <KeyFindings title="Reported preclinical findings">
        <UL>
          <li>Enhanced tendon-to-bone healing in rat Achilles detachment models.<Cite refId="krivic-2008" /></li>
          <li>Improved wound closure and angiogenic markers in alkali-burn wound models.<Cite refId="huang-2015" /></li>
          <li>Protective effects in a rat inferior caval-vein ligature model.<Cite refId="vukojevic-2018" /></li>
        </UL>
      </KeyFindings>
    </Prose>
  );

  const applications = (
    <UL>
      <li><strong>Angiogenesis assays</strong> — endothelial tube-formation, VEGFR2 signalling readouts.</li>
      <li><strong>Fibroblast migration assays</strong> — wound-scratch and Boyden-chamber studies with tendon or dermal fibroblasts.</li>
      <li><strong>Mucosal-integrity models</strong> — in-vitro gastric epithelial monolayers under stress conditions.</li>
      <li><strong>Reference standard</strong> — reversed-phase HPLC and mass-spectrometry identity / purity method development.</li>
    </UL>
  );

  const labMethodology = (
    <Prose>
      <P>
        BPC-157 reference standards are supplied lyophilised. Standard
        laboratory practice for stable linear peptides applies: aseptic
        handling, quantitative reconstitution, and single-use aliquots to
        minimise freeze-thaw cycles.
      </P>
      <LaboratoryNote title="Analytical characterisation">
        <UL>
          <li>Reversed-phase HPLC at 214 nm for purity reporting (target ≥ 99% area).</li>
          <li>Orthogonal identity confirmation by mass spectrometry (expected [M+H]⁺ ≈ 1420.7).</li>
          <li>Karl Fischer or gravimetric water content where a certificate of analysis requires it.</li>
        </UL>
      </LaboratoryNote>
    </Prose>
  );

  const storage = (
    <UL>
      <li><strong>Lyophilised solid:</strong> −20 °C, desiccated, protected from light.</li>
      <li><strong>Reconstituted stock:</strong> 2–8 °C for short-term use; aliquot at −20 °C for longer storage.</li>
      <li><strong>Freeze-thaw:</strong> Minimise cycles; single-use aliquots recommended.</li>
      <li><strong>Container:</strong> Low-binding vials to reduce peptide loss on surfaces.</li>
    </UL>
  );

  const reconstitution = (
    <Prose>
      <P>
        Reconstitute per the laboratory SOP. A general procedure is
        documented in the <em>Laboratory Reconstitution Guide</em>. The
        summary below applies to BPC-157 as a stable linear pentadecapeptide:
      </P>
      <OL>
        <li>Equilibrate the sealed vial to room temperature.</li>
        <li>Introduce sterile or bacteriostatic water slowly against the vial wall.</li>
        <li>Swirl gently to dissolve — do not vortex.</li>
        <li>Allow complete dissolution before aliquoting.</li>
        <li>Label each aliquot with peptide, concentration, date, batch and analyst.</li>
      </OL>
    </Prose>
  );

  const evidence = (
    <div className="space-y-4">
      <EvidenceSummary
        level="preliminary"
        confidence="low"
        summary="Published evidence for BPC-157 is dominated by rodent preclinical studies and a small number of in-vitro reports, largely originating from the group of Sikirić and colleagues. No phase 3 clinical trials are available; independent replication across laboratories remains limited."
      />
      <ResearchLimitations
        items={[
          "No single canonical receptor for BPC-157 has been established in the peer-reviewed literature.",
          "The published corpus is dominated by a small number of research groups; independent cross-laboratory replication is limited.",
          "Available in-vivo evidence is overwhelmingly rodent; no completed phase 3 trials or robust human efficacy data are reported.",
          "BPC-157 has no marketing authorisation in the United Kingdom or by other major regulators.",
          "Pharmacokinetic characterisation of BPC-157 in humans is minimal in the peer-reviewed literature.",
        ]}
      />
    </div>
  );

  const faqs = (
    <div className="space-y-4">
      {bpc157Faqs.map((f) => (
        <div key={f.question}>
          <div className="text-sm font-semibold text-navy-deep">{f.question}</div>
          <p className="text-sm text-navy-deep/85 leading-relaxed mt-1">{f.answer}</p>
        </div>
      ))}
    </div>
  );

  return {
    name: BPC157_META.title,
    eyebrow: "COMPOUND AUTHORITY MONOGRAPH",
    aliases: BPC157_META.aliases.join(", "),
    quickDefinition: (
      <>
        <strong className="text-bone">BPC-157</strong> is a synthetic
        pentadecapeptide fragment of a gastric-juice protein, studied in
        preclinical models of tissue repair, angiogenesis and
        cytoprotection.
      </>
    ),
    overview,
    identity,
    synonyms,
    researchClassification: classification,
    molecularFormula: BPC157_META.molecularFormula,
    molecularWeight: `${BPC157_META.molecularWeight} g/mol`,
    chemicalMetadata: (
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">CAS NUMBER</dt>
          <dd className="text-navy-deep mt-1 font-mono">{BPC157_META.cas}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">RESIDUE COUNT</dt>
          <dd className="text-navy-deep mt-1">15 amino-acid residues</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">SEQUENCE</dt>
          <dd className="text-navy-deep mt-1 font-mono break-all">{BPC157_META.sequence}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MODIFICATION</dt>
          <dd className="text-navy-deep mt-1">None (linear, unmodified)</dd>
        </div>
      </dl>
    ),
    mechanism,
    researchApplications: applications,
    laboratoryMethodology: labMethodology,
    storage,
    reconstitution,
    evidenceSummary: evidence,
    faqs,
    references: refWrap(
      <p className="text-xs text-muted-foreground">
        Cited sources for this monograph. Click any inline reference to jump
        to the entry below.
      </p>,
    ),
    relatedGuides: (
      <RelatedGuides compoundSlug="bpc-157" heading="Related guides" />
    ),
    editorial: (
      <PageEditorial pageKind="compound" revisions={clusterRevisions} />
    ),
    lastUpdated: BPC157_META.dateModified,
  };
}

// ---------------------------------------------------------------------------
// Supporting guides — Mechanism of Action + FAQ
// ---------------------------------------------------------------------------

const bpc157MoA: GuideContent = {
  slug: "bpc-157-mechanism-of-action",
  title: "BPC-157 Mechanism of Action",
  description:
    "Scientifically honest overview of BPC-157's reported mechanistic activity — nitric-oxide modulation, VEGFR2 up-regulation, FAK-paxillin signalling and the cytoprotection framework — with explicit note of what remains unresolved.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-08-05",
  dateModified: "2026-08-05",
  faqs: [
    {
      question: "Does BPC-157 bind a specific receptor?",
      answer:
        "No single canonical receptor for BPC-157 has been established in the peer-reviewed literature. Reported mechanistic work describes convergent modulation of the nitric-oxide system, VEGFR2 signalling and FAK-paxillin pathways rather than agonism at one defined target.",
    },
    {
      question: "How does BPC-157 relate to VEGFR2?",
      answer:
        "Preclinical work by Hsieh and colleagues reports that BPC-157 is associated with activation and up-regulation of the VEGFR2 receptor and downstream pro-angiogenic signalling in endothelial cells. This is described as an indirect effect; direct high-affinity binding of BPC-157 to VEGFR2 has not been demonstrated.",
    },
    {
      question: "What does the FAK-paxillin literature describe?",
      answer:
        "In cultured tendon fibroblasts, Chang and colleagues reported that BPC-157 accelerates outgrowth and migration through FAK-paxillin signalling — a pathway central to cell-substrate adhesion and directed migration.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">BPC-157 Mechanism of Action</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A scientifically honest reading of what the peer-reviewed
          literature does — and does not — currently say about how BPC-157
          acts at the molecular and cellular level.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        BPC-157 does not have a single canonical receptor in the
        peer-reviewed literature. Reported preclinical work describes
        convergent modulation of nitric-oxide signalling, VEGFR2-linked
        angiogenesis, FAK-paxillin fibroblast migration, and a broad
        cytoprotection framework, rather than agonism at one defined target.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Canonical receptor", value: "None established" },
          { label: "Reported systems", value: "NO · VEGFR2 · FAK-paxillin" },
          { label: "Evidence base", value: "Preclinical (rodent + in vitro)" },
          { label: "Framework", value: "Cytoprotection / organoprotection" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">What the literature does not say</h2>
        <P>
          It is important to begin with what is <em>not</em> established.
          Unlike Retatrutide — a triple-agonist peptide with defined
          activity at three cloned receptors — BPC-157 has no single
          canonical receptor characterised in the peer-reviewed literature.
          Papers that describe BPC-157 as acting "on" a specific receptor
          typically report indirect effects: changes in receptor expression,
          activation state, or downstream signalling, rather than
          high-affinity binding of BPC-157 to a defined orthosteric pocket.<Cite refId="hsieh-2017" /><Cite refId="seiwerth-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Nitric-oxide (NO) system</h2>
        <P>
          A recurring theme across the BPC-157 literature is context-dependent
          interaction with the nitric-oxide system. In rodent studies,
          BPC-157 is reported to counter both L-NAME-induced NO-synthase
          inhibition and L-arginine-driven NO excess, consistent with a
          modulatory rather than purely agonistic role.<Cite refId="sikiric-2018" /><Cite refId="sikiric-2020" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">VEGFR2 and angiogenesis</h2>
        <P>
          Hsieh and colleagues reported that BPC-157's pro-angiogenic
          activity in vascular models is associated with activation and
          up-regulation of the VEGFR2 receptor, together with downstream
          signalling cascades supporting endothelial proliferation and tube
          formation.<Cite refId="hsieh-2017" /> Complementary work in
          alkali-burn wound models describes enhanced angiogenic markers and
          improved wound closure in BPC-157-treated animals.<Cite refId="huang-2015" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">FAK-paxillin and fibroblast migration</h2>
        <P>
          At the cellular level, Chang and colleagues characterised the
          effect of BPC-157 on cultured rat Achilles tendon fibroblasts and
          reported accelerated outgrowth and migration through
          FAK-paxillin signalling — a pathway central to focal-adhesion
          dynamics and directed cell migration during tissue repair.<Cite refId="chang-2011" />
        </P>

        <MethodologyTip title="Assay considerations">
          When designing in-vitro BPC-157 experiments, choice of readout
          matters: FAK/paxillin phosphorylation, VEGFR2 phosphorylation,
          endothelial tube formation, or fibroblast wound-scratch closure
          will each engage a different slice of the reported mechanistic
          picture. Documenting the assay lineage and cell system used
          supports downstream comparability across the literature.
        </MethodologyTip>

        <h2 className="font-display text-2xl font-medium text-navy-deep">The cytoprotection framework</h2>
        <P>
          Sikirić and colleagues situate BPC-157 within Robert's
          cytoprotection paradigm and describe it as an "organoprotector"
          — a molecule with convergent protective effects across
          gastrointestinal, vascular, musculoskeletal and neural
          preclinical models — rather than a single-target pharmacological
          agent.<Cite refId="sikiric-2020" /><Cite refId="seiwerth-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">What remains unresolved</h2>
        <UL>
          <li>No single receptor with characterised high-affinity BPC-157 binding is reported in the peer-reviewed literature.</li>
          <li>The upstream molecular event that couples BPC-157 to VEGFR2 up-regulation is not defined.</li>
          <li>The published corpus is dominated by a small number of laboratories; independent cross-lab replication remains limited.</li>
          <li>Human pharmacokinetic and pharmacodynamic data are minimal in the peer-reviewed record.</li>
        </UL>

        <ImportantNote title="Research-use context">
          Oxford Research Peptides supplies BPC-157 as a reference standard
          for in-vitro laboratory research. This guide summarises the
          published scientific literature and does not describe or
          recommend any therapeutic use.
        </ImportantNote>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="preliminary"
        confidence="low"
        summary="Mechanistic understanding is drawn primarily from rodent and in-vitro studies published by a small number of research groups. Convergent findings across NO, VEGFR2 and FAK-paxillin pathways are informative but do not amount to definitive high-affinity receptor characterisation."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "No single canonical receptor characterised in the peer-reviewed literature.",
          "Reported receptor effects (VEGFR2, NO synthase) are indirect rather than direct binding events.",
          "Independent cross-laboratory replication of key mechanistic findings remains limited.",
          "Human pharmacology data are minimal.",
        ]}
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["bpc-157"]} heading="Compound reference" />,
    relatedGuides: <RelatedGuides compoundSlug="bpc-157" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-08-05",
    lastUpdated: "2026-08-05",
  }),
};

const bpc157FaqEntries: { question: string; answer: string }[] = [
  {
    question: "What is BPC-157?",
    answer:
      "BPC-157 (Body Protection Compound 157) is a synthetic 15-amino-acid peptide corresponding to a fragment of a protein originally isolated from human gastric juice. It is studied in preclinical models of tissue repair, angiogenesis and cytoprotection.",
  },
  {
    question: "What does BPC-157 stand for?",
    answer:
      "BPC stands for 'Body Protection Compound'. The number 157 refers to the specific 15-residue fragment described by Sikirić and colleagues in the early 1990s.",
  },
  {
    question: "What is the sequence of BPC-157?",
    answer:
      "BPC-157 has the sequence Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val (GEPPPGKPADDAGLV), a linear pentadecapeptide with no disulfide bonds and no post-translational modifications.",
  },
  {
    question: "What is BPC-157's molecular weight?",
    answer:
      "The reported molecular weight of BPC-157 is approximately 1419.55 g/mol, with molecular formula C62H98N16O22.",
  },
  {
    question: "Does BPC-157 bind a defined receptor?",
    answer:
      "No single canonical receptor for BPC-157 has been established in the peer-reviewed literature. Reported mechanistic work describes convergent modulation of the nitric-oxide system, VEGFR2 signalling and FAK-paxillin pathways rather than agonism at a single defined target.",
  },
  {
    question: "What is the role of VEGFR2 in BPC-157 research?",
    answer:
      "Preclinical work by Hsieh and colleagues reports that BPC-157's pro-angiogenic activity is associated with VEGFR2 activation and up-regulation. This is described as an indirect effect on the pathway rather than direct high-affinity binding of BPC-157 to VEGFR2.",
  },
  {
    question: "How does BPC-157 relate to fibroblast migration?",
    answer:
      "Chang and colleagues reported that BPC-157 accelerates outgrowth and migration in cultured rat Achilles tendon fibroblasts through FAK-paxillin signalling — a pathway central to focal-adhesion dynamics and directed cell migration.",
  },
  {
    question: "What is 'cytoprotection' in this context?",
    answer:
      "Cytoprotection is a research framework, associated with Robert and later Sikirić, describing molecules that protect cells and tissues from injury independently of any specific receptor pathway. BPC-157 is often situated within this framework as an 'organoprotector' active across multiple tissue systems in preclinical models.",
  },
  {
    question: "Is BPC-157 stable in solution?",
    answer:
      "BPC-157 is reported to be unusually stable in the acidic environment of gastric juice, and stable in aqueous solution under standard laboratory storage conditions. Standard peptide handling still applies: aliquot on reconstitution, minimise freeze-thaw cycles, and store per the laboratory storage guide.",
  },
  {
    question: "How is BPC-157 reconstituted?",
    answer:
      "Sterile or bacteriostatic water is the default diluent. Equilibrate the sealed vial to room temperature, introduce diluent slowly against the vial wall, swirl gently to dissolve (do not vortex), then aliquot into low-binding vials. Follow compound-specific documentation and the laboratory SOP.",
  },
  {
    question: "How should BPC-157 be stored?",
    answer:
      "Lyophilised BPC-157 is stored at −20 °C, desiccated and protected from light. Reconstituted stocks are held short-term at 2–8 °C and longer-term as single-use aliquots at −20 °C, with freeze-thaw cycles minimised.",
  },
  {
    question: "Is BPC-157 approved for clinical use in the United Kingdom?",
    answer:
      "No. BPC-157 has no marketing authorisation from the MHRA or from other major regulators. It is not an approved medicine in the United Kingdom and Oxford Research Peptides supplies it strictly as a reference standard for in-vitro laboratory research.",
  },
  {
    question: "Is BPC-157 supplied for human use?",
    answer:
      "No. Oxford Research Peptides supplies BPC-157 strictly as a reference standard for in-vitro laboratory research. Nothing in the product documentation constitutes medical advice or endorses any therapeutic use.",
  },
  {
    question: "Have any phase 3 clinical trials on BPC-157 been published?",
    answer:
      "No phase 3 clinical trials of BPC-157 are available in the peer-reviewed literature at the date of publication. The published evidence base is dominated by rodent preclinical studies and in-vitro reports.",
  },
  {
    question: "What are the main limitations of the current BPC-157 literature?",
    answer:
      "Key limitations are: (1) no single canonical receptor has been characterised; (2) the published corpus is dominated by a small number of research groups; (3) independent cross-laboratory replication remains limited; and (4) human pharmacokinetic and efficacy data are minimal.",
  },
  {
    question: "What common misconceptions exist about BPC-157?",
    answer:
      "Frequent misconceptions include the ideas that BPC-157 is a 'proven' therapeutic in humans, that it binds a specific receptor with high affinity, and that it is regulated in the same way as approved peptide medicines. None of these is supported by the current peer-reviewed literature or by UK regulatory status.",
  },
  {
    question: "Where is BPC-157 typically used in research?",
    answer:
      "Reported research applications include endothelial tube-formation and angiogenesis assays, fibroblast wound-scratch and migration assays, in-vitro gastric mucosal-integrity models, and analytical HPLC and mass-spectrometry method development using BPC-157 as a reference standard.",
  },
  {
    question: "Where can I read the primary literature on BPC-157?",
    answer:
      "Key primary sources include Chang et al. (2011) on tendon fibroblast migration, Hsieh et al. (2017) on VEGFR2 activation, Huang et al. (2015) on wound healing and angiogenesis, and the Sikirić and Seiwerth reviews (2018, 2020) situating BPC-157 within the cytoprotection framework. Full citations are provided in the BPC-157 monograph reference list.",
  },
];

const bpc157FaqGuide: GuideContent = {
  slug: "bpc-157-faq",
  title: "BPC-157 FAQ",
  description:
    "Comprehensive research-focused FAQ on BPC-157 — identity, mechanism, laboratory handling, stability, evidence base, regulatory status and common misconceptions.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-08-05",
  dateModified: "2026-08-05",
  faqs: bpc157FaqEntries,
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">FREQUENTLY ASKED</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">BPC-157 FAQ</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A comprehensive research-focused reference of frequently asked
          questions about BPC-157, covering identity, reported mechanisms,
          laboratory handling, stability, evidence and regulatory status.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        BPC-157 is a synthetic pentadecapeptide fragment of a gastric-juice
        protein, studied in preclinical models of tissue repair,
        angiogenesis and cytoprotection. It has no single canonical
        receptor, no phase 3 clinical trials, and no UK marketing
        authorisation. Oxford Research Peptides supplies it as a reference
        standard for in-vitro laboratory research only.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "BPC-157" },
          { label: "Class", value: "Synthetic pentadecapeptide" },
          { label: "Status", value: "Preclinical (rodent + in vitro)" },
          { label: "Use", value: "In-vitro reference standard" },
        ]}
      />
    ),
    mainContent: (
      <div className="space-y-6">
        {bpc157FaqEntries.map((item, i) => (
          <section
            key={item.question}
            aria-labelledby={`bpc-faq-${i}`}
            className="border-l-2 border-gold/60 pl-4"
          >
            <h2
              id={`bpc-faq-${i}`}
              className="font-display text-lg font-medium text-navy-deep"
            >
              {item.question}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-navy-deep/90">{item.answer}</p>
          </section>
        ))}
        <div className="pt-4 text-sm">
          <p className="text-navy-deep/80">
            For deeper reading see the{" "}
            <a className="underline underline-offset-2" href="/compounds/bpc-157">BPC-157 monograph</a>{" "}
            and the{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/bpc-157-mechanism-of-action">Mechanism of Action</a>{" "}
            guide. Related glossary anchors:{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/angiogenesis">angiogenesis</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/vegfr2">VEGFR2</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/nitric-oxide">nitric oxide</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/cytoprotection">cytoprotection</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/pentadecapeptide">pentadecapeptide</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/fibroblast">fibroblast</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/fak-paxillin">FAK-paxillin</a>.
          </p>
        </div>
      </div>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="preliminary"
        confidence="low"
        summary="Answers here summarise the published preclinical literature on BPC-157 together with widely accepted laboratory practice for stable linear peptides. Independent cross-laboratory replication and human data remain limited."
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["bpc-157"]} heading="Compound reference" />,
    relatedGuides: <RelatedGuides compoundSlug="bpc-157" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-08-05",
    lastUpdated: "2026-08-05",
  }),
};

// ---------------------------------------------------------------------------
// Registries
// ---------------------------------------------------------------------------

export const bpc157GuideRegistry: readonly GuideContent[] = [
  bpc157MoA,
  bpc157FaqGuide,
];

export const bpc157CompoundRegistry: Record<
  string,
  {
    build: () => CompoundLayoutProps;
    faqs: { question: string; answer: string }[];
    meta: typeof BPC157_META;
  }
> = {
  "bpc-157": {
    build: bpc157Monograph,
    faqs: bpc157Faqs,
    meta: BPC157_META,
  },
};

export { bpc157Faqs };
