import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Datos simulados en memoria (reemplaza esto con datos reales de tu juego si tienes integración)
let games = [
    { id: "game123", name: "Prison Escape" },
    { id: "game456", name: "City Roleplay" }
];

let players = {
    "game123": ["Juan", "Pedro", "Maria"],
    "game456": ["Lucas", "Sofia"]
};

// ✅ Ruta raíz para evitar el error "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Servidor JailbloxSS funcionando ✅");
});

// ✅ Lista de juegos
app.get("/games", (req, res) => {
    res.json(games);
});

// ✅ Lista de jugadores en un juego
app.get("/players/:gameId", (req, res) => {
    const { gameId } = req.params;
    if (players[gameId]) {
        res.json(players[gameId]);
    } else {
        res.json([]);
    }
});

// ✅ Endpoint para ejecutar scripts
app.post("/sendScript", (req, res) => {
    const { gameId, script } = req.body;

    if (!gameId || !script) {
        return res.status(400).json({ error: "Faltan parámetros" });
    }

    console.log(`📌 Script recibido para ${gameId}:`);
    console.log(script);

    // Aquí es donde deberías enviar el script al juego real mediante tu sistema
    // Por ejemplo, usando un WebSocket, una API interna, o Roblox HTTPService

    res.json({ success: true, message: "Script enviado con éxito" });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
