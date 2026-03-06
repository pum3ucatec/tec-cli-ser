import { useState } from 'react';
import { Teacher } from '../../types/data'; // Importa el tipo Person correctamente

interface TeacherFormProps {
  initialData?: Omit<Teacher, 'id'>; // Quitamos 'id' porque no se edita en el formulario
  onSubmit: (data: Omit<Teacher, 'id'>) => void; // Aquí también especificamos el tipo
}

export default function TeacherForm({ initialData, onSubmit }: TeacherFormProps) {
  const [formData, setFormData] = useState<Omit<Teacher, 'id'>>(initialData || {
    firstName: '',
    lastName: '',
    email: '',
    hireDate: ''
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
        placeholder="Nombres"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="lastName"
        placeholder="Apellidos"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="email"
        placeholder="Correo Electronico"
        value={formData.email}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <input
        type="text"
        name="hireDate"
        placeholder="Fecha de Contratación"
        value={formData.hireDate}
        onChange={handleChange}
        required
        className="border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Guardar
      </button>
    </form>
  );
}
