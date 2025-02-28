import api from '../config/axios';

export const getGiftLists = async () => {
  const response = await api.get('/lists');
  return response.data;
};