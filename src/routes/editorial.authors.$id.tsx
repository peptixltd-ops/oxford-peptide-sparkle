import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd, personLd } from "@/lib/seo";
import {
  getAuthorProfile,
  authorProfileIds,
  type PublishedWork,
} from "@/lib/editorial-graph";

export const Route = createFileRoute("/editorial/authors/$id")({
  head: ({ params }) => {
    const profile = getAuthorProfile(params.id);
    const path = `/editorial/authors/${params.id}`;
    if (!profile) {
      return seo({
        path,
        title: "Author — Oxford Research Peptides",
        description: "Author profile.",
        noindex: true,
      });
    }
    const { author } = profile;
    return seo({
      path,
      title: `${author.name} — ${author.role} — Oxford Research Peptides`,
      description:
        author.bio ??
        `Editorial profile for ${author.name}. Published guides, reviewed content, and editorial responsibilities.`,
      jsonLd: [
        personLd({
          name: author.name,
          jobTitle: author.role,
          description: author.bio,
          affiliation: author.affiliation,
          url: path,
        }),
        aboutPageLd(
          path,
          `${author.name} — ${author.role}`,
          author.bio ?? "Editorial profile.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Scientific Advisory Board", path: "/scientific-advisory-board" },
          { name: author.name, path },
        ]),
      ],
    });
  },
  loader: ({ params }) => {
    if (!authorProfileIds.includes(params.id)) throw notFound();
    return null;
  },
  notFoundComponent: () => <AuthorPageMissing />,
  component: AuthorProfilePage,
});

function AuthorPageMissing() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main className="container-x py-16">
        <h1 className="font-display text-3xl">Author not found</h1>
        <p className="mt-3 text-sm text-navy-deep/70">
          The requested editorial profile does not exist.{" "}
          <Link to="/scientific-advisory-board" className="text-gold">
            Return to the Scientific Advisory Board
          </Link>
          .
        </p>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}

function WorkList({ items, empty }: { items: readonly PublishedWork[]; empty: string }) {
  if (!items.length) return <p className="text-sm text-navy-deep/60">{empty}</p>;
  return (
    <ul className="divide-y divide-navy-deep/10 rounded-sm border border-navy-deep/15 bg-white">
      {items.map((w) => (
        <li key={`${w.kind}-${w.slug}`} className="flex flex-wrap items-baseline justify-between gap-2 px-4 py-3">
          <div className="min-w-0">
            <a href={w.path} className="text-sm font-medium text-navy-deep hover:text-gold">
              {w.title}
            </a>
            <div className="text-[11px] uppercase tracking-widest text-navy-deep/50">
              {w.kind}
            </div>
          </div>
          {w.updated && (
            <div className="text-xs text-navy-deep/60">Updated {w.updated}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

function AuthorProfilePage() {
  const { id } = Route.useParams();
  const profile = getAuthorProfile(id);
  if (!profile) return <AuthorPageMissing />;
  const { author, publishedGuides, publishedStudies, publishedComparisons, totalPublications, recentPublications } = profile;

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Scientific Advisory Board", to: "/scientific-advisory-board" },
          { label: author.name },
        ]}
      />
      <main id="main-content" className="container-x py-10 max-w-4xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          EDITORIAL PROFILE · {author.role}
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{author.name}</h1>
        {author.credentials && (
          <p className="mt-1 text-sm text-navy-deep/70">{author.credentials}</p>
        )}
        {author.affiliation && (
          <p className="text-sm text-navy-deep/60">{author.affiliation}</p>
        )}
        {author.bio && (
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-navy-deep/85">
            {author.bio}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {totalPublications} publication{totalPublications === 1 ? "" : "s"}
          </span>
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {publishedGuides.length} guides · {publishedStudies.length} studies · {publishedComparisons.length} comparisons
          </span>
        </div>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-xl">Recent publications</h2>
          <WorkList items={recentPublications} empty="No publications recorded." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Guides</h2>
          <WorkList items={publishedGuides} empty="No guides attributed." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Literature summaries</h2>
          <WorkList items={publishedStudies} empty="No literature summaries attributed." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Comparisons</h2>
          <WorkList items={publishedComparisons} empty="No comparison pages attributed." />
        </section>

        <section className="mt-10 rounded-sm border border-navy-deep/15 bg-white p-5">
          <h2 className="mb-2 font-display text-lg">Editorial standards followed</h2>
          <p className="text-sm text-navy-deep/80">
            Every page attributed to this author is produced under the{" "}
            <Link to="/editorial-policy" className="text-gold">Editorial Policy</Link>,{" "}
            <Link to="/publication-workflow" className="text-gold">Publication Workflow</Link>,{" "}
            <Link to="/corrections-policy" className="text-gold">Corrections Policy</Link> and{" "}
            <Link to="/funding-and-conflicts" className="text-gold">Funding & Conflicts</Link> disclosure.
          </p>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
