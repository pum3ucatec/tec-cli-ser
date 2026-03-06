import { createTeacher } from '../../services/teacherApi';
import TeacherForm from '../../components/teacher/TeacherForm';
import { useNavigate } from 'react-router-dom';
import { Teacher } from '../../types/data';

export default function CreateTeacherPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Teacher, 'id'>) => {
    await createTeacher(data);
    navigate('/teachers'); // Regresa al listado
  };

  return (
    <div>
      <h2>Crear Docente</h2>
      <TeacherForm onSubmit={handleCreate} />
    </div>
  );
}
