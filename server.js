const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let script = "";
let games = {};
// games = { jobId: { name: "Jailblox", players: [...] } }

app.post('/report', (req, res) => {
  const { gameId, gameName, players } = req.body;
  games[gameId] = { name: gameName, players };
  res.send("OK");
});

app.get('/games', (req, res) => {
  const list = Object.entries(games).map(([id, data]) => ({
    id,
    name: data.name
  }));
  res.json(list);
});

app.get('/players', (req, res) => {
  const id = req.query.gameId;
  res.json(games[id]?.players || []);
});

app.post('/upload', (req, res) => {
  script = req.body.script || "";
  res.send("Script recibido");
});

app.get('/get', (req, res) => {
  res.send(script);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
