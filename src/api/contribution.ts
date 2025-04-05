import api from '../config/axios';

export const getContributionsByUserId = async (userId: string) => {
  const response = await api.get(`/contributions/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};