import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

const mockTask = {
  id: '1',
  text: 'Tarea de prueba',
  isComplete: false
};

const mockCompletedTask = {
  id: '2',
  text: 'Tarea completada',
  isComplete: true
};

describe('TodoItem', () => {
  test('renderiza la tarea correctamente', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
  });

  test('checkbox refleja el estado de completado', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox marcado para tarea completada', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockCompletedTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  test('llama onToggleComplete al hacer clic en checkbox', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  test('llama onDeleteTask al hacer clic en botón eliminar', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    const deleteButton = screen.getByLabelText(/eliminar/i);
    fireEvent.click(deleteButton);
    expect(mockDelete).toHaveBeenCalledWith(mockTask);
  });

  test('aplica clase completed para tareas completadas', () => {
    const mockToggle = jest.fn();
    const mockDelete = jest.fn();
    
    render(
      <TodoItem 
        task={mockCompletedTask}
        onToggleComplete={mockToggle}
        onDeleteTask={mockDelete}
      />
    );
    
    const taskText = screen.getByText('Tarea completada');
    expect(taskText).toHaveClass('completed');
  });
});