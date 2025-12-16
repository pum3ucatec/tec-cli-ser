import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/jugadores";

const Edit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ 
        id: 0, nombreCompleto: '', posicion: '', dorsal: 0, equipo: '' 
    });

    useEffect(() => {
        const getJugador = async () => {
            const res = await axios.get(`${API_URL}/${id}`);
            setForm(res.data);
        };
        getJugador();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}/${id}`, form);
        navigate('/');
    };

    return (
        <div className="card shadow col-md-6 mx-auto">
            <div className="card-header bg-primary text-white">
                <h4>Editar Ficha</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Nombre Completo</label>
                        <input name="nombreCompleto" value={form.nombreCompleto} className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Posición</label>
                            <select name="posicion" value={form.posicion} className="form-select" onChange={handleChange}>
                                <option value="Portero">Portero</option>
                                <option value="Defensa">Defensa</option>
                                <option value="Centrocampista">Centrocampista</option>
                                <option value="Delantero">Delantero</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Dorsal</label>
                            <input name="dorsal" type="number" value={form.dorsal} className="form-control" onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Equipo</label>
                        <input name="equipo" value={form.equipo} className="form-control" onChange={handleChange} required/>
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary">Actualizar Datos</button>
                        <Link to="/" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Edit;