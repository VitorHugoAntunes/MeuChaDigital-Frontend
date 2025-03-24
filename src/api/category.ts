import api from '../config/axios';

interface Category {
  id: string;
  name: string;
  description: string;
}

export const getAllCategories = async (): Promise<Category[] | undefined> => {
  try {
    const response = await api.get<Category[]>('/categories');
    return response.data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};