import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/knowledge/category-landing";
import { seo } from "@/lib/seo";
import { getCategory } from "@/lib/taxonomy";

const category = getCategory("literature")!;

export const Route = createFileRoute("/research-hub/literature/")({
  head: () =>
    seo({
      path: category.path,
      title: `${category.label} — Oxford Research Peptides`,
      description: category.description,
      noindex: !category.populated,
    }),
  component: () => <CategoryLanding categoryId="literature" />,
});
