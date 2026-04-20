import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mulearn.org",
      },
      {
        protocol: "https",
        hostname: "dev.mulearn.org",
      },
    ],
  },
};

export default nextConfig;
