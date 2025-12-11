import api from './api';
import type { Classroom } from '../types/data';

export const getClassrooms = async () => (await api.get<Classroom[]>('/classrooms')).data;
export const getClassroom = async (id: number) => (await api.get<Classroom>(`/classrooms/${id}`)).data;
export const createClassroom = (d: Omit<Classroom, 'ID'>) => api.post('/classrooms', d);
export const updateClassroom = (id: number, d: Omit<Classroom, 'ID'>) => api.put(`/classrooms/${id}`, d);
export const deleteClassroom = (id: number) => api.delete(`/classrooms/${id}`);