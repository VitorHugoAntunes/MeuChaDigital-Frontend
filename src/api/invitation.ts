import axios from '../config/axios';

export const getInvitation = async () => {
  try {
    // O Axios vai combinar baseURL + '/invitation'
    // Exemplo: https://api.meuchadigital.com/api/v1/invitation
    const url = `${axios.defaults.baseURL}/invitation`;
    console.log('[API] GET Invitation URL:', url);

    // const response = await axios.get('/invitation');
    // return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar convite:', {
      error,
      url: error.config?.baseURL + error.config?.url // Log da URL que falhou
    });
    return null;
  }
};

export const getInvitationGift = async (id: string) => {
  try {
    // Monta a URL completa para debug
    const url = `${axios.defaults.baseURL}/invitation/gifts/${id}`;
    console.log('[API] GET Gift URL:', url);

    // const response = await axios.get(`/invitation/gifts/${id}`);
    // return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar presente:', {
      error,
      url: error.config?.baseURL + error.config?.url,
      giftId: id
    });
    throw error; // Propaga o erro para ser tratado pelo chamador
  }
};

export const getInvitationGifts = async () => {
  try {
    // URL completa para monitoramento
    const url = `${axios.defaults.baseURL}/invitation/gifts`;
    console.log('[API] GET Gifts List URL:', url);

    // const response = await axios.get('/invitation/gifts');
    // return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar lista de presentes:', {
      error,
      url: error.config?.baseURL + error.config?.url
    });
    throw error;
  }
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