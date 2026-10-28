/**
 * Research Literature Programme 1 — landmark trial pages.
 *
 * Adds 13 dedicated study summaries (STEP-1/2/3/4/5/8, SURPASS-1/2/3/4/5,
 * Retatrutide Phase 2 Obesity, Retatrutide Phase 2 Diabetes) rendered
 * through the existing GuideLayout shell. Educational literature
 * summaries only — no therapeutic advice, no clinical guidance, no
 * reproduction of primary journal text.
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
import { RelatedMechanisms } from "@/components/knowledge/related-mechanisms";
import { PageEditorial } from "@/components/editorial/page-editorial";
import type { EditorialRevision } from "@/lib/editorial";
import type { StudyContent } from "@/content/studies-content";

// ---------------------------------------------------------------------------
// Shared prose helpers
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
function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-medium text-navy-deep">
      {children}
    </h2>
  );
}

const revisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-11-01",
    summary:
      "Research Literature Programme 1 — initial publication of dedicated STEP, SURPASS and Retatrutide Phase 2 trial summaries.",
    author: "Editorial Team",
  },
];

// ---------------------------------------------------------------------------
// Study config → StudyContent builder
// ---------------------------------------------------------------------------

interface StudyConfig {
  slug: string;
  compound: "semaglutide" | "tirzepatide" | "retatrutide";
  mechanismIds: readonly ("glp1r" | "gipr" | "gcgr")[];
  shortName: string;
  fullTitle: string;
  eyebrow: string;
  headline: string;
  reference: Reference;
  description: string;
  quickAnswer: string;
  extendedAnswer: string;
  keyFacts: readonly { label: string; value: string }[];
  background: string;
  design: string;
  population: string;
  intervention: string;
  comparator: string;
  primaryEndpoints: string;
  secondaryEndpoints: string;
  keyFindings: readonly string[];
  mechanisticSignificance: readonly string[];
  limitations: readonly string[];
  researchContext: string;
  relatedStudies: readonly { slug: string; label: string }[];
  faqs: readonly { question: string; answer: string }[];
  evidenceSummary: string;
}

function buildStudyContent(cfg: StudyConfig): StudyContent {
  const refs: Reference[] = [cfg.reference];
  const guideBases: Record<string, string[]> = {
    semaglutide: [
      "what-is-semaglutide",
      "semaglutide-mechanism-of-action",
      "semaglutide-research-applications",
    ],
    tirzepatide: [
      "what-is-tirzepatide",
      "tirzepatide-mechanism-of-action",
      "tirzepatide-faq",
    ],
    retatrutide: [
      "what-is-retatrutide",
      "retatrutide-mechanism-of-action",
      "retatrutide-research-applications",
    ],
  };

  return {
    slug: cfg.slug,
    title: cfg.fullTitle,
    description: cfg.description,
    datePublished: "2026-11-01",
    dateModified: "2026-11-01",
    faqs: cfg.faqs,
    extendedAnswer: (
      <HundredFiftyWordAnswer
        title="Extended answer"
        question={`What was the ${cfg.shortName} trial?`}
      >
        {cfg.extendedAnswer}
      </HundredFiftyWordAnswer>
    ),
    buildLayout: (): GuideLayoutProps => ({
      categoryId: "literature",
      hero: (
        <>
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
            LITERATURE REVIEW · {cfg.eyebrow}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium">
            {cfg.shortName}
          </h1>
          <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
            {cfg.headline}
          </p>
        </>
      ),
      quickAnswer: <QuickAnswer>{cfg.quickAnswer}</QuickAnswer>,
      keyFacts: <KeyFacts items={cfg.keyFacts.slice()} />,
      mainContent: (
        <ReferenceProvider references={refs}>
          <Prose>
            <H2>Background</H2>
            <P>
              {cfg.background} <Cite refId={cfg.reference.id} />
            </P>

            <H2>Study design</H2>
            <P>{cfg.design}</P>

            <H2>Population</H2>
            <P>{cfg.population}</P>

            <H2>Intervention</H2>
            <P>{cfg.intervention}</P>

            <H2>Comparator</H2>
            <P>{cfg.comparator}</P>

            <H2>Primary endpoints</H2>
            <P>{cfg.primaryEndpoints}</P>

            <H2>Secondary endpoints</H2>
            <P>{cfg.secondaryEndpoints}</P>

            <H2>Key findings</H2>
            <UL>
              {cfg.keyFindings.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </UL>

            <H2>Mechanistic significance</H2>
            <UL>
              {cfg.mechanisticSignificance.map((k, i) => (
                <li key={i}>{k}</li>
              ))}
            </UL>

            <H2>Limitations</H2>
            <ResearchLimitations items={cfg.limitations.slice()} />

            <H2>Research context</H2>
            <P>{cfg.researchContext}</P>

            <ImportantNote title="Research-use framing">
              This is an educational literature summary of a published
              clinical trial. Oxford Research Peptides supplies{" "}
              {cfg.compound.charAt(0).toUpperCase() + cfg.compound.slice(1)}{" "}
              as a lyophilised reference standard for in-vitro laboratory
              research only. Nothing on this page is medical advice.
            </ImportantNote>

            <div className="pt-2 text-sm text-navy-deep/80">
              <div className="font-medium">Related studies</div>
              <ul className="mt-1 list-disc pl-5">
                {cfg.relatedStudies.map((r) => (
                  <li key={r.slug}>
                    <a
                      className="underline underline-offset-2"
                      href={`/research-hub/literature/${r.slug}`}
                    >
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-3">
                Compound reference:{" "}
                <a
                  className="underline underline-offset-2"
                  href={`/compounds/${cfg.compound}`}
                >
                  {cfg.compound.charAt(0).toUpperCase() +
                    cfg.compound.slice(1)}{" "}
                  monograph
                </a>
                . Related guides:{" "}
                {guideBases[cfg.compound].map((slug, i) => (
                  <span key={slug}>
                    {i > 0 ? ", " : ""}
                    <a
                      className="underline underline-offset-2"
                      href={`/research-hub/guides/${slug}`}
                    >
                      {slug.replace(/-/g, " ")}
                    </a>
                  </span>
                ))}
                .
              </div>
            </div>

            <div className="mt-6">
              <ReferenceList references={refs} />
            </div>
          </Prose>
        </ReferenceProvider>
      ),
      evidenceSummary: (
        <EvidenceSummary
          level="strong"
          confidence="high"
          summary={cfg.evidenceSummary}
        />
      ),
      relatedCompounds: (
        <RelatedCompounds
          slugs={[cfg.compound]}
          heading="Compound reference"
        />
      ),
      
      relatedGuides: (
        <>
          <RelatedGuides
            compoundSlug={cfg.compound}
            heading="Related guides"
          />
          <div className="mt-4">
            <RelatedMechanisms
              mechanismIds={cfg.mechanismIds}
              heading="Related mechanisms"
            />
          </div>
        </>
      ),
      versionHistory: <PageEditorial pageKind="guide" revisions={revisions} />,
      editorialNotice: <ScientificDisclaimer />,
      publicationDate: "2026-11-01",
      lastUpdated: "2026-11-01",
    }),
  };
}

// ---------------------------------------------------------------------------
// Reference records (real DOIs / PMIDs)
// ---------------------------------------------------------------------------

const REF = {
  step1: {
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
  step2: {
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
  step3: {
    id: "wadden-2021",
    authors: ["Wadden TA", "Bailey TS", "Billings LK", "et al."],
    year: 2021,
    title:
      "Effect of subcutaneous semaglutide vs placebo as an adjunct to intensive behavioral therapy on body weight in adults with overweight or obesity (STEP 3).",
    journal: "JAMA",
    volume: "325",
    issue: "14",
    pages: "1403-1413",
    doi: "10.1001/jama.2021.1831",
    pmid: "33625476",
  },
  step4: {
    id: "rubino-2021",
    authors: ["Rubino D", "Abrahamsson N", "Davies M", "et al."],
    year: 2021,
    title:
      "Effect of continued weekly subcutaneous semaglutide vs placebo on weight loss maintenance in adults with overweight or obesity (STEP 4).",
    journal: "JAMA",
    volume: "325",
    issue: "14",
    pages: "1414-1425",
    doi: "10.1001/jama.2021.3224",
    pmid: "33755728",
  },
  step5: {
    id: "garvey-2022",
    authors: ["Garvey WT", "Batterham RL", "Bhatta M", "et al."],
    year: 2022,
    title:
      "Two-year effects of semaglutide in adults with overweight or obesity (STEP 5).",
    journal: "Nature Medicine",
    volume: "28",
    issue: "10",
    pages: "2083-2091",
    doi: "10.1038/s41591-022-02026-4",
    pmid: "36216945",
  },
  step8: {
    id: "rubino-2022",
    authors: ["Rubino DM", "Greenway FL", "Khalid U", "et al."],
    year: 2022,
    title:
      "Effect of weekly subcutaneous semaglutide vs daily liraglutide on body weight in adults with overweight or obesity without diabetes (STEP 8).",
    journal: "JAMA",
    volume: "327",
    issue: "2",
    pages: "138-150",
    doi: "10.1001/jama.2021.23619",
    pmid: "35015037",
  },
  surpass1: {
    id: "rosenstock-2021",
    authors: ["Rosenstock J", "Wysham C", "Frías JP", "et al."],
    year: 2021,
    title:
      "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1).",
    journal: "Lancet",
    volume: "398",
    issue: "10295",
    pages: "143-155",
    doi: "10.1016/S0140-6736(21)01324-6",
    pmid: "34186022",
  },
  surpass2: {
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
  surpass3: {
    id: "ludvik-2021",
    authors: ["Ludvik B", "Giorgino F", "Jódar E", "et al."],
    year: 2021,
    title:
      "Once-weekly tirzepatide versus once-daily insulin degludec as add-on to metformin with or without SGLT2 inhibitors in patients with type 2 diabetes (SURPASS-3).",
    journal: "Lancet",
    volume: "398",
    issue: "10300",
    pages: "583-598",
    doi: "10.1016/S0140-6736(21)01443-4",
    pmid: "34370970",
  },
  surpass4: {
    id: "delprato-2021",
    authors: ["Del Prato S", "Kahn SE", "Pavo I", "et al."],
    year: 2021,
    title:
      "Tirzepatide versus insulin glargine in type 2 diabetes and increased cardiovascular risk (SURPASS-4).",
    journal: "Lancet",
    volume: "398",
    issue: "10313",
    pages: "1811-1824",
    doi: "10.1016/S0140-6736(21)02188-7",
    pmid: "34600607",
  },
  surpass5: {
    id: "dahl-2022",
    authors: ["Dahl D", "Onishi Y", "Norwood P", "et al."],
    year: 2022,
    title:
      "Effect of subcutaneous tirzepatide vs placebo added to titrated insulin glargine on glycemic control in patients with type 2 diabetes (SURPASS-5).",
    journal: "JAMA",
    volume: "327",
    issue: "6",
    pages: "534-545",
    doi: "10.1001/jama.2022.0078",
    pmid: "35113170",
  },
  retaObesity: {
    id: "jastreboff-2023",
    authors: ["Jastreboff AM", "Kaplan LM", "Frías JP", "et al."],
    year: 2023,
    title: "Triple-hormone-receptor agonist retatrutide for obesity — a Phase 2 trial.",
    journal: "New England Journal of Medicine",
    volume: "389",
    issue: "6",
    pages: "514-526",
    doi: "10.1056/NEJMoa2301972",
    pmid: "37366315",
  },
  retaDiabetes: {
    id: "rosenstock-2023-reta",
    authors: ["Rosenstock J", "Frías JP", "Rodbard HW", "et al."],
    year: 2023,
    title:
      "Retatrutide, a GIP, GLP-1 and glucagon receptor agonist, for people with type 2 diabetes: a randomised, double-blind, placebo- and active-controlled, parallel-group, Phase 2 trial.",
    journal: "Lancet",
    volume: "402",
    issue: "10401",
    pages: "529-544",
    doi: "10.1016/S0140-6736(23)01053-X",
    pmid: "37364590",
  },
} satisfies Record<string, Reference>;

// ---------------------------------------------------------------------------
// 13 study configurations
// ---------------------------------------------------------------------------

const stepRelated = [
  { slug: "step-1", label: "STEP-1 (obesity)" },
  { slug: "step-2", label: "STEP-2 (obesity + T2D)" },
  { slug: "step-3", label: "STEP-3 (intensive behavioural therapy)" },
  { slug: "step-4", label: "STEP-4 (maintenance / withdrawal)" },
  { slug: "step-5", label: "STEP-5 (two-year)" },
  { slug: "step-8", label: "STEP-8 (vs liraglutide)" },
  { slug: "step-programme", label: "STEP programme overview" },
];
const surpassRelated = [
  { slug: "surpass-1", label: "SURPASS-1 (monotherapy)" },
  { slug: "surpass-2", label: "SURPASS-2 (vs semaglutide)" },
  { slug: "surpass-3", label: "SURPASS-3 (vs insulin degludec)" },
  { slug: "surpass-4", label: "SURPASS-4 (vs insulin glargine, high CV risk)" },
  { slug: "surpass-5", label: "SURPASS-5 (add-on to basal insulin)" },
];
const retaRelated = [
  { slug: "retatrutide-phase-2-obesity", label: "Retatrutide Phase 2 Obesity" },
  {
    slug: "retatrutide-phase-2-diabetes",
    label: "Retatrutide Phase 2 Diabetes",
  },
];

function withoutSelf<T extends { slug: string }>(
  self: string,
  arr: readonly T[],
): T[] {
  return arr.filter((x) => x.slug !== self);
}

const configs: StudyConfig[] = [
  // ------------------------------------------------------------------ STEP-1
  {
    slug: "step-1",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-1",
    fullTitle:
      "STEP-1 — Once-weekly Semaglutide 2.4 mg in adults with overweight or obesity without diabetes",
    eyebrow: "OBESITY RCT",
    headline:
      "Wilding et al., New England Journal of Medicine, 2021. Pivotal placebo-controlled trial of once-weekly Semaglutide 2.4 mg for weight management in adults with overweight or obesity without diabetes.",
    reference: REF.step1,
    description:
      "Educational summary of STEP-1, the pivotal 68-week randomised placebo-controlled trial of once-weekly subcutaneous Semaglutide 2.4 mg in adults with overweight or obesity without diabetes.",
    quickAnswer:
      "STEP-1 was a 68-week, 1,961-participant randomised double-blind placebo-controlled trial of once-weekly subcutaneous Semaglutide 2.4 mg plus lifestyle intervention in adults with overweight or obesity without diabetes. Semaglutide produced substantially greater weight loss than placebo (approximately −14.9% vs −2.4% mean change in body weight at week 68).",
    extendedAnswer:
      "STEP-1 (Semaglutide Treatment Effect in People with Obesity, trial 1) was a 68-week randomised, double-blind, placebo-controlled Phase 3 trial designed to evaluate once-weekly subcutaneous Semaglutide 2.4 mg for weight management in adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without diabetes. Published by Wilding and colleagues in the New England Journal of Medicine in 2021, the trial randomised 1,961 participants 2:1 to Semaglutide 2.4 mg or matching placebo. Both arms received a lifestyle intervention comprising reduced-calorie diet and increased physical activity. Semaglutide produced a mean change in body weight of approximately −14.9% versus −2.4% with placebo at week 68, with concurrent improvements in waist circumference, glycaemic parameters and patient-reported physical function scores. STEP-1 established the pivotal placebo-controlled evidence base for Semaglutide 2.4 mg in weight management.",
    keyFacts: [
      { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, Phase 3" },
      { label: "N", value: "1,961 (2:1 Semaglutide : placebo)" },
      { label: "Population", value: "Adults with overweight/obesity, without diabetes" },
      { label: "Duration", value: "68 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "New England Journal of Medicine (2021)" },
      { label: "DOI", value: "10.1056/NEJMoa2032183" },
      { label: "PMID", value: "33567185" },
    ],
    background:
      "By 2020 no GLP-1 receptor agonist had been evaluated in a dedicated Phase 3 weight-management programme at doses higher than those used for glycaemic control in type 2 diabetes. STEP-1 was designed as the pivotal placebo-controlled trial for once-weekly Semaglutide 2.4 mg in adults with overweight or obesity without diabetes.",
    design:
      "Randomised, double-blind, placebo-controlled parallel-group Phase 3 trial. Participants were randomly assigned 2:1 to once-weekly subcutaneous Semaglutide 2.4 mg or matching placebo for 68 weeks, followed by a 7-week off-treatment follow-up. Both arms received a structured lifestyle intervention.",
    population:
      "1,961 adults aged 18 years or older with a body-mass index of at least 30, or at least 27 accompanied by a weight-related coexisting condition (such as hypertension or dyslipidaemia), and without type 2 diabetes.",
    intervention:
      "Once-weekly subcutaneous Semaglutide, titrated over 16 weeks to a maintenance dose of 2.4 mg, plus a lifestyle intervention comprising reduced-calorie diet (500 kcal/day deficit) and 150 minutes/week of physical activity guidance.",
    comparator:
      "Matching placebo administered subcutaneously once weekly, plus the same lifestyle intervention.",
    primaryEndpoints:
      "Co-primary endpoints were percent change in body weight from baseline to week 68 and the proportion of participants achieving weight reduction of 5% or greater. Analyses used a treatment-policy estimand for participants regardless of treatment adherence.",
    secondaryEndpoints:
      "Confirmatory secondary endpoints included proportions achieving ≥10% and ≥15% weight reduction, change in waist circumference, systolic blood pressure, HbA1c, fasting plasma glucose, and patient-reported outcomes including SF-36 physical function and IWQOL-Lite-CT scores.",
    keyFindings: [
      "Mean change in body weight from baseline to week 68 was approximately −14.9% with Semaglutide 2.4 mg versus approximately −2.4% with placebo.",
      "A markedly greater proportion of participants achieved ≥5%, ≥10% and ≥15% weight reduction with Semaglutide than with placebo.",
      "Improvements were reported in waist circumference, systolic blood pressure, HbA1c and fasting glucose relative to placebo.",
      "Gastrointestinal adverse events (nausea, diarrhoea, vomiting, constipation) were the most common tolerability issues, predominantly during dose titration.",
    ],
    mechanisticSignificance: [
      "Supports the hypothesis that sustained GLP-1 receptor agonism modulates central appetite circuitry and gastric emptying in a manner sufficient to drive substantial body-weight reduction in humans without diabetes.",
      "Demonstrated the pharmacological ceiling of a mono-GLP-1 receptor agonist at a higher-than-glycaemic dose — subsequently used as the reference for dual and triple incretin agonist comparisons.",
    ],
    limitations: [
      "STEP-1 excluded adults with diabetes; extrapolation to that population was addressed separately in STEP-2.",
      "Treatment period of 68 weeks is short relative to the chronic nature of obesity; STEP-5 extended follow-up to two years.",
      "The trial was placebo-controlled without an active weight-loss comparator; STEP-8 later addressed the semaglutide-versus-liraglutide contrast.",
      "Randomised populations may not represent the full demographic range of adults with obesity in general practice.",
    ],
    researchContext:
      "STEP-1 is the anchor trial of the STEP programme and framed the subsequent large cardiovascular outcomes trial in obesity without diabetes (SELECT). Its magnitude of weight reduction became the reference against which dual (Tirzepatide, SURPASS/SURMOUNT) and triple (Retatrutide) incretin-agonist trial results are contextualised.",
    relatedStudies: withoutSelf("step-1", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "What was the STEP-1 trial?",
        answer:
          "STEP-1 (Wilding et al., NEJM 2021) was a 68-week randomised double-blind placebo-controlled Phase 3 trial that evaluated once-weekly subcutaneous Semaglutide 2.4 mg plus lifestyle intervention in 1,961 adults with overweight or obesity without diabetes.",
      },
      {
        question: "How much weight was lost in STEP-1?",
        answer:
          "Mean change in body weight from baseline to week 68 was approximately −14.9% with Semaglutide 2.4 mg versus approximately −2.4% with placebo.",
      },
    ],
    evidenceSummary:
      "Pivotal placebo-controlled Phase 3 trial published in the New England Journal of Medicine and widely cited across the GLP-1 receptor agonist weight-management literature.",
  },
  // ------------------------------------------------------------------ STEP-2
  {
    slug: "step-2",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-2",
    fullTitle:
      "STEP-2 — Once-weekly Semaglutide 2.4 mg in adults with overweight or obesity and type 2 diabetes",
    eyebrow: "OBESITY + T2D RCT",
    headline:
      "Davies et al., Lancet, 2021. 68-week randomised placebo-controlled trial of Semaglutide 2.4 mg for weight management in adults with type 2 diabetes.",
    reference: REF.step2,
    description:
      "Educational summary of STEP-2, the 68-week randomised placebo-controlled trial of once-weekly Semaglutide 2.4 mg for weight management in adults with overweight or obesity and type 2 diabetes.",
    quickAnswer:
      "STEP-2 was a 68-week randomised placebo-controlled trial of once-weekly subcutaneous Semaglutide 2.4 mg, 1.0 mg and placebo in 1,210 adults with overweight or obesity and type 2 diabetes. Semaglutide 2.4 mg produced approximately −9.6% mean weight change versus approximately −3.4% with placebo.",
    extendedAnswer:
      "STEP-2 was a 68-week, randomised, double-blind, three-arm Phase 3 trial comparing once-weekly subcutaneous Semaglutide 2.4 mg with Semaglutide 1.0 mg (the licensed diabetes dose) and matching placebo in 1,210 adults with overweight or obesity and inadequately controlled type 2 diabetes (HbA1c 7–10%). Published by Davies and colleagues in the Lancet in 2021, the trial reported mean weight change of approximately −9.6% with Semaglutide 2.4 mg versus approximately −3.4% with placebo at week 68, together with clinically meaningful HbA1c reduction. STEP-2 extended the STEP-1 evidence base into the type 2 diabetes population and separated the incremental effect of the 2.4 mg dose from the licensed 1.0 mg glycaemic dose. Oxford Research Peptides describes STEP-2 here as educational literature.",
    keyFacts: [
      { label: "Compound", value: "Semaglutide 2.4 mg, 1.0 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, three-arm" },
      { label: "N", value: "1,210" },
      { label: "Population", value: "Adults with overweight/obesity + type 2 diabetes" },
      { label: "Duration", value: "68 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "Lancet (2021)" },
      { label: "DOI", value: "10.1016/S0140-6736(21)00213-0" },
      { label: "PMID", value: "33667417" },
    ],
    background:
      "STEP-1 established the pivotal placebo-controlled evidence for Semaglutide 2.4 mg in adults without diabetes. STEP-2 was designed to evaluate the same regimen in adults with overweight or obesity and inadequately controlled type 2 diabetes, and to isolate the incremental effect of 2.4 mg over the licensed 1.0 mg glycaemic dose.",
    design:
      "Randomised, double-blind, placebo-controlled, three-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1 to Semaglutide 2.4 mg, Semaglutide 1.0 mg or matching placebo, each administered subcutaneously once weekly for 68 weeks, alongside a lifestyle intervention.",
    population:
      "1,210 adults with a body-mass index of at least 27, type 2 diabetes and HbA1c 7–10%, treated with diet and exercise alone or with up to three oral glucose-lowering agents.",
    intervention:
      "Once-weekly subcutaneous Semaglutide titrated to a maintenance dose of 2.4 mg, plus a lifestyle intervention.",
    comparator:
      "Semaglutide 1.0 mg once weekly (active reference to the licensed glycaemic dose) and matching placebo once weekly, both with the same lifestyle intervention.",
    primaryEndpoints:
      "Percent change in body weight from baseline to week 68 (Semaglutide 2.4 mg versus placebo).",
    secondaryEndpoints:
      "Proportions achieving ≥5% and ≥10% weight reduction, change in HbA1c, fasting plasma glucose, waist circumference, systolic blood pressure and patient-reported outcomes.",
    keyFindings: [
      "Semaglutide 2.4 mg produced approximately −9.6% mean weight change from baseline to week 68 versus approximately −3.4% with placebo.",
      "Semaglutide 1.0 mg produced intermediate weight change and comparable glycaemic effect to previously reported SUSTAIN trials.",
      "HbA1c reductions with both Semaglutide doses were substantially greater than placebo.",
      "Gastrointestinal adverse events were the most common tolerability findings and predominated during dose titration.",
    ],
    mechanisticSignificance: [
      "Demonstrates that GLP-1 receptor agonist–mediated weight change is preserved but attenuated in the type 2 diabetes population relative to non-diabetic adults, consistent with observations across the incretin literature.",
      "Separates the dose-response contribution of Semaglutide above the licensed glycaemic dose.",
    ],
    limitations: [
      "68-week duration is short relative to the chronic nature of both obesity and type 2 diabetes.",
      "Concomitant glucose-lowering therapies varied, complicating direct HbA1c comparison across arms.",
      "The trial was not powered for cardiovascular or renal outcomes (addressed by SUSTAIN-6, SELECT and FLOW).",
    ],
    researchContext:
      "STEP-2 sits between STEP-1 (obesity without diabetes) and the SURPASS programme (which used Tirzepatide in type 2 diabetes) as the anchor Semaglutide 2.4 mg dataset in the T2D-obesity intersection.",
    relatedStudies: withoutSelf("step-2", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "What did STEP-2 show?",
        answer:
          "In 1,210 adults with overweight/obesity and type 2 diabetes over 68 weeks, once-weekly subcutaneous Semaglutide 2.4 mg reduced body weight by approximately −9.6% versus approximately −3.4% with placebo, with clinically meaningful HbA1c reduction.",
      },
      {
        question: "How is STEP-2 different from STEP-1?",
        answer:
          "STEP-1 evaluated Semaglutide 2.4 mg in adults with overweight/obesity without diabetes. STEP-2 evaluated the same regimen in adults with type 2 diabetes and additionally included a Semaglutide 1.0 mg comparator to separate the incremental effect of the higher dose.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised placebo-controlled trial published in the Lancet (Davies et al. 2021).",
  },
  // ------------------------------------------------------------------ STEP-3
  {
    slug: "step-3",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-3",
    fullTitle:
      "STEP-3 — Semaglutide 2.4 mg plus intensive behavioural therapy",
    eyebrow: "OBESITY + IBT RCT",
    headline:
      "Wadden et al., JAMA, 2021. 68-week randomised placebo-controlled trial of Semaglutide 2.4 mg as an adjunct to intensive behavioural therapy in adults with overweight or obesity.",
    reference: REF.step3,
    description:
      "Educational summary of STEP-3, the 68-week randomised placebo-controlled trial of Semaglutide 2.4 mg combined with intensive behavioural therapy and a low-calorie meal-replacement diet.",
    quickAnswer:
      "STEP-3 was a 68-week, 611-participant randomised double-blind placebo-controlled trial of once-weekly Semaglutide 2.4 mg plus intensive behavioural therapy (IBT) and a low-calorie diet in adults with overweight or obesity without diabetes. Semaglutide produced approximately −16.0% weight change versus approximately −5.7% with placebo.",
    extendedAnswer:
      "STEP-3 was a 68-week, randomised, double-blind, placebo-controlled Phase 3 trial evaluating once-weekly subcutaneous Semaglutide 2.4 mg as an adjunct to intensive behavioural therapy in adults with overweight or obesity without diabetes. Published by Wadden and colleagues in JAMA in 2021, the trial randomised 611 participants 2:1 to Semaglutide 2.4 mg or matching placebo. Both arms received intensive behavioural therapy comprising 30 counselling visits over 68 weeks, together with an initial 8-week low-calorie meal-replacement diet. Semaglutide produced mean weight change of approximately −16.0% versus approximately −5.7% with placebo at week 68. STEP-3 characterises the incremental effect of Semaglutide 2.4 mg on top of an intensive lifestyle-only comparator that itself produced substantial weight loss.",
    keyFacts: [
      { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, Phase 3" },
      { label: "N", value: "611 (2:1 Semaglutide : placebo)" },
      { label: "Population", value: "Adults with overweight/obesity, without diabetes, receiving IBT" },
      { label: "Duration", value: "68 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "JAMA (2021)" },
      { label: "DOI", value: "10.1001/jama.2021.1831" },
      { label: "PMID", value: "33625476" },
    ],
    background:
      "Lifestyle intervention intensity affects the observed pharmacological effect of weight-management drugs. STEP-3 was designed to quantify the incremental effect of Semaglutide 2.4 mg on top of a demanding, high-contact behavioural programme with a low-calorie meal-replacement run-in.",
    design:
      "Randomised, double-blind, placebo-controlled parallel-group Phase 3 trial. Participants were randomised 2:1 to Semaglutide 2.4 mg or matching placebo, both plus intensive behavioural therapy (30 counselling visits) and an initial 8-week 1,000–1,200 kcal/day meal-replacement diet transitioning to a hypocaloric diet.",
    population:
      "611 adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without diabetes.",
    intervention:
      "Once-weekly subcutaneous Semaglutide titrated to 2.4 mg, plus IBT and low-calorie diet.",
    comparator: "Matching placebo, plus the same IBT and low-calorie diet.",
    primaryEndpoints:
      "Percent change in body weight from baseline to week 68 and proportion of participants achieving ≥5% weight reduction.",
    secondaryEndpoints:
      "Proportions achieving ≥10% and ≥15% weight reduction; change in waist circumference, systolic blood pressure, HbA1c, fasting plasma glucose and patient-reported outcomes.",
    keyFindings: [
      "Mean change in body weight was approximately −16.0% with Semaglutide 2.4 mg versus approximately −5.7% with placebo at week 68.",
      "The placebo-plus-IBT arm achieved larger weight change than placebo arms in trials without intensive lifestyle intervention, isolating the added pharmacological effect of Semaglutide.",
      "Gastrointestinal adverse events remained the dominant tolerability finding.",
    ],
    mechanisticSignificance: [
      "Provides evidence that pharmacological suppression of appetite via GLP-1 receptor agonism is additive to, rather than replaced by, intensive behavioural intervention.",
      "Illustrates the ceiling of behavioural intervention alone in short-to-medium-term weight-management trials.",
    ],
    limitations: [
      "The IBT protocol is more intensive than routine clinical care and may not be representative of typical practice.",
      "68 weeks is short relative to obesity as a chronic condition.",
      "Trial population may not represent the full demographic distribution of adults with obesity.",
    ],
    researchContext:
      "STEP-3 complements STEP-1 (routine lifestyle counselling) and STEP-5 (long-term extension) by testing the pharmacological effect at the top of the behavioural-intervention spectrum.",
    relatedStudies: withoutSelf("step-3", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "What is STEP-3 known for?",
        answer:
          "STEP-3 is the STEP trial that combined once-weekly Semaglutide 2.4 mg with intensive behavioural therapy and a low-calorie meal-replacement diet. It reported approximately −16.0% weight change with Semaglutide versus −5.7% with placebo at week 68.",
      },
      {
        question: "How does STEP-3 differ from STEP-1?",
        answer:
          "STEP-1 used a lower-intensity lifestyle intervention, whereas STEP-3 combined the drug with intensive behavioural therapy and a structured low-calorie meal-replacement phase. The comparator lifestyle burden differs meaningfully across the two trials.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised placebo-controlled trial published in JAMA (Wadden et al. 2021).",
  },
  // ------------------------------------------------------------------ STEP-4
  {
    slug: "step-4",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-4",
    fullTitle:
      "STEP-4 — Weight-loss maintenance vs withdrawal of Semaglutide 2.4 mg",
    eyebrow: "MAINTENANCE / WITHDRAWAL RCT",
    headline:
      "Rubino et al., JAMA, 2021. 68-week trial with a 20-week run-in on Semaglutide 2.4 mg followed by randomised continuation or switch to placebo, characterising weight-loss maintenance and post-withdrawal regain.",
    reference: REF.step4,
    description:
      "Educational summary of STEP-4, the randomised trial characterising continued weight-loss maintenance with Semaglutide 2.4 mg versus weight regain following withdrawal to placebo.",
    quickAnswer:
      "STEP-4 used a 20-week open-label run-in on Semaglutide 2.4 mg, then randomised 803 responders to continue Semaglutide or switch to placebo for 48 weeks. Continued Semaglutide produced further weight loss; switching to placebo led to weight regain.",
    extendedAnswer:
      "STEP-4 was a two-part Phase 3 trial designed to characterise weight-loss maintenance with once-weekly subcutaneous Semaglutide 2.4 mg. Participants first entered a 20-week open-label run-in on Semaglutide 2.4 mg with lifestyle intervention. Those tolerating the maintenance dose (n=803) were then randomised 2:1 to continue Semaglutide 2.4 mg or switch to matching placebo for a further 48 weeks (total trial 68 weeks). Published by Rubino and colleagues in JAMA in 2021, the trial reported that participants continuing Semaglutide achieved further weight loss during the randomised period whereas those switched to placebo regained a substantial fraction of run-in weight loss. STEP-4 is the primary source of evidence within the STEP programme for maintenance dynamics and post-withdrawal weight regain and informs research questions on chronic dosing.",
    keyFacts: [
      { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
      { label: "Design", value: "20-week run-in → randomised continuation vs placebo" },
      { label: "N", value: "803 randomised responders" },
      { label: "Population", value: "Adults with overweight/obesity, without diabetes" },
      { label: "Duration", value: "68 weeks total (20 run-in + 48 randomised)" },
      { label: "Primary outcome", value: "Percent change in body weight from randomisation to week 68" },
      { label: "Journal", value: "JAMA (2021)" },
      { label: "DOI", value: "10.1001/jama.2021.3224" },
      { label: "PMID", value: "33755728" },
    ],
    background:
      "Sustained weight loss requires either indefinite pharmacotherapy or durable non-pharmacological change. STEP-4 was designed to characterise weight-loss maintenance and post-withdrawal weight regain with Semaglutide 2.4 mg, a question left open by STEP-1 through STEP-3.",
    design:
      "Two-part Phase 3 trial. All participants received once-weekly subcutaneous Semaglutide 2.4 mg for 20 weeks (open-label lead-in with dose titration). Responders tolerating the maintenance dose were then randomised 2:1 to continue Semaglutide 2.4 mg or switch to matching placebo for a further 48 weeks, both arms with continued lifestyle intervention.",
    population:
      "803 adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without diabetes, who completed the 20-week run-in and tolerated the 2.4 mg maintenance dose.",
    intervention:
      "Continuation of once-weekly subcutaneous Semaglutide 2.4 mg for 48 weeks post-randomisation plus lifestyle intervention.",
    comparator:
      "Switch to matching placebo once weekly for 48 weeks plus lifestyle intervention.",
    primaryEndpoints:
      "Percent change in body weight from randomisation (week 20) to week 68.",
    secondaryEndpoints:
      "Change in waist circumference, systolic blood pressure, HbA1c, patient-reported outcomes, and proportions maintaining ≥5%, ≥10% and ≥15% weight reduction from baseline.",
    keyFindings: [
      "Participants continuing Semaglutide achieved further weight loss during the randomised period; participants switched to placebo regained a substantial fraction of run-in weight loss.",
      "The between-group difference at week 68 was approximately 14 percentage points of body weight, favouring continued Semaglutide.",
      "Cardiometabolic parameters that improved during the run-in returned toward baseline in the placebo-switch arm.",
    ],
    mechanisticSignificance: [
      "Consistent with GLP-1 receptor agonist mechanism as an ongoing pharmacological modulator of appetite rather than a driver of durable neuro-behavioural change persisting after withdrawal.",
      "Frames long-term dosing considerations as a central research question, contextualising STEP-5 and SELECT.",
    ],
    limitations: [
      "The randomised phase was 48 weeks; longer-term withdrawal dynamics remain incompletely characterised.",
      "Run-in design selects responders and may not represent the full intent-to-treat population.",
      "Data do not resolve whether specific behavioural programmes could attenuate post-withdrawal regain.",
    ],
    researchContext:
      "STEP-4 is the canonical maintenance/withdrawal trial for Semaglutide 2.4 mg. It informs interpretation of long-term trials (STEP-5) and cardiovascular outcomes trials (SELECT) and shapes the research question of chronic incretin therapy across the incretin agonist class.",
    relatedStudies: withoutSelf("step-4", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "What did STEP-4 show about stopping Semaglutide?",
        answer:
          "Participants who switched from Semaglutide 2.4 mg to placebo after a 20-week run-in regained a substantial fraction of their run-in weight loss over the next 48 weeks, whereas those who continued Semaglutide continued to lose weight.",
      },
      {
        question: "Was STEP-4 a placebo-controlled trial from the start?",
        answer:
          "No. STEP-4 used a 20-week open-label Semaglutide run-in and then randomised responders to continue Semaglutide or switch to placebo. The primary analysis reads out from randomisation.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised withdrawal trial published in JAMA (Rubino et al. 2021).",
  },
  // ------------------------------------------------------------------ STEP-5
  {
    slug: "step-5",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-5",
    fullTitle:
      "STEP-5 — Two-year weight-management outcomes with Semaglutide 2.4 mg",
    eyebrow: "TWO-YEAR RCT",
    headline:
      "Garvey et al., Nature Medicine, 2022. Two-year (104-week) randomised placebo-controlled trial of Semaglutide 2.4 mg in adults with overweight or obesity.",
    reference: REF.step5,
    description:
      "Educational summary of STEP-5, the two-year randomised placebo-controlled trial extending the STEP programme's follow-up to 104 weeks.",
    quickAnswer:
      "STEP-5 was a 104-week randomised double-blind placebo-controlled trial of once-weekly Semaglutide 2.4 mg in 304 adults with overweight or obesity. Semaglutide produced approximately −15.2% weight change versus approximately −2.6% with placebo at week 104.",
    extendedAnswer:
      "STEP-5 was a two-year (104-week) randomised, double-blind, placebo-controlled Phase 3 trial extending the STEP programme's follow-up duration for once-weekly subcutaneous Semaglutide 2.4 mg in adults with overweight or obesity, with or without prediabetes and without diabetes. Published by Garvey and colleagues in Nature Medicine in 2022, the trial randomised 304 participants 1:1 to Semaglutide 2.4 mg or matching placebo, both with lifestyle intervention. Semaglutide produced mean weight change of approximately −15.2% versus approximately −2.6% with placebo at week 104. Weight loss appeared to reach a plateau by approximately week 60 and was maintained through the two-year timepoint. STEP-5 provides the primary evidence on the durability of Semaglutide 2.4 mg over two years.",
    keyFacts: [
      { label: "Compound", value: "Semaglutide 2.4 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, Phase 3" },
      { label: "N", value: "304" },
      { label: "Population", value: "Adults with overweight/obesity ± prediabetes, no diabetes" },
      { label: "Duration", value: "104 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "Nature Medicine (2022)" },
      { label: "DOI", value: "10.1038/s41591-022-02026-4" },
      { label: "PMID", value: "36216945" },
    ],
    background:
      "Weight regain typically follows initial pharmacological or behavioural weight loss. STEP-5 was designed to characterise the durability of Semaglutide 2.4 mg over two years — approximately twice the duration of the pivotal STEP-1 trial.",
    design:
      "Randomised, double-blind, placebo-controlled parallel-group Phase 3 trial. Participants were randomly assigned 1:1 to once-weekly subcutaneous Semaglutide 2.4 mg or matching placebo for 104 weeks, both plus lifestyle intervention.",
    population:
      "304 adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without diabetes.",
    intervention:
      "Once-weekly subcutaneous Semaglutide titrated to 2.4 mg for 104 weeks plus lifestyle intervention.",
    comparator: "Matching placebo plus the same lifestyle intervention.",
    primaryEndpoints:
      "Co-primary endpoints were percent change in body weight from baseline to week 104 and the proportion achieving ≥5% weight reduction.",
    secondaryEndpoints:
      "Proportions achieving ≥10%, ≥15% and ≥20% weight reduction; change in waist circumference, systolic blood pressure, HbA1c, glycaemic transition status and patient-reported outcomes.",
    keyFindings: [
      "Mean change in body weight from baseline to week 104 was approximately −15.2% with Semaglutide 2.4 mg versus approximately −2.6% with placebo.",
      "Weight-loss trajectories appeared to reach a plateau by approximately week 60 and were maintained through week 104 with continued treatment.",
      "Transition from prediabetes to normoglycaemia was more frequent with Semaglutide than with placebo.",
    ],
    mechanisticSignificance: [
      "Supports the interpretation that GLP-1 receptor agonist–mediated weight change reaches a steady state maintained by continued dosing, consistent with STEP-4 maintenance dynamics.",
      "Provides two-year durability evidence relevant to the design of long-term cardiometabolic trials such as SELECT.",
    ],
    limitations: [
      "Sample size (n=304) is smaller than the pivotal STEP-1 trial.",
      "Follow-up ends at 104 weeks; longer-term data remain limited.",
      "Population excluded participants with diabetes; two-year evidence in that group is addressed separately.",
    ],
    researchContext:
      "STEP-5 is the longest-duration randomised placebo-controlled Semaglutide 2.4 mg weight-management trial in the public literature. It anchors durability discussion across the incretin agonist class and complements STEP-4 withdrawal data.",
    relatedStudies: withoutSelf("step-5", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "How long was STEP-5?",
        answer:
          "STEP-5 followed participants for 104 weeks (two years) on randomised once-weekly Semaglutide 2.4 mg or placebo.",
      },
      {
        question: "Did weight loss continue for two years in STEP-5?",
        answer:
          "Weight loss reached a plateau by approximately week 60 and was maintained through week 104. Mean weight change from baseline was approximately −15.2% with Semaglutide versus approximately −2.6% with placebo.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed two-year Phase 3 randomised placebo-controlled trial published in Nature Medicine (Garvey et al. 2022).",
  },
  // ------------------------------------------------------------------ STEP-8
  {
    slug: "step-8",
    compound: "semaglutide",
    mechanismIds: ["glp1r"],
    shortName: "STEP-8",
    fullTitle:
      "STEP-8 — Semaglutide 2.4 mg once weekly vs Liraglutide 3.0 mg once daily",
    eyebrow: "HEAD-TO-HEAD RCT",
    headline:
      "Rubino et al., JAMA, 2022. 68-week head-to-head randomised trial comparing once-weekly subcutaneous Semaglutide 2.4 mg with once-daily subcutaneous Liraglutide 3.0 mg in adults with overweight or obesity without diabetes.",
    reference: REF.step8,
    description:
      "Educational summary of STEP-8, the head-to-head randomised trial comparing once-weekly Semaglutide 2.4 mg with once-daily Liraglutide 3.0 mg for weight management.",
    quickAnswer:
      "STEP-8 was a 68-week, 338-participant randomised open-label head-to-head trial comparing once-weekly Semaglutide 2.4 mg with once-daily Liraglutide 3.0 mg (both plus placebo for the alternate regimen) in adults with overweight or obesity without diabetes. Semaglutide produced approximately −15.8% weight change versus approximately −6.4% with Liraglutide.",
    extendedAnswer:
      "STEP-8 was a 68-week, randomised, open-label head-to-head Phase 3 trial comparing once-weekly subcutaneous Semaglutide 2.4 mg with once-daily subcutaneous Liraglutide 3.0 mg for weight management in adults with overweight or obesity without diabetes. Published by Rubino and colleagues in JAMA in 2022, the trial randomised 338 participants 3:1:3:1 to Semaglutide + placebo (daily), Liraglutide + placebo (weekly), Semaglutide alone or Liraglutide alone. Semaglutide produced mean weight change of approximately −15.8% versus approximately −6.4% with Liraglutide at week 68 — the first large randomised head-to-head comparison of two GLP-1 receptor agonists at their licensed weight-management doses. STEP-8 is a central data point in comparative research on GLP-1 receptor agonists.",
    keyFacts: [
      { label: "Compounds", value: "Semaglutide 2.4 mg SC weekly vs Liraglutide 3.0 mg SC daily" },
      { label: "Design", value: "Randomised, open-label, active-controlled, double-dummy for placebo alternate" },
      { label: "N", value: "338" },
      { label: "Population", value: "Adults with overweight/obesity, without diabetes" },
      { label: "Duration", value: "68 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "JAMA (2022)" },
      { label: "DOI", value: "10.1001/jama.2021.23619" },
      { label: "PMID", value: "35015037" },
    ],
    background:
      "Prior to STEP-8, comparisons of Semaglutide 2.4 mg and Liraglutide 3.0 mg relied on cross-trial inference. STEP-8 was designed as the direct randomised head-to-head comparison at their respective licensed weight-management doses.",
    design:
      "Randomised, open-label with double-dummy placebo for the alternate regimen, active-controlled Phase 3 trial. Participants received either once-weekly subcutaneous Semaglutide 2.4 mg plus daily placebo or once-daily subcutaneous Liraglutide 3.0 mg plus weekly placebo, both with lifestyle intervention, for 68 weeks.",
    population:
      "338 adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without diabetes.",
    intervention:
      "Once-weekly subcutaneous Semaglutide titrated to 2.4 mg maintenance dose plus lifestyle intervention.",
    comparator:
      "Once-daily subcutaneous Liraglutide titrated to 3.0 mg maintenance dose plus lifestyle intervention.",
    primaryEndpoints:
      "Percent change in body weight from baseline to week 68 (Semaglutide vs Liraglutide).",
    secondaryEndpoints:
      "Proportions achieving ≥5%, ≥10%, ≥15% and ≥20% weight reduction; treatment discontinuation, tolerability, waist circumference and cardiometabolic parameters.",
    keyFindings: [
      "Mean change in body weight was approximately −15.8% with Semaglutide 2.4 mg versus approximately −6.4% with Liraglutide 3.0 mg at week 68.",
      "A substantially greater proportion of Semaglutide-treated participants achieved ≥10%, ≥15% and ≥20% weight reduction.",
      "Gastrointestinal adverse events were common in both arms and predominated during titration.",
      "Trial discontinuation for adverse events was numerically higher with Liraglutide than with Semaglutide.",
    ],
    mechanisticSignificance: [
      "Consistent with pharmacokinetic differences (weekly Semaglutide vs daily Liraglutide) and reported potency differences at the GLP-1 receptor.",
      "Provides the first randomised, direct comparison used across the literature to contextualise dual-agonist (Tirzepatide, SURPASS-2) and triple-agonist (Retatrutide) head-to-head signals.",
    ],
    limitations: [
      "Open-label design (with double-dummy) may introduce behavioural bias despite placebo blinding of the alternate regimen.",
      "68-week duration is short relative to the chronic nature of obesity.",
      "Trial did not evaluate cardiovascular or renal outcomes.",
    ],
    researchContext:
      "STEP-8 is the reference head-to-head Semaglutide-vs-Liraglutide dataset in the incretin agonist literature and complements SURPASS-2 (Tirzepatide-vs-Semaglutide in type 2 diabetes) as a bridge between mono-, dual- and triple-agonist comparative evidence.",
    relatedStudies: withoutSelf("step-8", [...stepRelated, ...surpassRelated]),
    faqs: [
      {
        question: "What did STEP-8 compare?",
        answer:
          "STEP-8 compared once-weekly subcutaneous Semaglutide 2.4 mg with once-daily subcutaneous Liraglutide 3.0 mg in adults with overweight or obesity without diabetes over 68 weeks.",
      },
      {
        question: "Which produced more weight change in STEP-8?",
        answer:
          "Semaglutide 2.4 mg produced approximately −15.8% mean weight change versus approximately −6.4% with Liraglutide 3.0 mg at week 68.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed head-to-head Phase 3 randomised trial published in JAMA (Rubino et al. 2022).",
  },
  // ------------------------------------------------------------------ SURPASS-1
  {
    slug: "surpass-1",
    compound: "tirzepatide",
    mechanismIds: ["glp1r", "gipr"],
    shortName: "SURPASS-1",
    fullTitle:
      "SURPASS-1 — Tirzepatide monotherapy in type 2 diabetes",
    eyebrow: "T2D MONOTHERAPY RCT",
    headline:
      "Rosenstock et al., Lancet, 2021. 40-week randomised placebo-controlled monotherapy trial of once-weekly Tirzepatide (5, 10 and 15 mg) in adults with type 2 diabetes inadequately controlled by diet and exercise.",
    reference: REF.surpass1,
    description:
      "Educational summary of SURPASS-1, the Phase 3 monotherapy trial evaluating once-weekly Tirzepatide 5, 10 and 15 mg versus placebo in drug-naïve adults with type 2 diabetes.",
    quickAnswer:
      "SURPASS-1 was a 40-week randomised double-blind placebo-controlled monotherapy trial of once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) versus placebo in 478 adults with type 2 diabetes inadequately controlled by diet and exercise. All three Tirzepatide doses produced substantially greater HbA1c and body-weight reduction than placebo.",
    extendedAnswer:
      "SURPASS-1 was a 40-week, randomised, double-blind, placebo-controlled Phase 3 monotherapy trial evaluating once-weekly subcutaneous Tirzepatide at 5, 10 and 15 mg maintenance doses versus placebo in adults with type 2 diabetes inadequately controlled by diet and exercise alone. Published by Rosenstock and colleagues in the Lancet in 2021, the trial randomised 478 participants and reported mean HbA1c reductions of approximately −1.87% to −2.07% across Tirzepatide doses versus +0.04% with placebo, and mean body-weight reductions of approximately −7.0 kg to −9.5 kg versus −0.7 kg with placebo. SURPASS-1 provided the first Phase 3 monotherapy evidence for the dual GIP/GLP-1 receptor agonist class and anchored the subsequent SURPASS programme.",
    keyFacts: [
      { label: "Compound", value: "Tirzepatide 5, 10, 15 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, Phase 3" },
      { label: "N", value: "478" },
      { label: "Population", value: "Adults with T2D on diet and exercise only" },
      { label: "Duration", value: "40 weeks" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "Lancet (2021)" },
      { label: "DOI", value: "10.1016/S0140-6736(21)01324-6" },
      { label: "PMID", value: "34186022" },
    ],
    background:
      "Dual GIP/GLP-1 receptor agonism was hypothesised to widen the incretin response beyond GLP-1 mono-agonism. SURPASS-1 was the first Phase 3 monotherapy trial for Tirzepatide and the first Phase 3 monotherapy trial in the dual-agonist class.",
    design:
      "Randomised, double-blind, placebo-controlled, four-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1:1 to Tirzepatide 5 mg, Tirzepatide 10 mg, Tirzepatide 15 mg or matching placebo, each administered subcutaneously once weekly for 40 weeks.",
    population:
      "478 adults with type 2 diabetes and inadequate glycaemic control (HbA1c 7.0–9.5%) on diet and exercise alone, without concomitant glucose-lowering medication.",
    intervention:
      "Once-weekly subcutaneous Tirzepatide titrated to 5, 10 or 15 mg maintenance dose.",
    comparator: "Matching placebo administered subcutaneously once weekly.",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 40 (each Tirzepatide dose versus placebo).",
    secondaryEndpoints:
      "Change in body weight, proportion achieving HbA1c targets (<7%, <6.5%, <5.7%), fasting glucose, waist circumference and safety.",
    keyFindings: [
      "Mean HbA1c reduction from baseline was approximately −1.87% (5 mg), −1.89% (10 mg) and −2.07% (15 mg) with Tirzepatide versus +0.04% with placebo.",
      "Mean body-weight reduction was approximately −7.0 kg (5 mg), −7.8 kg (10 mg) and −9.5 kg (15 mg) with Tirzepatide versus −0.7 kg with placebo.",
      "The majority of Tirzepatide-treated participants achieved HbA1c <7% and a substantial proportion achieved <5.7%.",
      "Gastrointestinal adverse events (nausea, diarrhoea, vomiting) were the most common tolerability finding, predominantly during titration.",
    ],
    mechanisticSignificance: [
      "Consistent with the hypothesis that GIPR co-agonism broadens the incretin response and augments GLP-1R–mediated effects on glycaemic control and body weight.",
      "Established a monotherapy dose-response reference for subsequent SURPASS and SURMOUNT trials.",
    ],
    limitations: [
      "40-week duration is short relative to lifelong glycaemic management of type 2 diabetes.",
      "Monotherapy design excludes participants on concurrent glucose-lowering agents; generalisability to typical polypharmacy is addressed in SURPASS-3 through SURPASS-5.",
      "The trial was not powered for cardiovascular outcomes; SURPASS-CVOT addresses this separately.",
    ],
    researchContext:
      "SURPASS-1 anchors the SURPASS programme and framed subsequent active-controlled trials (SURPASS-2 against Semaglutide, SURPASS-3 against insulin degludec, SURPASS-4 against insulin glargine, SURPASS-5 as add-on to basal insulin).",
    relatedStudies: withoutSelf("surpass-1", [
      ...surpassRelated,
      { slug: "step-8", label: "STEP-8 (Semaglutide vs Liraglutide)" },
    ]),
    faqs: [
      {
        question: "What was SURPASS-1?",
        answer:
          "SURPASS-1 (Rosenstock et al., Lancet 2021) was a 40-week randomised double-blind placebo-controlled Phase 3 monotherapy trial evaluating once-weekly subcutaneous Tirzepatide 5, 10 and 15 mg versus placebo in 478 adults with type 2 diabetes inadequately controlled by diet and exercise alone.",
      },
      {
        question: "What did SURPASS-1 show?",
        answer:
          "All three Tirzepatide doses produced substantially greater HbA1c reduction (approximately −1.87% to −2.07%) and body-weight reduction (approximately −7.0 kg to −9.5 kg) than placebo at week 40.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised placebo-controlled monotherapy trial published in the Lancet (Rosenstock et al. 2021).",
  },
  // ------------------------------------------------------------------ SURPASS-2
  {
    slug: "surpass-2",
    compound: "tirzepatide",
    mechanismIds: ["glp1r", "gipr"],
    shortName: "SURPASS-2",
    fullTitle:
      "SURPASS-2 — Tirzepatide vs Semaglutide once weekly in type 2 diabetes",
    eyebrow: "HEAD-TO-HEAD RCT",
    headline:
      "Frías et al., New England Journal of Medicine, 2021. 40-week head-to-head randomised trial of once-weekly Tirzepatide (5, 10 and 15 mg) versus once-weekly Semaglutide 1 mg in adults with type 2 diabetes on metformin.",
    reference: REF.surpass2,
    description:
      "Educational summary of SURPASS-2, the 40-week head-to-head randomised trial comparing once-weekly Tirzepatide with once-weekly Semaglutide 1 mg in adults with type 2 diabetes on background metformin.",
    quickAnswer:
      "SURPASS-2 was a 40-week randomised open-label head-to-head Phase 3 trial comparing once-weekly Tirzepatide 5, 10 and 15 mg with once-weekly Semaglutide 1 mg in 1,879 adults with type 2 diabetes on background metformin. Tirzepatide produced greater HbA1c reduction and greater body-weight reduction than Semaglutide 1 mg.",
    extendedAnswer:
      "SURPASS-2 was a 40-week, randomised, open-label, head-to-head Phase 3 trial comparing once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) with once-weekly subcutaneous Semaglutide 1 mg in adults with type 2 diabetes inadequately controlled on metformin monotherapy. Published by Frías and colleagues in the New England Journal of Medicine in 2021, the trial randomised 1,879 participants 1:1:1:1. All three Tirzepatide doses produced greater HbA1c reduction than Semaglutide 1 mg (approximately −2.01% to −2.30% vs −1.86%) and greater body-weight reduction (approximately −7.6 kg to −11.2 kg vs −5.7 kg) at week 40. SURPASS-2 is the reference head-to-head comparison of a dual GIP/GLP-1 receptor agonist with a mono-GLP-1 receptor agonist in type 2 diabetes.",
    keyFacts: [
      { label: "Compounds", value: "Tirzepatide 5/10/15 mg vs Semaglutide 1 mg (SC weekly)" },
      { label: "Design", value: "Randomised, open-label, active-controlled, Phase 3" },
      { label: "N", value: "1,879" },
      { label: "Population", value: "Adults with T2D on metformin" },
      { label: "Duration", value: "40 weeks" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "New England Journal of Medicine (2021)" },
      { label: "DOI", value: "10.1056/NEJMoa2107519" },
      { label: "PMID", value: "34170647" },
    ],
    background:
      "Semaglutide 1 mg once weekly was, at the time, a leading GLP-1 receptor agonist for glycaemic control in type 2 diabetes. SURPASS-2 was designed as the direct randomised head-to-head comparison of Tirzepatide with Semaglutide 1 mg on background metformin.",
    design:
      "Randomised, open-label, active-controlled, four-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1:1 to Tirzepatide 5 mg, Tirzepatide 10 mg, Tirzepatide 15 mg or Semaglutide 1 mg, each administered subcutaneously once weekly for 40 weeks alongside stable metformin.",
    population:
      "1,879 adults with type 2 diabetes and HbA1c 7.0–10.5% on metformin (≥1500 mg/day).",
    intervention:
      "Once-weekly subcutaneous Tirzepatide titrated to 5, 10 or 15 mg.",
    comparator: "Once-weekly subcutaneous Semaglutide titrated to 1 mg.",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 40, tested for non-inferiority and superiority of each Tirzepatide dose vs Semaglutide 1 mg.",
    secondaryEndpoints:
      "Body-weight reduction, proportions achieving HbA1c targets (<7%, <5.7%), fasting glucose, insulin resistance markers, safety and tolerability.",
    keyFindings: [
      "Mean HbA1c reduction from baseline was approximately −2.01% (5 mg), −2.24% (10 mg) and −2.30% (15 mg) with Tirzepatide versus approximately −1.86% with Semaglutide 1 mg.",
      "All three Tirzepatide doses met non-inferiority and superiority criteria vs Semaglutide 1 mg for HbA1c reduction.",
      "Mean body-weight reduction was approximately −7.6 kg (5 mg), −9.3 kg (10 mg) and −11.2 kg (15 mg) with Tirzepatide versus approximately −5.7 kg with Semaglutide 1 mg.",
      "Gastrointestinal adverse events were the dominant tolerability finding across both compounds, predominantly during dose titration.",
    ],
    mechanisticSignificance: [
      "Consistent with the hypothesis that dual GIP/GLP-1 receptor agonism produces a broader incretin response than mono-GLP-1 receptor agonism.",
      "Provides the first direct randomised comparison against Semaglutide and remains a reference dataset for subsequent triple-agonist (Retatrutide) contextualisation.",
    ],
    limitations: [
      "Open-label design may introduce behavioural bias despite blinded outcome assessment for laboratory endpoints.",
      "Semaglutide comparator dose was the licensed diabetes dose (1 mg), not the weight-management dose (2.4 mg). Cross-dose comparisons require care.",
      "40-week duration is short relative to lifelong glycaemic management.",
    ],
    researchContext:
      "SURPASS-2 is the anchor head-to-head trial for Tirzepatide vs Semaglutide in type 2 diabetes and is the reference used across the incretin literature when contextualising later dual and triple-agonist trials.",
    relatedStudies: withoutSelf("surpass-2", [
      ...surpassRelated,
      { slug: "step-8", label: "STEP-8 (Semaglutide vs Liraglutide)" },
      { slug: "retatrutide-phase-2-diabetes", label: "Retatrutide Phase 2 Diabetes" },
    ]),
    faqs: [
      {
        question: "What did SURPASS-2 show?",
        answer:
          "SURPASS-2 (Frías et al., NEJM 2021) showed that once-weekly Tirzepatide (5, 10 and 15 mg) produced greater HbA1c reduction and greater body-weight reduction than once-weekly Semaglutide 1 mg over 40 weeks in adults with type 2 diabetes on background metformin.",
      },
      {
        question: "What is the difference between Tirzepatide and Semaglutide?",
        answer:
          "Tirzepatide is a dual GIP/GLP-1 receptor agonist. Semaglutide is a mono-GLP-1 receptor agonist. SURPASS-2 provides the primary randomised head-to-head comparison in type 2 diabetes at Semaglutide's licensed 1 mg diabetes dose.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed head-to-head Phase 3 randomised trial published in the New England Journal of Medicine (Frías et al. 2021).",
  },
  // ------------------------------------------------------------------ SURPASS-3
  {
    slug: "surpass-3",
    compound: "tirzepatide",
    mechanismIds: ["glp1r", "gipr"],
    shortName: "SURPASS-3",
    fullTitle:
      "SURPASS-3 — Tirzepatide vs insulin degludec in type 2 diabetes",
    eyebrow: "VS BASAL INSULIN RCT",
    headline:
      "Ludvik et al., Lancet, 2021. 52-week randomised open-label trial of once-weekly Tirzepatide (5, 10 and 15 mg) versus once-daily insulin degludec in adults with type 2 diabetes on metformin (± SGLT2 inhibitor).",
    reference: REF.surpass3,
    description:
      "Educational summary of SURPASS-3, the 52-week randomised open-label active-controlled trial comparing once-weekly Tirzepatide with once-daily insulin degludec in adults with type 2 diabetes.",
    quickAnswer:
      "SURPASS-3 was a 52-week randomised open-label active-controlled Phase 3 trial comparing once-weekly Tirzepatide 5, 10 and 15 mg with once-daily titrated insulin degludec in 1,444 adults with type 2 diabetes on metformin ± SGLT2 inhibitor. All three Tirzepatide doses produced greater HbA1c and body-weight reduction than insulin degludec.",
    extendedAnswer:
      "SURPASS-3 was a 52-week, randomised, open-label, active-controlled Phase 3 trial comparing once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) with once-daily titrated insulin degludec as add-on therapy in adults with type 2 diabetes inadequately controlled on metformin, with or without an SGLT2 inhibitor. Published by Ludvik and colleagues in the Lancet in 2021, the trial randomised 1,444 participants and reported HbA1c reductions of approximately −1.93% to −2.37% with Tirzepatide versus approximately −1.34% with insulin degludec, together with weight reduction with Tirzepatide compared to weight gain with insulin degludec. SURPASS-3 is the reference randomised comparison of a dual incretin receptor agonist with basal insulin as add-on therapy.",
    keyFacts: [
      { label: "Compounds", value: "Tirzepatide 5/10/15 mg SC weekly vs insulin degludec SC daily (titrated)" },
      { label: "Design", value: "Randomised, open-label, active-controlled, Phase 3" },
      { label: "N", value: "1,444" },
      { label: "Population", value: "Adults with T2D on metformin ± SGLT2 inhibitor" },
      { label: "Duration", value: "52 weeks" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "Lancet (2021)" },
      { label: "DOI", value: "10.1016/S0140-6736(21)01443-4" },
      { label: "PMID", value: "34370970" },
    ],
    background:
      "Basal insulin remains a standard add-on option when oral glucose-lowering therapy is insufficient. SURPASS-3 was designed to compare Tirzepatide against a titrated basal insulin (insulin degludec) as add-on therapy in adults with type 2 diabetes on metformin ± SGLT2 inhibitor.",
    design:
      "Randomised, open-label, active-controlled, four-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1:1 to Tirzepatide 5 mg, 10 mg or 15 mg once weekly or once-daily insulin degludec titrated to a fasting self-monitored blood glucose target, for 52 weeks alongside stable background therapy.",
    population:
      "1,444 adults with type 2 diabetes and HbA1c 7.0–10.5% on metformin (with or without an SGLT2 inhibitor).",
    intervention:
      "Once-weekly subcutaneous Tirzepatide titrated to 5, 10 or 15 mg.",
    comparator: "Once-daily subcutaneous insulin degludec titrated by protocol.",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 52.",
    secondaryEndpoints:
      "Change in body weight, proportions achieving HbA1c <7% and <5.7%, hypoglycaemia rates, fasting glucose, safety and tolerability.",
    keyFindings: [
      "Mean HbA1c reduction from baseline was approximately −1.93% (5 mg), −2.20% (10 mg) and −2.37% (15 mg) with Tirzepatide versus approximately −1.34% with insulin degludec.",
      "Body-weight change diverged sharply: weight reduction with Tirzepatide versus weight gain with insulin degludec.",
      "Rates of clinically significant hypoglycaemia were lower with Tirzepatide than with insulin degludec.",
      "Gastrointestinal adverse events were the dominant tolerability finding with Tirzepatide.",
    ],
    mechanisticSignificance: [
      "Illustrates the clinical distinction between glucose-dependent incretin action (Tirzepatide) and non–glucose-dependent basal insulin, particularly with respect to hypoglycaemia and body-weight trajectory.",
      "Supports the pharmacological rationale for dual GIP/GLP-1 receptor agonism as an alternative to basal insulin escalation in appropriate research populations.",
    ],
    limitations: [
      "Open-label design.",
      "Comparator titration protocols vary across trials; direct cross-trial comparison of insulin arms requires care.",
      "Cardiovascular and renal outcomes were not primary endpoints.",
    ],
    researchContext:
      "SURPASS-3 sits alongside SURPASS-4 (vs insulin glargine, high-CV-risk) and SURPASS-5 (add-on to basal insulin) as the SURPASS trials against or with basal insulin.",
    relatedStudies: withoutSelf("surpass-3", surpassRelated),
    faqs: [
      {
        question: "What did SURPASS-3 compare?",
        answer:
          "SURPASS-3 compared once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) with once-daily titrated insulin degludec as add-on therapy in adults with type 2 diabetes on metformin (± SGLT2 inhibitor) over 52 weeks.",
      },
      {
        question: "Did SURPASS-3 report hypoglycaemia?",
        answer:
          "Rates of clinically significant hypoglycaemia were lower with Tirzepatide than with insulin degludec, consistent with the glucose-dependent mechanism of incretin agonism.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised active-controlled trial published in the Lancet (Ludvik et al. 2021).",
  },
  // ------------------------------------------------------------------ SURPASS-4
  {
    slug: "surpass-4",
    compound: "tirzepatide",
    mechanismIds: ["glp1r", "gipr"],
    shortName: "SURPASS-4",
    fullTitle:
      "SURPASS-4 — Tirzepatide vs insulin glargine in type 2 diabetes and elevated cardiovascular risk",
    eyebrow: "HIGH CV RISK RCT",
    headline:
      "Del Prato et al., Lancet, 2021. Randomised open-label trial of once-weekly Tirzepatide vs once-daily insulin glargine (titrated) in adults with type 2 diabetes and elevated cardiovascular risk, with a pre-specified CV meta-analysis.",
    reference: REF.surpass4,
    description:
      "Educational summary of SURPASS-4, the randomised open-label active-controlled trial of once-weekly Tirzepatide versus once-daily insulin glargine in adults with type 2 diabetes and elevated cardiovascular risk.",
    quickAnswer:
      "SURPASS-4 was a randomised open-label active-controlled Phase 3 trial comparing once-weekly Tirzepatide (5, 10 and 15 mg) with once-daily titrated insulin glargine in 2,002 adults with type 2 diabetes and elevated cardiovascular risk on ≥1 oral glucose-lowering agent. All three Tirzepatide doses produced greater HbA1c and body-weight reduction than insulin glargine, with a pre-specified CV meta-analysis showing no excess of MACE.",
    extendedAnswer:
      "SURPASS-4 was a randomised, open-label, active-controlled Phase 3 trial comparing once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) with once-daily titrated insulin glargine as add-on therapy in adults with type 2 diabetes and elevated cardiovascular risk on one to three oral glucose-lowering agents. Published by Del Prato and colleagues in the Lancet in 2021, the trial randomised 2,002 participants for 52 weeks of primary analysis with up to 104 weeks of exposure and a pre-specified cardiovascular meta-analysis pooling SURPASS trials. All three Tirzepatide doses produced greater HbA1c and body-weight reduction than insulin glargine. The pre-specified cardiovascular meta-analysis showed no increased risk of major adverse cardiovascular events with Tirzepatide relative to controls.",
    keyFacts: [
      { label: "Compounds", value: "Tirzepatide 5/10/15 mg SC weekly vs insulin glargine SC daily (titrated)" },
      { label: "Design", value: "Randomised, open-label, active-controlled, Phase 3 with pre-specified CV meta-analysis" },
      { label: "N", value: "2,002" },
      { label: "Population", value: "Adults with T2D + elevated CV risk on 1–3 oral agents" },
      { label: "Duration", value: "52-week primary; up to 104-week exposure" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "Lancet (2021)" },
      { label: "DOI", value: "10.1016/S0140-6736(21)02188-7" },
      { label: "PMID", value: "34600607" },
    ],
    background:
      "Cardiovascular safety is central to type 2 diabetes therapeutic development. SURPASS-4 was designed to evaluate Tirzepatide against titrated insulin glargine as add-on therapy in adults with type 2 diabetes and elevated cardiovascular risk, and to contribute to a pre-specified cardiovascular meta-analysis across SURPASS trials.",
    design:
      "Randomised, open-label, active-controlled, four-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1:3 (Tirzepatide 5, 10, 15 mg vs insulin glargine, weighted toward glargine for CV endpoint accrual). The primary analysis is at week 52; exposure extended to week 104.",
    population:
      "2,002 adults with type 2 diabetes, HbA1c 7.5–10.5%, elevated cardiovascular risk (established atherosclerotic CVD or multiple risk factors), on one to three oral glucose-lowering agents.",
    intervention:
      "Once-weekly subcutaneous Tirzepatide titrated to 5, 10 or 15 mg.",
    comparator:
      "Once-daily subcutaneous insulin glargine titrated by protocol.",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 52 for each Tirzepatide dose versus insulin glargine.",
    secondaryEndpoints:
      "Change in body weight, hypoglycaemia rates, and the pre-specified cardiovascular meta-analysis across SURPASS trials.",
    keyFindings: [
      "All three Tirzepatide doses produced greater HbA1c reduction than insulin glargine at week 52.",
      "Body-weight reduction with Tirzepatide contrasted with weight gain with insulin glargine.",
      "Rates of clinically significant hypoglycaemia were lower with Tirzepatide than with insulin glargine.",
      "The pre-specified cardiovascular meta-analysis showed no excess of major adverse cardiovascular events with Tirzepatide versus controls.",
    ],
    mechanisticSignificance: [
      "Contributes to the emerging cardiovascular safety profile of dual GIP/GLP-1 receptor agonists ahead of dedicated cardiovascular outcomes trials (SURPASS-CVOT).",
      "Reinforces the glucose-dependent, weight-neutral-to-favourable pharmacology of dual incretin agonism relative to basal insulin.",
    ],
    limitations: [
      "Open-label design.",
      "The trial was not powered as a definitive cardiovascular outcomes trial; the CV read-out relies on a pre-specified meta-analysis.",
      "Long-term (>2-year) outcomes require SURPASS-CVOT.",
    ],
    researchContext:
      "SURPASS-4 is the SURPASS trial specifically enriched for cardiovascular risk and contributes the largest single-trial contribution to the pooled SURPASS CV meta-analysis, complementing SURPASS-3 and SURPASS-5.",
    relatedStudies: withoutSelf("surpass-4", surpassRelated),
    faqs: [
      {
        question: "What population did SURPASS-4 enrol?",
        answer:
          "SURPASS-4 enrolled 2,002 adults with type 2 diabetes and elevated cardiovascular risk (established atherosclerotic CVD or multiple risk factors) on one to three oral glucose-lowering agents.",
      },
      {
        question: "Did SURPASS-4 show cardiovascular safety for Tirzepatide?",
        answer:
          "A pre-specified cardiovascular meta-analysis across SURPASS trials, anchored by SURPASS-4, showed no excess of major adverse cardiovascular events with Tirzepatide versus controls. A dedicated cardiovascular outcomes trial (SURPASS-CVOT) is ongoing.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised active-controlled trial with pre-specified CV meta-analysis, published in the Lancet (Del Prato et al. 2021).",
  },
  // ------------------------------------------------------------------ SURPASS-5
  {
    slug: "surpass-5",
    compound: "tirzepatide",
    mechanismIds: ["glp1r", "gipr"],
    shortName: "SURPASS-5",
    fullTitle:
      "SURPASS-5 — Tirzepatide added to titrated insulin glargine in type 2 diabetes",
    eyebrow: "ADD-ON TO BASAL INSULIN RCT",
    headline:
      "Dahl et al., JAMA, 2022. 40-week randomised double-blind placebo-controlled trial of once-weekly Tirzepatide added to titrated insulin glargine in adults with type 2 diabetes inadequately controlled on basal insulin.",
    reference: REF.surpass5,
    description:
      "Educational summary of SURPASS-5, the randomised placebo-controlled trial of once-weekly Tirzepatide as add-on to titrated insulin glargine in adults with type 2 diabetes on basal insulin.",
    quickAnswer:
      "SURPASS-5 was a 40-week randomised double-blind placebo-controlled Phase 3 trial of once-weekly Tirzepatide (5, 10 and 15 mg) versus placebo, both added to titrated insulin glargine, in 475 adults with type 2 diabetes inadequately controlled on basal insulin ± metformin. All three Tirzepatide doses produced greater HbA1c and body-weight reduction than placebo.",
    extendedAnswer:
      "SURPASS-5 was a 40-week, randomised, double-blind, placebo-controlled Phase 3 trial evaluating once-weekly subcutaneous Tirzepatide (5, 10 and 15 mg) versus placebo as add-on therapy to titrated insulin glargine, with or without background metformin, in adults with type 2 diabetes inadequately controlled on basal insulin. Published by Dahl and colleagues in JAMA in 2022, the trial randomised 475 participants and reported HbA1c reductions of approximately −2.11% to −2.34% with Tirzepatide versus approximately −0.86% with placebo, and body-weight reductions with Tirzepatide compared to weight gain with placebo (both arms on titrated basal insulin). SURPASS-5 completes the SURPASS core Phase 3 programme by covering the basal-insulin-inadequate segment.",
    keyFacts: [
      { label: "Compound", value: "Tirzepatide 5/10/15 mg SC weekly (add-on to insulin glargine)" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, Phase 3" },
      { label: "N", value: "475" },
      { label: "Population", value: "Adults with T2D on titrated insulin glargine ± metformin" },
      { label: "Duration", value: "40 weeks" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "JAMA (2022)" },
      { label: "DOI", value: "10.1001/jama.2022.0078" },
      { label: "PMID", value: "35113170" },
    ],
    background:
      "Adults with type 2 diabetes on basal insulin frequently remain above HbA1c targets. SURPASS-5 was designed to evaluate Tirzepatide as an add-on to titrated insulin glargine, addressing the basal-insulin-inadequate segment that SURPASS-3 and SURPASS-4 did not cover.",
    design:
      "Randomised, double-blind, placebo-controlled, four-arm parallel-group Phase 3 trial. Participants were randomised 1:1:1:1 to Tirzepatide 5, 10 or 15 mg or placebo, each administered subcutaneously once weekly for 40 weeks, all arms with titrated insulin glargine and stable metformin where applicable.",
    population:
      "475 adults with type 2 diabetes and HbA1c 7.0–10.5% on titrated insulin glargine ± metformin.",
    intervention:
      "Once-weekly subcutaneous Tirzepatide titrated to 5, 10 or 15 mg added to titrated insulin glargine.",
    comparator: "Matching placebo added to titrated insulin glargine.",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 40 for each Tirzepatide dose versus placebo.",
    secondaryEndpoints:
      "Change in body weight, insulin dose, hypoglycaemia rates, proportion achieving HbA1c <7% and <5.7%, and safety.",
    keyFindings: [
      "Mean HbA1c reduction was approximately −2.11% (5 mg), −2.24% (10 mg) and −2.34% (15 mg) with Tirzepatide versus approximately −0.86% with placebo.",
      "Body-weight reduction with Tirzepatide contrasted with modest weight gain in the placebo-plus-insulin arm.",
      "Basal insulin dose requirements were lower with Tirzepatide than with placebo.",
      "Gastrointestinal adverse events were the dominant tolerability finding.",
    ],
    mechanisticSignificance: [
      "Demonstrates additive glycaemic and body-weight effect of dual GIP/GLP-1 receptor agonism on top of a titrated basal insulin backbone.",
      "Supports the pharmacological hypothesis that incretin-mediated glucose-dependent insulin secretion and central appetite modulation act on axes distinct from exogenous basal insulin.",
    ],
    limitations: [
      "40-week duration is short relative to lifelong glycaemic management.",
      "Placebo-controlled add-on design does not compare Tirzepatide with intensifying insulin regimens (basal-bolus or premix).",
      "The trial was not powered for cardiovascular outcomes.",
    ],
    researchContext:
      "SURPASS-5 completes the core SURPASS Phase 3 programme by covering the basal-insulin-inadequate segment and complements SURPASS-3 (vs basal insulin) and SURPASS-4 (elevated CV risk).",
    relatedStudies: withoutSelf("surpass-5", surpassRelated),
    faqs: [
      {
        question: "What did SURPASS-5 evaluate?",
        answer:
          "SURPASS-5 evaluated once-weekly Tirzepatide (5, 10 and 15 mg) versus placebo, both added to titrated insulin glargine ± metformin, in adults with type 2 diabetes inadequately controlled on basal insulin.",
      },
      {
        question: "What did SURPASS-5 report?",
        answer:
          "All three Tirzepatide doses produced greater HbA1c reduction (approximately −2.11% to −2.34% vs −0.86% with placebo) and greater body-weight reduction than placebo added to titrated insulin glargine at week 40.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 3 randomised placebo-controlled trial published in JAMA (Dahl et al. 2022).",
  },
  // ------------------------------------------------------------------ Reta Obesity
  {
    slug: "retatrutide-phase-2-obesity",
    compound: "retatrutide",
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    shortName: "Retatrutide Phase 2 (Obesity)",
    fullTitle:
      "Retatrutide Phase 2 Obesity Trial — Triple GIP / GLP-1 / glucagon receptor agonist in adults with obesity",
    eyebrow: "PHASE 2 OBESITY RCT",
    headline:
      "Jastreboff et al., New England Journal of Medicine, 2023. 48-week randomised placebo-controlled Phase 2 trial of once-weekly Retatrutide (1, 4, 8 and 12 mg) in adults with obesity without diabetes.",
    reference: REF.retaObesity,
    description:
      "Educational summary of the Retatrutide Phase 2 Obesity trial (Jastreboff et al., NEJM 2023) — the first randomised Phase 2 evidence for the triple GIP/GLP-1/glucagon receptor agonist Retatrutide in adults with obesity.",
    quickAnswer:
      "The Retatrutide Phase 2 obesity trial was a 48-week randomised double-blind placebo-controlled Phase 2 dose-ranging trial of once-weekly Retatrutide (1, 4, 8 and 12 mg) in 338 adults with obesity without diabetes. Mean weight change at week 48 was approximately −24.2% at the highest Retatrutide dose versus approximately −2.1% with placebo.",
    extendedAnswer:
      "The Retatrutide Phase 2 obesity trial was a 48-week, randomised, double-blind, placebo-controlled dose-ranging Phase 2 trial evaluating once-weekly subcutaneous Retatrutide at 1, 4, 8 and 12 mg maintenance doses versus placebo in adults with obesity (BMI ≥ 30, or ≥ 27 with a weight-related coexisting condition) without diabetes. Published by Jastreboff and colleagues in the New England Journal of Medicine in 2023, the trial randomised 338 participants and reported dose-dependent weight change, with a mean of approximately −24.2% at the 12 mg maintenance dose versus approximately −2.1% with placebo at week 48. The trial is the first randomised Phase 2 evidence for the triple GIP/GLP-1/glucagon receptor agonist class in obesity and framed the ongoing Phase 3 TRIUMPH programme. Oxford Research Peptides supplies Retatrutide strictly as an in-vitro reference standard.",
    keyFacts: [
      { label: "Compound", value: "Retatrutide 1/4/8/12 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo-controlled, dose-ranging, Phase 2" },
      { label: "N", value: "338" },
      { label: "Population", value: "Adults with obesity, without diabetes" },
      { label: "Duration", value: "48 weeks" },
      { label: "Primary outcome", value: "Percent change in body weight from baseline" },
      { label: "Journal", value: "New England Journal of Medicine (2023)" },
      { label: "DOI", value: "10.1056/NEJMoa2301972" },
      { label: "PMID", value: "37366315" },
    ],
    background:
      "Triple GIP/GLP-1/glucagon receptor agonism was hypothesised to combine incretin-mediated glucose-dependent insulin secretion and central appetite modulation with glucagon-mediated increases in energy expenditure. The Retatrutide Phase 2 obesity trial provided the first randomised Phase 2 evidence in the class in adults with obesity.",
    design:
      "Randomised, double-blind, placebo-controlled, dose-ranging Phase 2 trial. Participants were randomised across multiple Retatrutide dose arms (1, 4, 8 and 12 mg maintenance) and matching placebo, each administered subcutaneously once weekly for 48 weeks alongside lifestyle intervention.",
    population:
      "338 adults with a body-mass index of at least 30, or at least 27 with a weight-related coexisting condition, without type 2 diabetes.",
    intervention:
      "Once-weekly subcutaneous Retatrutide titrated over several weeks to 1, 4, 8 or 12 mg maintenance dose.",
    comparator: "Matching placebo administered subcutaneously once weekly.",
    primaryEndpoints:
      "Percent change in body weight from baseline to week 24 and week 48.",
    secondaryEndpoints:
      "Proportions achieving ≥5%, ≥10%, ≥15% and ≥20% weight reduction; change in waist circumference, systolic blood pressure, HbA1c, fasting glucose, lipid parameters and patient-reported outcomes.",
    keyFindings: [
      "Mean change in body weight at week 48 was approximately −8.7% (1 mg), −17.1% (4 mg), −22.8% (8 mg) and −24.2% (12 mg) with Retatrutide versus approximately −2.1% with placebo.",
      "Substantial proportions of participants at higher doses achieved ≥20% and ≥25% weight reduction.",
      "Improvements were reported in waist circumference, blood pressure and cardiometabolic parameters.",
      "Gastrointestinal adverse events were the dominant tolerability finding and were dose-dependent.",
    ],
    mechanisticSignificance: [
      "Consistent with the triple-agonist hypothesis that adding glucagon receptor agonism to dual GIP/GLP-1 co-agonism further modulates energy balance.",
      "The magnitude of weight reduction observed extends the incretin-agonist dose-response curve beyond Semaglutide (STEP) and Tirzepatide (SURMOUNT) references.",
    ],
    limitations: [
      "Phase 2 trial with a smaller sample size than Phase 3 programmes.",
      "48-week duration; longer-term durability requires ongoing Phase 3 evaluation (TRIUMPH).",
      "Weight change is a surrogate for downstream cardiometabolic outcomes.",
      "Concerns around glucagon-mediated glycaemic and lipid effects require larger longer-term evaluation.",
    ],
    researchContext:
      "The Retatrutide Phase 2 obesity trial is the reference Phase 2 dataset for the triple-agonist class in obesity and framed the ongoing Phase 3 TRIUMPH programme. It is routinely contextualised against STEP-1 (Semaglutide) and SURMOUNT-1 (Tirzepatide).",
    relatedStudies: [
      { slug: "retatrutide-phase-2-diabetes", label: "Retatrutide Phase 2 Diabetes" },
      { slug: "step-1", label: "STEP-1 (Semaglutide)" },
      { slug: "step-5", label: "STEP-5 (two-year Semaglutide)" },
      { slug: "surpass-2", label: "SURPASS-2 (Tirzepatide vs Semaglutide)" },
    ],
    faqs: [
      {
        question: "What is Retatrutide?",
        answer:
          "Retatrutide (LY3437943) is an investigational triple GIP / GLP-1 / glucagon receptor agonist peptide. Oxford Research Peptides supplies Retatrutide strictly as a lyophilised reference standard for in-vitro laboratory research only.",
      },
      {
        question: "How much weight was lost in the Retatrutide Phase 2 obesity trial?",
        answer:
          "Mean change in body weight from baseline at week 48 was approximately −8.7% (1 mg), −17.1% (4 mg), −22.8% (8 mg) and −24.2% (12 mg) with Retatrutide versus approximately −2.1% with placebo.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 2 randomised placebo-controlled dose-ranging trial published in the New England Journal of Medicine (Jastreboff et al. 2023).",
  },
  // ------------------------------------------------------------------ Reta Diabetes
  {
    slug: "retatrutide-phase-2-diabetes",
    compound: "retatrutide",
    mechanismIds: ["glp1r", "gipr", "gcgr"],
    shortName: "Retatrutide Phase 2 (Diabetes)",
    fullTitle:
      "Retatrutide Phase 2 Diabetes Trial — Triple GIP / GLP-1 / glucagon receptor agonist in type 2 diabetes",
    eyebrow: "PHASE 2 T2D RCT",
    headline:
      "Rosenstock et al., Lancet, 2023. 36-week randomised double-blind, placebo- and active-controlled Phase 2 trial of once-weekly Retatrutide in adults with type 2 diabetes on diet, exercise and metformin.",
    reference: REF.retaDiabetes,
    description:
      "Educational summary of the Retatrutide Phase 2 diabetes trial (Rosenstock et al., Lancet 2023) — Phase 2 evidence for the triple GIP/GLP-1/glucagon receptor agonist Retatrutide in adults with type 2 diabetes.",
    quickAnswer:
      "The Retatrutide Phase 2 diabetes trial was a 36-week randomised double-blind, placebo- and active-controlled Phase 2 trial of once-weekly Retatrutide (0.5, 4, 8 and 12 mg) versus placebo and dulaglutide 1.5 mg in 281 adults with type 2 diabetes on diet, exercise and metformin. Retatrutide produced dose-dependent HbA1c and body-weight reduction, with the highest doses exceeding dulaglutide 1.5 mg.",
    extendedAnswer:
      "The Retatrutide Phase 2 diabetes trial was a 36-week, randomised, double-blind, placebo- and active-controlled Phase 2 trial evaluating once-weekly subcutaneous Retatrutide at 0.5, 4, 8 and 12 mg maintenance doses versus placebo and versus once-weekly dulaglutide 1.5 mg (active reference) in adults with type 2 diabetes on diet, exercise and metformin. Published by Rosenstock and colleagues in the Lancet in 2023, the trial randomised 281 participants and reported dose-dependent HbA1c reduction and body-weight reduction with Retatrutide, with the higher doses exceeding both placebo and the dulaglutide 1.5 mg active reference. The trial is the reference Phase 2 dataset for the triple-agonist class in type 2 diabetes.",
    keyFacts: [
      { label: "Compound", value: "Retatrutide 0.5/4/8/12 mg SC weekly" },
      { label: "Design", value: "Randomised, double-blind, placebo- and active-controlled, Phase 2" },
      { label: "N", value: "281" },
      { label: "Population", value: "Adults with T2D on diet, exercise and metformin" },
      { label: "Duration", value: "36 weeks" },
      { label: "Primary outcome", value: "Change in HbA1c from baseline" },
      { label: "Journal", value: "Lancet (2023)" },
      { label: "DOI", value: "10.1016/S0140-6736(23)01053-X" },
      { label: "PMID", value: "37364590" },
    ],
    background:
      "The Retatrutide Phase 2 diabetes trial was designed to evaluate the triple GIP/GLP-1/glucagon receptor agonist in the type 2 diabetes population, alongside a placebo comparator and an active GLP-1 receptor agonist reference (dulaglutide 1.5 mg once weekly).",
    design:
      "Randomised, double-blind, placebo- and active-controlled, multi-arm parallel-group Phase 2 trial. Participants were randomised across Retatrutide 0.5, 4, 8 and 12 mg maintenance-dose arms, matching placebo and dulaglutide 1.5 mg, each administered subcutaneously once weekly for 36 weeks.",
    population:
      "281 adults with type 2 diabetes and HbA1c 7.0–10.5% on diet, exercise and stable metformin.",
    intervention:
      "Once-weekly subcutaneous Retatrutide titrated to 0.5, 4, 8 or 12 mg maintenance dose.",
    comparator:
      "Matching placebo and once-weekly subcutaneous dulaglutide 1.5 mg (active reference).",
    primaryEndpoints:
      "Mean change in HbA1c from baseline to week 24 and week 36 for each Retatrutide dose versus placebo.",
    secondaryEndpoints:
      "Change in body weight, proportions achieving HbA1c targets (<7%, <5.7%), fasting glucose, lipid parameters, and comparisons versus dulaglutide 1.5 mg.",
    keyFindings: [
      "Dose-dependent HbA1c reduction was observed across Retatrutide arms, exceeding placebo at all doses and exceeding dulaglutide 1.5 mg at the higher doses.",
      "Dose-dependent body-weight reduction was observed, exceeding both placebo and dulaglutide 1.5 mg at higher doses.",
      "Gastrointestinal adverse events were the dominant tolerability finding and were dose-dependent.",
    ],
    mechanisticSignificance: [
      "Consistent with the triple-agonist hypothesis that combined GIP/GLP-1/glucagon receptor engagement modulates both glycaemic and weight axes beyond mono- or dual-agonist references.",
      "Provides the first randomised T2D dataset positioning Retatrutide against a mono-GLP-1 receptor agonist reference (dulaglutide 1.5 mg).",
    ],
    limitations: [
      "Phase 2 trial; smaller sample size than Phase 3 SURPASS/STEP references.",
      "36-week duration is short relative to lifelong glycaemic management.",
      "Dulaglutide 1.5 mg is not the maximum licensed dulaglutide dose (4.5 mg is licensed in some regions), which limits inference on GLP-1 receptor agonist head-to-head positioning.",
      "Longer-term glycaemic, lipid and safety data require Phase 3 evaluation.",
    ],
    researchContext:
      "The Retatrutide Phase 2 diabetes trial is the T2D companion to the Retatrutide Phase 2 obesity trial and sits alongside SURPASS-2 (Tirzepatide vs Semaglutide) as reference material for cross-class incretin-agonist comparisons.",
    relatedStudies: [
      { slug: "retatrutide-phase-2-obesity", label: "Retatrutide Phase 2 Obesity" },
      { slug: "surpass-1", label: "SURPASS-1 (Tirzepatide monotherapy)" },
      { slug: "surpass-2", label: "SURPASS-2 (Tirzepatide vs Semaglutide)" },
      { slug: "step-2", label: "STEP-2 (Semaglutide 2.4 mg in T2D)" },
    ],
    faqs: [
      {
        question: "What did the Retatrutide Phase 2 diabetes trial evaluate?",
        answer:
          "The Retatrutide Phase 2 diabetes trial evaluated once-weekly subcutaneous Retatrutide (0.5, 4, 8 and 12 mg) versus placebo and versus once-weekly dulaglutide 1.5 mg in adults with type 2 diabetes on diet, exercise and metformin over 36 weeks.",
      },
      {
        question: "Which Retatrutide dose performed best in the Phase 2 diabetes trial?",
        answer:
          "Higher Retatrutide doses (8 mg and 12 mg) produced greater HbA1c and body-weight reduction than placebo and exceeded dulaglutide 1.5 mg on both endpoints.",
      },
    ],
    evidenceSummary:
      "Peer-reviewed Phase 2 randomised placebo- and active-controlled trial published in the Lancet (Rosenstock et al. 2023).",
  },
];

// ---------------------------------------------------------------------------
// Public registry
// ---------------------------------------------------------------------------

export const programme1Studies: readonly StudyContent[] = configs.map(
  buildStudyContent,
);
