import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGift, updateGift, getAllGiftsBySlug, getGiftBySlug, deleteGift, GiftCreateData, GiftUpdateData } from '@/api/gifts';
import { toast } from 'react-toastify';

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { id: string, name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
  totalContributions: number;
}

export const useGiftsBySlug = (slug: string) => {
  return useQuery({
    queryKey: ['gifts', slug],
    queryFn: () => getAllGiftsBySlug(slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug, // Só executa a query se `slug` estiver disponível
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGiftBySlug = (slug: string, giftId: string) => {
  return useQuery<Gift>({
    queryKey: ['gifts', slug, giftId],
    queryFn: () => getGiftBySlug(slug, giftId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug && !!giftId, // Só executa a query se `slug` e `giftId` estiverem disponíveis
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { giftListId: string; data: GiftCreateData }) =>
      createGift(data.giftListId, data.data),
    onSuccess: (_, variables) => {
      // Invalida a query de presentes para atualizar a lista após a criação
      queryClient.invalidateQueries({ queryKey: ['gifts', variables.giftListId] });
    },
  });
};

export const useUpdateGift = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { giftListId: string; giftId: string; data: GiftUpdateData }) =>
      updateGift(data.giftListId, data.giftId, data.data),
    onSuccess: (_, variables) => {
      // Invalida a query de presentes para atualizar a lista após a atualização
      queryClient.invalidateQueries({ queryKey: ['gifts', variables.giftListId] });
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useDeleteGift = (slug: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { giftListId: string; giftId: string }) =>
      deleteGift(data.giftListId, data.giftId),
    onSuccess: (_, variables) => {
      // Invalida a query de presentes usando o slug
      queryClient.invalidateQueries({ queryKey: ['gifts', slug] });

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