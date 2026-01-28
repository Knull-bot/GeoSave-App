import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["bcrypt", "@libsql/client", "pg"],
  },
};

export default nextConfig;
