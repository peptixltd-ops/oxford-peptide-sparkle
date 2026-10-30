import { useEffect, useState } from "react";
import { Truck, Zap } from "lucide-react";

/** Cut-off: 2pm UK time, Monday–Friday. */
const CUTOFF_HOUR = 14;

function londonParts(d: Date) {
  const f = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    hour12: false,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  }).formatToParts(d);
  const get = (t: string) => f.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    second: Number(get("second")),
  };
}

type State = { open: boolean; h: number; m: number; s: number };

export function compute(now: Date): State {
  const { weekday, hour, minute, second } = londonParts(now);
  const isWeekend = weekday === "Sat" || weekday === "Sun";
  const secsNow = hour * 3600 + minute * 60 + second;
  const cutoff = CUTOFF_HOUR * 3600;
  if (isWeekend || secsNow >= cutoff) return { open: false, h: 0, m: 0, s: 0 };
  const left = cutoff - secsNow;
  return {
    open: true,
    h: Math.floor(left / 3600),
    m: Math.floor((left % 3600) / 60),
    s: left % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function DispatchCountdown() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    setState(compute(new Date()));
    const id = setInterval(() => setState(compute(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border border-gold/50 bg-gold/10 p-4 mb-6">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="inline-flex items-center gap-1.5 bg-navy-deep text-bone px-3 py-1.5 text-[10px] font-bold tracking-widest">
          <Zap className="w-3 h-3 text-gold" aria-hidden="true" />
          UK DISPATCH
        </span>
        <p className="text-sm text-navy-deep font-medium" aria-live="polite">
          {state === null ? (
            <>Orders placed before 2pm (UK time) on a working day are dispatched the same day.</>
          ) : state.open ? (
            <>
              Orders placed before <span className="font-bold">2pm (UK time)</span> on a working day are dispatched the same day. Time until 2pm:{" "}
              <span className="font-bold tabular-nums text-navy-deep">
                {state.h > 0 ? `${state.h} hour${state.h === 1 ? "" : "s"}, ` : ""}
                {state.m} minute{state.m === 1 ? "" : "s"}
                {state.h === 0 ? `, ${pad(state.s)} seconds` : ""}
              </span>
            </>
          ) : (
            <>Orders placed before 2pm (UK time) on a working day are dispatched the same day. Otherwise, dispatch is on the next working day.</>
          )}
        </p>
      </div>
      <div className="mt-3 flex items-center gap-2 border-t border-gold/30 pt-3">
        <span className="inline-flex items-center gap-2 border border-navy-deep px-2.5 py-1">
          <Truck className="w-4 h-4 text-navy-deep" aria-hidden="true" />
          <span className="text-[10px] font-bold tracking-widest text-navy-deep">
            ROYAL MAIL <span className="text-gold">TRACKED 24</span>
          </span>
        </span>
        <span className="text-xs text-muted-foreground">Next working day delivery (Tracked 24) · discreet UK delivery</span>
      </div>
    </div>
  );
}
