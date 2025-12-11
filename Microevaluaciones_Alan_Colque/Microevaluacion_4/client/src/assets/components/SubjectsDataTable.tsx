import { Link } from 'react-router-dom';
import type { Subject } from '../types/data';

export default function SubjectsDataTable({ data }: { data: Subject[] }) {
  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="w-full bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Descripción</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.ID} className="border-b hover:bg-gray-50">
              <td className="p-3">{item.ID}</td>
              <td className="p-3 font-bold">{item.Name}</td>
              <td className="p-3">{item.Description}</td>
              <td className="p-3">{item.Status}</td>
              <td className="p-3 text-center">
                <Link to={`/subjects/edit/${item.ID}`} className="text-blue-600 font-bold hover:underline">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}