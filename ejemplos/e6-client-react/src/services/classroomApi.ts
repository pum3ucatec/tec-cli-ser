// src/api/classroomsApi.ts
import { Classroom } from '../types/data';
import api from './api'; // Asegúrate de que la ruta sea correcta

// Operaciones CRUD

export const getClassrooms = async () => {
  const response = await api.get<Classroom[]>('/ClassroomsApi');
  return response.data;
};

export const getClassroom = (id: number) => api.get<Classroom>(`/ClassroomsApi/${id}`);

export const createClassroom = (classroom: Omit<Classroom, 'id'>) => {
  return api.post('/ClassroomsApi', classroom);
};

export const updateClassroom = (id: number, classroom: Classroom) => {
  return api.put(`/ClassroomsApi/${id}`, classroom);
};

export const deleteClassroom = (id: number) => {
  return api.delete(`/ClassroomsApi/${id}`);
};
