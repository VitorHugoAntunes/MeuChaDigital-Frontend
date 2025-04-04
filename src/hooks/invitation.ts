import { useQuery } from '@tanstack/react-query';
import { getInvitation, getInvitationGifts, getInvitationGift } from '@/api/invitation';

interface Invitation {
  data: {
    id: string;
    name: string;
    description: string;
    slug: string;
    eventDate: string;
    eventTime: string;
    banner: {
      url: string;
    }
    momentsImages: {
      url: string;
    }[];
    address: {
      zipCode: string;
      streetAddress: string;
      streetNumber: string;
      addressLine2?: string;
      neighborhood: string;
      city: string;
      state: string;
    }
  }
  redirect?: string;
}

interface InvitationGifts {
  gifts: {
    id: string;
    name: string;
    photo?: { url: string };
    category?: { id: string, name: string };
    totalValue: number;
    description: string;
    priority: "LOW" | "MEDIUM" | "HIGH";
    list: { userId: string };
  }[];
  giftList: {
    id: string;
    userId: string;
    name: string;
    description: string;
    slug: string;
  };
}

export const useGetInvitation = () => {
  const subdomain = typeof window !== 'undefined'
    ? window.location.hostname.split('.')[0]
    : '';

  return useQuery<Invitation>({
    queryKey: ['invitation', subdomain],
    queryFn: () => getInvitation(subdomain),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!subdomain,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetInvitationGifts = () => {
  const subdomain = typeof window !== 'undefined'
    ? window.location.hostname.split('.')[0]
    : '';

  return useQuery<InvitationGifts>({
    queryKey: ['invitation-gifts', subdomain],
    queryFn: () => getInvitationGifts(subdomain),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!subdomain,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetInvitationGift = (id: string) => {
  const subdomain = typeof window !== 'undefined'
    ? window.location.hostname.split('.')[0]
    : '';

  return useQuery({
    queryKey: ['invitation-gift', subdomain, id],
    queryFn: () => getInvitationGift(subdomain, id),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!subdomain && !!id,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};