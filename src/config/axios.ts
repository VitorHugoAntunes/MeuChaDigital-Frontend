import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Check for local development or Vercel deployment
    if (hostname.includes('localhost') || hostname.endsWith('meu-cha-digital-frontend.vercel.app')) {
      // For Vercel deployments, use HTTPS
      const protocol = hostname.includes('localhost') ? 'http' : 'https';
      return `${protocol}://${hostname}/api/v1`;
    }
  }

  // Fallback to environment variable or default local URL
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, // If you need to send cookies
});

export default api;