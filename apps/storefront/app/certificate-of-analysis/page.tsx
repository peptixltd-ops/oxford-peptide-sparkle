"use client";

import { Route } from "@/views/certificate-of-analysis";

export default function Page() {
  const Screen = Route.component;
  if (!Screen) return null;
  return <Screen />;
}
