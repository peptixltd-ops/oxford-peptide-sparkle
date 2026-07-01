import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research-hub/guides/$slug")({
  head: ({ params }) =>
    seo({
      path: `/research-hub/guides/${params.slug}`,
      title: `${params.slug} — Research Guide — Oxford Research Peptides`,
      description: "Placeholder research guide page. Populated in Release 2.",
      noindex: true,
    }),
  component: () => {
    const { slug } = Route.useParams();
    return <PlaceholderKnowledgePage categoryId="guides" slug={slug} />;
  },
});
