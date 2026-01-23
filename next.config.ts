import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.followalice.com",
      },
    ],
  },
};

export default nextConfig;
