import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: the homepage ships as pure HTML + CSS with zero client JS.
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
