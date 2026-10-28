import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct, getVariant } from "./products";
import { isRetiredProductSlug, withoutRetiredProducts } from "./retired-products";
import { trackAddToCart, trackRemoveFromCart } from "./tracking";

export type CartItem = { slug: string; variantId: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (slug: string, variantId: string, qty?: number) => void;
  remove: (slug: string, variantId: string) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  clear: () => void;
  /** Drawer that pops open to confirm an add-to-cart. */
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  lastAdded: { slug: string; variantId: string } | null;
  /** Increments on every add — used to pulse the header cart badge. */
  bump: number;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "orp_cart_v2";

const same = (a: CartItem, slug: string, variantId: string) =>
  a.slug === slug && a.variantId === variantId;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ slug: string; variantId: string } | null>(null);
  const [bump, setBump] = useState(0);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(withoutRetiredProducts<CartItem>(JSON.parse(raw)));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (slug: string, variantId: string, qty = 1) => {
    if (isRetiredProductSlug(slug)) return;
    const product = getProduct(slug);
    if (product) {
      const variant = getVariant(product, variantId);
      trackAddToCart(product, variant, qty);
    }
    setItems(prev => {
      const existing = prev.find(i => same(i, slug, variantId));
      if (existing) return prev.map(i => same(i, slug, variantId) ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { slug, variantId, qty }];
    });
    setLastAdded({ slug, variantId });
    setBump(b => b + 1);
    setDrawerOpen(true);
  };

  const remove = (slug: string, variantId: string) => {
    const product = getProduct(slug);
    const existing = items.find(i => same(i, slug, variantId));
    if (product && existing) {
      const variant = getVariant(product, variantId);
      trackRemoveFromCart(product, variant, existing.qty);
    }
    setItems(prev => prev.filter(i => !same(i, slug, variantId)));
  };

  const setQty = (slug: string, variantId: string, qty: number) => {
    const existing = items.find(i => same(i, slug, variantId));
    const product = getProduct(slug);
    if (product && existing) {
      const variant = getVariant(product, variantId);
      const delta = qty - existing.qty;
      if (delta > 0) trackAddToCart(product, variant, delta);
      else if (delta < 0) trackRemoveFromCart(product, variant, -delta);
    }
    setItems(prev => qty <= 0
      ? prev.filter(i => !same(i, slug, variantId))
      : prev.map(i => same(i, slug, variantId) ? { ...i, qty } : i));
  };

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        add,
        remove,
        setQty,
        clear,
        drawerOpen,
        openDrawer: () => setDrawerOpen(true),
        closeDrawer: () => setDrawerOpen(false),
        lastAdded,
        bump,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
