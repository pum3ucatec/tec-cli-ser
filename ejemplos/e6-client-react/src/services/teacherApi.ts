// src/api/teacherApi.ts
import { Teacher } from '../types/data';
import api from './api'; // Asegúrate de que la ruta sea correcta

// Operaciones CRUD

export const getTeachers = async () => {
  const response = await api.get<Teacher[]>('/TeacherApi');
  return response.data; // <<--- YA DEVUELVES .data
};

export const getTeacher = (id: number) => api.get<Teacher>(`/TeacherApi/${id}`);

export const createTeacher = (teacher: Omit<Teacher, 'id'>) => {
  return api.post('/PersonsApi', teacher);
};

export const updateTeacher = (id: number, teacher: Teacher) => api.put(`/TeacherApi/${id}`, teacher);

export const deleteTeacher = (id: number) => api.delete(`/TeacherApi/${id}`);
