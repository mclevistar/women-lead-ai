import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Put CSS in <style> tags instead of hashed files, so Clarity recordings keep
  // their styling after a deploy replaces the old stylesheet.
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [{ source: "/b2b", destination: "/contact", permanent: true }];
  },
};

export default nextConfig;
