import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideLayout } from "@/components/knowledge/guide-layout";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import {
  seo,
  articleLd,
  breadcrumbLd,
  faqLd,
} from "@/lib/seo";
import { getGuideContent } from "@/content/retatrutide-cluster";

export const Route = createFileRoute("/research-hub/guides/$slug")({
  head: ({ params }) => {
    const content = getGuideContent(params.slug);
    if (content) {
      const path = `/research-hub/guides/${content.slug}`;
      return seo({
        path,
        title: `${content.title} — Research Guide — Oxford Research Peptides`,
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
            { name: "Research Guides", path: "/research-hub/guides" },
            { name: content.title, path },
          ]),
          ...(content.faqs?.length ? [faqLd(content.faqs)] : []),
        ],
      });
    }
    return seo({
      path: `/research-hub/guides/${params.slug}`,
      title: `${params.slug} — Research Guide — Oxford Research Peptides`,
      description: "Placeholder research guide page.",
      noindex: true,
    });
  },
  component: () => {
    const { slug } = Route.useParams();
    const content = getGuideContent(slug);
    if (!content) {
      return <PlaceholderKnowledgePage categoryId="guides" slug={slug} />;
    }
    return (
      <div className="min-h-screen bg-bone text-navy-deep">
        <SiteHeader />
        <Breadcrumbs
          items={[
            { label: "Research Hub", to: "/research-hub" },
            { label: "Research Guides", to: "/research-hub/guides" },
            { label: content.title },
          ]}
        />
        <main id="main-content">
          <GuideLayout {...content.buildLayout()} />
        </main>
        <SiteFooter />
      </div>
    );
  },
});
