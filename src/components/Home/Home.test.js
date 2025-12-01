import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  test('renderiza correctamente', () => {
    render(<Home />);
    expect(screen.getByText('Bienvenido a la Aplicación de Demostración')).toBeInTheDocument();
  });

  test('muestra el mensaje de navegación', () => {
    render(<Home />);
    expect(screen.getByText(/usa la navegación de arriba/i)).toBeInTheDocument();
  });

  test('menciona el Directorio de Usuarios', () => {
    render(<Home />);
    expect(screen.getByText(/directorio de usuarios/i)).toBeInTheDocument();
  });

  test('menciona la Lista de Tareas', () => {
    render(<Home />);
    expect(screen.getByText(/lista de tareas/i)).toBeInTheDocument();
  });
});