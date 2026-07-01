import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/research-hub/glossary/$slug")({
  head: ({ params }) =>
    seo({
      path: `/research-hub/glossary/${params.slug}`,
      title: `${params.slug} — Glossary — Oxford Research Peptides`,
      description: "Placeholder glossary term. Populated in Release 2.",
      noindex: true,
    }),
  component: () => {
    const { slug } = Route.useParams();
    return <PlaceholderKnowledgePage categoryId="glossary" slug={slug} />;
  },
});
