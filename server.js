const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

let currentScript = null;
let games = [
    { id: "123", name: "Juego Test" }
];
let players = {
    "123": ["Player1", "Player2"]
};

// Endpoint para subir script
app.post('/upload', (req, res) => {
    if (req.body.script) {
        currentScript = req.body.script;
        console.log("Nuevo script recibido:", currentScript);
        res.json({ status: 'ok' });
    } else {
        res.status(400).json({ error: 'No se envió script' });
    }
});

// Endpoint para obtener el script (se borra después de enviarlo)
app.get('/get-script', (req, res) => {
    if (currentScript) {
        const scriptToSend = currentScript;
        currentScript = null; // <- SE LIMPIA para no repetir
        res.json({ script: scriptToSend });
    } else {
        res.json({ script: null });
    }
});

// Endpoint para lista de juegos
app.get('/games', (req, res) => {
    res.json(games);
});

// Endpoint para lista de jugadores por juego
app.get('/players', (req, res) => {
    const gameId = req.query.gameId;
    if (gameId && players[gameId]) {
        res.json(players[gameId]);
    } else {
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`Servidor JailbloxSS corriendo en puerto ${port}`);
});
