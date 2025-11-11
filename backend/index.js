const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper functions
const readTasks = () => {
  const data = fs.readFileSync(TASKS_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeTasks = (tasks) => {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// Routes

// GET /tasks → get all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

// POST /tasks → create a new task
app.post('/tasks', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Task text is required' });
  }

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

// PUT /tasks/:id → update a task (text or completed)
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;

  const tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  if (text !== undefined) tasks[taskIndex].text = text;
  if (completed !== undefined) tasks[taskIndex].completed = completed;

  tasks[taskIndex].updatedAt = new Date();

  writeTasks(tasks);
  res.json(tasks[taskIndex]);
});

// DELETE /tasks/:id → delete a task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;

  let tasks = readTasks();
  const taskIndex = tasks.findIndex(t => t.id === parseInt(id));

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];
  writeTasks(tasks);
  res.json({ message: 'Task deleted', task: deletedTask });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
