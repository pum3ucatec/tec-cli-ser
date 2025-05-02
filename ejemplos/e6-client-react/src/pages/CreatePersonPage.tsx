import { createPerson } from '../services/personApi';
import PersonForm from '../components/PersonForm';
import { useNavigate } from 'react-router-dom';
import { Person } from '../types/data';

export default function CreatePersonPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<Person, 'id'>) => {
    await createPerson(data);
    navigate('/'); // Regresa al listado
  };

  return (
    <div>
      <h2>Crear Persona</h2>
      <PersonForm onSubmit={handleCreate} />
    </div>
  );
}
