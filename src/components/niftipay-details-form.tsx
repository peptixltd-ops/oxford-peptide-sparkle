// Customer-details step shown before every NiftiPay card payment.
// Mounted imperatively by the shared client helper so every card button gets it.
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { z } from "zod";
import { Loader2, X } from "lucide-react";

export const COUNTRIES = [
  ["GB", "United Kingdom"], ["IE", "Ireland"], ["FR", "France"], ["DE", "Germany"], ["ES", "Spain"],
  ["IT", "Italy"], ["NL", "Netherlands"], ["BE", "Belgium"], ["PT", "Portugal"], ["SE", "Sweden"],
  ["DK", "Denmark"], ["NO", "Norway"], ["CH", "Switzerland"], ["AT", "Austria"], ["PL", "Poland"],
  ["US", "United States"], ["CA", "Canada"], ["AU", "Australia"],
] as const;

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  address1: z.string().trim().min(3, "Enter your address").max(200),
  address2: z.string().trim().max(200).optional().default(""),
  city: z.string().trim().min(2, "Enter your town or city").max(100),
  postcode: z.string().trim().min(2, "Enter your postcode").max(20),
  country: z.enum(COUNTRIES.map((c) => c[0]) as [string, ...string[]]),
});
export type CustomerDetails = z.infer<typeof customerSchema>;

const STORAGE_KEY = "orp_niftipay_customer_v1";
const EMPTY: CustomerDetails = { name: "", email: "", phone: "", address1: "", address2: "", city: "", postcode: "", country: "GB" };

function loadSaved(): CustomerDetails {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY;
  } catch {
    return EMPTY;
  }
}

type Result = { details: CustomerDetails } | null;

function DetailsForm({ onDone }: { onDone: (r: Result) => void }) {
  const [v, setV] = useState<CustomerDetails>(loadSaved);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof CustomerDetails) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setV({ ...v, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = customerSchema.safeParse(v);
    if (!r.success) {
      const errs: Record<string, string> = {};
      for (const i of r.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      return;
    }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(r.data)); } catch { /* ignore */ }
    onDone({ details: r.data });
  };

  const field = (k: keyof CustomerDetails, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <label className="block">
      <span className="block text-[11px] font-bold tracking-widest text-navy-deep mb-1">{label}</span>
      <input
        value={v[k] ?? ""}
        onChange={set(k)}
        aria-invalid={Boolean(errors[k])}
        className="w-full border border-border bg-background px-3 py-2.5 text-base text-navy-deep focus:outline-none focus:ring-2 focus:ring-navy"
        {...props}
      />
      {errors[k] && <span className="block text-xs text-destructive mt-1">{errors[k]}</span>}
    </label>
  );

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-navy-deep/70 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="np-details-title">
      <form onSubmit={submit} noValidate className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-bone border border-border p-6 sm:p-8">
        <button type="button" onClick={() => onDone(null)} aria-label="Close" className="absolute right-4 top-4 text-navy-deep/70 hover:text-navy-deep">
          <X className="h-5 w-5" />
        </button>
        <h2 id="np-details-title" className="font-display text-2xl font-medium text-navy-deep mb-1">Delivery details</h2>
        <p className="text-sm text-muted-foreground mb-5">We need these to ship your order. You'll pay on the next screen.</p>
        <div className="space-y-3">
          {field("name", "FULL NAME", { autoComplete: "name" })}
          <div className="grid sm:grid-cols-2 gap-3">
            {field("email", "EMAIL", { type: "email", autoComplete: "email", inputMode: "email" })}
            {field("phone", "PHONE", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
          </div>
          {field("address1", "ADDRESS LINE 1", { autoComplete: "address-line1" })}
          {field("address2", "ADDRESS LINE 2 (OPTIONAL)", { autoComplete: "address-line2" })}
          <div className="grid grid-cols-2 gap-3">
            {field("city", "TOWN / CITY", { autoComplete: "address-level2" })}
            {field("postcode", "POSTCODE", { autoComplete: "postal-code" })}
          </div>
          <label className="block">
            <span className="block text-[11px] font-bold tracking-widest text-navy-deep mb-1">COUNTRY</span>
            <select value={v.country} onChange={set("country")} autoComplete="country"
              className="w-full border border-border bg-background px-3 py-2.5 text-base text-navy-deep focus:outline-none focus:ring-2 focus:ring-navy">
              {COUNTRIES.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
        </div>
        <button type="submit" className="mt-6 w-full px-7 py-3.5 bg-navy-deep text-bone text-xs font-bold tracking-widest hover:bg-navy transition-colors">
          CONTINUE TO SECURE PAYMENT
        </button>
        <button type="button" onClick={() => onDone(null)} className="mt-3 w-full text-xs font-bold tracking-widest text-navy-deep/70 hover:text-navy-deep">
          BACK
        </button>
      </form>
    </div>
  );
}

/** Shows the form; resolves with the details (submit = user gesture) or null if closed. */
export function collectCustomerDetails(onSubmitGesture: () => void): Promise<CustomerDetails | null> {
  return new Promise((resolve) => {
    const host = document.createElement("div");
    document.body.appendChild(host);
    const root = createRoot(host);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const done = (r: Result) => {
      if (r) onSubmitGesture(); // open the payment tab inside the click
      document.body.style.overflow = prevOverflow;
      root.unmount();
      host.remove();
      resolve(r ? r.details : null);
    };
    root.render(<DetailsForm onDone={done} />);
  });
}
