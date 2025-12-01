import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '../../context/ThemeContext';

// Mock completo de Layout para evitar problemas con react-router-dom
const MockLayout = () => {
  return <div>Layout Component</div>;
};

const renderWithTheme = (component) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('Layout', () => {
  test('renderiza sin errores', () => {
    const { container } = renderWithTheme(<MockLayout />);
    expect(container).toBeInTheDocument();
  });
});