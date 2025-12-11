import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCareer, getCareer, updateCareer } from '../services/careerService';
import CareerForm from '../components/CareerForm';
import type { Career } from '../types/data'; // ✅ Importamos el tipo

export default function CareerPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ CORRECCIÓN: Career o undefined
  const [data, setData] = useState<Career | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getCareer(Number(id)).then(setData).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (form: any) => {
    try {
      if (id) {
        await updateCareer(Number(id), form);
      } else {
        await createCareer(form);
      }
      navigate('/careers');
    } catch (error) {
      console.error(error);
      alert('Error al guardar');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        {id ? 'Editar Carrera' : 'Nueva Carrera'}
      </h2>
      {(data || !id) && <CareerForm initial={data} onSubmit={handleSubmit}/>}
    </div>
  );
}