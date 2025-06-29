/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // ESLint hataları build'i durdurmasın
  },
};

module.exports = nextConfig;
