// src/pages/EditClassroomPage.tsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassroom, updateClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';
import { Classroom } from '../types/data';

export default function EditClassroomPage() {
  const { id } = useParams<{ id: string }>();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClassroom = async () => {
      const res = await getClassroom(Number(id));
      setClassroom(res.data);
    };
    loadClassroom();
  }, [id]);

  const handleUpdate = async (data: Omit<Classroom, 'id'>) => {
    if (!classroom) return;
    await updateClassroom(classroom.id, { ...classroom, ...data });
    navigate('/classrooms');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Editar Aula</h1>
      {classroom ? (
        <ClassroomForm initialData={classroom} onSubmit={handleUpdate} />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
}
