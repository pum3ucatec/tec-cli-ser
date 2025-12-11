import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createPerson, getPerson, updatePerson } from '../services/personService';
import PersonForm from '../components/PersonForm';
import type { Person } from '../types/data'; // ✅ Importamos el tipo

export default function PersonPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // ✅ CORRECCIÓN: Puede ser Person o undefined
  const [data, setData] = useState<Person | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getPerson(Number(id)).then(setData).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (form: any) => {
    try {
      if (id) {
        await updatePerson(Number(id), form);
      } else {
        await createPerson(form);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {id ? 'Editar Persona' : 'Nueva Persona'}
      </h2>
      {(data || !id) && <PersonForm initial={data} onSubmit={handleSubmit}/>}
    </div>
  );
}