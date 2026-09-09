import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo, aboutPageLd, breadcrumbLd } from "@/lib/seo";
import {
  buildProgrammeView,
  getProgramme,
  programmeDefinitions,
} from "@/lib/programmes";
import { getEntity } from "@/lib/knowledge-graph";
import type { PathwayType } from "@/lib/knowledge-graph";

export const Route = createFileRoute("/research-hub/programmes/$slug")({
  head: ({ params }) => {
    const p = getProgramme(params.slug);
    const path = `/research-hub/programmes/${params.slug}`;
    if (!p) {
      return seo({ path, title: "Programme — Oxford Research Peptides", description: "Programme not found.", noindex: true });
    }
    return seo({
      path,
      title: `${p.title} — Research Programme — Oxford Research Peptides`,
      description: p.summary,
      jsonLd: [
        aboutPageLd(path, `${p.title} — Research Programme`, p.summary),
        breadcrumbLd([
          { name: "Home", path: "/" },
          { name: "Research Hub", path: "/research-hub" },
          { name: "Programmes", path: "/research-hub/programmes" },
          { name: p.title, path },
        ]),
      ],
    });
  },
  loader: ({ params }) => {
    if (!programmeDefinitions.find((p) => p.slug === params.slug)) throw notFound();
    return null;
  },
  notFoundComponent: () => (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main className="container-x py-16">
        <h1 className="font-display text-3xl">Programme not found</h1>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  ),
  component: ProgrammePage,
});

function Section({ title, children, empty }: { title: string; children: React.ReactNode; empty?: boolean }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-xl">{title}</h2>
      {empty ? <p className="text-sm text-navy-deep/60">No entries yet.</p> : children}
    </section>
  );
}

function LinkList({ items }: { items: { path: string; label: string; sub?: string }[] }) {
  return (
    <ul className="divide-y divide-navy-deep/10 rounded-sm border border-navy-deep/15 bg-white">
      {items.map((i) => (
        <li key={i.path} className="px-4 py-3">
          <a href={i.path} className="text-sm font-medium text-navy-deep hover:text-gold">
            {i.label}
          </a>
          {i.sub && <div className="text-[11px] text-navy-deep/55">{i.sub}</div>}
        </li>
      ))}
    </ul>
  );
}

function pathwayLabel(t: PathwayType): string {
  return t.replace(/-/g, " ");
}

function ProgrammePage() {
  const { slug } = Route.useParams();
  const view = buildProgrammeView(slug);
  if (!view) return null;
  const { programme, compounds, mechanisms, studies, comparisons, guides, glossary, methodology, areas } = view;

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          { label: "Programmes", to: "/research-hub/programmes" },
          { label: programme.title },
        ]}
      />
      <main id="main-content" className="container-x py-10 max-w-5xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gold">
          {programme.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl md:text-4xl">{programme.title}</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-navy-deep/85">
          {programme.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 text-xs">
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {compounds.length} compounds
          </span>
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {mechanisms.length} mechanisms
          </span>
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {studies.length} studies
          </span>
          <span className="rounded-sm border border-navy-deep/15 bg-white px-3 py-1">
            {glossary.length} glossary terms
          </span>
        </div>

        <Section title="Included compounds" empty={compounds.length === 0}>
          <LinkList
            items={compounds.map((c) => ({
              path: `/compounds/${c.slug}`,
              label: c.name,
              sub: c.aliases?.join(" · "),
            }))}
          />
        </Section>

        <Section title="Core mechanisms" empty={mechanisms.length === 0}>
          <LinkList
            items={mechanisms.map((m) => ({
              path: `/research-hub/mechanisms/${m.id}`,
              label: m.label,
              sub: m.description,
            }))}
          />
        </Section>

        <Section title="Landmark literature" empty={studies.length === 0}>
          <LinkList
            items={studies.map((s) => ({
              path: `/research-hub/literature/${s.slug}`,
              label: s.shortName ?? s.title,
              sub: [s.year, s.journal].filter(Boolean).join(" · "),
            }))}
          />
        </Section>

        <Section title="Comparisons" empty={comparisons.length === 0}>
          <LinkList
            items={comparisons.map((c) => ({
              path: `/research-hub/comparisons/${c.slug}`,
              label: c.title,
            }))}
          />
        </Section>

        <Section title="Research guides" empty={guides.length === 0}>
          <LinkList
            items={guides
              .filter((g) => g.populated)
              .map((g) => ({
                path: `/research-hub/guides/${g.slug}`,
                label: g.title,
                sub: g.summary,
              }))}
          />
        </Section>

        <Section title="Methodology" empty={methodology.length === 0}>
          <LinkList
            items={methodology.map((m) => ({
              path: m.path ?? `/research-hub/methodology/${m.slug}`,
              label: m.title,
              sub: m.description,
            }))}
          />
        </Section>

        <Section title="Glossary" empty={glossary.length === 0}>
          <ul className="flex flex-wrap gap-2">
            {glossary.map((t) => (
              <li key={t.slug}>
                <Link
                  to="/research-hub/glossary/$slug"
                  params={{ slug: t.slug }}
                  className="rounded-sm border border-navy-deep/15 bg-white px-2.5 py-1 text-xs text-navy-deep hover:border-gold"
                >
                  {t.term}
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Related research areas" empty={areas.length === 0}>
          <ul className="flex flex-wrap gap-2 text-xs">
            {areas.map((a) => (
              <li key={a.id} className="rounded-sm border border-navy-deep/15 bg-white px-2.5 py-1">
                {a.label}
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Reading pathways">
          <ul className="flex flex-wrap gap-2 text-xs">
            {(programme.pathways ?? []).map((p) => (
              <li key={p}>
                <Link
                  to="/explore/pathways/$type"
                  params={{ type: p }}
                  className="rounded-sm border border-navy-deep/15 bg-white px-2.5 py-1 capitalize hover:border-gold"
                >
                  {pathwayLabel(p)}
                </Link>
              </li>
            ))}
            {!programme.pathways?.length && (
              <li className="text-sm text-navy-deep/60">No pathways attached.</li>
            )}
          </ul>
        </Section>

        <p className="mt-10 text-xs text-navy-deep/50">
          Programme metadata governed by the{" "}
          {getEntity({ type: "category", slug: "research-hub" }) ? "Research Hub" : "Editorial"} framework.
        </p>
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
