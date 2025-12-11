import { useEffect, useState } from 'react';
import { getSubjects } from '../services/subjectService';
import SubjectsDataTable from '../components/SubjectsDataTable';
import { Link } from 'react-router-dom';
import type { Subject } from '../types/data'; // ✅ Importamos el tipo

export default function SubjectsList() {
  // ✅ CORRECCIÓN: Array de Subject
  const [data, setData] = useState<Subject[]>([]);

  useEffect(() => {
    getSubjects().then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Materias</h1>
        <Link to="/subjects/new" className="bg-purple-600 text-white px-4 py-2 rounded shadow hover:bg-purple-700">
          + Nueva Materia
        </Link>
      </div>
      <SubjectsDataTable data={data} />
    </div>
  );
}