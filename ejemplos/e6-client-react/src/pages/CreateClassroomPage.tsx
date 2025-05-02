// src/pages/CreateClassroomPage.tsx
import { useNavigate } from 'react-router-dom';
import { createClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';
import { Classroom } from '../types/data';

export default function CreateClassroomPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Classroom, 'id'>) => {
    await createClassroom(data);
    navigate('/classrooms');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Crear Aula</h1>
      <ClassroomForm onSubmit={handleCreate} />
    </div>
  );
}
