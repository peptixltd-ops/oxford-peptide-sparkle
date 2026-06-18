import vialRetatrutide from "@/assets/vial-retatrutide.png";
import vialSemaglutide from "@/assets/vial-semaglutide.png";
import vialTirzepatide from "@/assets/vial-tirzepatide.png";
import vialGhkcu from "@/assets/vial-ghkcu.png";
import vialBpc157 from "@/assets/vial-bpc157.png";

export type Product = {
  slug: string;
  name: string;
  dose: string;
  purity: string;
  price: number;
  img: string;
  accent: string;
  description: string;
};

export const products: Product[] = [
  { slug: "retatrutide", name: "Retatrutide", dose: "10mg", purity: ">99% Purity", price: 89, img: vialRetatrutide, accent: "#1d4f8a", description: "Triple agonist research peptide. Lyophilised powder supplied in a sealed vial for in-vitro laboratory research only." },
  { slug: "semaglutide", name: "Semaglutide", dose: "10mg", purity: ">99% Purity", price: 79, img: vialSemaglutide, accent: "#7a1f2b", description: "GLP-1 receptor ligand reference standard. Lyophilised powder for in-vitro laboratory research only." },
  { slug: "tirzepatide", name: "Tirzepatide", dose: "10mg", purity: ">99% Purity", price: 95, img: vialTirzepatide, accent: "#a37423", description: "Dual GIP/GLP-1 ligand reference peptide. Lyophilised powder for in-vitro laboratory research only." },
  { slug: "ghk-cu", name: "GHK-Cu", dose: "5mg", purity: ">98% Purity", price: 35, img: vialGhkcu, accent: "#1f6b6b", description: "Copper tripeptide reference standard. Lyophilised powder for in-vitro laboratory research only." },
  { slug: "bpc-157", name: "BPC-157", dose: "5mg", purity: ">99% Purity", price: 45, img: vialBpc157, accent: "#5a3a8a", description: "Synthetic pentadecapeptide reference standard. Lyophilised powder for in-vitro laboratory research only." },
  { slug: "cjc-1295", name: "CJC-1295 (no DAC)", dose: "5mg", purity: ">99% Purity", price: 55, img: vialRetatrutide, accent: "#1d4f8a", description: "GHRH analogue reference peptide. Lyophilised powder for in-vitro laboratory research only." },
];

export const getProduct = (slug: string) => products.find(p => p.slug === slug);
