/**
 * ============================================================================
 *  Study Collections — Authority Sprint 4.0
 * ============================================================================
 *
 *  Umbrella research programmes that group multiple landmark studies:
 *
 *   • STEP     — Semaglutide obesity trials
 *   • SURPASS  — Tirzepatide diabetes trials
 *   • SURMOUNT — Tirzepatide obesity trials
 *   • SUSTAIN  — Semaglutide diabetes trials
 *
 *  Membership is *derived* from the study registry using slug prefix
 *  matching, so newly-added studies flow into the correct collection with
 *  zero wiring changes.
 */

import {
  comparisons,
  studies,
  type ComparisonEntry,
  type MechanismGroupId,
  type StudyEntry,
} from "@/lib/taxonomy";

export interface StudyCollectionDefinition {
  slug: string;
  title: string;
  shortName: string;
  eyebrow: string;
  summary: string;
  matches: readonly string[]; // slug prefixes / explicit slugs
  compoundSlugs: readonly string[];
  mechanismIds: readonly MechanismGroupId[];
  applications: readonly string[];
  updated: string;
}

export const studyCollections: readonly StudyCollectionDefinition[] = [
  {
    slug: "step-programme",
    title: "STEP Programme",
    shortName: "STEP",
    eyebrow: "COLLECTION · OBESITY · SEMAGLUTIDE",
    summary:
      "The STEP (Semaglutide Treatment Effect in People with Obesity) programme — a series of randomised trials evaluating once-weekly Semaglutide across obesity populations and comparators.",
    matches: ["step-1", "step-2", "step-3", "step-4", "step-5", "step-8", "step-programme"],
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    applications: ["Chronic weight management research", "Behavioural intervention overlays"],
    updated: "2026-11-01",
  },
  {
    slug: "surpass-programme",
    title: "SURPASS Programme",
    shortName: "SURPASS",
    eyebrow: "COLLECTION · TYPE 2 DIABETES · TIRZEPATIDE",
    summary:
      "The SURPASS programme — the pivotal randomised trials establishing Tirzepatide's glycaemic and weight effects in adults with type 2 diabetes.",
    matches: ["surpass-1", "surpass-2", "surpass-3", "surpass-4", "surpass-5"],
    compoundSlugs: ["tirzepatide"],
    mechanismIds: ["glp1r", "gipr"],
    applications: ["Glycaemic-control research", "Dual-incretin agonist evidence base"],
    updated: "2026-11-01",
  },
  {
    slug: "surmount-programme",
    title: "SURMOUNT Programme",
    shortName: "SURMOUNT",
    eyebrow: "COLLECTION · OBESITY · TIRZEPATIDE",
    summary:
      "The SURMOUNT programme — Tirzepatide's obesity trial series. Scaffolded — study population pending expansion.",
    matches: ["surmount-"],
    compoundSlugs: ["tirzepatide"],
    mechanismIds: ["glp1r", "gipr"],
    applications: ["Weight-management research", "Body-composition analysis"],
    updated: "2026-11-01",
  },
  {
    slug: "sustain-programme",
    title: "SUSTAIN Programme",
    shortName: "SUSTAIN",
    eyebrow: "COLLECTION · TYPE 2 DIABETES · SEMAGLUTIDE",
    summary:
      "The SUSTAIN programme — the pivotal randomised trials that established Semaglutide's glycaemic and cardiovascular profile in adults with type 2 diabetes.",
    matches: ["sustain-"],
    compoundSlugs: ["semaglutide"],
    mechanismIds: ["glp1r"],
    applications: ["Glycaemic-control research", "Cardiovascular outcomes research"],
    updated: "2026-11-01",
  },
];

export function getStudyCollection(slug: string): StudyCollectionDefinition | undefined {
  return studyCollections.find((c) => c.slug === slug);
}

export function collectionPath(slug: string): string {
  return `/research-hub/collections/${slug}`;
}

function matchesCollection(
  study: StudyEntry,
  collection: StudyCollectionDefinition,
): boolean {
  return collection.matches.some(
    (m) => study.slug === m || study.slug.startsWith(m),
  );
}

export interface StudyCollectionView {
  collection: StudyCollectionDefinition;
  path: string;
  studies: readonly StudyEntry[];
  timeline: readonly StudyEntry[]; // sorted by year
  comparisons: readonly ComparisonEntry[];
  populated: boolean;
}

export function buildCollectionView(slug: string): StudyCollectionView | undefined {
  const c = getStudyCollection(slug);
  if (!c) return undefined;
  const included = studies.filter((s) => matchesCollection(s, c));
  const timeline = [...included].sort((a, b) => a.year - b.year);
  const cmps = comparisons.filter(
    (cm) =>
      cm.studySlugs?.some((slug) => included.find((s) => s.slug === slug)) ||
      cm.compoundSlugs.some((s) => c.compoundSlugs.includes(s)),
  );
  return {
    collection: c,
    path: collectionPath(c.slug),
    studies: included,
    timeline,
    comparisons: cmps,
    populated: included.length > 0,
  };
}

export function listStudyCollectionViews(): StudyCollectionView[] {
  return studyCollections
    .map((c) => buildCollectionView(c.slug))
    .filter((v): v is StudyCollectionView => !!v);
}
