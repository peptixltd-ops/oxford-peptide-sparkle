"use client";

import { Route } from "@/views/testing-and-quality-control";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
