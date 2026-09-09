import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";
import {
  buildCollectionView,
  getStudyCollection,
  studyCollections,
} from "@/lib/study-collections";
import { compoundEntries, mechanismGroups } from "@/lib/taxonomy";

export const Route = createFileRoute("/research-hub/collections/$slug")({
  head: ({ params }) => {
    const c = getStudyCollection(params.slug);
    const path = `/research-hub/collections/${params.slug}`;
    if (!c) {
      return seo({ path, title: "Collection — Oxford Research Peptides", description: "Collection not found.", noindex: true });
    }
    return seo({
      path,
      title: `${c.title} — Study Collection — Oxford Research Peptides`,
      description: c.summary,
      jsonLd: [
        aboutPageLd(path, `${c.title} — Study Collection`, c.summary),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Hub", path: "/research-hub" },
          { name: "Collections", path: "/research-hub/collections" },
          { name: c.title, path },
        ]),
      ],
    });
  },
  loader: ({ params }) => {
    if (!studyCollections.find((c) => c.slug === params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main className="container-x py-16">
        <h1 className="font-display text-3xl">Collection not found</h1>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { slug } = Route.useParams();
  const view = buildCollectionView(slug);
  if (!view) return null;
  const { collection, studies, timeline, comparisons } = view;

  const compounds = compoundEntries.filter((c) => collection.compoundSlugs.includes(c.slug));
  const mechanisms = mechanismGroups.filter((m) =>
    (collection.mechanismIds as readonly string[]).includes(m.id),
  );

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          { label: "Collections", to: "/research-hub/collections" },
          { label: collection.title },
        ]}
      />
      <main id="main-content" className="container-x py-10 max-w-5xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          {collection.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{collection.title}</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-navy-deep/85">
          {collection.summary}
        </p>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Timeline</h2>
          {timeline.length ? (
            <ol className="relative border-l border-navy-deep/20 pl-5">
              {timeline.map((s) => (
                <li key={s.slug} className="mb-4">
                  <div className="text-[11px] uppercase tracking-widest text-navy-deep/55">
                    {s.year} · {s.journal ?? "Journal not recorded"}
                  </div>
                  <a
                    href={`/research-hub/literature/${s.slug}`}
                    className="mt-0.5 block text-sm font-medium text-navy-deep hover:text-gold"
                  >
                    {s.shortName ?? s.title}
                  </a>
                  <p className="mt-1 text-xs text-navy-deep/75">{s.summary}</p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-sm text-navy-deep/60">
              No study records yet — this collection is scaffolded and will populate as studies are added.
            </p>
          )}
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Compounds</h2>
          <ul className="flex flex-wrap gap-2 text-xs">
            {compounds.map((c) => (
              <li key={c.slug}>
                <a
                  href={`/compounds/${c.slug}`}
                  className="rounded-sm border border-navy-deep/15 bg-white px-2.5 py-1 hover:border-gold"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Mechanisms</h2>
          <ul className="flex flex-wrap gap-2 text-xs">
            {mechanisms.map((m) => (
              <li key={m.id}>
                <a
                  href={`/research-hub/mechanisms/${m.id}`}
                  className="rounded-sm border border-navy-deep/15 bg-white px-2.5 py-1 hover:border-gold"
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Research applications</h2>
          <ul className="list-disc pl-5 text-sm text-navy-deep/80">
            {collection.applications.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 font-display text-xl">Comparisons</h2>
          {comparisons.length ? (
            <ul className="divide-y divide-navy-deep/10 rounded-sm border border-navy-deep/15 bg-white">
              {comparisons.map((c) => (
                <li key={c.slug} className="px-4 py-3">
                  <a
                    href={`/research-hub/comparisons/${c.slug}`}
                    className="text-sm font-medium text-navy-deep hover:text-gold"
                  >
                    {c.title}
                  </a>
                  <p className="mt-1 text-xs text-navy-deep/70">{c.summary}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-navy-deep/60">No comparisons attached.</p>
          )}
        </section>

        <section className="mt-8 rounded-sm border border-navy-deep/15 bg-white p-5 text-sm text-navy-deep/80">
          Suggested reading paths:{" "}
          <Link to="/explore/pathways/$type" params={{ type: "compound-focused" }} className="text-gold">
            compound-focused
          </Link>{" "}
          ·{" "}
          <Link to="/explore/pathways/$type" params={{ type: "mechanism-focused" }} className="text-gold">
            mechanism-focused
          </Link>
        </section>

        <p className="mt-10 text-xs text-navy-deep/50">
          Study {studies.length ? `count: ${studies.length}` : "membership: 0"} · Collection updated{" "}
          {collection.updated}.
        </p>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
