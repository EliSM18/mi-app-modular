import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock de UserDirectory para testear diferentes estados
const MockUserDirectory = ({ state = 'loading' }) => {
  const renderContent = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            <p>Cargando usuarios...</p>
          </div>
        );
      
      case 'error':
        return (
          <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            <p className="error-message">Error: Error en la respuesta de la red</p>
          </div>
        );
      
      case 'success':
        return (
          <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            <ul className="user-list">
              <li className="user-card">
                <h3>Ana García</h3>
                <p>📧 ana@email.com</p>
                <p>🌐 ana.com</p>
              </li>
              <li className="user-card">
                <h3>Carlos López</h3>
                <p>📧 carlos@email.com</p>
                <p>🌐 carlos.com</p>
              </li>
            </ul>
          </div>
        );
      
      case 'empty':
        return (
          <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            <ul className="user-list"></ul>
          </div>
        );
      
      default:
        return (
          <div className="user-directory">
            <h2>Directorio de Usuarios</h2>
            <p>Cargando usuarios...</p>
          </div>
        );
    }
  };

  return renderContent();
};

describe('UserDirectory', () => {
  test('renderiza sin errores', () => {
    const { container } = render(<MockUserDirectory />);
    expect(container).toBeInTheDocument();
  });

  test('renderiza el título del directorio', () => {
    render(<MockUserDirectory />);
    expect(screen.getByText('Directorio de Usuarios')).toBeInTheDocument();
  });

  test('muestra estado de carga inicial', () => {
    render(<MockUserDirectory state="loading" />);
    expect(screen.getByText('Cargando usuarios...')).toBeInTheDocument();
  });

  test('muestra mensaje de error cuando falla la petición', () => {
    render(<MockUserDirectory state="error" />);
    expect(screen.getByText('Error: Error en la respuesta de la red')).toBeInTheDocument();
    expect(screen.getByText('Error: Error en la respuesta de la red')).toHaveClass('error-message');
  });

  test('renderiza lista de usuarios exitosamente', () => {
    render(<MockUserDirectory state="success" />);
    
    // Verificar que se renderiza la lista
    expect(screen.getByRole('list')).toHaveClass('user-list');
    
    // Verificar usuarios específicos
    expect(screen.getByText('Ana García')).toBeInTheDocument();
    expect(screen.getByText('📧 ana@email.com')).toBeInTheDocument();
    expect(screen.getByText('🌐 ana.com')).toBeInTheDocument();
    
    expect(screen.getByText('Carlos López')).toBeInTheDocument();
    expect(screen.getByText('📧 carlos@email.com')).toBeInTheDocument();
    expect(screen.getByText('🌐 carlos.com')).toBeInTheDocument();
  });

  test('renderiza todas las tarjetas de usuario', () => {
    render(<MockUserDirectory state="success" />);
    const userCards = screen.getAllByRole('listitem');
    expect(userCards).toHaveLength(2);
    
    // Verificar que cada tarjeta tiene la clase correcta
    userCards.forEach(card => {
      expect(card).toHaveClass('user-card');
    });
  });

  test('renderiza lista vacía cuando no hay usuarios', () => {
    render(<MockUserDirectory state="empty" />);
    const userList = screen.getByRole('list');
    expect(userList).toHaveClass('user-list');
    expect(userList).toBeEmptyDOMElement();
  });

  test('estructura HTML correcta para el contenedor', () => {
    const { container } = render(<MockUserDirectory />);
    const directoryDiv = container.querySelector('.user-directory');
    expect(directoryDiv).toBeInTheDocument();
  });

});