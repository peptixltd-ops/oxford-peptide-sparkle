/**
 * Release 4.0 — Retatrutide Authority Cluster
 *
 * The first fully populated compound-authority content cluster. Every
 * entry consumes the existing Editorial, Publishing, Knowledge Graph and
 * Taxonomy systems — nothing here duplicates infrastructure.
 *
 * Content is educational, neutral, and evidence-based. All claims are
 * traceable to the citations registered below.
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
  Callout,
  LaboratoryNote,
  ImportantNote,
  MethodologyTip,
  Definition,
  ComparisonTable,
  ScientificDisclaimer,
} from "@/components/publishing";
import type { Reference } from "@/components/publishing/types";
import type { CompoundLayoutProps } from "@/components/knowledge/compound-layout";
import type { GuideLayoutProps } from "@/components/knowledge/guide-layout";
import { RelatedGuides } from "@/components/knowledge/related-guides";
import { RelatedMechanisms } from "@/components/knowledge/related-mechanisms";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";

// ---------------------------------------------------------------------------
// Shared citation registry for the cluster
// ---------------------------------------------------------------------------

export const retatrutideReferences: Reference[] = [
  {
    id: "coskun-2022",
    authors: ["Coskun T", "Urva S", "Roell WC", "et al."],
    year: 2022,
    title:
      "LY3437943, a novel triple glucagon, GIP, and GLP-1 receptor agonist for glycemic control and weight loss: From discovery to clinical proof of concept.",
    journal: "Cell Metabolism",
    volume: "34",
    issue: "9",
    pages: "1234-1247",
    doi: "10.1016/j.cmet.2022.07.013",
    pmid: "35985340",
  },
  {
    id: "jastreboff-2023",
    authors: ["Jastreboff AM", "Kaplan LM", "Frías JP", "et al."],
    year: 2023,
    title:
      "Triple-hormone-receptor agonist retatrutide for obesity — a phase 2 trial.",
    journal: "New England Journal of Medicine",
    volume: "389",
    issue: "6",
    pages: "514-526",
    doi: "10.1056/NEJMoa2301972",
    pmid: "37366315",
  },
  {
    id: "rosenstock-2023",
    authors: ["Rosenstock J", "Frias J", "Jastreboff AM", "et al."],
    year: 2023,
    title:
      "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo and active-controlled, parallel-group, phase 2 trial.",
    journal: "The Lancet",
    volume: "402",
    issue: "10401",
    pages: "529-544",
    doi: "10.1016/S0140-6736(23)01053-X",
    pmid: "37385275",
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
    id: "drucker-2018",
    authors: ["Drucker DJ"],
    year: 2018,
    title: "Mechanisms of action and therapeutic application of glucagon-like peptide-1.",
    journal: "Cell Metabolism",
    volume: "27",
    issue: "4",
    pages: "740-756",
    doi: "10.1016/j.cmet.2018.03.001",
    pmid: "29617641",
  },
  {
    id: "graaf-2016",
    authors: ["de Graaf C", "Donnelly D", "Wootten D", "et al."],
    year: 2016,
    title:
      "Glucagon-like peptide-1 and its class B G protein–coupled receptors: a long march to therapeutic successes.",
    journal: "Pharmacological Reviews",
    volume: "68",
    issue: "4",
    pages: "954-1013",
    doi: "10.1124/pr.115.011395",
    pmid: "27736833",
  },
];

// ---------------------------------------------------------------------------
// Shared editorial revisions for the cluster
// ---------------------------------------------------------------------------

const clusterRevisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-07-15",
    summary: "Initial publication as part of the Retatrutide authority cluster (Release 4.0).",
    author: "Editorial Team",
  },
];

// ---------------------------------------------------------------------------
// Small typographic helpers
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
    <ReferenceProvider references={retatrutideReferences}>
      {node}
      <div className="mt-6">
        <ReferenceList references={retatrutideReferences} />
      </div>
    </ReferenceProvider>
  );
}

// ---------------------------------------------------------------------------
// Retatrutide compound monograph
// ---------------------------------------------------------------------------

export const RETATRUTIDE_META = {
  slug: "retatrutide",
  title: "Retatrutide (LY3437943)",
  shortDescription:
    "Retatrutide (LY3437943) is an investigational triple-agonist peptide that engages the GLP-1, GIP and glucagon receptors, studied in phase 2 clinical trials for obesity and type 2 diabetes.",
  aliases: ["LY3437943"],
  molecularFormula: "C226H344N50O68",
  molecularWeight: "4731.4",
  cas: "2381089-83-2",
  path: "/compounds/retatrutide",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
} as const;

const retatrutideFaqs: { question: string; answer: string }[] = [
  {
    question: "What is Retatrutide?",
    answer:
      "Retatrutide (LY3437943) is an investigational triple-agonist peptide engineered to act at three incretin-family receptors — GLP-1, GIP and glucagon. It is supplied by Oxford Research Peptides strictly as a reference standard for in-vitro laboratory research.",
  },
  {
    question: "Which receptors does Retatrutide bind?",
    answer:
      "Published pharmacology characterises Retatrutide as an agonist at the GLP-1 receptor (GLP-1R), the GIP receptor (GIPR) and the glucagon receptor (GCGR), with reported balanced activity across the three targets.",
  },
  {
    question: "What is the molecular formula of Retatrutide?",
    answer:
      "The published molecular formula for Retatrutide (LY3437943) is C226H344N50O68 with a reported molecular weight of approximately 4731 g/mol.",
  },
  {
    question: "How should Retatrutide reference material be stored?",
    answer:
      "Lyophilised Retatrutide should be stored at −20 °C, protected from light and moisture. After reconstitution in a suitable diluent, aliquots should be stored at 2–8 °C for short-term work or at −20 °C for longer periods, with freeze-thaw cycles minimised.",
  },
];

export function retatrutideMonograph(): CompoundLayoutProps {
  const overview = (
    <Prose>
      <P>
        Retatrutide, developmental code <strong>LY3437943</strong>, is an
        investigational synthetic peptide described in the peer-reviewed
        literature as a single-molecule agonist of three incretin-family
        receptors: the glucagon-like peptide-1 receptor (GLP-1R), the
        glucose-dependent insulinotropic polypeptide receptor (GIPR) and the
        glucagon receptor (GCGR).<Cite refId="coskun-2022" />
      </P>
      <P>
        Published phase 2 clinical trials have evaluated Retatrutide for weight
        management in adults with obesity<Cite refId="jastreboff-2023" /> and
        for glycaemic control in type 2 diabetes.<Cite refId="rosenstock-2023" />
        {" "}This monograph summarises the published identity, mechanism and
        research context of the peptide as reported in the primary literature.
      </P>
      <p className="text-xs italic text-muted-foreground">
        Oxford Research Peptides supplies Retatrutide strictly as a reference
        standard for in-vitro laboratory research. Nothing on this page
        constitutes medical advice or endorses any therapeutic use.
      </p>
    </Prose>
  );

  const identityBlock = (
    <Prose>
      <P>
        Retatrutide is a 39-residue synthetic peptide with a fatty-acid
        modification designed to extend plasma half-life through albumin
        binding, an approach shared with several long-acting incretin analogues
        in the same pharmacological class.<Cite refId="coskun-2022" />
      </P>
      <KeyFacts
        title="At a glance"
        items={[
          { label: "Class", value: "Triple-agonist incretin peptide" },
          { label: "Developmental code", value: "LY3437943" },
          { label: "Targets", value: "GLP-1R · GIPR · GCGR" },
          { label: "Format", value: "Lyophilised powder" },
          { label: "Purity target", value: "≥ 99% (HPLC)" },
          { label: "Storage", value: "−20 °C, desiccated" },
        ]}
      />
    </Prose>
  );

  const synonyms = (
    <UL>
      <li><strong>LY3437943</strong> — Eli Lilly developmental code.</li>
      <li><strong>Retatrutide</strong> — non-proprietary name.</li>
      <li><strong>Triple GLP-1/GIP/glucagon receptor agonist</strong> — descriptive class name used in the literature.</li>
    </UL>
  );

  const classification = (
    <UL>
      <li><strong>Family:</strong> Incretin mimetics.</li>
      <li><strong>Sub-class:</strong> Triple GLP-1R / GIPR / GCGR agonists.</li>
      <li><strong>Structural type:</strong> Modified linear peptide with fatty-acid tail.</li>
      <li><strong>Research area:</strong> Receptor pharmacology, metabolic signalling.</li>
    </UL>
  );

  const mechanism = (
    <Prose>
      <P>
        Retatrutide's defining pharmacological feature is co-activation of three
        related class B G-protein-coupled receptors from a single molecule.
        Each of the three targets is a component of the incretin / glucagon
        axis and, when activated, engages Gαs-coupled adenylate cyclase and
        elevates intracellular cyclic AMP.<Cite refId="baggio-2007" /><Cite refId="drucker-2018" />
      </P>
      <P>
        In published discovery pharmacology, the compound is characterised as
        producing balanced potency across GLP-1R, GIPR and GCGR relative to
        the endogenous ligands, with the peptide backbone engineered to preserve
        engagement of all three receptors rather than optimise a single target.
        <Cite refId="coskun-2022" />
      </P>
      <KeyFindings title="Reported pharmacology (published literature)">
        <UL>
          <li>Full-agonist activity reported at GLP-1R, GIPR and GCGR in cell-based cAMP assays.<Cite refId="coskun-2022" /></li>
          <li>Fatty-acid modification supports albumin binding and extended plasma half-life.<Cite refId="coskun-2022" /></li>
          <li>Weekly dosing schedule evaluated in reported phase 2 trials.<Cite refId="jastreboff-2023" /></li>
        </UL>
      </KeyFindings>
    </Prose>
  );

  const receptorTargets = (
    <ComparisonTable
      rowHeaderLabel="Receptor"
      columns={[
        { key: "role", label: "Reported activity" },
        { key: "class", label: "Receptor class" },
      ]}
      rows={[
        { label: "GLP-1R", values: { role: "Full agonist", class: "Class B GPCR" } },
        { label: "GIPR", values: { role: "Full agonist", class: "Class B GPCR" } },
        { label: "GCGR", values: { role: "Full agonist", class: "Class B GPCR" } },
      ]}
    />
  );

  const pharmacology = (
    <Prose>
      <P>
        Published pharmacokinetic reports characterise Retatrutide as suitable
        for once-weekly administration in clinical study protocols, consistent
        with the extended half-life expected from an albumin-binding fatty-acid
        modification.<Cite refId="coskun-2022" /><Cite refId="jastreboff-2023" />
      </P>
      <UL>
        <li><strong>Receptor selectivity:</strong> Reported as balanced across GLP-1R, GIPR and GCGR — distinct from single-agonist and dual-agonist analogues.</li>
        <li><strong>Downstream signalling:</strong> Elevated intracellular cAMP consistent with Gαs-coupled class B GPCR activation.<Cite refId="graaf-2016" /></li>
        <li><strong>Half-life:</strong> Reported to support once-weekly subcutaneous dosing in phase 2 clinical protocols.<Cite refId="jastreboff-2023" /></li>
      </UL>
    </Prose>
  );

  const applications = (
    <UL>
      <li><strong>Receptor-binding assays</strong> — GLP-1R, GIPR and GCGR displacement or functional cAMP assays.</li>
      <li><strong>Reference standard</strong> — analytical HPLC and mass-spectrometry method development.</li>
      <li><strong>Comparative pharmacology</strong> — side-by-side profiling against single- and dual-agonist peptides such as Semaglutide and Tirzepatide.</li>
      <li><strong>Structure–activity studies</strong> — in-vitro characterisation of modified analogues within the incretin-mimetic class.</li>
    </UL>
  );

  const labMethodology = (
    <Prose>
      <P>
        Retatrutide reference standards are supplied lyophilised. Standard
        laboratory practice for incretin-class peptides applies: aseptic
        handling, quantitative reconstitution, and single-use aliquoting to
        minimise freeze-thaw cycles.
      </P>
      <LaboratoryNote title="Analytical characterisation">
        <UL>
          <li>Reversed-phase HPLC at 214 nm for purity reporting (target ≥ 99% area).</li>
          <li>Orthogonal identity confirmation by mass spectrometry.</li>
          <li>Karl Fischer or gravimetric water content on the lyophilised solid where a certificate of analysis requires it.</li>
        </UL>
      </LaboratoryNote>
    </Prose>
  );

  const storage = (
    <UL>
      <li><strong>Lyophilised solid:</strong> −20 °C, desiccated, protected from light.</li>
      <li><strong>Reconstituted stock:</strong> 2–8 °C for short-term work; aliquot at −20 °C for longer storage.</li>
      <li><strong>Freeze-thaw:</strong> Minimise cycles; single-use aliquots recommended.</li>
      <li><strong>Container:</strong> Low-binding vials to reduce peptide loss on surfaces.</li>
    </UL>
  );

  const reconstitution = (
    <Prose>
      <P>
        Reconstitute per the laboratory SOP. A general procedure is documented
        in the accompanying <em>Laboratory Reconstitution Guide</em>. The
        summary below applies to Retatrutide as an incretin-class peptide:
      </P>
      <OL>
        <li>Equilibrate the sealed vial to room temperature.</li>
        <li>Introduce diluent (bacteriostatic or sterile water) slowly against the vial wall.</li>
        <li>Swirl gently to dissolve — do not vortex.</li>
        <li>Allow complete dissolution before aliquoting.</li>
        <li>Label each aliquot with peptide, concentration, date and analyst.</li>
      </OL>
    </Prose>
  );

  const evidence = (
    <div className="space-y-4">
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Reported pharmacology is characterised in a small number of high-quality primary sources, including discovery-pharmacology papers and phase 2 clinical trials. Longer-term data and independent replication continue to accumulate."
      />
      <ResearchLimitations
        items={[
          "The compound is investigational — no regulatory approval is in place for therapeutic use in the United Kingdom.",
          "Available literature is dominated by sponsor-led studies; independent replication is still developing.",
          "Long-term safety and efficacy data beyond published phase 2 durations are not yet available.",
          "No head-to-head trials against every existing incretin analogue have been published.",
        ]}
      />
    </div>
  );

  const faqs = (
    <div className="space-y-4">
      {retatrutideFaqs.map((f) => (
        <div key={f.question}>
          <div className="text-sm font-semibold text-navy-deep">{f.question}</div>
          <p className="text-sm text-navy-deep/85 leading-relaxed mt-1">{f.answer}</p>
        </div>
      ))}
    </div>
  );

  return {
    name: RETATRUTIDE_META.title,
    eyebrow: "COMPOUND AUTHORITY MONOGRAPH",
    aliases: RETATRUTIDE_META.aliases.join(", "),
    quickDefinition: (
      <>
        <strong className="text-bone">Retatrutide (LY3437943)</strong> is an
        investigational triple-agonist peptide that engages the GLP-1, GIP and
        glucagon receptors. This monograph summarises its published identity,
        mechanism and research context.
      </>
    ),
    overview,
    identity: identityBlock,
    synonyms,
    researchClassification: classification,
    iupacName: undefined,
    molecularFormula: RETATRUTIDE_META.molecularFormula,
    molecularWeight: `${RETATRUTIDE_META.molecularWeight} g/mol`,
    chemicalMetadata: (
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">CAS NUMBER</dt>
          <dd className="text-navy-deep mt-1 font-mono">{RETATRUTIDE_META.cas}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">DEVELOPMENTAL CODE</dt>
          <dd className="text-navy-deep mt-1 font-mono">LY3437943</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">RESIDUE COUNT</dt>
          <dd className="text-navy-deep mt-1">39 amino-acid residues</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MODIFICATION</dt>
          <dd className="text-navy-deep mt-1">Fatty-acid conjugate (albumin binding)</dd>
        </div>
      </dl>
    ),
    mechanism,
    receptorTargets,
    pharmacology,
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
    relatedMechanisms: (
      <RelatedMechanisms
        mechanismIds={["glp1r", "gipr", "gcgr"]}
        heading="Receptor mechanisms"
      />
    ),
    relatedGuides: (
      <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />
    ),
    editorial: (
      <PageEditorial pageKind="compound" revisions={clusterRevisions} />
    ),
    lastUpdated: RETATRUTIDE_META.dateModified,
  };
}

// ---------------------------------------------------------------------------
// Guide content — 4 supporting educational pages
// ---------------------------------------------------------------------------

export interface GuideContent {
  slug: string;
  title: string;
  description: string;
  categoryLabel: string;
  categoryPath: string;
  datePublished: string;
  dateModified: string;
  buildLayout: () => GuideLayoutProps;
  faqs?: { question: string; answer: string }[];
}

// ---- Guide: What is Retatrutide? -----------------------------------------

const whatIsRetatrutide: GuideContent = {
  slug: "what-is-retatrutide",
  title: "What is Retatrutide?",
  description:
    "Introductory reference on Retatrutide (LY3437943) — a triple-agonist investigational peptide referenced in incretin pharmacology literature.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "What class of peptide is Retatrutide?",
      answer:
        "Retatrutide is classified as an incretin mimetic and specifically as a triple GLP-1 / GIP / glucagon receptor agonist.",
    },
    {
      question: "Is Retatrutide approved for clinical use?",
      answer:
        "As of the date of publication, Retatrutide is an investigational compound reported in phase 2 clinical trials; it is not approved for therapeutic use in the United Kingdom.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">What is Retatrutide?</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise, evidence-based introduction to Retatrutide (LY3437943) — a
          triple-agonist investigational peptide reported in the incretin
          pharmacology literature.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Retatrutide (LY3437943) is an investigational synthetic peptide that
        activates three incretin-family receptors — GLP-1R, GIPR and GCGR —
        from a single molecule. It is supplied by Oxford Research Peptides as
        a reference standard for in-vitro laboratory research.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Retatrutide (LY3437943)" },
          { label: "Targets", value: "GLP-1R · GIPR · GCGR" },
          { label: "Class", value: "Triple-agonist incretin peptide" },
          { label: "Status", value: "Investigational (phase 2 published)" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Origin and naming</h2>
        <P>
          Retatrutide is the non-proprietary name for the peptide with the
          developmental code <strong>LY3437943</strong>. The compound was first
          described in the peer-reviewed literature by Coskun and colleagues as
          a novel triple GLP-1 / GIP / glucagon receptor agonist.<Cite refId="coskun-2022" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">What makes it distinctive</h2>
        <P>
          Existing incretin analogues typically target one receptor (for
          example, Semaglutide at GLP-1R) or two receptors (Tirzepatide at
          GLP-1R and GIPR). Retatrutide is distinguished by co-activation of a
          third receptor — the glucagon receptor — from the same molecule.
          <Cite refId="coskun-2022" />
        </P>
        <UL>
          <li>Single-agonist example: Semaglutide (GLP-1R only).</li>
          <li>Dual-agonist example: Tirzepatide (GLP-1R and GIPR).</li>
          <li>Triple-agonist example: Retatrutide (GLP-1R, GIPR and GCGR).</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Published research context</h2>
        <P>
          Retatrutide has been evaluated in reported phase 2 clinical trials
          for obesity<Cite refId="jastreboff-2023" /> and for glycaemic
          control in type 2 diabetes.<Cite refId="rosenstock-2023" /> These
          publications describe once-weekly subcutaneous administration
          protocols, consistent with the compound's fatty-acid modification and
          reported extended half-life.
        </P>

        <ImportantNote title="Research-use context">
          Oxford Research Peptides supplies Retatrutide as a reference
          standard for in-vitro laboratory research. This guide summarises the
          published scientific literature and does not describe or recommend
          any therapeutic use.
        </ImportantNote>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Where to go next</h2>
        <UL>
          <li>Read the full <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide compound monograph</a>.</li>
          <li>Understand the receptor pathway in <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 Receptor Explained</a>.</li>
          <li>Review the mechanism in <a className="underline underline-offset-2" href="/research-hub/guides/retatrutide-mechanism-of-action">Retatrutide Mechanism of Action</a>.</li>
        </UL>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Introductory guide. Underlying claims are drawn from peer-reviewed discovery and phase 2 clinical publications."
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: (
      <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />
    ),
    versionHistory: (
      <PageEditorial pageKind="guide" revisions={clusterRevisions} />
    ),
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Retatrutide Mechanism of Action ------------------------------

const retatrutideMoA: GuideContent = {
  slug: "retatrutide-mechanism-of-action",
  title: "Retatrutide Mechanism of Action",
  description:
    "Receptor-level explanation of Retatrutide's activity at GLP-1R, GIPR and GCGR as reported in the published preclinical and clinical literature.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Retatrutide Mechanism of Action</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          How a single peptide engages three related class B G-protein-coupled
          receptors — GLP-1R, GIPR and GCGR — and what the published literature
          reports about the downstream signalling.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Retatrutide is reported as a balanced full agonist of the GLP-1, GIP
        and glucagon receptors. All three are class B G-protein-coupled
        receptors coupled to Gαs, so activation converges on elevation of
        intracellular cAMP.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptor class", value: "Class B GPCR (× 3)" },
          { label: "Coupling", value: "Gαs / cAMP" },
          { label: "Endogenous ligands", value: "GLP-1, GIP, glucagon" },
          { label: "Reported activity", value: "Balanced full agonism" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">The three receptors</h2>
        <P>
          GLP-1R, GIPR and GCGR are members of the class B (secretin-like)
          G-protein-coupled receptor family. Each receptor's endogenous
          ligand is a short peptide hormone released in response to nutrient
          or metabolic cues.<Cite refId="baggio-2007" /><Cite refId="graaf-2016" />
        </P>
        <UL>
          <li><strong>GLP-1R</strong> — receptor for glucagon-like peptide-1; associated with insulin secretion, satiety and gastric-emptying signalling.<Cite refId="drucker-2018" /></li>
          <li><strong>GIPR</strong> — receptor for glucose-dependent insulinotropic polypeptide; part of the incretin axis.<Cite refId="baggio-2007" /></li>
          <li><strong>GCGR</strong> — glucagon receptor; involved in hepatic glucose output and energy expenditure signalling.</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Reported pharmacology</h2>
        <P>
          In the original discovery-pharmacology publication, Retatrutide is
          described as a balanced agonist at all three receptors in cell-based
          cAMP assays — that is, it activates each receptor to near-maximal
          efficacy at comparable relative potencies.<Cite refId="coskun-2022" />
        </P>
        <P>
          Because all three receptors couple to Gαs and elevate cAMP, the
          overall signalling output described in the literature is convergent
          at the cAMP level, even though the tissue distribution and
          physiological consequences of each receptor differ.<Cite refId="graaf-2016" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Structural strategy</h2>
        <P>
          Retatrutide's sequence is engineered to preserve engagement at three
          related but distinct receptor pockets, and it carries a fatty-acid
          modification that supports albumin binding and an extended plasma
          half-life — a strategy shared with other long-acting incretin
          analogues.<Cite refId="coskun-2022" />
        </P>

        <MethodologyTip title="Assay considerations">
          Comparative pharmacology reports for Retatrutide typically use
          orthogonal cAMP-response readouts at each receptor. When designing
          in-vitro receptor-binding or functional assays, matching the
          receptor construct, cell line and readout used in the primary
          literature enables direct comparison of results.
        </MethodologyTip>

        <h2 className="font-display text-2xl font-medium text-navy-deep">What the literature does not yet resolve</h2>
        <UL>
          <li>The precise contribution of each of the three receptors to observed clinical effects.</li>
          <li>Long-term signalling adaptations (e.g. receptor desensitisation) beyond published trial durations.</li>
          <li>Cross-lab reproducibility of relative potency values across different assay platforms.</li>
        </UL>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Mechanism is characterised in the sponsor-led discovery paper and supported by broader incretin-pharmacology literature; some downstream questions remain open."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "Primary pharmacology is described in a single discovery paper; independent replication continues to develop.",
          "Relative receptor contribution in vivo has not been fully resolved.",
          "Long-term signalling data beyond published trial durations are limited.",
        ]}
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: (
      <PageEditorial pageKind="guide" revisions={clusterRevisions} />
    ),
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: GLP-1 Receptor Explained -------------------------------------

const glp1ReceptorExplained: GuideContent = {
  slug: "glp-1-receptor-explained",
  title: "GLP-1 Receptor Explained",
  description:
    "Overview of the GLP-1 receptor: a Class B G-protein-coupled receptor central to incretin pharmacology and to a growing family of research peptides.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">GLP-1 Receptor Explained</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise reference on the glucagon-like peptide-1 receptor — its
          classification, signalling and role as a research target for the
          incretin-mimetic peptide family.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        The GLP-1 receptor (GLP-1R) is a class B G-protein-coupled receptor
        activated by the endogenous incretin hormone glucagon-like peptide-1
        (7-36). It signals primarily via Gαs / cAMP and is the shared target
        of a large family of research peptides, from single-agonist analogues
        to Retatrutide's triple-agonist scaffold.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptor class", value: "Class B GPCR (secretin-like)" },
          { label: "Endogenous ligand", value: "GLP-1 (7-36) amide" },
          { label: "Primary coupling", value: "Gαs / cAMP" },
          { label: "Research family", value: "Incretin mimetics" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <Definition term="Incretin">
          Gut-derived peptide hormones — principally GLP-1 and GIP — that
          potentiate glucose-dependent insulin secretion after nutrient intake.
        </Definition>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Classification</h2>
        <P>
          GLP-1R belongs to the class B (secretin-like) family of seven-
          transmembrane G-protein-coupled receptors. Class B GPCRs are
          characterised by a large extracellular N-terminal domain that binds
          peptide ligands and stabilises the active receptor conformation.<Cite refId="graaf-2016" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Endogenous ligand and signalling</h2>
        <P>
          The endogenous ligand at GLP-1R is glucagon-like peptide-1 (7-36)
          amide, released from intestinal L-cells in response to nutrient
          ingestion.<Cite refId="baggio-2007" /> Activation of GLP-1R engages
          Gαs, elevates intracellular cyclic AMP and activates downstream
          effectors including protein kinase A and Epac.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why it matters for research peptides</h2>
        <P>
          GLP-1R is the shared receptor target for a wide range of research
          peptides. Some are single-agonist analogues (for example, Semaglutide
          and Liraglutide sequences), while others engage additional receptors
          — Tirzepatide adds GIPR, and Retatrutide adds both GIPR and GCGR to
          its GLP-1R activity.<Cite refId="coskun-2022" />
        </P>

        <MethodologyTip title="Working with GLP-1R in vitro">
          Recombinant human GLP-1R expressed in HEK293 or CHO cell lines is a
          common substrate for functional cAMP assays. When comparing potency
          values across publications, note the receptor construct, tag and
          readout technology — small differences in assay design can shift
          absolute potency measurements.
        </MethodologyTip>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Related pathway concepts</h2>
        <UL>
          <li>The <strong>incretin effect</strong> — the observation that oral glucose elicits a larger insulin response than intravenous glucose at matched glycaemia.<Cite refId="baggio-2007" /></li>
          <li>Class B GPCR pharmacology — extracellular-domain-driven ligand recognition and Gαs-dominant coupling.<Cite refId="graaf-2016" /></li>
        </UL>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="GLP-1R is a well-characterised receptor with extensive independent literature spanning pharmacology, structural biology and clinical research."
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compounds targeting GLP-1R" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: (
      <PageEditorial pageKind="guide" revisions={clusterRevisions} />
    ),
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Laboratory Reconstitution Guide ------------------------------

const reconstitutionGuide: GuideContent = {
  slug: "laboratory-reconstitution-guide",
  title: "Laboratory Reconstitution Guide",
  description:
    "Practical, aseptic procedure for reconstituting lyophilised peptide reference material — diluent selection, concentration calculation and post-reconstitution storage.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">HANDLING GUIDE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Laboratory Reconstitution Guide</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A general-purpose aseptic procedure for reconstituting lyophilised
          peptide reference standards for in-vitro laboratory research.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Reconstitution converts a lyophilised peptide reference standard into a
        working stock solution. Standard practice: equilibrate to room
        temperature, add diluent slowly against the vial wall, swirl (do not
        vortex), allow full dissolution and aliquot to minimise freeze-thaw
        cycles.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Typical diluent", value: "Bacteriostatic or sterile water" },
          { label: "Concentration units", value: "mg / mL" },
          { label: "Short-term storage", value: "2–8 °C" },
          { label: "Long-term storage", value: "−20 °C aliquots" },
          { label: "Handling", value: "Aseptic technique" },
          { label: "Container", value: "Low-binding vials" },
        ]}
      />
    ),
    mainContent: (
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Before you start</h2>
        <UL>
          <li>Confirm the peptide identity, batch number and certificate of analysis.</li>
          <li>Calculate the diluent volume required to reach the target concentration.</li>
          <li>Assemble low-binding aliquot vials, labels and sterile pipette tips.</li>
          <li>Work in an appropriate aseptic environment per laboratory SOP.</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Step-by-step procedure</h2>
        <OL>
          <li>Remove the vial from −20 °C storage. Allow it to equilibrate to room temperature in a desiccator to prevent condensation.</li>
          <li>Briefly centrifuge the vial (or tap gently) to collect the lyophilised material at the base.</li>
          <li>Draw the calculated diluent volume into a sterile syringe or pipette.</li>
          <li>Introduce the diluent slowly against the inner wall of the vial — avoid direct impact on the lyophilised cake.</li>
          <li>Swirl gently to dissolve. Do not vortex — vortex-induced shear can aggregate sensitive peptides.</li>
          <li>Allow 5–10 minutes for complete dissolution. Inspect the solution: it should appear clear and free of particulates.</li>
          <li>Aliquot into low-binding vials, sized for single use where possible.</li>
          <li>Label each aliquot with peptide identity, concentration, date, batch and analyst.</li>
        </OL>

        <LaboratoryNote title="Concentration calculation">
          <UL>
            <li><strong>Target concentration:</strong> Choose to match downstream assay requirements.</li>
            <li><strong>Volume:</strong> <em>V (mL) = mass (mg) / concentration (mg/mL)</em>.</li>
            <li><strong>Peptide content:</strong> Use the net peptide content from the certificate of analysis rather than the gross vial mass where available.</li>
          </UL>
        </LaboratoryNote>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Storage after reconstitution</h2>
        <UL>
          <li><strong>Short-term (days):</strong> 2–8 °C for the working aliquot in use.</li>
          <li><strong>Long-term (weeks-months):</strong> −20 °C for aliquots not in immediate use.</li>
          <li><strong>Freeze-thaw:</strong> Minimise cycles — single-use aliquots are preferred.</li>
          <li><strong>Light:</strong> Store protected from direct light where the peptide is known to be photosensitive.</li>
        </UL>

        <Callout tone="warning" title="Diluent choice matters" icon={undefined}>
          The default diluent for most research peptides is sterile water. Some
          peptides are more soluble with a small proportion of acetic acid or
          another co-solvent — always consult the compound-specific
          documentation (for example, the <a className="underline" href="/compounds/retatrutide">Retatrutide monograph</a>)
          before diverging from a standard water reconstitution.
        </Callout>
      </Prose>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Reconstitution is a well-established laboratory procedure for lyophilised peptides. The steps described here reflect widely accepted best practice."
      />
    ),
    relatedGuides: <RelatedGuides categoryId="guides" heading="Related guides" />,
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />,
    versionHistory: (
      <PageEditorial pageKind="methodology" revisions={clusterRevisions} />
    ),
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---------------------------------------------------------------------------
// Registry
// ---------------------------------------------------------------------------

export const guideContentRegistry: readonly GuideContent[] = [
  whatIsRetatrutide,
  retatrutideMoA,
  glp1ReceptorExplained,
  reconstitutionGuide,
];

export function getGuideContent(slug: string): GuideContent | undefined {
  return guideContentRegistry.find((g) => g.slug === slug);
}

export const compoundMonographRegistry: Record<
  string,
  {
    build: () => CompoundLayoutProps;
    faqs: { question: string; answer: string }[];
    meta: typeof RETATRUTIDE_META;
  }
> = {
  retatrutide: {
    build: retatrutideMonograph,
    faqs: retatrutideFaqs,
    meta: RETATRUTIDE_META,
  },
};

export function getCompoundMonograph(slug: string) {
  return compoundMonographRegistry[slug];
}
