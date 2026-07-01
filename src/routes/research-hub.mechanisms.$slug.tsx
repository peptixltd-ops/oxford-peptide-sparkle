import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { ScaffoldGuidePage } from "@/components/knowledge/scaffold-guide-page";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { seo } from "@/lib/seo";
import { mechanismGroups } from "@/lib/taxonomy";
import { getGuideScaffold } from "@/lib/scaffolds";

export const Route = createFileRoute("/research-hub/mechanisms/$slug")({
  head: ({ params }) => {
    const scaffold = getGuideScaffold("mechanism", params.slug);
    const m = mechanismGroups.find((x) => x.id === params.slug);
    return seo({
      path: `/research-hub/mechanisms/${params.slug}`,
      title: `${scaffold?.title ?? m?.label ?? params.slug} — Mechanism — Oxford Research Peptides`,
      description: scaffold?.quickAnswer ?? m?.description ?? "Placeholder mechanism of action.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const scaffold = getGuideScaffold("mechanism", slug);
    if (scaffold) return <ScaffoldGuidePage scaffold={scaffold} />;
    const mechanismId = mechanismGroups.find((m) => m.id === slug)?.id;
    return (
      <PlaceholderKnowledgePage categoryId="mechanisms" slug={slug}>
        {mechanismId && (
          <RelatedCompounds mechanismId={mechanismId} heading="Compounds acting at this receptor" />
        )}
      </PlaceholderKnowledgePage>
    );
  },
});
