"use client";

import NextLink from "next/link";
import { usePathname, useRouter as useNextRouter, useSearchParams } from "next/navigation";
import type { ReactNode } from "react";

type Params = Record<string, string | number | undefined>;
type Search = Record<string, string | number | undefined> | string;

export function resolveHref(to = "/", params?: Params, search?: Search) {
  let path = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replaceAll(`$${key}`, encodeURIComponent(String(value ?? "")));
    }
  }
  if (typeof search === "string") return `${path}${search.startsWith("?") || search === "" ? search : `?${search}`}`;
  if (search) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(search)) {
      if (value != null) query.set(key, String(value));
    }
    const text = query.toString();
    if (text) return `${path}?${text}`;
  }
  return path;
}

export function Link({
  to,
  href,
  params,
  search,
  className,
  activeProps,
  children,
  preload: _preload,
  ...rest
}: {
  to?: string;
  href?: string;
  params?: Params;
  search?: Search;
  className?: string;
  activeProps?: { className?: string };
  children?: ReactNode;
  preload?: unknown;
  [key: string]: unknown;
}) {
  const pathname = usePathname();
  const url = resolveHref(to || href || "/", params, search);
  const active = pathname === url.split("?")[0];
  const classes = [className, active ? activeProps?.className : ""].filter(Boolean).join(" ");
  return (
    <NextLink href={url} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate() {
  const router = useNextRouter();
  return (options: string | { to: string; params?: Params; search?: Search }) => {
    router.push(typeof options === "string" ? options : resolveHref(options.to, options.params, options.search));
  };
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchStr = searchParams.toString();
  return {
    pathname,
    href: pathname,
    search: Object.fromEntries(searchParams.entries()),
    searchStr: searchStr ? `?${searchStr}` : "",
  };
}

export function useRouter() {
  const router = useNextRouter();
  const location = useLocation();
  return {
    state: { location: { href: `${location.pathname}${location.searchStr}` } },
    subscribe: (_event: string, _cb: (arg: { toLocation: { href: string; searchStr: string } }) => void) => () => {},
    navigate: ({ to }: { to: string }) => router.push(to),
    invalidate: () => router.refresh(),
  };
}

export function createFileRoute(_path: string) {
  return function defineRoute<T extends { component?: unknown }>(config: T) {
    return config;
  };
}

export function notFound() {
  const error = new Error("Not found");
  (error as Error & { notFound?: boolean }).notFound = true;
  throw error;
}

export function redirect(options: { to: string; statusCode?: number }) {
  if (typeof window !== "undefined") window.location.replace(options.to);
  const error = new Error(`Redirect ${options.to}`);
  throw error;
}

export function Outlet() {
  return null;
}

export function useParams() {
  return {};
}
