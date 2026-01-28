import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {},
  serverExternalPackages: ["bcrypt", "@libsql/client", "pg"],
};

export default nextConfig;
