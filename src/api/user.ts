import axios from 'axios';

export const userAuthenticated = async () => {
  try {
    // const response = await axios.get('http://localhost:8000/api/v1/auth/user', { withCredentials: true });
    const response = await axios.get('https://api.meuchadigital.com/api/v1/auth/user', { withCredentials: true });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null;
    }

    throw error;
  }
};

export const getUser = async (id: string) => {
  // const response = await axios.get(`http://localhost:8000/api/v1/users/id/${id}`, { withCredentials: true });
  const response = await axios.get(`https://api.meuchadigital.com/api/v1/users/id/${id}`, { withCredentials: true });
  return response.data;
};

export const deleteUser = async (id: string) => {
  // const response = await axios.delete(`http://localhost:8000/api/v1/users/${id}`, { withCredentials: true });
  const response = await axios.delete(`https://api.meuchadigital.com/api/v1/users/${id}`, { withCredentials: true });
  return response.data;
}