import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'meuchadigital-images.s3.us-east-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.(localhost|meu-cha-digital-frontend\\.vercel\\.app)'
          }
        ],
        destination: '/subdomain',
      },
      {
        source: '/api/v1/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.(localhost|meu-cha-digital-frontend\\.vercel\\.app)'
          }
        ],
        destination: ':subdomain.localhost:8000/api/v1/:path*',
      },
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000'}/api/v1/:path*`,
      }
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;