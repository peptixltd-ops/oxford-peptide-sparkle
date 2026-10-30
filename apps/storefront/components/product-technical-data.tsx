"use client";
import { Fragment } from "react";
import type { Product, Variant } from "@/lib/products";

/**
 * Editorial + technical data block shown beneath the buy box on every
 * product page. Content is derived from the product record so each item
 * gets a consistent, catalogue-style presentation.
 */

const purityLabel = (purity: string) =>
  purity.replace(/^>/, "≥").replace(/\s*Purity\s*$/i, "").trim();

const isLiquid = (p: Product) => p.slug === "bacteriostatic-water";

export function productTitle(p: Product) {
  if (isLiquid(p)) return `${p.name} — Laboratory Diluent (${p.purity})`;
  return `${p.name} — Research Grade (Lyophilised, HPLC ${purityLabel(p.purity)})`;
}

type Row = { label: string; value: string };
type Group = { heading: string; rows: Row[] };

function groups(p: Product, variant: Variant): Group[] {
  const liquid = isLiquid(p);
  return [
    {
      heading: "Identification",
      rows: [
        { label: "Product Name", value: productTitle(p) },
        { label: "Catalogue Number", value: `${p.slug}-${variant.id}`.toLowerCase() },
        { label: "Available Sizes", value: p.variants.map((v) => v.label).join(", ") },
      ],
    },
    {
      heading: "Physical & Chemical Properties",
      rows: [
        {
          label: "Appearance",
          value: liquid
            ? "Clear, colourless sterile solution"
            : "White to off-white lyophilised powder",
        },
        {
          label: "Purity",
          value: liquid
            ? "USP-grade water with 0.9% benzyl alcohol"
            : `${purityLabel(p.purity)} by HPLC — verified by third-party analysis`,
        },
        { label: "Format", value: liquid ? "Sealed multi-use vial" : "Sealed lyophilised vial" },
      ],
    },
    {
      heading: "Research Use & Safety",
      rows: [
        {
          label: "Intended Use",
          value: "For laboratory research use only. Not for human or veterinary use.",
        },
        {
          label: "Caution",
          value:
            "Handle using appropriate PPE and in compliance with relevant laboratory safety standards.",
        },
      ],
    },
    {
      heading: "Storage, Handling & Stability",
      rows: liquid
        ? [
            { label: "Storage Temperature", value: "15–25 °C, protect from light" },
            { label: "Shelf Life", value: "28 days after first puncture; 2 years unopened" },
            { label: "Handling", value: "Use aseptic technique for every withdrawal" },
          ]
        : [
            { label: "Storage Temperature, Unopened", value: "-20 °C recommended for long-term storage" },
            { label: "Storage Temperature, Opened", value: "-20 °C, minimise freeze–thaw cycles" },
            { label: "Shelf Life", value: "2 years unopened under recommended conditions" },
            {
              label: "Reconstitution Stability",
              value: "Stable for up to 28 days at 2–8 °C in aqueous solution under sterile conditions",
            },
          ],
    },
  ];
}

export function ProductTechnicalData({ p, variant }: { p: Product; variant: Variant }) {
  const title = productTitle(p);
  const liquid = isLiquid(p);

  return (
    <section className="w-full min-w-0 border-t border-border py-10 sm:py-14">
      <div className="container-x min-w-0">
        <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="min-w-0 space-y-7">
            <div>
              <h2 className="font-display text-xl font-semibold mb-2">Usage and Storage</h2>
              <p className="text-sm leading-relaxed text-navy-deep/75">
                {title} is supplied {liquid ? "as a sterile solution" : "as a lyophilised solid"} to
                ensure maximum stability and ease of use in research environments. For best results,
                follow our {liquid ? "handling" : "reconstitution"} and storage guidelines below.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold mb-2">Quality Assurance</h2>
              <p className="text-sm leading-relaxed text-navy-deep/75">
                Each batch is {liquid ? "prepared" : "synthesised"} through a controlled process and
                undergoes stringent quality control to meet the high purity and stability standards
                that researchers require. Batch-matched certificates of analysis are available for
                every vial we dispatch.
              </p>
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold mb-2">Legal and Safety Information</h2>
              <p className="text-sm leading-relaxed text-navy-deep/75">
                Oxford Research Peptides provides {title} strictly for scientific and research use.
                Our products are{" "}
                <em className="italic">not designed for human consumption or clinical application.</em>
              </p>
            </div>
          </div>

          <div className="min-w-0">
            <h2 className="font-display text-2xl font-medium mb-4">Technical Data</h2>
            <div className="overflow-hidden border border-border bg-white">
              <table className="w-full table-fixed text-left text-sm">
                <tbody>
                  {groups(p, variant).map((g) => (
                    <Fragment key={g.heading}>
                      <tr className="bg-muted/60">
                        <th
                          colSpan={2}
                          scope="colgroup"
                          className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-navy-deep sm:px-4"
                        >
                          {g.heading}
                        </th>
                      </tr>
                      {g.rows.map((r) => (
                        <tr key={g.heading + r.label} className="border-t border-border/70 align-top">
                          <th
                            scope="row"
                            className="w-2/5 px-3 py-2.5 text-xs font-normal text-muted-foreground sm:px-4 sm:text-sm"
                          >
                            {r.label}
                          </th>
                          <td className="px-3 py-2.5 text-xs text-navy-deep sm:px-4 sm:text-sm break-words">
                            {r.value}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
