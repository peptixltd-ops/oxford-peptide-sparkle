import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ResearchUseNotice } from "@/components/research-use-notice";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { GuideLayout } from "@/components/knowledge/guide-layout";
import { buildGuideLayoutProps, type GuideScaffold } from "@/lib/scaffolds";

/**
 * Renders a scaffold-driven GuideLayout page. Route components import this
 * to stay content-free — all editorial data lives in `src/lib/scaffolds.tsx`.
 */
export function ScaffoldGuidePage({
  scaffold,
  extraBreadcrumbs,
  children,
}: {
  scaffold: GuideScaffold;
  extraBreadcrumbs?: Array<{ label: string; to?: string }>;
  children?: ReactNode;
}) {
  const props = buildGuideLayoutProps(scaffold);
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs
        items={[
          { label: "Research Hub", to: "/research-hub" },
          { label: scaffold.categoryLabel, to: scaffold.categoryPath },
          ...(extraBreadcrumbs ?? []),
          { label: scaffold.title },
        ]}
      />
      <main id="main-content">
        <GuideLayout {...props} />
        {children}
      </main>
      <ResearchUseNotice />
      <SiteFooter />
    </div>
  );
}
