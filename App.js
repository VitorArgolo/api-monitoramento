const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Array para armazenar logs das alterações
let logs = [];

// Função para adicionar logs
const addLog = (message) => {
  const timestamp = new Date().toISOString();
  logs.push({ message, timestamp });
  console.log(`[${timestamp}] ${message}`);
};

// Endpoint para receber logs
app.post('/log', (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  addLog(message);
  res.json({ message: 'Log added' });
});

// Rota para listar logs
app.get('/logs', (req, res) => {
  res.json(logs);
});

// Rota para limpar logs
app.delete('/logs', (req, res) => {
  logs = [];
  res.json({ message: 'Logs cleared' });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Monitoring API running on port ${PORT}`);
});
