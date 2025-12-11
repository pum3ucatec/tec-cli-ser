import { useState } from 'react';
import type { Subject } from '../types/data';

interface Props { initial?: Omit<Subject, 'ID'>; onSubmit: (data: any) => void; }

export default function SubjectForm({ initial, onSubmit }: Props) {
  const [form, setForm] = useState(initial || { Name: '', Description: '', Status: 'Activo' });

  const handleChange = (e: React.ChangeEvent<any>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col gap-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-bold text-gray-700">Nombre Materia</label>
        <input name="Name" value={form.Name} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Descripción</label>
        <input name="Description" value={form.Description} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700">Estado</label>
        <select name="Status" value={form.Status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
      <button className="bg-purple-600 text-white p-2 rounded font-bold hover:bg-purple-700 transition">Guardar Materia</button>
    </form>
  );
}