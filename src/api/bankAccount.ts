import api from '../config/axios';

export interface BankAccount {
  cpf?: string;
  cnpj?: string;
  account: string;
  type: string;
  userId: string;
}

export type BankAccountUpdate = Omit<BankAccount, 'userId'>

export const getAllUserBankAccounts = async (userId: string) => {
  try {
    const response = await api.get(`/bank-accounts/user/${userId}`);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao buscar contas bancárias.');
    }
  };
};

export const createBankAccount = async (bankAccount: BankAccount): Promise<BankAccount | undefined> => {
  try {
    const response = await api.post<BankAccount>('/bank-accounts', bankAccount, {
      params: {
        userId: bankAccount.userId,
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao criar conta bancária.');
    }
  };
};

export const updateBankAccount = async (userId: string, accountId: string, bankAccount: BankAccountUpdate): Promise<BankAccountUpdate | undefined> => {
  try {
    const response = await api.put(`/bank-accounts/${accountId}`, bankAccount, {
      params: {
        userId,
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao atualizar conta bancária.');
    }
  };
};

export const deleteBankAccount = async (userId: string, accountId: string): Promise<void> => {
  try {
    await api.delete(`/bank-accounts/${accountId}`, {
      params: {
        userId,
      }
    });
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || 'Erro ao deletar conta bancária.');
    }
  };
};