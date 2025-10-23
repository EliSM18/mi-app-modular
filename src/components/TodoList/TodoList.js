import React, { useState } from "react";
//import { FaTrash, FaCheck } from 'react-icons/fa';
import TodoItem from "../TodoItem/TodoItem";
import './TodoList.css';

const TodoList = () => {
    // Hook UseState para manejar la lista de tareas
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Aprender React', completed: false },
    { id: 2, text: 'Construir una App', completed: false },
    { id: 3, text: 'Modularizar componentes', completed: false }
  ]);

    const [inputValue, setInputValue] = useState('');

    // Función para manejar el envío del formulario
    const handleAddTask = (e) => {
        e.preventDefault();
        if(inputValue.trim() === '') return; // Evitar añadir tareas vacías

    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

        setTasks([...tasks, newTask]); // Añadir la nueva tarea a la lista
        setInputValue('');
    };

    // función para eliminar una tarea
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    // función para tachar una tarea como completada (opcional)
    const handleToggleComplete = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task 
        ));
    }

    return(
        <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>

      {/* 3. Aquí irá el formulario para añadir nuevas tareas */}
        <form onSubmit={handleAddTask} className="add-task-form">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Añade una nueva tarea..."
            />
            <button type="submit">Añadir</button>
        </form>

      {/* 2. Aquí mostraremos la lista de tareas */}
      <ul className="tasks-list">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            handleToggleComplete={handleToggleComplete}
            handleDeleteTask={handleDeleteTask}
          />
        ))}
        {/* {tasks.map(task => (
          <li
            key={task.id}
            className= "todo-list-li-style"
          >
            <span className={`task-text ${task.completed ? 'completed' : ''}`}>{task.text}</span>
            <div>
            <button
              className={`complete-button ${task.completed ? 'done' : 'completada'}`}
              onClick={() => handleToggleComplete(task.id)}
              aria-label={task.completed ? `Marcar tarea ${task.text} como no completada` : `Marcar tarea ${task.text} como completada`}
            >
              <FaCheck />
            </button>
            <button
              className="delete-button"
              onClick={() => handleDeleteTask(task.id)}
              aria-label={`Eliminar tarea ${task.text}`}
            >
              <FaTrash />
            </button>
            </div>
          </li>
        ))} */}
      </ul>
    </div>
    )
}

export default TodoList;