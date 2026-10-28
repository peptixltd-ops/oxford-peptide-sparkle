/**
 * Authority Sprint 2D — Comparison content.
 *
 * Renders side-by-side comparison guides using the existing GuideLayout
 * shell + publishing components. No new infrastructure introduced.
 */
import type { ReactNode } from "react";
import type { GuideLayoutProps } from "@/components/knowledge/guide-layout";
import {
  QuickAnswer,
  KeyFacts,
  EvidenceSummary,
  ResearchLimitations,
  ReferenceProvider,
  ReferenceList,
  Cite,
  ImportantNote,
  ScientificDisclaimer,
  HundredFiftyWordAnswer,
} from "@/components/publishing";
import type { Reference } from "@/components/publishing/types";
import { RelatedGuides } from "@/components/knowledge/related-guides";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";

// ---------------------------------------------------------------------------
// Shared citation registry — GLP-1 comparison literature
// ---------------------------------------------------------------------------

const glpComparisonReferences: Reference[] = [
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
    title: "The discovery and development of liraglutide and semaglutide.",
    journal: "Frontiers in Endocrinology",
    volume: "10",
    pages: "155",
    doi: "10.3389/fendo.2019.00155",
    pmid: "31031702",
  },
  {
    id: "coskun-2022",
    authors: ["Coskun T", "Urva S", "Roell WC", "et al."],
    year: 2022,
    title:
      "LY3437943, a novel triple glucagon, GIP and GLP-1 receptor agonist for glycemic control and weight loss.",
    journal: "Cell Metabolism",
    volume: "34",
    issue: "9",
    pages: "1234-1247.e9",
    doi: "10.1016/j.cmet.2022.07.013",
    pmid: "35914543",
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
    id: "frias-2021",
    authors: ["Frías JP", "Davies MJ", "Rosenstock J", "et al."],
    year: 2021,
    title:
      "Tirzepatide versus semaglutide once weekly in patients with type 2 diabetes (SURPASS-2).",
    journal: "New England Journal of Medicine",
    volume: "385",
    issue: "6",
    pages: "503-515",
    doi: "10.1056/NEJMoa2107519",
    pmid: "34170647",
  },
  {
    id: "jastreboff-2022",
    authors: ["Jastreboff AM", "Aronne LJ", "Ahmad NN", "et al."],
    year: 2022,
    title:
      "Tirzepatide once weekly for the treatment of obesity (SURMOUNT-1).",
    journal: "New England Journal of Medicine",
    volume: "387",
    issue: "3",
    pages: "205-216",
    doi: "10.1056/NEJMoa2206038",
    pmid: "35658024",
  },
  {
    id: "marso-2016-leader",
    authors: ["Marso SP", "Daniels GH", "Brown-Frandsen K", "et al."],
    year: 2016,
    title:
      "Liraglutide and cardiovascular outcomes in type 2 diabetes (LEADER).",
    journal: "New England Journal of Medicine",
    volume: "375",
    issue: "4",
    pages: "311-322",
    doi: "10.1056/NEJMoa1603827",
    pmid: "27295427",
  },
  {
    id: "pratley-2018",
    authors: ["Pratley R", "Amod A", "Hoff ST", "et al."],
    year: 2018,
    title:
      "Oral semaglutide versus subcutaneous liraglutide and placebo in type 2 diabetes (PIONEER 4).",
    journal: "Lancet",
    volume: "394",
    issue: "10192",
    pages: "39-50",
    doi: "10.1016/S0140-6736(19)31271-1",
    pmid: "31186120",
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

function ComparisonTable({
  caption,
  columns,
  rows,
}: {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly (string | ReactNode)[])[];
}) {
  return (
    <div className="overflow-x-auto border border-navy-deep/10">
      <table className="w-full text-sm">
        <caption className="text-left px-4 py-2 text-xs font-semibold tracking-wide text-gold bg-navy-deep/5">
          {caption}
        </caption>
        <thead>
          <tr className="bg-navy-deep/5">
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="text-left px-4 py-2 font-semibold text-navy-deep border-b border-navy-deep/10"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-navy-deep/[0.02]">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-2 align-top border-b border-navy-deep/5 text-navy-deep/90"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function refWrap(node: ReactNode): ReactNode {
  return (
    <ReferenceProvider references={glpComparisonReferences}>
      {node}
      <div className="mt-6">
        <ReferenceList references={glpComparisonReferences} />
      </div>
    </ReferenceProvider>
  );
}

const revisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-10-15",
    summary:
      "Authority Sprint 2D — initial publication of GLP-1 comparison guides.",
    author: "Editorial Team",
  },
];

