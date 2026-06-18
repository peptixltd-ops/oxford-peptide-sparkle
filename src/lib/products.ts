import vialRetatrutide from "@/assets/vial-retatrutide.png";
import vialSemaglutide from "@/assets/vial-semaglutide.png";
import vialTirzepatide from "@/assets/vial-tirzepatide.png";
import vialGhkcu from "@/assets/vial-ghkcu.png";
import vialBpc157 from "@/assets/vial-bpc157.png";

export type Variant = { id: string; label: string; price: number };

export type Product = {
  slug: string;
  name: string;
  purity: string;
  img: string;
  accent: string;
  description: string;
  variants: Variant[];
};

const v = (id: string, price: number, label?: string): Variant => ({ id, label: label ?? id, price });

export const products: Product[] = [
  {
    slug: "retatrutide",
    name: "Retatrutide",
    purity: ">99% Purity",
    img: vialRetatrutide,
    accent: "#1d4f8a",
    description: "Triple agonist research peptide (GLP-1 / GIP / glucagon receptor ligand). Lyophilised powder supplied in a sealed vial for in-vitro laboratory research only.",
    variants: [v("10mg", 59), v("20mg", 109), v("30mg", 155), v("40mg", 199)],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    purity: ">99% Purity",
    img: vialTirzepatide,
    accent: "#a37423",
    description: "Dual GIP / GLP-1 receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 60), v("15mg", 85), v("30mg", 160)],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    purity: ">98% Purity",
    img: vialGhkcu,
    accent: "#1f6b6b",
    description: "Copper tripeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("50mg", 20), v("100mg", 35), v("200mg", 60)],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    purity: ">99% Purity",
    img: vialRetatrutide,
    accent: "#1d4f8a",
    description: "Mitochondrial-derived peptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 60), v("40mg", 200)],
  },
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    purity: "0.9% Benzyl Alcohol",
    img: vialGhkcu,
    accent: "#9aa0a6",
    description: "Sterile bacteriostatic water (3 mL) for laboratory reconstitution of lyophilised peptides.",
    variants: [v("3mL", 6), v("10mL", 14)],
  },
  {
    slug: "nad",
    name: "NAD+",
    purity: ">99% Purity",
    img: vialSemaglutide,
    accent: "#7a1f2b",
    description: "Nicotinamide adenine dinucleotide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("500mg", 70), v("1000mg", 130)],
  },
  {
    slug: "bpc-tb500",
    name: "BPC-157 / TB-500 Mix",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Combined BPC-157 and TB-500 reference standard blend. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 60), v("20mg", 110)],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Selective GHSR ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 55), v("20mg", 99)],
  },
  {
    slug: "selank",
    name: "Selank",
    purity: ">99% Purity",
    img: vialGhkcu,
    accent: "#1f6b6b",
    description: "Synthetic heptapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 30), v("20mg", 55)],
  },
  {
    slug: "semaglutide",
    name: "Semaglutide",
    purity: ">99% Purity",
    img: vialSemaglutide,
    accent: "#7a1f2b",
    description: "GLP-1 receptor ligand reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 35), v("10mg", 48), v("20mg", 85)],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    purity: ">99% Purity",
    img: vialTirzepatide,
    accent: "#a37423",
    description: "GHRH analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 85), v("20mg", 159)],
  },
  {
    slug: "klow",
    name: "KLOW",
    purity: ">99% Purity",
    img: vialSemaglutide,
    accent: "#7a1f2b",
    description: "Multi-peptide research blend (KPV, LL-37, GHK-Cu, TB-500). Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("50mg", 110), v("100mg", 199)],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Thymosin Beta-4 fragment reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 45), v("10mg", 75), v("20mg", 139)],
  },
  {
    slug: "igf-lr3",
    name: "IGF-1 LR3",
    purity: ">99% Purity",
    img: vialTirzepatide,
    accent: "#a37423",
    description: "Long Arg3 IGF-1 analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("1mg", 85), v("2mg", 159)],
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    purity: ">99% Purity",
    img: vialRetatrutide,
    accent: "#1d4f8a",
    description: "Long-acting amylin analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 75), v("10mg", 139)],
  },
  {
    slug: "ss-31",
    name: "SS-31",
    purity: ">99% Purity",
    img: vialSemaglutide,
    accent: "#7a1f2b",
    description: "Mitochondria-targeted tetrapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("50mg", 150), v("100mg", 279)],
  },
  {
    slug: "pt-141",
    name: "PT-141",
    purity: ">99% Purity",
    img: vialGhkcu,
    accent: "#1f6b6b",
    description: "Melanocortin receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 40), v("20mg", 75)],
  },
  {
    slug: "semax",
    name: "Semax",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Synthetic ACTH(4-10) analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 55), v("30mg", 145)],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Synthetic pentadecapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 29.95, "5mg"), v("10mg", 49), v("20mg", 89)],
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);

export const getVariant = (p: Product, variantId?: string) =>
  p.variants.find(x => x.id === variantId) ?? p.variants[0];

export const fromPrice = (p: Product) => Math.min(...p.variants.map(x => x.price));
