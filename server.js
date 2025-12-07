const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let scriptsQueue = [];

app.get('/', (req, res) => {
  res.send('e if you read this ur gay');
});

app.post('/sendScript', (req, res) => {
  const { script } = req.body;
  if (!script || typeof script !== 'string') return res.status(400).json({ error: 'Script inválido' });
  if (!scriptsQueue.includes(script)) scriptsQueue.push(script);
  res.json({ success: true, message: 'scrept aded to executer' });
});

app.get('/getScripts', (req, res) => {
  if (scriptsQueue.length === 0) return res.json([]);
  const scripts = [...scriptsQueue];
  scriptsQueue = [];
  res.json(scripts);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 ${PORT}`));
