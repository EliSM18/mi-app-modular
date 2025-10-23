import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import ThemeContext from './context/ThemeContext';
import Error404 from './components/Errors/Error404';

// Importar el Layout y las Páginas
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import TodoList from './components/TodoList/TodoList';
import UserDirectory from './components/UserDirectory/UserDirectory';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`App ${theme}`}>
      {/* El componente <Routes> envuelve todas las rutas */}
      <Routes>
        {/* Esta es una "Ruta de Layout".
          Todas las rutas anidadas dentro se renderizarán DENTRO del <Outlet /> de Layout.
        */}
        <Route path="/" element={<Layout />}>

          {/* Rutas Hijas */}
          <Route index element={<Home />} />
          <Route path="tareas" element={<TodoList />} />
          <Route path="directorio" element={<UserDirectory />} />

          {/* Ruta "Catch-all" para 404 (No encontrado) */}
          <Route path="*" element={<Error404/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;