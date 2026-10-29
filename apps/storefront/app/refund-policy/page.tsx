"use client";

import { Route } from "@/views/refund-policy";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
