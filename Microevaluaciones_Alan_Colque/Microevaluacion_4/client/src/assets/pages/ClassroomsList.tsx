import { useEffect, useState } from 'react';
import { getClassrooms } from '../services/classroomService';
import ClassroomsDataTable from '../components/ClassroomsDataTable';
import { Link } from 'react-router-dom';
import type { Classroom } from '../types/data'; // ✅ Importamos el tipo

export default function ClassroomsList() {
  // ✅ CORRECCIÓN: Array de Classroom
  const [data, setData] = useState<Classroom[]>([]);

  useEffect(() => {
    getClassrooms().then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Aulas</h1>
        <Link to="/classrooms/new" className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">
          + Nueva Aula
        </Link>
      </div>
      <ClassroomsDataTable data={data} />
    </div>
  );
}