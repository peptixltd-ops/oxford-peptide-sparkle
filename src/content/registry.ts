/**
 * Authority Sprint 1B — Shared content lookup.
 *
 * Merges the Retatrutide cluster (Release 4.0–6.0A) and the BPC-157
 * cornerstone cluster (Sprint 1B) behind a single lookup surface so that
 * route files stay simple and cluster-agnostic.
 */
import type { ReactNode } from "react";
import type { CompoundLayoutProps } from "@/components/knowledge/compound-layout";
import type { DefinedTermLdOpts } from "@/lib/seo";

import {
  guideContentRegistry as retatrutideGuides,
  compoundMonographRegistry as retatrutideCompounds,
  type GuideContent,
} from "@/content/retatrutide-cluster";
import {
  bpc157GuideRegistry,
  bpc157CompoundRegistry,
} from "@/content/bpc157-cluster";
import {
  semaglutideGuideRegistry,
  semaglutideCompoundRegistry,
} from "@/content/semaglutide-cluster";
import {
  tirzepatideGuideRegistry,
  tirzepatideCompoundRegistry,
} from "@/content/tirzepatide-cluster";

import {
  getExtendedAnswer as getRetatrutideExtendedAnswer,
  getDefinedTerm as getRetatrutideDefinedTerm,
  getFaqSupplement as getRetatrutideFaqSupplement,
} from "@/content/retatrutide-cluster-ai";
import {
  getBpc157ExtendedAnswer,
  getBpc157FaqSupplement,
} from "@/content/bpc157-cluster-ai";
import {
  getSemaglutideExtendedAnswer,
  getSemaglutideFaqSupplement,
} from "@/content/semaglutide-cluster-ai";
import {
  getTirzepatideExtendedAnswer,
  getTirzepatideFaqSupplement,
} from "@/content/tirzepatide-cluster-ai";

// ---------------------------------------------------------------------------
// Normalised compound-monograph record — one shape across clusters
// ---------------------------------------------------------------------------

export interface CompoundMonographMeta {
  slug: string;
  title: string;
  path: string;
  shortDescription: string;
  aliases: readonly string[];
  molecularFormula?: string;
  molecularWeight?: string;
  cas?: string;
  identifiers?: readonly { propertyID: string; value: string }[];
  datePublished: string;
  dateModified: string;
}

export interface CompoundMonographRecord {
  meta: CompoundMonographMeta;
  build: () => CompoundLayoutProps;
  faqs: readonly { question: string; answer: string }[];
}

const combinedCompoundMonographs: Record<string, CompoundMonographRecord> = {
  ...Object.fromEntries(
    Object.entries(retatrutideCompounds).map(([slug, entry]) => [
      slug,
      {
        meta: {
          slug: entry.meta.slug,
          title: entry.meta.title,
          path: entry.meta.path,
          shortDescription: entry.meta.shortDescription,
          aliases: entry.meta.aliases,
          molecularFormula: entry.meta.molecularFormula,
          molecularWeight: entry.meta.molecularWeight,
          cas: entry.meta.cas,
          identifiers: [
            { propertyID: "CAS", value: entry.meta.cas },
            { propertyID: "developmentalCode", value: "LY3437943" },
          ],
          datePublished: entry.meta.datePublished,
          dateModified: entry.meta.dateModified,
        },
        build: entry.build,
        faqs: entry.faqs,
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(bpc157CompoundRegistry).map(([slug, entry]) => [
      slug,
      {
        meta: {
          slug: entry.meta.slug,
          title: entry.meta.title,
          path: entry.meta.path,
          shortDescription: entry.meta.shortDescription,
          aliases: entry.meta.aliases,
          molecularFormula: entry.meta.molecularFormula,
          molecularWeight: entry.meta.molecularWeight,
          cas: entry.meta.cas,
          identifiers: [{ propertyID: "CAS", value: entry.meta.cas }],
          datePublished: entry.meta.datePublished,
          dateModified: entry.meta.dateModified,
        },
        build: entry.build,
        faqs: entry.faqs,
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(semaglutideCompoundRegistry).map(([slug, entry]) => [
      slug,
      {
        meta: {
          slug: entry.meta.slug,
          title: entry.meta.title,
          path: entry.meta.path,
          shortDescription: entry.meta.shortDescription,
          aliases: entry.meta.aliases,
          molecularFormula: entry.meta.molecularFormula,
          molecularWeight: entry.meta.molecularWeight,
          cas: entry.meta.cas,
          identifiers: [
            { propertyID: "CAS", value: entry.meta.cas },
            { propertyID: "developmentalCode", value: "NN9535" },
            { propertyID: "Wikidata", value: "Q27088395" },
            { propertyID: "DrugBank", value: "DB13928" },
          ],
          datePublished: entry.meta.datePublished,
          dateModified: entry.meta.dateModified,
        },
        build: entry.build,
        faqs: entry.faqs,
      },
    ]),
  ),
  ...Object.fromEntries(
    Object.entries(tirzepatideCompoundRegistry).map(([slug, entry]) => [
      slug,
      {
        meta: {
          slug: entry.meta.slug,
          title: entry.meta.title,
          path: entry.meta.path,
          shortDescription: entry.meta.shortDescription,
          aliases: entry.meta.aliases,
          molecularFormula: entry.meta.molecularFormula,
          molecularWeight: entry.meta.molecularWeight,
          cas: entry.meta.cas,
          identifiers: [
            { propertyID: "CAS", value: entry.meta.cas },
            { propertyID: "developmentalCode", value: "LY3298176" },
            { propertyID: "Wikidata", value: "Q97154240" },
            { propertyID: "DrugBank", value: "DB15171" },
          ],
          datePublished: entry.meta.datePublished,
          dateModified: entry.meta.dateModified,
        },
        build: entry.build,
        faqs: entry.faqs,
      },
    ]),
  ),
};

export function getCompoundMonographRecord(
  slug: string,
): CompoundMonographRecord | undefined {
  return combinedCompoundMonographs[slug];
}

// ---------------------------------------------------------------------------
// Unified guide lookup
// ---------------------------------------------------------------------------

const combinedGuides: readonly GuideContent[] = [
  ...retatrutideGuides,
  ...bpc157GuideRegistry,
  ...semaglutideGuideRegistry,
  ...tirzepatideGuideRegistry,
];

export function getGuideContent(slug: string): GuideContent | undefined {
  return combinedGuides.find((g) => g.slug === slug);
}

// ---------------------------------------------------------------------------
// Unified AI-search helpers
// ---------------------------------------------------------------------------

export function getExtendedAnswer(slug: string): ReactNode | undefined {
  return (
    getRetatrutideExtendedAnswer(slug) ??
    getBpc157ExtendedAnswer(slug) ??
    getSemaglutideExtendedAnswer(slug) ??
    getTirzepatideExtendedAnswer(slug)
  );
}

export function getDefinedTerm(slug: string): DefinedTermLdOpts | undefined {
  return getRetatrutideDefinedTerm(slug);
}

export function getFaqSupplement(
  slug: string,
): readonly { question: string; answer: string }[] {
  const r = getRetatrutideFaqSupplement(slug);
  if (r.length) return r;
  const b = getBpc157FaqSupplement(slug);
  if (b.length) return b;
  const s = getSemaglutideFaqSupplement(slug);
  if (s.length) return s;
  return getTirzepatideFaqSupplement(slug);
}

