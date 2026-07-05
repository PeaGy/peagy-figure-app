import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cho phép tất cả các domain ảnh (tiện cho việc demo MockAPI)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
