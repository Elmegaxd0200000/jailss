const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let scriptsQueue = [];

// Página principal
app.get('/', (req, res) => {
  res.send('✅ JailbloxSS Executor funcionando');
});

// Recibe script desde el WPF
app.post('/sendScript', (req, res) => {
  const { script } = req.body;
  if (!script || typeof script !== 'string') {
    return res.status(400).json({ error: 'Script inválido' });
  }

  // Agregar script a la cola solo si no está duplicado
  if (!scriptsQueue.includes(script)) {
    scriptsQueue.push(script);
  }

  res.json({ success: true, message: 'Script añadido a la cola' });
});

// Devuelve scripts y limpia la cola
app.get('/getScripts', (req, res) => {
  if (scriptsQueue.length === 0) {
    return res.json([]); // Cola vacía
  }

  const scripts = [...scriptsQueue]; // Copia
  scriptsQueue = []; // Limpia la cola
  res.json(scripts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ejecutándose en el puerto ${PORT}`));
