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
            value: '(?<subdomain>.*).localhost|(?<subdomain>.*).meuchadigital.com'
          }
        ],
        destination: '/subdomain/:subdomain'
      },
      {
        source: '/api/v1/:path*',
        has: [
          {
            type: 'host',
            value: '(?<subdomain>.*).localhost|(?<subdomain>.*).meuchadigital.com'
          }
        ],
        destination: 'http://:subdomain.localhost:8000/api/v1/:path*'
      }
    ];
  }
};

export default nextConfig;