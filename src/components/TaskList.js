import React from 'react';
import Task from './Task';

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditTask }) {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <Task 
          key={task.id} 
          task={task} 
          onToggleComplete={onToggleComplete} 
          onDelete={onDeleteTask} 
          onEditTask={onEditTask} 
        />
      ))}
    </ul>
  );
}

export default TaskList;
