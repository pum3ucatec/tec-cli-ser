import { useState } from 'react';
import { Subject } from '../types/data'; // Importa el tipo Person correctamente

interface SubjectFormProps {
  initialData?: Omit<Subject, 'id'>; // Quitamos 'id' porque no se edita en el formulario
  onSubmit: (data: Omit<Subject, 'id'>) => void; // Aquí también especificamos el tipo
}

export default function SubjectForm({ initialData, onSubmit }: SubjectFormProps) {
  const [formData, setFormData] = useState<Omit<Subject, 'id'>>(initialData || {
    name: '',
    description: '',
    status: 'Activo'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="border p-2"
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
}
