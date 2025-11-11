import React, { useState } from 'react';
import Header from './Header';
import TaskInput from './TaskInput';
import TaskList from './TaskList';
import Footer from './Footer';

function App() {
  const [tasks, setTasks] = useState([]);

  // Add a new task
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  return (
    <div className="app">
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggleComplete={toggleComplete} 
        onDeleteTask={deleteTask} 
      />
      <Footer totalTasks={totalTasks} completedTasks={completedTasks} />
    </div>
  );
}

export default App;
