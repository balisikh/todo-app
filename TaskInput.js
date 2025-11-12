import React, { useState } from "react";
import DOMPurify from "dompurify";

function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim and check for empty string
    let sanitizedText = text.trim();
    if (sanitizedText === "") return;

    // Sanitize input to remove any HTML/JS
    sanitizedText = DOMPurify.sanitize(sanitizedText, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });

    // Limit length
    if (sanitizedText.length > 200) {
      alert("Task cannot exceed 200 characters.");
      return;
    }

    addTask(sanitizedText);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskInput;
