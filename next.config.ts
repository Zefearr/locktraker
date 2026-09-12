import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: '/sitemap-main.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.deadlock-api.com',
      },
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
