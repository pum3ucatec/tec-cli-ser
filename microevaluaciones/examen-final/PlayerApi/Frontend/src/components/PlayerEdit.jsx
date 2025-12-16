import { useState } from "react";
import { updatePlayer } from "../api/playerApi";


export default function PlayerEdit({ player, onUpdated }) {
const [form, setForm] = useState(player);


const handleChange = e => {
setForm({ ...form, [e.target.name]: e.target.value });
};


const handleSubmit = async e => {
e.preventDefault();
await updatePlayer(form.id, form);
onUpdated && onUpdated();
};


return (
<form onSubmit={handleSubmit}>
<h3>Editar Player</h3>
<input name="nombre" value={form.nombre} onChange={handleChange} />
<input name="numero" type="number" value={form.numero} onChange={handleChange} />
<input name="posicion" value={form.posicion} onChange={handleChange} />
<input name="fechaUnion" type="date" value={form.fechaUnion?.substring(0,10)} onChange={handleChange} />
<button type="submit">Actualizar</button>
</form>
);
}