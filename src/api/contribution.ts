import api from '../config/axios';

export const getContributionsByUserId = async (userId: string) => {
  const response = await api.get(`/contributions/user/${userId}`, {
    withCredentials: true,
  });

  return response.data;
};

export const getContributionByGiftListSlug = async (userId: string, slug: string) => {
  const response = await api.get(`/contributions/giftList/${slug}`, {
    params: { userId },
    withCredentials: true,
  });

  return response.data;
}

export const createContribution = async (data: {
  txId: string;
  value: number;
  message?: string;
}) => {
  const response = await api.post('/contributions', data, {
    withCredentials: true,
  });

  return response.data;
}