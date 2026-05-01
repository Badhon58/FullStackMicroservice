import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [process.env.BACKEND_SERVER_URL!],
};

export default nextConfig;
