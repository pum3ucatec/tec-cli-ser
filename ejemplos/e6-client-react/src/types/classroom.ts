export interface Classroom {
    id: number;
    name: string;
    capacity: number;
    location: string;
    isActive: boolean;
}

export interface CreateClassroomDto {
    name: string;
    capacity: number;
    location: string;
    isActive: boolean;
}

export interface UpdateClassroomDto {
    id: number;
    name: string;
    capacity: number;
    location: string;
    isActive: boolean;
} 