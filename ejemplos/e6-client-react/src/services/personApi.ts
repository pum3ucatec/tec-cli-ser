// src/api/personsApi.ts
import { Person } from '../types/data';
import api from './api'; // Asegúrate de que la ruta sea correcta

// Operaciones CRUD

export const getPersons = async () => {
  const response = await api.get<Person[]>('/PersonsApi');
  return response.data; // <<--- YA DEVUELVES .data
};

export const getPerson = (id: number) => api.get<Person>(`/PersonsApi/${id}`);

export const createPerson = (person: Omit<Person, 'id'>) => {
  return api.post('/PersonsApi', person);
};

export const updatePerson = (id: number, person: Person) => api.put(`/PersonsApi/${id}`, person);

export const deletePerson = (id: number) => api.delete(`/PersonsApi/${id}`);
