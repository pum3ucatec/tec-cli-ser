import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = "http://localhost:5000/api/jugadores";

const List = () => {
    const [jugadores, setJugadores] = useState([]);

    useEffect(() => {
        cargarJugadores();
    }, []);

    const cargarJugadores = async () => {
        try {
            const resultado = await axios.get(API_URL);
            setJugadores(resultado.data);
        } catch (error) {
            console.error("Error cargando jugadores:", error);
        }
    };

    const eliminarJugador = async (id) => {
        if (window.confirm("¿Liberar a este jugador de la plantilla?")) {
            await axios.delete(`${API_URL}/${id}`);
            cargarJugadores();
        }
    };

    return (
        <div className="card shadow">
            <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Plantilla Oficial</h4>
                <Link to="/create" className="btn btn-success">+ Nuevo Fichaje</Link>
            </div>
            <div className="card-body">
                <table className="table table-hover">
                    <thead className="table-light">
                        <tr>
                            <th>Dorsal</th>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>Equipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadores.map((jug) => (
                            <tr key={jug.id}>
                                <td className="fw-bold text-center">#{jug.dorsal}</td>
                                <td>{jug.nombreCompleto}</td>
                                <td><span className="badge bg-secondary">{jug.posicion}</span></td>
                                <td>{jug.equipo}</td>
                                <td>
                                    <Link to={`/edit/${jug.id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
                                    <button onClick={() => eliminarJugador(jug.id)} className="btn btn-sm btn-danger">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default List;