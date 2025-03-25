import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createInvitee, getAllInviteesByGiftListSlug, updateInvitee, deleteInvitee, InviteeData, UpdateInviteeData, getAllInviteesWithPaginationByGiftListSlug } from '@/api/invitee';
import { toast } from 'react-toastify';

export const useCreateInvitee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: InviteeData) => createInvitee(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['invitees']);

      toast.success('Convidado adicionado com sucesso', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: { message: string }) => {
      console.error('Erro ao adicionar convidado', error.message);
      toast.error('Erro ao adicionar convidado', {
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

export const useGetAllInviteesByGiftListSlug = (slug: string, enabled: false) => {
  return useQuery({
    queryKey: ['invitees', slug],
    queryFn: () => getAllInviteesByGiftListSlug(slug),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useGetAllInviteesByGiftListSlugWithFilters = (
  slug: string,
  page: number,
  limit: number,
  search: string,
  status: string
) => {
  return useQuery({
    queryKey: ["invitees", slug, page, search, status],
    queryFn: () => getAllInviteesWithPaginationByGiftListSlug(slug, page, limit, search, status),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!slug,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useUpdateInvitee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, id, data }: { slug: string; id: string; data: UpdateInviteeData }) =>
      updateInvitee({ slug, id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(['invitees']);

      toast.success('Convidado atualizado com sucesso', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: { message: string }) => {
      console.error('Erro ao atualizar convidado', error.message);
      toast.error('Erro ao atualizar convidado', {
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
    onError: (error: { message: string }) => {
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