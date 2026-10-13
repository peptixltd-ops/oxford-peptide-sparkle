import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { seo } from "@/lib/seo";
import { useEffect } from "react";
import { confirmNiftiPayOrder } from "@/lib/niftipay.functions";

export const Route = createFileRoute("/checkout/success")({
  head: () =>
    seo({
      path: "/checkout/success",
      title: "Payment Received — Oxford Research Peptides",
      description: "Thank you, your card payment to Oxford Research Peptides was received.",
      noindex: true,
    }),
  component: Success,
});

function Success() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("reference");
    if (ref && /^ORP-\d+$/.test(ref)) void confirmNiftiPayOrder({ data: { reference: ref } }).catch(() => {});
  }, []);
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main id="main-content" className="py-20">
        <div className="container-x max-w-xl text-center bg-white border border-border p-10">
          <h1 className="font-display text-4xl font-medium mb-4">Thank you</h1>
          <p className="text-muted-foreground mb-8">
            Thank you, your payment was received. You'll get an email confirmation shortly.
          </p>
          <Link to="/" className="inline-block px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
            BACK TO HOME
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
