import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function LegalPage({
  eyebrow,
  title,
  updated,
  children,
  breadcrumbLabel,
}: {
  eyebrow?: string;
  title: string;
  updated?: string;
  children: ReactNode;
  /** Label used in the breadcrumb trail; defaults to `title`. */
  breadcrumbLabel?: string;
}) {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: breadcrumbLabel ?? title }]} />
      <main id="main-content">
        <section className="bg-navy-deep text-bone py-14">
          <div className="container-x">
            {eyebrow && (
              <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">{eyebrow}</div>
            )}
            <h1 className="font-display text-4xl md:text-5xl font-medium">{title}</h1>
            {updated && <p className="text-bone/60 text-xs mt-4">Last updated: {updated}</p>}
          </div>
        </section>
        <section className="py-12">
          <div className="container-x max-w-3xl">
            <article className="legal-prose space-y-6 text-[15px] leading-relaxed text-navy-deep/85">
              {children}
            </article>
            <div className="mt-12 p-5 border border-navy-deep/15 bg-white text-xs text-navy-deep/70">
              <strong className="block text-navy-deep mb-1">Oxford Research Syndicate Ltd</strong>
              Company Registration Number 17207898 · Registered Office: 131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom · info@oxfordresearchpeptides.com
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return <h2 className="font-display text-2xl font-medium text-navy-deep mt-10 mb-3">{children}</h2>;
}
export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}
export function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2">{children}</ul>;
}
