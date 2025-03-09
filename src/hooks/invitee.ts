import { useMutation, useQuery } from '@tanstack/react-query';
import { createInvitee, getAllInviteesByGiftListSlug, InviteeData } from '@/api/invitee';

export const useCreateInvitee = () => {
  return useMutation({
    mutationFn: (data: InviteeData) => createInvitee(data),
  });
};

export const useGetAllInviteesByGiftListSlug = (slug: string) => {
  return useQuery({
    queryKey: ['invitees', slug],
    queryFn: () => getAllInviteesByGiftListSlug(slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug, // Só executa a query se `giftListId` estiver disponível
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};