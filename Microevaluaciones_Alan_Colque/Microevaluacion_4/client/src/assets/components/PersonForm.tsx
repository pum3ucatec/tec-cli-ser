import { useState } from 'react';
import type { Person } from '../types/data';
export default function PersonForm({ initial, onSubmit }: { initial?: any, onSubmit: any }) {
  const [form, setForm] = useState(initial || { FirstName: '', LastName: '', Status: 'Activo' });
  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(form); }} className="flex flex-col gap-3">
      <input name="FirstName" value={form.FirstName} onChange={handleChange} placeholder="Nombre" className="border p-2" required />
      <input name="LastName" value={form.LastName} onChange={handleChange} placeholder="Apellido" className="border p-2" required />
      <select name="Status" value={form.Status} onChange={handleChange} className="border p-2">
        <option>Activo</option><option>Inactivo</option>
      </select>
      <button className="bg-blue-600 text-white p-2 rounded">Guardar</button>
    </form>
  );
}