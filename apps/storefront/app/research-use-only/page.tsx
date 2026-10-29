"use client";

import { Route } from "@/views/research-use-only";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
