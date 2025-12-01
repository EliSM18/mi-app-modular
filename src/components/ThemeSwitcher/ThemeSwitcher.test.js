import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeSwitcher from "./ThemeSwitcher";
import ThemeContext from "../../context/ThemeContext";

const mockToggleTheme = jest.fn();

const CustomThemeProvider = ({ children, themeValue = 'light' }) => {
  return (
    <ThemeContext.Provider value={{ 
      theme: themeValue, 
      toggleTheme: mockToggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

test('llama toggleTheme al hacer clic', () => {
  render(
    <CustomThemeProvider>
      <ThemeSwitcher />
    </CustomThemeProvider>
  );
  
  fireEvent.click(screen.getByRole('button'));
  expect(mockToggleTheme).toHaveBeenCalledTimes(1);
});