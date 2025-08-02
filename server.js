const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta raíz para evitar "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Servidor Jailblox SS funcionando');
});

let games = {}; // { gameId: { name, players: [] } }
let scripts = {}; // scripts pendientes para cada gameId

// Registrar juego
app.post('/registerGame', (req, res) => {
  const { gameId, name } = req.body;
  if (!gameId || !name) return res.status(400).json({ error: 'Faltan datos' });

  if (!games[gameId]) {
    games[gameId] = { name, players: [] };
  }
  res.json({ message: 'Juego registrado' });
});

// Registrar jugador
app.post('/registerPlayer', (req, res) => {
  const { gameId, playerName } = req.body;
  if (!games[gameId]) return res.status(400).json({ error: 'Juego no encontrado' });

  if (!games[gameId].players.includes(playerName)) {
    games[gameId].players.push(playerName);
  }
  res.json({ message: 'Jugador registrado' });
});

// Obtener lista de juegos
app.get('/games', (req, res) => {
  const list = Object.keys(games).map(id => ({ id, name: games[id].name }));
  res.json(list);
});

// Obtener jugadores de un juego
app.get('/players/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  if (!games[gameId]) return res.status(404).json({ error: 'Juego no encontrado' });

  res.json(games[gameId].players);
});

// Enviar script para ejecutar en juego
app.post('/sendScript', (req, res) => {
  const { gameId, script } = req.body;
  if (!games[gameId]) return res.status(404).json({ error: 'Juego no encontrado' });

  scripts[gameId] = script;
  res.json({ message: 'Script enviado' });
});

// Obtener script pendiente para ejecutar
app.get('/getScript/:gameId', (req, res) => {
  const gameId = req.params.gameId;
  const script = scripts[gameId] || "";
  scripts[gameId] = ""; // Limpiar después de enviar
  res.send(script);
});

app.listen(PORT, () => {
  console.log(`Servidor Jailblox SS escuchando en puerto ${PORT}`);
});
