const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("redis");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión Redis
const client = createClient({
  url: "redis://localhost:6379"
});

client.on("error", (err) => console.error("Redis error:", err));

client.connect();

// Endpoint para guardar factura
app.post("/guardar-factura", async (req, res) => {
  const factura = req.body;
  const id = factura.numero || Date.now(); // ID único

  await client.set(`factura:${id}`, JSON.stringify(factura));

  res.json({ mensaje: "Factura guardada en Redis", id });
});

// Endpoint para ver factura
app.get("/factura/:id", async (req, res) => {
  const data = await client.get(`factura:${req.params.id}`);

  if (!data) return res.status(404).json({ error: "Factura no encontrada" });

  res.json(JSON.parse(data));
});

app.listen(3000, () => {
  console.log("Servidor ejecutándose en http://localhost:3000");
});

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/factura.html");
});
