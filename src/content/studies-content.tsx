/**
 * Authority Sprint 2D — Study (literature review) content.
 *
 * Four foundation study summaries rendered through the existing
 * GuideLayout shell. Educational literature summaries only — no
 * therapeutic advice, no clinical guidance.
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
import { getStudy } from "@/lib/taxonomy";

// ---------------------------------------------------------------------------
// Shared literature citations
// ---------------------------------------------------------------------------

const literatureRefs: Reference[] = [
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
    id: "davies-2021",
    authors: ["Davies M", "Færch L", "Jeppesen OK", "et al."],
    year: 2021,
    title:
      "Semaglutide 2·4 mg once a week in adults with overweight or obesity and type 2 diabetes (STEP 2).",
    journal: "Lancet",
    volume: "397",
    issue: "10278",
    pages: "971-984",
    doi: "10.1016/S0140-6736(21)00213-0",
    pmid: "33667417",
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
// Helpers
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
function refWrap(node: ReactNode): ReactNode {
  return (
    <ReferenceProvider references={literatureRefs}>
      {node}
      <div className="mt-6">
        <ReferenceList references={literatureRefs} />
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
      "Authority Sprint 2D — initial publication of GLP-1 foundation study summaries.",
    author: "Editorial Team",
  },
];

// ---------------------------------------------------------------------------
// Study content type
// ---------------------------------------------------------------------------

export interface StudyContent {
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
// SUSTAIN-6
// ---------------------------------------------------------------------------

const sustain6: StudyContent = {
  slug: "sustain-6",
  title: "SUSTAIN-6 — Cardiovascular outcomes with Semaglutide in type 2 diabetes",
  description:
    "Educational literature summary of SUSTAIN-6, the randomised trial evaluating cardiovascular outcomes of once-weekly subcutaneous Semaglutide versus placebo in adults with type 2 diabetes at high cardiovascular risk.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What did SUSTAIN-6 evaluate?",
      answer:
        "SUSTAIN-6 evaluated the cardiovascular safety of once-weekly subcutaneous Semaglutide (0.5 mg and 1.0 mg) versus placebo in 3,297 adults with type 2 diabetes at high cardiovascular risk over a median 2.1 years.",
    },
    {
      question: "What was the primary outcome?",
      answer:
        "A composite of cardiovascular death, non-fatal myocardial infarction and non-fatal stroke (three-point MACE). The trial reported a reduction in the primary composite endpoint with Semaglutide versus placebo.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer title="Extended answer" question="What was SUSTAIN-6?">
      SUSTAIN-6 was a randomised, double-blind, placebo-controlled
      cardiovascular outcomes trial designed to evaluate the
      cardiovascular safety of once-weekly subcutaneous Semaglutide in
      adults with type 2 diabetes at high cardiovascular risk. Published
      in the New England Journal of Medicine in 2016, it enrolled 3,297
      participants and followed them for a median of 2.1 years. The
      primary endpoint was a composite of cardiovascular death, non-fatal
      myocardial infarction and non-fatal stroke (three-point MACE).
      Semaglutide met the pre-specified non-inferiority criterion versus
      placebo and showed a statistically significant reduction in the
      primary composite outcome. SUSTAIN-6 was pivotal in establishing
      the cardiovascular safety profile of Semaglutide and shaped
      subsequent GLP-1 receptor agonist clinical development. Oxford
      Research Peptides describes this trial for educational purposes
      only.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => {
    const s = getStudy("sustain-6");
    return {
      categoryId: "literature",
      hero: (
        <>
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
            LITERATURE REVIEW · CARDIOVASCULAR OUTCOMES TRIAL
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">
            SUSTAIN-6
          </h1>
          <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
            Semaglutide and cardiovascular outcomes in patients with type 2
            diabetes — Marso et al., New England Journal of Medicine, 2016.
          </p>
        </>
      ),
      quickAnswer: (
        <QuickAnswer>
          SUSTAIN-6 was a 3,297-patient randomised double-blind trial of
          once-weekly subcutaneous Semaglutide versus placebo in adults
          with type 2 diabetes at high cardiovascular risk. The primary
          three-point MACE composite (cardiovascular death, non-fatal MI,
          non-fatal stroke) was reduced with Semaglutide over a median
          follow-up of 2.1 years.
        </QuickAnswer>
      ),
      keyFacts: (
        <KeyFacts
          items={[
            { label: "Compound", value: "Semaglutide (0.5 mg, 1.0 mg SC weekly)" },
            { label: "Design", value: "Randomised, double-blind, placebo-controlled" },
            { label: "Population", value: "3,297 adults with T2D at high CV risk" },
            { label: "Follow-up (median)", value: "2.1 years" },
            { label: "Primary outcome", value: "3-point MACE (CV death, non-fatal MI, non-fatal stroke)" },
            { label: "Journal", value: "New England Journal of Medicine (2016)" },
            { label: "PMID", value: s?.pmid ?? "27633186" },
            { label: "DOI", value: s?.doi ?? "10.1056/NEJMoa1607141" },
          ]}
        />
      ),
      mainContent: refWrap(
        <Prose>
          <h2 className="font-display text-2xl font-medium text-navy-deep">Background</h2>
          <P>
            GLP-1 receptor agonists had established glycaemic efficacy in
            type 2 diabetes by the mid-2010s. Regulators required
            cardiovascular safety trials for new glucose-lowering agents.
            SUSTAIN-6 was Semaglutide's dedicated cardiovascular outcomes
            trial.<Cite refId="marso-2016" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Study design</h2>
          <P>
            Randomised, double-blind, placebo-controlled, event-driven
            trial. Participants were randomised 1:1:1:1 to Semaglutide
            0.5 mg weekly, Semaglutide 1.0 mg weekly, or matching placebo
            for each dose. All participants received standard-of-care
            glucose-lowering therapy.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Population</h2>
          <P>
            3,297 adults aged ≥ 50 years with type 2 diabetes and either
            established cardiovascular disease, chronic kidney disease, or
            both, or aged ≥ 60 years with cardiovascular risk factors.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Primary outcomes</h2>
          <P>
            The primary composite was cardiovascular death, non-fatal
            myocardial infarction, or non-fatal stroke (three-point MACE).
            Semaglutide reduced the primary composite versus placebo, with
            reductions in non-fatal stroke and non-fatal MI as leading
            components. Rates of retinopathy complications were higher
            with Semaglutide — a signal that has been discussed extensively
            in subsequent literature.<Cite refId="marso-2016" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Scientific significance</h2>
          <UL>
            <li>Established Semaglutide's cardiovascular safety profile.</li>
            <li>Contributed to the class-consistent view of GLP-1 receptor agonists as cardiovascular-neutral-to-beneficial.</li>
            <li>Framed subsequent Semaglutide trials in obesity (STEP), obesity without diabetes (SELECT) and CKD (FLOW).</li>
          </UL>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Limitations</h2>
          <ResearchLimitations
            items={[
              "SUSTAIN-6 was primarily designed as a non-inferiority CV safety trial rather than a superiority trial for efficacy.",
              "Median follow-up (2.1 years) is relatively short for cardiovascular endpoints.",
              "The retinopathy signal remains debated and may reflect rapid glycaemic reduction rather than a direct drug effect.",
              "Population was high-risk; results may not extrapolate to lower-risk populations.",
            ]}
          />

          <ImportantNote title="Research-use framing">
            This is an educational literature summary of a published
            clinical trial.
          </ImportantNote>

          <p className="text-sm text-navy-deep/80">
            Related reading:{" "}
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-mechanism-of-action">Semaglutide mechanism of action</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-research-applications">Semaglutide research applications</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/select-trial">SELECT trial</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/flow-trial">FLOW trial</a>.
          </p>
        </Prose>,
      ),
      evidenceSummary: (
        <EvidenceSummary
          level="strong"
          confidence="high"
          summary="Landmark peer-reviewed cardiovascular outcomes trial published in the New England Journal of Medicine (Marso et al. 2016). Findings are widely cited across the GLP-1 receptor agonist literature."
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
    };
  },
};

// ---------------------------------------------------------------------------
// STEP programme
// ---------------------------------------------------------------------------

const stepProgramme: StudyContent = {
  slug: "step-programme",
  title: "STEP programme — Semaglutide 2.4 mg in overweight and obesity",
  description:
    "Educational literature summary of the STEP programme (Semaglutide Treatment Effect in People with Obesity) — a family of randomised trials evaluating once-weekly Semaglutide 2.4 mg for weight management across multiple populations.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What is the STEP programme?",
      answer:
        "STEP is a family of randomised controlled trials (STEP-1 through STEP-8) evaluating once-weekly subcutaneous Semaglutide 2.4 mg for weight management in adults with overweight or obesity, across different populations and comparators.",
    },
    {
      question: "What did STEP-1 report?",
      answer:
        "STEP-1 (Wilding et al., NEJM 2021) reported significantly greater weight loss with once-weekly Semaglutide 2.4 mg than with placebo over 68 weeks in adults with overweight or obesity without diabetes, alongside lifestyle intervention in both arms.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer title="Extended answer" question="What is the STEP programme?">
      The STEP programme (Semaglutide Treatment Effect in People with
      Obesity) is a coordinated family of randomised controlled trials
      designed to evaluate once-weekly subcutaneous Semaglutide 2.4 mg
      for weight management across a range of populations and
      comparators. STEP-1 (Wilding et al., NEJM 2021) reported the
      pivotal placebo-controlled data in adults with overweight or
      obesity without diabetes. STEP-2 (Davies et al., Lancet 2021)
      extended these findings into adults with type 2 diabetes. Later
      trials in the programme evaluated dose intensification, maintenance
      after lifestyle-only run-in, cardiovascular risk factors and other
      subpopulations. Together, the programme established Semaglutide
      2.4 mg as a well-characterised weight-management intervention and
      supported its regulatory approval for chronic weight management.
      Oxford Research Peptides describes the STEP programme here as
      educational literature.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => {
    const s = getStudy("step-programme");
    return {
      categoryId: "literature",
      hero: (
        <>
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
            LITERATURE REVIEW · PROGRAMME
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">
            STEP programme
          </h1>
          <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
            Semaglutide Treatment Effect in People with Obesity — a family
            of randomised trials evaluating once-weekly Semaglutide 2.4 mg.
          </p>
        </>
      ),
      quickAnswer: (
        <QuickAnswer>
          STEP is a family of randomised controlled trials evaluating
          once-weekly subcutaneous Semaglutide 2.4 mg for weight
          management. STEP-1 established the pivotal placebo-controlled
          evidence in adults with overweight or obesity without diabetes;
          subsequent trials extended the evidence into type 2 diabetes,
          maintenance, dose intensification and cardiometabolic
          subpopulations.
        </QuickAnswer>
      ),
      keyFacts: (
        <KeyFacts
          items={[
            { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
            { label: "Design", value: "Randomised, double-blind, placebo- or active-controlled" },
            { label: "Population", value: "Adults with overweight or obesity" },
            { label: "Follow-up", value: "68 weeks (STEP-1)" },
            { label: "Primary outcome (STEP-1)", value: "Percent change in body weight" },
            { label: "Lead publication (STEP-1)", value: "NEJM 2021" },
            { label: "DOI (STEP-1)", value: s?.doi ?? "10.1056/NEJMoa2032183" },
          ]}
        />
      ),
      mainContent: refWrap(
        <Prose>
          <h2 className="font-display text-2xl font-medium text-navy-deep">Background</h2>
          <P>
            Earlier GLP-1 receptor agonist studies had reported modest
            weight change as a secondary outcome. The STEP programme was
            designed to evaluate once-weekly Semaglutide 2.4 mg at doses
            higher than those used in type 2 diabetes specifically for
            weight management.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Study design</h2>
          <P>
            Each STEP trial is randomised, double-blind and
            placebo-controlled (with active-comparator arms in some
            trials), typically over 68 weeks. All arms included lifestyle
            intervention (reduced-calorie diet and increased physical
            activity).
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Population</h2>
          <UL>
            <li>STEP-1: adults with overweight/obesity without diabetes.</li>
            <li>STEP-2: adults with overweight/obesity and type 2 diabetes.</li>
            <li>STEP-3: adults with overweight/obesity with intensive behavioural therapy.</li>
            <li>STEP-4: dose maintenance / withdrawal design.</li>
            <li>STEP-5: long-term (104 weeks).</li>
            <li>STEP-6 / 7 / 8: East Asian population, exercise-supported and comparator designs.</li>
          </UL>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Primary outcomes</h2>
          <P>
            The primary endpoint across the programme is percent change in
            body weight from baseline. STEP-1 reported approximately
            −14.9% change from baseline with Semaglutide 2.4 mg vs
            −2.4% with placebo at 68 weeks.<Cite refId="wilding-2021" />
            STEP-2 reported ~ −9.6% with Semaglutide 2.4 mg vs ~ −3.4%
            with placebo in adults with type 2 diabetes.<Cite refId="davies-2021" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Scientific significance</h2>
          <UL>
            <li>Established once-weekly Semaglutide 2.4 mg as a well-characterised weight-management intervention.</li>
            <li>Supported regulatory approvals for chronic weight management (as Wegovy).</li>
            <li>Framed subsequent large cardiovascular trials in obesity without diabetes (SELECT).</li>
          </UL>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Limitations</h2>
          <ResearchLimitations
            items={[
              "Weight regain has been documented after Semaglutide discontinuation in the STEP-4 maintenance/withdrawal design.",
              "Long-term data beyond 2 years remain limited relative to lifestyle-only comparators.",
              "Trial populations may not represent the full spectrum of adults with obesity in clinical practice.",
              "Weight change is a surrogate for downstream health outcomes evaluated separately in trials such as SELECT.",
            ]}
          />

          <ImportantNote title="Research-use framing">
            Educational summary only. Oxford Research Peptides supplies
            Semaglutide as an in-vitro reference standard for laboratory
            research only.
          </ImportantNote>

          <p className="text-sm text-navy-deep/80">
            Related reading:{" "}
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-research-applications">Semaglutide research applications</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/sustain-6">SUSTAIN-6</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/select-trial">SELECT trial</a>.
          </p>
        </Prose>,
      ),
      evidenceSummary: (
        <EvidenceSummary
          level="strong"
          confidence="high"
          summary="Programme comprising multiple peer-reviewed randomised controlled trials, with STEP-1 as the pivotal publication in the New England Journal of Medicine."
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
    };
  },
};

// ---------------------------------------------------------------------------
// SELECT
// ---------------------------------------------------------------------------

const selectTrial: StudyContent = {
  slug: "select-trial",
  title: "SELECT — Cardiovascular outcomes with Semaglutide in obesity without diabetes",
  description:
    "Educational literature summary of SELECT, the randomised trial of once-weekly Semaglutide 2.4 mg for cardiovascular outcomes in adults with overweight or obesity and established cardiovascular disease, without diabetes.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What population did SELECT enrol?",
      answer:
        "SELECT enrolled adults ≥ 45 years with overweight or obesity (BMI ≥ 27) and established cardiovascular disease, but without type 2 diabetes.",
    },
    {
      question: "Why was SELECT important?",
      answer:
        "SELECT was the first large randomised trial to report cardiovascular benefit of a GLP-1 receptor agonist in adults with obesity but without diabetes — extending the class's cardiovascular relevance beyond the diabetes population.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer title="Extended answer" question="What was the SELECT trial?">
      SELECT (Semaglutide Effects on Cardiovascular Outcomes in People
      with Overweight or Obesity) was a randomised, double-blind,
      placebo-controlled cardiovascular outcomes trial evaluating
      once-weekly subcutaneous Semaglutide 2.4 mg in adults with
      overweight or obesity (BMI ≥ 27) and established cardiovascular
      disease but without diabetes. Published in the New England Journal
      of Medicine in 2023 (Lincoff et al.), SELECT enrolled 17,604
      participants and followed them for a mean of 39.8 months. The
      primary endpoint was a composite of cardiovascular death, non-fatal
      myocardial infarction and non-fatal stroke (three-point MACE), and
      Semaglutide reduced the primary composite by 20% versus placebo.
      SELECT is the first large randomised trial to demonstrate
      cardiovascular benefit of a GLP-1 receptor agonist in the obesity-
      without-diabetes population and shaped subsequent guideline
      discussions. Oxford Research Peptides describes SELECT for
      educational purposes only.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => {
    const s = getStudy("select-trial");
    return {
      categoryId: "literature",
      hero: (
        <>
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
            LITERATURE REVIEW · CARDIOVASCULAR OUTCOMES TRIAL
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">
            SELECT trial
          </h1>
          <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
            Semaglutide and cardiovascular outcomes in obesity without
            diabetes — Lincoff et al., New England Journal of Medicine,
            2023.
          </p>
        </>
      ),
      quickAnswer: (
        <QuickAnswer>
          SELECT was a 17,604-patient randomised double-blind trial of
          once-weekly subcutaneous Semaglutide 2.4 mg versus placebo in
          adults with overweight/obesity and established cardiovascular
          disease, without diabetes. The three-point MACE composite was
          reduced by 20% with Semaglutide over a mean 39.8 months.
        </QuickAnswer>
      ),
      keyFacts: (
        <KeyFacts
          items={[
            { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
            { label: "Design", value: "Randomised, double-blind, placebo-controlled" },
            { label: "Population", value: "17,604 adults with overweight/obesity + established CVD, no T2D" },
            { label: "Follow-up (mean)", value: "39.8 months" },
            { label: "Primary outcome", value: "3-point MACE (CV death, non-fatal MI, non-fatal stroke)" },
            { label: "Journal", value: "New England Journal of Medicine (2023)" },
            { label: "PMID", value: s?.pmid ?? "37952131" },
            { label: "DOI", value: s?.doi ?? "10.1056/NEJMoa2307563" },
          ]}
        />
      ),
      mainContent: refWrap(
        <Prose>
          <h2 className="font-display text-2xl font-medium text-navy-deep">Background</h2>
          <P>
            Prior GLP-1 receptor agonist cardiovascular outcomes trials
            enrolled adults with type 2 diabetes. SELECT was designed to
            evaluate cardiovascular outcomes in a specifically
            non-diabetic obesity population with established
            cardiovascular disease.<Cite refId="lincoff-2023" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Study design</h2>
          <P>
            Randomised 1:1 to Semaglutide 2.4 mg weekly or matching
            placebo. All participants received standard-of-care
            cardiovascular management. Event-driven design.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Population</h2>
          <P>
            17,604 adults aged ≥ 45 years, BMI ≥ 27, established
            cardiovascular disease (prior MI, prior stroke, or symptomatic
            peripheral artery disease), and without type 2 diabetes.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Primary outcomes</h2>
          <P>
            Three-point MACE (cardiovascular death, non-fatal MI,
            non-fatal stroke). Semaglutide reduced the primary composite
            by 20% versus placebo. Weight change and other secondary
            outcomes were reported alongside the primary.<Cite refId="lincoff-2023" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Scientific significance</h2>
          <UL>
            <li>First large RCT demonstrating cardiovascular benefit of a GLP-1 receptor agonist in obesity without diabetes.</li>
            <li>Extends the cardiovascular relevance of the class beyond the diabetes population.</li>
            <li>Reframed regulatory and guideline discussions around Semaglutide's role in cardiovascular prevention.</li>
          </UL>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Limitations</h2>
          <ResearchLimitations
            items={[
              "SELECT enrolled adults with established cardiovascular disease; extrapolation to primary prevention is not direct.",
              "Approximately 3/4 of enrolled participants were male — limiting generalisability across sex.",
              "Weight change data are secondary; SELECT was not a weight-management trial by primary design.",
              "Long-term (> 5 year) durability of effect requires ongoing follow-up.",
            ]}
          />

          <ImportantNote title="Research-use framing">
            Educational literature summary only. Not clinical guidance.
          </ImportantNote>

          <p className="text-sm text-navy-deep/80">
            Related reading:{" "}
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-research-applications">Semaglutide research applications</a>,{" "}
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
          summary="Landmark cardiovascular outcomes trial (Lincoff et al., NEJM 2023). Widely cited across cardiovascular and metabolic literature."
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
    };
  },
};

// ---------------------------------------------------------------------------
// FLOW
// ---------------------------------------------------------------------------

const flowTrial: StudyContent = {
  slug: "flow-trial",
  title: "FLOW — Semaglutide and kidney outcomes in type 2 diabetes with CKD",
  description:
    "Educational literature summary of FLOW, the randomised trial evaluating kidney and cardiovascular outcomes of once-weekly Semaglutide 1.0 mg in adults with type 2 diabetes and chronic kidney disease.",
  datePublished: "2026-10-15",
  dateModified: "2026-10-15",
  faqs: [
    {
      question: "What did FLOW evaluate?",
      answer:
        "FLOW evaluated the effect of once-weekly subcutaneous Semaglutide 1.0 mg versus placebo on the composite risk of major kidney disease events and cardiovascular death in adults with type 2 diabetes and chronic kidney disease.",
    },
    {
      question: "Was FLOW stopped early?",
      answer:
        "Yes. FLOW was stopped early for efficacy at a pre-planned interim analysis, based on the pre-specified stopping criteria for the primary composite outcome.",
    },
  ],
  extendedAnswer: (
    <HundredFiftyWordAnswer title="Extended answer" question="What was the FLOW trial?">
      FLOW was a randomised, double-blind, placebo-controlled trial of
      once-weekly subcutaneous Semaglutide 1.0 mg in adults with type 2
      diabetes and chronic kidney disease, evaluating major kidney and
      cardiovascular outcomes. Published in the New England Journal of
      Medicine in 2024 (Perkovic et al.), FLOW enrolled 3,533
      participants with type 2 diabetes, an estimated glomerular
      filtration rate consistent with CKD, and an elevated urinary
      albumin-to-creatinine ratio. The primary endpoint was a composite
      of major kidney disease events (kidney failure, sustained ≥ 50%
      eGFR decline, or death from kidney disease) and cardiovascular
      death. The trial was stopped early for efficacy at a pre-planned
      interim analysis. FLOW is the first landmark renal outcomes trial
      for a GLP-1 receptor agonist and complements existing SGLT2-inhibitor
      renal evidence. Oxford Research Peptides describes FLOW here as
      educational literature only.
    </HundredFiftyWordAnswer>
  ),
  buildLayout: () => {
    const s = getStudy("flow-trial");
    return {
      categoryId: "literature",
      hero: (
        <>
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
            LITERATURE REVIEW · KIDNEY OUTCOMES TRIAL
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">
            FLOW trial
          </h1>
          <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
            Semaglutide and chronic kidney disease outcomes in type 2
            diabetes — Perkovic et al., New England Journal of Medicine,
            2024.
          </p>
        </>
      ),
      quickAnswer: (
        <QuickAnswer>
          FLOW was a 3,533-patient randomised double-blind trial of
          once-weekly subcutaneous Semaglutide 1.0 mg versus placebo in
          adults with type 2 diabetes and chronic kidney disease. The
          composite primary outcome of major kidney disease events and
          cardiovascular death was reduced, and the trial was stopped
          early for efficacy at a pre-planned interim analysis.
        </QuickAnswer>
      ),
      keyFacts: (
        <KeyFacts
          items={[
            { label: "Compound", value: "Semaglutide 1.0 mg SC weekly" },
            { label: "Design", value: "Randomised, double-blind, placebo-controlled" },
            { label: "Population", value: "3,533 adults with T2D + CKD (elevated UACR)" },
            { label: "Primary outcome", value: "Composite: major kidney disease events + CV death" },
            { label: "Result", value: "Stopped early for efficacy at interim analysis" },
            { label: "Journal", value: "New England Journal of Medicine (2024)" },
            { label: "PMID", value: s?.pmid ?? "38785209" },
            { label: "DOI", value: s?.doi ?? "10.1056/NEJMoa2403347" },
          ]}
        />
      ),
      mainContent: refWrap(
        <Prose>
          <h2 className="font-display text-2xl font-medium text-navy-deep">Background</h2>
          <P>
            SGLT2 inhibitors had established renal outcome benefit in
            chronic kidney disease with and without diabetes. GLP-1
            receptor agonist renal outcome data prior to FLOW derived
            largely from secondary endpoints in cardiovascular trials.
            FLOW was designed as a dedicated renal outcomes trial.<Cite refId="perkovic-2024" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Study design</h2>
          <P>
            Randomised 1:1 to Semaglutide 1.0 mg weekly or matching
            placebo. Event-driven design. All participants received
            standard-of-care renal and cardiovascular management,
            including renin-angiotensin-system inhibition where clinically
            appropriate.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Population</h2>
          <P>
            3,533 adults with type 2 diabetes and CKD, defined by
            estimated glomerular filtration rate (eGFR) and urinary
            albumin-to-creatinine ratio (UACR) thresholds. High-risk CKD
            population.
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Primary outcomes</h2>
          <P>
            Primary composite: kidney failure (persistent eGFR &lt; 15
            ml/min/1.73 m², chronic kidney replacement therapy, or death
            from kidney failure), sustained ≥ 50% reduction in eGFR, or
            death from cardiovascular causes. The trial was stopped early
            for efficacy at a pre-planned interim analysis.<Cite refId="perkovic-2024" />
          </P>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Scientific significance</h2>
          <UL>
            <li>First dedicated renal outcomes trial to demonstrate benefit for a GLP-1 receptor agonist in T2D-CKD.</li>
            <li>Complements SGLT2-inhibitor renal evidence rather than replacing it — the two classes act on different pathways.</li>
            <li>Extends the therapeutic rationale for GLP-1 receptor agonists in diabetic kidney disease.</li>
          </UL>

          <h2 className="font-display text-2xl font-medium text-navy-deep">Limitations</h2>
          <ResearchLimitations
            items={[
              "Population was type 2 diabetes with CKD; extrapolation to CKD without diabetes is not direct.",
              "Early stopping for efficacy may inflate observed effect sizes relative to fully-completed trials.",
              "Absolute event rates and durability of eGFR-slope effects require continued follow-up.",
              "Interaction with concurrent SGLT2 inhibitor therapy in real-world practice is a topic of ongoing research.",
            ]}
          />

          <ImportantNote title="Research-use framing">
            Educational literature summary. Not clinical guidance.
          </ImportantNote>

          <p className="text-sm text-navy-deep/80">
            Related reading:{" "}
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/semaglutide-research-applications">Semaglutide research applications</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/sustain-6">SUSTAIN-6</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/literature/select-trial">SELECT trial</a>.
          </p>
        </Prose>,
      ),
      evidenceSummary: (
        <EvidenceSummary
          level="strong"
          confidence="high"
          summary="Landmark renal outcomes trial (Perkovic et al., NEJM 2024). Stopped early for efficacy at pre-planned interim analysis."
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
    };
  },
};

// ---------------------------------------------------------------------------
// Registry + lookup
// ---------------------------------------------------------------------------

import { programme1Studies } from "@/content/programme1-studies";

const studyRegistry: readonly StudyContent[] = [
  sustain6,
  stepProgramme,
  selectTrial,
  flowTrial,
  ...programme1Studies,
];

export function getStudyContent(slug: string): StudyContent | undefined {
  return studyRegistry.find((s) => s.slug === slug);
}
