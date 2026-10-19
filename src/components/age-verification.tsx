import { useEffect, useState, type ReactNode } from "react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { Shield } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "@/assets/oxford-logo-dialog.webp.asset.json";
import { setOverlayOpen } from "@/lib/overlays";
import { AGE_CONFIRMATION_KEY, isAgeConfirmed } from "@/lib/age-confirmation";

export function AgeVerification({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    try {
      setConfirmed(sessionStorage.getItem(AGE_CONFIRMATION_KEY) === "true");
    } catch {
      // Storage restrictions must not prevent confirming for this visit.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    setOverlayOpen("ageGate", !(ready && confirmed));
  }, [ready, confirmed]);

  const confirm = (checked: boolean | "indeterminate") => {
    if (!isAgeConfirmed(checked)) return;
    try {
      sessionStorage.setItem(AGE_CONFIRMATION_KEY, "true");
    } catch {
      // Keep the confirmation in memory when browser storage is unavailable.
    }
    setConfirmed(true);
  };

  return (
    <>
      {ready && confirmed ? children : null}
      <AlertDialog.Root open={ready && !confirmed}>
        <AlertDialog.Portal>
          <AlertDialog.Overlay className="fixed inset-0 z-[200] bg-navy-deep/70 backdrop-blur-sm" />
          <AlertDialog.Content
            className="fixed left-1/2 top-1/2 z-[201] w-[calc(100%-2rem)] max-w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-md border border-border border-t-[3px] border-t-gold bg-background px-6 py-8 text-center text-foreground shadow-xl sm:px-9 sm:py-10"
            onEscapeKeyDown={(event) => event.preventDefault()}
          >
            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center">
              <Shield className="absolute inset-0 h-16 w-16 text-gold" strokeWidth={1.2} aria-hidden="true" />
              <span className="text-lg font-semibold">18+</span>
            </div>
            <img src={logo.url} alt="Oxford Research Peptides" width={230} height={70} className="mx-auto mb-6 h-16 w-auto max-w-full object-contain" />
            <AlertDialog.Title className="font-display text-4xl font-medium leading-tight">
              Age confirmation
            </AlertDialog.Title>
            <AlertDialog.Description className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Please confirm you are 18 or over to enter.
            </AlertDialog.Description>
            <label htmlFor="age-confirmation" className="mt-7 flex min-h-16 cursor-pointer items-center gap-4 rounded-sm border border-border px-5 py-4 text-left">
              <Checkbox id="age-confirmation" className="h-6 w-6" checked={confirmed} onCheckedChange={confirm} />
              <span className="text-base font-semibold">I am 18 or over</span>
            </label>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              Research Use Only.<br />
              Not for Human or Animal Consumption.
            </p>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}