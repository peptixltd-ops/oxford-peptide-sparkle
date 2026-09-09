import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd, personLd } from "@/lib/seo";
import {
  getReviewerProfile,
  reviewerProfileIds,
  type PublishedWork,
} from "@/lib/editorial-graph";

export const Route = createFileRoute("/editorial/reviewers/$id")({
  head: ({ params }) => {
    const profile = getReviewerProfile(params.id);
    const path = `/editorial/reviewers/${params.id}`;
    if (!profile) {
      return seo({
        path,
        title: "Scientific reviewer — Oxford Research Peptides",
        description: "Scientific reviewer profile.",
        noindex: true,
      });
    }
    const { reviewer } = profile;
    return seo({
      path,
      title: `${reviewer.name} — ${reviewer.role} — Oxford Research Peptides`,
      description:
        reviewer.bio ??
        `Scientific reviewer profile for ${reviewer.name}. Reviewed content and areas of expertise.`,
      jsonLd: [
        personLd({
          name: reviewer.name,
          jobTitle: reviewer.role,
          description: reviewer.bio,
          affiliation: reviewer.affiliation,
          url: path,
        }),
        aboutPageLd(
          path,
          `${reviewer.name} — ${reviewer.role}`,
          reviewer.bio ?? "Scientific reviewer profile.",
        ),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Scientific Advisory Board", path: "/scientific-advisory-board" },
          { name: reviewer.name, path },
        ]),
      ],
    });
  },
  loader: ({ params }) => {
    if (!reviewerProfileIds.includes(params.id)) throw notFound();
    return null;
  },
  notFoundComponent: () => <ReviewerMissing />,
  component: ReviewerProfilePage,
});

function ReviewerMissing() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main className="container-x py-16">
        <h1 className="font-display text-3xl">Reviewer not found</h1>
        <p className="mt-3 text-sm text-navy-deep/70">
          The requested reviewer profile does not exist.{" "}
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
            <div className="text-xs text-navy-deep/60">Reviewed {w.updated}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

function ReviewerProfilePage() {
  const { id } = Route.useParams();
  const profile = getReviewerProfile(id);
  if (!profile) return <ReviewerMissing />;
  const { reviewer, reviewedGuides, reviewedStudies, reviewedComparisons, totalReviews, recentReviews } = profile;

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Scientific Advisory Board", to: "/scientific-advisory-board" },
          { label: reviewer.name },
        ]}
      />
      <main id="main-content" className="container-x py-10 max-w-4xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          SCIENTIFIC REVIEWER · {reviewer.role}
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{reviewer.name}</h1>
        {reviewer.credentials && (
          <p className="mt-1 text-sm text-navy-deep/70">{reviewer.credentials}</p>
        )}
        {reviewer.affiliation && (
          <p className="text-sm text-navy-deep/60">{reviewer.affiliation}</p>
        )}
        {reviewer.expertise.length > 0 && (
          <p className="mt-4 text-sm text-navy-deep/80">
            <strong className="text-navy-deep">Expertise:</strong>{" "}
            {reviewer.expertise.join(", ")}
          </p>
        )}
        {reviewer.bio && (
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-navy-deep/85">
            {reviewer.bio}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {totalReviews} review{totalReviews === 1 ? "" : "s"} on record
          </span>
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {reviewedGuides.length} guides · {reviewedStudies.length} studies · {reviewedComparisons.length} comparisons
          </span>
        </div>

        <section className="mt-10">
          <h2 className="mb-3 font-display text-xl">Recent reviews</h2>
          <WorkList items={recentReviews} empty="No reviews recorded." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Reviewed guides</h2>
          <WorkList items={reviewedGuides} empty="No guides reviewed." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Reviewed literature summaries</h2>
          <WorkList items={reviewedStudies} empty="No literature reviews on record." />
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Reviewed comparisons</h2>
          <WorkList items={reviewedComparisons} empty="No comparison reviews on record." />
        </section>

        <section className="mt-10 rounded-sm border border-navy-deep/15 bg-white p-5">
          <h2 className="mb-2 font-display text-lg">Editorial responsibilities</h2>
          <p className="text-sm text-navy-deep/80">
            Every page reviewed by this reviewer is subject to the{" "}
            <Link to="/editorial-policy" className="text-gold">Editorial Policy</Link> and the{" "}
            <Link to="/publication-workflow" className="text-gold">Publication Workflow</Link>, including
            the review cadence set for its page type.
          </p>
        </section>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
