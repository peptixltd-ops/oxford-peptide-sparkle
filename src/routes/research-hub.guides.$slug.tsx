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
  definedTermLd,
} from "@/lib/seo";
import { getGuideContent } from "@/content/retatrutide-cluster";
import {
  getExtendedAnswer,
  getDefinedTerm,
  getFaqSupplement,
} from "@/content/retatrutide-cluster-ai";

export const Route = createFileRoute("/research-hub/guides/$slug")({
  head: ({ params }) => {
    const content = getGuideContent(params.slug);
    if (content) {
      const path = `/research-hub/guides/${content.slug}`;
      const supplement = getFaqSupplement(content.slug);
      const existing = content.faqs ?? [];
      const seenQuestions = new Set(existing.map((f) => f.question));
      const mergedFaqs = [
        ...existing,
        ...supplement.filter((f) => !seenQuestions.has(f.question)),
      ];
      const definedTerm = getDefinedTerm(content.slug);
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
          ...(mergedFaqs.length ? [faqLd(mergedFaqs)] : []),
          ...(definedTerm ? [definedTermLd(definedTerm)] : []),
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
    const layout = content.buildLayout();
    const extendedAnswer = getExtendedAnswer(slug);
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
          <GuideLayout
            {...layout}
            extendedAnswer={extendedAnswer ?? layout.extendedAnswer}
          />
        </main>
        <SiteFooter />
      </div>
    );
  },
});
