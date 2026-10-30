import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Payment not completed", robots: { index: false, follow: false } };

export default function FailedPage() {
  return (
    <main id="main-content" className="container-x" style={{ padding: "3rem 0" }}>
      <h1>Payment not completed</h1>
      <p>The sandbox provider declined the card. No order was marked paid. <Link href="/checkout">Return to checkout</Link>.</p>
    </main>
  );
}
