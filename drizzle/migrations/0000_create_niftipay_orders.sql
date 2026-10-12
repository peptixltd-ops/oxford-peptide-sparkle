CREATE TABLE public.niftipay_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text UNIQUE NOT NULL,
  draft_order_id text,
  shopify_order_id text,
  niftipay_order_key text,
  amount numeric,
  currency text,
  status text NOT NULL DEFAULT 'pending',
  last_event text,
  processed_events text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz
);
GRANT ALL ON public.niftipay_orders TO service_role;
ALTER TABLE public.niftipay_orders ENABLE ROW LEVEL SECURITY;