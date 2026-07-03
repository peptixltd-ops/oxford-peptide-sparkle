import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  CompoundLayout,
  CompoundSlotPlaceholder,
} from "@/components/knowledge/compound-layout";
import { RelatedGuides } from "@/components/knowledge/related-guides";
import { RelatedMechanisms } from "@/components/knowledge/related-mechanisms";
import {
  seo,
  articleLd,
  breadcrumbLd,
  chemicalSubstanceLd,
  faqLd,
} from "@/lib/seo";
import { getCompoundEntry } from "@/lib/taxonomy";
import { getCompoundScaffold, buildCompoundLayoutProps } from "@/lib/scaffolds";
import { getCompoundMonographRecord } from "@/content/registry";

/**
 * Reusable compound monograph route. Priority:
 *   1. A fully populated monograph in the shared content registry
 *      (Retatrutide — Release 4.0; BPC-157 — Sprint 1B).
 *   2. A scaffold entry from Release 2.1 (noindex).
 *   3. The empty structural template.
 */
export const Route = createFileRoute("/compounds/$slug")({
  head: ({ params }) => {
    const monograph = getCompoundMonographRecord(params.slug);
    const entry = getCompoundEntry(params.slug);
    const scaffold = getCompoundScaffold(params.slug);

    if (monograph) {
      const m = monograph.meta;
      return seo({
        path: m.path,
        title: `${m.title} — Compound Reference — Oxford Research Peptides`,
        description: m.shortDescription,
        ogType: "article",
        jsonLd: [
          chemicalSubstanceLd({
            path: m.path,
            name: m.title,
            alternateName: m.aliases,
            description: m.shortDescription,
            molecularFormula: m.molecularFormula,
            molecularWeight: m.molecularWeight,
            identifier: m.identifiers,
          }),
          articleLd({
            path: m.path,
            headline: `${m.title} — Compound Reference`,
            description: m.shortDescription,
            datePublished: m.datePublished,
            dateModified: m.dateModified,
            authorName: "Oxford Research Peptides Editorial Team",
            reviewerName: "Scientific Review Panel",
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Compound Reference", path: "/compounds" },
            { name: m.title, path: m.path },
          ]),
          faqLd(monograph.faqs),
        ],
      });
    }

    return seo({
      path: `/compounds/${params.slug}`,
      title: entry
        ? `${entry.name} — Compound Reference — Oxford Research Peptides`
        : `Compound template — Oxford Research Peptides`,
      description:
        scaffold?.identity ??
        entry?.aliases?.join(", ") ??
        "Structural template for the Oxford Research Peptides Compound Reference monographs.",
      noindex: !entry?.populated,
    });
  },
  component: CompoundPage,
});

function CompoundPage() {
  const { slug } = Route.useParams();
  const monograph = getCompoundMonographRecord(slug);
  const entry = getCompoundEntry(slug);
  const scaffold = getCompoundScaffold(slug);
  const displayName = monograph?.meta.title ?? scaffold?.title ?? entry?.name ?? "Monograph Template";

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Compound Reference", to: "/compounds" },
          { label: displayName },
        ]}
      />
      <main id="main-content">
        {monograph ? (
          <CompoundLayout {...monograph.build()} />
        ) : scaffold ? (
          <CompoundLayout
            {...buildCompoundLayoutProps(scaffold)}
            relatedGuides={<RelatedGuides compoundSlug={slug} heading="Related guides" />}
          />
        ) : (
          <CompoundLayout
            name={displayName}
            aliases={entry?.aliases?.join(", ") ?? <CompoundSlotPlaceholder label="Aliases" />}
            identity={<CompoundSlotPlaceholder label="Identity summary" />}
            chemicalMetadata={<CompoundSlotPlaceholder label="Chemical metadata (sequence, MW, CAS, InChI)" />}
            mechanism={<CompoundSlotPlaceholder label="Mechanism narrative" />}
            receptorTargets={
              entry?.mechanismIds && entry.mechanismIds.length > 0 ? (
                <RelatedMechanisms mechanismIds={entry.mechanismIds} heading="Primary receptor targets" />
              ) : (
                <CompoundSlotPlaceholder label="Receptor targets" />
              )
            }
            researchAreas={<CompoundSlotPlaceholder label="Research areas" />}
            laboratoryNotes={<CompoundSlotPlaceholder label="Laboratory handling notes" />}
            evidenceSummary={<CompoundSlotPlaceholder label="Evidence summary" />}
            references={<CompoundSlotPlaceholder label="References" />}
            relatedGuides={<RelatedGuides compoundSlug={slug} heading="Related guides" />}
            relatedProducts={
              <section className="bg-white border border-navy-deep/10 p-6 md:p-8">
                <div className="text-[10px] font-bold tracking-widest text-gold mb-3">
                  RELATED PRODUCTS
                </div>
                <CompoundSlotPlaceholder label="Linked product SKUs" />
              </section>
            }
          />
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
