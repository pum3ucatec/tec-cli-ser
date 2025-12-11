import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createSubject, getSubject, updateSubject } from '../services/subjectService';
import SubjectForm from '../components/SubjectForm';
import type { Subject } from '../types/data'; // ✅ Importamos el tipo

export default function SubjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ CORRECCIÓN: Subject o undefined
  const [data, setData] = useState<Subject | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getSubject(Number(id)).then(setData).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (form: any) => {
    try {
      if (id) {
        await updateSubject(Number(id), form);
      } else {
        await createSubject(form);
      }
      navigate('/subjects');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {id ? 'Editar Materia' : 'Nueva Materia'}
      </h2>
      {(data || !id) && <SubjectForm initial={data} onSubmit={handleSubmit}/>}
    </div>
  );
}