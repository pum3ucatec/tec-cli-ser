import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/jugadores";

const Create = () => {
    const [form, setForm] = useState({ 
        nombreCompleto: '', 
        posicion: 'Portero', 
        dorsal: '', 
        equipo: '' 
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(API_URL, form);
        navigate('/');
    };

    return (
        <div className="card shadow col-md-6 mx-auto">
            <div className="card-header bg-success text-white">
                <h4>Fichar Jugador</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label>Nombre Completo</label>
                        <input name="nombreCompleto" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label>Posición</label>
                            <select name="posicion" className="form-select" onChange={handleChange}>
                                <option value="Portero">Portero</option>
                                <option value="Defensa">Defensa</option>
                                <option value="Centrocampista">Centrocampista</option>
                                <option value="Delantero">Delantero</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label>Dorsal</label>
                            <input name="dorsal" type="number" className="form-control" onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label>Equipo Actual</label>
                        <input name="equipo" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-success">Guardar Fichaje</button>
                        <Link to="/" className="btn btn-secondary">Cancelar</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Create;