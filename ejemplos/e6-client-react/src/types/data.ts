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
  id?: number;
  code: string;
  name: string;
  status: string;
}

export interface Voleyball {
  id?: number;
  teamName: string;
  coach: string;
  schedule: string;
}

