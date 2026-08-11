// Independent third-party analysis reports (Janoshik Analytical) mapped to the
// exact products and variant strengths sold on this site.
// Only variants with a matching third-party report are listed.

export type CoaEntry = {
  slug: string;      // product slug in src/lib/products.ts
  variantId: string; // variant id (strength) as sold on site
  reportId: string;  // Janoshik test reference
  url: string;
};

export const coaEntries: CoaEntry[] = [
  { slug: "retatrutide", variantId: "10mg", reportId: "68135", url: "https://verify.janoshik.com/tests/68135_4XTT7YM5QD87" },
  { slug: "retatrutide", variantId: "20mg", reportId: "100382", url: "https://verify.janoshik.com/tests/100382_XQD3SSHR6VL3" },
  { slug: "retatrutide", variantId: "30mg", reportId: "148596", url: "https://verify.janoshik.com/tests/148596_SBEBSLPHGX18" },
  { slug: "retatrutide", variantId: "40mg", reportId: "100385", url: "https://verify.janoshik.com/tests/100385_53BFN48S42RZ" },

  { slug: "tirzepatide", variantId: "10mg", reportId: "100377", url: "https://verify.janoshik.com/tests/100377_W3ZH9043V3XB" },
  { slug: "tirzepatide", variantId: "20mg", reportId: "166589", url: "https://verify.janoshik.com/tests/166589_SVCTUQAM2JF7" },
  { slug: "tirzepatide", variantId: "40mg", reportId: "100378", url: "https://verify.janoshik.com/tests/100378_5P8TRAFCXWMW" },

  { slug: "semaglutide", variantId: "15mg", reportId: "107157", url: "https://verify.janoshik.com/tests/107157_2YXAG6BK5CZS" },

  { slug: "cagrilintide", variantId: "10mg", reportId: "70101", url: "https://verify.janoshik.com/tests/70101_Y2KQZEA7UI6A" },

  { slug: "ghk-cu", variantId: "50mg", reportId: "70116", url: "https://verify.janoshik.com/tests/70116_ZDW7UV6LUXQM" },

  { slug: "bpc-157", variantId: "10mg", reportId: "45213", url: "https://verify.janoshik.com/tests/45213_7ZRQ5NXSWEHU" },

  { slug: "bpc-tb500", variantId: "20mg-blend", reportId: "75837", url: "https://verify.janoshik.com/tests/75837_ZAXUWZ1XPZC2" },

  { slug: "tb-500", variantId: "10mg", reportId: "70107", url: "https://verify.janoshik.com/tests/70107_KRB53DK7BM5A" },

  { slug: "ipamorelin", variantId: "10mg", reportId: "70103", url: "https://verify.janoshik.com/tests/70103_B5Z56CW9IS1L" },

  { slug: "tesamorelin", variantId: "10mg", reportId: "90725", url: "https://verify.janoshik.com/tests/90725_RTFTEPXURPDH" },

  { slug: "nad", variantId: "500mg", reportId: "65329", url: "https://verify.janoshik.com/tests/65329_DUHRYS1L3M6" },

  { slug: "pt-141", variantId: "10mg", reportId: "70114", url: "https://verify.janoshik.com/tests/70114_GR5AIX2M4JP7" },

  { slug: "ss-31", variantId: "50mg", reportId: "70112", url: "https://verify.janoshik.com/tests/70112_KFCMHEXZ1BEV" },
];

export const coaFor = (slug: string, variantId?: string) =>
  coaEntries.filter(c => c.slug === slug && (!variantId || c.variantId === variantId));
