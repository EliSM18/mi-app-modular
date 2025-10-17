import React, { useState } from "react";
import './TodoList.css';

const TodoList = () => {
    // Hook UseState para manejar la lista de tareas
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Aprender React' },
        { id: 2, text: 'Construir una App' },
        { id: 3, text: 'Modularizar componentes' }
    ]);

    const [inputValue, setInputValue] = useState('');

    // Función para manejar el envío del formulario
    const handleAddTask = (e) => {
        e.preventDefault();
        if(inputValue.trim() === '') return; // Evitar añadir tareas vacías

        const newTask = {
            id: Date.now(),
            text: inputValue
        };

        setTasks([...tasks, newTask]); // Añadir la nueva tarea a la lista
        setInputValue('');
    };

    // función para eliminar una tarea
    const handleDeleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

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
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.text}
            <button onClick={() => handleDeleteTask(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

    </div>
    )
}

export default TodoList;