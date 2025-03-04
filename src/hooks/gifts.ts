import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createGift, getAllGiftsBySlug, getGiftBySlug, GiftCreateData } from '@/api/gifts';

interface Gift {
  id: string;
  name: string;
  photo?: { url: string };
  category?: { name: string };
  totalValue: number;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  list: { userId: string };
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