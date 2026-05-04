import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: ["*.trycloudflare.com"], // Cho phép tunnel truy cập Server Actions
    },
  },
  output: "standalone",
};

export default nextConfig;
