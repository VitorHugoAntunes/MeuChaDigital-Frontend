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

export const getGiftLists = async () => {
  const response = await api.get('/lists');
  return response.data;
};

export const getAllGiftByUser = async (userId: string) => {
  const response = await api.get(`/lists/user/${userId}`);

  console.log('USER ID:', userId);
  console.log('RESPONSE:', response.data);
  return response.data;
};

export const createGiftList = async (data: GiftListCreateData) => {
  const formData = new FormData();

  // Adiciona os campos de texto ao FormData
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

  if (data.moments_images && data.moments_images.length > 0) {
    data.moments_images.forEach((file, index) => {
      formData.append(`moments_images`, file); // Use o mesmo nome para todos os arquivos
    });
  }

  const response = await api.post('/lists', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};