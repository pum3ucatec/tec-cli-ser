import { useEffect, useState } from 'react';
import { getPerson, updatePerson } from '../services/personApi';
import PersonForm from '../components/PersonForm';
import { useParams, useNavigate } from 'react-router-dom';
import { Person } from '../types/data';

export default function EditPersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      const response = await getPerson(Number(id));
      setPerson(response.data);
    };
    fetchPerson();
  }, [id]);

  const handleUpdate = async (data: Omit<Person, 'id'>) => {
    await updatePerson(Number(id), { ...data, id: Number(id) });
    navigate('/');
  };

  if (!person) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Persona</h2>
      <PersonForm initialData={person} onSubmit={handleUpdate} />
    </div>
  );
}
