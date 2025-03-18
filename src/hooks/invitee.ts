import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createInvitee, getAllInviteesByGiftListSlug, updateInvitee, deleteInvitee, InviteeData, UpdateInviteeData } from '@/api/invitee';
import { toast } from 'react-toastify';

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

export const useUpdateInvitee = () => {
  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: UpdateInviteeData }) =>
      updateInvitee({ slug, data }),
  });
};

export const useDeleteInvitee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, id }: { slug: string; id: string }) =>
      deleteInvitee({ slug, id }),
    onSuccess: () => {
      queryClient.invalidateQueries(['invitees']);

      toast.success('Convidado excluído com sucesso', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: any) => {
      console.error('Erro ao excluir convidado', error.message);
      toast.error('Erro ao excluir convidado', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
  });
};