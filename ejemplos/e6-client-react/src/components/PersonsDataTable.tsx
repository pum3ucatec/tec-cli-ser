// PersonsDataTable.tsx
import { Person } from '../types/data';
import { Link } from 'react-router-dom';  // Importamos Link para la navegación

interface DataTableProps {
  data: Person[];
}

const PersonsDataTable = ({ data }: DataTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Estado</th>
            <th className="py-2 px-4 border-b">Acciones</th>  {/* Nueva columna para acciones */}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-center">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.firstName}</td>
              <td className="py-2 px-4 border-b text-center">{item.lastName}</td>
              <td className="py-2 px-4 border-b">{item.status}</td>
              <td className="py-2 px-4 border-b text-center">
                {/* Botón de edición con un enlace a la página de edición */}
                <Link to={`/edit/${item.id}`} className="text-blue-500 hover:text-blue-700">
                  Editar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonsDataTable;
