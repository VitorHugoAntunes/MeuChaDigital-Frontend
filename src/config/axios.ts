import axios from 'axios';

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname; // Exemplo: teste.localhost
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost') {
      return `http://${parts[0]}.localhost:8000/api/v1`;
    }
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000/api/v1';
};

const api = axios.create({
  baseURL: getBaseUrl(),
});

export default api;
