import { useEffect, useState } from 'react';
import { Voleyball } from '../types/data';
import { getVoleyballs, deleteVoleyball } from '../services/VoleyballApi';
import { Link } from 'react-router-dom';

export default function ListVoleyballPage() {
  const [teams, setTeams] = useState<Voleyball[]>([]);

  useEffect(() => {
    getVoleyballs().then(setTeams);
  }, []);

  const handleDelete = async (id: number) => {
    await deleteVoleyball(id);
    setTeams(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div>
      <h2>Equipos de Voleibol</h2>
      <Link to="/voleyballs/create">Crear nuevo equipo</Link>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.teamName} - {team.coach} - {team.schedule}
            <Link to={`/voleyballs/edit/${team.id}`}>Editar</Link>
            <button onClick={() => handleDelete(team.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
