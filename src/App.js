import './App.css';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import ThemeContext from './context/ThemeContext';
import { useContext } from 'react';

function App() {
  const { theme } = useContext(ThemeContext); //Consumimos el contexto del tema

  return (
    <div className={`App ${theme}`}>
      <Header />
      <main>
        <TodoList />
      </main>
    </div>
  );
}

export default App;
