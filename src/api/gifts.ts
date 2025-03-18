import api from '../config/axios';

export interface GiftCreateData {
  name: string;
  priority: string;
  description: string;
  totalValue: number;
  categoryId: string;
  userId: string;
  giftListId: string;
  giftPhoto: File | null;
}

export interface GiftUpdateData {
  name?: string;
  priority?: string;
  description?: string;
  totalValue?: number;
  categoryId?: string;
  userId?: string;
  giftListId?: string;
  giftPhoto?: File | null;
}

export const getAllGiftsBySlug = async (slug: string) => {
  const response = await api.get(`/lists/slug/${slug}/gifts`);
  return response.data;
};

export const getGiftBySlug = async (slug: string, giftId: string) => {
  const response = await api.get(`/lists/slug/${slug}/gifts/${giftId}`);
  return response.data;
};

export const createGift = async (giftListId: string, data: GiftCreateData) => {
  const formData = new FormData();

  formData.append('name', data.name);
  formData.append('priority', data.priority);
  formData.append('description', data.description);
  formData.append('totalValue', String(data.totalValue));
  formData.append('categoryId', data.categoryId);
  formData.append('userId', data.userId);
  formData.append('giftListId', giftListId);

  if (data.giftPhoto) {
    formData.append('giftPhoto', data.giftPhoto);
  }

  const response = await api.post(`/lists/${giftListId}/gifts`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const updateGift = async (giftListId: string, giftId: string, data: GiftUpdateData) => {
  const formData = new FormData();

  if (data.name) formData.append('name', data.name);
  if (data.priority) formData.append('priority', data.priority);
  if (data.description) formData.append('description', data.description);
  if (data.totalValue !== undefined) formData.append('totalValue', String(data.totalValue));
  if (data.categoryId) formData.append('categoryId', data.categoryId);
  if (data.userId) formData.append('userId', data.userId);

  if (data.giftPhoto) {
    formData.append('giftPhoto', data.giftPhoto);
  }

  const response = await api.put(`/lists/${giftListId}/gifts/${giftId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const deleteGift = async (giftListId: string, giftId: string) => {
  try {
    const response = await api.delete(`/lists/${giftListId}/gifts/${giftId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir presente', error);
  }
}