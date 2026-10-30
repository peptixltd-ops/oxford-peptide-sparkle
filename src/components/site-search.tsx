import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  MAX_SEARCH_SUGGESTIONS,
  searchProductSuggestions,
  suggestionPriceLabel,
} from "@/lib/product-search";

/**
 * Header search field with live product suggestions.
 *
 * Typing from one character opens a dropdown of up to eight matching products;
 * arrows move the selection, Enter opens it, and Enter with nothing selected
 * keeps the existing search-results behaviour. Escape and any click outside
 * close the dropdown.
 */
export function SiteSearch({ onSubmit }: { onSubmit: (query: string) => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const term = q.trim();
  const matches = term ? searchProductSuggestions(term, MAX_SEARCH_SUGGESTIONS) : [];
  const showList = open && term.length > 0;

  // Dismiss the dropdown on a click anywhere outside the field and its list.
  useEffect(() => {
    if (!showList) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [showList]);

  // Keep the keyboard-selected suggestion visible inside the scrollable list.
  useEffect(() => {
    if (active < 0) return;
    listRef.current
      ?.querySelector(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      if (!matches.length) return;
      e.preventDefault();
      if (!showList) {
        setOpen(true);
        setActive(0);
        return;
      }
      const n = matches.length;
      setActive((i) => {
        if (i < 0) return e.key === "ArrowDown" ? 0 : n - 1;
        return e.key === "ArrowDown" ? (i + 1) % n : (i - 1 + n) % n;
      });
      return;
    }

    // Only hijack Enter when a suggestion is highlighted; otherwise let the
    // form submit and go to the normal search results page.
    if (e.key === "Enter" && showList && active >= 0 && matches[active]) {
      e.preventDefault();
      setOpen(false);
      setActive(-1);
      navigate({ to: "/products/$slug", params: { slug: matches[active].slug } });
    }
  };

  return (
    <form
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        setOpen(false);
        setActive(-1);
        onSubmit(term);
      }}
      className="container-x py-4 flex gap-3"
    >
      <div ref={wrapRef} className="relative flex-1">
        <label htmlFor="site-search" className="sr-only">
          Search
        </label>
        <input
          id="site-search"
          type="text"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={showList}
          aria-controls={showList ? "site-search-suggestions" : undefined}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `site-search-option-${active}` : undefined}
          autoComplete="off"
          autoFocus
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search peptides, articles, COAs..."
          className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-gold focus-visible:outline-2 focus-visible:outline-gold"
        />
        {showList && (
          <ul
            id="site-search-suggestions"
            ref={listRef}
            role="listbox"
            aria-label="Product suggestions"
            className="absolute left-0 right-0 top-full z-30 mt-1 max-h-[70vh] overflow-y-auto border border-border bg-white py-1 shadow-lg"
          >
            {matches.length === 0 && (
              <li className="px-4 py-3 text-sm text-muted-foreground">No products found</li>
            )}
            {matches.map((p, i) => (
              <li
                key={p.slug}
                id={`site-search-option-${i}`}
                data-index={i}
                role="option"
                aria-selected={i === active}
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => {
                    setOpen(false);
                    setActive(-1);
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 px-3 py-2 transition-colors ${
                    i === active ? "bg-bone" : "hover:bg-bone"
                  }`}
                >
                  <img
                    src={p.img}
                    width={40}
                    height={40}
                    alt=""
                    decoding="async"
                    className="h-10 w-10 shrink-0 object-contain"
                  />
                  <span className="min-w-0 flex-1 truncate font-display text-sm font-semibold leading-snug text-navy-deep">
                    {p.name}
                  </span>
                  <span className="shrink-0 text-xs font-bold text-navy-deep whitespace-nowrap">
                    {suggestionPriceLabel(p)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        type="submit"
        className="px-6 py-3 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors focus-visible:outline-2 focus-visible:outline-gold"
      >
        SEARCH
      </button>
    </form>
  );
}
