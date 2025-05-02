import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClassroomForm from './ClassroomForm';

interface Classroom {
  id: number;
  name: string;
  capacity: number;
  description: string;
  isActive: boolean;
}

const ClassroomTable: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState<Classroom | null>(null);
  const [toast, setToast] = useState<{show: boolean, message: string, type: string}>({show: false, message: '', type: 'success'});

  const fetchClassrooms = () => {
    setLoading(true);
    axios.get<Classroom[]>('http://localhost:5134/api/ClassroomApi')
      .then(response => {
        setClassrooms(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching classrooms:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClassrooms();
  }, []);

  const handleCreate = () => {
    setEditData(null);
    setShowForm(true);
  };

  const handleEdit = (data: Classroom) => {
    setEditData(data);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('¿Seguro que deseas borrar este registro?')) {
      axios.delete(`http://localhost:5134/api/ClassroomApi/${id}`)
        .then(() => {
          fetchClassrooms();
          setToast({show: true, message: 'Aula eliminada correctamente', type: 'success'});
        })
        .catch(() => setToast({show: true, message: 'Error al borrar', type: 'danger'}));
    }
  };

  const handleFormSubmit = (form: Partial<Classroom>) => {
    if (editData) {
      axios.put(`http://localhost:5134/api/ClassroomApi/${editData.id}`, { ...editData, ...form })
        .then(() => {
          setShowForm(false);
          fetchClassrooms();
          setToast({show: true, message: 'Aula actualizada correctamente', type: 'success'});
        })
        .catch(() => setToast({show: true, message: 'Error al actualizar', type: 'danger'}));
    } else {
      axios.post('http://localhost:5134/api/ClassroomApi', form)
        .then(() => {
          setShowForm(false);
          fetchClassrooms();
          setToast({show: true, message: 'Aula creada correctamente', type: 'success'});
        })
        .catch((error) => {
          let msg = 'Error al crear';
          if (error.response && error.response.data) {
            if (typeof error.response.data === 'string') {
              msg += ': ' + error.response.data;
            } else if (error.response.data.errors) {
              // ASP.NET Core validation errors
              msg += ': ' + Object.values(error.response.data.errors).flat().join(' ');
            } else if (error.response.data.title) {
              msg += ': ' + error.response.data.title;
            }
          } else if (error.message) {
            msg += ': ' + error.message;
          }
          setToast({show: true, message: msg, type: 'danger'});
        });
    }
  };

  const handleToastClose = () => setToast({...toast, show: false});

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0"><i className="bi bi-door-closed me-2"></i>Aulas</h2>
        <button className="btn btn-primary" onClick={handleCreate}><i className="bi bi-plus-circle me-1"></i>Crear Aula</button>
      </div>
      {showForm && (
        <div className="mb-4">
          <ClassroomForm
            initialData={editData || {}}
            onSubmit={handleFormSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-striped table-bordered shadow">
          <thead className="table-dark">
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Descripción</th>
              <th>Activo</th>
              <th>Acciones</th>
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
                    ? <span className="badge bg-success"><i className="bi bi-check-circle me-1"></i>Activo</span>
                    : <span className="badge bg-secondary"><i className="bi bi-x-circle me-1"></i>Inactivo</span>
                  }
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(classroom)}>
                    <i className="bi bi-pencil-square"></i> Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(classroom.id)}>
                    <i className="bi bi-trash"></i> Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {toast.show && (
        <div className={`toast align-items-center text-bg-${toast.type} border-0 show position-fixed bottom-0 end-0 m-4`} role="alert" aria-live="assertive" aria-atomic="true" style={{zIndex: 9999, minWidth: 250}}>
          <div className="d-flex">
            <div className="toast-body">
              {toast.message}
            </div>
            <button type="button" className="btn-close btn-close-white me-2 m-auto" aria-label="Close" onClick={handleToastClose}></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassroomTable;
