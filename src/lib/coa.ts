// Independent third-party analysis reports (Janoshik Analytical) mapped to the
// exact products and variant strengths sold on this site.
//
// Source: Janoshik report index (task number + verification key). The public
// verification URL format is:
//   https://verify.janoshik.com/tests/<taskNumber>_<key>
// Verification keys are always 12 characters — any row whose key did not match
// that shape was treated as a transcription error and left out rather than
// published as a dead link.
//
// Where a strength has more than one report, all of them are listed newest
// first so a researcher can cross-check batches.

export type CoaEntry = {
  slug: string;      // product slug in src/lib/products.ts
  variantId: string; // variant id (strength) as sold on site
  reportId: string;  // Janoshik task reference
  key: string;       // Janoshik verification key
  url: string;
};

const janoshik = (reportId: string, key: string) =>
  `https://verify.janoshik.com/tests/${reportId}_${key}`;

const e = (slug: string, variantId: string, reportId: string, key: string): CoaEntry => ({
  slug,
  variantId,
  reportId,
  key,
  url: janoshik(reportId, key),
});

export const coaEntries: CoaEntry[] = [
  // Retatrutide
  e("retatrutide", "10mg", "111297", "WU1CVFBBCHVX"),
  e("retatrutide", "10mg", "90722", "QSWGGWNB3ER5"),
  e("retatrutide", "10mg", "68135", "4XTT7YM5QD87"),
  e("retatrutide", "20mg", "107140", "CF85XHDRQDLS"),
  e("retatrutide", "20mg", "100382", "XQD3SSHR6VL3"),
  e("retatrutide", "20mg", "68136", "8LYV5E83PZS2"),
  e("retatrutide", "30mg", "148596", "SBEBSLPHGX18"),
  e("retatrutide", "30mg", "100384", "VXWV2LFXSDI9"),
  e("retatrutide", "40mg", "100385", "53BFN48S42RZ"),
  e("retatrutide", "50mg", "100386", "H38GIB9QHNRU"),
  e("retatrutide", "60mg", "70110", "M19NMZ6WXEWQ"),

  // Tirzepatide
  e("tirzepatide", "10mg", "100377", "W3ZH9043V3XB"),
  e("tirzepatide", "10mg", "68133", "4YPRN5FTSKQ7"),
  e("tirzepatide", "10mg", "38567", "G8CAYCEXABRJ"),
  e("tirzepatide", "15mg", "166585", "GYBH2CDDTTTM"),
  e("tirzepatide", "15mg", "78122", "ULXSKL4HTHQG"),
  e("tirzepatide", "20mg", "166591", "313U84T6A937"),
  e("tirzepatide", "20mg", "166589", "SVCTUQAM2JF7"),
  e("tirzepatide", "20mg", "68134", "PUXRQ3NLLIPB"),
  e("tirzepatide", "30mg", "148589", "RG3LXEFBHRNT"),
  e("tirzepatide", "30mg", "86742", "N2DJFLE31F9Z"),
  e("tirzepatide", "30mg", "82295", "U3S7Q4YSITX1"),
  e("tirzepatide", "40mg", "100378", "5P8TRAFCXWMW"),
  e("tirzepatide", "40mg", "70099", "BES279S0XM40"),
  e("tirzepatide", "50mg", "111298", "WGCNTDS5IUHV"),
  e("tirzepatide", "50mg", "100379", "138PLF8AIDDC"),
  e("tirzepatide", "60mg", "100380", "C11BZU717PF2"),

  // Semaglutide
  e("semaglutide", "15mg", "107157", "2YXAG6BK5CZS"),

  // Cagrilintide
  e("cagrilintide", "5mg", "86733", "UXN12GS9EYB8"),
  e("cagrilintide", "10mg", "70101", "Y2KQZEA7UI6A"),

  // GHK-Cu
  e("ghk-cu", "50mg", "70116", "ZDW7UV6LUXQM"),
  e("ghk-cu", "50mg", "65331", "KYB39ZQFJ7DV"),

  // MOTS-c
  e("mots-c", "10mg", "70113", "2QVFOKSOTZEV"),

  // BPC-157
  e("bpc-157", "10mg", "70106", "JOKIUL205NWI"),
  e("bpc-157", "10mg", "65332", "189HGATY94Y7"),
  e("bpc-157", "10mg", "45213", "7ZRQ5NXSWEHU"),

  // BPC-157 / TB-500 blend
  e("bpc-tb500", "20mg-blend", "75837", "ZAXUWZ1XPZC2"),

  // TB-500
  e("tb-500", "10mg", "70107", "KRB53DK7BM5A"),

  // Ipamorelin
  e("ipamorelin", "10mg", "70103", "B5Z56CW9IS1L"),

  // Selank
  e("selank", "30mg", "90727", "ZU2924XFHSTS"),

  // Tesamorelin
  e("tesamorelin", "10mg", "90725", "RTFTEPXURPDH"),

  // PT-141
  e("pt-141", "10mg", "70114", "GR5AIX2M4JP7"),

  // SS-31
  e("ss-31", "50mg", "70112", "KFCMHEXZ1BEV"),
];

export const coaFor = (slug: string, variantId?: string) =>
  coaEntries.filter(c => c.slug === slug && (!variantId || c.variantId === variantId));
