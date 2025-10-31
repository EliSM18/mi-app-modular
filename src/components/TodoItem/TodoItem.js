import React from 'react';
import './TodoItem.css';
import IconTrash from '../Icon/IconTrash';

const TodoItem = ({ task, onToggleComplete, onDeleteTask }) => {
  return (
    <li className={`todo-item ${task.isComplete ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.isComplete}
          onChange={() => onToggleComplete && onToggleComplete()}
        />
        <span className={`task-text ${task.isComplete ? 'completed' : ''}`}>{task.text}</span>
      </div>
      <button
        className="delete-btn"
        onClick={() => onDeleteTask && onDeleteTask(task)}
        aria-label={`Eliminar tarea ${task.text}`}
      >
       <IconTrash/>
      </button>
    </li>
  );
};

export default TodoItem;