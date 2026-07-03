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
      </main>
      <SiteFooter />
    </div>
  );
}
