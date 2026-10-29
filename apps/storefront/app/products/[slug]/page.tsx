"use client";

import { Route } from "@/views/products.$slug";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
