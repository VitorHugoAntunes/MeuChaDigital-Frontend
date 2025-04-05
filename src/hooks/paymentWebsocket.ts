"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const usePaymentWebSocket = () => {
  interface PaymentData {
    txid: string;
    valor: string;
    horario: string;
    gnExtras: {
      pagador: {
        nome?: string;
      };
    };
  }

  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  const handleMessage = useCallback((event: MessageEvent) => {
    try {
      const message = JSON.parse(event.data);
      if (message.event === 'payment_processed' && message.data?.pix?.length > 0) {
        console.log('Payment confirmed:', message.data);
        setPaymentData(message.data.pix[0]);
      }
    } catch (error) {
      console.error('Error processing message:', error);
    }
  }, []);

  useEffect(() => {
    if (!socketRef.current) {
      const socketUrl = 'wss://api.meuchadigital.com/ws';
      socketRef.current = new WebSocket(socketUrl);

      const socket = socketRef.current;

      socket.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
      };

      socket.onmessage = handleMessage;

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      };

      socket.onclose = () => {
        console.log('WebSocket disconnected');
        setIsConnected(false);

        console.log('Attempting to reconnect...');

        setTimeout(() => {
          socketRef.current = null;
          setPaymentData(null);
        }, 5000);
      };
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [handleMessage]);

  return {
    paymentData: paymentData ? {
      transactionId: paymentData.txid,
      amount: paymentData.valor,
      timestamp: paymentData.horario,
      additionalInfo: {
        payer: {
          name: paymentData.gnExtras.pagador.nome
        }
      }
    } : null,
    isConnected
  };
};

export default usePaymentWebSocket;