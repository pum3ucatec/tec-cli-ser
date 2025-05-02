import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getClassroom, updateClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';
import { Classroom } from '../types/data';

const EditClassroomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    if (id) {
      getClassroom(Number(id)).then(setClassroom);
    }
  }, [id]);

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateClassroom(Number(id), { ...data, id: Number(id) });
      navigate('/classrooms');
    }
  };

  if (!classroom) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Classroom</h1>
      <ClassroomForm initialData={classroom} onSubmit={handleSubmit} submitText="Update" />
    </div>
  );
};

export default EditClassroomPage; 