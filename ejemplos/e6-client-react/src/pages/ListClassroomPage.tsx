import { useEffect, useState } from 'react';
import { Classroom } from '../types/data';
import { getClassrooms, deleteClassroom } from '../services/classroomApi';
import { Link } from 'react-router-dom';

export default function ListClassroomPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  useEffect(() => {
    getClassrooms().then(setClassrooms);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteClassroom(id);
    setClassrooms(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <h2>Lista de Aulas</h2>
      <Link to="/classrooms/create">Crear nueva aula</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map(c => (
            <tr key={c.id}>
              <td>{c.code}</td>
              <td>{c.name}</td>
              <td>{c.status}</td>
              <td>
                <Link to={`/classrooms/edit/${c.id}`}>Editar</Link> |{" "}
                <button onClick={() => handleDelete(c.id!)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
