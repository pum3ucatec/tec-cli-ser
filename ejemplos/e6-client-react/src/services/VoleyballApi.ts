import { Voleyball } from '../types/data';
import api from './api'; // Configuración base de Axios

// Operaciones CRUD para Voleyball

export const getVoleyballs = async () => {
  const response = await api.get<Voleyball[]>('/VoleyballApi');
  return response.data;
};

export const getVoleyball = (id: number) => api.get<Voleyball>(`/VoleyballApi/${id}`);

export const createVoleyball = (voleyball: Omit<Voleyball, 'id'>) => {
  return api.post('/VoleyballApi', voleyball);
};

export const updateVoleyball = (id: number, voleyball: Voleyball) =>
  api.put(`/VoleyballApi/${id}`, voleyball);

export const deleteVoleyball = (id: number) => api.delete(`/VoleyballApi/${id}`);
