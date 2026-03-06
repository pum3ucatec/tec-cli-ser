import { useEffect, useState } from 'react';
import { getTeacher, updateTeacher } from '../../services/teacherApi';
import TeacherForm from '../../components/teacher/TeacherForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Teacher } from '../../types/data';

export default function EditTeacherPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeacher = async () => {
      const response = await getTeacher(Number(id));
      setTeacher(response.data);
    };
    fetchTeacher();
  }, [id]);

  const handleUpdate = async (data: Omit<Teacher, 'id'>) => {
    await updateTeacher(Number(id), { ...data, id: Number(id) });
    navigate('/teachers');
  };

  if (!teacher) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Docente</h2>
      <TeacherForm initialData={teacher} onSubmit={handleUpdate} />
    </div>
  );
}
