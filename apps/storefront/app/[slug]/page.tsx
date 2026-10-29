import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages } from "@/lib/content";
import { StaticPage } from "@/components/static-page";

export function generateStaticParams() {
  return Object.keys(pages).filter((slug) => !["about", "contact", "faqs"].includes(slug)).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  return { title: page.title, description: page.description, alternates: { canonical: `/${slug}` } };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page || ["about", "contact", "faqs"].includes(slug)) notFound();
  return <StaticPage page={page} />;
}
