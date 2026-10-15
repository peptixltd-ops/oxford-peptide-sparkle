import { Link, useNavigate } from "@tanstack/react-router";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import oxfordLogo from "@/assets/oxford-logo.jpg.asset.json";
import { useCart } from "@/lib/cart";
import { MobileNav } from "./mobile-nav";
import { CartDrawer } from "./cart-drawer";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center group" aria-label="Oxford Research Peptides — Home">
      {/* The logo artwork is navy-on-white, so on dark surfaces it sits on a white
          plate rather than being colour-inverted (inverting flattened it to a blank block). */}
      <span className={light ? "inline-block bg-white rounded-sm px-3 py-2" : "inline-block"}>
        <img
          src={oxfordLogo.url}
          width={1920}
          height={693}
          decoding="async"
          alt="Oxford Research Peptides"
          className="h-12 w-auto object-contain"
        />
      </span>
    </Link>
  );
}


// Simplified navigation: commerce-first, secondary sections live in the footer.
export const navLinks = [
  { to: "/about", label: "ABOUT" },
  { to: "/shop", label: "SHOP" },
  { to: "/coas", label: "COAS" },
  { to: "/contact", label: "CONTACT" },
  { to: "/faqs", label: "FAQS" },
] as const;


export function SiteHeader() {
  const { count, bump, openDrawer } = useCart();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [q, setQ] = useState("");
  const [pop, setPop] = useState(false);

  // Pulse the cart badge each time an item is added.
  useEffect(() => {
    if (bump === 0) return;
    setPop(true);
    const t = setTimeout(() => setPop(false), 550);
    return () => clearTimeout(t);
  }, [bump]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate({ to: "/search", search: { q } });
  };

  return (
    <header className="bg-white border-b border-border relative z-20">
      <div className="container-x flex items-center justify-between h-20 gap-4">
        <Logo />
        <nav
          aria-label="Primary"
          className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-widest"
        >
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="hover:text-gold focus-visible:text-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-4"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4 md:gap-5">
          <button
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((s) => !s)}
            className="min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
          >
            <Search className="w-5 h-5" aria-hidden="true" />
          </button>
          <Link
            to="/account"
            aria-label="Account"
            className="min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
          >
            <User className="w-5 h-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={openDrawer}
            aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
          >
            <ShoppingBag className={`w-5 h-5 ${pop ? "animate-badge-pop" : ""}`} aria-hidden="true" />
            <span
              aria-hidden="true"
              className={`absolute top-1 right-1 bg-gold text-navy-deep text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${pop ? "animate-badge-pop" : ""}`}
            >
              {count}
            </span>
          </button>
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
            className="lg:hidden min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
          >
            <Menu className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="absolute inset-x-0 top-full bg-white border-b border-border shadow-lg">
          <form onSubmit={submitSearch} className="container-x py-4 flex gap-3">
            <label htmlFor="site-search" className="sr-only">
              Search
            </label>
            <input
              id="site-search"
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search peptides, articles, COAs..."
              className="flex-1 border border-border px-4 py-3 text-sm outline-none focus:border-gold focus-visible:outline-2 focus-visible:outline-gold"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
            >
              SEARCH
            </button>
          </form>
        </div>
      )}
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} links={navLinks} />
      <CartDrawer />
    </header>
  );
}
