import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createGiftList, getAllGiftListsByUser, getGiftListBySlug, updateGiftList, deleteGiftList } from '@/api/giftLists';
import { toast } from 'react-toastify';

export const useGiftListsByUser = (userId: string) => {
  return useQuery({
    queryKey: ['giftLists', userId],
    queryFn: () => getAllGiftListsByUser(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!userId, // Só executa a query se `userId` estiver disponível
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGiftListBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['giftLists', slug],
    queryFn: () => getGiftListBySlug(slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug, // Só executa a query se `slug` estiver disponível
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateGiftList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGiftList,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['giftLists', variables.userId] });
    },
  });
};

export const useUpdateGiftList = (giftListId: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateGiftList, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['giftLists', giftListId] });
    },
  });
};

export const useDeleteGiftList = (giftListId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGiftList,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['giftLists', giftListId] });
      toast.success("Presente excluído com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: () => {
      toast.error("Erro ao excluir presente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};