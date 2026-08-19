/**
 * Oxford Research Peptides — Abandoned Checkout Email Flow (PHASE 1: DRAFT PREVIEWS)
 *
 * These are email-safe (table-based, inline-styled) HTML builders used by the
 * preview dashboard at /dashboard/abandoned-checkout.
 *
 * NOTHING HERE IS LIVE. No Shopify automation, template or discount code has
 * been created. Liquid-style tokens (e.g. {{ checkout.abandoned_checkout_url }})
 * are shown as placeholders so each block maps 1:1 to a Shopify Liquid variable
 * in Phase 2.
 *
 * Each email's copy lives in EMAILS[] below so a single email can be edited
 * without touching the rest of the sequence.
 */

export const BRAND = {
  navy: "#141c2b",
  navySoft: "#1d283c",
  gold: "#b08a3e",
  goldSoft: "#cfae63",
  bone: "#f7f5f0",
  line: "#e3ded3",
  text: "#25282e",
  muted: "#6d7480",
  serif: "Georgia, 'Times New Roman', serif",
  sans: "Helvetica, Arial, sans-serif",
};

export const COMPANY = {
  brand: "Oxford Research Peptides",
  legal: "Oxford Research Syndicate Ltd",
  reg: "17207898",
  addr: "131a Movers Lane, Barking, Essex, IG11 7UQ, United Kingdom",
  email: "info@oxfordresearchpeptides.com",
  site: "https://www.oxfordresearchpeptides.com",
};

export type PreviewProduct = {
  title: string;
  variant: string;
  qty: number;
  price: string;
  img: string;
};

export type BuildOpts = {
  logoUrl: string;
  products: PreviewProduct[];
  subtotal: string;
};

/* ------------------------------------------------------------------ helpers */

const wrap = (inner: string, preheader: string, bg = BRAND.bone) => `
<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:${bg};font-family:${BRAND.sans};color:${BRAND.text};-webkit-font-smoothing:antialiased;">
<div style="display:none;font-size:1px;color:${bg};max-height:0;overflow:hidden;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${bg};">
<tr><td align="center" style="padding:24px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:100%;background:#ffffff;border:1px solid ${BRAND.line};">
${inner}
</table>
</td></tr></table></body></html>`;

const header = (logoUrl: string, minimal = false) => `
<tr><td align="center" style="padding:${minimal ? "34px 32px 8px" : "26px 32px 20px"};border-bottom:1px solid ${BRAND.line};">
  <img src="${logoUrl}" alt="${COMPANY.brand}" width="${minimal ? 168 : 210}" style="display:block;width:${minimal ? 168 : 210}px;max-width:80%;height:auto;">
  ${minimal ? "" : `<div style="margin-top:12px;font:11px/1.4 ${BRAND.sans};letter-spacing:.22em;color:${BRAND.muted};text-transform:uppercase;">Research Use Only &nbsp;·&nbsp; UK Manufactured</div>`}
</td></tr>`;

const hero = (h: string, sub?: string) => `
<tr><td style="padding:36px 32px 8px;">
  <h1 style="margin:0;font:400 27px/1.28 ${BRAND.serif};color:${BRAND.navy};">${h}</h1>
  ${sub ? `<p style="margin:14px 0 0;font:400 17px/1.5 ${BRAND.serif};color:${BRAND.gold};">${sub}</p>` : ""}
</td></tr>`;

const body = (paras: string[]) => `
<tr><td style="padding:18px 32px 6px;">
  ${paras
    .map(
      (p) =>
        `<p style="margin:0 0 14px;font:400 15px/1.72 ${BRAND.sans};color:${BRAND.text};">${p}</p>`,
    )
    .join("")}
</td></tr>`;

const cta = (label: string, note?: string) => `
<tr><td align="center" style="padding:16px 32px 10px;">
  <!-- Shopify: href = {{ checkout.abandoned_checkout_url }} (never hardcoded) -->
  <a href="{{ checkout.abandoned_checkout_url }}" style="display:inline-block;background:${BRAND.gold};color:${BRAND.navy};font:700 12px/1 ${BRAND.sans};letter-spacing:.18em;text-decoration:none;padding:17px 34px;border:1px solid ${BRAND.gold};">${label}</a>
  ${note ? `<div style="margin-top:10px;font:400 11px/1.5 ${BRAND.sans};color:${BRAND.muted};">${note}</div>` : ""}
</td></tr>`;

