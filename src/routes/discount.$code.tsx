import { createFileRoute, redirect } from "@tanstack/react-router";

// /discount/CODE → /shop?discount=CODE; the root shell saves the code and shows the toast.
export const Route = createFileRoute("/discount/$code")({
  beforeLoad: ({ params }) => {
    throw redirect({ href: `/shop?discount=${encodeURIComponent(params.code)}` });
  },
});
