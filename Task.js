import React from 'react';

function Task({ task, onToggleComplete, onDelete }) {
  return (
    <li className="task">
      <input 
        type="checkbox" 
        checked={task.completed} 
        onChange={() => onToggleComplete(task.id)} 
      />
      <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
        {task.text}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default Task;