const dynamicTag = (label: string) => `
<tr><td style="padding:22px 32px 0;">
  <div style="font:700 10px/1 ${BRAND.sans};letter-spacing:.2em;color:${BRAND.muted};border-top:1px solid ${BRAND.line};padding-top:14px;">DYNAMIC SHOPIFY CONTENT · ${label}</div>
</td></tr>`;

const productBlock = (o: BuildOpts, withDispatch = true) => `
${dynamicTag("{% for line in checkout.line_items %}")}
<tr><td style="padding:12px 32px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
  ${o.products
    .map(
      (p) => `
    <tr><td style="padding:12px 0;border-bottom:1px solid ${BRAND.line};">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
        <td width="76" valign="top"><img src="${p.img}" alt="${p.title}" width="68" style="display:block;width:68px;height:auto;border:1px solid ${BRAND.line};"></td>
        <td valign="top" style="padding-left:14px;">
          <div style="font:600 15px/1.35 ${BRAND.serif};color:${BRAND.navy};">${p.title}</div>
          <div style="margin-top:4px;font:400 12px/1.5 ${BRAND.sans};color:${BRAND.muted};">${p.variant} · Qty ${p.qty}</div>
        </td>
        <td valign="top" align="right" style="font:700 14px/1.4 ${BRAND.sans};color:${BRAND.navy};white-space:nowrap;">${p.price}</td>
      </tr></table>
    </td></tr>`,
    )
    .join("")}
    <tr><td style="padding:14px 0 0;">
      <table role="presentation" width="100%"><tr>
        <td style="font:400 12px/1 ${BRAND.sans};letter-spacing:.14em;color:${BRAND.muted};">SUBTOTAL</td>
        <td align="right" style="font:700 16px/1 ${BRAND.sans};color:${BRAND.navy};">${o.subtotal}</td>
      </tr></table>
      <div style="margin-top:8px;font:400 11px/1.5 ${BRAND.sans};color:${BRAND.muted};">Shipping and any eligible credit are calculated at checkout.</div>
    </td></tr>
  </table>
</td></tr>
${dispatch()}`;

/** Dispatch reassurance strip — sits directly under the selected products. */
const dispatch = (pad = "32px") => `
<tr><td style="padding:14px ${pad} 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.line};background:${BRAND.bone};">
    <tr><td style="padding:14px 18px;">
      <div style="font:700 10px/1 ${BRAND.sans};letter-spacing:.2em;color:${BRAND.gold};">DISPATCHED FROM THE UK</div>
      <div style="margin-top:7px;font:400 14px/1.55 ${BRAND.serif};color:${BRAND.navy};">Order by 5pm today and your selection is dispatched the same day.</div>
      <div style="margin-top:5px;font:400 12px/1.55 ${BRAND.sans};color:${BRAND.muted};">Sent Royal Mail Tracked 24 — tracked, discreet packaging, typically with you the next day.</div>
    </td></tr>
  </table>
</td></tr>`;


const trust = (title: string, items: string[]) => `
<tr><td style="padding:26px 32px 6px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.bone};border:1px solid ${BRAND.line};">
    <tr><td style="padding:20px 22px;">
      <div style="font:400 16px/1.3 ${BRAND.serif};color:${BRAND.navy};">${title}</div>
      <table role="presentation" width="100%" style="margin-top:12px;">
        ${items
          .map(
            (i) =>
              `<tr><td style="padding:3px 0;font:400 13px/1.6 ${BRAND.sans};color:${BRAND.text};"><span style="color:${BRAND.gold};font-weight:700;">✓</span>&nbsp; ${i}</td></tr>`,
          )
          .join("")}
      </table>
    </td></tr>
  </table>
</td></tr>`;

