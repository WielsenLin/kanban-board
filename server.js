const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware (damit Express JSON-Daten versteht und CORS erlaubt)
app.use(cors());
app.use(express.json());

// Temporärer Speicher im Arbeitsspeicher (Dummy-Datenbank)
let tasks = [
  { id: 1, title: 'Bewerbung schreiben', status: 'todo' },
  { id: 2, title: 'Node.js lernen', status: 'in_progress' },
  { id: 3, title: 'Deutsch üben', status: 'done' }
];

// --- API ENDPUNKTE (CRUD) ---

// 1. READ: Alle Aufgaben abrufen
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// 2. CREATE: Eine neue Aufgabe hinzufügen
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now(), // Generiert eine eindeutige ID
    title: req.body.title,
    status: 'todo'  // Neue Aufgaben starten immer in 'todo'
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// 3. UPDATE: Status einer Aufgabe ändern (z. B. von 'todo' zu 'done')
app.patch('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (task) {
    task.status = req.body.status || task.status;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Aufgabe nicht gefunden' });
  }
});

// 4. DELETE: Eine Aufgabe löschen
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(t => t.id !== taskId);
  res.json({ message: 'Aufgabe gelöscht' });
});

// Server starten
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});