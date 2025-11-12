import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import './styles.css';

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on load
  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await fetch(`${API_URL}/tasks`, {
          headers: {
            'x-api-key': API_KEY
          }
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      }
    }
    fetchTasks();
  }, []);

  // Add new task
  const addTask = async (text) => {
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ text }),
      });
      const newTask = await res.json();
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // Toggle completed
  const toggleTask = async (id, completed) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "x-api-key": API_KEY
        },
        body: JSON.stringify({ completed }),
      });
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/tasks/${id}`, { 
        method: "DELETE",
        headers: { "x-api-key": API_KEY }
      });
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  return (
    <div className="app">
      <h1>My To-Do App</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