const credit = (heading: string) => `
<tr><td style="padding:26px 32px 4px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.gold};">
    <tr><td align="center" style="padding:24px 22px;background:#ffffff;">
      <div style="font:700 10px/1 ${BRAND.sans};letter-spacing:.24em;color:${BRAND.muted};">${heading}</div>
      <div style="margin-top:10px;font:400 38px/1 ${BRAND.serif};color:${BRAND.navy};">£5.83</div>
      <div style="margin-top:8px;font:400 13px/1.6 ${BRAND.sans};color:${BRAND.text};">Store credit towards the order you already started.</div>
      <div style="margin-top:14px;display:inline-block;border:1px dashed ${BRAND.navy};padding:10px 20px;font:700 15px/1 ${BRAND.sans};letter-spacing:.16em;color:${BRAND.navy};">OXFORD583</div>
      <div style="margin-top:12px;font:400 11px/1.55 ${BRAND.sans};color:${BRAND.muted};">Can be used alongside other discounts only where Shopify's configured discount-combination rules for this promotion allow it.</div>
    </td></tr>
  </table>
</td></tr>`;

const footer = () => `
<tr><td style="padding:30px 32px 34px;border-top:1px solid ${BRAND.line};background:#ffffff;">
  <div style="font:600 13px/1.5 ${BRAND.serif};color:${BRAND.navy};">${COMPANY.brand}</div>
  <div style="margin-top:6px;font:400 12px/1.7 ${BRAND.sans};color:${BRAND.muted};">
    UK research peptide supplier.<br>
    For laboratory research use only. Not for human consumption. Not a medicine. No medical, therapeutic or human-use application is implied.
  </div>
  <div style="margin-top:12px;font:400 11px/1.7 ${BRAND.sans};color:${BRAND.muted};">
    ${COMPANY.legal} · Company Reg. No. ${COMPANY.reg}<br>
    ${COMPANY.addr}<br>
    <a href="mailto:${COMPANY.email}" style="color:${BRAND.muted};">${COMPANY.email}</a>
  </div>
  <div style="margin-top:14px;font:400 11px/1.8 ${BRAND.sans};color:${BRAND.muted};">
    You are receiving this because you started a checkout at ${COMPANY.brand}.<br>
    <a href="{{ shop.url }}/pages/email-preferences" style="color:${BRAND.navy};">Manage marketing preferences</a> ·
    <a href="{{ unsubscribe_link }}" style="color:${BRAND.navy};">Unsubscribe</a> ·
    <a href="${COMPANY.site}/privacy-policy" style="color:${BRAND.navy};">Privacy Policy</a> ·
    <a href="${COMPANY.site}/terms" style="color:${BRAND.navy};">Terms</a>
  </div>
</td></tr>`;

/* --------------------------------------------------------------- trust lists */

const TRUST_SHORT = [
  "UK Manufactured",
  "Third-Party Tested",
  "Batch-Specific COAs",
  "Fast UK Dispatch",
  "Discreet UK Delivery",
  "Secure Checkout",
  "Research Use Only",
];

const TRUST_FULL = [
  "UK Manufactured",
  "Independent Third-Party Testing",
  "Batch-Specific COAs",
  "Same-Day UK Dispatch where applicable",
  "Fast &amp; Discreet UK Delivery",
  "Secure Checkout",
  "Research Use Only",
];

const TRUST_MID = [
  "UK Manufactured",
  "Third-Party Tested",
  "Batch-Specific COAs",
  "Same-Day UK Dispatch where applicable",
  "Fast &amp; Discreet UK Delivery",
  "Secure Checkout",
  "Research Use Only",
];

/* -------------------------------------------------------------- email specs */

export type EmailSpec = {
  id: number;
  timing: string;
  subject: string;
  preheader: string;
  ctaLabel: string;
  objective: string;
  dynamicBlocks: string[];
  build: (o: BuildOpts) => string;
};

