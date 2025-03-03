import api from '../config/axios';

export const getAllGiftsBySlug = async (slug: string) => {
  const response = await api.get(`/lists/slug/${slug}/gifts`);
  return response.data;
};

export const getGiftBySlug = async (slug: string, giftId: string) => {
  const response = await api.get(`/lists/slug/${slug}/gifts/${giftId}`);
  return response.data;
};

