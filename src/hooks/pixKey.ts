import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPixKey, getAllPixKeysByUser, PixKeyCreateData } from '@/api/pixKey';

export const useGetAllPixKeysByUser = (userId: string) => {
  return useQuery({
    queryKey: ['pixKeys', userId],
    queryFn: () => getAllPixKeysByUser(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!userId,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreatePixKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: PixKeyCreateData) => createPixKey(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['pixKeys']);
    }
  });
};