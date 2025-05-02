import { Classroom } from '../types/data';
import { Link } from 'react-router-dom'; // Importamos Link para la navegación

interface DataTableProps {
  data: Classroom[];
  onDelete: (id: number) => void; // Necesitamos una función para eliminar
}

const ClassroomDataTable = ({ data, onDelete }: DataTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Código</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.code}</td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
              <td className="py-2 px-4 border-b text-center">
                <Link to={`/classroom/edit/${item.id}`} className="text-blue-500 hover:text-blue-700">
                  Editar
                </Link>
                <button
                  onClick={() => onDelete(item.id)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomDataTable;
