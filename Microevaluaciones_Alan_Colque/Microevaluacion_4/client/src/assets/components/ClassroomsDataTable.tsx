import { Link } from 'react-router-dom';
import type { Classroom } from '../types/data';

export default function ClassroomsDataTable({ data }: { data: Classroom[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Código</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.ID}</td>
              <td className="p-3 font-bold">{item.Code}</td>
              <td className="p-3">{item.Name}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${item.Status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{item.Status}</span>
              </td>
              <td className="p-3 text-center">
                <Link to={`/classrooms/edit/${item.ID}`} className="text-blue-600 font-bold hover:underline">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}