const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const games = new Set();
const scriptsQueue = {};

app.get('/', (req, res) => {
  res.send('Servidor JailbloxSS funcionando 🔥');
});

app.post('/updateGame', (req, res) => {
  const { name } = req.body;
  if (typeof name !== 'string') {
    return res.status(400).json({ error: 'Nombre de juego inválido' });
  }
  games.add(name);
  if (!scriptsQueue[name]) scriptsQueue[name] = [];
  res.json({ success: true });
});

app.get('/games', (req, res) => {
  res.json(Array.from(games));
});

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

app.get('/getScripts', (req, res) => {
  const gameName = req.query.gameName;
  if (!gameName || !games.has(gameName)) {
    return res.status(404).json([]);
  }
  const scripts = scriptsQueue[gameName] || [];
  scriptsQueue[gameName] = []; // Limpia la cola después de enviar
  res.json(scripts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor JailbloxSS corriendo en puerto ${PORT}`));
