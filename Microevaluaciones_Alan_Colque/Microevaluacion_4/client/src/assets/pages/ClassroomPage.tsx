import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createClassroom, getClassroom, updateClassroom } from '../services/classroomService';
import ClassroomForm from '../components/ClassroomForm';
import type { Classroom } from '../types/data'; // ✅ Importamos el tipo

export default function ClassroomPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ CORRECCIÓN: Classroom o undefined
  const [data, setData] = useState<Classroom | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getClassroom(Number(id)).then(setData).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (form: any) => {
    try {
      if (id) {
        await updateClassroom(Number(id), form);
      } else {
        await createClassroom(form);
      }
      navigate('/classrooms');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {id ? 'Editar Aula' : 'Nueva Aula'}
      </h2>
      {(data || !id) && <ClassroomForm initial={data} onSubmit={handleSubmit}/>}
    </div>
  );
}