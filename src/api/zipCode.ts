import axios from 'axios';

export const getAddressByZipCode = async (zipCode: string) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar CEP:", error);
    throw error;
  }
};