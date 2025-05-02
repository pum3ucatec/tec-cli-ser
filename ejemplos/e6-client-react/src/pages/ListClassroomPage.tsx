import { useState, useEffect } from 'react';
import ClassroomsDataTable from '../components/ClassroomDataTable'; // Importa el componente de la tabla de aulas
import { Classroom } from '../types/data'; // Importa el tipo Classroom
import { getClassrooms, deleteClassroom } from '../services/classroomApi'; // Importa las funciones de servicio
import { Link } from 'react-router-dom';  // Importa Link para la navegación

const ListClassroomPage = () => { // Cambié el nombre de la página a ListClassroomPage
  const [data, setData] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classrooms = await getClassrooms();
        setData(classrooms);
      } catch (err) {
        setError('Error al cargar los datos. Por favor, inténtelo de nuevo.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteClassroom(id);
      // Actualiza el listado eliminando el aula con el ID correspondiente
      setData(data.filter(classroom => classroom.id !== id));
    } catch (err) {
      setError('Error al eliminar el aula.');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando datos...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        {/* Botón o enlace para crear una nueva aula */}
        <Link to="/classrooms/create">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Crear Nueva Aula
          </button>
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Listado de Aulas</h1>
      <ClassroomsDataTable data={data} onDelete={handleDelete} />
    </div>
  );
};

export default ListClassroomPage;
