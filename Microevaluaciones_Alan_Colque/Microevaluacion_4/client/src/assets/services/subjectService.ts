import api from './api';
import type { Subject } from '../types/data';

export const getSubjects = async () => (await api.get<Subject[]>('/subjects')).data;
export const getSubject = async (id: number) => (await api.get<Subject>(`/subjects/${id}`)).data;
export const createSubject = (d: Omit<Subject, 'ID'>) => api.post('/subjects', d);
export const updateSubject = (id: number, d: Omit<Subject, 'ID'>) => api.put(`/subjects/${id}`, d);
export const deleteSubject = (id: number) => api.delete(`/subjects/${id}`);