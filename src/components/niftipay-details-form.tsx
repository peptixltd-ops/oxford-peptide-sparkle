// Customer-details step shown before every NiftiPay card payment.
// Mounted imperatively by the shared client helper so every card button gets it.
// Autofill: every field carries a real name/id and an autocomplete token, so iOS
// Safari (Apple Pay contact + saved addresses) and Chrome/Android (Google Pay
// saved contacts and addresses) can fill the whole form in one tap.
import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Loader2, X } from "lucide-react";

import { COUNTRIES, customerSchema, type CustomerDetails } from "@/lib/niftipay-customer";

const STORAGE_KEY = "orp_niftipay_customer_v1";
const FORM_ID = "niftipay-details-form";
const EMPTY: CustomerDetails = { name: "", email: "", phone: "", address1: "", address2: "", city: "", postcode: "", country: "GB" };

type FieldAttrs = {
  id: string;
  name: string;
  autoComplete: string;
  inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoCompleteType?: React.SelectHTMLAttributes<HTMLSelectElement>["autoComplete"];
};

// Autocomplete tokens are fixed here and applied last, so no call site can turn
// autofill off. Plain standard tokens with each input's id and name matching its
// token give iOS Safari (Apple Pay contact + saved addresses) and Chrome/Android
// (Google Pay saved contacts and addresses) the best one-tap fill.
const FIELD_ATTRS: Record<keyof CustomerDetails, FieldAttrs> = {
  name: { id: "name", name: "name", autoComplete: "name", inputMode: "text" },
  email: { id: "email", name: "email", autoComplete: "email", inputMode: "email" },
  phone: { id: "tel", name: "tel", autoComplete: "tel", inputMode: "tel" },
  address1: { id: "address-line1", name: "address-line1", autoComplete: "address-line1", inputMode: "text" },
  address2: { id: "address-line2", name: "address-line2", autoComplete: "address-line2", inputMode: "text" },
  city: { id: "address-level2", name: "address-level2", autoComplete: "address-level2", inputMode: "text" },
  postcode: { id: "postal-code", name: "postal-code", autoComplete: "postal-code", inputMode: "text" },
  country: { id: "country", name: "country", autoComplete: "country" },
};

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
  // Typed loosely on purpose: browser autofill can fire onChange or onInput
  // with different event shapes, and filled values must stick either way.
  const set = (k: keyof CustomerDetails) => (e: { target: EventTarget | null }) => {
    const el = e.target as HTMLInputElement | HTMLSelectElement | null;
    if (el) setV({ ...v, [k]: el.value });
  };

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

  const field = (k: keyof CustomerDetails, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => {
    const a = FIELD_ATTRS[k];
    return (
      <label className="block" htmlFor={a.id}>
        <span className="block text-[11px] font-bold tracking-widest text-navy-deep mb-1">{label}</span>
        <input
          value={v[k] ?? ""}
          onChange={set(k)}
          onInput={set(k)}
          aria-invalid={Boolean(errors[k])}
          className="w-full border border-border bg-background px-3 py-2.5 text-base text-navy-deep focus:outline-none focus:ring-2 focus:ring-navy"
          {...props}
          // Autofill attributes applied last: nothing may disable them.
          id={a.id}
          name={a.name}
          autoComplete={a.autoComplete}
          {...(a.inputMode ? { inputMode: a.inputMode } : {})}
        />
        {errors[k] && <span className="block text-xs text-destructive mt-1">{errors[k]}</span>}
      </label>
    );
  };

  const country = FIELD_ATTRS.country;

  return (
    <div className="fixed inset-0 z-[150] flex items-end sm:items-center justify-center bg-navy-deep/70 p-0 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="np-details-title">
      <form
        id={FORM_ID}
        name="niftipay-details"
        autoComplete="on"
        onSubmit={submit}
        noValidate
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto bg-bone border border-border p-6 sm:p-8"
      >
        <button type="button" onClick={() => onDone(null)} aria-label="Close" className="absolute right-4 top-4 text-navy-deep/70 hover:text-navy-deep">
          <X className="h-5 w-5" />
        </button>
        <h2 id="np-details-title" className="font-display text-2xl font-medium text-navy-deep mb-1">Delivery details</h2>
        <p className="text-sm text-muted-foreground mb-5">We need these to ship your order. You'll pay on the next screen.</p>
        <div className="space-y-3">
          {field("name", "FULL NAME")}
          <div className="grid sm:grid-cols-2 gap-3">
            {field("email", "EMAIL", { type: "email" })}
            {field("phone", "PHONE", { type: "tel" })}
          </div>
          {field("address1", "ADDRESS LINE 1")}
          {field("address2", "ADDRESS LINE 2 (OPTIONAL)")}
          <div className="grid grid-cols-2 gap-3">
            {field("city", "TOWN / CITY")}
            {field("postcode", "POSTCODE")}
          </div>
          <label className="block" htmlFor={country.id}>
            <span className="block text-[11px] font-bold tracking-widest text-navy-deep mb-1">COUNTRY</span>
            <select
              value={v.country}
              onChange={set("country")}
              onInput={set("country")}
              id={country.id}
              name={country.name}
              autoComplete={country.autoComplete}
              className="w-full border border-border bg-background px-3 py-2.5 text-base text-navy-deep focus:outline-none focus:ring-2 focus:ring-navy"
            >
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
