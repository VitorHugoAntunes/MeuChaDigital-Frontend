import { useQuery } from '@tanstack/react-query';
import { getAddressByZipCode } from '@/api/zipCode';

export const useCep = (zipCode: string) => {
  return useQuery({
    queryFn: async () => {
      if (!zipCode || zipCode.length !== 8) {
        return null;
      }

      const address = await getAddressByZipCode(zipCode);
      return address;
    },
    queryKey: ['cep', zipCode],
    enabled: !!zipCode && zipCode.length === 8,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};