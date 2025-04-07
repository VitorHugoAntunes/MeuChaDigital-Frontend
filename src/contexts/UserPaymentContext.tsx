"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type PixKey = {
  id: string;
  key: string;
  type: string;
};

interface UserPaymentContextType {
  pixKey: PixKey | null;
  handleSetPixKey: (pixKey: PixKey) => void;
  handleSelectFirstPixKey: (pixKeys: PixKey[]) => void;
  clearPixKey: () => void;
}

const UserPaymentContext = createContext<UserPaymentContextType | undefined>(undefined);

export const UserPaymentProvider = ({ children }: { children: ReactNode }) => {
  const [pixKey, setPixKey] = useState<PixKey | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const selectedPixKeyId = localStorage.getItem('selectedPixKeyId');
      if (selectedPixKeyId) {
        setPixKey({ id: selectedPixKeyId, key: '', type: '' });
      }
    }
  }, []);

  const handleSetPixKey = (pixKey: PixKey) => {
    setPixKey(pixKey);
    localStorage.setItem('selectedPixKeyId', pixKey.id);
  };

  const clearPixKey = () => {
    setPixKey(null);
    localStorage.removeItem('selectedPixKeyId');
  };

  const handleSelectFirstPixKey = (pixKeys: PixKey[]) => {
    if (pixKeys.length > 0) {
      if (pixKey?.id) {
        const keyExists = pixKeys.some(key => key.id === pixKey.id);
        if (!keyExists) {
          handleSetPixKey(pixKeys[0]);
        }
      } else {
        handleSetPixKey(pixKeys[0]);
      }
    } else {
      clearPixKey();
    }
  };

  return (
    <UserPaymentContext.Provider value={{
      pixKey,
      handleSetPixKey,
      handleSelectFirstPixKey,
      clearPixKey,
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