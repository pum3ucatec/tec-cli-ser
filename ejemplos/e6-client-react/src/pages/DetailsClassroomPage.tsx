import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getClassroom } from '../services/classroomApi';
import { Classroom } from '../types/data';

const DetailsClassroomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [classroom, setClassroom] = useState<Classroom | null>(null);

  useEffect(() => {
    if (id) {
      getClassroom(Number(id)).then(setClassroom);
    }
  }, [id]);

  if (!classroom) return <div>Loading...</div>;

  return (
    <div>
      <h1>Classroom Details</h1>
      <p><b>ID:</b> {classroom.id}</p>
      <p><b>Code:</b> {classroom.code}</p>
      <p><b>Name:</b> {classroom.name}</p>
      <p><b>Status:</b> {classroom.status}</p>
      <button onClick={() => navigate('/classrooms')}>Back to List</button>
    </div>
  );
};

export default DetailsClassroomPage; 