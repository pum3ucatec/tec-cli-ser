const API_URL = "http://localhost:5265/api/players";

export const getPlayers = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error desde la API:", errorText);
    throw new Error(`HTTP ${res.status} - ${errorText}`);
  }
  return res.json();
};

export const createPlayer = async (player) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status} - ${errorText}`);
  }
  return res.json();
};

export const updatePlayer = async (id, player) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player)
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status} - ${errorText}`);
  }
  return res.json();
};

export const deletePlayer = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`HTTP ${res.status} - ${errorText}`);
  }
};
