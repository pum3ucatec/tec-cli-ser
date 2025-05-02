import { useState } from 'react';
import { Classroom } from '../types/data';
import { createClassroom } from '../services/classroomApi';
import { useNavigate } from 'react-router-dom';

const CreateClassroomPage = () => {
  const [classroom, setClassroom] = useState<Classroom>({
    id: 0,
    codigo: '',
    nombre: '',
    estado: true
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createClassroom(classroom);
      navigate('/classroom');
    } catch (error) {
      console.error('Error al crear el aula:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Crear Nueva Aula</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Código</label>
          <input
            type="text"
            value={classroom.codigo}
            onChange={(e) => setClassroom({ ...classroom, codigo: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            value={classroom.nombre}
            onChange={(e) => setClassroom({ ...classroom, nombre: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            value={classroom.estado ? 'activo' : 'inactivo'}
            onChange={(e) => setClassroom({ ...classroom, estado: e.target.value === 'activo' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Crear Aula
        </button>
      </form>
    </div>
  );
};

export default CreateClassroomPage;