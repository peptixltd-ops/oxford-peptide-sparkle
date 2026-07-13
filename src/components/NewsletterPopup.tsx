import { useEffect, useRef, useState } from "react";

type Status = "form" | "loading" | "success" | "error";

const KEY = "orp_newsletter_prompt";
const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
const DELAY_MS = 8000;

function shouldShow(): boolean {
  try {
    const v = localStorage.getItem(KEY);
    if (!v) return true;
    if (v === "subscribed") return false;
    const ts = Number(v);
    if (!Number.isFinite(ts)) return true;
    return Date.now() - ts > SEVEN_DAYS;
  } catch {
    return true;
  }
}

function trackGA(event: string, params: Record<string, unknown> = {}) {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.("event", event, params);
  } catch {
    /* ignore */
  }
}

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("form");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot
  const [errorMsg, setErrorMsg] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!shouldShow()) return;
    const t = window.setTimeout(() => {
      setOpen(true);
      trackGA("newsletter_popup_view");
    }, DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function dismiss() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch { /* ignore */ }
    trackGA("newsletter_popup_dismiss");
    setOpen(false);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (phone && !smsConsent) {
      setErrorMsg("Please tick the SMS consent box or leave phone empty.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/public/newsletter-subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          phone: phone.trim() || undefined,
          sms_consent: smsConsent,
          source: "popup",
          website,
        }),
      });
      const data = (await res.json()) as { success: boolean; code?: string; error?: string };
      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMsg(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setCode(data.code ?? "");
      setStatus("success");
      try { localStorage.setItem(KEY, "subscribed"); } catch { /* ignore */ }
      trackGA("newsletter_signup", { has_phone: !!phone });
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch { /* ignore */ }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="orp-newsletter-title"
    >
      <div
        className="absolute inset-0 bg-navy-deep/70 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />
      <div
        ref={dialogRef}
        className="relative w-full max-w-md rounded-lg bg-bone shadow-2xl border border-gold/30 p-8"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close"
          className="absolute right-3 top-3 h-9 w-9 flex items-center justify-center text-navy-deep/70 hover:text-navy-deep text-2xl leading-none"
        >
          ×
        </button>

        {status !== "success" && (
          <>
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold uppercase mb-3">
              Oxford Research Peptides
            </p>
            <h2
              id="orp-newsletter-title"
              className="font-display text-3xl leading-tight text-navy-deep mb-3"
            >
              Get 20% off your first order
            </h2>
            <p className="text-sm text-navy-deep/75 mb-6">
              Join the Oxford research list for launch alerts, batch drops, and a one-time
              20% off code delivered instantly.
            </p>

            <form onSubmit={submit} className="space-y-3" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div>
                <label htmlFor="orp-nl-email" className="sr-only">Email</label>
                <input
                  id="orp-nl-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full h-11 px-3 border border-navy-deep/25 bg-white text-navy-deep placeholder:text-navy-deep/40 focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label htmlFor="orp-nl-phone" className="sr-only">Phone</label>
                <input
                  id="orp-nl-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone (optional, e.g. +447700900123)"
                  className="w-full h-11 px-3 border border-navy-deep/25 bg-white text-navy-deep placeholder:text-navy-deep/40 focus:outline-none focus:border-gold"
                />
              </div>

              <label className="flex items-start gap-2 text-xs text-navy-deep/75 select-none">
                <input
                  type="checkbox"
                  checked={smsConsent}
                  onChange={(e) => setSmsConsent(e.target.checked)}
                  className="mt-0.5 accent-gold"
                />
                <span>Text me exclusive offers (optional). Required if a phone number is entered.</span>
              </label>

              {errorMsg && (
                <p role="alert" className="text-xs text-red-700 bg-red-50 border border-red-200 px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full h-11 bg-navy-deep text-bone font-bold tracking-widest text-sm hover:bg-navy disabled:opacity-60"
              >
                {status === "loading" ? "SENDING…" : "SEND MY CODE"}
              </button>

              <p className="text-[11px] text-navy-deep/55 leading-relaxed pt-1">
                For laboratory research use only. One code per address, valid 30 days.
              </p>
            </form>
          </>
        )}

        {status === "success" && (
          <div className="text-center py-4">
            <p className="text-[11px] font-bold tracking-[0.25em] text-gold uppercase mb-3">
              You're on the list
            </p>
            <h2 className="font-display text-3xl text-navy-deep mb-2">Your 20% code</h2>
            <p className="text-sm text-navy-deep/75 mb-5">
              We've emailed a copy. Use this code at checkout — valid 30 days.
            </p>
            <div className="border border-dashed border-gold bg-white px-4 py-4 mb-4">
              <div className="font-mono text-xl tracking-widest text-navy-deep">{code}</div>
            </div>
            <button
              type="button"
              onClick={copyCode}
              className="w-full h-11 bg-gold text-navy-deep font-bold tracking-widest text-sm hover:opacity-90"
            >
              {copied ? "COPIED" : "COPY CODE"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-3 text-xs text-navy-deep/60 underline"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
