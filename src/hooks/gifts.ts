import { useQuery } from '@tanstack/react-query';
import { getAllGiftsBySlug } from '@/api/gifts';

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
