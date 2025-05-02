import { Person } from '../types/data';
import api from './api';

// Operaciones CRUD para Person

// Obtener todas las personas
export const getPersons = async () => {
  try {
    const response = await api.get<Person[]>('/PersonsApi');
    return response.data;
  } catch (error) {
    console.error('Error al obtener personas:', error);
    throw new Error('No se pudieron cargar las personas. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Obtener una persona por ID
export const getPerson = async (id: number) => {
  try {
    const response = await api.get<Person>(`/PersonsApi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener persona:', error);
    throw new Error('No se pudo cargar la persona. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Crear una nueva persona
export const createPerson = async (person: Omit<Person, 'id'>) => {
  try {
    const response = await api.post('/PersonsApi', person);
    return response.data;
  } catch (error) {
    console.error('Error al crear persona:', error);
    throw new Error('No se pudo crear la persona. Por favor, verifica que el servidor esté corriendo.');
  }
};

export const updatePerson = async (id: number, person: Person) => {
  try {
    const response = await api.put(`/PersonsApi/${id}`, person);
    return response;
  } catch (error) {
    console.error('Error al actualizar persona:', error);
    throw new Error('No se pudo actualizar la persona. Por favor, verifica que el servidor esté corriendo.');
  }
};

export const deletePerson = async (id: number) => {
  try {
    const response = await api.delete(`/PersonsApi/${id}`);
    return response;
  } catch (error) {
    console.error('Error al eliminar persona:', error);
    throw new Error('No se pudo eliminar la persona. Por favor, verifica que el servidor esté corriendo.');
  }
};
