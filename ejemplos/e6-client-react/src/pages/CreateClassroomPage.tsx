import { useNavigate } from 'react-router-dom';
import ClassroomForm from '../components/ClassroomForm';
import { createClassroom } from '../services/classroomApi'; // 🔧 cambiado a minúscula
import { Classroom } from '../types/data';

export default function CreateClassroomPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Classroom, 'id'>) => {
    await createClassroom(data);
    navigate('/classrooms');
  };

  return (
    <div>
      <h2>Crear Nueva Aula</h2>
      <ClassroomForm onSubmit={handleCreate} />
    </div>
  );
}
