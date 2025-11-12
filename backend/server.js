// server.js
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const sanitizeHtml = require('sanitize-html');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---
app.use(helmet()); // Security headers
app.use(cors({ origin: 'http://localhost:3000' })); // Change to Render URL when live
app.use(bodyParser.json());
app.use(morgan('combined')); // Logging

// Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,
  message: "Too many requests, please try again later."
});
app.use(limiter);

// --- Database setup ---
const DB_PATH = path.join(__dirname, 'data', 'todo.db');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) console.error('Database error:', err.message);
  else console.log('Connected to SQLite database.');
});

// Create tasks table if it doesn't exist
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

// GET /tasks → fetch all tasks
app.get('/tasks', (req, res, next) => {
  db.all('SELECT * FROM tasks ORDER BY createdAt DESC', [], (err, rows) => {
    if (err) return next(err);
    res.json(rows);
  });
});

// POST /tasks → add a new task
app.post('/tasks', (req, res, next) => {
  let { text } = req.body;

  // Validate and sanitize input
  if (!text || typeof text !== 'string' || text.length > 200) {
    return res.status(400).json({ error: 'Invalid task text' });
  }
  text = sanitizeHtml(text, { allowedTags: [], allowedAttributes: {} });

  const query = 'INSERT INTO tasks(text) VALUES(?)';
  db.run(query, [text], function(err) {
    if (err) return next(err);
    db.get('SELECT * FROM tasks WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return next(err);
      res.status(201).json(row);
    });
  });
});

// PUT /tasks/:id → toggle/update a task
app.put('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  const { completed } = req.body;

  if (typeof completed !== 'boolean') {
    return res.status(400).json({ error: 'Completed must be a boolean' });
  }

  const query = 'UPDATE tasks SET completed = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?';
  db.run(query, [completed, id], function(err) {
    if (err) return next(err);
    res.json({ message: 'Task updated' });
  });
});

// DELETE /tasks/:id → delete a task
app.delete('/tasks/:id', (req, res, next) => {
  const { id } = req.params;
  const query = 'DELETE FROM tasks WHERE id = ?';
  db.run(query, [id], function(err) {
    if (err) return next(err);
    res.json({ message: 'Task deleted' });
  });
});

// --- Central error handler ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// --- Start server ---
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
