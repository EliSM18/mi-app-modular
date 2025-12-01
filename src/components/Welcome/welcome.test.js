import React from 'react';
import { render, screen } from '@testing-library/react';
import Welcome from './welcome';

test('muestra mensaje personalizado para desarrollador', () => {
  render(<Welcome nombre="Desarrollador" />);
  expect(screen.getByText('Eres un crack.')).toBeInTheDocument();
});

test('Muestra mensaje para el resto de las personas', () => {
  render(<Welcome nombre="Elisa" />);
  expect(screen.getByText('Este es un ejemplo de un componente modularizado.')).toBeInTheDocument();
});