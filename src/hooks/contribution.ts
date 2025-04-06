import { useQuery } from '@tanstack/react-query';
import { getContributionsByUserId, getContributionByGiftListSlug } from '@/api/contribution';

type UserContribution = {
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

type GiftListContribution = {
  id: string;
  value: number;
  message: string;
  createdAt: string;
  user: {
    name: string;
  }
  gift: {
    name: string;
  };
};

export const useContributions = (userId: string) => {
  return useQuery<UserContribution[]>({
    queryKey: ['contributions'],
    queryFn: () => getContributionsByUserId(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useContributionByGiftListSlug = (userId: string, slug: string) => {
  return useQuery<GiftListContribution[]>({
    queryKey: ['giftListContributions', slug],
    queryFn: () => getContributionByGiftListSlug(userId, slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};