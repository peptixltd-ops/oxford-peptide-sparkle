import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research-hub/methodology/$slug")({
  head: ({ params }) =>
    seo({
      path: `/research-hub/methodology/${params.slug}`,
      title: `${params.slug} — Laboratory Methodology — Oxford Research Peptides`,
      description: "Placeholder methodology procedure. Populated in Release 2.",
      noindex: true,
    }),
  component: () => {
    const { slug } = Route.useParams();
    return <PlaceholderKnowledgePage categoryId="methodology" slug={slug} />;
  },
});
