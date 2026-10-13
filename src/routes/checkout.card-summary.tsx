import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { NIFTIPAY_REVIEW_KEY } from "@/lib/niftipay-client";
import type { NiftiPaySummary } from "@/lib/niftipay-summary";

export const Route = createFileRoute("/checkout/card-summary")({
  head: () => ({ meta: [
    { title: "Card Payment Order Summary — Oxford Research Peptides" },
    { name: "description", content: "Review your research products, discounts, shipping and exact total before secure card payment." },
    { property: "og:title", content: "Card Payment Order Summary — Oxford Research Peptides" },
    { property: "og:description", content: "Review your order before continuing to secure card payment." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: CardSummary,
});

type PreparedPayment = { payUrl: string; amount: number; summary: NiftiPaySummary };
const preparing = new Map<string, Promise<PreparedPayment>>();
const fmt = (value: number) => `£${value.toFixed(2)}`;

function preparePayment(raw: string): Promise<PreparedPayment> {
  const existing = preparing.get(raw);
  if (existing) return existing;
  const request = (async () => {
    const saved = JSON.parse(raw);
    if (!saved.createdAt || Date.now() - saved.createdAt > 30 * 60 * 1000) {
      throw new Error("This order summary has expired. Please return and start card checkout again.");
    }
    const response = await fetch("/api/public/niftipay-checkout", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines: saved.lines, discountCodes: saved.discountCodes }),
    });
    const data = await response.json();
    if (!response.ok || !data.payUrl || !data.summary || data.amount !== data.summary.total) {
      throw new Error(data.error ?? "Could not verify your order total. Please return and try again.");
    }
    const url = new URL(data.payUrl);
    if (url.protocol !== "https:") throw new Error("Secure payment link unavailable.");
    return data as PreparedPayment;
  })();
  preparing.set(raw, request);
  request.catch(() => preparing.delete(raw));
  return request;
}

function CardSummary() {
  const [payment, setPayment] = useState<PreparedPayment | null>(null);
  const [error, setError] = useState("");
  const [backPath, setBackPath] = useState("/cart");
  const [openedInTab, setOpenedInTab] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let active = true;
    try {
      const raw = sessionStorage.getItem(NIFTIPAY_REVIEW_KEY);
      if (!raw) throw new Error("No card order to review. Please return and choose card payment.");
      const saved = JSON.parse(raw);
      if (typeof saved.backPath === "string" && saved.backPath.startsWith("/") && !saved.backPath.startsWith("//")) {
        setBackPath(saved.backPath);
      }
      setOpenedInTab(saved.openedInTab === true);
      void preparePayment(raw).then(data => { if (active) setPayment(data); })
        .catch(err => { if (active) setError(err instanceof Error ? err.message : "Could not prepare payment."); });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not prepare payment.");
    }
    return () => { active = false; };
  }, []);

  const back = () => {
    if (openedInTab && window.opener && !window.opener.closed) {
      window.opener.focus();
      window.close();
      return;
    }
    window.location.assign(backPath);
  };
  const summary = payment?.summary;
  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <main id="main-content" className="container-x max-w-3xl py-8 sm:py-12">
        <Button variant="ghost" onClick={back} className="mb-5 px-0 text-navy-deep hover:bg-transparent hover:text-gold">
          <ArrowLeft aria-hidden="true" /> Back
        </Button>
        <h1 className="font-display text-3xl sm:text-4xl font-medium mb-7">Your order summary</h1>
        {!summary && !error && <div role="status" className="flex items-center gap-3 py-12 text-muted-foreground">
          <Loader2 className="size-5 animate-spin" aria-hidden="true" /> Preparing your order…
        </div>}
        {error && <div role="alert" className="border border-border bg-background p-6">
          <p className="mb-4">{error}</p><Button variant="outline" onClick={back}>Return to your order</Button>
        </div>}
        {summary && <>
          <div className="divide-y divide-border border-y border-border">
            {summary.items.map((item, index) => <div key={index} className="grid grid-cols-[64px_minmax(0,1fr)_auto] gap-3 sm:gap-5 items-center py-5">
              <img src={item.image} alt={item.name} className="size-16 object-contain bg-background" />
              <div className="min-w-0">
                <h2 className="font-display text-base sm:text-lg font-semibold break-words">{item.name}</h2>
                <p className="text-sm text-muted-foreground">{item.variant} · Qty {item.quantity}</p>
                <p className="text-xs text-muted-foreground mt-1">{fmt(item.unitPrice)} each</p>
              </div>
              <span className="text-sm sm:text-base font-semibold whitespace-nowrap">{fmt(item.price)}</span>
            </div>)}
          </div>
          <dl className="space-y-3 py-6 text-sm">
            <div className="flex justify-between gap-4"><dt>Subtotal</dt><dd>{fmt(summary.subtotal)}</dd></div>
            {summary.discounts.map(discount => <div key={discount.label} className="flex justify-between gap-4 text-gold">
              <dt>{discount.label}</dt><dd className="whitespace-nowrap">−{fmt(discount.amount)}</dd>
            </div>)}
            <div className="flex justify-between gap-4"><dt>Shipping</dt><dd>{summary.shipping === 0 ? "Free" : fmt(summary.shipping)}</dd></div>
            <div className="flex justify-between gap-4 border-t border-border pt-5 font-display text-2xl font-medium"><dt>Total</dt><dd>{fmt(summary.total)}</dd></div>
          </dl>
          <Button disabled={leaving} onClick={() => {
            if (!payment) return;
            setLeaving(true);
            window.location.assign(payment.payUrl);
          }} className="w-full h-auto min-h-12 rounded-none py-4 px-3 bg-navy-deep text-bone hover:bg-navy whitespace-normal text-xs font-bold tracking-wide">
            {leaving ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <LockKeyhole className="size-4" aria-hidden="true" />}
            Continue to secure payment
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-5">Research Use Only. Not for Human or Animal Consumption.</p>
        </>}
        <Link to="/shop" className="sr-only">Shop research peptides</Link>
      </main>
      <SiteFooter />
    </div>
  );
}