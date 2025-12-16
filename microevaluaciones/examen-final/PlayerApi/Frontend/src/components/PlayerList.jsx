import { useEffect, useState } from "react";
import { getPlayers } from "../api/playerApi";


export default function PlayerList() {
const [players, setPlayers] = useState([]);


useEffect(() => {
getPlayers().then(setPlayers);
}, []);


return (
<ul>
{players.map(p => (
<li key={p.id}>{p.numero} - {p.nombre} - {p.posicion} - {p.fechaUnion}</li>
))}
</ul>
);
}