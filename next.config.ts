import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mejarnshwihsidcmzoir.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/products/**",
      },
    ],
  },
};

export default nextConfig;
