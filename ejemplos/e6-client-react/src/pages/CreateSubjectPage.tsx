import { createSubject } from '../services/subjectApi';
import SubjectForm from '../components/SubjectForm';
import { useNavigate } from 'react-router-dom';
import { Subject } from '../types/data';

export default function CreateSubjectPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Subject, 'id'>) => {
    await createSubject(data);
    navigate('/'); // Regresa al listado
  };

  return (
    <div>
      <h2>Crear Materia</h2>
      <SubjectForm onSubmit={handleCreate} />
    </div>
  );
}
