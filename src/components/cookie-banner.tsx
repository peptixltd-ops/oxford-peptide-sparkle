import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { tiktokSetConsent } from "@/lib/tiktok";
import { useCart } from "@/lib/cart";
import { setOverlayOpen } from "@/lib/overlays";

const KEY = "orp_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* ignore */
    }
  }, []);

  const set = (value: "accepted" | "rejected") => {
    try { localStorage.setItem(KEY, value); } catch { /* ignore */ }
    tiktokSetConsent(value);
    setVisible(false);
  };

  const { drawerOpen } = useCart();
  // One overlay at a time: the banner steps aside while the cart drawer is open.
  const shown = visible && !drawerOpen;
  useEffect(() => {
    setOverlayOpen("cookieBanner", shown);
    return () => setOverlayOpen("cookieBanner", false);
  }, [shown]);

  if (!shown) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-navy-deep text-bone border-t border-gold/40">
      <div className="container-x py-4 flex flex-col md:flex-row items-start md:items-center gap-4 text-xs">
        <p className="flex-1 leading-relaxed text-bone/85">
          We use cookies to operate this site, measure performance and provide a better experience.
          You can accept all cookies or reject non-essential cookies. See our{" "}
          <Link to="/cookie-policy" className="text-gold underline">Cookie Policy</Link>.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={() => set("rejected")} className="px-4 py-2 border border-bone/30 text-bone/90 font-bold tracking-widest hover:bg-bone/5">
            REJECT
          </button>
          <button onClick={() => set("accepted")} className="px-4 py-2 bg-gold text-navy-deep font-bold tracking-widest hover:opacity-90">
            ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  );
}
