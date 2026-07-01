import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Layout for /compounds. Child routes render inside <Outlet />. Chrome
 * (header, footer, breadcrumbs) lives in the leaf components.
 */
export const Route = createFileRoute("/compounds")({
  component: () => <Outlet />,
});
