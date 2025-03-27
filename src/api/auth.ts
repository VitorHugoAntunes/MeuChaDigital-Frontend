import api, { BASE_URL } from '../config/axios';

export const login = async () => {
  // window.open(`${BASE_URL}/auth/google`, '_self');
  const response = await api.get('/auth/google', { withCredentials: true });
  return response.data;
};

export const logout = async () => {
  const response = await api.get('/auth/logout', { withCredentials: true });
  return response.data;
};