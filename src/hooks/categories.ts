import { useQuery } from '@tanstack/react-query';
import { getAllCategories } from '@/api/category';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getAllCategories,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};