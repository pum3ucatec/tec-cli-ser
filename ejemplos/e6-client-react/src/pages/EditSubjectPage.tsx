import { useEffect, useState } from 'react';
import { getSubject, updateSubject } from '../services/subjectApi';
import SubjectForm from '../components/SubjectForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Subject } from '../types/data';

export default function EditSubjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState<Subject | null>(null);

  useEffect(() => {
    const fetchSubject = async () => {
      const response = await getSubject(Number(id));
      setSubject(response.data);
    };
    fetchSubject();
  }, [id]);

  const handleUpdate = async (data: Omit<Subject, 'id'>) => {
    await updateSubject(Number(id), { ...data, id: Number(id) });
    navigate('/subjects');
  };

  if (!subject) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Materia</h2>
      <SubjectForm initialData={subject} onSubmit={handleUpdate} />
    </div>
  );
}
