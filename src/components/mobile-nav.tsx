import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type NavLink = { to: string; label: string };

type Props = {
  open: boolean;
  onClose: () => void;
  links: readonly NavLink[];
};

/**
 * Full-height mobile navigation drawer. Uses the existing brand tokens
 * (navy-deep / bone / gold) so it inherits the site's visual identity.
 * Traps Escape to close and locks background scroll while open.
 */
export function MobileNav({ open, onClose, links }: Props) {
export function MobileNav({ open, onClose, links }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  // Rendered in a portal on <body> so the drawer always paints above page
  // content (previously hero text bled through because the header's stacking
  // context sat below later siblings on the page).
  return createPortal(
    <div
      className="fixed inset-0 z-[100] lg:hidden isolate"
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
    >
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-navy-deep text-bone shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 h-20 border-b border-white/10">

          <span className="text-[11px] font-bold tracking-[0.3em] text-gold">MENU</span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="min-h-11 min-w-11 inline-flex items-center justify-center focus-visible:outline-2 focus-visible:outline-gold"
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={onClose}
                  className="block px-6 py-4 text-sm font-semibold tracking-widest border-b border-white/5 hover:bg-white/5 hover:text-gold focus-visible:bg-white/5 focus-visible:text-gold transition-colors"
                  activeProps={{ className: "text-gold" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-6 py-5 border-t border-white/10 text-[11px] text-bone/60">
          For laboratory research use only.
        </div>
      </div>
    </div>
  );
}
