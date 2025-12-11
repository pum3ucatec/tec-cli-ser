import { useEffect, useState } from 'react';
import { getPersons, deletePerson } from '../services/personService';
import PersonsDataTable from '../components/PersonsDataTable';
import { Link } from 'react-router-dom';
import type { Person } from '../types/data'; // ✅ Importamos el tipo

export default function PersonsList() {
  // ✅ CORRECCIÓN: Definimos que es un array de Personas
  const [data, setData] = useState<Person[]>([]);

  const loadData = async () => {
    try {
      const result = await getPersons();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('¿Eliminar registro?')) {
      await deletePerson(id);
      loadData();
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Personas</h1>
        <Link to="/persons/new" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          + Nueva Persona
        </Link>
      </div>
      {/* Puedes pasar handleDelete a tu tabla si decides agregar el botón de borrar ahí */}
      <PersonsDataTable data={data} />
    </div>
  );
}