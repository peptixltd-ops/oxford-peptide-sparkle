"use client";

import { Route } from "@/views/faqs";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
