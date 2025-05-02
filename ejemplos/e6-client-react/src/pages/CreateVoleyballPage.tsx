import VoleyballForm from '../components/VoleyballForm';
import { createVoleyball } from '../services/VoleyballApi';
import { useNavigate } from 'react-router-dom';

export default function CreateVoleyballPage() {
  const navigate = useNavigate();

  const handleCreate = async (data: Omit<import('../types/data').Voleyball, 'id'>) => {
    await createVoleyball(data);
    navigate('/voleyballs');
  };

  return (
    <div>
      <h2>Crear Equipo de Voleibol</h2>
      <VoleyballForm onSubmit={handleCreate} />
    </div>
  );
}
