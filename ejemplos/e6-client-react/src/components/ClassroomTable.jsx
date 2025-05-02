import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClassroomTable = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5134/api/ClassroomApi')
      .then(response => {
        setClassrooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classrooms:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2>Classrooms</h2>
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Capacity</th>
            <th>Description</th>
            <th>Is Active</th>
          </tr>
        </thead>
        <tbody>
          {classrooms.map(classroom => (
            <tr key={classroom.id}>
              <td>{classroom.name}</td>
              <td>{classroom.capacity}</td>
              <td>{classroom.description}</td>
              <td>
                {classroom.isActive
                  ? <span className="badge bg-success">Active</span>
                  : <span className="badge bg-secondary">Inactive</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassroomTable;
