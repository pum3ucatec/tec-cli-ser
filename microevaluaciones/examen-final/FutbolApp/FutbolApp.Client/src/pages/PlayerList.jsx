// FutbolApp.Client/src/pages/PlayerList.jsx
import React, { useState, useEffect } from 'react';
import { getAllPlayers, createPlayer, updatePlayer, deletePlayer } from '../services/playerService';

const initialFormState = {
    name: '',
    position: '',
    jerseyNumber: '',
    team: ''
};

function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [formData, setFormData] = useState(initialFormState);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const data = await getAllPlayers();
            setPlayers(data);
            setError(null);
        } catch (err) {
            setError("Error al cargar jugadores: Asegúrate de que el API (.NET) esté corriendo en el puerto 5272.");
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            // Aseguramos que el jerseyNumber sea un entero
            const dataToSend = { ...formData, jerseyNumber: parseInt(formData.jerseyNumber) };

            if (isEditing) {
                // Actualizar
                await updatePlayer(formData.id, dataToSend);
            } else {
                // Crear
                await createPlayer(dataToSend);
            }
            
            // Limpiar formulario, recargar lista
            setFormData(initialFormState);
            setIsEditing(false);
            fetchPlayers();
        } catch (err) {
            setError(isEditing ? "Error al actualizar el jugador." : "Error al crear el jugador.");
            console.error("Error CRUD:", err);
        }
    };

    const handleEdit = (player) => {
        // Aseguramos que jerseyNumber se almacene como string para el input
        setFormData({ 
            ...player, 
            jerseyNumber: player.jerseyNumber.toString() 
        });
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este jugador?')) {
            setError(null);
            try {
                await deletePlayer(id);
                fetchPlayers();
            } catch (err) {
                setError("Error al eliminar el jugador.");
                console.error(err);
            }
        }
    };
    
    const handleCancelEdit = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setError(null);
    };

    return (
        <div className="container">
            <h1>Gestión de Jugadores de Fútbol (CRUD Full-Stack)</h1>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            {/* Formulario de Creación/Edición */}
            <div className="form-container">
                <h2>{isEditing ? 'Editar Jugador' : 'Crear Nuevo Jugador'}</h2>
                <form onSubmit={handleSubmit}>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required />
                    <input name="position" value={formData.position} onChange={handleChange} placeholder="Posición" required />
                    <input name="jerseyNumber" type="number" value={formData.jerseyNumber} onChange={handleChange} placeholder="Número de Camiseta" required />
                    <input name="team" value={formData.team} onChange={handleChange} placeholder="Equipo" required />
                    
                    <button type="submit">{isEditing ? 'Guardar Cambios' : 'Crear Jugador'}</button>
                    {isEditing && <button type="button" onClick={handleCancelEdit}>Cancelar Edición</button>}
                </form>
            </div>
            
            <hr />

            {/* Lista de Jugadores */}
            <div className="list-container">
                <h2>Lista de Jugadores</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Posición</th>
                            <th>Nº</th>
                            <th>Equipo</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((player) => (
                            <tr key={player.id}>
                                <td>{player.id}</td>
                                <td>{player.name}</td>
                                <td>{player.position}</td>
                                <td>{player.jerseyNumber}</td>
                                <td>{player.team}</td>
                                <td>
                                    <button onClick={() => handleEdit(player)}>Editar</button>
                                    <button onClick={() => handleDelete(player.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default PlayerList;