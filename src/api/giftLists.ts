import axios from 'axios';
import api from '../config/axios';

interface Address {
  zipCode: string;
  streetAddress: string;
  streetNumber: string;
  addressLine2: string;
  neighborhood: string;
  city: string;
  state: string;
}
interface GiftListCreateData {
  userId: string;
  type: string;
  name: string;
  slug: string;
  date: string;
  time: string;
  description: string;
  status: string;
  gifts: unknown[];
  banner: File;
  moments_images: File[];
  address: Address;
}

interface GiftListUpdateData {
  userId: string;
  giftListId: string;
  type?: string;
  name?: string;
  slug?: string;
  description?: string;
  eventDate?: string;
  eventTime?: string;
  eventType?: string;
  status?: string;
  banner?: File;
  moments_images?: File[];
  address?: Address;
}

export const getAllGiftListsByUser = async (userId: string) => {
  const response = await api.get(`/lists/user/${userId}`);
  return response.data;
};

export const getGiftListBySlug = async (slug: string, subdomain?: boolean) => {
  if (subdomain) {
    const response = await axios.get(`http://localhost:8000/api/v1/lists/slug/${slug}`);
    return response.data;
  }

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
  formData.append('eventTime', data.time);
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

  formData.append('address', JSON.stringify(data.address));

  const response = await api.post('/lists', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return response.data;
};

export const updateGiftList = async (data: GiftListUpdateData) => {
  const formData = new FormData();
  console.log('DATA', data);

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((file) => {
          formData.append(key, file); // Adiciona arquivos diretamente
        });
      } else if (typeof value === 'object' && value !== null && key === "address") {
        // Converte o objeto `address` para JSON
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value); // Adiciona valores primitivos diretamente
      }
    }
  });

  console.log('FORM DATA', formData);

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