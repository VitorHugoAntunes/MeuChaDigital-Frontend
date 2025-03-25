// import api from '../config/axios';
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000/api/v1',
  baseURL: 'https://api.meuchadigital.com/api/v1',
});
export interface ChargeDefaultUserData {
  expiration: number;
  value: string;
  pixKey: string;
  requestPayer: string;
  giftId: string;
  payerId: string;
}

export interface ChargeGuestUserData extends Omit<ChargeDefaultUserData, 'payerId'> {
  isGuest: boolean;
}

const formatValue = (value: string) => {
  const [integerPart, decimalPart = ''] = value.split('.');

  const formattedDecimalPart = decimalPart.padEnd(2, '0').slice(0, 2);

  return `${integerPart}.${formattedDecimalPart}`;
};

export const createDefaultCharge = async (data: ChargeDefaultUserData) => {
  const dataToSend = {
    expiracao: data.expiration,
    original: formatValue(data.value),
    chave: data.pixKey,
    solicitacaoPagador: data.requestPayer,
    giftId: data.giftId,
    payerId: data.payerId,
  };

  console.log('dataToSend', dataToSend);

  const response = await api.post('/payments/charges', JSON.stringify(dataToSend), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const chargeLocalStorageInfo = {
    localId: response.data.loc.id,
    giftId: data.giftId,
    expirationDate: Date.now() + data.expiration * 1000,
  };

  console.log('chargeLocalStorageInfo', chargeLocalStorageInfo);

  localStorage.setItem(`charge.${data.giftId}`, JSON.stringify(chargeLocalStorageInfo));

  return response.data;
};

export const createGuestCharge = async (data: ChargeGuestUserData) => {
  const dataToSend = {
    expiracao: data.expiration,
    original: formatValue(data.value),
    chave: data.pixKey,
    solicitacaoPagador: data.requestPayer,
    giftId: data.giftId,
    isGuest: data.isGuest,
  };

  console.log('dataToSend', dataToSend);

  const response = await api.post('/payments/charges', JSON.stringify(dataToSend), {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const chargeLocalStorageInfo = {
    localId: response.data.loc.id,
    giftId: data.giftId,
    expirationDate: Date.now() + data.expiration * 1000, // Calcula o timestamp de expiração
  };

  localStorage.setItem(`charge.${data.giftId}`, JSON.stringify(chargeLocalStorageInfo));

  return response.data;
};

export const getCharge = async (localId?: string, giftId?: string) => {
  const savedCharge = giftId ? localStorage.getItem(`charge.${giftId}`) : null;
  const parsedCharge = savedCharge ? JSON.parse(savedCharge) : null;

  console.log('a cobranca que foi resgatada', parsedCharge);

  if (parsedCharge && parsedCharge.expirationDate) {
    const currentTime = Date.now();
    const expirationTime = parsedCharge.expirationDate;

    if (currentTime > expirationTime) {
      console.log('currentTime e expirationTime', currentTime, expirationTime);

      localStorage.removeItem(`charge.${giftId}`);
      return;
    }
  }

  const finalLocalId = localId || parsedCharge?.localId;
  const finalGiftId = giftId || parsedCharge?.giftId;

  if (!finalLocalId || !finalGiftId) {
    return;
  }

  const response = await api.get(`/payments/charges/${finalLocalId}?giftId=${finalGiftId}`);
  return response.data;
};