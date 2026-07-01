import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { RelatedCompounds } from "@/components/knowledge/related-compounds";
import { seo } from "@/lib/seo";
import { mechanismGroups } from "@/lib/taxonomy";

export const Route = createFileRoute("/research-hub/mechanisms/$slug")({
  head: ({ params }) => {
    const m = mechanismGroups.find((x) => x.id === params.slug);
    return seo({
      path: `/research-hub/mechanisms/${params.slug}`,
      title: `${m?.label ?? params.slug} — Mechanism — Oxford Research Peptides`,
      description: m?.description ?? "Placeholder mechanism of action.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
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
