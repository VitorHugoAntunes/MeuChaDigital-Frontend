import api from '../config/axios';

interface GiftListCreateData {
  userId: string;
  type: string;
  name: string;
  slug: string;
  date: string;
  description: string;
  status: string;
  gifts: unknown[];
  banner: File;
  moments_images: File[];
}

interface GiftListUpdateData {
  giftListId: string;
  type: string;
  name: string;
  slug: string;
  description: string;
  eventDate: string;
  eventType: string;
  status: string;
  banner: File;
  moments_images: File[];
}

export const getAllGiftListsByUser = async (userId: string) => {
  const response = await api.get(`/lists/user/${userId}`);
  return response.data;
};

export const getGiftListBySlug = async (slug: string) => {
  const response = await api.get(`/lists/slug/${slug}`);
  return response.data;
}

export const createGiftList = async (data: GiftListCreateData) => {
  const formData = new FormData();

  formData.append('userId', data.userId);
  formData.append('type', data.type);
  formData.append('name', data.name);
  formData.append('slug', data.slug);
  formData.append('eventDate', data.date);
  formData.append('description', data.description);
  formData.append('status', data.status);
  formData.append('gifts', JSON.stringify(data.gifts));

  if (data.banner) {
    formData.append('banner', data.banner);
  }

  if (data.moments_images?.length) {
    data.moments_images.forEach((file) => {
      formData.append('moments_images', file);
    });
  }

  const response = await api.post('/lists', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const updateGiftList = async (data: GiftListUpdateData) => {
  const formData = new FormData();

  formData.append('type', data.type);
  formData.append('name', data.name);
  formData.append('slug', data.slug);
  formData.append('eventDate', data.eventDate);
  formData.append('description', data.description);
  formData.append('eventType', data.eventType);
  formData.append('status', data.status);

  if (data.banner) {
    formData.append('banner', data.banner);
  }

  if (data.moments_images?.length) {
    data.moments_images.forEach((file) => {
      formData.append('moments_images', file);
    });
  }

  const response = await api.put(`/lists/${data.giftListId}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const deleteGiftList = async (id: string) => {
  try {
    const response = await api.delete(`/lists/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao deletar lista de presentes.');
    }
  }
};