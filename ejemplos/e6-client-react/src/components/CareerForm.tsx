import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Career } from '../types/Career';
import { careerService } from '../services/careerService';

export const CareerForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [career, setCareer] = useState<Career>({
        id: 0,
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            loadCareer(Number(id));
        }
    }, [id]);

    const loadCareer = async (careerId: number) => {
        try {
            setLoading(true);
            const data = await careerService.getById(careerId);
            setCareer(data);
            setError(null);
        } catch (err) {
            setError('Error al cargar la carrera');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            if (id) {
                await careerService.update(Number(id), career);
            } else {
                await careerService.create(career);
            }
            navigate('/careers');
        } catch (err) {
            setError('Error al guardar la carrera');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setCareer(prev => ({
            ...prev,
            [name]: value
        }));
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container mt-4">
            <h2>{id ? 'Editar Carrera' : 'Crear Nueva Carrera'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={career.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={career.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate('/careers')}
                >
                    Cancelar
                </button>
            </form>
        </div>
    );
}; 