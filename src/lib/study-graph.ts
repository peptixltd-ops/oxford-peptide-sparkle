/**
 * ============================================================================
 *  Study Citation Graph — Authority Sprint 4.0
 * ============================================================================
 *
 *  Every Study entity (see `taxonomy.ts`) is the root of a citation graph:
 *
 *      Study → Compound → Mechanism → Pathway → Glossary
 *            ↘ Comparison    ↘ Methodology    ↘ Research application
 *            ↘ Related literature (siblings by compound / mechanism)
 *
 *  This module is a *thin* query layer over the existing taxonomy +
 *  knowledge graph — it introduces no new content and no new relationships.
 *  It is consumed by:
 *
 *   • Study literature pages       (`/research-hub/literature/$slug`)
 *   • Author / reviewer entity pages (`/editorial/authors/*`, `/editorial/reviewers/*`)
 *   • Scientific programme pages   (`/research-hub/programmes/*`)
 *   • Study collection pages       (`/research-hub/collections/*`)
 *   • Editorial dashboard governance
 */

import {
  compoundEntries,
  comparisons,
  glossaryTerms,
  guides,
  mechanismGroups,
  researchAreas,
  studies,
  type ComparisonEntry,
  type CompoundEntry,
  type GlossaryTerm,
  type Guide,
  type MechanismGroup,
  type ResearchArea,
  type StudyEntry,
} from "@/lib/taxonomy";
import {
  compoundRef,
  getEntity,
  getEntitiesOfType,
  getRelated,
  knowledgeGraph,
  type KnowledgeEntity,
} from "@/lib/knowledge-graph";

// ---------------------------------------------------------------------------
//  Study citation record
// ---------------------------------------------------------------------------

export interface StudyCitationRecord {
  study: StudyEntry;
  compounds: readonly CompoundEntry[];
  mechanisms: readonly MechanismGroup[];
  glossary: readonly GlossaryTerm[];
  comparisons: readonly ComparisonEntry[];
  methodology: readonly KnowledgeEntity[];
  researchApplications: readonly ResearchArea[];
  relatedStudies: readonly StudyEntry[];
  guides: readonly Guide[];
}

/**
 * Build a full citation record for a study, traversing every relationship
 * the knowledge graph exposes.
 */
export function studyCitationRecord(slug: string): StudyCitationRecord | undefined {
  const study = studies.find((s) => s.slug === slug);
  if (!study) return undefined;

  const compoundSet = new Set(study.compoundSlugs);
  const mechanismSet = new Set(study.mechanismIds ?? []);
  const areaSet = new Set(study.areaIds ?? []);

  const cs = compoundEntries.filter((c) => compoundSet.has(c.slug));
  const ms = mechanismGroups.filter((m) => mechanismSet.has(m.id));

  const glossary = glossaryTerms.filter((t) => {
    if (t.relatedCompoundSlugs?.some((s) => compoundSet.has(s))) return true;
    if (t.relatedMechanismIds?.some((m) => mechanismSet.has(m))) return true;
    return false;
  });

  const cmps = comparisons.filter(
    (c) =>
      c.studySlugs?.includes(study.slug) ||
      c.compoundSlugs.some((s) => compoundSet.has(s)),
  );

  // Methodology entities that reference any of the study's compounds via
  // the graph. We use inbound edges so we don't need methodology→study
  // relationships to exist.
  const methodology: KnowledgeEntity[] = [];
  const seen = new Set<string>();
  for (const c of cs) {
    for (const m of getRelated(compoundRef(c.slug), { type: "methodology" })) {
      const k = `${m.type}::${m.slug}`;
      if (seen.has(k)) continue;
      seen.add(k);
      methodology.push(m);
    }
  }

  const researchApplications = researchAreas.filter((a) => areaSet.has(a.id));

  const relatedStudies = studies.filter(
    (s) =>
      s.slug !== study.slug &&
      (s.compoundSlugs.some((c) => compoundSet.has(c)) ||
        (s.mechanismIds ?? []).some((m) => mechanismSet.has(m))),
  );

  const gs = guides.filter(
    (g) =>
      study.guideSlugs?.includes(g.slug) ||
      (g.compoundSlugs ?? []).some((c) => compoundSet.has(c)),
  );

  return {
    study,
    compounds: cs,
    mechanisms: ms,
    glossary,
    comparisons: cmps,
    methodology,
    researchApplications,
    relatedStudies,
    guides: gs,
  };
}

