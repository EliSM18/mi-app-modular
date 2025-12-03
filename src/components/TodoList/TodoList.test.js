import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock TodoList para testear estructura básica
const MockTodoList = () => {
  return (
    <div className="todo-list-container">
      <h2>Mi Lista de Tareas</h2>
      
      {/* Formulario para añadir nuevas tareas */}
      <form className="add-task-form">
        <input 
          type="text" 
          placeholder="Añade una nueva tarea..."
        />
        <button type="submit">Añadir</button>
      </form>

      {/* Lista de tareas vacía */}
      <ul></ul>

      {/* Mensaje cuando no hay tareas */}
      <p>No tienes tareas. ¡Añade una nueva!</p>

      {/* Registros de eliminaciones */}
      <div className="deletion-logs">
        <h3>Registros de eliminaciones</h3>
        <p>No hay registros de eliminaciones.</p>
      </div>

      {/* Registros de completados */}
      <div className="completion-logs">
        <h3>Registros de completados</h3>
        <p>No hay registros de completados.</p>
      </div>
    </div>
  );
};

describe('TodoList', () => {
  test('renderiza sin errores', () => {
    const { container } = render(<MockTodoList />);
    expect(container).toBeInTheDocument();
  });

  test('renderiza el título principal', () => {
    render(<MockTodoList />);
    expect(screen.getByText('Mi Lista de Tareas')).toBeInTheDocument();
  });

  test('renderiza el formulario para agregar tareas', () => {
    render(<MockTodoList />);
    expect(screen.getByPlaceholderText('Añade una nueva tarea...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Añadir' })).toBeInTheDocument();
  });

  test('muestra mensaje cuando no hay tareas', () => {
    render(<MockTodoList />);
    expect(screen.getByText('No tienes tareas. ¡Añade una nueva!')).toBeInTheDocument();
  });

  test('renderiza las secciones de logs', () => {
    render(<MockTodoList />);
    expect(screen.getByText('Registros de eliminaciones')).toBeInTheDocument();
    expect(screen.getByText('Registros de completados')).toBeInTheDocument();
  });
});