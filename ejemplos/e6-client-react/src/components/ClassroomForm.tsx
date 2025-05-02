import { useState } from 'react';
import { Classroom } from '../types/data';

type Props = {
  initialData?: Classroom;
  onSubmit: (data: Omit<Classroom, 'id'>) => void;
};

export default function ClassroomForm({ initialData, onSubmit }: Props) {
  const [code, setCode] = useState(initialData?.code || '');
  const [name, setName] = useState(initialData?.name || '');
  const [status, setStatus] = useState(initialData?.status || 'AC');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ code, name, status });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Código:</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} required />
      </div>

      <div>
        <label>Nombre:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required />
      </div>

      <div>
        <label>Estado:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="AC">Activo</option>
          <option value="IN">Inactivo</option>
        </select>
      </div>

      <button type="submit">Guardar</button>
    </form>
  );
}
