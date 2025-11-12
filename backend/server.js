const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(helmet()); // Security headers
app.use(cors({ origin: 'http://localhost:3000' })); // Adjust for your frontend URL
app.use(bodyParser.json()); // Parse JSON bodies

// --- Database setup ---
const DB_PATH = path.join(__dirname, 'data', 'todo.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Database error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Create tasks table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// --- Routes ---

// Get all tasks
app.get('/tasks', (req, res) => {
  db.all('SELECT * FROM tasks ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== 'string' || text.length > 200) {
    return res.status(400).json({ error: 'Invalid task text' });
  }

  const query = 'INSERT INTO tasks(text) VALUES(?)';
  db.run(query, [text], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json(row);
    });
  });
});

// Update task (toggle completed)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  const query = 'UPDATE tasks SET completed = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?';
  db.run(query, [completed, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task updated' });
  });
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, [id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Task deleted' });
  });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
