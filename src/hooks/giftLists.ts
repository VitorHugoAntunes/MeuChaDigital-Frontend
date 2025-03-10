import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createGiftList, getAllGiftListsByUser } from '@/api/giftLists';

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

export const useCreateGiftList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGiftList,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ['giftLists', variables.userId] });
    },
  });
};