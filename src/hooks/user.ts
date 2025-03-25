import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/api/user';
import { toast } from 'react-toastify';

export const useDeleteUser = () => {
  const { logoutUser, isLoggingOut } = useAuth();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['user']);

      logoutUser();
    },
    onError: (error: { response?: { data?: { error?: string } } }) => {
      console.error('Erro ao deletar usuário:', error);

      const errorMessage = error.response?.data?.error || 'Erro ao deletar usuário';

      toast.error(errorMessage, {
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

  return {
    ...mutation,
    isLoggingOut,
  };
};