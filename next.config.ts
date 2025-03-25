import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'meuchadigital-images.s3.us-east-2.amazonaws.com'],
  },
  async rewrites() {
    return [
      {
        source: '/',
        has: [{ type: 'host', value: '*.localhost' }],
        destination: '/subdomain',
      },
      // Redireciona todas as requisições ao backend com o subdomínio
      {
        source: '/api/v1/:path*',
        has: [{ type: 'host', value: '*.localhost' }],
        destination: 'http://:subdomain.localhost:8000/api/v1/:path*',
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