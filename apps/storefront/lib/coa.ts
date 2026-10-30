// Certificates of Analysis for the batches currently held in UK stock.
//
// Each entry points at a self-hosted copy of the full report image (HPLC +
// mass-spectrometry) issued by Janoshik Analytical, so the certificate always
// opens — no dependency on a third-party verification page that can expire.
//
// Last updated: 12 August 2026.

export type CoaEntry = {
  slug: string; // product slug in src/lib/products.ts
  variantId: string; // variant id (strength) as sold on site
  batch: string; // batch / lot identifier printed on the report
  testType: string; // analysis performed
  lab: string; // testing laboratory
  purity: string; // reported purity
  date: string; // report date
  file: string; // public path to the certificate image
};

const e = (
  slug: string,
  variantId: string,
  batch: string,
  purity: string,
  date: string,
  file: string,
  testType = "HPLC",
  lab = "Janoshik Analytical",
): CoaEntry => ({ slug, variantId, batch, testType, lab, purity, date, file });

export const coaEntries: CoaEntry[] = [
  // Retatrutide
  e("retatrutide", "10mg", "EGB-0226-RT10", "99.74%", "02 Mar 2026", "/coas/retatrutide-10mg-certificate-of-analysis-egb0226.webp"),
  e("retatrutide", "20mg", "EGB-0126-RT20", "99.87%", "20 Jan 2026", "/coas/retatrutide-20mg-certificate-of-analysis-egb0126.webp"),
  e("retatrutide", "20mg", "EGB-0226-RT20", "99.20%", "13 Feb 2026", "/coas/retatrutide-20mg-certificate-of-analysis-egb0226.webp"),
  e("retatrutide", "30mg", "EGB-0426-RT30", "99.46%", "23 Apr 2026", "/coas/retatrutide-30mg-certificate-of-analysis-egb0426.webp"),
  e("retatrutide", "30mg", "EGB-RT30-BBG50", "99.74%", "20 Jan 2026", "/coas/retatrutide-30mg-certificate-of-analysis-egb-bbg50.webp"),
  e("retatrutide", "40mg", "EGB-0126-RT40", "99.89%", "20 Jan 2026", "/coas/retatrutide-40mg-certificate-of-analysis-egb0126.webp"),

  // Tirzepatide
  e("tirzepatide", "10mg", "EGB-0126-TR10", "99.83%", "21 Jan 2026", "/coas/tirzepatide-10mg-certificate-of-analysis-egb0126.webp"),
  e("tirzepatide", "30mg", "EGB-0526-TR30", "99.87%", "23 Apr 2026", "/coas/tirzepatide-30mg-certificate-of-analysis-egb0526.webp"),
  e("tirzepatide", "40mg", "EGB-0126-TR40", "99.77%", "20 Jan 2026", "/coas/tirzepatide-40mg-certificate-of-analysis-egb0126.webp"),
  e("tirzepatide", "50mg", "EGB-0126-TR50", "99.71%", "20 Jan 2026", "/coas/tirzepatide-50mg-certificate-of-analysis-egb0126.webp"),
  e("tirzepatide", "50mg", "EGB-0226-TR50", "99.97%", "02 Mar 2026", "/coas/tirzepatide-50mg-certificate-of-analysis-egb0226.webp"),
  e("tirzepatide", "60mg", "EGB-0126-TR60", "99.84%", "20 Jan 2026", "/coas/tirzepatide-60mg-certificate-of-analysis-egb0126.webp"),

  // Reports verified directly with Janoshik Analytical (verify.janoshik.com)
  e("ss-31", "50mg", "WWB-EGB0625SS31-50", "99.76%", "02 Jul 2025", "https://verify.janoshik.com/tests/70112_KFCMHEXZ1BEV"),
  e("pt-141", "10mg", "WWB-EGB0625PT-10", "99.63%", "02 Jul 2025", "https://verify.janoshik.com/tests/70114_GR5AIX2M4JP7"),
  e("ghk-cu", "50mg", "WWB-EGB0625GKU-50", "99.93%", "02 Jul 2025", "https://verify.janoshik.com/tests/70116_ZDW7UV6LUXQM"),
  e("bpc-tb500", "20mg-blend", "WWB-EGB0725TBBC-20", "BPC-157 10.1mg / TB-500 11.0mg", "18 Aug 2025", "https://verify.janoshik.com/tests/75837_ZAXUWZ1XPZC2", "HPLC (quantitation)"),
  e("tesamorelin", "10mg", "EGB-WWB1125-TSM10", "99.29%", "26 Nov 2025", "https://verify.janoshik.com/tests/90725_RTFTEPXURPDH"),
];


export const coaFor = (slug: string, variantId?: string) =>
  coaEntries.filter(c => c.slug === slug && (!variantId || c.variantId === variantId));
