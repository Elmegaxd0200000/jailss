const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const games = new Set();
const scriptsQueue = {};

// Reportar juego conectado
app.post('/updateGame', (req, res) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Nombre de juego inválido' });
  }
  games.add(name);
  if (!scriptsQueue[name]) scriptsQueue[name] = [];
  res.json({ success: true });
});

// Listar juegos conectados
app.get('/games', (req, res) => {
  res.json(Array.from(games));
});

// Enviar script para ejecutar en juego
app.post('/sendScript', (req, res) => {
  const { gameName, script } = req.body;
  if (typeof gameName !== 'string' || typeof script !== 'string') {
    return res.status(400).json({ error: 'Datos inválidos' });
  }
  if (!games.has(gameName)) {
    return res.status(400).json({ error: 'Juego no conectado' });
  }
  scriptsQueue[gameName].push(script);
  res.json({ success: true });
});

// Obtener scripts pendientes para un juego
app.get('/getScripts', (req, res) => {
  const gameName = req.query.gameName;
  if (!gameName || !games.has(gameName)) {
    return res.status(404).json([]);
  }
  const scripts = scriptsQueue[gameName] || [];
  scriptsQueue[gameName] = [];
  res.json(scripts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend JailbloxSS corriendo en puerto ${PORT}`));
