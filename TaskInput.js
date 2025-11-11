import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    if (inputValue.trim() !== '') {
      onAddTask(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="task-input">
      <input 
        type="text" 
        placeholder="Input Task Here" 
        value={inputValue} 
        onChange={(e) => setInputValue(e.target.value)} 
      />
      <button onClick={handleAdd}>Add Task</button>
    </div>
  );
}

export default TaskInput;
