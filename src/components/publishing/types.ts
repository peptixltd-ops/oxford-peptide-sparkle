/**
 * Shared types for the Scientific Publishing component library.
 * These are structural only — no content lives here.
 */

export type EvidenceLevel =
  | "strong"
  | "moderate"
  | "limited"
  | "preliminary"
  | "insufficient"
  | "conflicting";

export type ResearchConfidence = "high" | "moderate" | "low" | "very-low";

export type EvidenceDomain =
  | "human"
  | "animal"
  | "in-vitro"
  | "mechanistic"
  | "computational";

export type StudyQualityGrade = "A" | "B" | "C" | "D" | "insufficient";

export type DifficultyLevel = "introductory" | "intermediate" | "advanced";

export type CitationStyle = "ama" | "apa" | "vancouver" | "custom";

export interface Author {
  id?: string;
  name: string;
  credentials?: string;
  affiliation?: string;
  role?: string;
  avatarUrl?: string;
  profileUrl?: string;
}

export interface Reference {
  id: string;
  authors: string[];
  year?: number;
  title: string;
  journal?: string;
  volume?: string;
  issue?: string;
  pages?: string;
  doi?: string;
  pmid?: string;
  url?: string;
  note?: string;
  citationCount?: number;
  group?: string;
}

export interface RevisionEntry {
  version: string;
  date: string; // ISO
  summary: string;
  author?: string;
}
