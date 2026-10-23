import { useState } from "react";
import { clearDiscount, normalizeDiscountCode, saveDiscount, useSavedDiscount } from "@/lib/discount-code";

export function DiscountCodeBox() {
  const code = useSavedDiscount();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  if (code) {
    return (
      <p className="text-xs text-navy-deep">
        Discount code <strong>{code}</strong> applied at checkout{" "}
        <button type="button" onClick={clearDiscount} className="underline text-muted-foreground hover:text-navy-deep ml-1">
          Remove
        </button>
      </p>
    );
  }

  return (
    <form
      className="flex gap-2 items-start"
      onSubmit={(e) => {
        e.preventDefault();
        if (!normalizeDiscountCode(value)) return setError("Enter a valid code");
        setError("");
        saveDiscount(value);
        setValue("");
      }}
    >
      <div className="flex-1">
        <label htmlFor="discount-code" className="sr-only">Have a discount code?</label>
        <input
          id="discount-code"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Have a discount code?"
          className="w-full border border-border bg-background px-3 py-2 text-xs"
        />
        {error && <p className="text-xs text-destructive mt-1">{error}</p>}
      </div>
      <button type="submit" className="px-3 py-2 border border-navy-deep text-xs font-bold tracking-widest">
        APPLY
      </button>
    </form>
  );
}
