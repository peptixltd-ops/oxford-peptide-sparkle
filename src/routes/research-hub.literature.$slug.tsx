import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideLayout } from "@/components/knowledge/guide-layout";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import { seo, articleLd, breadcrumbLd, faqLd } from "@/lib/seo";
import { getStudyContent } from "@/content/studies-content";
import { getStudy } from "@/lib/taxonomy";

export const Route = createFileRoute("/research-hub/literature/$slug")({
  head: ({ params }) => {
    const content = getStudyContent(params.slug);
    const entry = getStudy(params.slug);
    if (content) {
      const path = `/research-hub/literature/${content.slug}`;
      return seo({
        path,
        title: `${content.title} — Literature Review — Oxford Research Peptides`,
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
            { name: "Scientific Literature", path: "/research-hub/literature" },
            { name: entry?.shortName ?? content.title, path },
          ]),
          ...(content.faqs.length ? [faqLd(content.faqs)] : []),
        ],
      });
    }
    return seo({
      path: `/research-hub/literature/${params.slug}`,
      title: `${params.slug} — Literature Review — Oxford Research Peptides`,
      description: "Placeholder literature review page.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const content = getStudyContent(slug);
    if (!content) {
      return <PlaceholderKnowledgePage categoryId="literature" slug={slug} />;
    }
    const entry = getStudy(slug);
    const layout = content.buildLayout();
    return (
      <div className="min-h-screen bg-bone text-navy-deep">
        <SiteHeader />
        <Breadcrumbs
          items={[
            { label: "Research Hub", to: "/research-hub" },
            { label: "Scientific Literature", to: "/research-hub/literature" },
            { label: entry?.shortName ?? content.title },
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
