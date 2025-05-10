import { useEffect, useState } from 'react';
import { Career } from '../types/Career';
import { careerService } from '../services/careerService';
import { Link } from 'react-router-dom';

export const CareerList = () => {
    const [careers, setCareers] = useState<Career[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadCareers();
    }, []);

    const loadCareers = async () => {
        try {
            const data = await careerService.getAll();
            setCareers(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar las carreras');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar esta carrera?')) {
            try {
                await careerService.delete(id);
                setCareers(careers.filter(career => career.id !== id));
                setError(null);
            } catch (err) {
                setError('Error al eliminar la carrera');
                console.error(err);
            }
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>Lista de Carreras</h2>
            <Link to="/careers/create" className="btn btn-primary mb-3">
                Crear Nueva Carrera
            </Link>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {careers.map(career => (
                            <tr key={career.id}>
                                <td>{career.id}</td>
                                <td>{career.name}</td>
                                <td>{career.description}</td>
                                <td>
                                    <Link to={`/careers/edit/${career.id}`} className="btn btn-sm btn-warning me-2">
                                        Editar
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(career.id)}
                                        className="btn btn-sm btn-danger"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}; 