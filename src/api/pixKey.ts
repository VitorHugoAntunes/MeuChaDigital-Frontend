import api from '@/config/axios';

export interface PixKeyCreateData {
  userId: string;
  key: string;
  type: string;
}

export const createPixKey = async (data: PixKeyCreateData) => {
  try {
    const response = await api.post('/pix-keys', data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao criar chave PIX.');
    }
  };
};

export const getAllPixKeysByUser = async (userId: string) => {
  try {
    const response = await api.get(`/pix-keys/user/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      const { data } = error.response;
      throw new Error(data.error || "Erro ao buscar chaves PIX.");
    }
  }
};

export const deletePixKey = async (pixKeyId: string) => {
  try {
    const response = await api.delete(`/pix-keys/${pixKeyId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao deletar chave PIX.');
    }
  }
};