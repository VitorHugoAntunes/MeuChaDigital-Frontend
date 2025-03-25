"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PaymentContextType {
  amount: number;
  setAmount: (amount: number) => void;
  maxAmount: number;
  setMaxAmount: (maxAmount: number) => void;
  checkoutItem: string;
  setCheckoutItem: (checkoutItem: string) => void;
  checkoutId: string;
}

interface PaymentProps {
  amount: number;
  maxAmount: number;
  checkoutItem: string;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [checkoutId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedCheckoutId = localStorage.getItem('currentCheckoutId');
      return savedCheckoutId || generateUniqueId();
    }
    return generateUniqueId();
  });

  const [checkoutData, setCheckoutData] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem(`checkout_${checkoutId}`);
      return savedData ? JSON.parse(savedData) : { amount: 0, maxAmount: 0, checkoutItem: '' };
    }
    return { amount: 0, maxAmount: 0, checkoutItem: '' };
  });

  const { amount, maxAmount, checkoutItem } = checkoutData;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`checkout_${checkoutId}`, JSON.stringify(checkoutData));
      localStorage.setItem('currentCheckoutId', checkoutId);
    }
  }, [checkoutData, checkoutId]);

  const setAmount = (amount: number) => {
    setCheckoutData((prevData: PaymentProps) => ({ ...prevData, amount }));
  };

  const setMaxAmount = (maxAmount: number) => {
    setCheckoutData((prevData: PaymentProps) => ({ ...prevData, maxAmount }));
  };

  const setCheckoutItem = (checkoutItem: string) => {
    setCheckoutData((prevData: PaymentProps) => ({ ...prevData, checkoutItem }));
  };

  return (
    <PaymentContext.Provider value={{ amount, setAmount, maxAmount, setMaxAmount, checkoutItem, setCheckoutItem, checkoutId }}>
      {children}
    </PaymentContext.Provider>
  );
};

const generateUniqueId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};