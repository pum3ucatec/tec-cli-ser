import { useState } from 'react';
import { Classroom } from '../types/data';

interface ClassroomFormProps {
  initialData?: Omit<Classroom, 'id'>;
  onSubmit: (data: Omit<Classroom, 'id'>) => void;
}

export default function ClassroomForm({ initialData, onSubmit }: ClassroomFormProps) {
  const [formData, setFormData] = useState<Omit<Classroom, 'id'>>(initialData || {
    codigo: '',
    nombre: '',
    estado: true
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'estado' ? value === 'true' : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="codigo"
        placeholder="Código"
        value={formData.codigo}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="nombre"
        placeholder="Nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <select
        name="estado"
        value={formData.estado.toString()}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="true">Activo</option>
        <option value="false">Inactivo</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
}
