import type { Metadata } from "next";

export const metadata: Metadata = { title: "Order received", robots: { index: false, follow: false } };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  return (
    <main id="main-content" className="container-x" style={{ padding: "3rem 0" }}>
      <h1>Order received</h1>
      <p>Reference {order || "pending"}. This page only displays the order created by the server after the sandbox payment provider authorised it. It does not mark anything as paid.</p>
      <p>A test-mode receipt was written to the local outbox and was not emailed.</p>
    </main>
  );
}
