import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout for /research-hub. Child routes (index, guides, methodology,
 * mechanisms, comparisons, glossary, literature, faqs, compounds) render
 * inside <Outlet />. All chrome (header, breadcrumbs, footer, sidebar) lives
 * in the individual leaf components so each leaf keeps full SEO control.
 */
export const Route = createFileRoute("/research-hub")({
  component: () => <Outlet />,
});
