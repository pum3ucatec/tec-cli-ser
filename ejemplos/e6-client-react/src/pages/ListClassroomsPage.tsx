// src/pages/ListClassroomsPage.tsx
import { useEffect, useState } from 'react';
import { Classroom } from '../types/data';
import { deleteClassroom, getClassrooms } from '../services/classroomApi';
import { useNavigate } from 'react-router-dom';

export default function ListClassroomsPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const navigate = useNavigate();

  const loadClassrooms = async () => {
    const data = await getClassrooms();
    setClassrooms(data);
  };

  const handleDelete = async (id: number) => {
    if (confirm('¿Seguro que deseas eliminar esta aula?')) {
      await deleteClassroom(id);
      await loadClassrooms();
    }
  };

  useEffect(() => {
    loadClassrooms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Listado de Aulas</h1>
      <button
        onClick={() => navigate('/classrooms/create')}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Nueva Aula
      </button>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Código</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map((c) => (
            <tr key={c.id}>
              <td className="border p-2">{c.codigo}</td>
              <td className="border p-2">{c.nombre}</td>
              <td className="border p-2">{c.estado ? 'Activo' : 'Inactivo'}</td>
              <td className="border p-2">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => navigate(`/classrooms/edit/${c.id}`)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(c.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
