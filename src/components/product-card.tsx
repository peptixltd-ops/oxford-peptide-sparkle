import { Link, useNavigate } from "@tanstack/react-router";
import type { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-border p-5 flex flex-col group hover:border-gold transition-colors">
      <Link
        to="/products/$slug"
        params={{ slug: p.slug }}
        className="aspect-square flex items-center justify-center mb-4 relative bg-gradient-to-b from-navy-deep/5 to-transparent overflow-hidden"
      >
        <img src={p.img} alt={`${p.name} research peptide vial`} className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </Link>
      <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-gold transition-colors">
        <h3 className="font-display text-base font-semibold mb-2 leading-tight">{p.name}</h3>
      </Link>
      <div className="flex items-center gap-2 mb-1">
        <span className="inline-block bg-gold/20 text-navy-deep text-[10px] font-bold px-2 py-1 w-fit">{p.dose}</span>
        <span className="text-sm font-bold text-navy-deep">£{p.price}</span>
      </div>
      <div className="text-xs text-muted-foreground mb-4">{p.purity}</div>
      <div className="mt-auto grid grid-cols-2 gap-2">
        <button
          onClick={() => add(p.slug)}
          className="border border-navy-deep text-navy-deep py-2.5 text-[10px] font-bold tracking-widest hover:bg-navy-deep hover:text-bone transition-colors"
        >
          ADD TO CART
        </button>
        <button
          onClick={() => { add(p.slug); navigate({ to: "/cart" }); }}
          className="bg-gold text-navy-deep py-2.5 text-[10px] font-bold tracking-widest hover:bg-gold-soft transition-colors"
        >
          BUY NOW
        </button>
      </div>
    </div>
  );
}
