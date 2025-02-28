import api from '../config/axios';

export const userAuthenticated = async () => {
  const response = await api.get('/auth/user', { withCredentials: true });
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get(`/users/id/${id}`);
  return response.data;
}