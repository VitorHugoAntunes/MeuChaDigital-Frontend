import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createGiftList, getAllGiftListsByUser, getGiftListBySlug, updateGiftList, deleteGiftList } from '@/api/giftLists';
import { toast } from 'react-toastify';

export const useGiftListsByUser = (userId: string, options = {}) => {
  return useQuery({
    queryKey: ['giftLists', userId],
    queryFn: () => getAllGiftListsByUser(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!userId || userId !== "" || userId !== null || userId !== undefined,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
  });
};

export const useGiftListBySlug = (slug: string, options = {}) => {
  return useQuery({
    queryKey: ['giftLists', slug],
    queryFn: () => getGiftListBySlug(slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug || slug !== "" || slug !== null || slug !== undefined,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    ...options,
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

export const useUpdateGiftList = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation(updateGiftList, {
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['giftLists', variables.slug] });
      await queryClient.invalidateQueries({ queryKey: ['giftLists', variables.userId] });

      queryClient.refetchQueries({ queryKey: ['giftLists', slug] });

      toast.success("Lista de presentes atualizada com sucesso!", {
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
      toast.error("Erro ao atualizar lista de presentes!", {
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

export const useDeleteGiftList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ giftListId }: { giftListId: string, slug: string }) =>
      deleteGiftList(giftListId), // Aqui você passa apenas o giftListId para a API
    onSuccess: async (_, { giftListId, slug }) => {
      queryClient.removeQueries({ queryKey: ['giftLists', slug] });
      queryClient.removeQueries({ queryKey: ['giftLists', giftListId] });

      queryClient.invalidateQueries({ queryKey: ['giftLists', slug] });
      queryClient.invalidateQueries({ queryKey: ['giftLists', giftListId] });
      queryClient.invalidateQueries({ queryKey: ['giftLists'] });

      toast.success("Lista de presentes excluída com sucesso!", {
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
      toast.error("Erro ao excluir lista de presentes!", {
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