export interface Person {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

export interface Subject {
  id: number;
  name: string;
  description: string;
  status: string;
}
export interface Classroom {
  id: number;
  codigo: string;
  nombre: string;
  estado: boolean;
}