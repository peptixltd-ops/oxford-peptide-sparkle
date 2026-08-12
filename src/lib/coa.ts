// Independent third-party analysis reports (Janoshik Analytical) mapped to the
// exact products and variant strengths sold on this site.
//
// Public verification URL format:
//   https://verify.janoshik.com/tests/<taskNumber>_<key>
//
// IMPORTANT: every entry below has been individually opened and checked — the
// report page loads and the "Sample" line on the report matches the compound
// and strength it is listed under here. Reports whose reference/key no longer
// resolves at the laboratory were removed rather than published as dead links.
// Last verified: 12 August 2026.

export type CoaEntry = {
  slug: string;      // product slug in src/lib/products.ts
  variantId: string; // variant id (strength) as sold on site
  reportId: string;  // Janoshik task reference
  key: string;       // Janoshik verification key
  sample: string;    // sample name exactly as printed on the report
  url: string;
};

const e = (
  slug: string,
  variantId: string,
  reportId: string,
  key: string,
  sample: string,
): CoaEntry => ({
  slug,
  variantId,
  reportId,
  key,
  sample,
  url: `https://verify.janoshik.com/tests/${reportId}_${key}`,
});

export const coaEntries: CoaEntry[] = [
  // Retatrutide
  e("retatrutide", "10mg", "111297", "WU1CVFBBCHVX", "RT10"),
  e("retatrutide", "10mg", "90722", "QSWGGWNB3ER5", "Reta 10mg"),
  e("retatrutide", "20mg", "107140", "CF85XHDRQDLS", "RT20"),
  e("retatrutide", "20mg", "68136", "8LYV5E83PZS2", "Reta 20mg"),
  e("retatrutide", "40mg", "100385", "53BFN48S42RZ", "RT40"),
  e("retatrutide", "50mg", "100386", "H38GIB9QHNRU", "RT50"),
  e("retatrutide", "60mg", "70110", "M19NMZ6WXEWQ", "Reta 60mg"),

  // Tirzepatide
  e("tirzepatide", "15mg", "166585", "GYBH2CDDTTTM", "TR15"),
  e("tirzepatide", "15mg", "166587", "D248JCQUVN1J", "TR15 (endotoxin)"),
  e("tirzepatide", "15mg", "78122", "ULXSKL4HTHQG", "Tirz 15mg"),
  e("tirzepatide", "20mg", "166591", "313U84T6A937", "TR20"),
  e("tirzepatide", "20mg", "68134", "PUXRQ3NLLIPB", "Tirz 20mg"),
  e("tirzepatide", "30mg", "148589", "RG3LXEFBHRNT", "Tirz 30mg"),
  e("tirzepatide", "30mg", "86742", "N2DJFLE31F9Z", "Tirz 30mg"),
  e("tirzepatide", "30mg", "82295", "U3S7Q4YSITX1", "Tirz 30mg"),
  e("tirzepatide", "40mg", "100378", "5P8TRAFCXWMW", "TR40"),
  e("tirzepatide", "50mg", "100379", "138PLF8AIDDC", "TR50"),
  e("tirzepatide", "50mg", "111298", "WGCNTDS5IUHV", "TR50"),
  e("tirzepatide", "60mg", "100380", "C11BZU717PF2", "TR60"),

  // Cagrilintide
  e("cagrilintide", "5mg", "86733", "UXN12GS9EYB8", "Cagri 5mg"),

  // GHK-Cu
  e("ghk-cu", "50mg", "70116", "ZDW7UV6LUXQM", "GHK-Cu 50mg"),
  e("ghk-cu", "50mg", "65331", "KYB39ZQFJ7DV", "GHK-Cu 50mg"),

  // BPC-157
  e("bpc-157", "10mg", "45213", "7ZRQ5NXSWEHU", "BPC-157 10mg"),

  // BPC-157 / TB-500 blend
  e("bpc-tb500", "20mg-blend", "75837", "ZAXUWZ1XPZC2", "BPC/TB500 combo"),

  // Tesamorelin
  e("tesamorelin", "10mg", "90725", "RTFTEPXURPDH", "Tesa 10mg"),

  // PT-141
  e("pt-141", "10mg", "70114", "GR5AIX2M4JP7", "PT-141 10mg"),

  // SS-31
  e("ss-31", "50mg", "70112", "KFCMHEXZ1BEV", "SS31 50mg"),
];

export const coaFor = (slug: string, variantId?: string) =>
  coaEntries.filter(c => c.slug === slug && (!variantId || c.variantId === variantId));
