import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PlaceholderKnowledgePage } from "@/components/knowledge/placeholder-knowledge-page";
import {
  seo,
  articleLd,
  breadcrumbLd,
  definedTermLd,
} from "@/lib/seo";
import { getGlossaryContent } from "@/content/glossary-content";
import { getGuide } from "@/lib/taxonomy";

export const Route = createFileRoute("/research-hub/glossary/$slug")({
  head: ({ params }) => {
    const entry = getGlossaryContent(params.slug);
    if (!entry) {
      return seo({
        path: `/research-hub/glossary/${params.slug}`,
        title: `${params.slug} — Glossary — Oxford Research Peptides`,
        description: "Placeholder glossary term.",
        noindex: true,
      });
    }
    const path = `/research-hub/glossary/${entry.slug}`;
    return seo({
      path,
      title: `${entry.term} — Glossary — Oxford Research Peptides`,
      description: entry.short,
      ogType: "article",
      jsonLd: [
        definedTermLd(entry.definedTerm),
        articleLd({
          path,
          headline: `${entry.term} — Definition`,
          description: entry.short,
          datePublished: entry.datePublished,
          dateModified: entry.dateModified,
          authorName: "Oxford Research Peptides Editorial Team",
          reviewerName: "Scientific Review Panel",
        }),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Hub", path: "/research-hub" },
          { name: "Glossary", path: "/research-hub/glossary" },
          { name: entry.term, path },
        ]),
      ],
    });
  },
  component: GlossaryTermPage,
});

function GlossaryTermPage() {
  const { slug } = Route.useParams();
  const entry = getGlossaryContent(slug);
  if (!entry) {
    return <PlaceholderKnowledgePage categoryId="glossary" slug={slug} />;
  }

  const relatedGuides = (entry.relatedGuideSlugs ?? [])
    .map((s) => ({ slug: s, guide: getGuide(s) }))
    .filter((r) => !!r.guide);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          { label: "Glossary", to: "/research-hub/glossary" },
          { label: entry.term },
        ]}
      />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-12 md:py-16">
          <div className="container-x max-w-3xl">
            <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">
              GLOSSARY
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-medium">
              {entry.term}
            </h1>
            {entry.aliases && entry.aliases.length > 0 && (
              <p className="mt-3 text-bone/70 text-sm">
                Also known as: {entry.aliases.join("; ")}
              </p>
            )}
            <p className="mt-4 max-w-2xl text-bone/80 leading-relaxed">
              {entry.short}
            </p>
          </div>
        </section>

        <div className="container-x py-10 md:py-14 grid lg:grid-cols-[1fr_320px] gap-10">
          <article className="min-w-0 space-y-6">
            <section className="bg-white border border-navy-deep/10 p-6 md:p-8 space-y-4">
              <div className="text-[10px] font-bold tracking-widest text-gold">
                DEFINITION
              </div>
              {entry.body}
            </section>

            {(entry.relatedCompoundSlugs?.length ||
              relatedGuides.length ||
              entry.relatedGlossarySlugs?.length) && (
              <section className="bg-white border border-navy-deep/10 p-6 md:p-8 space-y-4">
                <div className="text-[10px] font-bold tracking-widest text-gold">
                  RELATED
                </div>
                {entry.relatedCompoundSlugs?.length ? (
                  <div>
                    <div className="text-sm font-semibold text-navy-deep mb-1">
                      Compounds
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {entry.relatedCompoundSlugs.map((s) => (
                        <li key={s}>
                          <Link
                            to="/compounds/$slug"
                            params={{ slug: s }}
                            className="underline underline-offset-2"
                          >
                            {s.replace(/-/g, " ").toUpperCase()}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {relatedGuides.length ? (
                  <div>
                    <div className="text-sm font-semibold text-navy-deep mb-1">
                      Guides
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {relatedGuides.map(({ slug: s, guide }) => (
                        <li key={s}>
                          <Link
                            to="/research-hub/guides/$slug"
                            params={{ slug: s }}
                            className="underline underline-offset-2"
                          >
                            {guide!.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {entry.relatedGlossarySlugs?.length ? (
                  <div>
                    <div className="text-sm font-semibold text-navy-deep mb-1">
                      Glossary
                    </div>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      {entry.relatedGlossarySlugs.map((s) => (
                        <li key={s}>
                          <Link
                            to="/research-hub/glossary/$slug"
                            params={{ slug: s }}
                            className="underline underline-offset-2"
                          >
                            {s.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </section>
            )}

            <footer className="border-t border-navy-deep/10 pt-4 text-xs text-muted-foreground flex flex-wrap gap-x-6 gap-y-2">
              <span>
                <strong className="text-navy-deep">Published:</strong>{" "}
                {entry.datePublished}
              </span>
              <span>
                <strong className="text-navy-deep">Updated:</strong>{" "}
                {entry.dateModified}
              </span>
            </footer>
          </article>

          <aside className="lg:pl-4">
            <div className="bg-white border border-navy-deep/10 p-6 space-y-3">
              <div className="text-[10px] font-bold tracking-widest text-gold">
                GLOSSARY
              </div>
              <Link
                to="/research-hub/glossary"
                className="text-sm underline underline-offset-2"
              >
                ← All glossary terms
              </Link>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
