import { useState } from 'react';
import { Person } from '../types/data'; // Importa el tipo Person correctamente

interface PersonFormProps {
  initialData?: Omit<Person, 'id'>; // Quitamos 'id' porque no se edita en el formulario
  onSubmit: (data: Omit<Person, 'id'>) => void; // Aquí también especificamos el tipo
}

export default function PersonForm({ initialData, onSubmit }: PersonFormProps) {
  const [formData, setFormData] = useState<Omit<Person, 'id'>>(initialData || {
    firstName: '',
    lastName: '',
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
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
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
