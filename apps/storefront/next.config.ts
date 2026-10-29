import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  transpilePackages: ["@orp/ui", "@orp/config"],
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      { source: "/products/semaglutide", destination: "/shop", permanent: true },
      { source: "/products/orp-semaglutide", destination: "/shop", permanent: true },
      { source: "/products/retatrutide-2", destination: "/products/retatrutide", permanent: true },
      { source: "/products/tirzepatide-2", destination: "/products/tirzepatide", permanent: true },
      { source: "/products/bpc-158", destination: "/products/bpc-157", permanent: true },
      { source: "/products/bacteriostatic-water-2", destination: "/products/bacteriostatic-water", permanent: true },
    ];
  },
  async headers() {
    const headers = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ];
    if (process.env.NEXT_PUBLIC_STAGING === "true") {
      headers.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
    }
    return [{ source: "/:path*", headers }];
  },
};

export default nextConfig;
