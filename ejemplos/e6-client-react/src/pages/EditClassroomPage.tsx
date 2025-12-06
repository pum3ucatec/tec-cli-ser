import { useEffect, useState } from 'react';
import { getClassroom, updateClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Classroom } from '../types/data';

export default function EditPersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    const fetchClassroom = async () => {
      const response = await getClassroom(Number(id));
      setClassroom(response.data);
    };
    fetchClassroom();
  }, [id]);

  const handleUpdate = async (data: Omit<Classroom, 'id'>) => {
    await updateClassroom(Number(id), { ...data, id: Number(id) });
    navigate('/Classrooms');
  };

  if (!classroom) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Aula</h2>
      <ClassroomForm initialData={classroom} onSubmit={handleUpdate} />
    </div>
  );
}
