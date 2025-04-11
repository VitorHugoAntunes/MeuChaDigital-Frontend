import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createBankAccount, getAllUserBankAccounts, updateBankAccount, deleteBankAccount, BankAccount, BankAccountUpdate } from '@/api/bankAccount';
import { toast } from 'react-toastify';

export const useGetAllUserBankAccounts = (userId: string) => {
  return useQuery({
    queryKey: ['bankAccounts', userId],
    queryFn: () => getAllUserBankAccounts(userId),
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 5,
    enabled: !!userId,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

export const useCreateBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BankAccount) => createBankAccount(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['bankAccounts']);
    }
  });
};

export const useUpdateBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, accountId, data }: { userId: string; accountId: string; data: BankAccountUpdate }) => updateBankAccount(userId, accountId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['bankAccounts']);
    }
  });
};

export const useDeleteBankAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, accountId }: { userId: string; accountId: string }) => deleteBankAccount(userId, accountId),
    onSuccess: () => {
      queryClient.invalidateQueries(['bankAccounts']);
      toast.success('Conta bancária deletada com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    onError: (error: Error) => {
      toast.error(error.message, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  });
};