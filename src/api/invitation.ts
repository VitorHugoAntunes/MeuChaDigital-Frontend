import axios from '../config/axios';

export const getInvitation = async () => {
  // Obtém o hostname da URL no navegador
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname; // Exemplo: "teste.localhost"
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
      const subdomain = parts[0]; // "teste"
      const response = await axios.get(`http://${subdomain}.meuchadigital.com/api/v1/invitation`);
      return response.data;
    }
  }
};

export const getInvitationGifts = async () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
      const subdomain = parts[0];
      const response = await axios.get(`http://${subdomain}.meuchadigital.com/api/v1/invitation/gifts`);
      return response.data;
    }
  }
}

export const getInvitationGift = async (id: string) => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
      const subdomain = parts[0];
      const response = await axios.get(`http://${subdomain}.meuchadigital.com/api/v1/invitation/gifts/${id}`);
      return response.data;
    }
  }
}