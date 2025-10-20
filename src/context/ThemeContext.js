import React, { createContext, useState } from "react";

// 1.- Creamos el contexto del tema
//Le damos un valor por defecto que puede ser usado por los consumidores

const ThemeContext = createContext({
    theme: "light",
    toggleTheme: () => {},
});

// 2.- Creamos el proveedor del contexto del tema
// Este componente envolverá a los componentes que necesiten acceso al contexto del tema
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    // Función para alternar entre temas claro y oscuro
    const toggleTheme = () => {
        setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
    };

// 3.- Pasamos el estado actual y la función para cambiarlo
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
    