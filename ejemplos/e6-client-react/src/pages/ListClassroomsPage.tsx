import { useState, useEffect } from 'react';
import { Classroom } from '../types/data';
import { getClassrooms } from '../services/classroomApi';
import { Link } from 'react-router-dom';

const ListClassroomsPage = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getClassrooms();
        setClassrooms(data);
      } catch (err) {
        console.error('Error en fetchClassrooms:', err);
        setError('Error al cargar los datos. Por favor, verifica que el servidor esté corriendo en http://localhost:5135');
      } finally {
        setLoading(false);
      }
    };

    fetchClassrooms();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
          <div className="mt-4">
            <p className="text-sm">Por favor, asegúrate de que:</p>
            <ul className="list-disc list-inside text-sm mt-2">
              <li>El servidor de la API esté corriendo en http://localhost:5135</li>
              <li>La base de datos esté configurada correctamente</li>
              <li>No haya problemas de CORS</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link to="/classroom/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Crear Nueva Aula
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Listado de Aulas</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {classrooms.map((classroom) => (
              <tr key={classroom.id}>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {classroom.codigo}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  {classroom.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    classroom.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {classroom.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b border-gray-200 text-sm font-medium">
                  <Link
                    to={`/classroom/edit/${classroom.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-3"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListClassroomsPage; 