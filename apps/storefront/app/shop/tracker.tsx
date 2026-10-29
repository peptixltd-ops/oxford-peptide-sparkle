"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function ShopTracker({ ids }: { ids: string[] }) {
  useEffect(() => { track("view_item_list", { item_list_id: "shop", items: ids.map((id) => ({ item_id: id })) }); }, [ids]);
  return null;
}
