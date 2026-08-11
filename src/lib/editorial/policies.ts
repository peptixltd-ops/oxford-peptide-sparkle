/**
 * Release 3.1 — Editorial policy constants.
 *
 * Central source of truth for editorial standards, evidence hierarchy,
 * research disclaimers, conflict-of-interest position, review cadence
 * and citation-style preferences. Every editorial page and the public
 * `/editorial-standards` route reads from here.
 *
 * Editing these constants changes the framework everywhere at once.
 */

import type {
  CitationStyle,
  EvidenceLevel,
  StudyQualityGrade,
} from "@/components/publishing/types";

// ---------------------------------------------------------------------------
// Publisher identity (mirrors the legal entity used across the site).
// ---------------------------------------------------------------------------

export const PUBLISHER = {
  name: "Oxford Research Peptides",
  legalEntity: "Oxford Research Syndicate Ltd",
  companyNumber: "17207898",
  address: "131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom",
  contactEmail: "info@oxfordresearchpeptides.com",
} as const;

// ---------------------------------------------------------------------------
// Framework version — bump when the framework itself changes.
// ---------------------------------------------------------------------------

export const EDITORIAL_FRAMEWORK_VERSION = "3.1.0";
export const EDITORIAL_FRAMEWORK_EFFECTIVE_DATE = "2026-07-01";

// ---------------------------------------------------------------------------
// Citation style
// ---------------------------------------------------------------------------

export const DEFAULT_CITATION_STYLE: CitationStyle = "ama";

// ---------------------------------------------------------------------------
// Review cadence — how often each page type is reviewed.
// ---------------------------------------------------------------------------

export type PageKind =
  | "compound"
  | "mechanism"
  | "methodology"
  | "guide"
  | "comparison"
  | "glossary"
  | "literature";

export const REVIEW_CADENCE_MONTHS: Record<PageKind, number> = {
  compound: 12,
  mechanism: 18,
  methodology: 24,
  guide: 18,
  comparison: 18,
  glossary: 24,
  literature: 12,
};

// ---------------------------------------------------------------------------
// Evidence hierarchy — how each evidence tier is labelled and explained.
// ---------------------------------------------------------------------------

export interface EvidenceTierDescriptor {
  level: EvidenceLevel;
  label: string;
  short: string;
  detail: string;
}

export const EVIDENCE_HIERARCHY: readonly EvidenceTierDescriptor[] = [
  {
    level: "strong",
    label: "Strong evidence",
    short: "Multiple independent lines converge.",
    detail:
      "Multiple independent published sources — typically including well-controlled in-vitro or animal studies — converge on the same finding.",
  },
  {
    level: "moderate",
    label: "Moderate evidence",
    short: "Consistent but limited replication.",
    detail:
      "Consistent findings from a small number of studies with acceptable methodology, but limited independent replication.",
  },
  {
    level: "limited",
    label: "Limited evidence",
    short: "Few studies, methodological caveats.",
    detail:
      "Few studies are available, sample sizes are small, or the methodology has meaningful limitations.",
  },
  {
    level: "preliminary",
    label: "Preliminary evidence",
    short: "Early-stage or exploratory.",
    detail:
      "Early-stage or exploratory work — pilot studies, mechanistic hints or single-lab reports awaiting replication.",
  },
  {
    level: "insufficient",
    label: "Insufficient evidence",
    short: "Cannot draw a conclusion.",
    detail:
      "Available literature does not currently support a defensible conclusion in either direction.",
  },
  {
    level: "conflicting",
    label: "Conflicting evidence",
    short: "Sources disagree.",
    detail:
      "Independent sources report conflicting findings; the field has not yet resolved the disagreement.",
  },
];

export const STUDY_QUALITY_GRADES: Record<StudyQualityGrade, string> = {
  A: "High quality — appropriate design, adequate controls, transparent reporting.",
  B: "Acceptable quality — minor design or reporting limitations.",
  C: "Limited quality — meaningful design or reporting limitations.",
  D: "Low quality — significant methodological concerns.",
  insufficient: "Insufficient information to grade.",
};

// ---------------------------------------------------------------------------
// Standard disclosures
// ---------------------------------------------------------------------------

export const RESEARCH_USE_DISCLAIMER =
  "All materials referenced on this website are supplied strictly for in-vitro laboratory research. Nothing on this page constitutes medical advice, and no material described is intended for human or animal consumption, diagnosis, prevention, treatment or any therapeutic use.";

