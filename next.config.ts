import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site — `next build` emits an `out/` folder that any web host can serve.
  output: "export",
  // Emit `/about/index.html` instead of `/about.html` so plain static hosts resolve routes.
  trailingSlash: true,
  // No image optimization server exists in an export; the renders in /public/media are
  // already resized and re-encoded to WebP by scripts/optimize-images.mjs.
  images: { unoptimized: true },
};

export default nextConfig;
