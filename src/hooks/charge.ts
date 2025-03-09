import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDefaultCharge, createGuestCharge, ChargeDefaultUserData, ChargeGuestUserData, getCharge } from '@/api/charge';

export const useGetCharge = (localId?: string, giftId?: string) => {
  return useQuery({
    queryFn: async () => {
      if (!localId || !giftId) {
        return null;
      }

      const charge = await getCharge(localId, giftId);
      return charge || null;
    },
    queryKey: ['charge', localId, giftId],
    enabled: !!localId && !!giftId, // Só executa se localId e giftId estiverem disponíveis
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateDefaultCharge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChargeDefaultUserData) => createDefaultCharge(data),
    onSuccess: (response) => {

      queryClient.invalidateQueries({ queryKey: ['charge', response.localId, response.giftId] });
    }
  });
};

export const useCreateGuestCharge = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ChargeGuestUserData) => createGuestCharge(data),
    onSuccess: (response) => {

      queryClient.invalidateQueries({ queryKey: ['charge', response.localId, response.giftId] });
    }
  });
};