export const EMAILS: EmailSpec[] = [
  {
    id: 1,
    timing: "20 MIN",
    subject: "You’re one decision away",
    preheader: "You’re closer than you think.",
    ctaLabel: "COMPLETE MY ORDER",
    objective:
      "Frictionless return. No re-selling — simply reassure that the selection is intact and make the CTA the dominant element.",
    dynamicBlocks: [
      "checkout.line_items (image, title, variant, qty, price)",
      "checkout.subtotal_price",
      "checkout.abandoned_checkout_url",
    ],
    build: (o) =>
      wrap(
        header(o.logoUrl) +
          hero("You’re closer than you think.") +
          body([
            "You took the time to find what you were looking for.",
            "Your selection is still waiting exactly where you left it. No need to start again.",
            "You’re one decision away from completing what you started.",
          ]) +
          cta("COMPLETE MY ORDER") +
          productBlock(o) +
          trust("Why Oxford?", TRUST_SHORT) +
          footer(),
        "You’re closer than you think.",
      ),
  },
  {
    id: 2,
    timing: "3 HOURS",
    subject: "You started this for a reason. Make the first step now.",
    preheader: "Don’t lose your momentum.",
    ctaLabel: "TAKE THE NEXT STEP",
    objective:
      "Reinforce supplier standards (quality, testing, transparency) so hesitation about the supplier is removed — momentum framing, no discount yet.",
    dynamicBlocks: [
      "checkout.line_items",
      "checkout.subtotal_price",
      "checkout.abandoned_checkout_url",
    ],
    build: (o) =>
      wrap(
        header(o.logoUrl) +
          hero("Don’t lose your momentum.") +
          body([
            "You came to Oxford Research Peptides looking for something specific. You did the research. You made your selection. You were almost there.",
            "Sometimes all that separates intention from action is following through.",
            "When it comes to laboratory research, you shouldn’t have to compromise on the standards you expect from your supplier. That’s why Oxford Research Peptides puts quality, testing and transparency first.",
            "UK manufactured. Third-party tested. Built around verifiable quality.",
            "Your selection is still waiting.",
          ]) +
          cta("TAKE THE NEXT STEP") +
          productBlock(o) +
          trust("Why Oxford?", TRUST_FULL) +
          footer(),
        "Don’t lose your momentum.",
      ),
  },
  {
    id: 3,
    timing: "12 HOURS",
    subject: "The hardest part is starting, don’t let yourself down",
    preheader:
      "Every worthwhile decision comes with a moment of hesitation.",
    ctaLabel: "USE MY £5.83 CREDIT",
    objective:
      "Remove the final friction with personal store credit — positioned as a courtesy, not a sale. Credit block is the visual anchor.",
    dynamicBlocks: [
      "checkout.line_items",
      "checkout.subtotal_price",
      "checkout.abandoned_checkout_url + discount OXFORD583 auto-apply",
    ],
    build: (o) =>
      wrap(
        header(o.logoUrl) +
          hero(
            "Every worthwhile decision comes with a moment of hesitation.",
            "What matters is what happens next.",
          ) +
          body([
            "You already made the difficult decision. You found a supplier you trusted. You selected your products.",
            "Now all that’s left is following through.",
            "Don’t let a moment of hesitation turn into another unfinished decision.",
            "And to make that decision a little easier, here’s something from Oxford.",
          ]) +
          credit("YOUR OXFORD STORE CREDIT") +
          body([
            "No complicated offer. Just an extra £5.83 towards completing the order you already started.",
          ]) +
          cta("USE MY £5.83 CREDIT", "Credit applied automatically at checkout.") +
          productBlock(o) +
          trust("Why Oxford?", TRUST_MID) +
          footer(),
        "Every worthwhile decision comes with a moment of hesitation.",
      ),
  },
  {
    id: 4,
    timing: "24 HOURS",
    subject: "Which version of yourself do you want?",
    preheader: "Every decision is a vote for the person you choose to be.",
    ctaLabel: "FINISH WHAT I STARTED",
    objective:
      "Identity-based follow-through framing about the decision itself (not product outcomes), plus a reminder the credit is still available.",
    dynamicBlocks: [
      "checkout.line_items",
      "checkout.subtotal_price",
      "checkout.abandoned_checkout_url + discount OXFORD583 auto-apply",
    ],
    build: (o) =>
      wrap(
        header(o.logoUrl) +
          hero("Every decision is a vote for the person you choose to be.") +
          body([
            "There’s the version that keeps thinking about it. And there’s the version that follows through.",
            "Most of the time, the difference isn’t opportunity. It’s action.",
            "Yesterday, you made a decision to start. Today, you get to decide whether you finish.",
            "Your Oxford selection is still waiting — and your £5.83 store credit is still available.",
          ]) +
          cta("FINISH WHAT I STARTED") +
          trust("Your decision. Our standards.", TRUST_MID) +
          credit("£5.83 OXFORD CREDIT") +
          productBlock(o) +
          footer(),
        "Every decision is a vote for the person you choose to be.",
      ),
  },
  {
    id: 5,
    timing: "72 HOURS",
    subject: "FINAL Reminder – Don’t turn your back on yourself",
    preheader: "This is the last email we’ll send about your order.",
    ctaLabel: "COMPLETE MY ORDER",
    objective:
      "Respectful close. Deliberately different: personal-note layout, white space, minimal imagery, one CTA, no new discount, no urgency devices.",
    dynamicBlocks: [
      "checkout.abandoned_checkout_url + discount OXFORD583 auto-apply",
      "line items intentionally omitted (personal-note format)",
    ],
    build: (o) =>
      wrap(
        header(o.logoUrl, true) +
          `<tr><td style="padding:44px 44px 0;">
            <h1 style="margin:0;font:400 25px/1.35 ${BRAND.serif};color:${BRAND.navy};">This isn’t really about your cart anymore.</h1>
            <p style="margin:16px 0 0;font:400 17px/1.55 ${BRAND.serif};color:${BRAND.gold};">It’s about whether you want to finish what you started.</p>
          </td></tr>` +
          `<tr><td style="padding:26px 44px 6px;">
            ${[
              "You’ve had time to think.",
              "And if you’ve decided Oxford Research Peptides isn’t the right supplier for you, we respect that.",
              "But if the only thing standing between you and the decision you already made is hesitation, don’t let hesitation make the decision for you.",
              "Ask yourself: will you be glad you walked away — or will you wonder “what if?”",
              "This is the final reminder we’ll send about your selection.",
              "Your £5.83 Oxford credit is still available and can still be used alongside any eligible existing discount.",
              "After this, we’ll leave the decision entirely with you.",
            ]
              .map(
                (p) =>
                  `<p style="margin:0 0 16px;font:400 15px/1.8 ${BRAND.sans};color:${BRAND.text};">${p}</p>`,
              )
              .join("")}
            <p style="margin:24px 0 0;font:400 15px/1.7 ${BRAND.serif};color:${BRAND.navy};">— Oxford Research Peptides</p>
          </td></tr>` +
          `<tr><td align="center" style="padding:34px 44px 8px;">
            <a href="{{ checkout.abandoned_checkout_url }}" style="display:inline-block;background:${BRAND.navy};color:#ffffff;font:700 12px/1 ${BRAND.sans};letter-spacing:.2em;text-decoration:none;padding:19px 40px;">COMPLETE MY ORDER</a>
          </td></tr>` +
          `<tr><td align="center" style="padding:16px 44px 0;">
            <div style="font:400 12px/1.6 ${BRAND.sans};color:${BRAND.muted};">Order by 5pm today for same-day dispatch · Royal Mail Tracked 24</div>
          </td></tr>` +
          `<tr><td style="padding:34px 44px 0;">
            <div style="border-top:1px solid ${BRAND.line};padding-top:20px;font:400 15px/1.3 ${BRAND.serif};color:${BRAND.navy};">One final reminder of what you’re choosing</div>
            <table role="presentation" width="100%" style="margin-top:10px;">
              ${TRUST_MID.map(
                (i) =>
                  `<tr><td style="padding:3px 0;font:400 13px/1.6 ${BRAND.sans};color:${BRAND.text};"><span style="color:${BRAND.gold};font-weight:700;">✓</span>&nbsp; ${i}</td></tr>`,
              ).join("")}
            </table>
          </td></tr>` +
          `<tr><td style="padding:26px 44px 6px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.line};">
              <tr><td align="center" style="padding:20px;">
                <div style="font:700 10px/1 ${BRAND.sans};letter-spacing:.24em;color:${BRAND.muted};">£5.83 OXFORD CREDIT</div>
                <div style="margin-top:12px;display:inline-block;border:1px dashed ${BRAND.navy};padding:9px 18px;font:700 14px/1 ${BRAND.sans};letter-spacing:.16em;color:${BRAND.navy};">OXFORD583</div>
              </td></tr>
            </table>
          </td></tr>` +
          footer(),
        "This is the last email we’ll send about your order.",
      ),
  },
];
