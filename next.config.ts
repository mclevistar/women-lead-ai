import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Put CSS in <style> tags instead of hashed files, so Clarity recordings keep
  // their styling after a deploy replaces the old stylesheet.
  experimental: {
    inlineCss: true,
  },
  async redirects() {
    return [
      { source: "/b2b", destination: "/contact", permanent: true },
      { source: "/courses/ai-marketing-sprint", destination: "/courses/ai-sales-marketing-bootcamp", permanent: true },
    ];
  },
};

export default nextConfig;
