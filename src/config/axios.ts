import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    // Desenvolvimento com subdomínio (ex: convite.localhost)
    if (parts.includes('localhost') && parts.length > 1) {
      const subdomain = parts[0];
      return `https://${subdomain}.meuchadigital.com/api/v1`;
    }

    // Produção com subdomínio (ex: convite.meuchadigital.com)
    if (parts.length > 2 && parts[1] === 'meuchadigital') {
      const subdomain = parts[0];
      return `https://${subdomain}.meuchadigital.com/api/v1`;
    }

    // Fallback (sem subdomínio ou desenvolvimento sem subdomínio)
    return process.env.NEXT_PUBLIC_BASE_URL || 'https://api.meuchadigital.com/api/v1';
  }

  // Para SSR ou casos sem window
  return process.env.NEXT_PUBLIC_BASE_URL || 'https://api.meuchadigital.com/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default api;