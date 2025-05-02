// DataPage.tsx
import { useState, useEffect } from 'react';
import PersonsDataTable from '../components/PersonsDataTable';
import { Person } from '../types/data.ts';
import { getPersons } from '../services/personApi.ts';
import { Link } from 'react-router-dom';  // Importa Link para la navegación

const ListPersonsPage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const persons = await getPersons();
        setData(persons);
      } catch (err) {
        console.error('Error en fetchData:', err);
        setError('Error al cargar los datos. Por favor, verifica que el servidor esté corriendo en http://localhost:5135');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        {/* Botón o enlace para crear una nueva persona */}
        <Link to="/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Crear Nueva Persona
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Listado de Personas</h1>
      <PersonsDataTable data={data} />
    </div>
  );
};

export default ListPersonsPage;
