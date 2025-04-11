"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type BankAccount = {
  id: string;
  account: string;
  type: string;
  cpf?: string;
  cnpj?: string;
};

interface UserPaymentContextType {
  bankAccount: BankAccount | null;
  handleSetBankAccount: (account: BankAccount) => void;
  handleSelectFirstBankAccount: (accounts: BankAccount[]) => void;
  clearBankAccount: () => void;
}

const UserPaymentContext = createContext<UserPaymentContextType | undefined>(undefined);

export const UserPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedAccountId = localStorage.getItem('selectedBankAccountId');
      if (selectedAccountId) {
        setBankAccount({ id: selectedAccountId, account: '', type: '' });
      }
    }
  }, []);

  const handleSetBankAccount = (account: BankAccount) => {
    setBankAccount(account);
    localStorage.setItem('selectedBankAccountId', account.id);
  };

  const clearBankAccount = () => {
    setBankAccount(null);
    localStorage.removeItem('selectedBankAccountId');
  };

  const handleSelectFirstBankAccount = (accounts: BankAccount[]) => {
    if (accounts.length > 0) {
      if (bankAccount?.id) {
        const accountExists = accounts.some(acc => acc.id === bankAccount.id);
        if (!accountExists) {
          handleSetBankAccount(accounts[0]);
        }
      } else {
        handleSetBankAccount(accounts[0]);
      }
    } else {
      clearBankAccount();
    }
  };

  return (
    <UserPaymentContext.Provider value={{
      bankAccount,
      handleSetBankAccount,
      handleSelectFirstBankAccount,
      clearBankAccount,
    }}>
      {children}
    </UserPaymentContext.Provider>
  );
};

export const useUserPayment = () => {
  const context = useContext(UserPaymentContext);
  if (!context) {
    throw new Error('useUserPayment must be used within a UserPaymentProvider');
  }
  return context;
};