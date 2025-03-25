import axios from 'axios';

export const getInvitation = async () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 2 && (parts[1] === 'localhost' || parts[1] === 'meuchadigital')) {
      const subdomain = parts[0];

      const apiUrl = `https://${subdomain}.meuchadigital.com/api/v1/invitation`;

      try {
        const response = await axios.get(apiUrl);
        return response.data;
      } catch (error) {
        console.error('Erro ao buscar convite:', error);
        return null;
      }
    }
  }
};


export const getInvitationGift = async (id: string) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
      const subdomain = parts[0];
      const response = await axios.get(`https://${subdomain}.meuchadigital.com/api/v1/invitation/gifts/${id}`);
      return response.data;
    }
  }
}