// ---------------------------------------------------------------------------
//  Convenience aggregators
// ---------------------------------------------------------------------------

export function studiesForCompound(slug: string): readonly StudyEntry[] {
  return studies.filter((s) => s.compoundSlugs.includes(slug));
}

export function studiesForMechanism(id: string): readonly StudyEntry[] {
  return studies.filter((s) => (s.mechanismIds ?? []).includes(id as never));
}

export function studiesForArea(id: string): readonly StudyEntry[] {
  return studies.filter((s) => (s.areaIds ?? []).includes(id as never));
}

// ---------------------------------------------------------------------------
//  Governance — surfaced in the Editorial Dashboard
// ---------------------------------------------------------------------------

export interface StudyGovernanceIssue {
  severity: "error" | "warning" | "info";
  code:
    | "study-missing-doi"
    | "study-missing-pmid"
    | "study-missing-journal"
    | "study-missing-compound"
    | "study-missing-mechanism"
    | "study-no-guides"
    | "study-orphan-in-graph";
  message: string;
  studySlug: string;
}

export function runStudyCitationAudit(): StudyGovernanceIssue[] {
  const issues: StudyGovernanceIssue[] = [];
  for (const s of studies) {
    if (!s.populated) continue;
    if (!s.doi) {
      issues.push({
        severity: "warning",
        code: "study-missing-doi",
        studySlug: s.slug,
        message: `Study '${s.slug}' has no DOI recorded.`,
      });
    }
    if (!s.pmid) {
      issues.push({
        severity: "info",
        code: "study-missing-pmid",
        studySlug: s.slug,
        message: `Study '${s.slug}' has no PMID recorded.`,
      });
    }
    if (!s.journal) {
      issues.push({
        severity: "warning",
        code: "study-missing-journal",
        studySlug: s.slug,
        message: `Study '${s.slug}' has no journal recorded.`,
      });
    }
    if (!s.compoundSlugs.length) {
      issues.push({
        severity: "error",
        code: "study-missing-compound",
        studySlug: s.slug,
        message: `Study '${s.slug}' has no compound relationship.`,
      });
    }
    if (!(s.mechanismIds ?? []).length) {
      issues.push({
        severity: "warning",
        code: "study-missing-mechanism",
        studySlug: s.slug,
        message: `Study '${s.slug}' has no mechanism relationship.`,
      });
    }
    if (!(s.guideSlugs ?? []).length) {
      issues.push({
        severity: "info",
        code: "study-no-guides",
        studySlug: s.slug,
        message: `Study '${s.slug}' is not linked to any research guide.`,
      });
    }
  }
  return issues;
}

// ---------------------------------------------------------------------------
//  Internal-link audit — target thresholds set by Authority Sprint 4.0
// ---------------------------------------------------------------------------

export interface InternalLinkAuditRow {
  path: string;
  entityType: KnowledgeEntity["type"];
  title: string;
  outboundLinks: number;
  inboundLinks: number;
  glossaryLinks: number;
  studyLinks: number;
  passes: boolean;
  missing: readonly string[];
}

const MIN_OUTBOUND = 5;
const MIN_INBOUND = 3;
const MIN_GLOSSARY = 3;
const MIN_STUDY = 2;

