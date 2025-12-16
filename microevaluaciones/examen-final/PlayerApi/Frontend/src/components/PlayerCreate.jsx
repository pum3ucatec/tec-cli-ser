import { useState } from "react";
import { createPlayer } from "../api/playerApi";


export default function PlayerCreate({ onCreated }) {
const [player, setPlayer] = useState({
nombre: "",
numero: 0,
posicion: "",
fechaUnion: ""
});


const handleChange = e => {
setPlayer({ ...player, [e.target.name]: e.target.value });
};


const handleSubmit = async e => {
e.preventDefault();
await createPlayer(player);
onCreated && onCreated();
};


return (
<form onSubmit={handleSubmit}>
<h3>Crear Player</h3>
<input name="nombre" placeholder="Nombre" onChange={handleChange} />
<input name="numero" type="number" placeholder="Número" onChange={handleChange} />
<input name="posicion" placeholder="Posición" onChange={handleChange} />
<input name="fechaUnion" type="date" onChange={handleChange} />
<button type="submit">Guardar</button>
</form>
);
}