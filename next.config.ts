import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets-bucket.deadlock-api.com',
        port: '',
        pathname: '/**'
      }
    ]
  },
  devIndicators: false
};

export default nextConfig;
