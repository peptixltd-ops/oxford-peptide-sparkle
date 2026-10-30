"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CartProvider } from "@/lib/cart";
import { Toaster } from "@/components/ui/sonner";
import { CookieBanner } from "@/components/cookie-banner";
import { SkipToContent } from "@/components/skip-to-content";
import { NewsletterPopup } from "@/components/NewsletterPopup";
import { AgeVerification } from "@/components/age-verification";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { discountFromSearch, saveDiscount } from "@/lib/discount-code";
import { toast } from "sonner";

function DiscountCapture() {
  const search = useSearchParams();
  useEffect(() => {
    const code = saveDiscount(discountFromSearch(search.toString() ? `?${search.toString()}` : ""));
    if (code) toast(`Discount ${code} will be applied at checkout`);
  }, [search]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <SkipToContent />
      <DiscountCapture />
      {children}
      <Toaster />
      <AgeVerification>
        <CookieBanner />
        <NewsletterPopup />
        <WhatsAppButton />
      </AgeVerification>
    </CartProvider>
  );
}
