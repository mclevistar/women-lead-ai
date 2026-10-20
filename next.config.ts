import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/b2b", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
