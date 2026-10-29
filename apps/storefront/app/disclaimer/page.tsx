"use client";

import { Route } from "@/views/disclaimer";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
