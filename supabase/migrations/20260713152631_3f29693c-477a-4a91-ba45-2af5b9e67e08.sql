
CREATE TABLE public.newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  sms_consent boolean NOT NULL DEFAULT false,
  discount_code text NOT NULL,
  source text NOT NULL DEFAULT 'popup',
  subscribed_at timestamptz NOT NULL DEFAULT now(),
  code_used_at timestamptz,
  ip_hash text,
  user_agent text,
  metadata jsonb
);

GRANT ALL ON public.newsletter_subscribers TO service_role;

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- No policies for anon/authenticated: service role only.
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers (lower(email));
CREATE INDEX idx_newsletter_subscribers_subscribed_at ON public.newsletter_subscribers (subscribed_at DESC);
