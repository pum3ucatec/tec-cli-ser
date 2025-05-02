import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createClassroom } from '../services/classroomApi';
import ClassroomForm from '../components/ClassroomForm';

const CreateClassroomPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await createClassroom(data);
    navigate('/classrooms');
  };

  return (
    <div>
      <h1>Create Classroom</h1>
      <ClassroomForm onSubmit={handleSubmit} submitText="Create" />
    </div>
  );
};

export default CreateClassroomPage; 