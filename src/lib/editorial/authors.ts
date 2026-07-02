/**
 * Release 3.1 — Author & Scientific Reviewer registry.
 *
 * Every editorial page pulls its author + reviewer metadata from this file.
 * No page hardcodes an author. When a new person joins the editorial or
 * scientific review panel, add them here once — every future article,
 * monograph, methodology and mechanism page inherits automatically.
 */

import type { Author } from "@/components/publishing/types";

// ---------------------------------------------------------------------------
// Roles used across the editorial framework.
// ---------------------------------------------------------------------------

export type EditorialRole =
  | "Editor-in-Chief"
  | "Managing Editor"
  | "Staff Writer"
  | "Editorial Team";

export type ReviewerRole =
  | "Scientific Reviewer"
  | "Methodology Reviewer"
  | "Analytical Chemistry Reviewer";

// ---------------------------------------------------------------------------
// People
// ---------------------------------------------------------------------------

export interface EditorialAuthor extends Author {
  id: string;
  role: EditorialRole;
  bio?: string;
}

export interface ScientificReviewer extends Author {
  id: string;
  role: ReviewerRole;
  expertise: string[];
  bio?: string;
}

export const editorialAuthors: readonly EditorialAuthor[] = [
  {
    id: "orp-editorial-team",
    name: "Oxford Research Peptides Editorial Team",
    role: "Editorial Team",
    credentials: "In-house editorial staff",
    affiliation: "Oxford Research Peptides",
    bio:
      "The in-house editorial team drafts, structures and maintains educational content across the Research Hub and Compound Library. All drafts are passed through scientific review before publication.",
  },
  {
    id: "managing-editor",
    name: "Managing Editor",
    role: "Managing Editor",
    credentials: "Editorial oversight",
    affiliation: "Oxford Research Peptides",
    bio:
      "The Managing Editor is responsible for editorial workflow, review scheduling, revision history and enforcement of the editorial standards across every published page.",
  },
];

export const scientificReviewers: readonly ScientificReviewer[] = [
  {
    id: "scientific-review-panel",
    name: "Scientific Review Panel",
    role: "Scientific Reviewer",
    credentials: "Independent scientific review",
    affiliation: "Oxford Research Peptides",
    expertise: ["Peptide pharmacology", "Receptor biology", "In-vitro research methodology"],
    bio:
      "The Scientific Review Panel evaluates each page for accuracy of scientific claims, faithfulness to cited evidence, appropriateness of the evidence hierarchy and compliance with the research-use-only framing.",
  },
  {
    id: "analytical-review",
    name: "Analytical Chemistry Reviewer",
    role: "Analytical Chemistry Reviewer",
    credentials: "HPLC / MS analytical review",
    affiliation: "Oxford Research Peptides",
    expertise: ["Reversed-phase HPLC", "Mass spectrometry", "Peptide purity assessment"],
    bio:
      "Reviews analytical methodology pages for procedural correctness, appropriate detection choices and consistency with the published certificate-of-analysis programme.",
  },
];

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getAuthor(id: string): EditorialAuthor | undefined {
  return editorialAuthors.find((a) => a.id === id);
}

export function getReviewer(id: string): ScientificReviewer | undefined {
  return scientificReviewers.find((r) => r.id === id);
}

/** Default author applied to any page that doesn't specify one. */
export const DEFAULT_AUTHOR_ID = "orp-editorial-team";

/** Default reviewer applied to any page that doesn't specify one. */
export const DEFAULT_REVIEWER_ID = "scientific-review-panel";
