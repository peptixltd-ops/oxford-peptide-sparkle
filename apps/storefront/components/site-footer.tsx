"use client";
import { Link } from "@/shims/router";
import { Instagram, Twitter, Mail, ArrowRight } from "lucide-react";
import { Logo } from "./site-header";
const orsLogo = { url: "/brand/oxford-research-syndicate.webp" };
import { useRef, useState } from "react";
import { saveDiscount } from "@/lib/discount-code";
import { Button } from "@/components/ui/button";


const cols = [
  { h: "SHOP", links: [
    { l: "All Peptides", to: "/shop" },
    { l: "Bestsellers", to: "/shop" },
  ] },
  { h: "COMPANY", links: [
    { l: "About Us", to: "/about" },
    { l: "Contact Us", to: "/contact" },
    { l: "FAQs", to: "/faqs" },
    { l: "Sitemap", to: "/sitemap" },
  ] },
  { h: "LEGAL", links: [
    { l: "Privacy Policy", to: "/privacy-policy" },
    { l: "Terms & Conditions", to: "/terms" },
    { l: "Cookie Policy", to: "/cookie-policy" },
    { l: "Disclaimer", to: "/disclaimer" },
  ] },
  { h: "TRUST", links: [
    { l: "Testing & Quality Control", to: "/testing-and-quality-control" },
    { l: "Certificate of Analysis", to: "/certificate-of-analysis" },
    { l: "Research Use Only", to: "/research-use-only" },
  ] },

  { h: "POLICIES", links: [
    { l: "Refund Policy", to: "/refund-policy" },
    { l: "Shipping Policy", to: "/shipping-policy" },
    { l: "Cancellation Policy", to: "/cancellation-policy" },
  ] },
] as const;

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [welcomeCode, setWelcomeCode] = useState("");
  const submitting = useRef(false);

  async function subscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || welcomeCode) return;
    setSignupError("");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || email.trim().length > 255) {
      setSignupError("Please enter a valid email address.");
      return;
    }
    submitting.current = true;
    setPending(true);
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), source: "footer", website: form.get("website") ?? "" }),
      });
      const data = await response.json() as { success?: boolean; code?: string; error?: string };
      if (!response.ok || data.success !== true || !data.code) {
        setSignupError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setWelcomeCode(data.code);
      saveDiscount(data.code);
      try { localStorage.setItem("orp_newsletter_prompt", "subscribed"); } catch { /* storage unavailable */ }
      const tracking = window as unknown as { gtag?: (...args: unknown[]) => void };
      tracking.gtag?.("event", "newsletter_signup", { has_phone: false, source: "footer" });
    } catch {
      setSignupError("Network error. Please try again.");
    } finally {
      submitting.current = false;
      setPending(false);
    }
  }

  return (
    <footer className="w-full max-w-full overflow-x-clip bg-navy-deep text-bone">
      <div className="container-x grid min-w-0 grid-cols-2 gap-8 py-14 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2 min-w-0">
          <div className="inline-block max-w-full rounded-sm bg-white p-3">
            <img src={orsLogo.url} width={936} height={248} loading="lazy" decoding="async" alt="Oxford Research Syndicate Ltd" className="h-auto max-h-14 max-w-full w-auto" />
          </div>
          <p className="text-bone/60 text-xs mt-5 max-w-xs leading-relaxed">

            This brand is owned and operated by <strong className="text-bone/90">Oxford Research Syndicate Ltd</strong>, a company registered in England & Wales.
          </p>
          <ul className="text-bone/60 text-xs mt-4 space-y-1 leading-relaxed">
            <li>Company Reg. No. <span className="text-bone/90">17207898</span></li>
            <li>131a Movers Lane</li>
            <li>Barking, Essex, IG11 7UQ</li>
            <li>United Kingdom</li>
          </ul>
          <div className="flex gap-3 mt-5">
            <a href="#" aria-label="Instagram" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="#" aria-label="Twitter" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="mailto:info@oxfordresearchpeptides.com" aria-label="Email" className="w-9 h-9 border border-bone/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"><Mail className="w-4 h-4" /></a>
          </div>
        </div>
        {cols.map(col => (
          <div key={col.h} className="min-w-0">
            <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">{col.h}</h4>
            <ul className="space-y-2.5 text-xs text-bone/70">
              {col.links.map(l => (
                <li key={l.l}><Link to={l.to} className="hover:text-gold transition-colors">{l.l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
        <div className="col-span-2 min-w-0 md:col-span-1 lg:col-span-1">
          <h4 className="text-[11px] font-bold tracking-[0.2em] text-gold mb-4">STAY UPDATED</h4>
          <p className="text-xs text-bone/70 mb-4">Get the latest research notes and catalogue updates.</p>
          <form onSubmit={subscribe} noValidate className="flex w-full" aria-label="Newsletter signup">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <input type="email" name="email" aria-label="Your email" autoComplete="email" required maxLength={255} placeholder="Your email"
              value={email} onChange={event => setEmail(event.target.value)} aria-invalid={!!signupError} aria-describedby={signupError ? "footer-newsletter-error" : undefined}
              className="min-w-0 flex-1 bg-white/5 border border-bone/20 px-3 py-2.5 text-xs outline-none focus:border-gold" />
            <Button type="submit" disabled={pending || !!welcomeCode} className="h-auto shrink-0 rounded-none px-4 py-0 bg-gold text-navy-deep hover:bg-gold/90 shadow-none" aria-label="Subscribe" aria-busy={pending}><ArrowRight className="w-4 h-4" /></Button>
          </form>
          {signupError && <p id="footer-newsletter-error" role="alert" className="mt-3 text-xs text-bone/90">{signupError}</p>}
          {welcomeCode && <p role="status" className="mt-3 text-xs text-bone/90 break-words">You're subscribed. Your 10% off code <strong className="text-gold">{welcomeCode}</strong> has been applied to your basket.</p>}
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="container-x py-5 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-bone/50 text-center md:text-left">
          <div>© 2026 Oxford Research Syndicate Ltd. All Rights Reserved.</div>
          <div>Research Use Only. Not for Human or Animal Consumption.</div>
        </div>
      </div>
    </footer>
  );
}
