import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research-hub/comparisons/$slug")({
  head: ({ params }) =>
    seo({
      path: `/research-hub/comparisons/${params.slug}`,
      title: `${params.slug} — Comparison — Oxford Research Peptides`,
      description: "Placeholder comparison page. Populated in Release 2.",
      noindex: true,
    }),
  component: () => {
    const { slug } = Route.useParams();
    return <PlaceholderKnowledgePage categoryId="comparisons" slug={slug} />;
  },
});
