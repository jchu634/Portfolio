import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right",
  },
  skipTrailingSlashRedirect: true,
  experimental: { reactCompiler: true },
};

export default nextConfig;
