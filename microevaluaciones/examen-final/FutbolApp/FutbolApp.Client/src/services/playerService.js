// FutbolApp.Client/src/services/playerService.js

const API_BASE_URL = 'http://localhost:5272/api/Players'; // <-- ¡Usamos tu puerto 5272!

// Obtener todos los jugadores (READ - GET)
export const getAllPlayers = async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch players');
    }
    return response.json();
};

// Crear un jugador (CREATE - POST)
export const createPlayer = async (playerData) => {
    const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    });
    if (!response.ok) {
        // Si el API retorna un 400 u otro error, lanzamos la excepción.
        const errorData = await response.json();
        throw new Error(`Failed to create player: ${errorData.title}`);
    }
    return response.json();
};

// Obtener un jugador por ID (READ - GET único)
export const getPlayerById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch player');
    }
    return response.json();
};

// Actualizar un jugador (UPDATE - PUT)
export const updatePlayer = async (id, playerData) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerData),
    });
    // PUT de .NET Core a menudo devuelve 204 No Content
    if (response.status !== 204 && !response.ok) {
        throw new Error('Failed to update player');
    }
    return id; 
};

// Eliminar un jugador (DELETE - DELETE)
export const deletePlayer = async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete player');
    }
};