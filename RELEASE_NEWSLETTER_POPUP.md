# Release — Newsletter Popup + Welcome Email

Implements the email-capture popup and welcome-email flow for
oxfordresearchpeptides.com.

## What shipped

### Database
- Table `public.newsletter_subscribers` (id, email UNIQUE, phone, sms_consent,
  discount_code, source, subscribed_at, code_used_at, ip_hash, user_agent,
  metadata). RLS enabled with service-role-only access.

### Shopify
- Parent price rule `WELCOME20-PARENT` created (ID `1817597378901`):
  20% off entire order, once per customer.
- Each subscriber receives a unique 6-char child code, format
  `WELCOME20-XXXXXX`, generated via Shopify Admin API using the existing
  `SHOPIFY_ACCESS_TOKEN` secret.

### Server route
`POST /api/public/newsletter-subscribe` — file
`src/routes/api/public/newsletter-subscribe.ts`.
- Zod validation for email (required), phone (E.164, optional),
  sms_consent (required if phone present), honeypot `website` field.
- In-memory per-IP-hash rate limit.
- Suppression check (`suppressed_emails`, tolerates absence pre-infra).
- Duplicate check on `newsletter_subscribers`.
- Creates Shopify discount code, inserts row, rolls back code on DB
  failure.
- Enqueues welcome email via `enqueue_email` RPC (no-op until email
  infrastructure is set up).
- Returns `{ success: true, code }`.

### Popup component
`src/components/NewsletterPopup.tsx`, mounted once from `__root.tsx`.
- localStorage key `orp_newsletter_prompt`: skips if `subscribed` or if
  dismissed within the last 7 days.
- 8-second delay on eligible pageview.
- Centered modal, brand tokens (bone/navy/gold), Cormorant Garamond
  heading + Inter body, backdrop blur.
- Dismiss: `×` button, backdrop click, ESC key.
- Fields: email (required), phone (E.164, optional), SMS consent,
  hidden honeypot.
- States: form → loading → success (code + copy button) or error.
- GA4 events: `newsletter_popup_view`, `newsletter_signup`,
  `newsletter_popup_dismiss`.

## Pending user action

Email delivery requires an email domain. Once configured, the following
will be completed automatically:
- `email_domain--setup_email_infra` (pgmq queues, `enqueue_email` RPC,
  suppression/unsubscribe tables, cron).
- `email_domain--scaffold_transactional_email` (send/preview/unsubscribe
  routes, registry).
- Add `src/lib/email-templates/newsletter-welcome.tsx` (React Email
  template matching the brand — header wordmark + badge strip, welcome
  hero + vial image, discount band with dashed code box and
  `Shop now →` CTA, 4-icon feature row, "What to expect" mint card,
  best-sellers grid, dark bottom CTA, dark footer with legal address).
- Register template `newsletter-welcome` with subject
  `Welcome to Oxford Research Peptides — your 20% code is inside`.

## Compliance
- No em-dashes.
- No therapeutic claims.
- No fake reviews or fabricated testimonials.
- Unsubscribe footer auto-appended by dispatcher — not in template.
- SMS consent stored explicitly; SMS marketing requires
  `sms_consent = true`.

## Out of scope
Abandoned-cart SMS, admin dashboard, A/B variants, exit-intent, external
ESP sync.
