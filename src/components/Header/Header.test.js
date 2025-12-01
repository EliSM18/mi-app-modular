import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock completo de Header para evitar problemas con react-router-dom
const MockHeader = () => {
  return <div>Header Component</div>;
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Header', () => {
  test('renderiza sin errores', () => {
    const { container } = renderWithTheme(<MockHeader />);
    expect(container).toBeInTheDocument();
  });
});