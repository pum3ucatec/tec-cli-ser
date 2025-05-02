import React, { useEffect, useState } from 'react';
import { Classroom } from '../types/data';
import { getClassrooms, deleteClassroom } from '../services/classroomApi';
import { useNavigate } from 'react-router-dom';
import ClassroomsDataTable from '../components/ClassroomsDataTable';

const ListClassroomsPage: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const navigate = useNavigate();

  const fetchClassrooms = async () => {
    setClassrooms(await getClassrooms());
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleEdit = (id: number) => navigate(`/classrooms/edit/${id}`);
  const handleDetails = (id: number) => navigate(`/classrooms/details/${id}`);
  const handleDelete = async (id: number) => {
    await deleteClassroom(id);
    fetchClassrooms();
  };

  return (
    <div>
      <h1>Classrooms</h1>
      <button onClick={() => navigate('/classrooms/create')}>Create New</button>
      <ClassroomsDataTable
        classrooms={classrooms}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onDetails={handleDetails}
      />
    </div>
  );
};

export default ListClassroomsPage; 