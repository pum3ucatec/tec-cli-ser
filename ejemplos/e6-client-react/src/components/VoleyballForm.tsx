import { Voleyball } from '../types/data';
import { useState } from 'react';

interface Props {
  initialData?: Voleyball;
  onSubmit: (data: Omit<Voleyball, 'id'>) => void;
}

export default function VoleyballForm({ initialData, onSubmit }: Props) {
  const [teamName, setTeamName] = useState(initialData?.teamName || '');
  const [coach, setCoach] = useState(initialData?.coach || '');
  const [schedule, setSchedule] = useState(initialData?.schedule || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ teamName, coach, schedule });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del equipo:</label>
        <input value={teamName} onChange={e => setTeamName(e.target.value)} required />
      </div>
      <div>
        <label>Entrenador:</label>
        <input value={coach} onChange={e => setCoach(e.target.value)} required />
      </div>
      <div>
        <label>Horario:</label>
        <input value={schedule} onChange={e => setSchedule(e.target.value)} required />
      </div>
      <button type="submit">Guardar</button>
    </form>
  );
}
