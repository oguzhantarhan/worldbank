import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ESLint hataları build'i durdurmasın
  },
};

export default nextConfig;
