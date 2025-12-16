import { deletePlayer } from "../api/playerApi";


export default function PlayerDelete({ id, onDeleted }) {
const handleDelete = async () => {
if (confirm("¿Eliminar este jugador?")) {
await deletePlayer(id);
onDeleted && onDeleted();
}
};


return (
<button onClick={handleDelete}>Eliminar</button>
);
}