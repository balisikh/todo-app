import React from 'react';

function Footer({ totalTasks, completedTasks }) {
  return (
    <footer>
      <span style={{ color: '#333' }}>Total Tasks: {totalTasks}</span>
      <span style={{ color: '#28a745', marginLeft: '20px' }}>
        Completed: {completedTasks}
      </span>
    </footer>
  );
}

export default Footer;
