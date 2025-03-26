import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    if (!window.location.hostname.includes('localhost')) {
      console.log('passou pelo localhost');
      return 'https://api.meuchadigital.com/api/v1';
    }

    return 'https://api.meuchadigital.com/api/v1';
  }

  return process.env.NEXT_PUBLIC_BASE_URL || 'https://api.meuchadigital.com/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
});

export default api;