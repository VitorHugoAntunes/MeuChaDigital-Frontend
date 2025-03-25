import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'meuchadigital-images.s3.us-east-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      // Subdomain homepage redirect
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
      // API requests with subdomains (local development)
      {
        source: '/api/v1/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.localhost'
          }
        ],
        destination: 'http://:subdomain.localhost:8000/api/v1/:path*',
      },
      // API requests with subdomains (Vercel production)
      {
        source: '/api/v1/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.meu-cha-digital-frontend\\.vercel\\.app'
          }
        ],
        destination: 'https://api.meuchadigital.com/api/v1/:path*',
      },
      // Fallback API rewrite
      {
        source: '/api/v1/:path*',
        destination: 'https://api.meuchadigital.com/api/v1/:path*',
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