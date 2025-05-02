import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Classroom } from '../types/data';
import { getClassroom, updateClassroom } from "../services/classroomApi";

const EditClassroomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const data = await getClassroom(Number(id));
        setClassroom(data);
      } catch (error) {
        console.error('Error al obtener el aula:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClassroom();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!classroom) {
    return <div>No se encontró el aula</div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClassroom(classroom.id, classroom);
      navigate('/classroom');
    } catch (error) {
      console.error('Error al actualizar el aula:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Editar Aula</h1>
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
          Actualizar Aula
        </button>
      </form>
    </div>
  );
};

export default EditClassroomPage;