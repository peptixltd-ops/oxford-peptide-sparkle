import type { Metadata } from "next";
import { pages } from "@/lib/content";
import { StaticPage } from "@/components/static-page";

export const metadata: Metadata = { title: pages.about.title, description: pages.about.description, alternates: { canonical: "/about" } };
export default function Page() { return <StaticPage page={pages.about} />; }
