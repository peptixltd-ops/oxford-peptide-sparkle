/**
 * Authority Sprint 3B — Tirzepatide cornerstone cluster.
 *
 * Content activation only. Consumes existing Editorial, Publishing,
 * Knowledge Graph and Taxonomy infrastructure — no new components, no
 * new layouts. Every scientific claim is traceable to the citation
 * registry below.
 *
 * Tirzepatide is an approved therapeutic in the United Kingdom (as
 * Mounjaro and Zepbound). Oxford Research Peptides supplies Tirzepatide
 * strictly as a reference standard for in-vitro laboratory research —
 * this cluster documents the published scientific literature and does
 * not describe, recommend or endorse any therapeutic use.
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
// Citation registry
// ---------------------------------------------------------------------------

export const tirzepatideReferences: Reference[] = [
  {
    id: "coskun-2018",
    authors: ["Coskun T", "Sloop KW", "Loghin C", "et al."],
    year: 2018,
    title:
      "LY3298176, a novel dual GIP and GLP-1 receptor agonist for the treatment of type 2 diabetes mellitus: from discovery to clinical proof of concept.",
    journal: "Molecular Metabolism",
    volume: "18",
    pages: "3-14",
    doi: "10.1016/j.molmet.2018.09.009",
    pmid: "30293807",
  },
  {
    id: "willard-2020",
    authors: ["Willard FS", "Douros JD", "Gabe MBN", "et al."],
    year: 2020,
    title:
      "Tirzepatide is an imbalanced and biased dual GIP and GLP-1 receptor agonist.",
    journal: "JCI Insight",
    volume: "5",
    issue: "17",
    pages: "e140532",
    doi: "10.1172/jci.insight.140532",
    pmid: "32730231",
  },
  {
    id: "rosenstock-2021",
    authors: ["Rosenstock J", "Wysham C", "Frías JP", "et al."],
    year: 2021,
    title:
      "Efficacy and safety of a novel dual GIP and GLP-1 receptor agonist tirzepatide in patients with type 2 diabetes (SURPASS-1).",
    journal: "The Lancet",
    volume: "398",
    issue: "10295",
    pages: "143-155",
    doi: "10.1016/S0140-6736(21)01324-6",
    pmid: "34186022",
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
    id: "nauck-2021",
    authors: ["Nauck MA", "Meier JJ"],
    year: 2021,
    title:
      "GIP and GLP-1: stepsiblings rather than monozygotic twins within the incretin family.",
    journal: "Diabetes",
    volume: "70",
    issue: "9",
    pages: "1955-1966",
    doi: "10.2337/dbi21-0003",
    pmid: "34417262",
  },
  {
    id: "samms-2020",
    authors: ["Samms RJ", "Coghlan MP", "Sloop KW"],
    year: 2020,
    title:
      "How may GIP enhance the therapeutic efficacy of GLP-1?",
    journal: "Trends in Endocrinology & Metabolism",
    volume: "31",
    issue: "6",
    pages: "410-421",
    doi: "10.1016/j.tem.2020.02.006",
    pmid: "32396843",
  },
];

// ---------------------------------------------------------------------------
// Editorial revisions
// ---------------------------------------------------------------------------

const clusterRevisions: EditorialRevision[] = [
  {
    kind: "published",
    version: "1.0",
    date: "2026-11-05",
    summary:
      "Initial publication of the Tirzepatide cornerstone cluster (Authority Sprint 3B).",
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
    <ReferenceProvider references={tirzepatideReferences}>
      {node}
      <div className="mt-6">
        <ReferenceList references={tirzepatideReferences} />
      </div>
    </ReferenceProvider>
  );
}

const commonRelatedLinks = (
  <p className="text-sm text-navy-deep/80">
    Related reading:{" "}
    <a className="underline underline-offset-2" href="/compounds/tirzepatide">Tirzepatide monograph</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/what-is-tirzepatide">What is Tirzepatide</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/tirzepatide-mechanism-of-action">Tirzepatide mechanism of action</a>,{" "}
    <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>,{" "}
    <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/albumin-binding-half-life-extension">Albumin binding</a>,{" "}
    <a className="underline underline-offset-2" href="/research-hub/guides/incretin-effect-explained">Incretin effect</a>,{" "}
    <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>{" "}
    and{" "}
    <a className="underline underline-offset-2" href="/testing-and-quality-control">Testing &amp; Quality Control</a>.
  </p>
);

// ---------------------------------------------------------------------------
// Monograph metadata
// ---------------------------------------------------------------------------

export const TIRZEPATIDE_META = {
  slug: "tirzepatide",
  title: "Tirzepatide",
  shortDescription:
    "Tirzepatide is a synthetic 39-residue dual agonist of the GIP and GLP-1 receptors, engineered with two Aib substitutions and a C20 fatty-di-acid side chain for albumin binding and once-weekly kinetics. It is studied as an in-vitro reference standard for research in metabolic and incretin-signalling models.",
  aliases: [
    "LY3298176",
    "Mounjaro (brand)",
    "Zepbound (brand — obesity)",
  ],
  molecularFormula: "C225H348N48O68",
  molecularWeight: "4813.53",
  cas: "2023788-19-2",
  path: "/compounds/tirzepatide",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
} as const;

// ---------------------------------------------------------------------------
// Monograph FAQs (short set — merged into FAQPage JSON-LD)
// ---------------------------------------------------------------------------

const tirzepatideFaqs: { question: string; answer: string }[] = [
  {
    question: "What is Tirzepatide?",
    answer:
      "Tirzepatide is a synthetic 39-residue linear peptide that agonises both the GIP and GLP-1 receptors — a dual incretin receptor agonist. It is derived from a GIP-based scaffold with α-aminoisobutyric acid substitutions at positions 2 and 13 and a lysine-20 acylation with a C20 fatty-di-acid via a γGlu-2xOEG spacer. Oxford Research Peptides supplies Tirzepatide strictly as a lyophilised reference standard for in-vitro laboratory research.",
  },
  {
    question: "How does Tirzepatide differ from Semaglutide?",
    answer:
      "Semaglutide is a mono-agonist selective for the GLP-1 receptor. Tirzepatide activates both the GIP and GLP-1 receptors simultaneously — a dual mechanism. Their backbones differ (Tirzepatide uses a GIP-based scaffold), and reported in-vitro pharmacology suggests Tirzepatide is a biased GLP-1R agonist with reduced β-arrestin recruitment relative to native GLP-1.",
  },
  {
    question: "How does Tirzepatide differ from Retatrutide?",
    answer:
      "Retatrutide is a triple agonist that activates GLP-1, GIP and glucagon receptors. Tirzepatide activates only two of those three (GLP-1 and GIP) and does not appreciably engage the glucagon receptor. The design goals differ: Tirzepatide targets incretin-axis potentiation, while Retatrutide adds a glucagon-receptor contribution to modulate energy expenditure.",
  },
  {
    question: "What is the half-life of Tirzepatide?",
    answer:
      "Tirzepatide has a reported plasma half-life of approximately five days in humans, supporting once-weekly subcutaneous dosing. The long duration is achieved through a C20 fatty-di-acid side chain that supports reversible non-covalent albumin binding together with Aib substitutions that resist DPP-4 cleavage.",
  },
  {
    question: "How is Tirzepatide reference material stored?",
    answer:
      "Lyophilised Tirzepatide is stored at −20 °C, desiccated and protected from light. Reconstituted stocks are aliquoted into low-binding vials, held short-term at 2–8 °C and longer-term at −20 °C, and freeze-thaw cycles are minimised. Full detail is provided in the Laboratory Storage Guide.",
  },
];

// ---------------------------------------------------------------------------
// Tirzepatide monograph
// ---------------------------------------------------------------------------

export function tirzepatideMonograph(): CompoundLayoutProps {
  const overview = (
    <Prose>
      <P>
        <strong>Tirzepatide</strong> (development code <em>LY3298176</em>) is
        a synthetic 39-residue linear peptide first characterised in the
        peer-reviewed literature by Coskun and colleagues in 2018 as a
        novel dual agonist of the glucose-dependent insulinotropic
        polypeptide (GIP) and glucagon-like peptide-1 (GLP-1)
        receptors.<Cite refId="coskun-2018" /> The molecule is engineered on
        a GIP-based backbone with α-aminoisobutyric acid substitutions at
        positions 2 and 13, and a lysine-20 side chain acylation with a
        C20 fatty-di-acid via a γGlu-2xOEG spacer.<Cite refId="coskun-2018" />
      </P>
      <P>
        These modifications produce two convergent effects: resistance to
        dipeptidyl peptidase-4 (DPP-4) cleavage and reversible non-covalent
        binding to serum albumin. Together they extend the plasma
        half-life of Tirzepatide to approximately five days in humans,
        supporting once-weekly subcutaneous dosing.
      </P>
      <P>
        Reported in-vitro pharmacology characterises Tirzepatide as an
        <em>imbalanced</em> dual agonist — it retains near-native potency
        at the GIP receptor while showing reduced β-arrestin recruitment
        at the GLP-1 receptor relative to native GLP-1 — a form of
        <em> biased agonism</em>.<Cite refId="willard-2020" /> Human
        outcome trials to date include the SURPASS programme in type 2
        diabetes and the SURMOUNT programme in obesity.<Cite refId="rosenstock-2021" /><Cite refId="frias-2021" /><Cite refId="jastreboff-2022" />
      </P>
      <p className="text-xs italic text-muted-foreground">
        Oxford Research Peptides supplies Tirzepatide strictly as a
        reference standard for in-vitro laboratory research. Nothing on
        this page constitutes medical advice or endorses any therapeutic
        use of research-grade material. Approved Tirzepatide medicines
        (Mounjaro, Zepbound) are prescribed by qualified clinicians
        under MHRA authorisation.
      </p>
    </Prose>
  );

  const identity = (
    <Prose>
      <P>
        Tirzepatide is a 39-residue linear peptide with one lysine
        side-chain modification and no disulfide bonds. Its backbone is
        derived from GIP rather than GLP-1, distinguishing it structurally
        from the GLP-1 analogue class (Liraglutide, Semaglutide) and from
        the triple agonist Retatrutide.<Cite refId="coskun-2018" />
      </P>
      <KeyFacts
        title="At a glance"
        items={[
          { label: "Class", value: "Dual GIP / GLP-1 receptor agonist" },
          { label: "Receptors", value: "GIPR + GLP-1R (both class B GPCRs)" },
          { label: "Backbone", value: "GIP-based 39-residue scaffold" },
          { label: "Modification", value: "Aib2 · Aib13 · Lys20-γGlu-2xOEG-C20 di-acid" },
          { label: "Half-life (human)", value: "≈ 5 days" },
          { label: "Format", value: "Lyophilised reference standard" },
          { label: "Purity target", value: "≥ 98% (HPLC)" },
          { label: "Storage", value: "−20 °C, desiccated" },
        ]}
      />
    </Prose>
  );

  const synonyms = (
    <UL>
      <li><strong>Tirzepatide</strong> — INN (International Non-proprietary Name).</li>
      <li><strong>LY3298176</strong> — Eli Lilly internal development code.</li>
      <li><strong>Mounjaro</strong> — approved brand for subcutaneous once-weekly Tirzepatide (type 2 diabetes).</li>
      <li><strong>Zepbound</strong> — approved brand for subcutaneous once-weekly Tirzepatide (weight management).</li>
    </UL>
  );

  const classification = (
    <UL>
      <li><strong>Family:</strong> Incretin mimetics; dual GIP / GLP-1 receptor agonists.</li>
      <li><strong>Structural type:</strong> 39-residue linear peptide with a C20 fatty-di-acid side chain.</li>
      <li><strong>Primary targets:</strong> GIP receptor and GLP-1 receptor (both class B G-protein-coupled receptors).</li>
      <li><strong>Research area:</strong> Metabolic research, incretin pharmacology, biased-agonism and dual-receptor signalling studies.</li>
    </UL>
  );

  const mechanism = (
    <Prose>
      <P>
        Tirzepatide simultaneously agonises the GIP receptor and the
        GLP-1 receptor. Reported in-vitro pharmacology characterises it as
        an <em>imbalanced</em> dual agonist: near-native potency at GIPR
        with reduced β-arrestin recruitment at GLP-1R relative to native
        GLP-1.<Cite refId="willard-2020" /> Both receptors are class B
        (secretin-family) GPCRs coupled predominantly to Gαs.
      </P>
      <UL>
        <li>
          <strong>GIP receptor agonism:</strong> Reproduces GIP-like
          Gαs / cAMP / PKA signalling in β-cells and adipocytes. GIP
          signalling supports glucose-dependent insulin exocytosis in
          islets and modulates adipocyte lipid handling.<Cite refId="samms-2020" />
        </li>
        <li>
          <strong>GLP-1 receptor agonism (biased):</strong> Engages Gαs
          coupling and cAMP elevation while recruiting less β-arrestin
          than native GLP-1 at matched receptor occupancy. This biased
          profile is one hypothesised contributor to Tirzepatide's
          differentiated pharmacology.<Cite refId="willard-2020" />
        </li>
        <li>
          <strong>Dual incretin biology:</strong> Concurrent GIP and
          GLP-1 receptor engagement leverages two parallel incretin
          pathways whose actions on β-cells, α-cells and central appetite
          circuits are complementary rather than redundant.<Cite refId="nauck-2021" />
        </li>
        <li>
          <strong>Central appetite modulation:</strong> Both GIP and
          GLP-1 receptors are expressed in hypothalamic and hindbrain
          populations that integrate satiety signalling; the dual
          engagement is proposed to broaden central coverage relative to
          mono-agonists.<Cite refId="samms-2020" />
        </li>
      </UL>
      <KeyFindings title="Reported human evidence (context only)">
        <UL>
          <li>SURPASS-1: monotherapy in type 2 diabetes.<Cite refId="rosenstock-2021" /></li>
          <li>SURPASS-2: head-to-head with once-weekly Semaglutide.<Cite refId="frias-2021" /></li>
          <li>SURMOUNT-1: weight change in adults with obesity.<Cite refId="jastreboff-2022" /></li>
        </UL>
      </KeyFindings>
    </Prose>
  );

  const pharmacology = (
    <Prose>
      <P>
        Two structural features drive Tirzepatide's pharmacokinetics:
        DPP-4 resistance conferred by Aib substitutions at positions 2
        and 13, and albumin binding conferred by a C20 fatty-di-acid
        attached at lysine-20 through a γGlu-2xOEG linker.<Cite refId="coskun-2018" />
      </P>
      <UL>
        <li><strong>Plasma half-life (human):</strong> approximately 5 days after subcutaneous administration.</li>
        <li><strong>Steady state:</strong> achieved after 4 weeks of once-weekly dosing (5 half-lives).</li>
        <li><strong>Bioavailability (SC):</strong> ~80% of the injected dose.</li>
        <li><strong>Protein binding:</strong> ~99% (predominantly albumin).</li>
        <li><strong>Elimination:</strong> primarily proteolytic; renal and biliary excretion of small peptide fragments.</li>
      </UL>
    </Prose>
  );

  const applications = (
    <UL>
      <li><strong>Dual receptor signalling assays</strong> — parallel cAMP and β-arrestin readouts at GIPR and GLP-1R.</li>
      <li><strong>β-cell / insulin-secretion models</strong> — glucose-dependent insulin release with combined GIP + GLP-1 pathway activation.</li>
      <li><strong>Adipocyte / metabolic research</strong> — GIP-receptor pharmacology in adipose tissue reference models.</li>
      <li><strong>Biased-agonism research</strong> — reference ligand for comparing G-protein vs β-arrestin engagement at GLP-1R.</li>
      <li><strong>Analytical reference standard</strong> — reversed-phase HPLC and LC-MS identity / purity method development.</li>
    </UL>
  );

  const labMethodology = (
    <Prose>
      <P>
        Tirzepatide reference standards are supplied lyophilised. As with
        other long-chain acylated peptides, careful aseptic technique,
        low-binding plasticware and awareness of surface adsorption at
        low concentrations are essential.
      </P>
      <LaboratoryNote title="Analytical characterisation">
        <UL>
          <li>Reversed-phase HPLC at 214 nm for purity reporting (target ≥ 98% area).</li>
          <li>LC-MS identity confirmation against the theoretical monoisotopic mass (≈ 4813.53 g/mol average).</li>
          <li>Optional SEC-HPLC to monitor aggregation of the acylated peptide.</li>
        </UL>
      </LaboratoryNote>
      <MethodologyTip title="Handling considerations">
        Tirzepatide's C20 fatty-di-acid side chain is even more
        hydrophobic than Semaglutide's C18 di-acid. Adsorption to
        untreated polypropylene surfaces at low concentrations is a
        common source of assay variance. Prepare working stocks in
        albumin-containing buffer where the assay allows, and document
        diluent, plasticware and incubation volume so that reported
        EC<sub>50</sub> values are comparable across laboratories.
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
        summary below applies to Tirzepatide as a long-chain acylated
        peptide:
      </P>
      <OL>
        <li>Equilibrate the sealed vial to room temperature.</li>
        <li>Introduce sterile or bacteriostatic water slowly against the vial wall.</li>
        <li>Swirl gently — do not vortex — to protect the peptide backbone.</li>
        <li>Allow complete dissolution; a faint opalescence at high concentration is consistent with the surface-active fatty-di-acid side chain.</li>
        <li>Aliquot into low-binding vials; label with peptide, concentration, batch, date and analyst.</li>
      </OL>
    </Prose>
  );

  const evidence = (
    <div className="space-y-4">
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Tirzepatide is a well-characterised dual GIP / GLP-1 receptor agonist. Its mechanism has been described in peer-reviewed pharmacology (Coskun 2018, Willard 2020) and evaluated in the SURPASS type 2 diabetes and SURMOUNT obesity programmes, including the head-to-head SURPASS-2 comparison with Semaglutide."
      />
      <ResearchLimitations
        items={[
          "The functional consequence of GLP-1R biased agonism (reduced β-arrestin recruitment) versus balanced GLP-1R agonism is still an active research question — clinical read-throughs are difficult to isolate.",
          "The specific contribution of the GIP-receptor arm to appetite regulation vs metabolic effect in humans is not fully resolved.",
          "Long-term (>5 year) real-world safety and outcome data continue to accumulate.",
          "In-vitro assay results with long-chain acylated peptides are sensitive to buffer albumin content and plasticware — comparability across laboratories requires careful method reporting.",
        ]}
      />
    </div>
  );

  const regulatory = (
    <Prose>
      <ImportantNote title="Research-use framing">
        Approved Tirzepatide medicines (Mounjaro, Zepbound) are
        prescription therapeutics regulated by the MHRA in the United
        Kingdom, the EMA in the European Union and the FDA in the
        United States. Oxford Research Peptides does not supply approved
        medicines. Research-grade Tirzepatide supplied by Oxford
        Research Peptides is a lyophilised reference standard intended
        solely for in-vitro laboratory work and is not for human or
        veterinary use.
      </ImportantNote>
    </Prose>
  );

  const faqs = (
    <div className="space-y-4">
      {tirzepatideFaqs.map((f) => (
        <div key={f.question}>
          <div className="text-sm font-semibold text-navy-deep">{f.question}</div>
          <p className="text-sm text-navy-deep/85 leading-relaxed mt-1">{f.answer}</p>
        </div>
      ))}
    </div>
  );

  return {
    name: TIRZEPATIDE_META.title,
    eyebrow: "COMPOUND AUTHORITY MONOGRAPH",
    aliases: TIRZEPATIDE_META.aliases.join(", "),
    quickDefinition: (
      <>
        <strong className="text-bone">Tirzepatide</strong> is a synthetic
        39-residue dual agonist of the GIP and GLP-1 receptors, engineered
        with a C20 fatty-di-acid side chain for albumin binding and
        once-weekly kinetics.
      </>
    ),
    overview,
    identity,
    synonyms,
    researchClassification: classification,
    molecularFormula: TIRZEPATIDE_META.molecularFormula,
    molecularWeight: `${TIRZEPATIDE_META.molecularWeight} g/mol`,
    chemicalMetadata: (
      <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">CAS NUMBER</dt>
          <dd className="text-navy-deep mt-1 font-mono">{TIRZEPATIDE_META.cas}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">RESIDUE COUNT</dt>
          <dd className="text-navy-deep mt-1">39 residues (GIP-based scaffold)</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">MODIFICATION</dt>
          <dd className="text-navy-deep mt-1">Aib2 · Aib13 · Lys20-γGlu-2xOEG-C20 di-acid</dd>
        </div>
        <div>
          <dt className="text-[10px] font-bold tracking-widest text-muted-foreground">DEVELOPMENT CODE</dt>
          <dd className="text-navy-deep mt-1 font-mono">LY3298176</dd>
        </div>
      </dl>
    ),
    mechanism,
    receptorTargets: (
      <RelatedMechanisms mechanismIds={["glp1r", "gipr"]} heading="Primary receptor targets" />
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
      <RelatedGuides compoundSlug="tirzepatide" heading="Related guides" />
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
    lastUpdated: TIRZEPATIDE_META.dateModified,
  };
}

// ---------------------------------------------------------------------------
// Guide: What is Tirzepatide?
// ---------------------------------------------------------------------------

const whatIsTirzepatide: GuideContent = {
  slug: "what-is-tirzepatide",
  title: "What is Tirzepatide?",
  description:
    "Beginner-friendly research-focused introduction to Tirzepatide — a dual GIP / GLP-1 receptor agonist, its rationale relative to Semaglutide and Retatrutide, and its place in incretin pharmacology.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  faqs: [
    {
      question: "Is Tirzepatide a peptide?",
      answer:
        "Yes. Tirzepatide is a synthetic 39-residue linear peptide with a lysine-20 fatty-di-acid modification. Its backbone is derived from GIP rather than GLP-1.",
    },
    {
      question: "Which receptors does Tirzepatide target?",
      answer:
        "Tirzepatide is a dual agonist of the GIP receptor and the GLP-1 receptor — both class B G-protein-coupled receptors. It does not appreciably engage the glucagon receptor, which distinguishes it from triple agonists such as Retatrutide.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">RESEARCH PRIMER</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">What is Tirzepatide?</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A concise, evidence-based introduction to Tirzepatide — a dual
          GIP / GLP-1 receptor agonist positioned between Semaglutide
          (mono-agonist) and Retatrutide (triple agonist) in incretin
          pharmacology.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Tirzepatide is a synthetic 39-residue peptide that simultaneously
        activates the GIP receptor and the GLP-1 receptor — the first
        dual incretin receptor agonist to reach clinical use. Its GIP-based
        backbone carries Aib substitutions at positions 2 and 13 for
        DPP-4 resistance and a C20 fatty-di-acid at lysine 20 for
        reversible albumin binding, together supporting a plasma half-life
        of about five days and once-weekly subcutaneous dosing.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Tirzepatide" },
          { label: "Targets", value: "GIPR + GLP-1R (dual agonist)" },
          { label: "Class", value: "Dual incretin receptor agonist" },
          { label: "Half-life", value: "≈ 5 days (human, subcutaneous)" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Definition and origin</h2>
        <P>
          Tirzepatide (development code LY3298176) is a synthetic peptide
          first described by Coskun and colleagues in 2018 as a novel dual
          agonist of the GIP and GLP-1 receptors.<Cite refId="coskun-2018" />
          {" "}It was designed to combine the physiological actions of
          both incretin hormones in a single molecule with once-weekly
          kinetics.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Why dual agonism?</h2>
        <P>
          Native GIP and native GLP-1 act at different receptors on
          overlapping but non-identical cell populations. Combining
          agonism at both receptors was hypothesised to broaden the
          incretin response — engaging additional GIP-responsive tissues
          (particularly adipose) alongside GLP-1R signalling in β-cells,
          α-cells and appetite-regulating central circuits.<Cite refId="samms-2020" /><Cite refId="nauck-2021" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Relationship to Semaglutide</h2>
        <P>
          Semaglutide is a mono-agonist selective for the GLP-1 receptor.
          Tirzepatide activates the GLP-1 receptor as well, but reported
          in-vitro pharmacology characterises its GLP-1R engagement as
          <em> biased</em>: it recruits less β-arrestin than native GLP-1
          at matched G-protein signalling, and the second receptor arm
          (GIPR) adds pharmacology that Semaglutide does not
          have.<Cite refId="willard-2020" /> The SURPASS-2 head-to-head
          trial compared once-weekly Tirzepatide with once-weekly
          Semaglutide in type 2 diabetes.<Cite refId="frias-2021" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Relationship to Retatrutide</h2>
        <P>
          Retatrutide is a triple agonist that adds a third arm — the
          glucagon receptor — to the GLP-1 / GIP dual mechanism.
          Tirzepatide does not appreciably engage the glucagon receptor,
          so the design goals differ: Tirzepatide targets incretin-axis
          potentiation, while Retatrutide additionally modulates energy
          expenditure through hepatic and adipocyte glucagon-receptor
          signalling.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Research context</h2>
        <P>
          Tirzepatide has been evaluated in the SURPASS programme for type
          2 diabetes (SURPASS-1 monotherapy vs placebo,<Cite refId="rosenstock-2021" />
          {" "}SURPASS-2 vs Semaglutide<Cite refId="frias-2021" />) and in
          the SURMOUNT programme for weight management (SURMOUNT-1 in
          adults with obesity).<Cite refId="jastreboff-2022" />
        </P>

        <ImportantNote title="Research-use framing">
          Approved Tirzepatide medicines are prescription therapeutics
          regulated by the MHRA in the United Kingdom. Oxford Research
          Peptides supplies Tirzepatide strictly as a lyophilised
          reference standard for in-vitro laboratory research. See{" "}
          <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>{" "}
          and{" "}
          <a className="underline underline-offset-2" href="/testing-and-quality-control">Testing &amp; Quality Control</a>.
        </ImportantNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Tirzepatide's identity, structure and dual-receptor selectivity are established in peer-reviewed pharmacology. Its efficacy has been evaluated in large randomised clinical trials in type 2 diabetes (SURPASS) and obesity (SURMOUNT), including head-to-head comparison with Semaglutide."
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["tirzepatide", "semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="tirzepatide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-11-05",
    lastUpdated: "2026-11-05",
  }),
};

// ---------------------------------------------------------------------------
// Guide: Tirzepatide Mechanism of Action
// ---------------------------------------------------------------------------

const tirzepatideMoA: GuideContent = {
  slug: "tirzepatide-mechanism-of-action",
  title: "Tirzepatide Mechanism of Action",
  description:
    "Receptor-level explanation of Tirzepatide as a dual GIP / GLP-1 receptor agonist — Gαs / cAMP / PKA signalling at both receptors, biased β-arrestin engagement at GLP-1R, GIP-adipocyte biology, satiety signalling and metabolic outputs.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  faqs: [
    {
      question: "What downstream signalling does Tirzepatide engage?",
      answer:
        "At both GIPR and GLP-1R, Tirzepatide couples to Gαs and elevates intracellular cAMP, activating protein kinase A and EPAC2. β-arrestin is also recruited but reported in-vitro pharmacology characterises Tirzepatide as an imbalanced GLP-1R agonist that recruits less β-arrestin than native GLP-1.",
    },
    {
      question: "What is biased agonism in the context of Tirzepatide?",
      answer:
        "Biased agonism describes a ligand's preference for one branch of a receptor's signalling output. Tirzepatide has been reported as a biased GLP-1R agonist favouring G-protein coupling over β-arrestin recruitment; the functional consequences remain an active research question.",
    },
  ],
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">MECHANISM NOTE</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Tirzepatide Mechanism of Action</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A receptor-level explanation of how Tirzepatide simultaneously
          engages the GIP and GLP-1 receptors and translates that dual
          engagement into metabolic and central-appetite effects.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Tirzepatide is a dual agonist of the class B G-protein-coupled GIP
        and GLP-1 receptors. Receptor activation at both targets raises
        intracellular cAMP via Gαs, engaging protein kinase A and EPAC2.
        Downstream effects span glucose-dependent insulin secretion,
        α-cell glucagon regulation, adipocyte lipid handling (GIP arm),
        gastric emptying (GLP-1 arm) and integrated central appetite
        signalling in hypothalamic and hindbrain circuits.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Receptors", value: "GIPR + GLP-1R (both class B GPCRs)" },
          { label: "G-protein", value: "Gαs → cAMP at both receptors" },
          { label: "GLP-1R engagement", value: "Biased (reduced β-arrestin vs native GLP-1)" },
          { label: "Adipocyte biology", value: "GIP-adipocyte axis engagement" },
          { label: "Central", value: "Integrated GIP + GLP-1 satiety signalling" },
        ]}
      />
    ),
    mainContent: refWrap(
      <Prose>
        <h2 className="font-display text-2xl font-medium text-navy-deep">Dual receptor engagement</h2>
        <P>
          Tirzepatide binds and activates two receptors: the GIP receptor
          (GIPR) and the GLP-1 receptor (GLP-1R). Both are class B
          (secretin-family) GPCRs coupled predominantly to Gαs and
          expressed on overlapping but non-identical cell populations
          — β-cells, α-cells, adipocytes, vagal afferents and multiple
          central populations.<Cite refId="baggio-2007" /><Cite refId="nauck-2021" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">GLP-1 receptor arm</h2>
        <P>
          At GLP-1R, Tirzepatide couples predominantly to Gαs, elevates
          intracellular cAMP, activates protein kinase A and EPAC2, and
          drives glucose-dependent insulin secretion, α-cell suppression
          and slowed gastric emptying — the classical GLP-1R
          pharmacology.<Cite refId="drucker-2018" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">GIP receptor arm</h2>
        <P>
          At GIPR, Tirzepatide reproduces GIP-like Gαs / cAMP signalling.
          GIPR is expressed on pancreatic β-cells (where it complements
          GLP-1-driven insulin exocytosis), on α-cells, and — importantly
          — on adipocytes, where GIP signalling modulates lipid handling
          and insulin sensitivity.<Cite refId="samms-2020" /><Cite refId="nauck-2021" />
          {" "}The <em>GIP-adipocyte axis</em> is one of the distinguishing
          features of dual-agonist pharmacology compared with GLP-1
          mono-agonists.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Biased agonism at GLP-1R</h2>
        <P>
          Willard and colleagues reported that Tirzepatide engages GLP-1R
          with reduced β-arrestin recruitment relative to native GLP-1 —
          an <em>imbalanced</em> or <em>biased</em> agonism
          profile.<Cite refId="willard-2020" /> β-arrestin recruitment
          contributes to receptor internalisation and pathway-specific
          signalling; reduced arrestin engagement may slow receptor
          desensitisation and change the balance of downstream outputs.
          The therapeutic consequence of this bias is an active research
          question.
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">cAMP signalling</h2>
        <P>
          cAMP is the primary second messenger downstream of both
          receptors. It activates protein kinase A (PKA), which
          phosphorylates ion channels, exocytotic machinery and
          transcription factors, and it engages the PKA-independent
          effector EPAC2, which contributes to glucose-dependent insulin
          exocytosis.<Cite refId="drucker-2018" /> β-arrestin is
          recruited at both receptors but, per the biased-agonism data
          above, less efficiently at GLP-1R than native GLP-1.<Cite refId="willard-2020" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Central appetite regulation</h2>
        <P>
          GIP and GLP-1 receptors are both expressed in the hindbrain
          (nucleus of the solitary tract, area postrema) and in
          hypothalamic populations (POMC and NPY / AgRP neurons in the
          arcuate nucleus) that integrate satiety signalling. Dual-receptor
          engagement is hypothesised to broaden central coverage relative
          to GLP-1 mono-agonists, contributing to reported effects on
          food intake in preclinical models.<Cite refId="samms-2020" />
        </P>

        <h2 className="font-display text-2xl font-medium text-navy-deep">Metabolic signalling summary</h2>
        <UL>
          <li>Glucose-dependent stimulation of insulin secretion (β-cell — both receptors).</li>
          <li>Suppression of glucagon secretion (α-cell — glucose-dependent, both incretin pathways contribute).</li>
          <li>GIP-mediated modulation of adipocyte lipid handling.</li>
          <li>Slowed gastric emptying (GLP-1 arm — vagally mediated).</li>
          <li>Reduced food intake through integrated central circuits.</li>
        </UL>

        <ImportantNote title="Research-use framing">
          This guide describes published pharmacology. It is not
          clinical guidance and is not intended for any therapeutic
          decision. See{" "}
          <a className="underline underline-offset-2" href="/research-use-only">Research Use Only</a>.
        </ImportantNote>

        {commonRelatedLinks}
      </Prose>,
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="The dual-receptor pharmacology of Tirzepatide at GIPR and GLP-1R is characterised in peer-reviewed in-vitro pharmacology (Coskun 2018, Willard 2020) and supported by clinical outcomes in SURPASS and SURMOUNT."
      />
    ),
    researchLimitations: (
      <ResearchLimitations
        items={[
          "The therapeutic contribution of biased GLP-1R agonism versus balanced GLP-1R agonism has not been isolated in humans.",
          "The relative importance of GIP-receptor vs GLP-1-receptor engagement to appetite regulation in humans is not fully resolved.",
          "Extra-metabolic effects (CNS, cardiovascular, renal) are still accumulating trial evidence.",
        ]}
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["tirzepatide", "semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="tirzepatide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-11-05",
    lastUpdated: "2026-11-05",
  }),
};

// ---------------------------------------------------------------------------
// Guide: Tirzepatide FAQ
// ---------------------------------------------------------------------------

const tirzepatideFaqEntries: { question: string; answer: string }[] = [
  {
    question: "What is Tirzepatide?",
    answer:
      "Tirzepatide is a synthetic 39-residue linear peptide that agonises both the GIP receptor and the GLP-1 receptor — a dual incretin receptor agonist. It was first described by Coskun and colleagues in 2018 as LY3298176.",
  },
  {
    question: "Who developed Tirzepatide?",
    answer:
      "Tirzepatide (LY3298176) was discovered and developed by Eli Lilly and Company, with the discovery publication authored by Coskun and colleagues in Molecular Metabolism in 2018.",
  },
  {
    question: "What receptors does Tirzepatide activate?",
    answer:
      "Tirzepatide activates the GIP receptor (GIPR) and the GLP-1 receptor (GLP-1R) — both class B G-protein-coupled receptors of the secretin family. It does not appreciably engage the glucagon receptor.",
  },
  {
    question: "What is the structural formula of Tirzepatide?",
    answer:
      "Tirzepatide has the empirical formula C225H348N48O68 and an average molecular weight of approximately 4813.53 g/mol. Its CAS registry number is 2023788-19-2.",
  },
  {
    question: "What is the backbone of Tirzepatide derived from?",
    answer:
      "Unlike GLP-1 analogues such as Semaglutide, Tirzepatide's 39-residue backbone is derived from GIP. This choice of scaffold — engineered to retain GIPR agonism while enabling GLP-1R agonism — is central to its dual-receptor pharmacology.",
  },
  {
    question: "What modifications extend Tirzepatide's half-life?",
    answer:
      "Two structural features drive the extended half-life: α-aminoisobutyric acid substitutions at positions 2 and 13 confer resistance to dipeptidyl peptidase-4 (DPP-4) cleavage, and a C20 fatty-di-acid attached at Lys20 through a γGlu-2xOEG spacer supports reversible non-covalent binding to serum albumin.",
  },
  {
    question: "What is the plasma half-life of Tirzepatide in humans?",
    answer:
      "The reported plasma half-life of Tirzepatide is approximately five days after subcutaneous administration, supporting once-weekly dosing regimens in clinical use.",
  },
  {
    question: "How does Tirzepatide differ from Semaglutide?",
    answer:
      "Semaglutide is a mono-agonist selective for GLP-1R. Tirzepatide activates both GIPR and GLP-1R and is reported as an imbalanced or biased GLP-1R agonist with reduced β-arrestin recruitment relative to native GLP-1. The backbones differ (GIP-based vs GLP-1-based), as do half-life (~5 days vs ~7 days) and side-chain chemistry (C20 di-acid vs C18 di-acid).",
  },
  {
    question: "How does Tirzepatide differ from Retatrutide?",
    answer:
      "Retatrutide is a triple agonist that activates GLP-1, GIP and glucagon receptors. Tirzepatide activates only GLP-1 and GIP receptors. The addition of glucagon-receptor agonism in Retatrutide is proposed to add contributions from hepatic and adipocyte glucagon signalling that Tirzepatide does not have.",
  },
  {
    question: "What is biased agonism at GLP-1R?",
    answer:
      "Biased agonism describes a ligand's preference for one branch of a receptor's signalling output — typically G-protein coupling versus β-arrestin recruitment. Tirzepatide has been reported as a biased GLP-1R agonist that recruits less β-arrestin than native GLP-1 at matched receptor engagement.",
  },
  {
    question: "What is the GIP-adipocyte axis?",
    answer:
      "GIPR is expressed on adipocytes, where GIP signalling modulates lipid handling and insulin sensitivity. Engagement of this GIP-adipocyte axis is one of the mechanistic features that distinguishes dual GIP / GLP-1 agonists from GLP-1 mono-agonists.",
  },
  {
    question: "In which research trials has Tirzepatide been studied?",
    answer:
      "The SURPASS programme evaluates Tirzepatide in type 2 diabetes (including SURPASS-1 as monotherapy and SURPASS-2 head-to-head with Semaglutide). The SURMOUNT programme evaluates Tirzepatide for weight management (including SURMOUNT-1 in adults with obesity).",
  },
  {
    question: "What is HbA1c and why does it matter in Tirzepatide research?",
    answer:
      "HbA1c (glycated haemoglobin) reflects average blood glucose over roughly the preceding two to three months and is the standard endpoint for glycaemic-control studies. HbA1c change is the primary metabolic endpoint in the SURPASS programme.",
  },
  {
    question: "How is research-grade Tirzepatide supplied?",
    answer:
      "Oxford Research Peptides supplies Tirzepatide as a lyophilised solid at defined purity (target ≥ 98% by HPLC) with LC-MS identity confirmation. It is intended solely for in-vitro laboratory research.",
  },
  {
    question: "How should Tirzepatide reference material be stored?",
    answer:
      "Lyophilised Tirzepatide is stored at −20 °C, desiccated and protected from light. Reconstituted stocks should be aliquoted into low-binding vials, held short-term at 2–8 °C, longer-term at −20 °C, and freeze-thaw cycles minimised.",
  },
  {
    question: "What diluent is used to reconstitute Tirzepatide?",
    answer:
      "Sterile water or bacteriostatic water is used for laboratory reconstitution. The exact diluent should follow the receiving laboratory's SOP. Vortexing should be avoided; gentle swirling protects the peptide backbone.",
  },
  {
    question: "Why does buffer albumin matter in Tirzepatide assays?",
    answer:
      "Tirzepatide's C20 fatty-di-acid side chain supports strong binding to serum albumin. Buffer albumin content therefore alters the free (unbound) fraction of ligand and shifts apparent EC50 values in cell-based assays. Buffer composition should be reported explicitly for cross-laboratory comparability.",
  },
  {
    question: "What analytical methods characterise Tirzepatide?",
    answer:
      "Reversed-phase HPLC at 214 nm is the standard purity method. LC-MS confirms identity against the theoretical monoisotopic mass. Size-exclusion HPLC is used where aggregation of the acylated peptide is a concern.",
  },
  {
    question: "Is Tirzepatide a medicine?",
    answer:
      "Approved Tirzepatide medicines (Mounjaro for type 2 diabetes; Zepbound for weight management) are prescription therapeutics regulated by the MHRA in the United Kingdom, the EMA in the European Union and the FDA in the United States. Research-grade Tirzepatide supplied by Oxford Research Peptides is not a medicine and is intended solely for in-vitro laboratory research.",
  },
  {
    question: "Can Tirzepatide be used off-label?",
    answer:
      "Off-label prescribing is a clinical decision made by qualified healthcare professionals under national regulation and is outside the scope of research-standard peptide reference material. Oxford Research Peptides does not describe or endorse therapeutic use of research-grade material.",
  },
];

const tirzepatideFaqGuide: GuideContent = {
  slug: "tirzepatide-faq",
  title: "Tirzepatide FAQ",
  description:
    "Comprehensive research-focused FAQ on Tirzepatide — identity, receptor pharmacology, structural modifications, pharmacokinetics, laboratory handling, evidence base and regulatory status.",
  categoryLabel: "Research Guides",
  categoryPath: "/research-hub/guides",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  faqs: tirzepatideFaqEntries,
  buildLayout: () => ({
    categoryId: "guides",
    hero: (
      <>
        <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">FREQUENTLY ASKED</div>
        <h1 className="font-display text-4xl md:text-5xl font-medium">Tirzepatide FAQ</h1>
        <p className="mt-4 max-w-3xl text-bone/80 leading-relaxed">
          A comprehensive research-focused reference of frequently asked
          questions about Tirzepatide, covering identity, receptor
          pharmacology, pharmacokinetics, laboratory handling and
          evidence.
        </p>
      </>
    ),
    quickAnswer: (
      <QuickAnswer>
        Tirzepatide is a synthetic 39-residue dual agonist of the GIP and
        GLP-1 receptors. Its GIP-based backbone carries Aib substitutions
        at positions 2 and 13 and a Lys20 C20 fatty-di-acid, giving a
        plasma half-life of approximately five days and once-weekly
        subcutaneous dosing. Oxford Research Peptides supplies it as an
        in-vitro reference standard only.
      </QuickAnswer>
    ),
    keyFacts: (
      <KeyFacts
        items={[
          { label: "Compound", value: "Tirzepatide" },
          { label: "Class", value: "Dual GIP / GLP-1 receptor agonist" },
          { label: "Half-life", value: "≈ 5 days (human, SC)" },
          { label: "Use", value: "In-vitro reference standard" },
        ]}
      />
    ),
    mainContent: (
      <div className="space-y-6">
        {tirzepatideFaqEntries.map((item, i) => (
          <section
            key={item.question}
            aria-labelledby={`tirz-faq-${i}`}
            className="border-l-2 border-gold/60 pl-4"
          >
            <h2
              id={`tirz-faq-${i}`}
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
            <a className="underline underline-offset-2" href="/compounds/tirzepatide">Tirzepatide monograph</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/what-is-tirzepatide">What is Tirzepatide?</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/tirzepatide-mechanism-of-action">Mechanism of Action</a>{" "}
            guide,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/glp-1-receptor-explained">GLP-1 receptor explained</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/guides/triple-agonists-explained">Triple agonists explained</a>,{" "}
            <a className="underline underline-offset-2" href="/compounds/semaglutide">Semaglutide monograph</a>{" "}
            and the{" "}
            <a className="underline underline-offset-2" href="/compounds/retatrutide">Retatrutide monograph</a>. Related glossary anchors:{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/dual-incretin-agonism">dual incretin agonism</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/gip-adipocyte-axis">GIP-adipocyte axis</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/satiety-signalling">satiety signalling</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/gs-protein">Gs protein</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/c20-fatty-diacid">C20 fatty diacid</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/weekly-dosing-pharmacokinetics">weekly dosing pharmacokinetics</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/surpass-programme">SURPASS programme</a>,{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/surmount-programme">SURMOUNT programme</a>{" "}
            and{" "}
            <a className="underline underline-offset-2" href="/research-hub/glossary/hba1c-endpoint">HbA1c endpoint</a>.
          </p>
        </div>
      </div>
    ),
    evidenceSummary: (
      <EvidenceSummary
        level="strong"
        confidence="high"
        summary="Answers summarise the published Tirzepatide literature, including the SURPASS and SURMOUNT programmes and widely accepted laboratory practice for long-chain acylated incretin peptides."
      />
    ),
    relatedCompounds: (
      <RelatedCompounds slugs={["tirzepatide", "semaglutide", "retatrutide"]} heading="Compound reference" />
    ),
    relatedGuides: <RelatedGuides compoundSlug="tirzepatide" heading="Related guides" />,
    versionHistory: <PageEditorial pageKind="guide" revisions={clusterRevisions} />,
    editorialNotice: <ScientificDisclaimer />,
    publicationDate: "2026-11-05",
    lastUpdated: "2026-11-05",
  }),
};

// ---------------------------------------------------------------------------
// Registries
// ---------------------------------------------------------------------------

export const tirzepatideGuideRegistry: readonly GuideContent[] = [
  whatIsTirzepatide,
  tirzepatideMoA,
  tirzepatideFaqGuide,
];

export const tirzepatideCompoundRegistry: Record<
  string,
  {
    build: () => CompoundLayoutProps;
    faqs: { question: string; answer: string }[];
    meta: typeof TIRZEPATIDE_META;
  }
> = {
  tirzepatide: {
    build: tirzepatideMonograph,
    faqs: tirzepatideFaqs,
    meta: TIRZEPATIDE_META,
  },
};

export { tirzepatideFaqs };
