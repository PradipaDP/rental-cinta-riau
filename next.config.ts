import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tambahkan pengaturan batas memori Server Actions di sini
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;