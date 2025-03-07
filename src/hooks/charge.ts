import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createDefaultCharge, createGuestCharge, ChargeDefaultUserData, ChargeGuestUserData, getCharge } from '@/api/charge';

export const useGetCharge = (localId?: string, giftId?: string) => {
  return useQuery({
    queryKey: ['charge', localId, giftId],
    queryFn: async () => {
      if (!localId || !giftId) {
        throw new Error("LocalId e GiftId são obrigatórios para buscar a cobrança.");
      }
      return getCharge(localId, giftId);
    },
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
