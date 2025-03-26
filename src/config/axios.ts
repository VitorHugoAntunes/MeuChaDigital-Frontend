import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;

    // Check for local development or Vercel deployment
    if (hostname.includes('localhost') || hostname.endsWith('meuchadigital.com')) {
      // For Vercel deployments, use HTTPS
      const protocol = hostname.includes('localhost') ? 'http' : 'https';
      if (protocol === 'https') {
        return 'https://api.meuchadigital.com/api/v1';
      }

      // return 'http://localhost:8000/api/v1';
      return 'https://api.meuchadigital.com/api/v1';
    }
  }

  // Fallback to environment variable or default local URL
  // return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api/v1';
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://api.meuchadigital.com/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true, // If you need to send cookies
});

export default api;