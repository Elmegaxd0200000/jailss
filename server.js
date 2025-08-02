const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let scriptsQueue = [];

app.get('/', (req, res) => {
  res.send('Servidor JailbloxSS Executor funcionando ✅');
});

app.post('/sendScript', (req, res) => {
  const { script } = req.body;
  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: 'Script inválido' });
  }
  scriptsQueue.push(script);
  res.json({ success: true });
});

app.get('/getScripts', (req, res) => {
  const scripts = scriptsQueue;
  scriptsQueue = []; // Limpia la cola después de enviar
  res.json(scripts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
