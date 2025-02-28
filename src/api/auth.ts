import { redirect } from 'next/navigation';
import api, { BASE_URL } from '../config/axios';

export const login = async () => {
  redirect(`${BASE_URL}/auth/google`);
};

export const logout = async () => {
  const response = await api.get('/auth/logout', { withCredentials: true });
  return response.data;
};