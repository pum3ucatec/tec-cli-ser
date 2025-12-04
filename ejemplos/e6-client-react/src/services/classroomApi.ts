// src/api/classroomApi.ts
import { Classroom } from '../types/data';
import api from './api'; // Asegúrate de que la ruta sea correcta

// Operaciones CRUD

export const getClassrooms = async () => {
  const response = await api.get<Classroom[]>('/ClassroomApi');
  return response.data; // <<--- YA DEVUELVES .data
};

export const getClassroom = (id: number) => api.get<Classroom>(`/ClassroomApi/${id}`);

export const createClassroom = (classroom: Omit<Classroom, 'id'>) => {
  return api.post('/ClassroomApi', classroom);
};

export const updateClassroom = (id: number, classroom: Classroom) => api.put(`/ClassroomApi/${id}`, classroom);

export const deleteClassroom = (id: number) => api.delete(`/ClassroomsApi/${id}`);
