import axios from '../config/axios';

export const getInvitation = async () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');

    if (parts.length >= 2 && (parts[1] === 'localhost' || parts[1] === 'meuchadigital')) {
      const subdomain = parts[0];
      const apiUrl = `https://${subdomain}.meuchadigital.com/api/v1/invitation`;

      try {
        console.log('Tentando chamar URL:', apiUrl); // Log antes da chamada
        const response = await axios.get(apiUrl);
        console.log('Resposta recebida de:', response.config.url); // Log após sucesso
        return response.data;
      } catch (error) {
        // Verificação de erro do Axios alternativa
        if (error.response) {
          console.error('Erro na resposta:', {
            url: error.config.url,
            status: error.response.status,
            data: error.response.data
          });
        } else if (error.request) {
          console.error('Erro na requisição:', {
            url: apiUrl,
            message: 'Nenhuma resposta recebida'
          });
        } else {
          console.error('Erro ao configurar requisição:', error.message);
        }
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
      // const response = await axios.get(`https://${subdomain}.localhost:8000/api/v1/invitation/gifts/${id}`);
      return response.data;
    }
  }
}

export const getInvitationGifts = async () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const parts = hostname.split('.');
    if (parts.length >= 2 && parts[1] === 'localhost' || parts[1] === 'meuchadigital') {
      const subdomain = parts[0];
      const response = await axios.get(`https://${subdomain}.meuchadigital.com/api/v1/invitation/gifts`);
      // const response = await axios.get(`https://${subdomain}.localhost:8000/api/v1/invitation/gifts`);
      return response.data;
    }
  }
}