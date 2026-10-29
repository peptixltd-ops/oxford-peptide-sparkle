"use client";

import { Route } from "@/views/index";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
