import { createFileRoute } from "@tanstack/react-router";
import { CategoryLanding } from "@/components/knowledge/category-landing";
import { seo } from "@/lib/seo";
import { getCategory } from "@/lib/taxonomy";
import { RelatedMechanisms } from "@/components/knowledge/related-mechanisms";
import { mechanismGroups } from "@/lib/taxonomy";

const category = getCategory("mechanisms")!;

export const Route = createFileRoute("/research-hub/mechanisms/")({
  head: () =>
    seo({
      path: category.path,
      title: `${category.label} — Oxford Research Peptides`,
      description: category.description,
      noindex: !category.populated,
    }),
  component: () => (
    <CategoryLanding categoryId="mechanisms">
      <RelatedMechanisms
        mechanismIds={mechanismGroups.map((m) => m.id)}
        heading="Mechanism groups"
      />
    </CategoryLanding>
  ),
});
