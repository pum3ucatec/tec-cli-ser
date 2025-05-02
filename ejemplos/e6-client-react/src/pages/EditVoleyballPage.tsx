import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VoleyballForm from '../components/VoleyballForm';
import { getVoleyball, updateVoleyball } from '../services/VoleyballApi';
import { Voleyball } from '../types/data';

export default function EditVoleyballPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState<Voleyball>();

  useEffect(() => {
    getVoleyball(Number(id)).then(res => setTeam(res.data));
  }, [id]);

  const handleUpdate = async (data: Omit<Voleyball, 'id'>) => {
    await updateVoleyball(Number(id), { id: Number(id), ...data });
    navigate('/voleyballs');
  };

  if (!team) return <div>Cargando...</div>;

  return (
    <div>
      <h2>Editar Equipo</h2>
      <VoleyballForm initialData={team} onSubmit={handleUpdate} />
    </div>
  );
}
