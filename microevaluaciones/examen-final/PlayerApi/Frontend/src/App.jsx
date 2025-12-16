import { useEffect, useState } from "react";
import PlayerList from "./components/PlayerList";
import PlayerCreate from "./components/PlayerCreate";
import PlayerEdit from "./components/PlayerEdit";
import PlayerDelete from "./components/PlayerDelete";
import { getPlayers } from "./api/playerApi";

function App() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadPlayers = () => {
    getPlayers().then(setPlayers);
    setSelected(null);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <div>
      <h1>Gestión de Players</h1>

      <PlayerCreate onCreated={loadPlayers} />

      <hr />

      <table border="1" cellPadding="5" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nombre</th>
            <th>Posición</th>
            <th>Fecha de Union</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => (
            <tr key={p.id}>
              <td>{p.numero}</td>
              <td>{p.nombre}</td>
              <td>{p.posicion}</td>
              <td>{p.fechaUnion}</td>
              <td>
                <button onClick={() => setSelected(p)}>Editar</button>{" "}
                <PlayerDelete id={p.id} onDeleted={loadPlayers} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <>
          <hr />
          <PlayerEdit player={selected} onUpdated={loadPlayers} />
        </>
      )}
    </div>
  );
}

export default App;
