import React from 'react';
import './TodoItem.css';
import IconTrash from '../Icons/IconTrash';

const TodoItem = ({ task, handleToggleComplete, handleDeleteTask }) => {
  return (
    <li className={`todo-item ${task.isComplete ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={() => handleToggleComplete(task.id)}
        />
        <span className="task-text">{task.text}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => handleDeleteTask(task.id)}
      >
        <IconTrash />
      </button>
    </li>
  );
};

export default TodoItem;