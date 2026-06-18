import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = { slug: string; variantId: string; qty: number };

type CartCtx = {
  items: CartItem[];
  count: number;
  add: (slug: string, variantId: string, qty?: number) => void;
  remove: (slug: string, variantId: string) => void;
  setQty: (slug: string, variantId: string, qty: number) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const KEY = "orp_cart_v2";

const same = (a: CartItem, slug: string, variantId: string) =>
  a.slug === slug && a.variantId === variantId;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const add = (slug: string, variantId: string, qty = 1) =>
    setItems(prev => {
      const existing = prev.find(i => same(i, slug, variantId));
      if (existing) return prev.map(i => same(i, slug, variantId) ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { slug, variantId, qty }];
    });

  const remove = (slug: string, variantId: string) =>
    setItems(prev => prev.filter(i => !same(i, slug, variantId)));

  const setQty = (slug: string, variantId: string, qty: number) =>
    setItems(prev => qty <= 0
      ? prev.filter(i => !same(i, slug, variantId))
      : prev.map(i => same(i, slug, variantId) ? { ...i, qty } : i));

  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.qty, 0);

  return <Ctx.Provider value={{ items, count, add, remove, setQty, clear }}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
