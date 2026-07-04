import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  computeCompleteness,
  listClusters,
  runGovernance,
  type ClusterCompleteness,
  type GovernanceIssue,
  type TopicCluster,
} from "@/lib/topic-clusters";
import {
  runExtendedGovernance,
  runInternalLinkAudit,
  runStudyCitationAudit,
} from "@/lib/study-graph";
import { runCitationAudit } from "@/lib/editorial-graph";

export const Route = createFileRoute("/dashboard/editorial")({
  head: () =>
    seo({
      path: "/dashboard/editorial",
      title: "Editorial dashboard — Oxford Research Peptides",
      description:
        "Internal dashboard: topic cluster completeness, missing pages, missing metadata, broken entity links.",
      noindex: true,
    }),
  component: EditorialDashboardPage,
});

function ScoreBadge({ score }: { score: number }) {
  const tone =
    score >= 85
      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
      : score >= 60
        ? "bg-amber-500/20 text-amber-800 dark:text-amber-200"
        : "bg-destructive/15 text-destructive";
  return (
    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${tone}`}>
      {score}/100
    </span>
  );
}

function ClusterRow({
  cluster,
  completeness,
}: {
  cluster: TopicCluster;
  completeness: ClusterCompleteness;
}) {
  const missingLabels = completeness.missingSlots.map((s) => s.label);
  return (
    <tr className="border-t border-border align-top">
      <td className="px-3 py-3">
        <a
          href={cluster.path}
          className="font-display text-sm text-foreground hover:text-[color:var(--gold)]"
        >
          {cluster.title}
        </a>
        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
          {cluster.status}
        </div>
      </td>
      <td className="px-3 py-3">
        <ScoreBadge score={completeness.score} />
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {completeness.populatedPages}/{completeness.totalPages}
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {completeness.filledRequired}/{completeness.requiredSlots}
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {Math.round(completeness.internalLinkCompleteness * 100)}%
      </td>
      <td className="px-3 py-3 text-sm text-muted-foreground">
        {Math.round(completeness.entityCoverage * 100)}%
      </td>
      <td className="px-3 py-3 text-xs text-muted-foreground">
        {missingLabels.length ? missingLabels.join(", ") : "—"}
      </td>
    </tr>
  );
}

function IssueRow({ issue }: { issue: GovernanceIssue }) {
  const tone =
    issue.severity === "error"
      ? "text-destructive"
      : issue.severity === "warning"
        ? "text-amber-700 dark:text-amber-300"
        : "text-muted-foreground";
  return (
    <tr className="border-t border-border">
      <td className={`px-3 py-2 text-xs font-semibold uppercase ${tone}`}>
        {issue.severity}
      </td>
      <td className="px-3 py-2 text-xs text-muted-foreground">{issue.code}</td>
      <td className="px-3 py-2 text-sm text-foreground">{issue.message}</td>
    </tr>
  );
}

function EditorialDashboardPage() {
  const clusters = listClusters();
  const rows = clusters.map((c) => ({
    cluster: c,
    completeness: computeCompleteness(c),
  }));
  const issues = runGovernance();
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warning").length;

  return (
    <div className="min-h-screen bg-bone text-foreground">
      <SiteHeader />
      <main id="main-content" className="container-x py-10">
        <header className="mb-8 border-b border-border pb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[color:var(--gold)]">
            Internal · noindex
          </p>
          <h1 className="mt-2 font-display text-3xl">Editorial dashboard</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Cluster completeness, missing pages / metadata / glossary /
            comparisons, and broken entity links. Consumed by editors before
            promoting any cluster from scaffold to populated.
          </p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs">
            <span className="rounded-md border border-border bg-card px-3 py-1">
              {clusters.length} clusters
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1">
              {rows.filter((r) => r.completeness.score >= 85).length} healthy
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1 text-amber-700 dark:text-amber-300">
              {warnCount} warnings
            </span>
            <span className="rounded-md border border-border bg-card px-3 py-1 text-destructive">
              {errorCount} errors
            </span>
          </div>
        </header>

        <section aria-label="Cluster completeness" className="mb-10">
          <h2 className="mb-3 font-display text-xl">Cluster completeness</h2>
          <div className="overflow-x-auto rounded-lg border border-border bg-card">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Cluster
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Score
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Populated
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Required slots
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Internal links
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Entity coverage
                  </th>
                  <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Missing
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <ClusterRow
                    key={r.cluster.id}
                    cluster={r.cluster}
                    completeness={r.completeness}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section aria-label="Governance issues">
          <h2 className="mb-3 font-display text-xl">Governance issues</h2>
          {issues.length === 0 ? (
            <div className="rounded-lg border border-border bg-card p-6 text-sm text-muted-foreground">
              No governance issues detected.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-card">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/40">
                  <tr>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Severity
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Code
                    </th>
                    <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Detail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((i, idx) => (
                    <IssueRow key={idx} issue={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <ExtendedGovernanceSection />
        <StudyCitationSection />
        <InternalLinkSection />
        <CitationAuditSection />
      </main>
      <SiteFooter />
    </div>
  );
}

function SectionShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="mt-10">
      <h2 className="mb-1 font-display text-xl">{title}</h2>
      <p className="mb-3 text-xs text-muted-foreground">{description}</p>
      {children}
    </section>
  );
}

function toneFor(sev: "error" | "warning" | "info"): string {
  return sev === "error"
    ? "text-destructive"
    : sev === "warning"
      ? "text-amber-700 dark:text-amber-300"
      : "text-muted-foreground";
}

function ExtendedGovernanceSection() {
  const rows = runExtendedGovernance();
  return (
    <SectionShell
      title="Extended governance"
      description="Reciprocal links, weak relationships, glossary coverage per compound, and compounds with no linked studies."
    >
      {rows.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          No extended governance issues detected.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</th>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Code</th>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Entity</th>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i, idx) => (
                <tr key={idx} className="border-t border-border">
                  <td className={`px-3 py-2 text-xs font-semibold uppercase ${toneFor(i.severity)}`}>{i.severity}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{i.code}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{i.entity.type}:{i.entity.slug}</td>
                  <td className="px-3 py-2 text-sm text-foreground">{i.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionShell>
  );
}

function StudyCitationSection() {
  const rows = runStudyCitationAudit();
  return (
    <SectionShell
      title="Study citation audit"
      description="Every populated study checked for DOI, PMID, journal, compound + mechanism relationships and guide linkage."
    >
      {rows.length === 0 ? (
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
          All studies pass citation checks.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-card">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Severity</th>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Study</th>
                <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detail</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((i, idx) => (
                <tr key={idx} className="border-t border-border">
                  <td className={`px-3 py-2 text-xs font-semibold uppercase ${toneFor(i.severity)}`}>{i.severity}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{i.studySlug}</td>
                  <td className="px-3 py-2 text-sm text-foreground">{i.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SectionShell>
  );
}

function InternalLinkSection() {
  const rows = runInternalLinkAudit();
  const failing = rows.filter((r) => !r.passes);
  return (
    <SectionShell
      title="Internal-link audit"
      description="Targets: ≥5 outbound, ≥3 inbound, ≥3 glossary, ≥2 study references per populated educational page."
    >
      <div className="mb-2 flex flex-wrap gap-3 text-xs">
        <span className="rounded-md border border-border bg-card px-3 py-1">
          {rows.length} audited
        </span>
        <span className="rounded-md border border-border bg-card px-3 py-1 text-amber-700 dark:text-amber-300">
          {failing.length} below target
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Page</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Out</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">In</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Gloss</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Study</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Missing</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.path} className="border-t border-border">
                <td className="px-3 py-2 text-xs">
                  <a href={r.path} className="text-foreground hover:text-[color:var(--gold)]">{r.title}</a>
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{r.entityType}</td>
                <td className="px-3 py-2 text-xs">{r.outboundLinks}</td>
                <td className="px-3 py-2 text-xs">{r.inboundLinks}</td>
                <td className="px-3 py-2 text-xs">{r.glossaryLinks}</td>
                <td className="px-3 py-2 text-xs">{r.studyLinks}</td>
                <td className={`px-3 py-2 text-xs ${r.passes ? "text-muted-foreground" : "text-amber-700 dark:text-amber-300"}`}>
                  {r.passes ? "OK" : r.missing.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

function CitationAuditSection() {
  const rows = runCitationAudit();
  const failing = rows.filter((r) => !r.passes);
  return (
    <SectionShell
      title="Citation quality"
      description="Every published study should expose DOI, journal, publication year and evidence tier."
    >
      <div className="mb-2 flex flex-wrap gap-3 text-xs">
        <span className="rounded-md border border-border bg-card px-3 py-1">
          {rows.length} studies
        </span>
        <span className="rounded-md border border-border bg-card px-3 py-1 text-amber-700 dark:text-amber-300">
          {failing.length} incomplete
        </span>
      </div>
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/40">
            <tr>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Study</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">DOI</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">PMID</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Journal</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Year</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Tier</th>
              <th className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Passes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slug} className="border-t border-border">
                <td className="px-3 py-2 text-xs">
                  <a href={`/research-hub/literature/${r.slug}`} className="text-foreground hover:text-[color:var(--gold)]">{r.title}</a>
                </td>
                <td className="px-3 py-2 text-xs">{r.hasDoi ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-xs">{r.hasPmid ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-xs">{r.hasJournal ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-xs">{r.hasYear ? "✓" : "—"}</td>
                <td className="px-3 py-2 text-xs">{r.hasEvidenceTier ? "✓" : "—"}</td>
                <td className={`px-3 py-2 text-xs ${r.passes ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>
                  {r.passes ? "PASS" : "FAIL"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionShell>
  );
}

