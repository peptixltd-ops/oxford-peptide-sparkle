import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag } from "lucide-react";
import { useState } from "react";
import oxfordLogo from "@/assets/oxford-logo-new.jpg.asset.json";
import { useCart } from "@/lib/cart";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center group" aria-label="Oxford Research Peptides — Home">
      <img
        src={oxfordLogo.url}
        alt="Oxford Research Peptides"
        className={`h-12 w-auto object-contain ${light ? "brightness-0 invert" : ""}`}
      />
    </Link>
  );
}

const navLinks = [
  { to: "/shop", label: "SHOP PEPTIDES" },
  { to: "/research-hub", label: "RESEARCH HUB" },
  { to: "/lab-testing", label: "LAB TESTING" },
  { to: "/about", label: "ABOUT US" },
  { to: "/wholesale", label: "WHOLESALE" },
  { to: "/faqs", label: "FAQS" },
] as const;

export function SiteHeader() {
  const { count } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="bg-white border-b border-border relative z-20">
      <div className="container-x flex items-center justify-between h-20">
        <Logo />
        <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-widest">
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-gold transition-colors"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <button aria-label="Search" onClick={() => setSearchOpen(s => !s)}>
            <Search className="w-5 h-5" />
          </button>
          <Link to="/account" aria-label="Account"><User className="w-5 h-5" /></Link>
          <Link to="/cart" aria-label="Cart" className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-2 -right-2 bg-gold text-navy-deep text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{count}</span>
          </Link>
        </div>
      </div>
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-white border-b border-border shadow-lg">
          <form onSubmit={submitSearch} className="container-x py-4 flex gap-3">
            <input
              autoFocus
              value={q}
              onChange={e => setQ(e.target.value)}
              placeholder="Search peptides, articles, COAs..."
              className="flex-1 border border-border px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <button type="submit" className="px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
              SEARCH
            </button>
          </form>
        </div>
      )}
    </header>
  );
}