export const CONFLICT_OF_INTEREST_STATEMENT =
  "Oxford Research Peptides supplies research-grade reference peptides commercially. Editorial pages are drafted and reviewed to describe published scientific literature accurately and do not recommend, promote or endorse any specific commercial product. Product mentions on educational pages are strictly for cross-referencing catalogue entries.";

export const AI_ASSISTANCE_STATEMENT =
  "Editorial drafts may be assisted by AI tools for structure, formatting and readability. All scientific claims, citations, evidence gradings and conclusions are checked by a human scientific reviewer before publication and at each scheduled review.";

// ---------------------------------------------------------------------------
// Editorial principles — displayed on /editorial-standards.
// ---------------------------------------------------------------------------

export interface EditorialPrinciple {
  id: string;
  title: string;
  body: string;
}

export const EDITORIAL_PRINCIPLES: readonly EditorialPrinciple[] = [
  {
    id: "accuracy",
    title: "Accuracy over reach",
    body:
      "Every scientific claim must be traceable to a cited primary or authoritative secondary source. Where the literature is thin, we say so explicitly rather than paraphrase around the gap.",
  },
  {
    id: "evidence-hierarchy",
    title: "Evidence is graded, not asserted",
    body:
      "Claims are labelled against the evidence hierarchy (Strong → Conflicting) so readers can weigh how much confidence a statement carries.",
  },
  {
    id: "research-framing",
    title: "Research framing is non-negotiable",
    body:
      "All content is written for laboratory researchers. No page describes dosing for humans, therapeutic indications, or health outcomes for consumers.",
  },
  {
    id: "citation",
    title: "Citations are structured, not decorative",
    body:
      "References use structured metadata (DOI, PMID, authors, year, journal) so they can be verified, exported and audited. Inline citations link to the reference list on the same page.",
  },
  {
    id: "transparency",
    title: "Transparent revision history",
    body:
      "Every page carries a visible revision history and last-reviewed date. Substantive edits are versioned; typos and formatting are not.",
  },
  {
    id: "reviewer-independence",
    title: "Scientific review is independent of commercial teams",
    body:
      "Scientific reviewers evaluate accuracy without input from sales, marketing or catalogue operations. Reviewers may require revisions before a page is published or re-published.",
  },
  {
    id: "corrections",
    title: "Corrections are visible, not silent",
    body:
      "Where a factual error is identified after publication, the correction is logged in the revision history with a short summary of what changed and why.",
  },
];

// ---------------------------------------------------------------------------
// Publication workflow — the states every editorial page passes through.
// ---------------------------------------------------------------------------

export type WorkflowState =
  | "draft"
  | "scientific-review"
  | "editorial-review"
  | "revision-required"
  | "approved"
  | "published"
  | "scheduled-review"
  | "retired";

export interface WorkflowStage {
  state: WorkflowState;
  label: string;
  owner: "Editorial Team" | "Scientific Reviewer" | "Managing Editor";
  description: string;
}

export const PUBLICATION_WORKFLOW: readonly WorkflowStage[] = [
  {
    state: "draft",
    label: "Draft",
    owner: "Editorial Team",
    description:
      "Editorial team assembles structure, quick answer, key facts, evidence claims and initial reference list.",
  },
  {
    state: "scientific-review",
    label: "Scientific review",
    owner: "Scientific Reviewer",
    description:
      "A scientific reviewer audits every claim against the cited evidence, checks evidence gradings and confirms research-use framing.",
  },
  {
    state: "editorial-review",
    label: "Editorial review",
    owner: "Managing Editor",
    description:
      "Managing editor checks structure, cross-linking, readability, accessibility and adherence to the editorial standards.",
  },
  {
    state: "revision-required",
    label: "Revision required",
    owner: "Editorial Team",
    description:
      "Reviewer or editor requires changes. Page cannot progress until revisions are made and re-reviewed.",
  },
  {
    state: "approved",
    label: "Approved for publication",
    owner: "Managing Editor",
    description:
      "All reviews complete. Managing editor sets the publication date and removes any pre-publication noindex.",
  },
  {
    state: "published",
    label: "Published",
    owner: "Managing Editor",
    description:
      "Page is live, indexable, and included in the sitemap. Publication is entered in the revision history.",
  },
  {
    state: "scheduled-review",
    label: "Scheduled review",
    owner: "Scientific Reviewer",
    description:
      "Page enters the review cadence for its page type and is re-audited against current literature at the scheduled interval.",
  },
  {
    state: "retired",
    label: "Retired",
    owner: "Managing Editor",
    description:
      "Page is withdrawn (superseded, out of scope, or unresolvable accuracy concerns). Reason is recorded in the revision history.",
  },
];
