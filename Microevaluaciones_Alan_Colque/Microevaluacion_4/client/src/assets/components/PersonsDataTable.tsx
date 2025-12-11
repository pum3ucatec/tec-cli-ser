import { Link } from 'react-router-dom';
import type { Person } from '../types/data';
export default function PersonsDataTable({ data }: { data: Person[] }) {
  return (
    <table className="w-full border">
      <thead><tr className="bg-gray-100"><th>ID</th><th>Nombre</th><th>Apellido</th><th>Acciones</th></tr></thead>
      <tbody>
        {data.map(i => (
          <tr key={i.ID} className="border-b text-center">
            <td>{i.ID}</td><td>{i.FirstName}</td><td>{i.LastName}</td>
            <td><Link to={`/persons/edit/${i.ID}`} className="text-blue-500">Editar</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}