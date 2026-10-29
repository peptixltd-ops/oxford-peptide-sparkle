"use client";

import { useBottomLayerHeight } from "@/lib/overlays";

export function WhatsAppButton() {
  const bottomLayer = useBottomLayerHeight();
  return (
    <a
      href="https://wa.me/447457404317?text=Hi%20there%2C%20I%20have%20a%20question%20about%20your%20products.%20Can%20you%20assist%20me%20please%3F"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message us on WhatsApp"
      style={bottomLayer > 0 ? { bottom: `calc(${bottomLayer}px + 1rem)` } : undefined}
      className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-navy-deep shadow-lg transition-transform hover:scale-105 hover:bg-gold-soft focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-9.763A8.967 8.967 0 0 0 12 3c-4.97 0-9 4.03-9 9 0 1.58.415 3.096 1.19 4.42l-1.26 3.66 3.75-.99A8.957 8.957 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m0 16.5a7.46 7.46 0 0 1-3.823-1.054l-.273-.153-2.78.733.745-2.71-.174-.29A7.463 7.463 0 0 1 4.5 12c0-4.136 3.364-7.5 7.5-7.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5" />
      </svg>
    </a>
  );
}
