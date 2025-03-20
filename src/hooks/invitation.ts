import { useQuery } from '@tanstack/react-query';
import { getInvitation, getInvitationGifts, getInvitationGift } from '@/api/invitation';

interface Invitation {
  data: {
    id: string;
    name: string;
    slug: string;
    eventDate: string;
    banner: {
      url: string;
    }
    momentsImages: {
      url: string;
    }[];
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
    name: string;
    description: string;
    slug: string;
  };
}

export const useGetInvitation = () => {
  // Captura o subdomínio atual
  let subdomain = '';
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost') {
      subdomain = parts[0]; // "teste" em "teste.localhost"
    }
  }

  return useQuery<Invitation>({
    queryKey: ['invitation', subdomain],
    queryFn: getInvitation,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: Boolean(subdomain), // Só executa se houver um subdomínio válido
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetInvitationGifts = () => {
  // Captura o subdomínio atual
  let subdomain = '';
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost') {
      subdomain = parts[0]; // "teste" em "teste.localhost"
    }
  }

  return useQuery<InvitationGifts>({
    queryKey: ['invitation-gifts', subdomain],
    queryFn: getInvitationGifts,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: Boolean(subdomain), // Só executa se houver um subdomínio válido
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetInvitationGift = (id: string) => {
  // Captura o subdomínio atual
  let subdomain = '';
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost') {
      subdomain = parts[0]; // "teste" em "teste.localhost"
    }
  }

  return useQuery({
    queryKey: ['invitation-gift', subdomain, id],
    queryFn: () => getInvitationGift(id),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: Boolean(subdomain), // Só executa se houver um subdomínio válido
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};