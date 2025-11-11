import React from 'react';
import Task from './Task';

function TaskList({ tasks, onToggleComplete, onDeleteTask }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDelete={onDeleteTask} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
