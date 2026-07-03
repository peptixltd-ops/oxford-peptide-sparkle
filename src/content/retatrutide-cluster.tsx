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

// ---- Guide: GIP Receptor Explained ---------------------------------------

const gipReceptorExplained: GuideContent = {
  slug: "gip-receptor-explained",
  title: "GIP Receptor Explained",
  description:
    "Overview of the glucose-dependent insulinotropic polypeptide (GIP) receptor: classification, signalling, tissue distribution and its role in dual and triple incretin-agonist research.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "What is the GIP receptor?",
      answer:
        "The GIP receptor (GIPR) is a class B G-protein-coupled receptor activated by glucose-dependent insulinotropic polypeptide, one of the two principal incretin hormones released from the intestine after nutrient intake.",
    },
    {
      question: "Which research peptides target GIPR?",
      answer:
        "GIPR is engaged by dual GLP-1 / GIP receptor agonists such as Tirzepatide and by triple GLP-1 / GIP / glucagon receptor agonists such as Retatrutide.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">GIP Receptor Explained</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise reference on the glucose-dependent insulinotropic
          polypeptide receptor — its classification, signalling and role
          in modern multi-agonist incretin research.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        The GIP receptor (GIPR) is a class B G-protein-coupled receptor
        activated by the incretin hormone glucose-dependent insulinotropic
        polypeptide. It signals primarily via Gαs / cAMP and is a shared
        research target for dual and triple incretin-receptor agonists.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptor class", value: "Class B GPCR (secretin-like)" },
          { label: "Endogenous ligand", value: "GIP (1-42)" },
          { label: "Primary coupling", value: "Gαs / cAMP" },
          { label: "Research family", value: "Incretin mimetics" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <Definition term="GIP (glucose-dependent insulinotropic polypeptide)">
          A 42-amino-acid peptide hormone released from intestinal K-cells
          in response to nutrient ingestion and, alongside GLP-1, one of
          the two principal incretin hormones.
        </Definition>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Classification</h2>
        <P>
          GIPR belongs to the class B (secretin-like) G-protein-coupled
          receptor family. Like the other class B GPCRs it uses a large
          extracellular N-terminal domain to capture its peptide ligand
          and stabilise the active receptor conformation.<Cite refId="graaf-2016" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Endogenous ligand and signalling</h2>
        <P>
          The endogenous ligand at GIPR is GIP (1-42), released from
          intestinal K-cells after nutrient intake.<Cite refId="baggio-2007" />
          Activation engages Gαs, elevates intracellular cyclic AMP and
          drives glucose-dependent insulin secretion from pancreatic
          β-cells alongside additional effects on adipose tissue and the
          central nervous system.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why GIPR matters in multi-agonist research</h2>
        <P>
          Historically, GLP-1R was the sole incretin-family target for
          peptide-drug research. Adding GIPR engagement gives the dual
          agonist Tirzepatide its distinctive pharmacological profile, and
          Retatrutide extends this further by combining GIPR with GLP-1R
          and GCGR activity in a single molecule.<Cite refId="coskun-2022" />
        </P>
        <UL>
          <li>Single-agonist (GLP-1R): Semaglutide-class analogues.</li>
          <li>Dual-agonist (GLP-1R + GIPR): Tirzepatide.</li>
          <li>Triple-agonist (GLP-1R + GIPR + GCGR): Retatrutide.<Cite refId="coskun-2022" /></li>
        </UL>

        <MethodologyTip title="Working with GIPR in vitro">
          Recombinant human GIPR expressed in HEK293 or CHO cell lines is
          a common substrate for functional cAMP assays. When benchmarking
          new analogues, matching the receptor construct, tag and readout
          used in the primary literature enables direct comparison of
          reported potency values.
        </MethodologyTip>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Where to go next</h2>
        <UL>
          <li>Read <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 Receptor Explained</a> for the paired incretin receptor.</li>
          <li>Read <a className="underline underline-offset-2" href="/research-hub/guides/glucagon-receptor-explained">Glucagon Receptor Explained</a> to complete the triple-agonist axis.</li>
          <li>See <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple Agonists Explained</a> for the combined pharmacology.</li>
        </UL>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="GIPR is a well-characterised receptor with extensive independent literature spanning incretin physiology, structural biology and pharmacology."
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compounds targeting GIPR" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Glucagon Receptor Explained ----------------------------------

const glucagonReceptorExplained: GuideContent = {
  slug: "glucagon-receptor-explained",
  title: "Glucagon Receptor Explained",
  description:
    "Overview of the glucagon receptor (GCGR): its classification, hepatic and metabolic signalling, and its role as the third target engaged by triple-agonist research peptides such as Retatrutide.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "What is the glucagon receptor?",
      answer:
        "The glucagon receptor (GCGR) is a class B G-protein-coupled receptor activated by the pancreatic peptide hormone glucagon. It is highly expressed in liver hepatocytes, where its activation drives hepatic glucose output.",
    },
    {
      question: "Why is GCGR engaged in triple-agonist research?",
      answer:
        "Adding controlled glucagon-receptor activity to an incretin-agonist scaffold is hypothesised to modulate energy expenditure and hepatic lipid handling. Retatrutide is the reference example of this triple-agonist strategy.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Glucagon Receptor Explained</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise reference on the glucagon receptor — its classification,
          signalling and its role as the third receptor engaged by
          triple-agonist research peptides.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        The glucagon receptor (GCGR) is a class B G-protein-coupled
        receptor activated by the pancreatic peptide hormone glucagon.
        It is highly expressed in liver hepatocytes, couples to Gαs and
        Gαq, and is the third receptor engaged by triple-agonist research
        peptides such as Retatrutide.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptor class", value: "Class B GPCR (secretin-like)" },
          { label: "Endogenous ligand", value: "Glucagon (1-29)" },
          { label: "Primary coupling", value: "Gαs / cAMP (also Gαq)" },
          { label: "Primary tissue", value: "Hepatocytes" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Classification</h2>
        <P>
          GCGR is a class B (secretin-like) seven-transmembrane
          G-protein-coupled receptor, structurally related to GLP-1R and
          GIPR and part of the same receptor superfamily.<Cite refId="graaf-2016" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Endogenous ligand and signalling</h2>
        <P>
          The endogenous ligand at GCGR is the 29-residue pancreatic
          peptide hormone glucagon, secreted by pancreatic α-cells
          principally in response to hypoglycaemia. GCGR couples primarily
          to Gαs, elevates intracellular cyclic AMP and, in hepatocytes,
          activates gluconeogenesis and glycogenolysis. Additional Gαq
          coupling contributes to intracellular calcium mobilisation.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Physiological role</h2>
        <UL>
          <li><strong>Hepatic glucose output:</strong> Glucagon drives glycogen breakdown and gluconeogenesis in the liver.</li>
          <li><strong>Lipid handling:</strong> Reported effects on hepatic lipid oxidation and triglyceride export.</li>
          <li><strong>Energy expenditure:</strong> Preclinical models associate glucagon signalling with modulation of thermogenesis.</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why GCGR appears in triple-agonist scaffolds</h2>
        <P>
          Retatrutide's distinguishing pharmacological feature is the
          controlled addition of glucagon-receptor activity to a
          GLP-1R / GIPR scaffold, producing a balanced triple agonist at
          the three related class B GPCRs.<Cite refId="coskun-2022" /> The
          scientific rationale for combining GCGR activity with
          incretin-receptor agonism is the potential for effects on hepatic
          lipid handling and energy expenditure that a pure incretin
          agonist may not achieve.
        </P>

        <MethodologyTip title="Working with GCGR in vitro">
          Recombinant human GCGR expressed in HEK293 or CHO cell lines
          supports cAMP-based functional assays. Because GCGR displays
          non-trivial Gαq coupling, calcium-mobilisation readouts are also
          reported in the literature and can be a useful orthogonal assay.
        </MethodologyTip>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Where to go next</h2>
        <UL>
          <li>Read <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 Receptor Explained</a> and <a className="underline underline-offset-2" href="/research-hub/guides/gip-receptor-explained">GIP Receptor Explained</a>.</li>
          <li>See <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple Agonists Explained</a> for the combined pharmacology.</li>
          <li>See the <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a> for the reference triple-agonist compound.</li>
        </UL>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="GCGR is a well-characterised receptor with decades of independent literature. Its role within triple-agonist scaffolds is more recent and continues to develop."
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compounds targeting GCGR" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Triple Agonists Explained ------------------------------------

const tripleAgonistsExplained: GuideContent = {
  slug: "triple-agonists-explained",
  title: "Triple Agonists Explained",
  description:
    "Educational overview of triple GLP-1 / GIP / glucagon receptor agonists — the pharmacological rationale, structural strategy and how Retatrutide compares to single- and dual-agonist analogues.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "What is a triple agonist?",
      answer:
        "In incretin research, a triple agonist is a single peptide engineered to activate three related class B G-protein-coupled receptors — GLP-1R, GIPR and GCGR — from a single molecule.",
    },
    {
      question: "How does a triple agonist differ from a dual agonist?",
      answer:
        "A dual agonist activates two receptors (typically GLP-1R and GIPR, as with Tirzepatide). A triple agonist adds a third receptor — the glucagon receptor — to the same molecule. Retatrutide is the reference triple-agonist example.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Triple Agonists Explained</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          The pharmacological rationale, structural strategy and reported
          evidence behind triple GLP-1 / GIP / glucagon receptor agonists
          — a category defined in modern literature by Retatrutide.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        A triple agonist is a single peptide engineered to activate three
        related class B GPCRs — GLP-1R, GIPR and GCGR — from one molecule.
        Retatrutide (LY3437943) is the reference triple-agonist compound
        described in the published pharmacology literature.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Category", value: "Multi-agonist incretin peptides" },
          { label: "Receptors engaged", value: "GLP-1R · GIPR · GCGR" },
          { label: "Reference compound", value: "Retatrutide (LY3437943)" },
          { label: "Comparative class", value: "Dual agonists (e.g. Tirzepatide)" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">From single to dual to triple</h2>
        <P>
          Incretin-receptor pharmacology has evolved along a clear
          trajectory. Single-agonist analogues target GLP-1R alone.
          Dual-agonist analogues, exemplified by Tirzepatide, add GIPR.
          Triple agonists, exemplified by Retatrutide, add controlled GCGR
          activity to the same scaffold.<Cite refId="coskun-2022" />
        </P>
        <ComparisonTable
          rowHeaderLabel="Category"
          columns={[
            { key: "receptors", label: "Receptors" },
            { key: "example", label: "Reference example" },
          ]}
          rows={[
            { label: "Single agonist", values: { receptors: "GLP-1R", example: "Semaglutide" } },
            { label: "Dual agonist", values: { receptors: "GLP-1R + GIPR", example: "Tirzepatide" } },
            { label: "Triple agonist", values: { receptors: "GLP-1R + GIPR + GCGR", example: "Retatrutide" } },
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why three receptors</h2>
        <P>
          The scientific rationale for combining these three targets rests
          on the complementary physiology of the incretin axis and the
          glucagon axis. GLP-1R and GIPR support glucose-dependent insulin
          secretion and satiety signalling; GCGR contributes to hepatic
          lipid handling and energy expenditure.<Cite refId="baggio-2007" />
          Balancing all three within a single molecule is a distinct
          medicinal-chemistry challenge.<Cite refId="coskun-2022" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Structural strategy</h2>
        <P>
          Triple-agonist peptides are engineered on a modified glucagon /
          incretin backbone with amino-acid substitutions that preserve
          engagement at three related but non-identical receptor pockets.
          A fatty-acid modification supports albumin binding and an
          extended plasma half-life, permitting once-weekly dosing in
          published trial protocols.<Cite refId="coskun-2022" /><Cite refId="jastreboff-2023" />
        </P>

        <KeyFindings title="Reported evidence for the triple-agonist category">
          <UL>
            <li>Balanced full-agonist activity at GLP-1R, GIPR and GCGR reported in cell-based cAMP assays for Retatrutide.<Cite refId="coskun-2022" /></li>
            <li>Phase 2 obesity data published for Retatrutide.<Cite refId="jastreboff-2023" /></li>
            <li>Phase 2 type 2 diabetes data published for Retatrutide.<Cite refId="rosenstock-2023" /></li>
          </UL>
        </KeyFindings>

        <ImportantNote title="Category status">
          Triple GLP-1 / GIP / glucagon receptor agonism is an
          investigational research category. Long-term outcomes and
          independent cross-lab replication are still developing.
        </ImportantNote>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Category evidence is anchored by discovery pharmacology and phase 2 clinical data for Retatrutide; independent replication continues to develop."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "The category is currently defined by a small number of compounds — evidence is not yet mature.",
          "Relative contribution of each receptor to observed effects is not fully resolved.",
          "Long-term data beyond published phase 2 durations are not yet available.",
        ]}
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Reference compound" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Laboratory Storage Guide -------------------------------------

const storageGuide: GuideContent = {
  slug: "laboratory-storage-guide",
  title: "Laboratory Storage Guide",
  description:
    "General-purpose laboratory storage procedure for lyophilised and reconstituted peptide reference standards — temperature, humidity, light, container and freeze-thaw management.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "How should lyophilised peptides be stored?",
      answer:
        "Lyophilised peptide reference standards are typically stored at −20 °C, desiccated and protected from light. Sealed original packaging is preferred until first use.",
    },
    {
      question: "How long can a reconstituted peptide be stored?",
      answer:
        "In general, working aliquots are stored at 2–8 °C for short-term use (days) and at −20 °C for longer periods (weeks to months), with freeze-thaw cycles minimised. Compound-specific stability data should always take precedence.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">HANDLING GUIDE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Laboratory Storage Guide</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          General-purpose storage practice for lyophilised and
          reconstituted peptide reference standards in a laboratory setting.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Lyophilised peptide reference standards are typically stored at
        −20 °C, desiccated and protected from light. Reconstituted stocks
        are stored short-term at 2–8 °C and long-term as single-use
        aliquots at −20 °C to minimise freeze-thaw exposure.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Lyophilised solid", value: "−20 °C, desiccated" },
          { label: "Reconstituted (days)", value: "2–8 °C" },
          { label: "Reconstituted (long-term)", value: "−20 °C aliquots" },
          { label: "Container", value: "Low-binding vials" },
          { label: "Freeze-thaw", value: "Minimise cycles" },
        ]}
      />
    ),
    mainContent: (
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Baseline storage principles</h2>
        <P>
          Peptide reference standards are sensitive to four principal
          stress factors: temperature, humidity, light and repeated
          freeze-thaw cycles. Effective storage practice controls each of
          these systematically rather than in isolation.
        </P>
        <UL>
          <li><strong>Temperature:</strong> Cold storage slows chemical degradation. Lyophilised solids are typically held at −20 °C; long-term reconstituted stocks are also held at −20 °C in aliquots.</li>
          <li><strong>Humidity:</strong> Water uptake accelerates hydrolysis. Lyophilised material should be kept desiccated and vials should be re-sealed promptly after opening.</li>
          <li><strong>Light:</strong> Ultraviolet exposure can degrade aromatic residues. Store away from direct light where the peptide is known to be photosensitive.</li>
          <li><strong>Mechanical stress:</strong> Avoid repeated freeze-thaw cycles and vortexing sensitive peptides; both can promote aggregation.</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Storing lyophilised solids</h2>
        <OL>
          <li>Hold vials at −20 °C in a dedicated peptide-storage freezer where possible.</li>
          <li>Keep desiccated: a sealed container or foil pouch with fresh desiccant is standard practice.</li>
          <li>Equilibrate to room temperature before opening to prevent atmospheric moisture condensing onto cold material.</li>
          <li>Record open date on the vial label; consider tracking cumulative time out of storage per SOP.</li>
        </OL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Storing reconstituted stocks</h2>
        <OL>
          <li>Immediately after reconstitution, aliquot into low-binding vials sized for single use where possible.</li>
          <li>Label with peptide, concentration, diluent, date, batch and analyst.</li>
          <li>Working aliquot in daily use: 2–8 °C.</li>
          <li>Remaining aliquots: −20 °C, protected from light.</li>
          <li>Thaw each aliquot only once; discard unused material per laboratory SOP.</li>
        </OL>

        <LaboratoryNote title="Container selection">
          <UL>
            <li><strong>Low-binding polypropylene</strong> reduces peptide loss on plastic surfaces.</li>
            <li><strong>Glass</strong> is appropriate for many peptides but may not be for all — check compound-specific documentation.</li>
            <li><strong>Screw-cap vials</strong> with a suitable seal are preferred over snap-cap vials for long-term storage.</li>
          </UL>
        </LaboratoryNote>

        <Callout tone="warning" title="Compound-specific stability data prevails" icon={undefined}>
          The recommendations above are a baseline. Where a certificate of
          analysis, monograph or peer-reviewed report specifies different
          conditions for a specific peptide, those data always take
          precedence. See the <a className="underline" href="/compounds/retatrutide">Retatrutide monograph</a> for a
          worked example.
        </Callout>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Related procedures</h2>
        <UL>
          <li><a className="underline underline-offset-2" href="/research-hub/guides/laboratory-reconstitution-guide">Laboratory Reconstitution Guide</a> — from lyophilised solid to working stock.</li>
          <li><a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a> — compound-specific storage detail.</li>
        </UL>
      </Prose>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Storage practice for lyophilised peptide reference standards is well-established. The recommendations here reflect widely accepted laboratory best practice."
      />
    ),
    relatedGuides: <RelatedGuides categoryId="guides" heading="Related guides" />,
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />,
    versionHistory: <PageEditorial pageKind="methodology" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Retatrutide Research Applications ----------------------------

const retatrutideResearchApplications: GuideContent = {
  slug: "retatrutide-research-applications",
  title: "Retatrutide Research Applications",
  description:
    "Educational review of in-vitro and translational research applications for Retatrutide (LY3437943) as a reference standard: receptor-binding studies, analytical characterisation and comparative pharmacology.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: [
    {
      question: "What is Retatrutide used for in laboratory research?",
      answer:
        "Retatrutide is used as a reference standard for receptor-binding and cAMP functional assays at GLP-1R, GIPR and GCGR, for analytical method development, and for comparative pharmacology alongside single- and dual-agonist peptides.",
    },
    {
      question: "Is Retatrutide used in human studies?",
      answer:
        "Human clinical evidence for Retatrutide is limited to sponsor-led phase 2 trials reported in the peer-reviewed literature. Oxford Research Peptides supplies Retatrutide strictly as an in-vitro reference standard, not for human use.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH REVIEW</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Retatrutide Research Applications</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          An educational review of how Retatrutide (LY3437943) is used as
          an in-vitro reference standard in receptor pharmacology,
          analytical characterisation and comparative research.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Retatrutide is used in in-vitro laboratory research as a reference
        standard for receptor-binding and cAMP functional assays at GLP-1R,
        GIPR and GCGR, for analytical HPLC and mass-spectrometry method
        development, and for side-by-side pharmacology against single- and
        dual-agonist incretin peptides.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Retatrutide (LY3437943)" },
          { label: "Reference class", value: "Triple-agonist peptide" },
          { label: "Common assays", value: "Radioligand · cAMP · HPLC · MS" },
          { label: "Comparators", value: "Semaglutide · Tirzepatide" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Receptor pharmacology</h2>
        <P>
          Retatrutide is most commonly used in vitro as a probe of
          incretin-receptor pharmacology. Cell-based cAMP assays at
          recombinant human GLP-1R, GIPR and GCGR — expressed in HEK293 or
          CHO backgrounds — allow characterisation of potency, efficacy
          and receptor selectivity.<Cite refId="coskun-2022" /><Cite refId="graaf-2016" />
        </P>
        <UL>
          <li>Functional cAMP dose-response at each of the three receptors.</li>
          <li>Radioligand or fluorescent displacement binding at each receptor.</li>
          <li>Orthogonal readouts (calcium mobilisation, β-arrestin recruitment) for signalling-bias studies.</li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Analytical characterisation</h2>
        <P>
          As a synthetic peptide reference standard, Retatrutide is used
          in method development for reversed-phase HPLC identity and
          purity, and for mass-spectrometry confirmation of intact mass
          and fragmentation. These methods underpin certificate-of-analysis
          reporting for peptide batches across research laboratories.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Comparative pharmacology</h2>
        <P>
          Because Retatrutide is a defining example of the triple-agonist
          category, it is often used as a comparator in side-by-side
          studies with single- and dual-agonist analogues.<Cite refId="coskun-2022" />
          This positioning is educational for structure–activity work
          across the incretin-mimetic peptide family.
        </P>
        <ComparisonTable
          rowHeaderLabel="Comparator"
          columns={[
            { key: "targets", label: "Receptor targets" },
            { key: "role", label: "Typical role in comparative studies" },
          ]}
          rows={[
            { label: "Semaglutide (single)", values: { targets: "GLP-1R", role: "Baseline single-agonist reference" } },
            { label: "Tirzepatide (dual)", values: { targets: "GLP-1R + GIPR", role: "Dual-agonist benchmark" } },
            { label: "Retatrutide (triple)", values: { targets: "GLP-1R + GIPR + GCGR", role: "Triple-agonist reference" } },
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">Translational context (published literature)</h2>
        <P>
          Beyond in-vitro pharmacology, published sponsor-led phase 2
          trials have evaluated Retatrutide for glycaemic control in
          type 2 diabetes<Cite refId="rosenstock-2023" /> and for weight
          management in adults with obesity.<Cite refId="jastreboff-2023" />
          These reports provide context for its position within the
          incretin-mimetic peptide category but do not extend the
          research-use scope of the material supplied by Oxford Research
          Peptides.
        </P>

        <ImportantNote title="Scope of use">
          Retatrutide is supplied strictly for in-vitro laboratory
          research. This review summarises published research contexts;
          it does not describe or recommend any therapeutic use.
        </ImportantNote>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Research-application context is drawn from the primary discovery-pharmacology paper and reported phase 2 clinical trials. Independent replication continues to develop."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "In-vitro assay results depend heavily on receptor construct, cell line and readout technology.",
          "Published translational evidence is dominated by sponsor-led studies.",
          "Long-term stability of pharmacological findings across independent laboratories is still developing.",
        ]}
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-07-15",
    lastUpdated: "2026-07-15",
  }),
};

// ---- Guide: Retatrutide FAQ ---------------------------------------------

const retatrutideFaqEntries: { question: string; answer: string }[] = [
  {
    question: "What is Retatrutide?",
    answer:
      "Retatrutide (developmental code LY3437943) is an investigational synthetic peptide characterised in the peer-reviewed literature as a single-molecule agonist of three related class B G-protein-coupled receptors: GLP-1R, GIPR and GCGR.",
  },
  {
    question: "Which receptors does Retatrutide activate?",
    answer:
      "Retatrutide is reported as a balanced full agonist at the GLP-1 receptor (GLP-1R), the GIP receptor (GIPR) and the glucagon receptor (GCGR).",
  },
  {
    question: "How does Retatrutide differ from Semaglutide and Tirzepatide?",
    answer:
      "Semaglutide is a single agonist at GLP-1R. Tirzepatide is a dual agonist at GLP-1R and GIPR. Retatrutide adds a third receptor — GCGR — to the same molecule and is described as a triple agonist.",
  },
  {
    question: "What is Retatrutide's molecular formula and weight?",
    answer:
      "The published molecular formula for Retatrutide is C226H344N50O68 with a reported molecular weight of approximately 4731 g/mol.",
  },
  {
    question: "How should Retatrutide reference material be stored?",
    answer:
      "Lyophilised Retatrutide is stored at −20 °C, desiccated and protected from light. Reconstituted stocks are stored short-term at 2–8 °C and long-term as single-use aliquots at −20 °C, with freeze-thaw cycles minimised.",
  },
  {
    question: "What diluent should be used to reconstitute Retatrutide?",
    answer:
      "Sterile or bacteriostatic water is the default diluent for the incretin-analogue peptide class. Always follow compound-specific documentation and the laboratory SOP.",
  },
  {
    question: "What assays is Retatrutide commonly used in?",
    answer:
      "Common applications include cAMP functional assays at recombinant human GLP-1R, GIPR and GCGR; radioligand or fluorescent displacement binding at each receptor; and analytical HPLC and mass-spectrometry method development.",
  },
  {
    question: "Is Retatrutide approved for clinical use?",
    answer:
      "As of the date of publication, Retatrutide is an investigational compound reported in phase 2 clinical trials in the peer-reviewed literature; it is not approved for therapeutic use in the United Kingdom.",
  },
  {
    question: "Is Retatrutide supplied for human use?",
    answer:
      "No. Oxford Research Peptides supplies Retatrutide strictly as a reference standard for in-vitro laboratory research. Nothing in the product documentation constitutes medical advice or endorses any therapeutic use.",
  },
  {
    question: "Where can I read the primary literature on Retatrutide?",
    answer:
      "Key primary sources include the Coskun et al. (2022) discovery pharmacology paper in Cell Metabolism, the Jastreboff et al. (2023) obesity trial in the New England Journal of Medicine and the Rosenstock et al. (2023) type 2 diabetes trial in the Lancet. Full citations are provided in the Retatrutide monograph reference list.",
  },
];

const retatrutideFaq: GuideContent = {
  slug: "retatrutide-faq",
  title: "Retatrutide FAQ",
  description:
    "Comprehensive frequently asked questions about Retatrutide (LY3437943): identity, pharmacology, storage, research applications and regulatory status.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-07-15",
  dateModified: "2026-07-15",
  faqs: retatrutideFaqEntries,
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">FREQUENTLY ASKED</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Retatrutide FAQ</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A comprehensive reference of frequently asked questions about
          Retatrutide (LY3437943), covering identity, pharmacology,
          handling, research applications and regulatory status.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Retatrutide is an investigational triple-agonist peptide that
        engages the GLP-1, GIP and glucagon receptors. Oxford Research
        Peptides supplies it as an in-vitro reference standard. This page
        answers the most common questions about the compound.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Retatrutide (LY3437943)" },
          { label: "Class", value: "Triple GLP-1 / GIP / GCG receptor agonist" },
          { label: "Status", value: "Investigational (phase 2 published)" },
          { label: "Use", value: "In-vitro reference standard" },
        ]}
      />
    ),
    mainContent: (
      <div className="space-y-6">
        {retatrutideFaqEntries.map((item, i) => (
          <section key={item.question} aria-labelledby={`faq-${i}`} className="border-l-2 border-gold/60 pl-4">
            <h2
              id={`faq-${i}`}
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
            <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/retatrutide-mechanism-of-action">Mechanism of Action</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/retatrutide-research-applications">Research Applications</a>{" "}
            and the receptor guides for{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1R</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/gip-receptor-explained">GIPR</a> and{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/glucagon-receptor-explained">GCGR</a>.
          </p>
        </div>
      </div>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="moderate"
        confidence="moderate"
        summary="Answers here summarise the primary discovery-pharmacology paper and reported phase 2 clinical trials, together with widely accepted laboratory practice for the incretin-analogue peptide class."
      />
    ),
    relatedCompounds: <RelatedCompounds slugs={["retatrutide"]} heading="Compound reference" />,
    relatedGuides: <RelatedGuides compoundSlug="retatrutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
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
  gipReceptorExplained,
  glucagonReceptorExplained,
  tripleAgonistsExplained,
  reconstitutionGuide,
  storageGuide,
  retatrutideResearchApplications,
  retatrutideFaq,
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
