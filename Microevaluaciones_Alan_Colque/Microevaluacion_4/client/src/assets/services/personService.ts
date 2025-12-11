import api from './api'; import type { Person } from '../types/data';
export const getPersons = async () => (await api.get<Person[]>('/persons')).data;
export const getPerson = async (id: number) => (await api.get<Person>(`/persons/${id}`)).data;
export const createPerson = (d: any) => api.post('/persons', d);
export const updatePerson = (id: number, d: any) => api.put(`/persons/${id}`, d);
export const deletePerson = (id: number) => api.delete(`/persons/${id}`);