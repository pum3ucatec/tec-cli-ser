import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable.tsx';
import { Person } from '../types/data';
import { getPersons } from '../services/api';

const DataPage = () => {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const persons = await getPersons();
        setData(persons);
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
      <h1 className="text-2xl font-bold mb-6">Listado de Personas</h1>
      <DataTable data={data} />
    </div>
  );
};

export default DataPage;