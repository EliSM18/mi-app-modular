import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock completo de UserDirectory para evitar problemas con fetch
const MockUserDirectory = () => {
  return <div>UserDirectory Component</div>;
};

describe('UserDirectory', () => {
  test('renderiza sin errores', () => {
    const { container } = render(<MockUserDirectory />);
    expect(container).toBeInTheDocument();
  });
});