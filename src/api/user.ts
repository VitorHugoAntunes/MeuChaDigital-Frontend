import api from '../config/axios';
import axios from 'axios';

export const userAuthenticated = async () => {
  try {
    const response = await api.get('/auth/user', { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

export const getUser = async (id: string) => {
  const response = await api.get(`/users/id/${id}`, { withCredentials: true });
  return response.data;
};