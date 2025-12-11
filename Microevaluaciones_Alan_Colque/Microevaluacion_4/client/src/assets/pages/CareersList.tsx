import { useEffect, useState } from 'react';
import { getCareers } from '../services/careerService';
import CareersDataTable from '../components/CareersDataTable';
import { Link } from 'react-router-dom';
import type { Career } from '../types/data'; // ✅ Importamos el tipo

export default function CareersList() {
  // ✅ CORRECCIÓN: Array de Career
  const [data, setData] = useState<Career[]>([]);

  useEffect(() => {
    getCareers().then(setData).catch(console.error);
  }, []);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Carreras</h1>
        <Link to="/careers/new" className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600">
          + Nueva Carrera
        </Link>
      </div>
      <CareersDataTable data={data} />
    </div>
  );
}