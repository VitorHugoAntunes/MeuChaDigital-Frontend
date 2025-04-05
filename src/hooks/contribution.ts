import { useQuery } from '@tanstack/react-query';
import { getContributionsByUserId } from '@/api/contribution';

type Contribution = {
  id: string;
  userId: string;
  giftId: string;
  giftListId: string;
  createdAt: string;
  value: number;
  gift: {
    name: string;
  }
  giftList: {
    name: string;
    shareableLink: string;
  };
  payment: {
    txId: string;
    status: string;
    paymentMethod: string;
  };
};

export const useContributions = (userId: string) => {
  return useQuery<Contribution[]>({
    queryKey: ['contributions'],
    queryFn: () => getContributionsByUserId(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};