// ---------------------------------------------------------------------------
// Comparison content types
// ---------------------------------------------------------------------------

export interface ComparisonContent {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  faqs: readonly { question: string; answer: string }[];
  buildLayout: () => GuideLayoutProps;
  extendedAnswer: ReactNode;
}

// ---------------------------------------------------------------------------
// 1) Semaglutide vs Retatrutide
// ---------------------------------------------------------------------------

const semaVsReta: ComparisonContent = {
  slug: "semaglutide-vs-retatrutide",
  title: "Semaglutide vs Retatrutide",
  description:
    "Side-by-side scientific comparison of Semaglutide (long-acting GLP-1 mono-agonist) and Retatrutide (investigational GLP-1/GIP/GCG triple agonist) — receptor coverage, structural chemistry, pharmacokinetics, evidence maturity and research applications.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What is the key difference between Semaglutide and Retatrutide?",
      answer:
        "Semaglutide is a selective GLP-1 receptor agonist. Retatrutide (LY3437943) is an investigational triple agonist engaging GLP-1, GIP and glucagon receptors from a single molecule. Semaglutide has a large approved-therapeutic evidence base; Retatrutide is preclinical and early-clinical.",
    },
    {
      question: "Which receptors does each compound target?",
      answer:
        "Semaglutide selectively agonises GLP-1R. Retatrutide agonises GLP-1R, GIPR and GCGR from one molecule. The addition of GIP and glucagon receptor activity defines the triple-agonist class and distinguishes Retatrutide from mono-agonists.",
    },
    {
      question: "Which compound has stronger published evidence?",
      answer:
        "Semaglutide has by far the larger published evidence base, with landmark cardiovascular and renal outcomes trials (SUSTAIN-6, SELECT, FLOW). Retatrutide evidence is currently limited to preclinical work and early-phase clinical trials (phase 1 and 2).",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer
      title="Extended answer"
      question="How do Semaglutide and Retatrutide compare?"
    >
      Semaglutide is a synthetic long-acting GLP-1 receptor agonist derived
      from native GLP-1(7-37), engineered with an Aib8 substitution and a
      C18 fatty-di-acid at Lys26 that supports albumin binding. It is a
      selective GLP-1 mono-agonist with a plasma half-life of approximately
      one week and an extensive human evidence base spanning glycaemic,
      cardiovascular, renal and hepatic endpoints. Retatrutide (LY3437943)
      is an investigational triple agonist engineered to activate the
      GLP-1, GIP and glucagon receptors from a single molecule. It carries
      a fatty-acid modification that supports once-weekly kinetics but its
      evidence base is currently preclinical and early clinical — phase 2
      obesity data have been published, phase 3 outcome data have not. The
      pharmacological distinction is receptor coverage; the clinical
      distinction is evidence maturity. Oxford Research Peptides supplies
      both compounds as lyophilised reference standards for in-vitro
      laboratory research only.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => ({
    categoryId: "comparisons",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
          COMPARISON
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">
          Semaglutide vs Retatrutide
        </h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A structured, evidence-based comparison of a selective GLP-1
          receptor agonist and an investigational GLP-1/GIP/GCG triple
          agonist — for researchers working with either compound as a
          reference standard.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide is a long-acting selective GLP-1 receptor agonist with
        a large human evidence base. Retatrutide is an investigational
        triple agonist (GLP-1R + GIPR + GCGR) with preclinical and
        early-clinical evidence. The two compounds differ primarily in
        receptor coverage and evidence maturity, not in the core
        albumin-binding half-life-extension strategy they share.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Semaglutide class", value: "Selective GLP-1R agonist" },
          {
            label: "Retatrutide class",
            value: "Triple agonist (GLP-1R + GIPR + GCGR)",
          },
          { label: "Semaglutide half-life", value: "≈ 1 week" },
          { label: "Retatrutide half-life", value: "≈ 6 days (reported phase 1)" },
          { label: "Semaglutide evidence tier", value: "Landmark RCTs" },
          { label: "Retatrutide evidence tier", value: "Phase 2 / preclinical" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Scientific overview
        </h2>
        <P>
          Both Semaglutide and Retatrutide are engineered peptide agonists
          in the incretin-mimetic family. Semaglutide is a well-characterised
          selective GLP-1 receptor agonist described in the peer-reviewed
          literature since 2015.<Cite refId="lau-2015" /> Retatrutide
          (LY3437943) is an investigational triple agonist described by
          Coskun and colleagues in 2022 and evaluated in an obesity phase 2
          trial reported in 2023.<Cite refId="coskun-2022" /><Cite refId="jastreboff-2023" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Mechanism comparison
        </h2>
        <P>
          Semaglutide activates GLP-1R alone. Downstream signalling engages
          Gαs → adenylyl cyclase → cAMP with PKA and EPAC2 effectors,
          producing glucose-dependent insulinotropic and glucagonostatic
          effects and slowing gastric emptying. Retatrutide additionally
          engages GIPR and GCGR from the same molecule, adding an
          insulinotropic GIP arm and a hepatic glucagon arm that
          contributes to energy expenditure in preclinical models.<Cite refId="coskun-2022" />
        </P>

        <ComparisonTable
          caption="Receptor targets and mechanism"
          columns={["Feature", "Semaglutide", "Retatrutide"]}
          rows={[
            ["Compound class", "Selective GLP-1R agonist", "Triple agonist (GLP-1R + GIPR + GCGR)"],
            ["Primary receptor", "GLP-1R (class B GPCR)", "GLP-1R + GIPR + GCGR (class B GPCRs)"],
            ["G-protein coupling", "Gαs → cAMP → PKA / EPAC2", "Gαs (all three receptors) → cAMP"],
            ["Insulinotropic effect", "Yes (GLP-1R, glucose-dependent)", "Yes (GLP-1R + GIPR, glucose-dependent)"],
            ["Glucagonostatic effect", "Yes (GLP-1R, glucose-dependent)", "Partial (GLP-1R offset by GCGR arm)"],
            ["Hepatic energy expenditure arm", "No direct", "Yes (via GCGR)"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Receptor selectivity comparison
        </h2>
        <P>
          Semaglutide is selective at GLP-1R and does not activate GIPR or
          GCGR at pharmacologically meaningful concentrations. Retatrutide
          is engineered as a balanced multi-receptor ligand; reported
          in-vitro potencies at the three receptors are of the same order
          of magnitude, though relative activity is compound- and
          assay-dependent.<Cite refId="coskun-2022" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Pharmacokinetic comparison
        </h2>
        <ComparisonTable
          caption="Reported pharmacokinetics"
          columns={["Parameter", "Semaglutide", "Retatrutide"]}
          rows={[
            ["Plasma half-life (human, SC)", "≈ 1 week", "≈ 6 days (reported)"],
            ["Half-life extension strategy", "Aib8 + C18 di-acid acylation + γGlu-2xOEG spacer", "Fatty-acid acylation supporting albumin binding"],
            ["Route (approved / investigational)", "Once-weekly SC (Ozempic/Wegovy); once-daily oral with SNAC (Rybelsus)", "Once-weekly SC (investigational)"],
            ["Albumin binding", "> 99%", "High (fatty-acid-mediated)"],
            ["Clearance", "Proteolysis; renal + faecal excretion of metabolites", "Proteolysis (early-phase data)"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Research applications comparison
        </h2>
        <ComparisonTable
          caption="Research applications and evidence maturity"
          columns={["Research area", "Semaglutide", "Retatrutide"]}
          rows={[
            ["Type 2 diabetes", "Landmark RCTs (SUSTAIN-6)", "Phase 2 signal"],
            ["Obesity / weight change", "Landmark RCTs (STEP-1)", "Phase 2 signal (Jastreboff 2023)"],
            ["Cardiovascular outcomes", "SUSTAIN-6, SELECT", "Not established"],
            ["Renal outcomes", "FLOW", "Not established"],
            ["Hepatic (MASH)", "Imaging and biopsy studies", "Preclinical signals"],
            ["CNS / neuroinflammation", "Preclinical + early clinical", "Preclinical"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Human evidence comparison
        </h2>
        <P>
          Semaglutide's human evidence base is substantial and includes
          cardiovascular outcomes in type 2 diabetes (SUSTAIN-6),<Cite refId="marso-2016" />
          {" "}weight change in overweight/obesity (STEP-1),<Cite refId="wilding-2021" />
          {" "}and multiple additional endpoints across the SUSTAIN, STEP,
          PIONEER, SELECT and FLOW programmes. Retatrutide's human evidence
          is currently a single published phase 2 obesity trial and
          associated early-phase data.<Cite refId="jastreboff-2023" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Preclinical evidence comparison
        </h2>
        <P>
          Both compounds have substantial published preclinical
          pharmacology. Semaglutide's preclinical characterisation
          established GLP-1R selectivity and central neural circuit
          mapping.<Cite refId="lau-2015" /> Retatrutide's preclinical
          characterisation established balanced tri-receptor activity in
          rodent and non-human primate models.<Cite refId="coskun-2022" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Advantages and limitations
        </h2>
        <UL>
          <li>
            <strong>Semaglutide — advantages:</strong> extensive human
            evidence, well-characterised receptor pharmacology, oral and
            subcutaneous formulations, established assay methodology.
          </li>
          <li>
            <strong>Semaglutide — limitations:</strong> mono-agonism may
            miss additive effects available with multi-receptor ligands;
            assay potency is highly sensitive to albumin content.
          </li>
          <li>
            <strong>Retatrutide — advantages:</strong> broader receptor
            coverage in one molecule, promising early efficacy signals in
            phase 2.
          </li>
          <li>
            <strong>Retatrutide — limitations:</strong> limited human
            evidence base; long-term safety and cardiovascular / renal
            outcome data not yet published; investigational status.
          </li>
        </UL>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Research context
        </h2>
        <P>
          Comparative in-vitro work involving both compounds must control
          rigorously for buffer albumin content and plasticware surface
          area — the two ligands' apparent EC<sub>50</sub> values shift
          substantially with these variables.
        </P>

        <ImportantNote title="Research-use framing">
          This comparison summarises published pharmacology. Oxford
          Research Peptides supplies Retatrutide as
          lyophilised reference standards for in-vitro laboratory research
          only. Nothing here constitutes medical advice.
        </ImportantNote>

        <p className="text-sm text-navy-deep/80">
          Related reading:{" "}
          <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
          <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/literature/sustain-6">SUSTAIN-6</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/research-hub/literature/select-trial">SELECT</a>.
        </p>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Semaglutide pharmacology and clinical evidence are supported by a large peer-reviewed literature. Retatrutide pharmacology is well characterised preclinically with early-phase clinical data. Comparative claims are consistent with published sources."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "No head-to-head randomised trial of Semaglutide vs Retatrutide has been published.",
          "Retatrutide evidence is limited to preclinical and early-phase clinical data; long-term outcomes are not established.",
          "In-vitro potency comparisons of acylated GLP-1 peptides are highly sensitive to assay conditions.",
          "Approved-therapeutic evidence for Semaglutide does not describe or endorse research-use handling of reference-standard material.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={revisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-15",
    lastUpdated: "2026-10-15",
  }),
};

// ---------------------------------------------------------------------------
// 2) Semaglutide vs Tirzepatide
// ---------------------------------------------------------------------------

const semaVsTirz: ComparisonContent = {
  slug: "semaglutide-vs-tirzepatide",
  title: "Semaglutide vs Tirzepatide",
  description:
    "Comparison of Semaglutide (selective GLP-1 receptor agonist) and Tirzepatide (dual GLP-1/GIP receptor agonist) — mechanism, pharmacokinetics, published head-to-head evidence (SURPASS-2, SURMOUNT-1) and research applications.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "How does Tirzepatide differ from Semaglutide?",
      answer:
        "Tirzepatide is a dual GLP-1 / GIP receptor agonist. Semaglutide is a selective GLP-1 receptor agonist. Tirzepatide's additional GIP receptor activity is the defining pharmacological difference.",
    },
    {
      question: "Is there head-to-head trial evidence?",
      answer:
        "Yes. SURPASS-2 reported head-to-head data of once-weekly Tirzepatide versus once-weekly Semaglutide 1 mg in adults with type 2 diabetes, with Tirzepatide showing greater HbA1c and body-weight reductions.",
    },
    {
      question: "Do both compounds share the same albumin-binding strategy?",
      answer:
        "Both use fatty-acid acylation to support reversible albumin binding and once-weekly kinetics, but the specific side-chain chemistry differs — Semaglutide uses a C18 di-acid with a γGlu-2xOEG spacer; Tirzepatide uses a C20 di-acid with its own linker.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer
      title="Extended answer"
      question="How do Semaglutide and Tirzepatide compare?"
    >
      Semaglutide is a selective agonist of the GLP-1 receptor derived
      from native GLP-1(7-37) with Aib8 substitution and a C18 fatty-
      di-acid at Lys26 for albumin binding, supporting once-weekly
      subcutaneous kinetics with a ~1-week plasma half-life. Tirzepatide
      is a dual GLP-1 / GIP receptor agonist engineered from the GIP
      backbone, with a C20 fatty-di-acid modification that similarly
      supports once-weekly kinetics. The two compounds share a common
      long-acting acylation strategy but differ in receptor coverage:
      Tirzepatide adds GIP receptor activity, while Semaglutide remains
      selective at GLP-1R. Published head-to-head evidence in type 2
      diabetes (SURPASS-2) and separate obesity trials (STEP-1 vs
      SURMOUNT-1) show consistently greater efficacy for Tirzepatide on
      HbA1c and weight endpoints, though safety and outcome data continue
      to accumulate for both compounds. Oxford Research Peptides supplies
      Semaglutide as an in-vitro reference standard only.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => ({
    categoryId: "comparisons",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
          COMPARISON
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">
          Semaglutide vs Tirzepatide
        </h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          Structured comparison of a selective GLP-1 receptor agonist and
          a dual GLP-1 / GIP receptor agonist — mechanism, pharmacokinetics
          and the published head-to-head evidence base.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Semaglutide selectively agonises GLP-1R. Tirzepatide is a dual
        agonist adding GIP receptor activity. Both use fatty-acid
        acylation for albumin binding and once-weekly kinetics.
        Head-to-head evidence in type 2 diabetes (SURPASS-2) and
        separate obesity trials show consistently greater HbA1c and body-
        weight reduction with Tirzepatide.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Semaglutide class", value: "Selective GLP-1R agonist" },
          { label: "Tirzepatide class", value: "Dual GLP-1R / GIPR agonist" },
          { label: "Half-life (both)", value: "≈ 5–7 days (SC, once-weekly)" },
          {
            label: "Head-to-head evidence",
            value: "SURPASS-2 (T2D, published 2021)",
          },
          {
            label: "Approved status (UK)",
            value: "Both approved (Semaglutide, Tirzepatide) via MHRA",
          },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Scientific overview
        </h2>
        <P>
          Semaglutide is a modified GLP-1 analogue described in 2015 as a
          once-weekly selective GLP-1R agonist.<Cite refId="lau-2015" />
          {" "}Tirzepatide (LY3298176) is a dual GLP-1R / GIPR agonist
          engineered from the GIP backbone with substitutions that
          confer GLP-1R activity, and evaluated in head-to-head trials
          against Semaglutide in type 2 diabetes.<Cite refId="frias-2021" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Mechanism comparison
        </h2>
        <P>
          Both compounds engage Gαs → cAMP signalling at their respective
          receptors. Semaglutide activates GLP-1R only. Tirzepatide
          engages GLP-1R and GIPR, with reported partial biased signalling
          — full efficacy at GIPR, sub-maximal β-arrestin recruitment at
          GLP-1R in some reports. Downstream effects (insulinotropic,
          gastric emptying, central appetite) overlap but relative
          contributions differ.
        </P>

        <ComparisonTable
          caption="Receptor targets and mechanism"
          columns={["Feature", "Semaglutide", "Tirzepatide"]}
          rows={[
            ["Compound class", "Selective GLP-1R agonist", "Dual GLP-1R / GIPR agonist"],
            ["Primary receptors", "GLP-1R", "GLP-1R + GIPR"],
            ["Backbone", "Modified GLP-1(7-37)", "Modified GIP backbone"],
            ["Fatty-acid modification", "C18 di-acid at Lys26 (γGlu-2xOEG spacer)", "C20 di-acid at Lys20"],
            ["DPP-4-resistant substitution", "Aib8", "Aib2 + Aib13"],
            ["Second messenger", "cAMP (Gαs)", "cAMP (Gαs) at both receptors"],
            ["Reported bias", "Balanced G-protein / arrestin at GLP-1R", "Partial arrestin bias reported at GLP-1R"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Receptor selectivity
        </h2>
        <P>
          Semaglutide is selective at GLP-1R with no meaningful GIPR or
          GCGR activity at pharmacologically relevant concentrations.
          Tirzepatide engages GLP-1R and GIPR from a single molecule; it
          does not activate GCGR at pharmacologically meaningful
          concentrations, distinguishing it from triple agonists such as
          Retatrutide.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Pharmacokinetic comparison
        </h2>
        <ComparisonTable
          caption="Reported pharmacokinetics"
          columns={["Parameter", "Semaglutide", "Tirzepatide"]}
          rows={[
            ["Plasma half-life (human, SC)", "≈ 1 week", "≈ 5 days"],
            ["Route", "SC once-weekly; oral once-daily (with SNAC)", "SC once-weekly"],
            ["Albumin binding", "> 99% (C18 di-acid)", "> 99% (C20 di-acid)"],
            ["Steady state (SC)", "≈ 4–5 weeks", "≈ 4 weeks"],
            ["Clearance", "Proteolysis; renal/faecal metabolite excretion", "Proteolysis"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Research applications comparison
        </h2>
        <ComparisonTable
          caption="Research applications and evidence maturity"
          columns={["Research area", "Semaglutide", "Tirzepatide"]}
          rows={[
            ["Type 2 diabetes", "Landmark RCTs (SUSTAIN-6)", "Landmark RCTs (SURPASS programme)"],
            ["Obesity", "STEP programme", "SURMOUNT programme"],
            ["Cardiovascular outcomes", "SUSTAIN-6, SELECT", "SURPASS-CVOT (data emerging)"],
            ["Renal outcomes", "FLOW", "Under investigation"],
            ["MASH / hepatic", "Imaging + biopsy studies", "Phase 2 signals"],
            ["Head-to-head", "vs Tirzepatide (SURPASS-2)", "vs Semaglutide (SURPASS-2)"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Human evidence
        </h2>
        <P>
          SURPASS-2 compared once-weekly Tirzepatide (5, 10, 15 mg) with
          once-weekly Semaglutide 1 mg in adults with type 2 diabetes and
          reported greater HbA1c and body-weight reduction with
          Tirzepatide across all three doses.<Cite refId="frias-2021" />
          {" "}SURMOUNT-1 reported obesity outcomes for Tirzepatide;<Cite refId="jastreboff-2022" />
          {" "}STEP-1 reported obesity outcomes for Semaglutide.<Cite refId="wilding-2021" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Preclinical evidence
        </h2>
        <P>
          Preclinical characterisation of both compounds established
          receptor engagement, cAMP signalling and in-vivo metabolic
          effects. Reported in-vitro potencies differ across assays and
          are sensitive to albumin content — comparative claims require
          matched assay conditions.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Advantages and limitations
        </h2>
        <UL>
          <li><strong>Semaglutide — advantages:</strong> largest human evidence base including cardiovascular and renal outcomes; oral and subcutaneous formulations.</li>
          <li><strong>Semaglutide — limitations:</strong> mono-agonism may deliver less efficacy on HbA1c and weight than dual/triple agonists in head-to-head trials.</li>
          <li><strong>Tirzepatide — advantages:</strong> greater HbA1c and body-weight reduction in published head-to-head data; balanced dual-agonism.</li>
          <li><strong>Tirzepatide — limitations:</strong> newer molecule, cardiovascular outcome data still accumulating; single approved route (SC).</li>
        </UL>

        <ImportantNote title="Research-use framing">
          Both compounds are described here as published research
          pharmacology. This page does not describe or endorse any
          therapeutic use.
        </ImportantNote>

        <p className="text-sm text-navy-deep/80">
          Related reading:{" "}
          <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/what-is-semaglutide">What is Semaglutide</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-mechanism-of-action">Semaglutide mechanism of action</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/literature/sustain-6">SUSTAIN-6</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/research-hub/literature/step-programme">STEP programme</a>.
        </p>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Head-to-head evidence (SURPASS-2) and separate large trials for both compounds provide a robust basis for the comparison. Mechanistic and pharmacokinetic claims are supported by primary literature."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "SURPASS-2 compared a single Semaglutide dose (1 mg) against three Tirzepatide doses — not a full dose-range comparison.",
          "Cardiovascular and renal outcome data for Tirzepatide are still accumulating.",
          "Between-assay potency comparisons of acylated peptides are sensitive to buffer and plasticware.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={revisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-15",
    lastUpdated: "2026-10-15",
  }),
};

// ---------------------------------------------------------------------------
// 3) Semaglutide vs Liraglutide
// ---------------------------------------------------------------------------

const semaVsLira: ComparisonContent = {
  slug: "semaglutide-vs-liraglutide",
  title: "Semaglutide vs Liraglutide",
  description:
    "Comparison of two acylated GLP-1 receptor agonists — Semaglutide (once-weekly, C18 di-acid) and Liraglutide (once-daily, C16 mono-acid). Shared receptor pharmacology, differing acylation chemistry and evidence base.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What is the key difference between Semaglutide and Liraglutide?",
      answer:
        "Both are acylated GLP-1 receptor agonists from Novo Nordisk with similar core pharmacology. Liraglutide uses a C16 fatty-mono-acid supporting a ~13-hour half-life and once-daily dosing; Semaglutide uses a C18 fatty-di-acid with a longer γGlu-2xOEG spacer supporting a ~1-week half-life and once-weekly dosing.",
    },
    {
      question: "Do both have cardiovascular outcome evidence?",
      answer:
        "Yes. Liraglutide's cardiovascular safety was established in LEADER (2016); Semaglutide's in SUSTAIN-6 (2016) and SELECT (2023). Both compounds have GLP-1R agonist class-consistent cardiovascular signals in their respective trial populations.",
    },
    {
      question: "Which is more potent in vitro?",
      answer:
        "In-vitro potency comparisons of acylated GLP-1 analogues are highly sensitive to assay conditions, particularly buffer albumin content. Reported EC50 values are of comparable order of magnitude but strict potency ranking requires matched conditions.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer
      title="Extended answer"
      question="How do Semaglutide and Liraglutide compare?"
    >
      Semaglutide and Liraglutide are both acylated GLP-1 receptor
      agonists derived from native GLP-1(7-37), differing primarily in
      the chemistry of their fatty-acid modification and in the resulting
      pharmacokinetic profile. Liraglutide carries a C16 fatty-mono-acid
      attached at Lys26 through a γGlu linker, supporting a plasma half-
      life of approximately 13 hours and once-daily subcutaneous dosing.
      Semaglutide carries a C18 fatty-di-acid attached at the same
      position through a longer γGlu-2xOEG spacer, supporting reversible
      albumin binding of higher affinity and a plasma half-life of
      approximately one week — enabling once-weekly subcutaneous dosing
      and (with SNAC) once-daily oral dosing. Their receptor pharmacology
      at GLP-1R is very similar; the practical differences arise from
      dosing frequency, cumulative exposure profile and evidence base.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => ({
    categoryId: "comparisons",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
          COMPARISON
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">
          Semaglutide vs Liraglutide
        </h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          Two acylated GLP-1 receptor agonists that share receptor
          pharmacology but differ in acylation chemistry, half-life and
          dosing frequency.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Both compounds are selective GLP-1 receptor agonists engineered
        with fatty-acid modifications for albumin binding. Liraglutide's
        C16 mono-acid gives a ~13-hour half-life supporting once-daily
        dosing; Semaglutide's C18 di-acid with a longer spacer gives a
        ~1-week half-life supporting once-weekly dosing.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Both class", value: "Selective GLP-1R agonist (acylated)" },
          { label: "Semaglutide half-life", value: "≈ 1 week" },
          { label: "Liraglutide half-life", value: "≈ 13 hours" },
          { label: "Semaglutide acylation", value: "C18 di-acid, γGlu-2xOEG spacer" },
          { label: "Liraglutide acylation", value: "C16 mono-acid, γGlu spacer" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Scientific overview
        </h2>
        <P>
          Liraglutide was the first once-daily acylated GLP-1 receptor
          agonist. Semaglutide is its long-acting successor, engineered
          with a longer fatty-acid modification and spacer to support
          once-weekly kinetics.<Cite refId="knudsen-2019" /> Both were
          developed within the same programme and share the core
          GLP-1(7-37) backbone with modifications.<Cite refId="lau-2015" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Mechanism comparison
        </h2>
        <P>
          Receptor pharmacology at GLP-1R is very similar between the two.
          Both engage Gαs → cAMP → PKA/EPAC2 signalling, produce
          glucose-dependent insulinotropic and glucagonostatic effects,
          slow gastric emptying and act on central appetite pathways. The
          principal pharmacological difference is exposure profile driven
          by acylation chemistry.
        </P>

        <ComparisonTable
          caption="Molecular modifications"
          columns={["Feature", "Semaglutide", "Liraglutide"]}
          rows={[
            ["Backbone", "Modified GLP-1(7-37)", "Modified GLP-1(7-37)"],
            ["DPP-4 resistance", "Aib8 substitution", "No Aib8 substitution (relies on acylation for DPP-4 shielding + albumin binding)"],
            ["Acylation site", "Lys26", "Lys26"],
            ["Fatty-acid chemistry", "C18 di-acid (octadecanedioic)", "C16 mono-acid (palmitic)"],
            ["Linker", "γGlu + 2×OEG (2-[2-(2-aminoethoxy)ethoxy]acetyl)", "γGlu"],
            ["Result", "≈ 1 week plasma half-life", "≈ 13 h plasma half-life"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Receptor selectivity
        </h2>
        <P>
          Both are selective at GLP-1R with no pharmacologically
          meaningful activity at GIPR or GCGR. This distinguishes both
          from dual (Tirzepatide) and triple (Retatrutide) agonists.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Pharmacokinetic comparison
        </h2>
        <ComparisonTable
          caption="Reported pharmacokinetics"
          columns={["Parameter", "Semaglutide", "Liraglutide"]}
          rows={[
            ["Plasma half-life (SC)", "≈ 1 week", "≈ 13 hours"],
            ["Dosing frequency", "Once weekly (SC); once daily (oral, with SNAC)", "Once daily (SC)"],
            ["Time to steady state", "≈ 4–5 weeks", "≈ 2 days"],
            ["Albumin binding", "> 99%", "> 98%"],
            ["Clearance", "Proteolysis; renal/faecal metabolite excretion", "Proteolysis; renal/faecal metabolite excretion"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Research applications comparison
        </h2>
        <ComparisonTable
          caption="Research applications and evidence maturity"
          columns={["Research area", "Semaglutide", "Liraglutide"]}
          rows={[
            ["Type 2 diabetes", "SUSTAIN-6 (CV outcomes)", "LEADER (CV outcomes)"],
            ["Obesity", "STEP programme", "SCALE programme"],
            ["Cardiovascular outcomes", "SUSTAIN-6, SELECT", "LEADER"],
            ["Renal outcomes", "FLOW", "LEADER renal secondary endpoints"],
            ["Head-to-head evidence", "vs Liraglutide (PIONEER 4, oral)", "vs Semaglutide (PIONEER 4)"],
          ]}
        />

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Human evidence
        </h2>
        <P>
          Liraglutide's cardiovascular outcome evidence derives from
          LEADER,<Cite refId="marso-2016-leader" /> Semaglutide's from
          SUSTAIN-6.<Cite refId="marso-2016" /> Head-to-head data comparing
          oral Semaglutide with subcutaneous Liraglutide were reported in
          PIONEER 4.<Cite refId="pratley-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Preclinical evidence
        </h2>
        <P>
          Both compounds have detailed published preclinical
          characterisation at GLP-1R. Receptor pharmacology is
          fundamentally similar; the acylation-driven differences appear
          primarily as pharmacokinetic and biodistribution differences.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">
          Advantages and limitations
        </h2>
        <UL>
          <li><strong>Semaglutide — advantages:</strong> once-weekly kinetics; larger and more recent human evidence base; oral formulation.</li>
          <li><strong>Semaglutide — limitations:</strong> longer time to steady state; more sensitive assay methodology.</li>
          <li><strong>Liraglutide — advantages:</strong> shorter time to steady state; well-established once-daily kinetics; long real-world evidence.</li>
          <li><strong>Liraglutide — limitations:</strong> daily dosing burden; smaller more recent evidence base than Semaglutide.</li>
        </UL>

        <ImportantNote title="Research-use framing">
          This page
          summarises published pharmacology of both compounds for
          educational purposes only.
        </ImportantNote>

        <p className="text-sm text-navy-deep/80">
          Related reading:{" "}
          <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/albumin-binding-half-life-extension">Albumin binding and half-life extension</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-pharmacokinetics">Semaglutide pharmacokinetics</a>,{" "}
          <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/research-hub/literature/sustain-6">SUSTAIN-6</a>.
        </p>
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Both compounds have detailed peer-reviewed pharmacology, pharmacokinetic and outcome-trial literature supporting the comparative claims made here."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "Head-to-head evidence is limited to a small number of trials, one of which used oral Semaglutide vs SC Liraglutide.",
          "In-vitro potency between acylated peptides is highly sensitive to albumin and plasticware.",
          "Approved-therapeutic clinical data do not describe or endorse research-use scenarios.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["semaglutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="semaglutide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={revisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-10-15",
    lastUpdated: "2026-10-15",
  }),
};

// ---------------------------------------------------------------------------
// Registry + lookup
// ---------------------------------------------------------------------------

const comparisonRegistry: readonly ComparisonContent[] = [
  semaVsReta,
  semaVsTirz,
  semaVsLira,
];

export function getComparisonContent(slug: string): ComparisonContent | undefined {
  return comparisonRegistry.find((c) => c.slug === slug);
}
