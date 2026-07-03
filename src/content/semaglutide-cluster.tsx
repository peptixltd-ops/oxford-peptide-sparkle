/**
 * Authority Sprint 2B (Wave 1) — Semaglutide cornerstone cluster.
 *
 * Content activation only. Consumes existing Editorial, Publishing,
 * Knowledge Graph and Taxonomy infrastructure — no new components, no
 * new layouts. Every scientific claim is traceable to the citation
 * registry below.
 *
 * Semaglutide is a well-characterised, approved therapeutic in the
 * United Kingdom (as Ozempic, Wegovy and Rybelsus). Oxford Research
 * Peptides supplies Semaglutide strictly as a reference standard for
 * in-vitro laboratory research — this cluster documents the published
 * scientific literature and does not describe, recommend or endorse
 * any therapeutic use.
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
import { RelatedGuides } from "@/components/knowledge/related-guides";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { RelatedMechanisms } from "@/components/knowledge/related-mechanisms";
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";
import type { GuideContent } from "@/content/retatrutide-cluster";

// ---------------------------------------------------------------------------
// Shared citation registry — Semaglutide cornerstone literature
// ---------------------------------------------------------------------------

export const semaglutideReferences: Reference[] = [
  {
    id: "lau-2015",
    authors: ["Lau J", "Bloch P", "Schäffer L", "et al."],
    year: 2015,
    title:
      "Discovery of the once-weekly glucagon-like peptide-1 (GLP-1) analogue semaglutide.",
    journal: "Journal of Medicinal Chemistry",
    volume: "58",
    issue: "18",
    pages: "7370-7380",
    doi: "10.1021/acs.jmedchem.5b00726",
    pmid: "26308095",
  },
  {
    id: "knudsen-2019",
    authors: ["Knudsen LB", "Lau J"],
    year: 2019,
    title:
      "The discovery and development of liraglutide and semaglutide.",
    journal: "Frontiers in Endocrinology",
    volume: "10",
    pages: "155",
    doi: "10.3389/fendo.2019.00155",
    pmid: "31031702",
  },
  {
    id: "drucker-2018",
    authors: ["Drucker DJ"],
    year: 2018,
    title:
      "Mechanisms of action and therapeutic application of glucagon-like peptide-1.",
    journal: "Cell Metabolism",
    volume: "27",
    issue: "4",
    pages: "740-756",
    doi: "10.1016/j.cmet.2018.03.001",
    pmid: "29617641",
  },
  {
    id: "baggio-2007",
    authors: ["Baggio LL", "Drucker DJ"],
    year: 2007,
    title: "Biology of incretins: GLP-1 and GIP.",
    journal: "Gastroenterology",
    volume: "132",
    issue: "6",
    pages: "2131-2157",
    doi: "10.1053/j.gastro.2007.03.054",
    pmid: "17498508",
  },
  {
    id: "marso-2016",
    authors: ["Marso SP", "Bain SC", "Consoli A", "et al."],
    year: 2016,
    title:
      "Semaglutide and cardiovascular outcomes in patients with type 2 diabetes (SUSTAIN-6).",
    journal: "New England Journal of Medicine",
    volume: "375",
    issue: "19",
    pages: "1834-1844",
    doi: "10.1056/NEJMoa1607141",
    pmid: "27633186",
  },
  {
    id: "wilding-2021",
    authors: ["Wilding JPH", "Batterham RL", "Calanna S", "et al."],
    year: 2021,
    title:
      "Once-weekly semaglutide in adults with overweight or obesity (STEP 1).",
    journal: "New England Journal of Medicine",
    volume: "384",
    issue: "11",
    pages: "989-1002",
    doi: "10.1056/NEJMoa2032183",
    pmid: "33567185",
  },
  {
    id: "lincoff-2023",
    authors: ["Lincoff AM", "Brown-Frandsen K", "Colhoun HM", "et al."],
    year: 2023,
    title:
      "Semaglutide and cardiovascular outcomes in obesity without diabetes (SELECT).",
    journal: "New England Journal of Medicine",
    volume: "389",
    issue: "24",
    pages: "2221-2232",
    doi: "10.1056/NEJMoa2307563",
    pmid: "37952131",
  },
  {
    id: "husain-2019",
    authors: ["Husain M", "Birkenfeld AL", "Donsmark M", "et al."],
    year: 2019,
    title:
      "Oral semaglutide and cardiovascular outcomes in patients with type 2 diabetes (PIONEER 6).",
    journal: "New England Journal of Medicine",
    volume: "381",
    issue: "9",
    pages: "841-851",
    doi: "10.1056/NEJMoa1901118",
    pmid: "31185157",
  },
  {
    id: "buckley-2018",
    authors: ["Buckley ST", "Bækdal TA", "Vegge A", "et al."],
    year: 2018,
    title:
      "Transcellular stomach absorption of a derivatized glucagon-like peptide-1 receptor agonist.",
    journal: "Science Translational Medicine",
    volume: "10",
    issue: "467",
    pages: "eaar7047",
    doi: "10.1126/scitranslmed.aar7047",
    pmid: "30429357",
  },
  {
    id: "graaf-2016",
    authors: ["de Graaf C", "Donnelly D", "Wootten D", "et al."],
    year: 2016,
    title:
      "Glucagon-like peptide-1 and its class B G protein–coupled receptors.",
    journal: "Pharmacological Reviews",
    volume: "68",
    issue: "4",
    pages: "954-1013",
    doi: "10.1124/pr.115.011395",
    pmid: "27736833",
  },
  {
    id: "gabery-2020",
    authors: ["Gabery S", "Salinas CG", "Paulsen SJ", "et al."],
    year: 2020,
    title:
      "Semaglutide lowers body weight in rodents via distributed neural pathways.",
    journal: "JCI Insight",
    volume: "5",
    issue: "6",
    pages: "e133429",
    doi: "10.1172/jci.insight.133429",
    pmid: "32213703",
  },
  {
    id: "perkovic-2024",
    authors: ["Perkovic V", "Tuttle KR", "Rossing P", "et al."],
    year: 2024,
    title:
      "Effects of semaglutide on chronic kidney disease in patients with type 2 diabetes (FLOW).",
    journal: "New England Journal of Medicine",
    volume: "391",
    issue: "2",
    pages: "109-121",
    doi: "10.1056/NEJMoa2403347",
    pmid: "38785209",
  },
];

// ---------------------------------------------------------------------------
// Editorial revisions
// ---------------------------------------------------------------------------

const clusterRevisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-09-02",
    summary:
      "Initial publication of the Semaglutide cornerstone cluster (Authority Sprint 2B, Wave 1).",
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
    <ReferenceProvider references={semaglutideReferences}>
      {node}
      <div className="mt-6">
        <ReferenceList references={semaglutideReferences} />
      </div>
    </ReferenceProvider>
  );
}

// ---------------------------------------------------------------------------
// Monograph metadata
// ---------------------------------------------------------------------------

export const SEMAGLUTIDE_META = {
  slug: "semaglutide",
  title: "Semaglutide",
  shortDescription:
    "Semaglutide is a long-acting synthetic GLP-1 receptor agonist derived from native glucagon-like peptide-1, engineered with a fatty-acid side chain that supports albumin binding and once-weekly kinetics. It is studied as an in-vitro reference standard for research in metabolic, cardiovascular, renal and neuroscience models.",
  aliases: [
    "NN9535",
    "Ozempic (brand)",
    "Wegovy (brand)",
    "Rybelsus (brand — oral)",
  ],
  molecularFormula: "C187H291N45O59",
  molecularWeight: "4113.58",
  cas: "910463-68-2",
  path: "/compounds/semaglutide",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
} as const;

// ---------------------------------------------------------------------------
// Monograph FAQs (short set — merged into FAQPage JSON-LD)
// ---------------------------------------------------------------------------

const semaglutideFaqs: { question: string; answer: string }[] = [
  {
    question: "What is Semaglutide?",
    answer:
      "Semaglutide is a synthetic long-acting glucagon-like peptide-1 (GLP-1) receptor agonist derived from native human GLP-1(7-37) with substitutions at position 8 and lysine-26 acylation with a C18 fatty-di-acid via a γGlu-2xOEG spacer. Oxford Research Peptides supplies Semaglutide as a lyophilised reference standard strictly for in-vitro laboratory research.",
  },
  {
    question: "Which receptor does Semaglutide target?",
    answer:
      "Semaglutide is a selective agonist of the glucagon-like peptide-1 receptor (GLP-1R), a class B G-protein-coupled receptor. Reported in-vitro pharmacology describes activity at GLP-1R comparable to native GLP-1 at the receptor while retaining markedly prolonged plasma persistence in vivo through albumin binding.",
  },
  {
    question: "How does Semaglutide achieve its long half-life?",
    answer:
      "Two structural features extend Semaglutide's half-life relative to native GLP-1: (1) an α-aminoisobutyric acid substitution at position 8 that confers resistance to dipeptidyl peptidase-4 (DPP-4) cleavage, and (2) a C18 fatty-di-acid attached at lysine-26 through a γGlu-2xOEG linker that supports reversible non-covalent binding to serum albumin. Together these features yield a plasma half-life of approximately one week in humans.",
  },
  {
    question: "How does Semaglutide differ from native GLP-1?",
    answer:
      "Native GLP-1(7-37) is rapidly degraded by DPP-4 with a plasma half-life of roughly 1–2 minutes. Semaglutide shares the core GLP-1 sequence with three key modifications (Aib8, Arg34, Lys26-acylation) that confer DPP-4 resistance and albumin binding, extending plasma persistence to approximately one week while retaining GLP-1R agonism.",
  },
  {
    question: "How is Semaglutide reference material stored?",
    answer:
      "Lyophilised Semaglutide is stored at −20 °C, desiccated and protected from light. Reconstituted stocks are aliquoted into low-binding vials, held short-term at 2–8 °C and longer-term at −20 °C, and freeze-thaw cycles are minimised. Full detail is provided in the Laboratory Storage Guide.",
  },
];

// ---------------------------------------------------------------------------
// Semaglutide monograph
// ---------------------------------------------------------------------------

export function semaglutideMonograph(): CompoundLayoutProps {
  const overview = (
    <Prose>
      <P>
        <strong>Semaglutide</strong> (development code <em>NN9535</em>) is a
        synthetic long-acting glucagon-like peptide-1 (GLP-1) receptor
        agonist first described by Lau and colleagues in 2015.<Cite refId="lau-2015" />
        {" "}It is derived from the native human incretin GLP-1(7-37) and
        engineered with an α-aminoisobutyric acid substitution at position 8
        (Aib8), an arginine substitution at position 34 (Arg34) and a
        lysine-26 acylation with a C18 fatty-di-acid via a γGlu-2xOEG
        spacer.<Cite refId="knudsen-2019" />
      </P>
      <P>
        These modifications produce two convergent effects: resistance to
        dipeptidyl peptidase-4 (DPP-4) cleavage and reversible non-covalent
        binding to serum albumin. Together they extend the plasma half-life
        of Semaglutide to approximately one week in humans, supporting
        once-weekly subcutaneous dosing and a distinct oral formulation
        co-administered with the absorption enhancer SNAC.<Cite refId="buckley-2018" />
      </P>
      <P>
        Semaglutide is one of the most extensively studied GLP-1 receptor
        agonists in the published clinical literature, with landmark
        outcome trials in type 2 diabetes (SUSTAIN-6),<Cite refId="marso-2016" />
        {" "}obesity (STEP-1),<Cite refId="wilding-2021" /> cardiovascular
        disease in obesity without diabetes (SELECT)<Cite refId="lincoff-2023" />
        {" "}and chronic kidney disease in type 2 diabetes (FLOW).<Cite refId="perkovic-2024" />
      </P>
      <p className="text-xs italic text-muted-foreground">
        Oxford Research Peptides supplies Semaglutide strictly as a
        reference standard for in-vitro laboratory research. Nothing on
        this page constitutes medical advice or endorses any therapeutic
        use of research-grade material. Approved Semaglutide medicines
        (Ozempic, Wegovy, Rybelsus) are prescribed by qualified
        clinicians under MHRA authorisation.
      </p>
    </Prose>
  );

  const identity = (
    <Prose>
      <P>
        Semaglutide is a 31-residue linear peptide with one lysine
        side-chain modification and no disulfide bonds. Its full name is
        <em>
          {" "}N26-[2-(2-[2-(2-[2-(2-[4-(17-carboxyheptadecanoylamino)-4(S)-
          carboxybutyrylamino]ethoxy)ethoxy]acetylamino)ethoxy]ethoxy)
          acetyl]-[Aib8, Arg34]GLP-1(7-37)
        </em>.<Cite refId="lau-2015" />
      </P>
      <KeyFacts
        title="At a glance"
        items={[
          { label: "Class", value: "Long-acting GLP-1 receptor agonist" },
          { label: "Receptor", value: "GLP-1R (class B GPCR)" },
          { label: "Backbone", value: "Modified GLP-1(7-37)" },
          { label: "Modification", value: "Aib8 · Arg34 · Lys26-acylation" },
          { label: "Half-life (human)", value: "≈ 1 week" },
          { label: "Format", value: "Lyophilised reference standard" },
          { label: "Purity target", value: "≥ 98% (HPLC)" },
          { label: "Storage", value: "−20 °C, desiccated" },
        ]}
      />
    </Prose>
  );

  const synonyms = (
    <UL>
      <li><strong>Semaglutide</strong> — INN (International Non-proprietary Name).</li>
      <li><strong>NN9535</strong> — Novo Nordisk internal development code.</li>
      <li><strong>Ozempic</strong> — approved brand for subcutaneous once-weekly Semaglutide (type 2 diabetes).</li>
      <li><strong>Wegovy</strong> — approved brand for subcutaneous once-weekly Semaglutide (weight management).</li>
      <li><strong>Rybelsus</strong> — approved brand for oral once-daily Semaglutide co-formulated with SNAC.</li>
    </UL>
  );

  const classification = (
    <UL>
      <li><strong>Family:</strong> Incretin mimetics; GLP-1 mono-agonists.</li>
      <li><strong>Structural type:</strong> Modified 31-residue linear GLP-1 analogue with C18 fatty-di-acid side chain.</li>
      <li><strong>Primary target:</strong> GLP-1 receptor (GLP-1R), a class B G-protein-coupled receptor.</li>
      <li><strong>Research area:</strong> Metabolic, cardiovascular, renal and central appetite research; incretin pharmacology.</li>
    </UL>
  );

  const mechanism = (
    <Prose>
      <P>
        Semaglutide is a selective agonist of the GLP-1 receptor. Its
        modifications extend duration of action; the receptor pharmacology
        at GLP-1R remains close to native GLP-1.<Cite refId="lau-2015" /><Cite refId="graaf-2016" />
        {" "}GLP-1R is a class B (secretin-family) G-protein-coupled
        receptor coupled predominantly to Gαs, activating adenylyl cyclase
        and generating cyclic AMP (cAMP) as the primary second
        messenger.<Cite refId="drucker-2018" />
      </P>
      <UL>
        <li>
          <strong>cAMP / PKA signalling:</strong> Gαs coupling elevates
          intracellular cAMP, activating protein kinase A and downstream
          transcriptional and metabolic effectors.<Cite refId="baggio-2007" />
        </li>
        <li>
          <strong>cAMP / EPAC2:</strong> A parallel cAMP effector, EPAC2,
          contributes to glucose-dependent insulin exocytosis from
          pancreatic β-cells.<Cite refId="drucker-2018" />
        </li>
        <li>
          <strong>β-arrestin recruitment:</strong> Class B GPCR agonists
          also recruit β-arrestin, contributing to receptor internalisation
          and pathway-specific signalling; the balance of G-protein and
          arrestin engagement is an active area of biased-agonism
          research.<Cite refId="graaf-2016" />
        </li>
        <li>
          <strong>Central appetite modulation:</strong> Preclinical rodent
          work maps Semaglutide activity to distributed neural circuits
          spanning brainstem and hypothalamic POMC / NPY populations,
          consistent with reduced food intake in vivo.<Cite refId="gabery-2020" />
        </li>
      </UL>
      <KeyFindings title="Reported human evidence (context only)">
        <UL>
          <li>SUSTAIN-6: cardiovascular outcomes in type 2 diabetes.<Cite refId="marso-2016" /></li>
          <li>STEP-1: weight reduction in adults with overweight / obesity.<Cite refId="wilding-2021" /></li>
          <li>SELECT: cardiovascular outcomes in obesity without diabetes.<Cite refId="lincoff-2023" /></li>
          <li>PIONEER 6: cardiovascular safety with oral Semaglutide.<Cite refId="husain-2019" /></li>
          <li>FLOW: kidney disease outcomes in type 2 diabetes.<Cite refId="perkovic-2024" /></li>
        </UL>
      </KeyFindings>
    </Prose>
  );

  const pharmacology = (
    <Prose>
      <P>
        Two features drive Semaglutide's pharmacokinetics: DPP-4 resistance
        conferred by the Aib8 substitution, and albumin binding conferred
        by the C18 fatty-di-acid side chain attached at lysine-26 through a
        γGlu-2xOEG linker.<Cite refId="lau-2015" /><Cite refId="knudsen-2019" />
      </P>
      <UL>
        <li><strong>Plasma half-life (human):</strong> approximately 165–184 h (~1 week) after subcutaneous administration.</li>
        <li><strong>Steady state:</strong> achieved after 4–5 weeks of once-weekly dosing (5 half-lives).</li>
        <li><strong>Bioavailability (SC):</strong> ~89% of the injected dose.</li>
        <li><strong>Oral formulation:</strong> co-administered with SNAC (salcaprozate sodium), which transiently raises local pH in the stomach and enables absorption; oral bioavailability is low (&lt; 1%) but pharmacologically sufficient with daily dosing.<Cite refId="buckley-2018" /></li>
        <li><strong>Elimination:</strong> primarily proteolytic; renal and biliary excretion of small peptide fragments.</li>
      </UL>
    </Prose>
  );

  const applications = (
    <UL>
      <li><strong>GLP-1R signalling assays</strong> — cAMP accumulation, β-arrestin recruitment, receptor internalisation.</li>
      <li><strong>β-cell / insulin-secretion models</strong> — glucose-dependent insulin release readouts in cell lines and isolated islets.</li>
      <li><strong>Central-appetite preclinical research</strong> — rodent food-intake and neural-activation studies (POMC, NPY).</li>
      <li><strong>Metabolic and diet-induced-obesity models</strong> — reference standard for comparative in-vitro and in-vivo work.</li>
      <li><strong>Analytical reference standard</strong> — reversed-phase HPLC and LC-MS identity / purity method development.</li>
    </UL>
  );

  const labMethodology = (
    <Prose>
      <P>
        Semaglutide reference standards are supplied lyophilised. Standard
        laboratory practice for acylated GLP-1 analogues applies: careful
        aseptic technique, low-binding plasticware, and awareness that
        albumin-binding acylated peptides are surface-active and can
        aggregate on hydrophobic surfaces at low concentrations.
      </P>
      <LaboratoryNote title="Analytical characterisation">
        <UL>
          <li>Reversed-phase HPLC at 214 nm for purity reporting (target ≥ 98% area).</li>
          <li>LC-MS identity confirmation against the theoretical monoisotopic mass (≈ 4113.58 g/mol average).</li>
          <li>Optional SEC-HPLC to monitor aggregation of the acylated peptide.</li>
        </UL>
      </LaboratoryNote>
      <MethodologyTip title="Handling considerations">
        Long-chain acylated GLP-1 analogues are surface-active and bind
        strongly to albumin and hydrophobic plastics. Prepare working
        stocks in albumin-containing buffer where the assay allows, use
        low-binding tubes, and document the diluent used — small buffer
        changes can materially affect apparent EC<sub>50</sub> values in
        cell-based cAMP assays.
      </MethodologyTip>
    </Prose>
  );

  const storage = (
    <UL>
      <li><strong>Lyophilised solid:</strong> −20 °C, desiccated, protected from light.</li>
      <li><strong>Reconstituted stock:</strong> 2–8 °C for short-term work; aliquot at −20 °C for longer storage.</li>
      <li><strong>Freeze-thaw:</strong> Minimise cycles; single-use aliquots recommended.</li>
      <li><strong>Container:</strong> Low-binding vials to limit peptide loss to hydrophobic surfaces.</li>
    </UL>
  );

  const reconstitution = (
    <Prose>
      <P>
        Reconstitute per the laboratory SOP. A general procedure is
        documented in the <em>Laboratory Reconstitution Guide</em>. The
        summary below applies to Semaglutide as an acylated GLP-1 analogue:
      </P>
      <OL>
        <li>Equilibrate the sealed vial to room temperature.</li>
        <li>Introduce sterile or bacteriostatic water slowly against the vial wall.</li>
        <li>Swirl gently — do not vortex — to protect the peptide backbone.</li>
        <li>Allow complete dissolution; a faint opalescence at high concentration is consistent with the surface-active fatty-acid side chain.</li>
        <li>Aliquot into low-binding vials; label with peptide, concentration, batch, date and analyst.</li>
      </OL>
    </Prose>
  );

  const evidence = (
    <div className="space-y-4">
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Semaglutide is one of the most extensively characterised GLP-1 receptor agonists in the published literature. Multiple large phase 3 outcome trials (SUSTAIN, STEP, SELECT, PIONEER, FLOW) report metabolic, cardiovascular and renal endpoints. Mechanistic pharmacology (GLP-1R agonism, cAMP / PKA signalling, β-arrestin recruitment, DPP-4 resistance and albumin binding) is well described. Independent laboratory replication is broad."
      />
      <ResearchLimitations
        items={[
          "Central-nervous-system mechanisms are described mainly in rodent models; direct human neuroimaging evidence is more limited.",
          "Long-term (>5 year) real-world safety data continue to accumulate.",
          "Off-label investigational uses (e.g. neurodegenerative and addiction research) rest on smaller, earlier-phase data than metabolic and cardiovascular endpoints.",
          "In-vitro assay results with acylated GLP-1 analogues are sensitive to buffer albumin content and plasticware — comparability across laboratories requires careful method reporting.",
        ]}
      />
    </div>
  );

  const regulatory = (
    <Prose>
      <ImportantNote title="Research-use framing">
        Approved Semaglutide medicines (Ozempic, Wegovy, Rybelsus) are
        prescription therapeutics regulated by the MHRA in the United
        Kingdom, the EMA in the European Union and the FDA in the United
        States. Oxford Research Peptides does not supply approved
        medicines. Research-grade Semaglutide supplied by Oxford Research
        Peptides is a lyophilised reference standard intended solely for
        in-vitro laboratory work and is not for human or veterinary use.
      </ImportantNote>
    </Prose>
  );

  const faqs = (
    <div className="space-y-4">
      {semaglutideFaqs.map((f) => (
        <div key={f.question}>
          <div className="text-sm font-semibold text-navy-deep">{f.question}</div>
          <p className="text-sm text-navy-deep/85 leading-relaxed mt-1">{f.answer}</p>
        </div>
      ))}
    </div>
  );

  return {
    name: SEMAGLUTIDE_META.title,
    eyebrow: "COMPOUND AUTHORITY MONOGRAPH",
    aliases: SEMAGLUTIDE_META.aliases.join(", "),
    quickDefinition: (
      <>
        <strong className="text-bone">Semaglutide</strong> is a long-acting
        synthetic GLP-1 receptor agonist derived from native GLP-1(7-37),
        engineered with a fatty-di-acid side chain for albumin binding
        and once-weekly kinetics.
      </>
    ),
    overview,
    identity,
    synonyms,
    researchClassification: classification,
    molecularFormula: SEMAGLUTIDE_META.molecularFormula,
    molecularWeight: `${SEMAGLUTIDE_META.molecularWeight} g/mol`,
    chemicalMetadata: (
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">CAS NUMBER</dt>
          <dd className="text-navy-deep mt-1 font-mono">{SEMAGLUTIDE_META.cas}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">RESIDUE COUNT</dt>
          <dd className="text-navy-deep mt-1">31 residues (modified GLP-1(7-37) backbone)</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MODIFICATION</dt>
          <dd className="text-navy-deep mt-1">Aib8 · Arg34 · Lys26-γGlu-2xOEG-C18 di-acid</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">DEVELOPMENT CODE</dt>
          <dd className="text-navy-deep mt-1 font-mono">NN9535</dd>
        </div>
      </dl>
    ),
    mechanism,
    receptorTargets: (
      <RelatedMechanisms mechanismIds={["glp1r"]} heading="Primary receptor target" />
    ),
    pharmacology,
    researchApplications: applications,
    laboratoryMethodology: labMethodology,
    storage,
    reconstitution,
    evidenceSummary: evidence,
    faqs,
    references: refWrap(
      <p className="text-xs text-muted-foreground">
        Cited sources for this monograph. Click any inline reference to
        jump to the entry below.
      </p>,
    ),
    relatedGuides: (
      <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />
    ),
    relatedProducts: (
      <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
        <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
          RESEARCH-USE FRAMING
        </div>
        {regulatory}
      </section>
    ),
    editorial: (
      <PageEditorial pageKind="compound" revisions={clusterRevisions} />
    ),
    lastUpdated: SEMAGLUTIDE_META.dateModified,
  };
}

// ---------------------------------------------------------------------------
// Guide: What is Semaglutide?
// ---------------------------------------------------------------------------

const whatIsSemaglutide: GuideContent = {
  slug: "what-is-semaglutide",
  title: "What is Semaglutide?",
  description:
    "Beginner-friendly research-focused introduction to Semaglutide — a long-acting GLP-1 receptor agonist derived from native GLP-1(7-37) and studied extensively in metabolic, cardiovascular and renal research.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  faqs: [
    {
      question: "Is Semaglutide a peptide?",
      answer:
        "Yes. Semaglutide is a 31-residue linear peptide with a lysine-26 fatty-di-acid modification. It is derived from the native incretin hormone GLP-1(7-37).",
    },
    {
      question: "What receptor does Semaglutide target?",
      answer:
        "Semaglutide is a selective agonist of the glucagon-like peptide-1 receptor (GLP-1R), a class B G-protein-coupled receptor. It does not activate the GIP or glucagon receptors at pharmacologically meaningful concentrations.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">What is Semaglutide?</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise, evidence-based introduction to Semaglutide — a
          long-acting GLP-1 receptor agonist derived from native GLP-1(7-37)
          and studied extensively in the metabolic, cardiovascular and
          renal literature.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide is a synthetic long-acting agonist of the GLP-1
        receptor. It shares the core GLP-1(7-37) sequence with three key
        modifications — Aib8, Arg34 and lysine-26 acylation with a C18
        fatty-di-acid via a γGlu-2xOEG spacer — which extend its plasma
        half-life to roughly one week and allow once-weekly subcutaneous
        or once-daily oral dosing in humans.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Semaglutide" },
          { label: "Target", value: "GLP-1R (class B GPCR)" },
          { label: "Class", value: "Long-acting GLP-1 receptor agonist" },
          { label: "Half-life", value: "≈ 1 week (human, subcutaneous)" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Definition and origin</h2>
        <P>
          Semaglutide is a synthetic peptide first described in the
          peer-reviewed literature by Lau and colleagues in 2015 as a
          once-weekly GLP-1 analogue.<Cite refId="lau-2015" /> It was
          designed from native human <em>glucagon-like peptide-1</em>
          {" "}(GLP-1) with a small number of targeted modifications that
          dramatically extend its persistence in circulation without
          fundamentally changing its receptor pharmacology.<Cite refId="knudsen-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Where GLP-1 comes from</h2>
        <P>
          Native GLP-1 is an <em>incretin</em>: a gut-derived peptide
          hormone released from intestinal L-cells in response to nutrient
          intake. It amplifies glucose-dependent insulin secretion from
          pancreatic β-cells, suppresses glucagon release from α-cells and
          slows gastric emptying — collectively known as the
          {" "}<em>incretin effect</em>.<Cite refId="baggio-2007" /><Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">How Semaglutide differs from native GLP-1</h2>
        <UL>
          <li>
            <strong>Aib8:</strong> replacement of alanine at position 8
            with α-aminoisobutyric acid confers resistance to dipeptidyl
            peptidase-4 (DPP-4), the enzyme that cleaves native GLP-1
            within minutes.<Cite refId="lau-2015" />
          </li>
          <li>
            <strong>Arg34:</strong> substitution to prevent side-chain
            interference during synthesis of the acylated lysine.
          </li>
          <li>
            <strong>Lys26 acylation:</strong> a C18 fatty-di-acid attached
            through a γGlu-2xOEG spacer supports reversible non-covalent
            binding to serum albumin, dramatically extending plasma
            residence.<Cite refId="knudsen-2019" />
          </li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">What receptor does Semaglutide act at?</h2>
        <P>
          Semaglutide is a selective agonist of the <strong>GLP-1 receptor</strong>
          {" "}(GLP-1R), a class B (secretin-family) G-protein-coupled
          receptor.<Cite refId="graaf-2016" /> It does not activate the GIP
          or glucagon receptors at pharmacologically meaningful
          concentrations, distinguishing it from dual-agonist peptides such
          as Tirzepatide and triple-agonist peptides such as
          {" "}<a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide</a>.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Research context</h2>
        <P>
          Semaglutide has been evaluated in one of the largest published
          GLP-1 receptor agonist evidence bases, including SUSTAIN-6 in
          type 2 diabetes,<Cite refId="marso-2016" /> STEP-1 in overweight
          and obesity,<Cite refId="wilding-2021" /> SELECT in obesity
          without diabetes,<Cite refId="lincoff-2023" /> PIONEER 6 for
          oral Semaglutide<Cite refId="husain-2019" /> and FLOW in chronic
          kidney disease with type 2 diabetes.<Cite refId="perkovic-2024" />
        </P>

        <ImportantNote title="Research-use framing">
          Approved Semaglutide medicines are prescription therapeutics
          regulated by the MHRA in the United Kingdom. Oxford Research
          Peptides supplies Semaglutide strictly as a lyophilised
          reference standard for in-vitro laboratory research. See{" "}
          <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/testing-and-quality-control">Testing &amp; Quality Control</a>{" "}
          for the framework applied to research-grade material.
        </ImportantNote>

        <p className="text-sm text-navy-deep/80">
          Continue reading:{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-mechanism-of-action">Semaglutide mechanism of action</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
          <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>{" "}
          and the{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-faq">Semaglutide FAQ</a>.
        </p>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Semaglutide's identity, structure and receptor selectivity are established in the peer-reviewed literature. Its efficacy and safety have been evaluated in large randomised clinical trials across metabolic, cardiovascular and renal endpoints."
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-09-02",
    lastUpdated: "2026-09-02",
  }),
};

// ---------------------------------------------------------------------------
// Guide: Semaglutide Mechanism of Action
// ---------------------------------------------------------------------------

const semaglutideMoA: GuideContent = {
  slug: "semaglutide-mechanism-of-action",
  title: "Semaglutide Mechanism of Action",
  description:
    "Receptor-level explanation of how Semaglutide acts at the GLP-1 receptor: Gαs / cAMP / PKA signalling, EPAC2, β-arrestin recruitment, insulinotropic and glucagonostatic effects, gastric emptying and central appetite modulation.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  faqs: [
    {
      question: "What downstream signalling does Semaglutide engage?",
      answer:
        "GLP-1R activation by Semaglutide couples primarily to Gαs, raising intracellular cAMP and activating protein kinase A and EPAC2. β-arrestin is also recruited and contributes to receptor internalisation and pathway-specific signalling.",
    },
    {
      question: "How does Semaglutide affect gastric emptying?",
      answer:
        "GLP-1R activation slows gastric emptying via vagally-mediated pathways. This contributes to reduced postprandial glucose excursions and increased satiety and is a well-documented pharmacological effect of GLP-1 receptor agonists.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Semaglutide Mechanism of Action</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A receptor-level explanation of how Semaglutide engages the
          GLP-1 receptor and translates that engagement into insulinotropic,
          glucagonostatic, gastric and central appetite effects.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide is a selective agonist of the class B G-protein-coupled
        GLP-1 receptor. Receptor activation raises intracellular cAMP via
        Gαs, engaging protein kinase A and EPAC2. Downstream effects
        include glucose-dependent stimulation of insulin secretion from
        pancreatic β-cells, suppression of glucagon release from α-cells,
        slowed gastric emptying via vagal pathways, and reduced food intake
        through distributed central nervous system circuits.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptor", value: "GLP-1R (class B GPCR)" },
          { label: "G-protein", value: "Gαs → cAMP" },
          { label: "Second messenger", value: "cAMP · PKA · EPAC2" },
          { label: "Peripheral", value: "Insulin ↑ · Glucagon ↓ · Gastric emptying ↓" },
          { label: "Central", value: "POMC / NPY modulation, reduced intake" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Receptor engagement</h2>
        <P>
          Semaglutide binds the GLP-1 receptor (GLP-1R), a
          seven-transmembrane class B GPCR of the secretin family
          expressed on pancreatic β-cells, α-cells, gastric smooth muscle,
          vagal afferents and multiple central nervous system
          populations.<Cite refId="graaf-2016" /><Cite refId="drucker-2018" />
          {" "}Reported in-vitro pharmacology characterises Semaglutide as
          having activity at GLP-1R comparable to native GLP-1 at the
          receptor while retaining dramatically extended plasma
          persistence.<Cite refId="lau-2015" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">cAMP / PKA — the primary pathway</h2>
        <P>
          GLP-1R couples predominantly to Gαs. Activation stimulates
          adenylyl cyclase, elevating intracellular cyclic AMP. cAMP
          activates <strong>protein kinase A (PKA)</strong>, which
          phosphorylates ion channels, exocytotic machinery and
          transcription factors relevant to β-cell function and
          survival.<Cite refId="baggio-2007" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">cAMP / EPAC2</h2>
        <P>
          In parallel with PKA, cAMP activates <strong>EPAC2</strong>
          {" "}(exchange protein directly activated by cAMP). EPAC2 is a
          PKA-independent effector implicated in glucose-dependent insulin
          exocytosis and represents one branch of GLP-1R signalling that is
          distinct from classical protein-kinase phosphorylation.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">β-arrestin and biased agonism</h2>
        <P>
          Like other class B GPCRs, GLP-1R recruits β-arrestin. Arrestin
          recruitment mediates receptor desensitisation and internalisation
          and contributes to arrestin-dependent signalling that is
          conceptually separable from G-protein-mediated signalling —
          the framework known as <em>biased agonism</em>.<Cite refId="graaf-2016" />
          {" "}The therapeutic implications of biased signalling at GLP-1R
          are an active research area.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Insulinotropic effect</h2>
        <P>
          On pancreatic β-cells, GLP-1R activation potentiates
          glucose-dependent insulin secretion — the classical
          {" "}<em>insulinotropic</em> effect. Because the signal requires
          simultaneous elevated glucose, GLP-1R agonism does not force
          insulin release at low glucose, which is central to the low
          intrinsic hypoglycaemia risk of the class in clinical studies.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Glucagonostatic effect</h2>
        <P>
          On pancreatic α-cells, GLP-1R signalling reduces glucagon
          secretion in a glucose-dependent manner. This
          {" "}<em>glucagonostatic</em> component reduces hepatic glucose
          output and contributes to the overall glycaemic effect of GLP-1
          receptor agonism.<Cite refId="baggio-2007" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Gastric emptying</h2>
        <P>
          GLP-1R activation slows gastric emptying via vagally-mediated
          pathways. Delayed gastric emptying blunts postprandial glucose
          excursions and prolongs distension-based satiety signalling and
          is a well-documented pharmacological effect of GLP-1 receptor
          agonists.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Central appetite modulation</h2>
        <P>
          Preclinical rodent work by Gabery and colleagues mapped
          Semaglutide's central activity to distributed neural circuits,
          including brainstem NTS and hypothalamic populations relevant to
          appetite regulation — including POMC (anorexigenic) and NPY
          (orexigenic) neurons. This distributed engagement is consistent
          with reduced food intake observed in vivo.<Cite refId="gabery-2020" />
        </P>

        <MethodologyTip title="In-vitro assay considerations">
          When benchmarking Semaglutide in cell-based cAMP or β-arrestin
          assays, document the buffer albumin content and plasticware.
          Long-chain acylated GLP-1 analogues are surface-active and
          strongly albumin-binding; apparent EC<sub>50</sub> values are
          highly sensitive to these variables, which is a common source of
          between-laboratory variability.
        </MethodologyTip>

        <ImportantNote title="Research-use framing">
          This mechanism note describes published pharmacology and does not
          constitute medical advice. Oxford Research Peptides supplies
          Semaglutide as an in-vitro reference standard only.
        </ImportantNote>

        <p className="text-sm text-navy-deep/80">
          Related reading:{" "}
          <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/glossary/biased-agonism">biased agonism</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/research-hub/glossary/incretin-effect">the incretin effect</a>.
        </p>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="GLP-1R agonism by Semaglutide, downstream cAMP / PKA and EPAC2 signalling, glucose-dependent insulin and glucagon effects, delayed gastric emptying and central appetite modulation are all supported by a broad peer-reviewed literature."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "The relative contribution of PKA vs EPAC2 to β-cell insulin exocytosis under different physiological contexts remains an active research topic.",
          "Biased-agonism outcomes at GLP-1R are conceptually appealing but not yet mapped to defined clinical differences for Semaglutide.",
          "Central mechanism data derive primarily from rodent models with translational limitations.",
          "Reported in-vitro potency for acylated GLP-1 analogues is sensitive to albumin content and container surface effects; comparability requires careful method reporting.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-09-02",
    lastUpdated: "2026-09-02",
  }),
};

// ---------------------------------------------------------------------------
// Guide: Semaglutide FAQ (20 Q&A)
// ---------------------------------------------------------------------------

const semaglutideFaqEntries: { question: string; answer: string }[] = [
  {
    question: "Is Semaglutide a peptide?",
    answer:
      "Yes. Semaglutide is a 31-residue linear peptide with a lysine-26 fatty-di-acid modification. It is derived from the native incretin hormone GLP-1(7-37).",
  },
  {
    question: "What receptor does Semaglutide target?",
    answer:
      "Semaglutide is a selective agonist of the glucagon-like peptide-1 receptor (GLP-1R), a class B G-protein-coupled receptor. It does not activate GIPR or GCGR at pharmacologically meaningful concentrations.",
  },
  {
    question: "How is Semaglutide different from native GLP-1?",
    answer:
      "Semaglutide shares the core GLP-1(7-37) sequence with three key modifications: α-aminoisobutyric acid at position 8 (Aib8) to resist DPP-4 cleavage, arginine at position 34 (Arg34) to enable regioselective acylation, and a C18 fatty-di-acid attached at lysine-26 via a γGlu-2xOEG spacer that binds serum albumin.",
  },
  {
    question: "Why does Semaglutide have such a long half-life?",
    answer:
      "The Aib8 substitution makes the peptide resistant to DPP-4, and the C18 fatty-di-acid side chain supports reversible non-covalent binding to serum albumin. Together these extend plasma half-life in humans to approximately one week.",
  },
  {
    question: "What is the difference between Semaglutide and Tirzepatide?",
    answer:
      "Semaglutide is a selective GLP-1 receptor agonist. Tirzepatide is a dual agonist engaging both the GLP-1 and GIP receptors from a single molecule. The two peptides share long-acting incretin pharmacology but differ in receptor coverage.",
  },
  {
    question: "What is the difference between Semaglutide and Retatrutide?",
    answer:
      "Retatrutide is an investigational triple agonist engaging GLP-1R, GIPR and GCGR from a single molecule. Semaglutide is a selective GLP-1R agonist. Retatrutide's addition of GIP and glucagon receptor activity distinguishes it pharmacologically from Semaglutide.",
  },
  {
    question: "What is the difference between Semaglutide and Liraglutide?",
    answer:
      "Both are acylated GLP-1 receptor agonists, but their acylation chemistry differs: Liraglutide carries a C16 mono-acid producing a ~13-hour half-life supporting once-daily dosing, while Semaglutide's C18 di-acid with a longer spacer supports a ~1-week half-life and once-weekly dosing.",
  },
  {
    question: "Is oral Semaglutide the same molecule as injectable Semaglutide?",
    answer:
      "Yes. The active molecule in Rybelsus (oral) is identical to the active molecule in Ozempic and Wegovy (subcutaneous). The difference is formulation: oral Semaglutide is co-formulated with the absorption enhancer SNAC, which transiently raises local pH in the stomach and enables absorption of a small fraction of the dose.",
  },
  {
    question: "What is SNAC and why is it used?",
    answer:
      "SNAC (sodium N-[8-(2-hydroxybenzoyl)amino]caprylate) is a small-molecule absorption enhancer used in oral Semaglutide. It transiently buffers local pH in the stomach, protecting the peptide from pepsin and increasing membrane permeability enough to allow absorption of a small but pharmacologically sufficient fraction of the dose.",
  },
  {
    question: "Does Semaglutide activate the GIP or glucagon receptors?",
    answer:
      "No, not at pharmacologically meaningful concentrations. Semaglutide is a selective GLP-1R agonist. Dual (GLP-1R + GIPR) and triple (GLP-1R + GIPR + GCGR) agonism are features of separate compounds such as Tirzepatide and Retatrutide.",
  },
  {
    question: "What is biased agonism at GLP-1R?",
    answer:
      "Biased agonism describes ligands that preferentially engage one branch of a receptor's signalling output — for example G-protein vs β-arrestin. GLP-1R exhibits both G-protein and arrestin signalling, and the therapeutic implications of ligand bias at this receptor are an active research area.",
  },
  {
    question: "How should Semaglutide be reconstituted for laboratory research?",
    answer:
      "Reconstitute lyophilised Semaglutide by adding sterile or bacteriostatic water slowly against the vial wall, swirl gently — do not vortex — and allow complete dissolution. Aliquot into low-binding vials. See the Laboratory Reconstitution Guide for a full aseptic procedure.",
  },
  {
    question: "How stable is reconstituted Semaglutide?",
    answer:
      "Reconstituted Semaglutide is generally used within days at 2–8 °C and stored longer-term as single-use aliquots at −20 °C. Freeze-thaw cycles should be minimised. Documented storage in low-binding vials protects against surface loss driven by the acylated side chain.",
  },
  {
    question: "What analytical methods confirm Semaglutide identity?",
    answer:
      "Reversed-phase HPLC at 214 nm is the standard purity method (target ≥ 98% area). LC-MS confirms identity against the theoretical mass (≈ 4113.58 g/mol average). SEC-HPLC is useful for monitoring aggregation of the acylated peptide.",
  },
  {
    question: "What preclinical models are used for Semaglutide research?",
    answer:
      "Common models include cell-based cAMP and β-arrestin assays on GLP-1R-expressing cell lines, isolated pancreatic islet insulin-secretion studies, rodent diet-induced obesity models and central neuroanatomical studies mapping distributed brainstem and hypothalamic engagement.",
  },
  {
    question: "What was the SELECT trial?",
    answer:
      "SELECT was a randomised placebo-controlled cardiovascular outcomes trial of subcutaneous Semaglutide in adults with overweight or obesity and pre-existing cardiovascular disease but without diabetes (Lincoff et al., 2023). It reported a significant reduction in major adverse cardiovascular events (MACE) versus placebo.",
  },
  {
    question: "What was the STEP program?",
    answer:
      "STEP is a family of randomised trials evaluating subcutaneous Semaglutide (2.4 mg once weekly) for weight management. STEP-1 (Wilding et al., 2021) reported substantial mean weight reduction versus placebo in adults with overweight or obesity.",
  },
  {
    question: "Why do GLP-1 agonists reduce appetite?",
    answer:
      "GLP-1 receptors are expressed on vagal afferents and multiple central nervous system populations relevant to appetite regulation, including brainstem NTS and hypothalamic POMC and NPY neurons. GLP-1R agonism engages these circuits, and rodent work with Semaglutide demonstrates distributed neural engagement consistent with reduced food intake.",
  },
  {
    question: "What are the known limitations of Semaglutide preclinical evidence?",
    answer:
      "In-vitro potency for acylated GLP-1 analogues is sensitive to buffer albumin and plasticware. Central mechanism data derive mainly from rodent models. Long-term (>5 year) real-world data continue to accumulate, and off-label investigational uses rest on smaller data sets than metabolic and cardiovascular endpoints.",
  },
  {
    question: "Is Semaglutide safe for human use?",
    answer:
      "Approved Semaglutide medicines (Ozempic, Wegovy, Rybelsus) are regulated by the MHRA in the United Kingdom and are prescribed by qualified clinicians who assess indication, contraindication and risk. Oxford Research Peptides does not supply approved medicines and Semaglutide reference standards from Oxford Research Peptides are intended solely for in-vitro laboratory research.",
  },
];

const semaglutideFaqGuide: GuideContent = {
  slug: "semaglutide-faq",
  title: "Semaglutide FAQ",
  description:
    "Comprehensive research-focused FAQ on Semaglutide — identity, receptor pharmacology, structural modifications, pharmacokinetics, laboratory handling, evidence base and regulatory status.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-09-02",
  dateModified: "2026-09-02",
  faqs: semaglutideFaqEntries,
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">FREQUENTLY ASKED</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Semaglutide FAQ</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A comprehensive research-focused reference of frequently asked
          questions about Semaglutide, covering identity, receptor
          pharmacology, pharmacokinetics, laboratory handling and
          evidence.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide is a synthetic long-acting agonist of the GLP-1
        receptor, derived from native GLP-1(7-37) with Aib8, Arg34 and
        lysine-26 C18 fatty-di-acid modifications. It has a plasma
        half-life of approximately one week in humans, supports
        once-weekly subcutaneous or once-daily oral dosing, and is
        evaluated in extensive metabolic, cardiovascular and renal
        outcome trials. Oxford Research Peptides supplies it as an
        in-vitro reference standard only.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Semaglutide" },
          { label: "Class", value: "Long-acting GLP-1 receptor agonist" },
          { label: "Half-life", value: "≈ 1 week (human, SC)" },
          { label: "Use", value: "In-vitro reference standard" },
        ]}
      />
    ),
    mainContent: (
      <div className="space-y-6">
        {semaglutideFaqEntries.map((item, i) => (
          <section
            key={item.question}
            aria-labelledby={`sema-faq-${i}`}
            className="border-l-2 border-gold/60 pl-4"
          >
            <h2
              id={`sema-faq-${i}`}
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
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/what-is-semaglutide">What is Semaglutide?</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-mechanism-of-action">Mechanism of Action</a>{" "}
            guide,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>{" "}
            and the{" "}
            <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>. Related glossary anchors:{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/glp-1">GLP-1</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/incretin">incretin</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/incretin-effect">incretin effect</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/biased-agonism">biased agonism</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/beta-arrestin">β-arrestin</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/acylation">acylation</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/albumin-binding">albumin binding</a>.
          </p>
        </div>
      </div>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Answers summarise the published Semaglutide literature, including landmark outcome trials and widely accepted laboratory practice for acylated GLP-1 analogues."
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-09-02",
    lastUpdated: "2026-09-02",
  }),
};

// ---------------------------------------------------------------------------
// Authority Sprint 2C — Semaglutide depth guides
// ---------------------------------------------------------------------------

const sprint2cRevisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-10-01",
    summary:
      "Authority Sprint 2C — depth publication: pharmacokinetics, research applications, albumin binding and incretin effect.",
    author: "Editorial Team",
  },
];

const commonRelatedLinks = (
  <p className="text-sm text-navy-deep/80">
    Related reading:{" "}
    <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/what-is-semaglutide">What is Semaglutide</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-mechanism-of-action">Semaglutide mechanism of action</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
    <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
    <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>{" "}
    and{" "}
    <a className="underline underline-offset-2" href="/testing-and-quality-control">Testing &amp; Quality Control</a>.
  </p>
);

// -- Guide 1: Semaglutide Pharmacokinetics -----------------------------------

const semaglutidePK: GuideContent = {
  slug: "semaglutide-pharmacokinetics",
  title: "Semaglutide Pharmacokinetics",
  description:
    "Reported pharmacokinetics of Semaglutide — half-life, albumin binding, C18 di-acid acylation, absorption (SC vs oral), distribution, steady state and research limitations.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-10-01",
  dateModified: "2026-10-01",
  faqs: [
    {
      question: "What is the half-life of Semaglutide in humans?",
      answer:
        "Semaglutide has a reported plasma half-life of approximately one week in humans, supporting once-weekly subcutaneous dosing regimens.",
    },
    {
      question: "How is oral Semaglutide absorbed?",
      answer:
        "Oral Semaglutide is co-formulated with SNAC (sodium N-[8-(2-hydroxybenzoyl)amino]caprylate), an absorption enhancer that transiently buffers local pH in the stomach and enables absorption of a small but pharmacologically sufficient fraction of the dose.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Semaglutide Pharmacokinetics</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          How Semaglutide's structural modifications translate into its reported
          absorption, distribution and elimination kinetics — with a clear
          separation between well-documented human pharmacology and topics that
          remain research questions.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide combines resistance to DPP-4 cleavage (via Aib8) with
        reversible non-covalent binding to serum albumin (via a C18 fatty-di-acid
        attached at Lys26). Together these features yield a plasma half-life of
        approximately one week in humans, supporting once-weekly subcutaneous
        dosing. An oral formulation co-administered with the absorption enhancer
        SNAC enables once-daily oral dosing of the same active molecule.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Plasma half-life (SC, human)", value: "≈ 1 week" },
          { label: "Route (SC)", value: "Once-weekly subcutaneous" },
          { label: "Route (oral)", value: "Once-daily oral (with SNAC)" },
          { label: "Time to steady state", value: "≈ 4–5 weeks (SC)" },
          { label: "Protein binding", value: "> 99% (predominantly albumin)" },
          { label: "Elimination", value: "Proteolysis; renal and faecal excretion of metabolites" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Structural basis for the long half-life</h2>
        <P>
          Two engineered features of Semaglutide dominate its pharmacokinetic
          profile. First, α-aminoisobutyric acid at position 8 (Aib8) renders
          the peptide resistant to dipeptidyl peptidase-4 (DPP-4), the
          serine protease that cleaves native GLP-1 between His7 and Ala8
          within one to two minutes.<Cite refId="lau-2015" /> Second, a C18
          fatty-di-acid attached at Lys26 through a γGlu-2xOEG spacer
          supports reversible non-covalent binding to serum albumin at fatty
          acid binding sites.<Cite refId="knudsen-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Albumin binding and distribution</h2>
        <P>
          Albumin binding of Semaglutide is high — greater than 99% in
          reported plasma. Albumin acts as a slow-release reservoir: only
          the small unbound fraction is pharmacologically active at the
          GLP-1 receptor, but the bound fraction is protected from renal
          filtration and from most proteolytic clearance pathways. This
          reservoir behaviour is the primary determinant of the extended
          half-life.<Cite refId="knudsen-2019" /> Distribution is largely
          confined to the vascular and interstitial compartments consistent
          with an albumin-bound peptide.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Subcutaneous absorption</h2>
        <P>
          After subcutaneous administration, Semaglutide is absorbed slowly
          from the injection depot. Peak plasma concentrations are reached
          over one to three days, with high bioavailability. Because the
          plasma half-life is close to one week, once-weekly dosing produces
          approximately three- to five-fold accumulation before steady
          state, which is reached over roughly four to five weeks of
          consistent weekly dosing.<Cite refId="knudsen-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Oral absorption and SNAC</h2>
        <P>
          Oral Semaglutide (marketed as Rybelsus) is co-formulated with
          SNAC — sodium N-[8-(2-hydroxybenzoyl)amino]caprylate. SNAC
          transiently raises local pH in the stomach, reducing peptic
          degradation, and interacts with the gastric epithelium in a way
          that supports transcellular absorption of a small fraction of the
          dose.<Cite refId="buckley-2018" /> Oral bioavailability is low
          (approximately 1%), which is why oral doses are numerically much
          larger than subcutaneous doses; the resulting plasma
          concentrations are pharmacologically comparable.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Elimination</h2>
        <P>
          Semaglutide is cleared primarily through proteolytic degradation
          of both the peptide backbone and the fatty-acid side chain, with
          metabolites excreted via urine and faeces. Renal impairment does
          not markedly alter total exposure in reported studies, consistent
          with proteolysis rather than renal filtration being the dominant
          clearance mechanism.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Research use vs approved therapeutic context</h2>
        <P>
          The pharmacokinetics summarised here derive from published human
          and preclinical studies of Semaglutide administered as an
          approved therapeutic (Ozempic, Wegovy, Rybelsus) under MHRA and
          FDA authorisation. Oxford Research Peptides supplies Semaglutide
          as a reference standard for in-vitro laboratory research only —
          in-vivo pharmacokinetic parameters are contextual scientific
          information and do not describe or endorse any human use of
          research-grade material.
        </P>

        <LaboratoryNote title="In-vitro relevance">
          Albumin binding is a critical variable in cell-based assays of
          Semaglutide. Apparent EC<sub>50</sub> values shift substantially
          with buffer albumin content and with plasticware surface area
          because acylated GLP-1 analogues are surface-active. Report
          buffer composition, incubation volume and container type
          explicitly to enable cross-laboratory comparison.
        </LaboratoryNote>

        <ImportantNote title="Research-use framing">
          This guide describes published pharmacology. It is not clinical
          guidance and is not intended for any therapeutic decision. See{" "}
          <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>.
        </ImportantNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Subcutaneous and oral pharmacokinetics of Semaglutide are well characterised in the peer-reviewed literature. Structural determinants (Aib8, C18 di-acid acylation, γGlu-2xOEG spacer) map cleanly onto the observed half-life and distribution behaviour."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "Precise partitioning between renal, hepatic and peripheral proteolysis is not fully quantified.",
          "Oral bioavailability is low and sensitive to gastric conditions, timing relative to food, and co-administered fluids.",
          "In-vitro potency of acylated GLP-1 analogues is highly sensitive to buffer albumin content and plasticware, limiting simple comparison across laboratories.",
          "Human pharmacokinetic parameters cannot be extrapolated to research-use scenarios outside their approved therapeutic context.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={sprint2cRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-01",
    lastUpdated: "2026-10-01",
  }),
};

// -- Guide 2: Semaglutide Research Applications ------------------------------

const semaglutideResearchApplications: GuideContent = {
  slug: "semaglutide-research-applications",
  title: "Semaglutide Research Applications",
  description:
    "Overview of published Semaglutide research contexts — metabolic, cardiovascular, renal, neuroinflammation/CNS and NAFLD/MASH — with a clear preclinical vs human evidence split.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-10-01",
  dateModified: "2026-10-01",
  faqs: [
    {
      question: "In which research areas has Semaglutide been studied?",
      answer:
        "Published Semaglutide research spans metabolic (type 2 diabetes, obesity), cardiovascular (SUSTAIN-6, SELECT), renal (FLOW), CNS/neuroinflammation (preclinical) and hepatic (NAFLD/MASH) contexts, with the strongest evidence in metabolic and cardiovascular endpoints.",
    },
    {
      question: "Is Semaglutide human evidence or preclinical evidence?",
      answer:
        "Both. Metabolic, cardiovascular and renal endpoints have large randomised human trials. Neuroinflammation and central-nervous-system applications are currently preclinical or early-phase.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Semaglutide Research Applications</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A map of the published research landscape for Semaglutide — where
          the human evidence is strongest, where preclinical work leads the
          field, and how these areas connect to the wider incretin literature.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide has been evaluated across metabolic (type 2 diabetes,
        obesity), cardiovascular (SUSTAIN-6, SELECT), renal (FLOW),
        hepatic (NAFLD/MASH) and central-nervous-system research contexts.
        The metabolic, cardiovascular and renal literature comprises large
        randomised human outcome trials; NAFLD/MASH evidence combines
        randomised imaging and biopsy studies with mechanistic preclinical
        work; CNS applications remain predominantly preclinical.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Metabolic (human)", value: "SUSTAIN-6, STEP-1, PIONEER 6" },
          { label: "Cardiovascular (human)", value: "SUSTAIN-6, SELECT" },
          { label: "Renal (human)", value: "FLOW" },
          { label: "Hepatic (human)", value: "MASH imaging and biopsy studies" },
          { label: "CNS (preclinical)", value: "Rodent neural circuit mapping" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Metabolic research</h2>
        <P>
          Metabolic endpoints form the core Semaglutide evidence base.
          SUSTAIN-6 evaluated cardiovascular outcomes and glycaemic control
          in patients with type 2 diabetes at high cardiovascular
          risk.<Cite refId="marso-2016" /> STEP-1 examined weight change in
          adults with overweight or obesity without diabetes.<Cite refId="wilding-2021" />
          PIONEER 6 evaluated the oral formulation in type 2 diabetes with
          cardiovascular risk.<Cite refId="husain-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Cardiovascular research</h2>
        <P>
          SELECT reported cardiovascular outcomes with Semaglutide in
          adults with overweight or obesity <em>without</em> diabetes and
          with established cardiovascular disease — the first large trial
          demonstrating cardiovascular benefit of a GLP-1 receptor agonist
          in this specific population.<Cite refId="lincoff-2023" /> Together
          with SUSTAIN-6, it forms a substantial cardiovascular evidence
          base for the GLP-1 mono-agonist class.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Renal research</h2>
        <P>
          The FLOW trial reported effects of Semaglutide on kidney disease
          progression and cardiovascular events in adults with type 2
          diabetes and chronic kidney disease.<Cite refId="perkovic-2024" />
          This is a landmark renal outcomes trial for a GLP-1 receptor
          agonist and complements existing SGLT2-inhibitor renal evidence
          rather than replacing it.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Hepatic research (NAFLD / MASH)</h2>
        <P>
          Semaglutide has been evaluated in imaging and biopsy studies for
          non-alcoholic fatty liver disease and metabolic-dysfunction-
          associated steatohepatitis (MASH). Reported outcomes include
          improvements in histological features of steatohepatitis; effects
          on advanced fibrosis remain an active research question in the
          peer-reviewed literature.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Neuroinflammation and CNS research</h2>
        <P>
          Preclinical rodent work by Gabery and colleagues mapped
          Semaglutide's central activity to distributed neural circuits
          including brainstem and hypothalamic populations relevant to
          appetite regulation.<Cite refId="gabery-2020" /> Broader CNS
          applications — including neuroinflammation and neurodegeneration
          — remain predominantly preclinical or early clinical, and
          extrapolation to research contexts requires caution.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Preclinical vs human evidence — a clear split</h2>
        <UL>
          <li><strong>Strong human evidence:</strong> glycaemic control, weight change, cardiovascular outcomes, renal outcomes.</li>
          <li><strong>Mixed / emerging human evidence:</strong> MASH histology, sleep-disordered breathing, addiction-adjacent behaviours.</li>
          <li><strong>Primarily preclinical:</strong> central neuroinflammation, neurodegeneration models, direct anti-fibrotic mechanisms.</li>
        </UL>

        <ImportantNote title="Research-use framing">
          This overview describes the published research landscape.
          Oxford Research Peptides supplies Semaglutide as a lyophilised
          reference standard for in-vitro laboratory research only. Nothing
          on this page is medical advice or an endorsement of a therapeutic
          use.
        </ImportantNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Metabolic, cardiovascular and renal endpoints are supported by large randomised outcome trials. Hepatic and CNS applications rely more heavily on preclinical or early clinical evidence."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "Cardiovascular and renal outcome trials enrolled specific high-risk populations; generalisation to broader populations is limited.",
          "Central-nervous-system claims currently rest largely on rodent models and small human studies.",
          "MASH endpoints depend on histological interpretation, which carries measurement variability.",
          "Approved-therapeutic outcome data do not describe or endorse research-use handling of reference-standard material.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={sprint2cRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-01",
    lastUpdated: "2026-10-01",
  }),
};

// -- Guide 3: Albumin Binding and Half-Life Extension ------------------------

const albuminBindingGuide: GuideContent = {
  slug: "albumin-binding-half-life-extension",
  title: "Albumin Binding and Half-Life Extension",
  description:
    "How fatty-acid acylation of peptide drugs supports reversible non-covalent binding to serum albumin, and how that mechanism underpins the once-weekly kinetics of long-acting GLP-1 receptor agonists.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-10-01",
  dateModified: "2026-10-01",
  faqs: [
    {
      question: "Why do peptides bind albumin when they carry a fatty-acid side chain?",
      answer:
        "Serum albumin has multiple hydrophobic binding sites that evolved to transport long-chain fatty acids. A fatty-acid moiety attached to a peptide occupies these sites reversibly, producing high-affinity but non-covalent binding that behaves as a slow-release reservoir.",
    },
    {
      question: "Does albumin binding change the receptor pharmacology?",
      answer:
        "Not fundamentally. The unbound fraction retains normal receptor pharmacology. Albumin binding primarily changes distribution and clearance rather than intrinsic receptor activity.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Albumin Binding and Half-Life Extension</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A reusable explanation of how fatty-acid acylation of peptide
          drugs produces reversible non-covalent binding to serum albumin,
          and how that mechanism underpins the long duration of action of
          Semaglutide, Liraglutide and related GLP-1 receptor agonists.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Attaching a fatty-acid moiety to a peptide backbone exploits the
        native fatty-acid transport role of serum albumin. The resulting
        reversible non-covalent binding shields the peptide from renal
        filtration and proteolysis, effectively lengthening its plasma
        residence without changing its receptor pharmacology at the free
        (unbound) fraction. This mechanism underpins the once-weekly
        kinetics of Semaglutide and the once-daily kinetics of Liraglutide.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Mechanism", value: "Reversible non-covalent binding to serum albumin" },
          { label: "Structural element", value: "Fatty-acid side chain (mono-acid or di-acid) via a linker" },
          { label: "Example — Liraglutide", value: "C16 mono-acid → half-life ≈ 13 h" },
          { label: "Example — Semaglutide", value: "C18 di-acid + γGlu-2xOEG → half-life ≈ 1 week" },
          { label: "Effect", value: "Extends plasma half-life; largely preserves receptor pharmacology" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Why albumin?</h2>
        <P>
          Human serum albumin is the most abundant plasma protein and
          carries endogenous long-chain fatty acids between tissues. It
          has multiple well-characterised hydrophobic binding sites that
          bind saturated and unsaturated fatty acids with dissociation
          constants in the low-micromolar range. A peptide functionalised
          with a fatty-acid moiety can occupy these sites and inherit the
          slow turnover of the endogenous fatty-acid pool.<Cite refId="knudsen-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Reversible, non-covalent, saturable</h2>
        <P>
          Albumin binding here is reversible and non-covalent. The
          equilibrium continuously releases small amounts of free peptide,
          which is the fraction available to engage the receptor and to be
          cleared. Because most of the peptide is albumin-bound at any
          moment, renal filtration and proteolytic clearance are
          dramatically reduced compared with the native peptide.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Chemistry — mono-acid vs di-acid</h2>
        <UL>
          <li>
            <strong>Liraglutide</strong> uses a C16 mono-acid attached at Lys26 via a γGlu linker. The resulting albumin affinity supports a plasma half-life of approximately 13 hours in humans — long enough for once-daily dosing.
          </li>
          <li>
            <strong>Semaglutide</strong> uses a C18 fatty-di-acid attached at Lys26 through a longer γGlu-2xOEG linker. The di-acid geometry and longer spacer support tighter, more sustained albumin binding, yielding a plasma half-life of approximately one week and once-weekly dosing.<Cite refId="lau-2015" /><Cite refId="knudsen-2019" />
          </li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why DPP-4 resistance also matters</h2>
        <P>
          Albumin binding alone would not be sufficient if the small free
          fraction were still rapidly degraded by DPP-4. Long-acting
          GLP-1 analogues therefore combine albumin binding with a
          DPP-4-resistant substitution (Aib8 or an equivalent
          modification), so that both distribution and enzymatic clearance
          are addressed simultaneously.<Cite refId="lau-2015" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Assay implications</h2>
        <P>
          In cell-based assays, apparent potency of albumin-binding
          peptides depends strongly on the albumin concentration in the
          buffer. Reported EC<sub>50</sub> values in high-albumin media can
          be an order of magnitude higher than in albumin-free media
          because a large fraction of nominal ligand is sequestered.
          Comparability between laboratories requires reporting buffer
          composition, plasticware and incubation geometry.
        </P>

        <LaboratoryNote title="In-vitro practical note">
          For research assays involving Semaglutide, Liraglutide or other
          acylated GLP-1 analogues, document the bovine serum albumin (BSA)
          concentration and consider control experiments at two BSA
          concentrations to quantify the reservoir effect.
        </LaboratoryNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Fatty-acid acylation as a half-life extension strategy is well established across multiple peptide drugs. Structural chemistry and reported human pharmacokinetics agree closely for Liraglutide and Semaglutide."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "Quantitative albumin binding parameters vary by measurement method (equilibrium dialysis vs ultrafiltration vs surface plasmon resonance).",
          "Interspecies differences in albumin fatty-acid binding site occupancy limit direct rodent-to-human extrapolation.",
          "The precise contribution of albumin binding vs FcRn-mediated recycling to plasma persistence is compound-specific.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={sprint2cRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-01",
    lastUpdated: "2026-10-01",
  }),
};

// -- Guide 4: Incretin Effect Explained --------------------------------------

const incretinEffectGuide: GuideContent = {
  slug: "incretin-effect-explained",
  title: "Incretin Effect Explained",
  description:
    "Foundation guide to the incretin effect — how GLP-1 and GIP amplify glucose-dependent insulin secretion, the physiology of gut L- and K-cells, and how incretin biology underpins GLP-1 receptor agonist research.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-10-01",
  dateModified: "2026-10-01",
  faqs: [
    {
      question: "What is the incretin effect?",
      answer:
        "The incretin effect describes the greater insulin response to oral glucose compared with an equivalent intravenous glucose challenge. It is mediated primarily by two gut peptides, GLP-1 and GIP, released after nutrient intake.",
    },
    {
      question: "Why is the incretin effect important for GLP-1 receptor agonists?",
      answer:
        "GLP-1 receptor agonists such as Semaglutide are engineered to mimic and prolong incretin signalling. Understanding the endogenous incretin effect is foundational to interpreting their pharmacology.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">The Incretin Effect Explained</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A foundation guide to incretin biology — the physiological basis
          on which GLP-1 receptor agonist and dual/triple agonist research
          is built.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        The incretin effect describes the observation that oral glucose
        provokes a substantially larger insulin response than an equivalent
        intravenous glucose challenge. Two gut-derived peptides mediate
        this effect: glucagon-like peptide-1 (GLP-1), released from
        intestinal L-cells, and glucose-dependent insulinotropic
        polypeptide (GIP), released from K-cells. Both amplify
        glucose-dependent insulin secretion from pancreatic β-cells and
        together account for a large fraction of postprandial insulin
        release in healthy individuals.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Incretin peptides", value: "GLP-1 and GIP" },
          { label: "GLP-1 source", value: "Intestinal L-cells (distal small intestine and colon)" },
          { label: "GIP source", value: "Intestinal K-cells (proximal small intestine)" },
          { label: "Primary effect", value: "Glucose-dependent amplification of insulin secretion" },
          { label: "Native GLP-1 half-life", value: "≈ 1–2 minutes (DPP-4 cleavage)" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Historical observation</h2>
        <P>
          Classical experiments showed that a defined oral glucose load
          triggered substantially more insulin secretion than the same
          amount of glucose delivered intravenously to produce comparable
          plasma glucose levels. The difference — attributed to
          gut-derived signals released during nutrient absorption — was
          named the <em>incretin effect</em>.<Cite refId="baggio-2007" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">The two incretin hormones</h2>
        <UL>
          <li>
            <strong>GLP-1 (glucagon-like peptide-1)</strong> — a 30- or 31-residue peptide cleaved from proglucagon in intestinal L-cells and released in response to carbohydrate and lipid absorption.
          </li>
          <li>
            <strong>GIP (glucose-dependent insulinotropic polypeptide)</strong> — a 42-residue peptide released from intestinal K-cells in response predominantly to carbohydrate and lipid ingestion.
          </li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Effects on pancreatic islets</h2>
        <P>
          Both incretins act at class B G-protein-coupled receptors on
          pancreatic β-cells to amplify glucose-dependent insulin
          secretion. GLP-1 additionally suppresses glucagon secretion from
          α-cells in a glucose-dependent manner. The strict
          glucose-dependence of these effects is central to the low
          intrinsic hypoglycaemia risk of GLP-1-based
          pharmacology.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Extra-pancreatic effects of GLP-1</h2>
        <P>
          GLP-1 signalling is not confined to the islet. GLP-1 receptors
          are expressed in gastrointestinal smooth muscle (slowing gastric
          emptying), in vagal afferents and in the central nervous
          system, where distributed brainstem and hypothalamic populations
          integrate satiety signals.<Cite refId="baggio-2007" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why native incretins are short-lived</h2>
        <P>
          Both GLP-1 and GIP are cleaved rapidly by dipeptidyl peptidase-4
          (DPP-4). Native GLP-1 has a plasma half-life of only one to two
          minutes. Long-acting GLP-1 receptor agonists such as Semaglutide
          overcome this by combining a DPP-4-resistant substitution with a
          fatty-acid side chain that supports albumin
          binding.<Cite refId="lau-2015" /><Cite refId="knudsen-2019" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why the incretin effect matters for research</h2>
        <P>
          Every GLP-1 receptor agonist, GLP-1/GIP dual agonist and GLP-1/
          GIP/glucagon triple agonist is designed against a specific view
          of incretin biology. Interpreting in-vitro assay data, receptor
          pharmacology and pathway readouts for these compounds requires
          the incretin framework as background.
        </P>

        <ImportantNote title="Research-use framing">
          This is a foundation science primer. It is not clinical guidance
          on diabetes or metabolic disease. See{" "}
          <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>.
        </ImportantNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="The incretin effect and the roles of GLP-1 and GIP are supported by decades of peer-reviewed physiology and pharmacology literature."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "The relative contribution of GLP-1 vs GIP to the postprandial incretin effect varies between individuals and physiological states.",
          "Extrapolation from healthy human physiology to disease states (e.g. type 2 diabetes, obesity) is not always direct.",
          "Peripheral vs central effects of GLP-1 signalling in vivo cannot be fully separated in most experimental designs.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={sprint2cRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-01",
    lastUpdated: "2026-10-01",
  }),
};

// ---------------------------------------------------------------------------
// Registries
// ---------------------------------------------------------------------------

export const semaglutideGuideRegistry: readonly GuideContent[] = [
  whatIsSemaglutide,
  semaglutideMoA,
  semaglutideFaqGuide,
  semaglutidePK,
  semaglutideResearchApplications,
  albuminBindingGuide,
  incretinEffectGuide,
];

export const semaglutideCompoundRegistry: Record<
  string,
  {
    build: () => CompoundLayoutProps;
    faqs: { question: string; answer: string }[];
    meta: typeof SEMAGLUTIDE_META;
  }
> = {
  semaglutide: {
    build: semaglutideMonograph,
    faqs: semaglutideFaqs,
    meta: SEMAGLUTIDE_META,
  },
};

export { semaglutideFaqs };
