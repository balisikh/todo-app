import React from 'react';

function Task({ task, onToggleComplete, onDelete, onEditTask }) {
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
      <div className="task-buttons">
        <button onClick={() => onEditTask(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </li>
  );
}

export default Task;
