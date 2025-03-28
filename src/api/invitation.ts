import axios from '../config/axios';

export const getInvitation = async (slug: string) => {
  try {
    const response = await axios.get('/invitation', {
      params: {
        subdomain: slug
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar convite:', {
      error,
      url: error.config?.baseURL + error.config?.url,
    });
    return null;
  }
};

export const getInvitationGift = async (slug: string, id: string) => {
  try {
    const response = await axios.get(`/invitation/gifts/${id}`, {
      params: {
        subdomain: slug
      },
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error('[API] Erro ao buscar presente:', {
      error,
      url: error.config?.baseURL + error.config?.url,
      giftId: id
    });
    throw error;
  }
};

export const getInvitationGifts = async (slug: string) => {
  try {
    const response = await axios.get('/invitation/gifts', {
      params: {
        subdomain: slug
      },
      withCredentials: true
    });
    return response.data;
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