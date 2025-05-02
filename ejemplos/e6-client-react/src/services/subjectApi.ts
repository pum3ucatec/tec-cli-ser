import { Subject } from '../types/data';
import api from './api';

// Operaciones CRUD para Subject

// Obtener todas las materias
export const getSubjects = async () => {
  try {
    const response = await api.get<Subject[]>('/SubjectApi');
    return response.data;
  } catch (error) {
    console.error('Error al obtener materias:', error);
    throw new Error('No se pudieron cargar las materias. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Obtener una materia por ID
export const getSubject = async (id: number) => {
  try {
    const response = await api.get<Subject>(`/SubjectApi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener materia:', error);
    throw new Error('No se pudo cargar la materia. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Crear una nueva materia
export const createSubject = async (subject: Omit<Subject, 'id'>) => {
  try {
    const response = await api.post('/SubjectApi', subject);
    return response.data;
  } catch (error) {
    console.error('Error al crear materia:', error);
    throw new Error('No se pudo crear la materia. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Actualizar una materia existente
export const updateSubject = async (id: number, subject: Subject) => {
  try {
    const response = await api.put(`/SubjectApi/${id}`, subject);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar materia:', error);
    throw new Error('No se pudo actualizar la materia. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Eliminar una materia
export const deleteSubject = async (id: number) => {
  try {
    const response = await api.delete(`/SubjectApi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar materia:', error);
    throw new Error('No se pudo eliminar la materia. Por favor, verifica que el servidor esté corriendo.');
  }
};
