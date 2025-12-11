import api from './api';
import type { Career } from '../types/data';

export const getCareers = async () => (await api.get<Career[]>('/careers')).data;
export const getCareer = async (id: number) => (await api.get<Career>(`/careers/${id}`)).data;
export const createCareer = (d: Omit<Career, 'ID'>) => api.post('/careers', d);
export const updateCareer = (id: number, d: Omit<Career, 'ID'>) => api.put(`/careers/${id}`, d);
export const deleteCareer = (id: number) => api.delete(`/careers/${id}`);