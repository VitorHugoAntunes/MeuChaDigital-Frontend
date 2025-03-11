import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPixKey, getAllPixKeysByUser, deletePixKey, PixKeyCreateData } from '@/api/pixKey';
import { toast } from 'react-toastify';

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

export const useDeletePixKey = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (pixKeyId: string) => deletePixKey(pixKeyId),
    onSuccess: () => {
      queryClient.invalidateQueries(['pixKeys']);
      toast.success('Chave PIX deletada com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
};