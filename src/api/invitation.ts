import axios from '../config/axios';

export const getInvitation = async () => {
  try {
    const response = await axios.get('/invitation');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar convite:', error);
    return null;
  }
};

// Demais endpoints mantêm a mesma estrutura
export const getInvitationGift = async (id: string) => {
  const response = await axios.get(`/invitation/gifts/${id}`);
  return response.data;
};

// export const getInvitationGifts = async () => {
//   if (typeof window !== 'undefined') {
//     const hostname = window.location.hostname;
//     const parts = hostname.split('.');
//     if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
//       const subdomain = parts[0];
//       const response = await axios.get(`https://${subdomain}.meuchadigital.com/api/v1/invitation/gifts`);
//       // const response = await axios.get(`https://${subdomain}.localhost:8000/api/v1/invitation/gifts`);
//       return response.data;
//     }
//   }
// }

export const getInvitationGifts = async () => {
  const response = await axios.get('/invitation/gifts');
  return response.data;
};