import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/wholesale")({
  head: () =>
    seo({
      path: "/wholesale",
      title: "Wholesale & Bulk Supply — Oxford Research Peptides",
      description:
        "Wholesale and bulk research peptide supply for laboratories, universities and research institutions.",
    }),
  component: WholesalePage,
});

function WholesalePage() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("sent") === "1") {
      setSent(true);
    }
  }, []);

  return (
    <div className="min-h-screen bg-bone text-navy-deep">
      <SiteHeader />
      <Breadcrumbs items={[{ label: "Wholesale" }]} />
      <main id="main-content">
      <section className="bg-navy-deep text-bone py-14">
        <div className="container-x">
          <div className="text-gold text-[11px] font-bold tracking-[0.3em] mb-3">WHOLESALE</div>
          <h1 className="font-display text-5xl font-medium">Wholesale & Bulk Supply</h1>
          <p className="text-bone/70 mt-3 max-w-2xl">Competitive pricing and priority support for laboratories, universities and research institutions. Apply below and we'll be in touch within one working day.</p>
        </div>
      </section>
      <section className="py-14">
        <div className="container-x max-w-2xl">
          {sent ? (
            <div className="bg-white border border-border p-8 text-center">
              <h2 className="font-display text-2xl font-semibold mb-2">Application received</h2>
              <p className="text-muted-foreground">Thanks — our wholesale team will be in touch shortly.</p>
            </div>
          ) : (
            <form
              action="https://formsubmit.co/info@oxfordresearchpeptides.com"
              method="POST"
              className="bg-white border border-border p-8 space-y-4"
            >
              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New Wholesale Application — Oxford Research Peptides" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_next" value={typeof window !== "undefined" ? `${window.location.origin}/wholesale?sent=1` : "/wholesale?sent=1"} />
              <input type="text" name="_honey" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              {[
                { name: "name", label: "Full name", type: "text" },
                { name: "org", label: "Organisation / institution", type: "text" },
                { name: "email", label: "Work email", type: "email" },
                { name: "phone", label: "Phone (optional)", type: "tel" },
              ].map(f => (
                <div key={f.name}>
                  <label className="block text-[11px] font-bold tracking-widest mb-1.5">{f.label.toUpperCase()}</label>
                  <input name={f.name} required={f.name !== "phone"} type={f.type} className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-gold" />
                </div>
              ))}
              <div>
                <label className="block text-[11px] font-bold tracking-widest mb-1.5">REQUIREMENTS</label>
                <textarea name="requirements" rows={4} className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-gold" placeholder="Estimated monthly volume, products of interest..." />
              </div>
              <button type="submit" className="w-full px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
                SUBMIT APPLICATION
              </button>
            </form>
          )}
        </div>
      </section>
      </main>
      <SiteFooter />
    </div>
  );
}
