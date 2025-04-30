// src/api/personsApi.ts
import { Subject } from '../types/data';
import api from './api'; // Asegúrate de que la ruta sea correcta

// Operaciones CRUD

export const getSubjects = async () => {
  const response = await api.get<Subject[]>('/SubjectApi');
  return response.data; // <<--- YA DEVUELVES .data
};

export const getSubject = (id: number) => api.get<Subject>(`/SubjectApi/${id}`);

export const createSubject = (subject: Omit<Subject, 'id'>) => {
  return api.post('/SubjectApi', subject);
};

export const updateSubject = (id: number, subject: Subject) => api.put(`/SubjectApi/${id}`, subject);

export const deleteSubject = (id: number) => api.delete(`/SubjetApi/${id}`);
