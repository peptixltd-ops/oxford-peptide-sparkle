import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideLayout } from "@/components/knowledge/guide-layout";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { getComparisonContent } from "@/content/comparisons-content";

export const Route = createFileRoute("/research-hub/comparisons/$slug")({
  head: ({ params }) => {
    const content = getComparisonContent(params.slug);
    if (content) {
      const path = `/research-hub/comparisons/${content.slug}`;
      return seo({
        path,
        title: `${content.title} — Comparison — Oxford Research Peptides`,
        description: content.description,
        ogType: "article",
        jsonLd: [
          articleLd({
            path,
            headline: content.title,
            description: content.description,
            datePublished: content.datePublished,
            dateModified: content.dateModified,
            authorName: "Oxford Research Peptides Editorial Team",
            reviewerName: "Scientific Review Panel",
          }),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Research Hub", path: "/research-hub" },
            { name: "Comparisons", path: "/research-hub/comparisons" },
            { name: content.title, path },
          ]),
          ...(content.faqs.length ? [faqLd(content.faqs)] : []),
        ],
      });
    }
    return seo({
      path: `/research-hub/comparisons/${params.slug}`,
      title: `${params.slug} — Comparison — Oxford Research Peptides`,
      description: "Placeholder comparison page. Populated in a future release.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const content = getComparisonContent(slug);
    if (!content) {
      return <PlaceholderKnowledgePage categoryId="comparisons" slug={slug} />;
    }
    const layout = content.buildLayout();
    return (
      <div className="min-h-screen bg-bone text-navy-deep">
        <SiteHeader />
        <Breadcrumbs
          items={[
            { label: "Research Hub", to: "/research-hub" },
            { label: "Comparisons", to: "/research-hub/comparisons" },
            { label: content.title },
          ]}
        />
        <main id="main-content">
          <GuideLayout
            {...layout}
            extendedAnswer={content.extendedAnswer ?? layout.extendedAnswer}
          />
        </main>
        <SiteFooter />
      </div>
    );
  },
});
