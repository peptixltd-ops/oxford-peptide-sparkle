import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/checkout/failed")({
  head: () =>
    seo({
      path: "/checkout/failed",
      title: "Payment Not Completed — Oxford Research Peptides",
      description: "Your card payment to Oxford Research Peptides didn't go through. Return to your cart to try again.",
      noindex: true,
    }),
  component: Failed,
});

function Failed() {
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main id="main-content" className="py-20">
        <div className="container-x max-w-xl text-center bg-white border border-border p-10">
          <h1 className="font-display text-4xl font-medium mb-4">Payment didn't go through</h1>
          <p className="text-muted-foreground mb-8">No payment was taken. You can return to your cart and try again.</p>
          <Link to="/cart" className="inline-block px-7 py-3.5 bg-gold text-navy-deep text-xs font-bold tracking-widest hover:bg-gold-soft transition-colors">
            BACK TO CART
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
