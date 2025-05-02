import React, { useState } from 'react';
import { Classroom } from '../types/data';

type Props = {
  initialData?: Partial<Classroom>;
  onSubmit: (data: Omit<Classroom, 'id'>) => void;
  submitText?: string;
};

const defaultData = {
  code: '',
  name: '',
  status: 'AC',
};

const ClassroomForm: React.FC<Props> = ({ initialData = {}, onSubmit, submitText = 'Save' }) => {
  const [form, setForm] = useState<Omit<Classroom, 'id'>>({
    ...defaultData,
    ...initialData,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Code</label>
        <input name="code" value={form.code} onChange={handleChange} required />
      </div>
      <div>
        <label>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Status</label>
        <input name="status" value={form.status} onChange={handleChange} required />
      </div>
      <button type="submit">{submitText}</button>
    </form>
  );
};

export default ClassroomForm; 