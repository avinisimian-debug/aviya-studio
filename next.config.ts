import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  // Silence monorepo/workspace root detection noise on this machine
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
