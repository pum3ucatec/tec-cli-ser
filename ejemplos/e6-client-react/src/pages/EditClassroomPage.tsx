import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Classroom } from '../types/data';
import { getClassroom, updateClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';

export default function EditClassroomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState<Classroom>();

  useEffect(() => {
    getClassroom(Number(id)).then(res => setClassroom(res.data));
  }, [id]);

  const handleUpdate = async (data: Omit<Classroom, 'id'>) => {
    await updateClassroom(Number(id), { id: Number(id), ...data });
    navigate('/classrooms');
  };

  if (!classroom) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Aula</h2>
      <ClassroomForm initialData={classroom} onSubmit={handleUpdate} />
    </div>
  );
}
