"use client";

import { Route } from "@/views/cancellation-policy";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
