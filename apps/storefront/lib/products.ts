const vialRetatrutideAsset = { url: "/products/retatrutide.webp" };
const vialRetatrutide = vialRetatrutideAsset.url;
const vialTirzepatideAsset = { url: "/products/tirzepatide.webp" };
const vialTirzepatide = vialTirzepatideAsset.url;
const vialGhkcuAsset = { url: "/products/ghk-cu.webp" };
const vialGhkcu = vialGhkcuAsset.url;
const vialMotscAsset = { url: "/products/mots-c.webp" };
const vialMotsc = vialMotscAsset.url;
const vialBacWaterAsset = { url: "/products/bacteriostatic-water.webp" };
const vialBacWater = vialBacWaterAsset.url;
const vialNadAsset = { url: "/products/nad.webp" };
const vialNad = vialNadAsset.url;
const vialBpcTb500Asset = { url: "/products/bpc-tb500.webp" };
const vialBpcTb500 = vialBpcTb500Asset.url;
const vialIpamorelinAsset = { url: "/products/ipamorelin.webp" };
const vialIpamorelin = vialIpamorelinAsset.url;
const vialSelankAsset = { url: "/products/selank.webp" };
const vialSelank = vialSelankAsset.url;
const vialTesamorelinAsset = { url: "/products/tesamorelin.webp" };
const vialTesamorelin = vialTesamorelinAsset.url;
const vialKlowAsset = { url: "/products/klow.webp" };
const vialKlow = vialKlowAsset.url;
const vialTb500Asset = { url: "/products/tb-500.webp" };
const vialTb500 = vialTb500Asset.url;
const vialIgfLr3Asset = { url: "/products/igf-lr3.webp" };
const vialIgfLr3 = vialIgfLr3Asset.url;
const vialCagrilintideAsset = { url: "/products/cagrilintide.webp" };
const vialCagrilintide = vialCagrilintideAsset.url;
const vialSs31Asset = { url: "/products/ss-31.webp" };
const vialSs31 = vialSs31Asset.url;
const vialPt141Asset = { url: "/products/pt-141.webp" };
const vialPt141 = vialPt141Asset.url;
const vialSemaxAsset = { url: "/products/semax.webp" };
const vialSemax = vialSemaxAsset.url;
const vialBpc157Asset = { url: "/products/bpc-157.webp" };
const vialBpc157 = vialBpc157Asset.url;

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
    name: "RT GLP",
    purity: ">99% Purity",
    img: vialRetatrutide,
    accent: "#1d4f8a",
    description: "Triple agonist research peptide (GLP-1 / GIP / glucagon receptor ligand). Lyophilised powder supplied in a sealed vial for in-vitro laboratory research only.",
    variants: [v("10mg", 45), v("20mg", 72), v("30mg", 95), v("40mg", 108), v("50mg", 122), v("60mg", 135)],
  },
  {
    slug: "tirzepatide",
    name: "Tirzepatide",
    purity: ">99% Purity",
    img: vialTirzepatide,
    accent: "#a37423",
    description: "Dual GIP / GLP-1 receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 45), v("15mg", 54), v("20mg", 63), v("30mg", 77), v("40mg", 90), v("50mg", 104), v("60mg", 113)],
  },
  {
    slug: "ghk-cu",
    name: "GHK-Cu",
    purity: "99.93% Purity",
    img: vialGhkcu,
    accent: "#1f6b6b",
    description: "Copper tripeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("50mg", 16)],
  },
  {
    slug: "mots-c",
    name: "MOTS-c",
    purity: ">99% Purity",
    img: vialMotsc,
    accent: "#1d4f8a",
    description: "Mitochondrial-derived peptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 23), v("40mg", 72)],
  },
  {
    slug: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    purity: "0.9% Benzyl Alcohol",
    img: vialBacWater,
    accent: "#9aa0a6",
    description: "Sterile bacteriostatic water (3 mL) for laboratory reconstitution of lyophilised peptides.",
    variants: [v("3mL", 6), v("10mL", 7)],
  },
  {
    slug: "nad",
    name: "NAD+",
    purity: ">99% Purity",
    img: vialNad,
    accent: "#7a1f2b",
    description: "Nicotinamide adenine dinucleotide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("500mg", 54)],
  },
  {
    slug: "bpc-tb500",
    name: "BPC-157 / TB-500 Mix",
    purity: ">99% Purity",
    img: vialBpcTb500,
    accent: "#5a3a8a",
    description: "Combined BPC-157 and TB-500 reference standard blend. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("20mg-blend", 36, "20mg blend")],
  },
  {
    slug: "ipamorelin",
    name: "Ipamorelin",
    purity: ">99% Purity",
    img: vialIpamorelin,
    accent: "#5a3a8a",
    description: "Selective GHSR ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 41)],
  },
  {
    slug: "selank",
    name: "Selank",
    purity: ">99% Purity",
    img: vialSelank,
    accent: "#1f6b6b",
    description: "Synthetic heptapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 22)],
  },
  {
    slug: "tesamorelin",
    name: "Tesamorelin",
    purity: ">99% Purity",
    img: vialTesamorelin,
    accent: "#a37423",
    description: "GHRH analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 63)],
  },
  {
    slug: "klow",
    name: "KLOW",
    purity: ">99% Purity",
    img: vialKlow,
    accent: "#7a1f2b",
    description: "Multi-peptide research blend (KPV, LL-37, GHK-Cu, TB-500). Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("80mg-blend", 50, "80mg blend")],
  },
  {
    slug: "tb-500",
    name: "TB-500",
    purity: ">99% Purity",
    img: vialTb500,
    accent: "#5a3a8a",
    description: "Thymosin Beta-4 fragment reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 23)],
  },
  {
    slug: "igf-lr3",
    name: "IGF-1 LR3",
    purity: ">99% Purity",
    img: vialIgfLr3,
    accent: "#a37423",
    description: "Long Arg3 IGF-1 analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("1mg", 68)],
  },
  {
    slug: "cagrilintide",
    name: "Cagrilintide",
    purity: ">99% Purity",
    img: vialCagrilintide,
    accent: "#1d4f8a",
    description: "Long-acting amylin analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 41), v("10mg", 50)],
  },
  {
    slug: "ss-31",
    name: "SS-31",
    purity: ">99% Purity",
    img: vialSs31,
    accent: "#7a1f2b",
    description: "Mitochondria-targeted tetrapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("50mg", 108)],
  },
  {
    slug: "pt-141",
    name: "PT-141",
    purity: ">99% Purity",
    img: vialPt141,
    accent: "#1f6b6b",
    description: "Melanocortin receptor ligand reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 27)],
  },
  {
    slug: "semax",
    name: "Semax",
    purity: ">99% Purity",
    img: vialSemax,
    accent: "#5a3a8a",
    description: "Synthetic ACTH(4-10) analogue reference peptide. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("10mg", 27), v("30mg", 41)],
  },
  {
    slug: "bpc-157",
    name: "BPC-157",
    purity: ">99% Purity",
    img: vialBpc157,
    accent: "#5a3a8a",
    description: "Synthetic pentadecapeptide reference standard. Lyophilised powder for in-vitro laboratory research only.",
    variants: [v("5mg", 11), v("10mg", 18)],
  },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);

export const getVariant = (p: Product, variantId?: string) =>
  p.variants.find(x => x.id === variantId) ?? p.variants[0];

export const fromPrice = (p: Product) => Math.min(...p.variants.map(x => x.price));
