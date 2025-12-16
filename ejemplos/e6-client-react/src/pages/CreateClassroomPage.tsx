import { createClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm.tsx';
import { useNavigate } from 'react-router-dom';
import { Classroom } from '../types/data';

export default function CreatePersonPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Classroom, 'id'>) => {
    await createClassroom(data);
    navigate('/Classrooms'); // Regresa al listado
  };

  return (
    <div>
      <h2>Crear Aula</h2>
      <ClassroomForm onSubmit={handleCreate} />
    </div>
  );
}
