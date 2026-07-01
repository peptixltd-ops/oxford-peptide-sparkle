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
import { seo } from "@/lib/seo";
import { getCompoundEntry } from "@/lib/taxonomy";
import { getCompoundScaffold, buildCompoundLayoutProps } from "@/lib/scaffolds";

/**
 * Reusable compound monograph route. Renders a scaffold-driven layout when
 * a scaffold entry exists for the slug; otherwise falls back to the empty
 * structural template. Scaffold pages are emitted with `noindex` until the
 * taxonomy marks the entry as populated.
 */
export const Route = createFileRoute("/compounds/$slug")({
  head: ({ params }) => {
    const entry = getCompoundEntry(params.slug);
    const scaffold = getCompoundScaffold(params.slug);
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
  const entry = getCompoundEntry(slug);
  const scaffold = getCompoundScaffold(slug);
  const displayName = scaffold?.title ?? entry?.name ?? "Monograph Template";

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
        {scaffold ? (
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