export function runInternalLinkAudit(): InternalLinkAuditRow[] {
  // Precompute inbound counts per entity key.
  const inbound = new Map<string, number>();
  for (const e of knowledgeGraph) {
    for (const r of e.related ?? []) {
      const k = `${r.type}::${r.slug}`;
      inbound.set(k, (inbound.get(k) ?? 0) + 1);
    }
  }

  const rows: InternalLinkAuditRow[] = [];
  const auditableTypes: KnowledgeEntity["type"][] = [
    "guide",
    "compound",
    "mechanism",
    "comparison",
    "literature-review",
  ];

  for (const e of knowledgeGraph) {
    if (e.status !== "populated") continue;
    if (!auditableTypes.includes(e.type)) continue;
    const outbound = (e.related ?? []).length;
    const inb = inbound.get(`${e.type}::${e.slug}`) ?? 0;
    const glossaryLinks = (e.related ?? []).filter((r) => r.type === "glossary-term").length;

    // Study links: we don't yet emit study entities into the KG, so we
    // count study relationships from taxonomy for compounds / guides.
    let studyLinks = 0;
    if (e.type === "compound") {
      studyLinks = studiesForCompound(e.slug).length;
    } else if (e.type === "guide") {
      const guide = guides.find((g) => g.slug === e.slug);
      if (guide) {
        studyLinks = studies.filter((s) => s.guideSlugs?.includes(guide.slug)).length;
      }
    } else if (e.type === "mechanism") {
      studyLinks = studiesForMechanism(e.slug).length;
    }

    const missing: string[] = [];
    if (outbound < MIN_OUTBOUND) missing.push(`outbound<${MIN_OUTBOUND}`);
    if (inb < MIN_INBOUND) missing.push(`inbound<${MIN_INBOUND}`);
    if (glossaryLinks < MIN_GLOSSARY) missing.push(`glossary<${MIN_GLOSSARY}`);
    if (studyLinks < MIN_STUDY && e.type !== "glossary-term") {
      missing.push(`studies<${MIN_STUDY}`);
    }

    rows.push({
      path: e.path ?? `/${e.type}/${e.slug}`,
      entityType: e.type,
      title: e.title,
      outboundLinks: outbound,
      inboundLinks: inb,
      glossaryLinks,
      studyLinks,
      passes: missing.length === 0,
      missing,
    });
  }

  return rows.sort((a, b) => (a.passes === b.passes ? 0 : a.passes ? 1 : -1));
}

// ---------------------------------------------------------------------------
//  Extended governance — reciprocal / weak / glossary coverage
// ---------------------------------------------------------------------------

export interface ExtendedGovernanceIssue {
  severity: "error" | "warning" | "info";
  code:
    | "missing-reciprocal"
    | "weak-relationship"
    | "missing-glossary-coverage"
    | "compound-missing-studies";
  message: string;
  entity: { type: KnowledgeEntity["type"]; slug: string };
}

export function runExtendedGovernance(): ExtendedGovernanceIssue[] {
  const issues: ExtendedGovernanceIssue[] = [];

  // 1. Missing reciprocal links between compounds and mechanisms.
  const compounds = getEntitiesOfType("compound").filter((c) => c.status === "populated");
  for (const c of compounds) {
    for (const r of c.related ?? []) {
      if (r.type !== "mechanism") continue;
      const other = getEntity(r);
      if (!other) continue;
      const reciprocal = (other.related ?? []).some(
        (rr) => rr.type === "compound" && rr.slug === c.slug,
      );
      if (!reciprocal) {
        issues.push({
          severity: "info",
          code: "missing-reciprocal",
          message: `${c.type}:${c.slug} → ${r.type}:${r.slug} has no reciprocal edge (informational — inbound queries still resolve).`,
          entity: { type: r.type, slug: r.slug },
        });
      }
    }
  }

  // 2. Weak relationships — a populated entity with fewer than 2 outbound
  //    graph edges.
  for (const e of knowledgeGraph) {
    if (e.status !== "populated") continue;
    if (e.type === "category" || e.type === "compound-family") continue;
    const outbound = (e.related ?? []).length;
    if (outbound < 2) {
      issues.push({
        severity: "warning",
        code: "weak-relationship",
        message: `${e.type}:${e.slug} has ${outbound} outbound relationship(s); target ≥ 2.`,
        entity: { type: e.type, slug: e.slug },
      });
    }
  }

  // 3. Missing glossary coverage — populated compounds without ≥ 3 linked
  //    glossary terms.
  for (const c of compoundEntries.filter((cc) => cc.populated)) {
    const count = glossaryTerms.filter((t) =>
      t.relatedCompoundSlugs?.includes(c.slug),
    ).length;
    if (count < 3) {
      issues.push({
        severity: "warning",
        code: "missing-glossary-coverage",
        message: `Compound '${c.slug}' has only ${count} glossary entries; target ≥ 3.`,
        entity: { type: "compound", slug: c.slug },
      });
    }
  }

  // 4. Populated compounds with no study relationships.
  for (const c of compoundEntries.filter((cc) => cc.populated)) {
    if (studiesForCompound(c.slug).length === 0) {
      issues.push({
        severity: "info",
        code: "compound-missing-studies",
        message: `Compound '${c.slug}' has no linked literature studies.`,
        entity: { type: "compound", slug: c.slug },
      });
    }
  }

  return issues;
}
