import axios from 'axios';
import { Classroom } from '../types/data';

const API_URL = 'http://localhost:5134/api/ClassroomApi';

export const getClassrooms = async () => {
  const res = await axios.get<Classroom[]>(API_URL);
  return res.data;
};

export const getClassroom = async (id: number) => {
  const res = await axios.get<Classroom>(`${API_URL}/${id}`);
  return res.data;
};

export const createClassroom = async (classroom: Omit<Classroom, 'id'>) => {
  const res = await axios.post<Classroom>(API_URL, classroom);
  return res.data;
};

export const updateClassroom = async (id: number, classroom: Classroom) => {
  const res = await axios.put(`${API_URL}/${id}`, classroom);
  return res.data;
};

export const deleteClassroom = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
}; 