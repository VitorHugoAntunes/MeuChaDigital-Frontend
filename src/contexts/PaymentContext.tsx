"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaymentContextType {
  amount: number;
  setAmount: (amount: number) => void;
  maxAmount: number;
  setMaxAmount: (maxAmount: number) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [amount, setAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);

  return (
    <PaymentContext.Provider value={{ amount, setAmount, maxAmount, setMaxAmount }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
};