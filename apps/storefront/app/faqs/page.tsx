import type { Metadata } from "next";
import { pages } from "@/lib/content";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = { title: pages.faqs.title, description: pages.faqs.description, alternates: { canonical: "/faqs" } };
export default function Page() { return <StaticPage page={pages.faqs} />; }
