import { Classroom, CreateClassroomDto, UpdateClassroomDto } from '../types/Classroom';

const API_URL = 'http://localhost:5134/api/ClassroomApi';

export const classroomService = {
    getAll: async (): Promise<Classroom[]> => {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch classrooms');
        }
        return response.json();
    },

    getById: async (id: number): Promise<Classroom> => {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch classroom');
        }
        return response.json();
    },

    create: async (classroom: CreateClassroomDto): Promise<Classroom> => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classroom),
        });
        if (!response.ok) {
            throw new Error('Failed to create classroom');
        }
        return response.json();
    },

    update: async (classroom: UpdateClassroomDto): Promise<void> => {
        const response = await fetch(`${API_URL}/${classroom.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classroom),
        });
        if (!response.ok) {
            throw new Error('Failed to update classroom');
        }
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete classroom');
        }
    },
}; 