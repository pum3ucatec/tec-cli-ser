import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // Asegúrate de usar /api aquí
  headers: {
    'Accept': 'application/json', // Cambiado a application/json
  }
});

export const getPersons = async () => {
  try {
    // IMPORTANTE: Usa exactamente esta ruta
    const response = await api.get('/PersonsApi');
    return response.data;
  } catch (error) {
    console.error('Error fetching persons:', error);
    throw error;
  }
};