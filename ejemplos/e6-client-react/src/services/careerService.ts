import axios from 'axios';
import { Career } from '../types/Career';

const API_URL = 'http://localhost:5134/api/CareerApi';

export const careerService = {
    getAll: async (): Promise<Career[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    getById: async (id: number): Promise<Career> => {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    },

    create: async (career: Omit<Career, 'id'>): Promise<Career> => {
        const response = await axios.post(API_URL, career);
        return response.data;
    },

    update: async (id: number, career: Career): Promise<void> => {
        await axios.put(`${API_URL}/${id}`, career);
    },

    delete: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
}; 