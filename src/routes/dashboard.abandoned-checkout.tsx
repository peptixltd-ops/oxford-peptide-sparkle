import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EMAILS, OFFER_PREVIEW, type BuildOpts, type PreviewProduct } from "@/lib/email-flow/templates";
import logo from "@/assets/oxford-logo.jpg.asset.json";
import vialRetaAsset from "@/assets/vials/orp-retatrutide.webp.asset.json";
const vialReta = vialRetaAsset.url;
import vialBpcAsset from "@/assets/vials/orp-bpc-157.webp.asset.json";
const vialBpc = vialBpcAsset.url;
import vialWaterAsset from "@/assets/vials/orp-bac-water.webp.asset.json";
const vialWater = vialWaterAsset.url;

export const Route = createFileRoute("/dashboard/abandoned-checkout")({
  component: FlowDashboard,
  head: () => ({
    meta: [
      { title: "Abandoned Checkout Flow Preview | Oxford Research Peptides" },
      {
        name: "description",
        content:
          "Internal preview dashboard for the Oxford Research Peptides abandoned checkout email sequence — desktop and mobile previews, subject lines and approval status.",
      },
      { property: "og:title", content: "Abandoned Checkout Flow Preview" },
      {
        property: "og:description",
        content:
          "Five-stage abandoned checkout email sequence previews for Oxford Research Peptides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Status = "DRAFT" | "CHANGES REQUESTED" | "APPROVED";

const SAMPLE: PreviewProduct[] = [
  { title: "Retatrutide", variant: "10mg vial", qty: 1, price: "£45.00", img: vialReta },
  { title: "BPC-157", variant: "10mg vial", qty: 2, price: "£36.00", img: vialBpc },
  { title: "Bacteriostatic Water", variant: "3mL", qty: 1, price: "£6.00", img: vialWater },
];

function FlowDashboard() {
  const [statuses, setStatuses] = useState<Record<number, Status>>({
    1: "DRAFT",
    2: "DRAFT",
    3: "DRAFT",
    4: "DRAFT",
    5: "DRAFT",
  });
  const [device, setDevice] = useState<Record<number, "desktop" | "mobile">>({});

  const opts: BuildOpts = useMemo(
    () => ({
      logoUrl: logo.url,
      products: SAMPLE,
      subtotal: "£123.00",
      // Email 5 preview: sample of a real minted per-recipient code.
      offerCode: OFFER_PREVIEW.code,
      offerExpiryLabel: OFFER_PREVIEW.expiryLabel,
    }),
    [],
  );


  return (
    <div className="min-h-screen bg-bone">
      <header className="bg-navy-deep text-bone">
        <div className="container-x py-10">
          <div className="text-[11px] font-bold tracking-[0.28em] text-gold">
            OXFORD RESEARCH PEPTIDES
          </div>
          <h1 className="font-display text-3xl md:text-4xl mt-2">ABANDONED CHECKOUT FLOW</h1>
          <p className="text-bone/60 text-xs mt-3 max-w-2xl">
            Phase 1 — design, preview and iteration. Nothing is live: no Shopify automation,
            template or discount code has been created or activated.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-[11px] font-bold tracking-widest">
            {EMAILS.map((e, i) => (
              <span key={e.id} className="flex items-center gap-2">
                <span className="border border-gold/50 text-gold px-3 py-1.5">{e.timing}</span>
                {i < EMAILS.length - 1 && <span className="text-bone/40">→</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="container-x py-12 space-y-16">
        {EMAILS.map((e) => {
          const html = e.build(opts);
          const mode = device[e.id] ?? "desktop";
          const status = statuses[e.id];
          return (
            <section key={e.id} className="bg-white border border-border">
              <div className="border-b border-border p-6 flex flex-wrap gap-4 items-start justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <span className="bg-navy-deep text-bone text-[10px] font-bold tracking-[0.2em] px-2.5 py-1.5">
                      EMAIL {e.id}
                    </span>
                    <span className="bg-gold/20 text-navy-deep text-[10px] font-bold tracking-[0.2em] px-2.5 py-1.5">
                      {e.timing}
                    </span>
                    <span
                      className={`text-[10px] font-bold tracking-[0.2em] px-2.5 py-1.5 border ${
                        status === "APPROVED"
                          ? "border-emerald-600 text-emerald-700"
                          : status === "CHANGES REQUESTED"
                            ? "border-amber-600 text-amber-700"
                            : "border-border text-muted-foreground"
                      }`}
                    >
                      {status}
                    </span>
                  </div>
                  <h2 className="font-display text-xl mt-4">
                    <span className="text-muted-foreground text-xs font-sans tracking-widest block mb-1">
                      SUBJECT
                    </span>
                    {e.subject}
                  </h2>
                  <p className="text-sm text-muted-foreground mt-3">
                    <span className="text-xs tracking-widest block mb-1">PREVIEW TEXT</span>
                    {e.preheader}
                  </p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <div className="flex">
                    {(["desktop", "mobile"] as const).map((d) => (
                      <button
                        key={d}
                        onClick={() => setDevice((s) => ({ ...s, [e.id]: d }))}
                        className={`px-4 py-2 text-[10px] font-bold tracking-widest border ${
                          mode === d
                            ? "bg-navy-deep text-bone border-navy-deep"
                            : "border-border text-navy-deep"
                        }`}
                      >
                        {d.toUpperCase()}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setStatuses((s) => ({ ...s, [e.id]: "CHANGES REQUESTED" }))
                      }
                      className="px-3 py-2 text-[10px] font-bold tracking-widest border border-amber-600 text-amber-700"
                    >
                      REQUEST EDIT
                    </button>
                    <button
                      onClick={() => setStatuses((s) => ({ ...s, [e.id]: "APPROVED" }))}
                      className="px-3 py-2 text-[10px] font-bold tracking-widest bg-navy-deep text-bone"
                    >
                      APPROVE
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 p-6 md:grid-cols-[1fr_320px]">
                <div className="min-w-0">
                  <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-3">
                    {mode === "desktop" ? "DESKTOP PREVIEW · 600PX" : "MOBILE PREVIEW · 390PX"}
                  </div>
                  <div className="bg-[#f7f5f0] border border-border overflow-hidden flex justify-center">
                    <iframe
                      title={`Email ${e.id} ${mode} preview`}
                      srcDoc={html}
                      style={{ width: mode === "desktop" ? "100%" : 390, height: 1400 }}
                      className="border-0 bg-white"
                    />
                  </div>
                </div>
                <aside className="space-y-6 text-sm">
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-2">
                      CTA
                    </div>
                    <div className="bg-gold text-navy-deep text-[10px] font-bold tracking-[0.18em] px-4 py-3 text-center">
                      {e.ctaLabel}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Links to the customer&rsquo;s own abandoned checkout URL (never hardcoded).
                    </p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-2">
                      PSYCHOLOGICAL OBJECTIVE
                    </div>
                    <p className="text-xs leading-relaxed">{e.objective}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-[0.2em] text-muted-foreground mb-2">
                      SHOPIFY DYNAMIC BLOCKS
                    </div>
                    <ul className="text-xs space-y-1.5 font-mono text-navy-deep">
                      {e.dynamicBlocks.map((b) => (
                        <li key={b} className="break-words">
                          · {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>
            </section>
          );
        })}

        <section className="border border-border bg-white p-6">
          <h2 className="font-display text-lg">Not yet activated</h2>
          <ul className="text-sm text-muted-foreground mt-3 space-y-1.5 list-disc pl-5">
            <li>No Shopify email automation, flow or delay has been created.</li>
            <li>No discount or store-credit code is used anywhere in this flow.</li>
            <li>Reply &ldquo;APPROVE AND IMPLEMENT&rdquo; to begin Phase 2.</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
