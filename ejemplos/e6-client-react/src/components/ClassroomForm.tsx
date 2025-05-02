import React, { useState } from 'react';

interface ClassroomFormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({ initialData = {}, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    name: initialData.name || '',
    capacity: initialData.capacity || '',
    description: initialData.description || '',
    isActive: initialData.isActive ?? true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded p-3 bg-light">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Capacidad</label>
        <input type="number" className="form-control" name="capacity" value={form.capacity} onChange={handleChange} required />
      </div>
      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <input type="text" className="form-control" name="description" value={form.description} onChange={handleChange} />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox" className="form-check-input" name="isActive" checked={form.isActive} onChange={handleChange} />
        <label className="form-check-label">Activo</label>
      </div>
      <button type="submit" className="btn btn-primary me-2">Guardar</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
    </form>
  );
};

export default ClassroomForm;
