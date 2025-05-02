import React from 'react';
import { Classroom } from '../types/data';

type Props = {
  classrooms: Classroom[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onDetails: (id: number) => void;
};

const ClassroomsDataTable: React.FC<Props> = ({ classrooms, onEdit, onDelete, onDetails }) => (
  <table className="table">
    <thead>
      <tr>
        <th>ID</th>
        <th>Code</th>
        <th>Name</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {classrooms.map((c) => (
        <tr key={c.id}>
          <td>{c.id}</td>
          <td>{c.code}</td>
          <td>{c.name}</td>
          <td>{c.status}</td>
          <td>
            <button onClick={() => onEdit(c.id)}>Edit</button>{' '}
            <button onClick={() => onDetails(c.id)}>Details</button>{' '}
            <button onClick={() => onDelete(c.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ClassroomsDataTable; 