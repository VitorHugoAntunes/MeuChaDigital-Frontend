import api from '../config/axios';

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

  const response = await api.post('/payments/charges', dataToSend);

  console.log('response', response.data.loc.id);

  const chargeLocalStorageInfo = {
    localId: response.data.loc.id,
    giftId: data.giftId,
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

  const response = await api.post('/payments/charges', dataToSend);

  const chargeLocalStorageInfo = {
    localId: response.data.loc.id,
    giftId: data.giftId,
  };

  localStorage.setItem(`charge.${data.giftId}`, JSON.stringify(chargeLocalStorageInfo));

  return response.data;
};

export const getCharge = async (localId?: string, giftId?: string) => {
  const savedCharge = giftId ? localStorage.getItem(`charge.${giftId}`) : null;
  const parsedCharge = savedCharge ? JSON.parse(savedCharge) : null;

  const finalLocalId = localId || parsedCharge?.localId;
  const finalGiftId = giftId || parsedCharge?.giftId;


  console.log('finalLocalId', finalLocalId);
  console.log('finalGiftId', finalGiftId);
  if (!finalLocalId || !finalGiftId) {
    throw new Error('LocalId e GiftId são obrigatórios para buscar a cobrança.');
  }

  const response = await api.get(`/payments/charges/${finalLocalId}?giftId=${finalGiftId}`);
  return response.data;
};