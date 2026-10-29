"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ProductTracker({ handle, title, price }: { handle: string; title: string; price: number }) {
  useEffect(() => { track("view_item", { currency: "GBP", value: price, items: [{ item_id: handle, item_name: title, price }] }); }, [handle, title, price]);
  return null;
}
