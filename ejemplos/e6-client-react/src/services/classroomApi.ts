// src/api/classroomApi.ts
import { Classroom } from '../types/data';
import api from './api'; // Asegúrate de que esta ruta sea correcta según tu estructura

// Operaciones CRUD para Classroom

// Obtener todos los salones
export const getClassrooms = async () => {
  try {
    const response = await api.get<Classroom[]>('/ClassroomApi');
    return response.data;
  } catch (error) {
    console.error('Error al obtener aulas:', error);
    throw new Error('No se pudieron cargar las aulas. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Obtener un salón por ID
export const getClassroom = async (id: number) => {
  try {
    const response = await api.get<Classroom>(`/ClassroomApi/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener aula:', error);
    throw new Error('No se pudo cargar el aula. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Crear un nuevo salón (omitimos el id)
export const createClassroom = async (classroom: Omit<Classroom, 'id'>) => {
  try {
    const response = await api.post('/ClassroomApi', classroom);
    return response;
  } catch (error) {
    console.error('Error al crear aula:', error);
    throw new Error('No se pudo crear el aula. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Actualizar un salón existente
export const updateClassroom = async (id: number, classroom: Classroom) => {
  try {
    const response = await api.put(`/ClassroomApi/${id}`, classroom);
    return response;
  } catch (error) {
    console.error('Error al actualizar aula:', error);
    throw new Error('No se pudo actualizar el aula. Por favor, verifica que el servidor esté corriendo.');
  }
};

// Eliminar un salón
export const deleteClassroom = async (id: number) => {
  try {
    const response = await api.delete(`/ClassroomApi/${id}`);
    return response;
  } catch (error) {
    console.error('Error al eliminar aula:', error);
    throw new Error('No se pudo eliminar el aula. Por favor, verifica que el servidor esté corriendo.');
  }
};
