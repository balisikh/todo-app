import React, { useState } from 'react';
import Header from './components/Header';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import Modal from './components/Modal';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Add task
  const addTask = (text) => {
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  // Toggle complete
  const toggleComplete = (id) => {
    setTasks(tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Open edit modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  // Save edited task
  const saveTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? {...task, text: newText} : task));
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  return (
    <div className="app">
      <Header />
      <TaskInput onAddTask={addTask} />
      <TaskList 
        tasks={tasks} 
        onToggleComplete={toggleComplete} 
        onDeleteTask={deleteTask} 
        onEditTask={openEditModal} 
      />
      <Footer 
        totalTasks={tasks.length} 
        completedTasks={tasks.filter(task => task.completed).length} 
      />

      {isModalOpen && selectedTask && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h3>Edit Task</h3>
          <TaskInput
            onAddTask={(text) => saveTask(selectedTask.id, text)}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
