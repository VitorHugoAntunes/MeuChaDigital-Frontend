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
            value: '(?<subdomain>.*)\\.(localhost|meuchadigital\\.com)'
          }
        ],
        destination: '/subdomain',
      },
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
      {
        source: '/api/v1/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*)\\.meuchadigital\\.com'
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
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
        ],
      },
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