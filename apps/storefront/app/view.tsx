"use client";

export function View({ route }: { route: { component?: React.ComponentType } }) {
  const Page = route.component;
  if (!Page) return null;
  return <Page />;
}
