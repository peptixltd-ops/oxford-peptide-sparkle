import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { ScaffoldGuidePage } from "@/components/knowledge/scaffold-guide-page";
import { seo } from "@/lib/seo";
import { getGuideScaffold } from "@/lib/scaffolds";

export const Route = createFileRoute("/research-hub/methodology/$slug")({
  head: ({ params }) => {
    const scaffold = getGuideScaffold("methodology", params.slug);
    return seo({
      path: `/research-hub/methodology/${params.slug}`,
      title: `${scaffold?.title ?? params.slug} — Laboratory Methodology — Oxford Research Peptides`,
      description: scaffold?.quickAnswer ?? "Placeholder methodology procedure.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const scaffold = getGuideScaffold("methodology", slug);
    if (scaffold) return <ScaffoldGuidePage scaffold={scaffold} />;
    return <PlaceholderKnowledgePage categoryId="methodology" slug={slug} />;
  },
});
