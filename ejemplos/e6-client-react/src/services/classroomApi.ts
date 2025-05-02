// src/services/classroomApi.ts
import { Classroom } from '../types/data';
import api from './api';

export const getClassrooms = async () => {
  const response = await api.get<Classroom[]>('/ClassroomApi');
  return response.data;
};

export const getClassroom = (id: number) => api.get<Classroom>(`/ClassroomApi/${id}`);

export const createClassroom = (data: Omit<Classroom, 'id'>) =>
  api.post('/ClassroomApi', data);

export const updateClassroom = (id: number, data: Classroom) =>
  api.put(`/ClassroomApi/${id}`, data);

export const deleteClassroom = (id: number) =>
  api.delete(`/ClassroomApi/${id}`);