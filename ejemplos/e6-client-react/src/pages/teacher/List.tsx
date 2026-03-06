// DataPage.tsx
import { useState, useEffect } from 'react';
import TeachersDataTable from '../../components/teacher/TeachersDataTable.tsx';
import { Teacher } from '../../types/data.ts'; 
import { getTeachers } from '../../services/teacherApi.ts';
import { Link } from 'react-router-dom';  // Importa Link para la navegación

const DataPage = () => {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teachers = await getTeachers();
        setData(teachers);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        {/* Botón o enlace para crear una nueva persona */}
        <Link to="/teachers/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Crear Nuevo Docente
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Listado de Docentes</h1>
      <TeachersDataTable data={data} />
    </div>
  );
};

export default DataPage;
