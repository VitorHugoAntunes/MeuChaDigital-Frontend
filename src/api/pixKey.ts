import api from '@/config/axios';

export interface PixKeyCreateData {
  userId: string;
  key: string;
  type: string;
}

export const createPixKey = async (data: PixKeyCreateData) => {
  const response = await api.post('/pix-keys', data);

  return response.data;
};

export const getAllPixKeysByUser = async (userId: string) => {
  const response = await api.get(`/pix-keys/user/${userId}`);

  return response.data;
};