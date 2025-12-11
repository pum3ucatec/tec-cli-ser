import { useState } from 'react';
import type { Classroom } from '../types/data';

interface Props { initial?: Omit<Classroom, 'ID'>; onSubmit: (data: any) => void; }

export default function ClassroomForm({ initial, onSubmit }: Props) {
  const [form, setForm] = useState(initial || { Code: '', Name: '', Status: 'Activo' });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col gap-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-bold text-gray-700">Código</label>
        <input name="Code" value={form.Code} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Nombre del Aula</label>
        <input name="Name" value={form.Name} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Estado</label>
        <select name="Status" value={form.Status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button className="bg-green-600 text-white p-2 rounded font-bold hover:bg-green-700 transition">Guardar Aula</button>
    </form>
  );
}